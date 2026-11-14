/* ===== WITHIN ME — world.js (v12 final) =====
   كل عالم له جغرافيا: ممر رئيسي + طرق منحدرة تمشي عليها (نزول/صعود) + أنفاق، تنتهي بأبواب الميني بوس والأرشيف
   + أبواب مخفية خلف ألغاز + بدون تسلق (قفز وقفزة مزدوجة وانزلاق على الجدار وقفزة جدارية فقط)
   يعدّل game.js وقت التشغيل. لازم يتحمّل بعد bosses.js */
(function(){
const bad=m=>{try{showError('world.js: '+m)}catch(e){console.error(m)}};
function patchFn(name,edits){
 let s;try{s=(0,eval)(name).toString()}catch(e){bad('missing '+name);return false}
 for(const[a,b]of edits){
  if(!s.includes(a)){bad('game.js is not v6 ('+name+')');return false}
  s=s.replace(a,()=>b);
 }
 (0,eval)(name+'=('+s+')');return true;
}

/* ---- أنماط عقبات بدون سلالم تسلق (درجات حجر صغيرة بدل السلالم) ---- */
const STAIRS="const stairUp=(h)=>{const n=Math.ceil(h/12),sh=h/n;for(let i=1;i<=n;i++){block(x,GY-i*sh,16);x+=16}};"+
"P.ivyClimb=function(){const h=ri(84,110),bw=ri(90,120);ground(x,50);x+=50;stairUp(h);block(x,GY-h,bw);for(let k=0;k<4;k++)shard(x+16+k*(bw-32)/3,GY-h-14);if(R()<.6)lv.spikes.push({x:x+bw/2-14,y:GY-h-7,w:28,h:7});foe(x+bw-20,x+bw/2+20,x+bw-8,GY-h);x+=bw};"+
"P.climbWall=P.ivyClimb;P.wallZig=P.ivyClimb;"+
"P.sawLadder=function(){const h=ri(80,100),bw=ri(60,80);ground(x,50);x+=50;stairUp(h);block(x,GY-h,bw);saw(x+bw/2,GY-h-20,bw/2-8,0,1.5+diff*1.2);for(let k=0;k<3;k++)shard(x+14+k*(bw-28)/2,GY-h-14);x+=bw};"+
"P.alcove=function(){const bw=ri(80,100),h=ri(92,104);ground(x,50);x+=50;stairUp(h);const bx=x;block(bx,GY-h,bw+90);const cx=bx+bw,wall={x:cx,y:GY-h-120,w:80,h:120,brk:true,hp:3,hitId:-1,shk:0};S.push(wall);lv.brks.push(wall);lv.portals.push({x:cx+40,y:GY-h,to:'sec',kind:'secret'});lv.npcs.push({x:bx+16,gy:GY-h,text:'Some walls are only afraid. Strike them.',done:false});shard(bx+bw/2,GY-h-14);x+=bw+90};\n const kit=[";

const ok=
 patchFn('buildRoom',[
  ['while(x<target){','const CTX={P,lv,S,ground,block,ledge,mover,crumb,shard,crystal,saw,arc,foe,gate,rune,ri,R,a,A,diff,col,pool,spec,x:()=>x,setX:v=>{x=v},addSince:v=>{since+=v}};if(spec.build)spec.build(CTX);\n while(!spec.build&&x<target){'],
  ['}else{P.treasure();endWall()}','}else if(spec.kind===\'path\'){endWall()}else{P.treasure();endWall()}'],
  ['const kit=[',STAIRS]
 ])&&
 patchFn('render',[
  ['c.translate(-cam+(G.shake>0?Math.round(Math.random()*4-2):0),0);','c.translate(-cam+(G.shake>0?Math.round(Math.random()*4-2):0),-Math.round(G.camY||0));'],
  ['c.save();c.translate(-cam,0);','c.save();c.translate(-cam,-Math.round(G.camY||0));'],
  ['const px=p.x-cam+4,py=p.y+8;','const px=p.x-cam+4,py=p.y+8-(G.camY||0);']
 ])&&
 patchFn('update',[
  ['G.cam+=(target-G.cam)*Math.min(1,rd*6);','G.cam+=(target-G.cam)*Math.min(1,rd*6);G.camY=(G.camY||0)+((lv.top?clamp(p.y-112,lv.top,0):0)-(G.camY||0))*Math.min(1,rd*5);']
 ])&&
 patchFn('moveBody',[
  ['if(hit(b,s)){if(b.vx>0)b.x=s.x-b.w;else if(b.vx<0)b.x=s.x+s.w;b.vx=0}','if(hit(b,s)){const rise=b.y+b.h-s.y;if(b.step&&rise>0&&rise<=13&&b.vy>=0&&!s.gate&&!s.wall&&!s.brk){const oy=b.y;b.y=s.y-b.h-.01;if(!solids.some(t=>t!==s&&!t.oneway&&!t.dead&&!t.off&&hit(b,t)))continue;b.y=oy}if(b.vx>0)b.x=s.x-b.w;else if(b.vx<0)b.x=s.x+s.w;b.vx=0}']
 ])&&
 patchFn('makePlayer',[['return{x,y,w:8,h:16,vx:0','return{step:true,x,y,w:8,h:16,vx:0']])&&
 patchFn('updatePlayer',[
  ['const toward=(mx>0&&p.wallR)?1:(mx<0&&p.wallL)?-1:0;','const toward=0;'],
  ['p.vy=Math.min(p.vy+780*dt,330);\n  if(toward&&!p.ground&&p.lock<=0','p.vy=Math.min(p.vy+780*dt,(((mx>0&&p.wallR)||(mx<0&&p.wallL))&&!p.ground&&p.vy>0)?(has(8)?45:75):330);\n  if(toward&&!p.ground&&p.lock<=0'],
  ['p.vy=-236;p.jumps=2;','p.vy=has(0)?-262:-236;p.jumps=2;']
 ]);
if(!ok)return;
ladderAt=function(){return null};
hintText=function(){
 if(G.ctrl==='touch')return'JUMP twice for a double jump · against a wall: JUMP to wall-jump · ▼ + ⚔ in air = pogo · ▲ enter doors';
 if(G.ctrl==='pad')return Input.pad()?'A jump (twice in air) · wall-jump off walls · down + X in air = pogo · Select = map · stick ↑ at doors':'Connect a controller, then press any button';
 return'Space jump (twice) · wall-jump off walls · S + J in air = pogo · M = map · W at doors · K dash 8-way';
};
RELICS[0].desc='higher double jump';RELICS[8].desc='slower wall slide';

/* ---- أدوات ---- */
const rock=(S,x,y,w,h)=>S.push({x,y,w,h,kind:'rock'});
const foeAt=(C,ex,x0,x1,gy)=>{const e=new Enemy(C.pool[C.ri(0,C.pool.length-1)],ex,gy,x0,x1,C.col,C.a>=2&&C.R()<.2,C.a);C.lv.enemies.push(e);return e};
const NAMES0=['gapJump','steps','hurdles','spikePit','tower','ambush','ledgeHop','sawGate','spikeTrap','springWall','moving','elevator','stalactites','ivyClimb','leverGate','lockdown'];
const NAMES1=['beltRun','jetRun','blinkBridge','windGap','darkRun','crumble','runeGate','laserHall','sawLadder','crystalChain'];
const NAMES2=['gapDouble','spikeGauntlet','crusherRun','dashGap'];
const NAMES3=['sawGap','shaft','sawmill'];
const namesFor=a=>NAMES0.concat(a>=1?NAMES1:[],a>=2?NAMES2:[],a>=3?NAMES3:[]);
const stairs=(C,h)=>{const n=Math.ceil(h/12),sh=h/n;let sx=C.x()+70;for(let i=1;i<=n;i++){C.block(sx,GY-i*sh,16);sx+=16}return{n,end:sx}};

/* ---- جغرافيا كل عالم: سلسلة غرف لكل مفتاح ----
   D = طريق نزول  U = طريق صعود  C = نفق أفقي  L = غرفة الميني بوس  A = أرشيف الألغاز (المفتاح) */
const GEO=[
 {m1:'D1100 C800 L',p:'C1200 D600 A'},
 {m1:'U520 C700 L',m2:'C900 U460 D500 L',p:'D640 C600 A'},
 {m1:'U620 C800 L',p:'U480 U420 A',p2:'C1000 D520 A'},
 {m1:'D700 C700 L',m2:'D500 C500 D500 L',m3:'D900 C800 L',p:'C900 D600 A'},
 {m1:'C1300 D500 L',m2:'D620 C900 L',p:'C1000 A',p2:'U520 C700 A'},
 {m1:'U480 D700 L',m2:'C1100 L',m3:'D800 U500 L',p:'C700 U460 A'},
 {m1:'U700 D900 L',m2:'D800 C900 L',m3:'U600 C700 D700 L',p:'C1000 U520 A',p2:'D1000 A'},
 {m2:'D600 U600 L',m3:'C900 D800 L',p:'U520 C800 A',p2:'D700 C700 A'},
 {m1:'D800 C800 L',m2:'C1000 U500 L',m3:'U600 D600 C500 L',p:'C900 D500 A',p2:'U700 A'},
 {m1:'U700 C700 L',m2:'U560 U480 L',m3:'C900 U620 L',p:'U620 C600 A',p2:'U800 C500 A'},
 {m1:'U600 L',m2:'D700 L',p:'C900 A'}
];
const WORDS=[
 ['THE ABYSS','THE PALE STAIRS','THE DARK TUNNEL'],['THE SHATTERED WELL','THE CROOKED SPIRE','THE LONG LIE'],
 ['THE VELVET DROP','THE FERRIS SPIRE','THE PROMENADE'],['THE SINKING CELLAR','THE CORK STAIRS','THE WET HALLS'],
 ['THE GOLD SHAFT','THE TREASURY STAIRS','THE VAULT HALLS'],['THE OUBLIETTE','THE GALLOWS STAIRS','THE COURT HALLS'],
 ['THE CRATER','THE VOLCANO RIM','THE ASH ROAD'],['THE MIRROR WELL','THE GLASS STAIRS','THE HALL OF FACES'],
 ['THE ROOT PIT','THE THORN TOWER','THE GREEN PATH'],['THE FALLEN CROWN','THE GOLDEN SPIRE','THE MARBLE HALLS'],
 ['THE QUIET FALL','THE WHITE STAIRS','THE LAST ROAD']
];
const THEMES=['spk,foe','saw,crumb','mov,spk','blink,saw','crumb,foe','saw,mov','spk,blink'];
const ROOMKEY={m1:'w1',m2:'w2',m3:'w4',p:'w3',p2:'w5'};
const TIER={m1:0,m2:1,m3:2};

/* ---- محتوى سطح الهضبة (ارتفاع y) ---- */
function plat(C,xs,xe,y){
 const{lv,R,ri}=C;let cx=xs,first=true;
 while(cx<xe){
  const left=xe-cx,r=R();
  if(first||left<150||r<.3){const w=Math.min(left,ri(70,120));C.block(cx,y,w);if(!first&&R()<.6)foeAt(C,cx+w/2,cx+8,cx+w-8,y);C.arc(cx+8,cx+w-8,16,3);cx+=w;first=false;continue}
  if(r<.5){const g=ri(44,62);if(R()<.55)C.crumb(cx+g/2-12,y,24);else C.mover(cx+g/2-17,y,34,Math.max(8,(g-50)/2),0,1.2);cx+=g}
  else if(r<.75){const w=ri(130,160);C.block(cx,y,w);lv.spikes.push({x:cx+w/2-16,y:y-7,w:32,h:7});C.arc(cx+w/2-30,cx+w/2+30,32,5);cx+=w}
  else{const w=ri(150,190);C.block(cx,y,w);C.saw(cx+w/2,y-22,0,15,1.6+C.diff);C.arc(cx+w/2-36,cx+w/2+36,38,6);cx+=w}
 }
}

/* ---- أبواب + ألغاز الإخفاء ---- */
const KIND={w1:'mini',w2:'mini',w4:'mini',w3:'puzzle',w5:'puzzle',t1:'secret'};
function addDoor(C,info,to,x,y,hidden){
 const po={x,y,to,kind:KIND[to]||'exit',hidden:!!hidden};C.lv.portals.push(po);info.doors[to]={x,y};return po;
}
function nookDoor(C,info,to,txt){
 const{lv,S,ri}=C,x0=C.x(),h=ri(92,104),bw=ri(70,90),st=stairs(C,h);
 C.ground(x0,70+st.n*16+bw+90+30);
 const bx=st.end;C.block(bx,GY-h,bw+90);
 const cx=bx+bw,wall={x:cx,y:GY-h-120,w:80,h:120,brk:true,hp:3,hitId:-1,shk:0};S.push(wall);lv.brks.push(wall);
 addDoor(C,info,to,cx+40,GY-h,false);lv.npcs.push({x:bx+16,gy:GY-h,text:txt,done:false});
 lv.cps.push({x:x0+30,y:GY,on:false});C.arc(bx+10,cx-10,24,5);C.setX(bx+bw+90+30);
}
function doorPocket(C,info,to,pz){
 if(pz==='wall'){nookDoor(C,info,to,'Some walls are only afraid. Strike them.');return}
 const{lv,S,R,ri}=C,x0=C.x(),w=pz==='kill'?340:300;C.ground(x0,w);
 lv.cps.push({x:x0+30,y:GY,on:false});
 const dx=x0+w-46,po=addDoor(C,info,to,dx,GY,pz!=='none');
 lv.reveal=lv.reveal||[];
 const rev=t=>lv.reveal.push({po,test:t});
 if(pz==='lever'){
  const lx=x0+70;C.ledge(lx,GY-34,40);C.ledge(lx+56,GY-66,40);C.ledge(lx+10,GY-98,44);
  const lev={x:lx+22,y:GY-114,w:8,h:16,on:false,id:0,g:{}};lv.levers.push(lev);
  C.saw(lx+60,GY-9,40,0,1.8+C.diff);C.arc(lx,lx+70,60,6);
  foeAt(C,x0+200,x0+150,x0+260,GY);rev(()=>lev.on);
 }else if(pz==='runes'){
  const rs=[];const add=(x,y)=>{const r={x,y,id:0,got:false};lv.runes.push(r);rs.push(r)};
  C.ledge(x0+50,GY-46,34);add(x0+67,GY-62);
  C.block(x0+120,GY-36,30);add(x0+135,GY-52);
  lv.spikes.push({x:x0+190,y:GY-7,w:36,h:7});add(x0+208,GY-40);
  foeAt(C,x0+100,x0+85,x0+118,GY);rev(()=>rs.every(r=>r.got));
 }else if(pz==='torch'){
  const ts=[{x:x0+50,y:GY-14,lit:0,id:0,hitId:-1},{x:x0+140,y:GY-72,lit:0,id:0,hitId:-1},{x:x0+230,y:GY-14,lit:0,id:0,hitId:-1}];
  C.ledge(x0+112,GY-58,56);C.ledge(x0+100,GY-30,28);ts.forEach(t=>lv.torches.push(t));
  C.saw(x0+95,GY-22,0,15,2+C.diff);lv.spikes.push({x:x0+180,y:GY-7,w:34,h:7});rev(()=>ts.every(t=>t.lit>0));
 }else if(pz==='kill'){
  const es=[];for(let k=0;k<4+(C.a>4?1:0);k++)es.push(foeAt(C,x0+50+k*52,x0+20,x0+w-90,GY));
  rev(()=>es.every(e=>e.dead));
 }
 C.setX(x0+w);
}
function mesa(C,info,h,to,pz){
 const{lv,S,ri}=C,x0=C.x(),len=ri(380,460),st=stairs(C,h);
 C.ground(x0,70+st.n*16+len+70);
 const bx=st.end;C.block(bx,GY-h,60);lv.cps.push({x:bx+30,y:GY-h,on:false});
 plat(C,bx+60,bx+len-110,GY-h);
 const ex=bx+len-110;C.block(ex,GY-h,110);
 const px=ex+70;info.mesa={x:bx+30,y:GY-h};
 if(to){
  addDoor(C,info,to,px,GY-h,false);
  if(pz==='wall'){const wall={x:px-24,y:GY-h-150,w:48,h:150,brk:true,hp:3,hitId:-1,shk:0};S.push(wall);lv.brks.push(wall);lv.npcs.push({x:bx+34,gy:GY-h,text:'Not every wall is a wall.',done:false})}
 }
 C.setX(bx+len+70);
}

/* ---- غرف الطريق ---- */
function fwdDoor(C,reg,key,to,x,y,kind){const po={x,y,to,kind};C.lv.portals.push(po);reg.fwd[key]={x,y}}
function corrBuild(C,len,key,to,kind,reg){
 const{lv,P}=C,names=namesFor(C.a),hist=[],x0=C.x();let cpX=x0;
 while(C.x()-x0<len){
  const x=C.x();
  if(x-cpX>650){C.ground(x,110);lv.cps.push({x:x+55,y:GY,on:false});C.setX(x+110);cpX=x+110;continue}
  let nm,g=0;do{nm=names[C.ri(0,names.length-1)]}while(hist.includes(nm)&&g++<20);hist.push(nm);if(hist.length>4)hist.shift();P[nm]();
 }
 const x=C.x();C.ground(x,190);lv.cps.push({x:x+40,y:GY,on:false});fwdDoor(C,reg,key,to,x+130,GY,kind);C.setX(x+190);
}
function roadBuild(C,dir,H,themes,key,to,kind,reg,opt){
 /* طريق منحدر تمشي عليه للأمام: dir=1 ينزل ، dir=-1 يطلع (درجات 12px تُصعد بدون قفز) */
 const{lv,S,R,ri,a,diff}=C,th=themes.split(','),STEP=12,SW=16,top=GY-H,target=dir>0?GY:top;
 let x,y;
 if(dir>0){lv.portals.length=0;y=top;C.block(0,y,170);x=170;lv.entry={x:56,y};lv.portals.push({x:22,y,to:'hub',kind:'exit'});lv.cps.push({x:50,y,on:false})}
 else{x=170;y=GY;lv.entry={x:70,y:GY}}
 lv.topY=top;
 const done=()=>dir>0?y>=GY-1:y<=top+1;
 let seg=0;
 while(!done()){
  const n=Math.min(ri(8,14),Math.ceil(Math.abs(target-y)/STEP));
  for(let i=0;i<n&&!done();i++){y=dir>0?Math.min(GY,y+STEP):Math.max(top,y-STEP);C.block(x,y,SW);x+=SW}
  if(done())break;
  const w=ri(150,230),t=th[seg%th.length];C.block(x,y,w);
  if(t==='spk'){lv.spikes.push({x:x+w/2-16,y:y-7,w:32,h:7});C.arc(x+w/2-34,x+w/2+34,36,6)}
  else if(t==='saw'){C.saw(x+w/2,y-22,0,15,1.6+diff);C.arc(x+w/2-40,x+w/2+40,38,6)}
  else if(t==='foe'||t==='crumb'){foeAt(C,x+w*.35,x+10,x+w-10,y);if(R()<.6)foeAt(C,x+w*.7,x+10,x+w-10,y);C.arc(x+14,x+w-14,16,4)}
  else if(t==='mov'){C.saw(x+w/2,y-9,w/2-16,0,1.4+diff);C.arc(x+14,x+w-14,34,6)}
  else{lv.lasers.push({x:x+w/2,y0:y-46,y1:y,per:2.6,ph:seg*.7});C.arc(x+14,x+w-14,16,4)}
  if(seg%2===1)lv.cps.push({x:x+w/2,y,on:false});
  x+=w;seg++;
 }
 const w=240;
 if(dir>0){C.ground(x,w);lv.cps.push({x:x+40,y:GY,on:false});fwdDoor(C,reg,key,to,x+150,GY,kind);C.setX(x+w)}
 else{
  C.block(x,y,w);lv.cps.push({x:x+40,y,on:false});
  if(opt&&opt.mem){
   lv.memories.push({x:x+90,y:y-26,got:false,text:MEMORIES[a]});
   lv.portals.push({x:x+160,y,to:'hub',kind:'exit',get tx(){return reg.mesa?reg.mesa.x:undefined},get ty(){return reg.mesa?reg.mesa.y:undefined}});
  }else fwdDoor(C,reg,key,to,x+160,y,kind);
  rock(S,x+w,y-220,40,GY-y+300);C.setX(x+w+60);
 }
}

/* ---- الممر الرئيسي ---- */
const BPS=[
 {o:'p:3 d:w1:lever p:3 m:110:w3:none p:3 a p:3 d:w2:runes p:2 t:wall'},
 {o:'p:2 m:130:w3:wall p:3 d:w2:torch p:3 a p:2 d:w1:lever p:3 t:runes'},
 {o:'p:3 a p:2 d:w1:kill p:3 m:150:w3:none p:3 d:w2:lever p:2 t:torch'},
 {o:'p:2 d:w2:wall p:3 m:100:w3:none p:2 a p:3 d:w1:torch p:3 t:lever'},
 {o:'p:3 m:120:w3:none p:2 d:w1:runes p:3 a p:2 d:w2:kill p:3 t:wall'},
 {o:'p:2 d:w1:wall p:3 a p:3 m:160:w3:wall p:2 d:w2:lever p:3 t:torch'},
 {o:'p:3 m:140:w3:none p:3 d:w1:runes p:2 a p:3 m:90:w2:wall p:2 t:lever'},
 {o:'p:2 d:w2:torch p:3 a p:2 m:120:w3:wall p:3 d:w1:kill p:3 t:runes'},
 {o:'p:3 d:w1:wall p:2 m:170:w3:none p:3 a p:3 d:w2:lever p:2 t:kill'},
 {o:'p:2 a p:3 d:w2:runes p:2 m:150:w3:wall p:3 d:w1:torch p:3 t:lever'},
 {o:'p:2 d:w1:lever p:2 m:110:w3:none p:2 a p:2 d:w2:runes p:2 t:wall'}
];
function hubBuild(C,bp,info){
 const{lv,P}=C,names=namesFor(C.a),hist=[];let cpX=0;
 const cp=()=>{if(C.x()-cpX>720){const x=C.x();C.ground(x,120);lv.cps.push({x:x+60,y:GY,on:false});C.setX(x+120);cpX=x+120}};
 const plain=n=>{for(let i=0;i<n;i++){cp();let nm,g=0;do{nm=names[C.ri(0,names.length-1)]}while(hist.includes(nm)&&g++<20);hist.push(nm);if(hist.length>4)hist.shift();P[nm]()}};
 for(const tk of bp.o.split(' ')){
  const t=tk.split(':');cp();
  if(t[0]==='p')plain(Math.round(+t[1]*2.2));
  else if(t[0]==='d')doorPocket(C,info,t[1],t[2]);
  else if(t[0]==='m')mesa(C,info,+t[1],t[2],t[3]);
  else if(t[0]==='a'){P.alcove();info.doors.sec=lv.portals[lv.portals.length-1]}
  else if(t[0]==='t'){
   if(t[1]==='wall'||t[1]==='none'){nookDoor(C,info,'t1','The way up hides behind stone.');continue}
   const x0=C.x();C.ground(x0,200);lv.cps.push({x:x0+30,y:GY,on:false});
   const po=addDoor(C,info,'t1',x0+150,GY,true);
   lv.reveal=lv.reveal||[];
   const pk=t[1],es=[];
   if(pk==='lever'){C.ledge(x0+50,GY-40,40);C.ledge(x0+90,GY-76,40);const lev={x:x0+104,y:GY-92,w:8,h:16,on:false,id:0,g:{}};lv.levers.push(lev);lv.reveal.push({po,test:()=>lev.on})}
   else if(pk==='runes'){const rs=[{x:x0+40,y:GY-30},{x:x0+90,y:GY-70},{x:x0+140,y:GY-34}].map(q=>{const r={x:q.x,y:q.y,id:0,got:false};lv.runes.push(r);return r});C.ledge(x0+74,GY-54,36);lv.reveal.push({po,test:()=>rs.every(r=>r.got)})}
   else if(pk==='torch'){const ts=[{x:x0+40,y:GY-14,lit:0,id:0,hitId:-1},{x:x0+110,y:GY-14,lit:0,id:0,hitId:-1}];ts.forEach(q=>lv.torches.push(q));lv.reveal.push({po,test:()=>ts.every(q=>q.lit>0)})}
   else{for(let k=0;k<4;k++)es.push(foeAt(C,x0+40+k*32,x0+10,x0+130,GY));lv.reveal.push({po,test:()=>es.every(e=>e.dead)})}
   C.setX(x0+200);
  }
 }
}
function adjustOps(o,set,a){
 const have=new Set(set.map(i=>ROOMKEY[i])),tk=o.split(' ').filter(t=>{const q=t.split(':');const to=q[0]==='d'?q[1]:q[0]==='m'?q[2]:null;return !to||have.has(to)});
 const has=r=>tk.some(t=>t.split(':').includes(r));
 if(have.has('w4')&&!has('w4'))tk.splice(Math.ceil(tk.length*.55),0,'d:w4:'+['kill','lever','runes','torch','wall'][(a+2)%5]);
 if(have.has('w5')&&!has('w5'))tk.splice(Math.ceil(tk.length*.85),0,'m:'+(100+a*8)+':w5:'+(a%2?'wall':'none'));
 return tk.join(' ');
}

/* ---- بناء العالم ---- */
buildWorld=function(a){
 const A=AREAS[a],sd=a*977+13,set=KEYSET[a],geo=GEO[a],W3=WORDS[a],rooms={},branches={};
 const info={doors:{},fwd:{}};
 rooms.hub=buildRoom(a,{kind:'hub',key:'hub',seed:sd,len:1,bonus:0,name:A.name,sub:A.tag,portals:[],build:C=>hubBuild(C,{o:adjustOps(BPS[a].o,set,a)},info)});
 let seedN=1;
 for(const id of set){
  const toks=geo[id].split(' '),base=ROOMKEY[id],keys=toks.map((t,i)=>i?base+'_'+(i+1):base);
  branches[id]=keys;
  toks.forEach((tk,i)=>{
   const T=tk[0],n=+tk.slice(1)||0,key=keys[i],nxt=keys[i+1],nt=toks[i+1]?toks[i+1][0]:'',kind=nt==='L'?'mini':nt==='A'?'puzzle':'exit',seed=sd+(seedN++)*131,th=THEMES[(a+i+id.length)%THEMES.length];
   let r;
   if(T==='L'){const k=TIER[id];r=buildRoom(a,{kind:'mini',key,seed,len:900+a*30,bonus:.04+.06*k,mini:MINI[a][k],tier:k,keyId:id,name:'LAIR OF '+MINI[a][k].name.toUpperCase(),sub:['LESSER','GREATER','FORGOTTEN'][k]+' GUARDIAN'})}
   else if(T==='A'){r=buildRoom(a,{kind:'puzzle',key,seed,len:3000,bonus:.15,keyId:id,name:id==='p'?'THE SEALED ARCHIVE':'THE SECOND ARCHIVE',sub:'TRIALS OF THE MIND'})}
   else if(T==='C'){r=buildRoom(a,{kind:'path',key,seed,len:1,bonus:.08,name:W3[2],sub:'A LONG ROAD',build:C=>corrBuild(C,n,key,nxt,kind,info)})}
   else if(T==='D'){r=buildRoom(a,{kind:'path',key,seed,len:1,bonus:.08,name:W3[0],sub:'A LONG ROAD DOWN',build:C=>roadBuild(C,1,n,th,key,nxt,kind,info)})}
   else{r=buildRoom(a,{kind:'path',key,seed,len:1,bonus:.08,name:W3[1],sub:'A LONG ROAD UP',build:C=>roadBuild(C,-1,n,th,key,nxt,kind,info)})}
   r.gt=T;r.branch=id;r.bi=i;rooms[key]=r;
  });
 }
 rooms.sec=buildRoom(a,{kind:'secret',key:'sec',seed:sd+404,len:3000,bonus:.3,name:'THE FAR REACHES',sub:'A HIDDEN PLACE'});
 rooms.t1=buildRoom(a,{kind:'path',key:'t1',seed:sd+505,len:1,bonus:.1,name:'THE HIGH PLACE',sub:'A QUIET SUMMIT',build:C=>roadBuild(C,-1,420+a*20,THEMES[a%THEMES.length],'t1',null,'exit',info,{mem:true})});
 rooms.hub.branches=branches;
 for(const id of set){
  const keys=branches[id];
  keys.forEach((k,i)=>{
   const r=rooms[k];
   r.parent=i?keys[i-1]:'hub';
   r.ret=i?(info.fwd[keys[i-1]]||{x:60,y:GY}):(info.doors[keys[0]]||{x:60,y:GY});
   r.hubRet=info.doors[keys[0]]||{x:60,y:GY};
   if(r.gt==='L'||r.gt==='A')for(const po of r.portals)if(po.to==='hub'&&po.x>200)po.far=true;
  });
 }
 for(const k of['sec','t1']){const r=rooms[k];r.parent='hub';r.ret=info.doors[k]?{x:info.doors[k].x,y:info.doors[k].y}:{x:60,y:GY};r.hubRet=r.ret}
 for(const k in rooms){
  const r=rooms[k];
  if(!r.entry)r.entry={x:110,y:GY};
  let mn=GY;for(const s of r.solids)if(!s.wall&&!s.gate&&s.y<mn)mn=s.y;
  r.top=Math.min(0,(r.topY!==undefined?r.topY:mn)-38);
  if(!r.reveal)r.reveal=[];
 }
 const sv=G.explSaved[a];
 if(sv)for(const k in rooms){const arr=sv[k];if(arr)for(const i of arr)if(i<rooms[k].expl.length)rooms[k].expl[i]=1}
 return rooms;
};

/* ---- الانتقال بين الغرف ---- */
usePortal=function(po){
 SFX.gate();
 fadeThen(()=>{
  saveMap();
  const lv=G.lv;let to=po.to,x=po.tx,y=po.ty;
  if(po.far&&lv.hubRet){to='hub';x=lv.hubRet.x;y=lv.hubRet.y}
  else if(to==='hub'&&lv.parent&&lv.key!=='hub'){to=lv.parent;x=x!==undefined?x:lv.ret.x;y=y!==undefined?y:lv.ret.y}
  else if(x===undefined){const r=G.world.rooms[to];x=r.entry.x;y=r.entry.y}
  enterRoom(to,x,y);G.state='play';
 });
};
const _enter=enterRoom;
enterRoom=function(k,x,y){_enter(k,x,y);const lv=G.lv;G.camY=lv.top?clamp(G.p.y-112,lv.top,0):0};

/* ---- كشف الأبواب المخفية ---- */
const _upd=update;
update=function(rd){
 _upd(rd);
 const lv=G.lv;if(!lv||G.state!=='play'||!lv.reveal)return;
 for(const r of lv.reveal)if(r.po.hidden&&r.test()){r.po.hidden=false;SFX.gate();SFX.memory();G.shake=.35;G.flash=.2;G.whisper={text:'Somewhere, a hidden door opens...',t:3.5,max:3.5}}
};

/* ---- خريطة العالم (المكتشف فقط) ---- */
Screens.map=function(A){
 const R=G.world.rooms,hub=R.hub,br=hub.branches,th=G.area*.83,AN={m1:0,m2:1.3,p:2.4,m3:3.5,p2:4.4},H0=[160,84];
 const P=(an,f)=>[H0[0]+Math.cos(an+th)*118*f,H0[1]+Math.sin(an+th)*38*f];
 const col={m1:'#ff4a6a',m2:'#ff4a6a',m3:'#ff4a6a',p:'#c070ff',p2:'#c070ff'};
 const seenRoom=k=>R[k]&&R[k].expl.some(v=>v);
 const dseen=k=>{const po=hub.portals.find(q=>q.to===k);return !!(po&&!po.hidden&&hub.expl[Math.floor(po.x/40)])};
 c.fillStyle='rgba(4,5,14,.95)';c.fillRect(8,5,304,170);c.strokeStyle=A.accent;c.lineWidth=1;c.strokeRect(8.5,5.5,303,169);
 c.letterSpacing='3px';txt('MAP · '+A.name,160,21,A.accent,10,'center');c.letterSpacing='0px';
 txt('Only what you have seen is drawn.',160,30,'#9aa2d8',6,'center');
 const cur=G.room==='hub'?(hub.arena?'boss':'hub'):G.room,nodes=[];
 for(const id in br){
  const keys=br[id],an=AN[id],done=G.keys.includes(id);let prev=H0;
  keys.forEach((k,i)=>{
   const sn=(i===0&&dseen(k))||seenRoom(k),pos=P(an,(i+1)/keys.length*.95+.05),gt=R[k].gt;
   if(sn){c.strokeStyle=col[id];c.globalAlpha=.7;c.beginPath();c.moveTo(prev[0],prev[1]);c.lineTo(pos[0],pos[1]);c.stroke();c.globalAlpha=1;nodes.push({k,pos,gt,id,last:i===keys.length-1,done})}
   prev=pos;
  });
 }
 const secSeen=seenRoom('sec')||hub.brks.some(q=>q.dead&&hub.portals.some(p=>p.to==='sec'&&Math.abs(q.x+40-p.x)<2));
 if(secSeen)nodes.push({k:'sec',pos:P(5.8,.8),gt:'S',id:'s',last:true,done:G.hearts.includes(G.area)});
 if(seenRoom('t1')||dseen('t1'))nodes.push({k:'t1',pos:P(5.1,.7),gt:'T',id:'t',last:true,done:false});
 if(!!hub.expl[Math.floor(hub.arenaX/40)]||hub.defeated)nodes.push({k:'boss',pos:P(2.0,1.05),gt:'B',id:'b',last:true,done:hub.defeated});
 nodes.push({k:'hub',pos:H0,gt:'H',id:'h',last:true,done:false});
 for(const nd of nodes){
  const[x,y]=nd.pos,cc=nd.gt==='S'?'#ffd23d':nd.gt==='B'?'#ff2a4a':nd.gt==='H'?A.accent:nd.gt==='T'?'#8affd8':col[nd.id]||A.accent;
  const r=nd.gt==='H'||nd.gt==='B'?7:nd.last?5:3;
  c.fillStyle=cc;c.globalAlpha=.25;c.beginPath();c.arc(x,y,r+4,0,7);c.fill();c.globalAlpha=1;
  c.beginPath();nd.gt==='L'?(c.moveTo(x,y-r-1),c.lineTo(x+r+1,y),c.lineTo(x,y+r+1),c.lineTo(x-r-1,y)):c.arc(x,y,r,0,7);c.fill();
  if(nd.gt==='D'||nd.gt==='U')txt(nd.gt==='D'?'↓':'↑',x,y+3,'#04050e',7,'center');
  if(nd.done){c.fillStyle='#6bff6b';c.fillRect(x+r,y-r-5,2,3);c.fillRect(x+r+2,y-r-3,2,2);c.fillRect(x+r+4,y-r-6,2,5)}
  if(nd.k===cur){c.strokeStyle='#fff';c.globalAlpha=.5+.5*Math.sin(G.t*6);c.beginPath();c.arc(x,y,r+7,0,7);c.stroke();c.globalAlpha=1}
  const lb=nd.gt==='L'?'LAIR':nd.gt==='A'?'ARCHIVE':nd.gt==='S'?'FAR':nd.gt==='B'?'BOSS':nd.gt==='H'?'HUB':nd.gt==='T'?'SUMMIT':'';
  if(lb)txt(lb,x,y+r+10,'#c8cff0',6,'center');
 }
 const lv=G.lv,n=lv.expl.length,sx=22,sw=276,sy=127;
 txt('ROOM · '+(lv.name||A.name),22,121,'#c8cff0',6);
 c.fillStyle='#0e0e22';c.fillRect(sx,sy,sw,10);const cw=sw/n;c.fillStyle=A.accent;c.globalAlpha=.4;
 for(let i=0;i<n;i++)if(lv.expl[i])c.fillRect(sx+i*cw,sy,Math.ceil(cw),10);c.globalAlpha=1;
 const X=x=>sx+clamp(x/Math.max(1,lv.len),0,1)*sw,sn=x=>lv.expl[Math.floor(x/40)];
 for(const q of lv.cps)if(q.on||sn(q.x)){c.fillStyle=q.on?'#ffd23d':'#6a6a88';c.fillRect(X(q.x)-1,sy-2,2,14)}
 for(const po of lv.portals)if(!po.hidden&&sn(po.x)){c.fillStyle=po.kind==='mini'?'#ff4a6a':po.kind==='puzzle'?'#c070ff':po.kind==='secret'?'#ffd23d':'#8fd8ff';c.fillRect(X(po.x)-2,sy+1,4,8)}
 if(lv.hasArena&&sn(lv.arenaX)){c.fillStyle='#ff2a4a';c.fillRect(X(lv.arenaX),sy-3,4,16)}
 c.fillStyle='#fff';c.fillRect(X(G.p.x)-1,sy-4,3,18);
 if(lv.topY!==undefined)txt((lv.gt==='U'||lv.key==='t1'?'HEIGHT ':'DEPTH ')+Math.round(GY-lv.topY)+'  ·  you: '+Math.round(clamp(GY-G.p.y,0,9999)),22,114,'#8affd8',6);
 txt('KEYS',22,153,'#9aa2d8',6);
 for(let k=0;k<KEYNEED();k++){c.fillStyle=G.keys.length>k?'#ffd23d':'#3a3a55';c.beginPath();c.moveTo(48+k*10,149);c.lineTo(52+k*10,153);c.lineTo(48+k*10,157);c.lineTo(44+k*10,153);c.fill()}
 txt('HEARTS '+G.p.max,100,153,'#ff8aa8',6);txt('✦ '+G.mems.length+'/11',152,153,'#fff',6);txt('☠ '+G.deaths,198,153,'#ff8a9a',6);txt(fmt(G.time),232,153,'#c8cff0',6);
 txt('RELICS',22,166,'#9aa2d8',6);
 for(let i=0;i<11;i++){c.fillStyle=G.relics.includes(i)?'#8affd8':'#22223a';c.beginPath();c.moveTo(64+i*11,160);c.lineTo(68+i*11,165);c.lineTo(64+i*11,170);c.lineTo(60+i*11,165);c.fill()}
 txt('M / MAP to close',298,14,'#7a80b0',5,'right');c.textAlign='left';
};
})();
