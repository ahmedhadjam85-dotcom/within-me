/* ===== WITHIN ME — details.js (v13) — اختياري =====
   تفاصيل صغيرة: خيارات (صوت/اهتزاز الشاشة/اهتزاز الجهاز) بقائمة الإيقاف، أرقام عائمة، شرر الانزلاق على الجدار،
   غبار الركض، ضربات القلب عند آخر قلب، اهتزاز عند الإصابة، إنجازات، وتشجيع لارا بعد تكرار الموت.
   يتحمّل آخر ملف بعد backdrops.js. إذا حذفته اللعبة تشتغل عادي. */
(function(){
const S2={get:(k,d)=>{try{const v=localStorage.getItem('withinme_'+k);return v===null?d:JSON.parse(v)}catch(e){return d}},set:(k,v)=>{try{localStorage.setItem('withinme_'+k,JSON.stringify(v))}catch(e){}}};
const OPT=Object.assign({vol:1,shake:true,vib:true},S2.get('opts',{}));
const saveOpt=()=>S2.set('opts',OPT);

/* ---- مستوى الصوت العام (يشمل الموسيقى والمؤثرات) ---- */
let master=null;
const AC=window.AudioContext||window.webkitAudioContext;
if(AC){
 const W=function(...a){const c=new AC(...a);try{const m=c.createGain();m.gain.value=OPT.vol;m.connect(c.destination);Object.defineProperty(c,'destination',{get:()=>m,configurable:true});master=m}catch(e){}return c};
 W.prototype=AC.prototype;window.AudioContext=W;window.webkitAudioContext=W;
}
const applyVol=()=>{if(master)master.gain.value=OPT.vol};

/* ---- خيارات بقائمة الإيقاف ---- */
const pauseEl=document.getElementById('pause'),quitEl=document.getElementById('quit');
if(pauseEl&&quitEl){
 const mk=fn=>{const b=document.createElement('button');b.className='big ghost';b.style.cssText='font-size:.72em;padding:.3em 1em;margin:.12em';b.onclick=function(){this.blur();fn();label()};pauseEl.insertBefore(b,quitEl);return b};
 const bVol=mk(()=>{const s=[0,.25,.5,.75,1];OPT.vol=s[(s.indexOf(OPT.vol)+1)%s.length];applyVol();saveOpt()});
 const bShake=mk(()=>{OPT.shake=!OPT.shake;saveOpt()});
 const bVib=mk(()=>{OPT.vib=!OPT.vib;saveOpt();if(OPT.vib&&Input.haptic)Input.haptic(80)});
 const label=()=>{bVol.textContent='VOLUME  '+Math.round(OPT.vol*100)+'%';bShake.textContent='SCREEN SHAKE  '+(OPT.shake?'ON':'OFF');bVib.textContent='VIBRATION  '+(OPT.vib?'ON':'OFF')};
 label();
}

/* ---- أرقام عائمة ---- */
const floats=[];let lastShards=0,pickAcc=null;
function fl(text,x,y,col){floats.push({text,x,y,t:0,col:col||'#ffffff'})}
const _render=render;
render=function(){
 _render();
 if(!G.lv||!G.p||!['play','dialogue','pause','map','dead'].includes(G.state))return;
 const cam=Math.round(G.cam),cy=Math.round(G.camY||0);
 for(const f of floats){c.globalAlpha=Math.max(0,1-f.t/1.1);txt(f.text,f.x-cam,f.y-cy-f.t*18,f.col,8,'center')}
 c.globalAlpha=1;c.textAlign='left';
};

/* ---- ضربات قفز (pogo) متتابعة ---- */
let chain=0,chainMax=0;
const _pogo=pogoBounce;
pogoBounce=function(p,x,y){_pogo(p,x,y);chain++;chainMax=Math.max(chainMax,chain);if(chain>=2)fl('POGO x'+chain,p.x+4,p.y-6,'#8affd8');if(chain>=3&&chain%3===0){G.shards++;fl('+1',p.x+4,p.y-16,'#ffd23d')}};

/* ---- اهتزاز الجهاز عند الإصابة/الموت ---- */
const _hurt=hurt;hurt=function(p,d){const r=_hurt(p,d);if(r&&OPT.vib&&Input.haptic)Input.haptic(110,.7,.4);return r};
const _kill=killPlayer;killPlayer=function(){const was=G.state;_kill();if(was==='play'&&G.state==='dead'&&OPT.vib&&Input.haptic)Input.haptic(260,1,.6)};

/* ---- تشجيع لارا بعد تكرار الموت بنفس المكان ---- */
let streakKey='',streak=0;
const _die=die;
die=function(){
 const key=G.room+':'+(G.cp?G.cp.x:0);if(key===streakKey)streak++;else{streakKey=key;streak=1}
 const h={4:'Breathe, Alexander. Watch the pattern, not the danger.',8:'You are closer than you think. One more try.',12:'Rest if you must. The dark will wait.'}[streak];
 if(h){const keep=DEATH_LINES.slice();DEATH_LINES.length=0;DEATH_LINES.push(h);setTimeout(()=>{DEATH_LINES.length=0;keep.forEach(x=>DEATH_LINES.push(x))},2500)}
 return _die();
};

/* ---- إنجازات ---- */
const got=new Set(S2.get('ach',[]));
const ACH=[
 ['key1','First Soul Key','You opened the first lock.',()=>G.keys&&G.keys.length>=1],
 ['all','Locksmith','Every key of a world is yours.',()=>G.world&&window.KEYNEED&&G.keys.length>=KEYNEED()],
 ['mem','Remembered','You found a memory.',()=>G.mems&&G.mems.length>=1],
 ['heart','Brave Heart','A fragment of courage.',()=>G.hearts&&G.hearts.length>=1],
 ['relic','Relic Bearer','You found a relic.',()=>G.relics&&G.relics.length>=1],
 ['secret','Far Reaches','You found a hidden place.',()=>G.world&&G.world.rooms.sec&&G.world.rooms.sec.expl.some(v=>v)],
 ['fall','Fall seven, rise eight','Seven deaths. Still here.',()=>G.deaths>=7],
 ['pogo','Pogo Master','A chain of five bounces.',()=>chainMax>=5]
];
let achT=0,hbT=0;

/* ---- التحديث كل إطار ---- */
const _upd=update;
update=function(rd){
 _upd(rd);
 for(let i=floats.length-1;i>=0;i--){floats[i].t+=rd;if(floats[i].t>1.1)floats.splice(i,1)}
 if(!OPT.shake&&G.shake>0)G.shake=0;
 const p=G.p;if(!p||G.state!=='play'||p.dead)return;
 if(p.ground)chain=0;
 if(G.shards>lastShards){const n=G.shards-lastShards;if(pickAcc&&pickAcc.t<.5){pickAcc.n+=n;pickAcc.f.text='+'+pickAcc.n;pickAcc.f.t=0;pickAcc.t=0}else{const f={text:'+'+n,x:p.x+4,y:p.y-4,t:0,col:'#ffd23d'};floats.push(f);pickAcc={n,f,t:0}}}
 lastShards=G.shards;if(pickAcc)pickAcc.t+=rd;
 if(p.ground&&Math.abs(p.vx)>50&&Math.random()<.18)G.parts.push({x:p.x+4,y:p.y+15,vx:-p.face*20,vy:-8,l:.3,max:.3,col:'#b8bfe8',g:30});
 if(!p.ground&&p.vy>60&&(p.wallL||p.wallR)&&Input.down(p.wallL?'left':'right')&&Math.random()<.5){const s=p.wallL?-1:1;G.parts.push({x:p.x+4+s*5,y:p.y+4+Math.random()*10,vx:-s*10,vy:20,l:.25,max:.25,col:'#ffffff',g:80})}
 hbT-=rd;if(p.hp===1&&p.max>1&&hbT<=0){hbT=1.1;SFX.tone(70,45,.16,'sine',.09);setTimeout(()=>SFX.tone(62,40,.16,'sine',.07),180)}
 achT-=rd;if(achT<=0){achT=.6;for(const a of ACH){if(got.has(a[0]))continue;let ok=false;try{ok=a[3]()}catch(e){}if(ok){got.add(a[0]);S2.set('ach',[...got]);if(window.Toast)Toast('★ '+a[1]+' — '+a[2],3200);SFX.memory()}}}
};
})();
