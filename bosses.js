/* ===== WITHIN ME — bosses.js (v11 final) =====
   بوسات أشرس بحركات كثيرة + حركة خاصة لكل بوس + ميني بوس ثالث + عدد مفاتيح مختلف لكل عالم
   يتحمّل بعد screens.js وقبل world.js */
(function(){
const bad=m=>{try{showError('bosses.js: '+m)}catch(e){console.error(m)}};
function patchSrc(src,edits,tag){
 for(const[a,b]of edits){if(!src.includes(a)){bad('game files are not v6 ('+tag+')');return null}src=src.replace(a,()=>b)}
 return src;
}
function patchFn(name,edits){
 let s;try{s=(0,eval)(name).toString()}catch(e){bad('missing '+name);return false}
 s=patchSrc(s,edits,name);if(!s)return false;(0,eval)(name+'=('+s+')');return true;
}

/* ---------- عدد المفاتيح لكل عالم ---------- */
const KEYSET=[
 ['m1','p'],                    // الخوف: 2
 ['m1','m2','p'],               // الخيانة: 3
 ['m1','p','p2'],               // الإغراء: 3
 ['m1','m2','p','m3'],          // الكحول: 4
 ['m1','m2','p','p2'],          // الطمع: 4
 ['m1','m2','m3','p'],          // الظلم: 4
 ['m1','m2','m3','p','p2'],     // الغضب: 5
 ['m2','m3','p','p2'],          // الكذب: 4
 ['m1','m2','m3','p','p2'],     // الحسد: 5
 ['m1','m2','m3','p','p2'],     // الكبرياء: 5
 ['m1','m2','p']                // الحقيقة: 3
];
window.KEYSET=KEYSET;
window.KEYNEED=()=>KEYSET[G.area].length;

/* ---------- تعديلات game.js الخاصة بالمفاتيح ---------- */
patchFn('update',[
 ["if(G.keys.length>=3){openGate(dr);G.shake=.4;G.whisper={text:'The three seals break. The way is open.'","if(G.keys.length>=KEYNEED()){openGate(dr);G.shake=.4;G.whisper={text:'The seals break. The way is open.'"],
 ["'The door is sealed. Keys '+G.keys.length+'/3. Explore the wings.'","'The door is sealed. Keys '+G.keys.length+'/'+KEYNEED()+'. Find the rest.'"],
 ["G.keys.length>=3?'All three Soul Keys are yours. The boss door awaits.':'A Soul Key. '+G.keys.length+'/3.'","G.keys.length>=KEYNEED()?'All the Soul Keys are yours. The boss door awaits.':'A Soul Key. '+G.keys.length+'/'+KEYNEED()+'.'"]
]);
patchFn('drawGate',[["for(let k=0;k<3;k++){\n   const owned=G.keys.length>k","for(let k=0;k<KEYNEED();k++){\n   const owned=G.keys.length>k"]]);
patchFn('drawPortal',[["{w1:'m1',w2:'m2',w3:'p'}","{w1:'m1',w2:'m2',w3:'p',w4:'m3',w5:'p2'}"]]);
patchFn('render',[["for(let k=0;k<3;k++){\n  const x=262+k*10,own=G.keys.length>k;","for(let k=0;k<KEYNEED();k++){\n  const x=262+k*10,own=G.keys.length>k;"]]);

/* ---------- ميني بوس ثالث لكل عالم ---------- */
const THIRD=[
 {name:'Pale Watcher',arch:'cyclops',sig:'darkness'},{name:'Judas Knight',arch:'knight',sig:'ring'},
 {name:'Silk Phantom',arch:'phantom',sig:'pull'},{name:'Barrel Golem',arch:'brute',sig:'rain'},
 {name:'Gilded Worm',arch:'worm',sig:'beam'},{name:'Iron Warden',arch:'brute',sig:'sweep'},
 {name:'Cinder Mage',arch:'mage',sig:'rain'},{name:'Hollow Reflection',arch:'queen',sig:'confuse'},
 {name:'Vine Stalker',arch:'beast',sig:'homing'},{name:'Gilt Duelist',arch:'knight',sig:'beam'},
 {name:'Echo of Regret',arch:'mage',sig:'confuse'}
];
THIRD.forEach((m,i)=>{MINI[i][2]=m});
const _md=miniDef;
miniDef=function(a,tier){
 if(tier<2)return _md(a,tier);
 const m=MINI[a][2],ar=MINI_ARCH[m.arch],base=_md(a,1);
 return Object.assign(base,{name:m.name,arch:m.arch,fly:ar.fly,spd:ar.spd*(1+a*.02),w:ar.w,h:ar.h,tier:2,hp:Math.round(base.hp*1.15),
  m:[ar.m[0],ar.m[1].concat([m.sig]),ar.m[2].concat([m.sig])]});
};

/* ---------- حركات جديدة ---------- */
const NEW={
 spiral(){const n=12+this.ph*5,arms=this.ph>=3?3:2,sp=62+this.ph*4;for(let i=0;i<n;i++)this.later(i*.09,()=>{const c=this.center();for(let k=0;k<arms;k++){const an=i*.45+k*6.283/arms;this.fire(c.x,c.y,Math.cos(an)*sp,Math.sin(an)*sp)}});SFX.shoot()},
 cross(){for(let r=0;r<2;r++)this.later(r*.5,()=>{const c=this.center(),o=r*.39;for(let k=0;k<8;k++){const an=k*.785+o,v=70+r*14;this.fire(c.x,c.y,Math.cos(an)*v,Math.sin(an)*v)}});SFX.shoot()},
 curtain(p){const rounds=this.ph>=3?2:1;for(let r=0;r<rounds;r++)this.later(r*1.0,()=>{const gap=clamp(p.x+4+(Math.random()*120-60),this.ax+50,this.ax+290);for(let x=this.ax+12;x<this.ax+332;x+=17){if(Math.abs(x-gap)<30)continue;this.fire(x,-8,0,64+this.ph*8,{life:4.5})}SFX.shoot()})},
 pillars(){const rounds=this.ph>=3?3:2,odd=Math.random()<.5?0:1;for(let r=0;r<rounds;r++)this.later(r*1.05,()=>{for(let x=this.ax+22+((r+odd)%2)*20;x<this.ax+332;x+=40)G.zones.push({kind:'beam',x:x-7,w:14,y:0,h:this.gy,t:.8,dur:.35,col:this.col});SFX.tone(700,250,.4,'sine',.05)})},
 meteors(p){const n=4+this.ph*2;for(let i=0;i<n;i++)this.later(i*.3,()=>{const x=clamp(p.x+(Math.random()*180-90),this.ax+16,this.ax+324);G.zones.push({kind:'erupt',x:x-10,w:20,y:this.gy-8,h:8,t:.6,dur:.15,col:this.col});this.later(.6,()=>this.fire(x,-10,0,230,{life:2}))});SFX.tone(300,100,.5,'sawtooth',.05)},
 quake(){const n=this.ph>=3?4:3;for(let i=0;i<n;i++)this.later(i*.65,()=>{const c=this.center();for(const s of[-1,1])this.fire(c.x,this.gy-5,s*(92+i*10),0,{wave:true,life:2.8});G.shake=.25;SFX.boom()})},
 leap(p){if(this.ground){this.vy=-340;this.slam=1;this.lpx=clamp((p.x+4-(this.x+this.w/2))*1.5,-170,170)}else this.cd=.4},
 pounce(p){if(this.def.fly)this.dv={s:0,t:0};else NEW.leap.call(this,p)},
 eyes(){for(let i=0;i<3+this.ph;i++){const left=i%2===0,x=left?this.ax+10:this.ax+330,y=this.gy-30-Math.random()*100;this.later(i*.25,()=>this.fire(x,y,left?30:-30,0,{homing:true,sp:44+this.ph*5,life:6}))}SFX.shoot()},
 knives(p){const n=5+this.ph*2;for(let i=0;i<n;i++)this.later(i*.12,()=>{const c=this.center(),an=Math.atan2(p.y+8-c.y,p.x+4-c.x)+(Math.random()-.5)*.35;this.fire(c.x,c.y,Math.cos(an)*150,Math.sin(an)*150,{life:3})});SFX.shoot()},
 hearts(){for(let i=0;i<2+this.ph;i++)this.later(i*.35,()=>{const c=this.center();this.fire(c.x,c.y,(Math.random()-.5)*60,-50,{homing:true,sp:48+this.ph*4,life:6})});SFX.shoot()},
 spill(p){const n=2+(this.ph>=3?2:this.ph>=2?1:0);for(let i=0;i<n;i++){const x=clamp(p.x+4+(i-(n-1)/2)*80+(Math.random()*30-15),this.ax+30,this.ax+310);G.zones.push({kind:'erupt',x:x-24,w:48,y:this.gy-12,h:12,t:.8,dur:3.4,col:this.col})}SFX.crumble()},
 illusion(p){for(let i=0;i<3;i++)this.later(i*.75,()=>{spark(this.x+this.w/2,this.y+this.h/2,this.col,12,100);this.x=this.ax+30+Math.random()*(280-this.w);spark(this.x+this.w/2,this.y+this.h/2,this.col,12,100);const c=this.center(),an=Math.atan2(p.y+8-c.y,p.x+4-c.x);for(let k=-2;k<=2;k++)this.fire(c.x,c.y,Math.cos(an+k*.22)*86,Math.sin(an+k*.22)*86)});SFX.shoot()},
 gaze(p){for(let i=0;i<3+(this.ph>=3?1:0);i++)this.later(i*.55,()=>{G.zones.push({kind:'beam',x:p.x+4-8,w:16,y:0,h:this.gy,t:.7,dur:.35,col:this.col});SFX.tone(800,300,.4,'sine',.05)})},
 crowns(p){const c=this.center(),ss=[];for(let i=0;i<8;i++){const an=i/8*6.283,s={x:c.x,y:c.y,vx:Math.cos(an)*46,vy:Math.sin(an)*46,life:6,col:this.col,sp:110};G.shots.push(s);ss.push(s)}this.later(.8,()=>{for(const s of ss){if(s.life<=0)continue;const an=Math.atan2(p.y+8-s.y,p.x+4-s.x);s.vx=Math.cos(an)*110;s.vy=Math.sin(an)*110}});SFX.shoot()},
 sweepboth(){for(const d of[1,-1])G.zones.push({kind:'sweep',x:d>0?this.ax+8:this.ax+322,w:10,y:this.gy-44,h:44,t:.9,dur:3.4,vx:d*(80+this.ph*10),col:this.col});SFX.tone(300,600,.5,'sawtooth',.05)},
 decree(){NEW.pillars.call(this);this.later(1.3,()=>NEW.sweepboth.call(this))},
 firewave(){NEW.quake.call(this);this.later(.5,()=>this.attack('erupt',G.p,G.lv))},
 embrace(){this.attack('pull',G.p,G.lv);this.later(1.2,()=>this.attack('ring',G.p,G.lv))}
};

/* حركة خاصة لكل بوس (تتكرر كل 4 هجمات من المرحلة 2) */
Object.assign(NEW,{
 backstab(p){spark(this.x+this.w/2,this.y+this.h/2,this.col,14,110);this.x=clamp(p.x+4-(p.face||1)*52-this.w/2,this.ax+9,this.ax+331-this.w);spark(this.x+this.w/2,this.y+this.h/2,this.col,14,110);this.later(.3,()=>NEW.knives.call(this,p));this.later(.9,()=>NEW.cross.call(this))},
 enchant(p){G.invertT=3.5;this.attack('pull',p,G.lv);NEW.hearts.call(this)},
 flood(){for(let i=0,x=this.ax+6;x<this.ax+330;i++,x+=80)G.zones.push({kind:'erupt',x,w:56,y:this.gy-12,h:12,t:.9+i*.14,dur:2.8,col:this.col});SFX.crumble();G.shake=.3},
 goldrush(p){G.noDashT=3;for(let r=0;r<3;r++)this.later(r*.9,()=>NEW.curtain.call(this,p))},
 verdict(p){G.zones.push({kind:'beam',x:p.x+4-22,w:44,y:0,h:this.gy,t:1.3,dur:.5,col:this.col});this.later(1.0,()=>NEW.pillars.call(this));SFX.tone(200,900,.8,'sawtooth',.06)},
 eruption(p){G.shake=.5;NEW.meteors.call(this,p);this.later(.8,()=>NEW.sweepboth.call(this))},
 mirror(p){G.invertT=4;NEW.illusion.call(this,p)},
 steal(p){G.noDashT=5;G.darkT=4;NEW.eyes.call(this)},
 crownfall(p){NEW.crowns.call(this,p);this.later(.6,()=>NEW.leap.call(this,p));this.later(1.4,()=>NEW.quake.call(this))}
});
window.SIGMOVE=['eyes','backstab','enchant','flood','goldrush','verdict','eruption','mirror','steal','crownfall','embrace'];
const _atk=Boss.prototype.attack;
Boss.prototype.attack=function(kind,p,lv){const f=NEW[kind];if(f){f.call(this,p,lv);return}return _atk.call(this,kind,p,lv)};

/* ---------- إيقاع أسرع + عشوائية + كومبو + غضب أخير + قفزة + انقضاض ---------- */
{
 let s=Boss.prototype.update.toString().replace(/^update/,'function');
 s=patchSrc(s,[
  ['sp=ph===1?1:ph===2?1.15:1.35;','sp=(ph===1?1:ph===2?1.15:1.35)*(r<.15?1.25:1);'],
  ['const list=d.m[ph-1],kind=list[this.ai++%list.length];','const list=d.m[ph-1];let ix=Math.floor(Math.random()*list.length);if(ix===this.lastIx)ix=(ix+1)%list.length;this.lastIx=ix;let kind=list[ix];if(!d.mini&&ph>=2&&(this.nn=(this.nn||0)+1)%4===0)kind=SIGMOVE[this.a];'],
  ['if(this.tp<=0&&this.warn<=0)this.cd=((ph===1?2.4:ph===2?1.9:1.5)+Math.random()*.6)*(d.mini?.85:1);','if(this.tp<=0&&this.warn<=0){this.cd=((ph===1?2.0:ph===2?1.5:1.15)+Math.random()*.5)*(d.mini?.85:1);if(ph>=2&&!d.mini&&!this.cb&&Math.random()<.3){this.cb=1;this.cd=.5}else this.cb=0}'],
  ['this.vx=Math.abs(dx)>24?Math.sign(dx)*d.spd*sp:0;','this.vx=(this.slam&&this.lpx)?this.lpx:(Math.abs(dx)>24?Math.sign(dx)*d.spd*sp:0);'],
  ['this.slam=0;const c=this.center();','this.slam=0;this.lpx=0;const c=this.center();']
 ],'Boss.update');
 if(s){
  const base=(0,eval)('('+s+')');
  Boss.prototype.update=function(dt,p,lv){
   if(this.dv){
    if(this.dying>0||this.intro>0||!this.active){this.dv=null;this.warn=0}
    else{dive.call(this,dt,p);return}
   }
   return base.call(this,dt,p,lv);
  };
 }
}
function dive(dt,p){
 const d=this.dv;this.t+=dt;this.inv-=dt;this.cd-=dt;this.flashT-=dt;d.t+=dt;
 this.trail=this.trail.filter(g=>(g.l-=dt)>0);
 if(d.s===0){
  this.warn=.1;this.x+=(p.x+4-this.w/2-this.x)*Math.min(1,dt*3);this.y+=(this.gy-this.h-80-this.y)*Math.min(1,dt*4);
  if(d.t>.55){d.s=1;d.t=0;d.tx=p.x+4-this.w/2;d.ty=p.y-this.h*.35;this.warn=0;SFX.dash()}
 }else if(d.s===1){
  const dx=d.tx-this.x,dy=d.ty-this.y,m=Math.hypot(dx,dy)||1;
  this.x+=dx/m*330*dt;this.y+=dy/m*330*dt;
  this.trT-=dt;if(this.trT<=0){this.trail.push({x:this.x,y:this.y,l:.3,dir:this.dir});this.trT=.03}
  if(m<14||d.t>.7){d.s=2;d.t=0}
 }else{
  this.y+=(this.gy-this.h-34-this.y)*Math.min(1,dt*5);
  if(d.t>.45){this.dv=null;this.cd=Math.max(this.cd,.8)}
 }
 this.x=clamp(this.x,this.ax+9,this.ax+331-this.w);this.y=Math.min(this.y,this.gy-this.h-2);
}

/* ---------- قوائم الحركات (3 مراحل لكل بوس) ---------- */
const M={
 0:[['orbs','summon','erupt','eyes'],['spread','blackout','erupt','summon','eyes','spiral','pounce'],['ring','blackout','erupt','spiral','pounce','eyes','summon','cross','blackout','teleport']],
 1:[['charge','volley','summon','knives'],['stab','volley','charge','summon','knives','leap','cross'],['stab','ring','volley','charge','summon','knives','leap','illusion','quake']],
 2:[['homing','orbs','summon','hearts'],['pull','homing','ring','summon','hearts','spiral','pounce'],['pull','ring','homing','beam','summon','hearts','spiral','pounce','curtain']],
 3:[['bounce','slam','summon','spill'],['confuse','bounce','slam','spread','spill','leap','quake'],['confuse','slam','bounce','rain','summon','spill','leap','quake','curtain']],
 4:[['rain','charge','summon','curtain'],['rain','spread','charge','summon','curtain','meteors','leap'],['rain','ring','charge','erupt','summon','curtain','meteors','leap','quake']],
 5:[['slam','beam','orbs','pillars'],['slam','beam','rain','summon','pillars','quake','leap'],['slam','beam','sweep','rain','summon','pillars','quake','decree','leap']],
 6:[['charge','erupt','slam','meteors'],['charge','ring','erupt','summon','meteors','firewave','leap'],['charge','sweep','erupt','ring','slam','summon','meteors','firewave','leap','spiral']],
 7:[['teleport','spread','summon','illusion'],['stab','volley','ring','summon','illusion','cross','pounce'],['teleport','confuse','ring','volley','summon','illusion','cross','pounce','knives']],
 8:[['homing','nodash','summon','gaze'],['homing','teleport','nodash','rain','summon','gaze','eyes','pounce'],['homing','nodash','ring','beam','summon','gaze','eyes','pounce','spiral']],
 9:[['charge','slam','beam','crowns'],['charge','slam','ring','beam','summon','crowns','decree','leap'],['charge','sweep','slam','beam','ring','summon','crowns','decree','leap','quake']],
 10:[['ring','homing','beam','curtain','spiral'],['teleport','homing','beam','erupt','summon','curtain','spiral','pillars','embrace'],['teleport','ring','sweep','homing','beam','summon','curtain','spiral','pillars','embrace','pounce']]
};
for(const a in M){BOSS_DEF[a].m=M[a];BOSS_DEF[a].hp=Math.round(BOSS_DEF[a].hp*1.1)}

/* الخوف: بالمرحلة الأخيرة تنطفي الإضاءة بالكامل */
const _op=Boss.prototype.onPhase;
Boss.prototype.onPhase=function(){_op.call(this);if(this.a===0&&this.ph===3&&!this.def.mini){G.blackT=9;G.flash=.2;G.whisper={text:'The light goes out.',t:3,max:3}}};

/* ---------- الميني بوسات تاخذ حركات أكثر ---------- */
const X={brute:[['quake'],['leap','quake']],phantom:[['spiral'],['curtain','pounce']],knight:[['knives'],['knives','leap']],beast:[['leap'],['meteors','leap']],
 mage:[['pillars'],['spiral','pillars']],queen:[['curtain'],['crowns','spiral']],worm:[['pillars'],['quake','pillars']],cyclops:[['pillars'],['meteors','gaze']]};
for(const k in X){MINI_ARCH[k].m[1]=MINI_ARCH[k].m[1].concat(X[k][0]);MINI_ARCH[k].m[2]=MINI_ARCH[k].m[2].concat(X[k][1])}
})();
