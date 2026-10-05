/* ===== WITHIN ME — game.js (v3) =====
   المحرك + اللعبة: الإدخال، المراحل، SFX، الخلفيات، تصميم المراحل، اللاعب، الـUI، اللوب */
'use strict';
const $=s=>document.querySelector(s);
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const hit=(a,b)=>a.x<b.x+b.w&&a.x+a.w>b.x&&a.y<b.y+b.h&&a.y+a.h>b.y;
const W=320,H=180,GY=142;
const store={
 get(k,d){try{const v=localStorage.getItem('withinme_'+k);return v===null?d:JSON.parse(v)}catch(e){return d}},
 set(k,v){try{localStorage.setItem('withinme_'+k,JSON.stringify(v))}catch(e){}}
};
function wrap(s,n){const w=s.split(' '),out=[];let l='';for(const x of w){if((l+' '+x).trim().length>n){out.push(l);l=x}else l=(l+' '+x).trim()}if(l)out.push(l);return out}

/* ================= INPUT (كيبورد + تاتش + جيمباد) ================= */
const Input=(()=>{
 const K=['left','right','up','down','jump','attack','dash','interact','pause'];
 const kb={},tc={},gp={},prev={},now={},pr={};
 const map={ArrowLeft:['left'],KeyA:['left'],ArrowRight:['right'],KeyD:['right'],
  ArrowUp:['up','jump'],KeyW:['up','jump'],ArrowDown:['down'],KeyS:['down'],
  Space:['jump'],KeyZ:['jump'],KeyJ:['attack'],KeyX:['attack'],KeyK:['dash'],KeyC:['dash'],ShiftLeft:['dash'],
  KeyE:['interact'],Enter:['interact'],Escape:['pause'],KeyP:['pause']};
 addEventListener('keydown',e=>{const ks=map[e.code];if(ks){for(const k of ks)kb[k]=true;e.preventDefault()}});
 addEventListener('keyup',e=>{const ks=map[e.code];if(ks)for(const k of ks)kb[k]=false});
 addEventListener('blur',()=>{for(const k of K)kb[k]=tc[k]=false});
 document.querySelectorAll('#touch button').forEach(b=>{
  const k=b.dataset.k,on=e=>{e.preventDefault();tc[k]=true},off=e=>{e.preventDefault();tc[k]=false};
  b.addEventListener('pointerdown',on);
  ['pointerup','pointerleave','pointercancel'].forEach(t=>b.addEventListener(t,off));
 });
 const pad=()=>{const l=navigator.getGamepads?navigator.getGamepads():[];for(const g of l)if(g&&g.connected)return g;return null};
 function update(){
  const g=pad();for(const k of K)gp[k]=false;
  if(g){
   const b=i=>g.buttons[i]&&g.buttons[i].pressed;
   gp.left=g.axes[0]<-.4||b(14);gp.right=g.axes[0]>.4||b(15);
   gp.up=g.axes[1]<-.5||b(12);gp.down=g.axes[1]>.5||b(13);
   gp.jump=b(0);gp.dash=b(1)||b(5)||b(7);gp.attack=b(2)||b(3);gp.interact=b(0)||b(2);gp.pause=b(9);
  }
  for(const k of K){prev[k]=now[k];now[k]=!!(kb[k]||tc[k]||gp[k]);pr[k]=now[k]&&!prev[k]}
 }
 return{update,down:k=>now[k],pressed:k=>pr[k],pad:()=>!!pad()};
})();

/* ================= AREAS (كل عالم له أرضية وزخارف وخلفية مختلفة) ================= */
const AREAS=[
 {id:'fear',name:'FEAR',boss:'The Fear',tag:"Darkness, uncertainty, what's ahead?",sky:['#04060f','#13235a'],far:'#0e1a4a',mid:'#0a1236',near:'#070b22',accent:'#4aa3ff',style:'spikes',style2:'trees',tile:'cracks',hz:'#1a2a90',deco:'mist',moon:[250,46,13],fx:'dust',eyes:true,storm:true,pool:['shade','wisp']},
 {id:'betrayal',name:'BETRAYAL',boss:'The Betrayal',tag:'Unstable paths, deceptive routes',sky:['#0e0524','#4a1a7a'],far:'#3a1a6a',mid:'#26104a',near:'#14082a',accent:'#c070ff',style:'crooked',style2:'crystals',tile:'glass',hz:'#8a2aff',deco:'daggers',moon:[70,42,11],fx:'shards',eyes:true,win:true,pool:['shade','hopper']},
 {id:'temptation',name:'TEMPTATION',boss:'The Temptation',tag:'Attractive but dangerous',sky:['#2a0830','#ff4f9a'],far:'#a02a78',mid:'#6a1a56',near:'#2e0a2a',accent:'#ff7ac0',style:'hearts',style2:'arches',tile:'velvet',hz:'#ff2a7a',deco:'curtains',moon:[250,50,16],fx:'petals',pool:['wisp','charger']},
 {id:'alcohol',name:'ALCOHOL',boss:'The Bottle',tag:'Escape and consequences',sky:['#03140f','#0f4a3a'],far:'#14604a',mid:'#0c4030',near:'#061f18',accent:'#3dffb0',style:'bottles',style2:'towers',tile:'planks',hz:'#1aff8a',deco:'liquid',wob:true,moon:[200,44,12],fx:'bubbles',pool:['hopper','wisp']},
 {id:'greed',name:'GREED',boss:'The Greed',tag:"More isn't always better",sky:['#241400','#8a5a10'],far:'#9a6a1a',mid:'#6a4410',near:'#2e1c06',accent:'#ffd23d',style:'pillars',style2:'obelisks',tile:'bricks',hz:'#ffb020',deco:'coins',moon:[240,48,15],fx:'sparks',win:true,pool:['charger','watcher']},
 {id:'injustice',name:'INJUSTICE',boss:'The Judge',tag:'Unfairness and responsibility',sky:['#0a0a0e','#3a3a44'],far:'#4a4a56',mid:'#32323c',near:'#17171d',accent:'#d0d0d8',style:'bars',style2:'towers',tile:'plates',hz:'#7a7a8a',deco:'chains',moon:[160,34,10],fx:'ash',pool:['watcher','shade']},
 {id:'anger',name:'ANGER',boss:'The Rage',tag:'Lose control',sky:['#240202','#a01010'],far:'#7a1010',mid:'#500a0a',near:'#260404',accent:'#ff4040',style:'flames',style2:'spikes',tile:'magma',hz:'#ff5a10',deco:'lava',moon:[230,58,24],fx:'embers',storm:true,pool:['charger','hopper','wisp']},
 {id:'lying',name:'LYING',boss:'The Liar',tag:'What is real?',sky:['#04102a','#2a6aa8'],far:'#2a5a98',mid:'#1a4070',near:'#0a1c38',accent:'#8fd8ff',style:'mirrors',style2:'crystals',tile:'mirror',hz:'#9ae8ff',deco:'none',refl:true,moon:[90,44,13],fx:'glass',rays:true,pool:['wisp','watcher','hopper']},
 {id:'envy',name:'ENVY',boss:'The Envy',tag:'Wanting what others have',sky:['#021806','#1f8a3a'],far:'#1a7030',mid:'#105020',near:'#062010',accent:'#6bff6b',style:'towers',style2:'trees',tile:'moss',hz:'#3aff4a',deco:'vines',moon:[250,44,12],fx:'fireflies',eyes:true,win:true,pool:['wisp','hopper','shade']},
 {id:'pride',name:'PRIDE',boss:'The Self',tag:'You vs. yourself',sky:['#0e0626','#5a3aa8'],far:'#4a2a88',mid:'#341a62',near:'#170a30',accent:'#d8b8ff',style:'palace',style2:'arches',tile:'marble',hz:'#b080ff',deco:'glass',moon:[160,40,16],fx:'gold',rays:true,win:true,pool:['charger','watcher','hopper']},
 {id:'truth',name:'THE TRUTH',boss:'Lara',tag:'The truth',sky:['#14122a','#e8d8f8'],far:'#9a8ac8',mid:'#6a5a9a',near:'#2a2048',accent:'#ffffff',style:'palace',style2:'crystals',tile:'cloud',hz:'#ffffff',deco:'aurora',moon:[160,50,20],fx:'feathers',rays:true,pool:['wisp','shade']}
];
const MEMORIES=[
 'A child hid beneath the blanket. Nobody told him the dark was empty.',
 'A letter, never answered. The ink was still wet when he stopped writing.',
 'A door left open on purpose. He told himself he did not see it.',
 'A glass raised in a quiet kitchen. Someone was missing from the chair.',
 'Everything counted twice. Nothing was ever enough to hold.',
 'He judged himself first, and harshest. The verdict was always guilty.',
 'A slammed door. An apology rehearsed for years and never spoken.',
 'He practiced his smile until he forgot which one was real.',
 'A window across the street. A life he mistook for his own.',
 'A crown made of every apology he swallowed.',
 'Lara was never his enemy. She is the voice that stayed.'
];
const DEATH_LINES=['Fall. Rise.','Again.','The dark remembers.','Not yet.','Breathe. Try again.','Stand up, Alexander.','Pain is only a teacher.'];

/* ================= SFX ================= */
const SFX=(()=>{
 const tone=(f1,f2,d,type='square',vol=.05,delay=0)=>{
  const a=Music.ctx(),o=a.createOscillator(),g=a.createGain(),t=a.currentTime+delay;
  o.type=type;o.frequency.setValueAtTime(f1,t);o.frequency.exponentialRampToValueAtTime(Math.max(20,f2),t+d);
  g.gain.setValueAtTime(vol,t);g.gain.exponentialRampToValueAtTime(.0001,t+d);
  o.connect(g);g.connect(a.destination);o.start(t);o.stop(t+d+.02);
 };
 const blip=(f,d=.06,type='square',vol=.05)=>tone(f,f,d,type,vol);
 return{tone,blip,
  jump:()=>tone(330,620,.12),djump:()=>tone(450,900,.14,'triangle',.06),wall:()=>tone(260,520,.1),
  land:()=>tone(120,60,.08,'triangle',.05),dash:()=>tone(500,120,.14,'sawtooth',.04),
  slash:()=>tone(700,200,.09,'sawtooth',.035),hurt:()=>tone(220,50,.3,'sawtooth',.08),
  kill:()=>tone(400,120,.16,'square',.05),bossHit:()=>tone(180,60,.14,'sawtooth',.07),
  shoot:()=>tone(300,140,.12,'sawtooth',.035),shard:n=>tone(700+n*60,1000+n*60,.09,'sine',.05),
  heal:()=>{tone(500,500,.1,'triangle',.06);tone(750,750,.12,'triangle',.06,.09);tone(1000,1000,.16,'triangle',.06,.18)},
  cp:()=>{[0,1,2].forEach(i=>tone(400+i*200,400+i*200,.25,'sine',.05,i*.1))},
  crumble:()=>tone(90,40,.2,'square',.03),boom:()=>tone(100,30,.4,'sawtooth',.09),
  death:()=>{tone(300,40,.6,'sawtooth',.09);tone(150,30,.8,'sine',.08,.05)},
  spring:()=>tone(260,900,.2,'triangle',.07),
  lever:()=>{tone(200,120,.1,'square',.06);tone(400,500,.12,'square',.05,.08)},
  gate:()=>{tone(90,60,.5,'sawtooth',.07);tone(120,200,.4,'triangle',.05,.1)},
  memory:()=>{[0,1,2,3].forEach(i=>tone(600+i*150,600+i*150,.35,'sine',.05,i*.12))}};
})();

/* ================= BACKGROUND (عوالم متنوعة) ================= */
const BG=(()=>{
 const cache={};
 const hs=n=>{n=Math.sin(n*127.1+311.7)*43758.5453;return n-Math.floor(n)};
 const mix=(a,b,t)=>{const p=h=>[1,3,5].map(i=>parseInt(h.substr(i,2),16));const X=p(a),Y=p(b);
  return'#'+X.map((v,i)=>Math.round(v+(Y[i]-v)*t).toString(16).padStart(2,'0')).join('')};
 const FX={
  dust:{vx:-2,vy:-7,sz:1,n:36,a:.5},shards:{vx:-14,vy:26,sz:2,n:26,a:.55},
  petals:{vx:-10,vy:14,sz:2,n:30,a:.7,sw:8},bubbles:{vx:0,vy:-16,sz:0,n:22,a:.6,sw:4},
  sparks:{vx:-3,vy:-4,sz:1,n:40,a:.9,tw:1},ash:{vx:-6,vy:12,sz:1,n:44,a:.5,sw:3},
  embers:{vx:-12,vy:-28,sz:1,n:44,a:.85,sw:5},glass:{vx:-8,vy:3,sz:2,n:24,a:.6,tw:1},
  fireflies:{vx:0,vy:0,sz:1,n:26,a:.9,sw:14,tw:1},gold:{vx:-4,vy:-9,sz:1,n:40,a:.8,tw:1},
  feathers:{vx:-8,vy:9,sz:2,n:26,a:.8,sw:10}
 };

 function sky(A,i){
  if(cache[i])return cache[i];
  const k=document.createElement('canvas');k.width=W;k.height=H;const x=k.getContext('2d');
  const g=x.createLinearGradient(0,0,0,H);g.addColorStop(0,A.sky[0]);g.addColorStop(1,A.sky[1]);
  x.fillStyle=g;x.fillRect(0,0,W,H);
  x.fillStyle=A.accent;x.globalAlpha=.09;
  for(let y=90;y<H;y+=2)for(let xx=((y>>1)%2)*2;xx<W;xx+=4)x.fillRect(xx,y,1,1);
  const[mx,my,mr]=A.moon;
  x.globalAlpha=.10;x.beginPath();x.arc(mx,my,mr*2.4,0,7);x.fill();
  x.globalAlpha=.14;x.beginPath();x.arc(mx,my,mr*1.6,0,7);x.fill();
  x.globalAlpha=1;x.fillStyle=mix(A.accent,'#ffffff',.55);x.beginPath();x.arc(mx,my,mr,0,7);x.fill();
  x.fillStyle=A.sky[0];x.globalAlpha=.18;
  x.beginPath();x.arc(mx-mr*.3,my-mr*.2,mr*.22,0,7);x.fill();
  x.beginPath();x.arc(mx+mr*.35,my+mr*.3,mr*.16,0,7);x.fill();
  x.globalAlpha=1;
  return cache[i]=k;
 }
 function shape(c,st,x,b,w,h){
  c.beginPath();
  switch(st){
   case 'spikes':c.moveTo(x,b);c.lineTo(x+w/2,b-h);c.lineTo(x+w,b);break;
   case 'flames':c.moveTo(x,b);c.quadraticCurveTo(x+w*.1,b-h*.5,x+w*.5,b-h);c.quadraticCurveTo(x+w*.9,b-h*.4,x+w,b);break;
   case 'crooked':c.moveTo(x,b);c.lineTo(x+w*.25,b-h);c.lineTo(x+w,b-h*.75);c.lineTo(x+w*.85,b);break;
   case 'towers':c.rect(x,b-h,w*.7,h);c.rect(x+w*.15,b-h-8,w*.3,8);break;
   case 'palace':c.rect(x,b-h,w*.8,h);c.moveTo(x+w*.1,b-h);c.lineTo(x+w*.4,b-h-18);c.lineTo(x+w*.7,b-h);break;
   case 'pillars':c.rect(x,b-h,w*.6,h);c.rect(x-2,b-h-4,w*.6+4,4);break;
   case 'bars':for(let k=0;k<3;k++)c.rect(x+k*w/3,b-h,2,h);c.rect(x,b-h*.6,w*.8,2);break;
   case 'bottles':c.rect(x,b-h*.6,w*.7,h*.6);c.rect(x+w*.22,b-h,w*.26,h*.4);break;
   case 'mirrors':c.moveTo(x+w*.2,b);c.lineTo(x,b-h);c.lineTo(x+w*.7,b-h);c.lineTo(x+w*.9,b);break;
   case 'trees':c.rect(x+w*.42,b-h,w*.12+1,h);c.rect(x+w*.1,b-h*.72,w*.35,2);c.rect(x+w*.5,b-h*.55,w*.4,2);c.rect(x+w*.25,b-h*.92,w*.2,2);c.rect(x+w*.5,b-h*.82,w*.25,2);break;
   case 'crystals':c.moveTo(x,b);c.lineTo(x+w*.22,b-h);c.lineTo(x+w*.44,b);c.moveTo(x+w*.3,b);c.lineTo(x+w*.58,b-h*.7);c.lineTo(x+w*.86,b);c.moveTo(x+w*.5,b);c.lineTo(x+w*.7,b-h*.4);c.lineTo(x+w*.95,b);break;
   case 'obelisks':c.moveTo(x+w*.2,b);c.lineTo(x+w*.3,b-h);c.lineTo(x+w*.45,b-h-10);c.lineTo(x+w*.6,b-h);c.lineTo(x+w*.7,b);break;
   case 'arches':c.rect(x,b-h,w*.2,h);c.rect(x+w*.6,b-h,w*.2,h);c.rect(x,b-h-4,w*.8,8);break;
   case 'hearts':
    c.arc(x+w*.3,b-h*.7,w*.28,0,7);c.fill();c.beginPath();
    c.arc(x+w*.7,b-h*.7,w*.28,0,7);c.fill();c.beginPath();
    c.moveTo(x+w*.03,b-h*.62);c.lineTo(x+w*.5,b-h*.1);c.lineTo(x+w*.97,b-h*.62);c.lineTo(x+w*.5,b-h*.7);break;
  }
  c.fill();
 }
 function eyes(c,A,i,cam,t){
  c.fillStyle=A.accent;
  for(let k=0;k<7;k++){
   if(Math.sin(t*.7+k*2.3)<-.82)continue;
   const x=(((hs(k*9+i)*480-cam*.3)%480)+480)%480-80,y=96+hs(k*4+i)*44;
   c.globalAlpha=.18;c.fillRect((x-2)|0,(y-1)|0,12,4);
   c.globalAlpha=.95;c.fillRect(x|0,y|0,2,2);c.fillRect((x+6)|0,y|0,2,2);
  }
  c.globalAlpha=1;
 }
 function fx(c,A,i,cam,t){
  const F=FX[A.fx];
  c.fillStyle=A.fx==='embers'?'#ff8a3a':A.fx==='feathers'?'#ffffff':A.fx==='ash'?'#9a9aa8':A.accent;
  c.strokeStyle=A.accent;
  for(let k=0;k<F.n;k++){
   const par=.15+hs(k*1.7+i)*.5;
   let x=hs(k*3.1+i*7)*W+t*F.vx-cam*par+Math.sin(t*.8+k)*(F.sw||0);
   let y=hs(k*5.3+i*3)*190+t*F.vy;
   x=((x%W)+W)%W;y=((y%190)+190)%190-5;
   c.globalAlpha=F.a*(F.tw?(.35+.65*Math.abs(Math.sin(t*(1+k%3)+k))):1);
   if(F.sz===0){c.beginPath();c.arc(x|0,y|0,1.5+k%3,0,7);c.stroke()}
   else c.fillRect(x|0,y|0,F.sz+(k%4===0?1:0),F.sz+(A.fx==='shards'?3:0));
  }
  c.globalAlpha=1;
 }
 function rays(c,A,t){
  c.fillStyle=A.accent;
  for(let k=0;k<4;k++){
   const x=40+k*80+Math.sin(t*.3+k)*10;c.globalAlpha=.05+.03*Math.sin(t*.5+k*2);
   c.beginPath();c.moveTo(x,0);c.lineTo(x+22,0);c.lineTo(x-48,150);c.lineTo(x-70,150);c.fill();
  }
  c.globalAlpha=1;
 }
 /* زخارف خاصة بكل عالم */
 function deco(c,A,i,cam,t){
  const wrapx=(k,sp,par,m)=>((((k*sp-cam*par)%m)+m)%m)-40;
  switch(A.deco){
   case 'mist':c.fillStyle=A.accent;for(let k=0;k<5;k++){c.globalAlpha=.07;c.fillRect((((k*90-cam*.2-t*8*(1+k%2))%420+420)%420-60)|0,(126+k*6)|0,120,5)}break;
   case 'daggers':c.fillStyle=A.accent;for(let k=0;k<9;k++){const x=wrapx(hs(k+i)*400,1,.35,400),y=10+hs(k*2+i)*50+Math.sin(t+k)*4;c.globalAlpha=.55;c.fillRect(x|0,y|0,1,9);c.fillRect((x-2)|0,(y+8)|0,5,1)}break;
   case 'curtains':c.fillStyle=A.accent;for(let k=0;k<12;k++){c.globalAlpha=.16;c.fillRect((k*28-((cam*.15)%28))|0,0,6,(20+Math.sin(t*1.2+k)*6)|0)}break;
   case 'liquid':c.fillStyle=A.hz;c.globalAlpha=.22;for(let x=0;x<W;x+=4)c.fillRect(x,(148+Math.sin(x*.08+t*2+cam*.02)*2)|0,4,32);break;
   case 'coins':c.fillStyle=A.accent;for(let k=0;k<6;k++){const x=wrapx(hs(k+i)*360,1,.3,360),y=24+hs(k*3+i)*60,w=Math.abs(Math.cos(t*2+k))*9+1;c.globalAlpha=.45;c.fillRect((x-w/2)|0,y|0,w|0,10)}break;
   case 'chains':for(let k=0;k<10;k++){const x=wrapx(k,38,.3,380),len=40+hs(k+i)*40;c.fillStyle='#8a8aa0';c.globalAlpha=.4;for(let y=0;y<len;y+=4)c.fillRect((x+(y%8?0:1))|0,y,2,3)}break;
   case 'lava':c.fillStyle=A.hz;c.globalAlpha=.2+.06*Math.sin(t*2);c.fillRect(0,146,W,5);c.globalAlpha=.07;c.fillRect(0,126,W,20);
    c.fillStyle='#000';for(let k=0;k<5;k++){c.globalAlpha=.08;c.fillRect((wrapx(k,70,.25,350))|0,0,14,150)}break;
   case 'vines':for(let k=0;k<14;k++){const x=wrapx(k,26,.28,364),len=14+hs(k+i)*40+Math.sin(t+k)*3;c.fillStyle='#2aaf4a';c.globalAlpha=.55;c.fillRect(x|0,0,1,len|0);c.fillStyle=A.accent;c.fillRect((x+1)|0,(len*.5)|0,2,2);c.fillRect((x-2)|0,(len*.8)|0,2,2)}break;
   case 'glass':{const cols=[A.accent,'#ff8ad0','#8ad0ff','#ffd23d'];for(let k=0;k<5;k++){const x=wrapx(k,90,.25,450)+30;c.fillStyle=cols[k%4];c.globalAlpha=.3+.1*Math.sin(t+k);c.fillRect(x|0,52,12,28);c.fillStyle='#000';c.globalAlpha=.4;c.fillRect((x+5)|0,52,2,28);c.fillRect(x|0,64,12,2)}break}
   case 'aurora':{const cs=[A.accent,'#8affd0','#c0a0ff'];for(let b=0;b<3;b++){c.fillStyle=cs[b];c.globalAlpha=.12;for(let x=0;x<W;x+=4)c.fillRect(x,(28+b*14+Math.sin(x*.03+t*.6+b+cam*.004)*10)|0,4,9)}break}
  }
  c.globalAlpha=1;
 }
 function draw(c,A,i,cam,t){
  c.drawImage(sky(A,i),0,0);
  c.fillStyle='#fff';
  for(let k=0;k<50;k++){
   const x=((hs(k+i*50)*W-cam*.05*(1+k%3*.3))%W+W)%W,y=hs(k*3+i)*110;
   c.globalAlpha=(.4+.6*Math.abs(Math.sin(t*(1+k%4)+k)))*.8;c.fillRect(x|0,y|0,1,1);
  }
  c.globalAlpha=1;
  if(A.deco==='aurora')deco(c,A,i,cam,t);
  const cols=[A.far,mix(A.far,A.mid,.5),A.mid,mix(A.near,A.mid,.35)];
  const par=[.1,.22,.4,.65],ws=[80,64,50,38],hm=[60,50,42,32],hr=[80,70,60,50];
  for(let li=0;li<4;li++){
   c.fillStyle=cols[li];
   const off=cam*par[li],w=ws[li],i0=Math.floor(off/w),st=li%2?A.style2:A.style;
   for(let n=i0;n<=i0+Math.ceil(W/w)+1;n++){
    const x=Math.round(n*w-off+(A.wob?Math.sin(t*1.4+n)*2:0)),h=hm[li]+hs(n*7+i*13+li*10)*hr[li];
    shape(c,st,x,150,w*.86,h);
    if(A.refl&&li===2){c.globalAlpha=.1;c.fillStyle=A.accent;shape(c,st,x,0,w*.86,-h*.6);c.globalAlpha=1;c.fillStyle=cols[li]}
    if(A.win&&li>0){
     c.fillStyle=A.accent;
     for(let k=0;k<3;k++)if(hs(n*13+k+i)>.45){c.globalAlpha=.5+.4*Math.sin(t*2+n+k);c.fillRect((x+w*.12+k*5)|0,(150-h*.55+(k%2)*8)|0,2,3)}
     c.globalAlpha=1;c.fillStyle=cols[li];
    }
   }
   c.fillRect(0,150,W,30);
   if(li===1&&A.eyes){eyes(c,A,i,cam,t);c.fillStyle=cols[li]}
   if(li===2&&A.rays)rays(c,A,t);
  }
  if(A.deco!=='aurora')deco(c,A,i,cam,t);
  c.fillStyle=A.accent;
  for(let k=0;k<7;k++){c.globalAlpha=.025*(1-Math.abs(k-3)/4);c.fillRect(0,(118+k*5+Math.sin(t*.4+k)*3)|0,W,6)}
  c.globalAlpha=1;
  fx(c,A,i,cam,t);
  if(A.storm){const L=t%7.3;if(L<.08||(L>.16&&L<.22)){c.globalAlpha=.28;c.fillStyle='#fff';c.fillRect(0,0,W,H);c.globalAlpha=1}}
 }
 function fg(c,A,i,cam){
  c.fillStyle=mix(A.near,'#000000',.65);
  const w=60,off=cam*1.4,i0=Math.floor(off/w);
  for(let n=i0;n<=i0+Math.ceil(W/w)+1;n++){
   if(hs(n*3.3+i)<.55)continue;
   shape(c,n%2?A.style:A.style2,Math.round(n*w-off),H+4,22+hs(n+i)*14,26+hs(n*2+i)*30);
  }
 }
 /* وهج الهاوية (الموت) */
 function pit(c,A,t){
  c.fillStyle=A.hz;
  for(let k=0;k<8;k++){c.globalAlpha=.05+.045*k;c.fillRect(0,H-26+k*3,W,3)}
  c.globalAlpha=.7;
  for(let k=0;k<12;k++){const x=hs(k*7)*W,y=H-2-Math.abs(Math.sin(t*2+k*1.7))*10;c.fillRect(x|0,y|0,1,1)}
  c.globalAlpha=1;
 }
 /* زخرفة سطح الأرض حسب العالم */
 function tile(c,A,s,cam,t){
  const x0=Math.max(s.x,cam-8),x1=Math.min(s.x+s.w,cam+W+8),y=s.y,tl=A.tile;
  const step=tl==='planks'?10:tl==='bricks'?16:tl==='plates'?12:tl==='moss'?3:tl==='cloud'?14:tl==='magma'?14:18;
  for(let x=Math.floor(x0/step)*step;x<x1;x+=step){
   const r=hs(x*.37+3);
   switch(tl){
    case'cracks':if(r>.4){c.fillStyle='#000';c.globalAlpha=.4;c.fillRect(x,y+4,1,6);c.fillRect(x+1,y+9,1,5);c.fillRect(x,y+13,1,6)}
     if(r>.7){c.fillStyle=A.accent;c.globalAlpha=.4;c.fillRect(x+3,y,1,5)}break;
    case'glass':if(r>.5){c.fillStyle=A.accent;c.globalAlpha=.8;c.beginPath();c.moveTo(x,y);c.lineTo(x+3,y-5);c.lineTo(x+6,y);c.fill()}break;
    case'velvet':c.fillStyle=A.accent;c.globalAlpha=.12;c.fillRect(x,y+6,step,2);c.fillRect(x,y+14,step,2);
     if(r>.8){c.globalAlpha=.5;c.fillRect(x+2,y+9,2,1);c.fillRect(x+5,y+9,2,1);c.fillRect(x+2,y+10,5,2)}break;
    case'planks':c.fillStyle='#000';c.globalAlpha=.3;c.fillRect(x,y+2,1,40);c.fillStyle='#fff';c.globalAlpha=.25;c.fillRect(x+3,y+4,1,1);
     if(r>.75){c.fillStyle=A.accent;c.globalAlpha=.5;c.fillRect(x+1,y,8,1)}break;
    case'bricks':c.fillStyle='#000';c.globalAlpha=.3;
     for(let yy=y+8;yy<y+40;yy+=8){c.fillRect(x,yy,step,1);c.fillRect(x+(((yy-y)>>3)&1?8:0),yy-7,1,7)}
     if(r>.8){c.fillStyle='#fff';c.globalAlpha=.5;c.fillRect(x+2,y+3,3,1)}break;
    case'plates':c.fillStyle='#000';c.globalAlpha=.35;if(x%24===0)c.fillRect(x,y+2,1,40);
     c.fillStyle='#fff';c.globalAlpha=.4;c.fillRect(x+2,y+3,1,1);c.fillRect(x+9,y+3,1,1);c.fillRect(x+2,y+16,1,1);break;
    case'magma':if(r>.3){c.fillStyle=A.hz;c.globalAlpha=.5+.3*Math.sin(t*3+x);c.fillRect(x,y+3,1,4);c.fillRect(x+1,y+6,2,1);c.fillRect(x+2,y+7,1,5)}break;
    case'mirror':c.fillStyle='#fff';c.globalAlpha=.13;for(let k=0;k<5;k++)c.fillRect(x+k*2,y+12-k*2,2,2);break;
    case'moss':c.fillStyle='#3adf5a';c.globalAlpha=.75;c.fillRect(x,y,2,2+Math.floor(r*4));break;
    case'marble':c.fillStyle='#fff';c.globalAlpha=.1;c.fillRect(x,y+6,6,1);c.fillRect(x+6,y+7,6,1);c.fillRect(x+12,y+9,6,1);break;
    case'cloud':c.fillStyle='#fff';c.globalAlpha=.35;c.fillRect(x,y-2,8,3);c.fillRect(x+2,y-4,5,3);break;
   }
  }
  if(tl==='marble'){c.fillStyle='#ffd23d';c.globalAlpha=.7;c.fillRect(x0,y,x1-x0,1)}
  c.globalAlpha=1;
 }
 return{draw,fg,hs,mix,pit,tile};
})();

/* ================= LEVEL DESIGN ================= */
function moveBody(b,solids,dt){
 const near=s=>s.x<b.x+b.w+70&&s.x+s.w>b.x-70;
 b.x+=b.vx*dt;
 for(const s of solids){
  if(s.oneway||s.dead||s.off||!near(s))continue;
  if(hit(b,s)){if(b.vx>0)b.x=s.x-b.w;else if(b.vx<0)b.x=s.x+s.w;b.vx=0}
 }
 const prevBottom=b.y+b.h;
 b.y+=b.vy*dt;b.ground=false;b.on=null;
 for(const s of solids){
  if(s.dead||s.off||!near(s)||!hit(b,s))continue;
  if(s.oneway){
   if(b.vy>=0&&prevBottom<=s.y+1.5){b.y=s.y-b.h;b.vy=0;b.ground=true;b.on=s}
  }else if(b.vy>0){b.y=s.y-b.h;b.vy=0;b.ground=true;b.on=s}
  else if(b.vy<0){b.y=s.y+s.h;b.vy=0}
 }
 b.wallL=b.wallR=false;
 const L={x:b.x-1,y:b.y+3,w:1,h:b.h-6},R={x:b.x+b.w,y:b.y+3,w:1,h:b.h-6};
 for(const s of solids){
  if(s.oneway||s.dead||s.off||!near(s))continue;
  if(hit(L,s))b.wallL=true;
  if(hit(R,s))b.wallR=true;
 }
}

/* أشواك/ليزر/نفاثات الفخ: 40% نازلة، 10% تحذير، 50% فعّالة */
const spikeF=s=>{if(!s.per)return 1;const ph=(G.t+s.ph)%s.per;return ph<s.per*.4?0:ph<s.per*.5?.35:1};
const crusherY=k=>{const u=((G.t+k.ph)%k.per)/k.per;
 if(u<.55)return GY-80;if(u<.62)return GY-80+54*((u-.55)/.07);if(u<.8)return GY-26;return GY-26-54*((u-.8)/.2)};

function buildLevel(a){
 let sd=a*977+13;const R=()=>{sd=(sd*16807)%2147483647;return sd/2147483647};
 const ri=(m,n)=>m+Math.floor(R()*(n-m+1));
 const A=AREAS[a],col=A.accent,pool=A.pool,diff=a/10;
 const lv={solids:[],enemies:[],spikes:[],saws:[],crushers:[],drops:[],winds:[],springs:[],darks:[],lasers:[],
  ladders:[],levers:[],gates:[],runes:[],memories:[],shards:[],cps:[],ground:GY,arenaX:0};
 const S=lv.solids;let gid=0;
 const ground=(x,w,belt)=>S.push({x,y:GY,w,h:80,kind:'ground',belt:belt||0});
 const block=(x,y,w)=>S.push({x,y,w,h:GY-y+10});
 const ledge=(x,y,w)=>S.push({x,y,w,h:7,oneway:true});
 const mover=(x,y,w,ax,ay,sp)=>S.push({x,y,w,h:7,oneway:true,mv:true,bx:x,by:y,ax,ay,sp,ph:R()*6,dx:0,dy:0});
 const crumb=(x,y,w)=>S.push({x,y,w,h:7,oneway:true,crumble:true,state:0,t:0,vy:0});
 const shard=(x,y)=>lv.shards.push({x,y,got:false,t:R()*6});
 const saw=(cx,cy,ax,ay,sp,orb=0,ph=R()*6)=>lv.saws.push({bx:cx,by:cy,ax,ay,sp,orb,ph,r:7,x:cx,y:cy});
 const arc=(x0,x1,top,n)=>{for(let i=0;i<n;i++){const u=i/(n-1);shard(x0+(x1-x0)*u,GY-14-Math.sin(u*Math.PI)*top)}};
 const foe=(ex,x0,x1,gy=GY)=>{
  if(ex<190)return null;
  const elite=a>=2&&R()<.12+diff*.12;
  const e=new Enemy(pool[ri(0,pool.length-1)],ex,gy,x0,x1,col,elite);lv.enemies.push(e);return e;
 };
 const ladder=(x,y,h,ex,ivy)=>lv.ladders.push({x,y,w:10,h,ex,ivy});
 const gate=(gx,id,kind)=>{const g={x:gx,y:-300,w:12,h:GY+300,gate:true,id,kind,open:0,opening:false,y0:-300,H0:GY+300};S.push(g);lv.gates.push(g);return g};
 const rune=(x,y,id)=>lv.runes.push({x,y,id,got:false});
 let x=0,since=0;

 const P={
  /* ---- راحة + نقطة حفظ ---- */
  flat(){const w=ri(150,220);ground(x,w);
   const n=ri(1,2+(diff>.4?1:0));for(let k=0;k<n;k++)foe(x+40+R()*(w-80),x+12,x+w-12);
   if(R()<.5)for(let k=0;k<5;k++)shard(x+30+k*(w-60)/4,GY-14);
   if(since>650){lv.cps.push({x:x+w/2,y:GY,on:false});since=0}
   x+=w},

  /* ---- قفزات ---- */
  gapJump(){const w=ri(60,90);ground(x,w);if(R()<.5)foe(x+w/2,x+10,x+w-10);x+=w;
   const g=ri(34,50+Math.floor(diff*8));arc(x-4,x+g+4,24,6);x+=g},
  gapDouble(){const w=ri(70,100);ground(x,w);x+=w;const g=ri(76,92);
   if(R()<.5)crumb(x+g/2-12,GY-4,24);arc(x-4,x+g+4,48,8);x+=g},
  moving(){const w=ri(70,100);ground(x,w);x+=w;const g=ri(120,150);
   mover(x+g/2-17,GY,34,(g-60)/2,0,1.1+diff*.5);arc(x,x+g,20,7);x+=g},
  crumble(){const w=ri(70,100);ground(x,w);x+=w;const g=ri(110,136),st=(g-12-24)/3;
   for(let k=0;k<4;k++)crumb(x+6+k*st,GY,24);arc(x,x+g,16,7);x+=g},
  ledgeHop(){const w=ri(60,90);ground(x,w);x+=w;const g=ri(130,160),n=3,st=g/(n+1);
   for(let k=1;k<=n;k++){ledge(x+k*st-11,GY-4-(k%2?0:14)-ri(0,8),22);shard(x+k*st,GY-30-(k%2?0:14))}
   x+=g},
  blinkBridge(){const w=ri(60,90);ground(x,w);x+=w;const g=ri(120,150),st=(g-38)/3;
   for(let k=0;k<4;k++)S.push({x:x+6+k*st,y:GY,w:26,h:7,oneway:true,blink:true,per:2.6,ph:k*(.7+diff*.3),off:false});
   arc(x,x+g,16,7);x+=g},
  windGap(){const w=ri(60,90);ground(x,w);x+=w;const g=ri(100,130),n=3,st=g/(n+1);
   lv.winds.push({x:x-20,w:g+40,f:(R()<.5?-1:1)*45});
   for(let k=1;k<=n;k++){ledge(x+k*st-12,GY-6-(k%2)*12,24);shard(x+k*st,GY-26)}
   x+=g},
  springWall(){const w=ri(200,240);ground(x,w);
   lv.springs.push({x:x+50,w:16,t:0});block(x+104,GY-72,34);
   shard(x+60,GY-60);shard(x+80,GY-84);shard(x+121,GY-86);shard(x+150,GY-30);
   foe(x+w-50,x+150,x+w-14);x+=w},
  elevator(){ground(x,90);const ex=x+50;mover(ex,GY-30,34,0,30,1.2+diff*.4);
   const bx=ex+40;block(bx,GY-62,90);
   shard(bx+20,GY-76);shard(bx+45,GY-76);shard(bx+70,GY-76);
   foe(bx+45,bx+8,bx+82,GY-62);
   block(bx+90,GY-40,26);block(bx+116,GY-20,26);
   ground(bx+142,40);x=bx+182},

  /* ---- أشواك ونفاثات ---- */
  spikePit(){const w=ri(170,230);ground(x,w);const sw=ri(30,44),sx=x+w/2-sw/2;
   lv.spikes.push({x:sx,y:GY-7,w:sw,h:7});arc(sx-10,sx+sw+10,34,7);
   if(R()<.7)foe(x+30,x+12,sx-14);if(R()<.6)foe(x+w-30,sx+sw+14,x+w-12);
   if(R()<.4)ledge(sx+sw/2-14,GY-40,28);x+=w},
  spikeTrap(){let px=x+40;
   for(let k=0;k<3;k++){const sw=ri(26,34);lv.spikes.push({x:px,y:GY-7,w:sw,h:7,per:2.2-diff*.3,ph:k*.7});shard(px+sw/2,GY-28);px+=sw+ri(28,40)}
   const w=px-x+30;ground(x,w);x+=w},
  spikeGauntlet(){let px=x+30;const n=ri(2,3);
   for(let k=0;k<n;k++){const sw=ri(32,40);lv.spikes.push({x:px,y:GY-7,w:sw,h:7});arc(px-6,px+sw+6,34,5);px+=sw+ri(22,28)}
   const w=px-x+20;ground(x,w);x+=w},
  jetRun(){let px=x+40;const n=ri(3,4);
   for(let k=0;k<n;k++){lv.spikes.push({x:px,y:GY-34,w:14,h:34,per:2.4-diff*.3,ph:k*.6,jet:true});shard(px+7,GY-52);px+=14+ri(34,46)}
   const w=px-x+30;ground(x,w);x+=w},
  beltRun(){const bw=ri(110,150);ground(x,bw,1);const px=x+bw;ground(px,76);
   lv.spikes.push({x:px+8,y:GY-7,w:34,h:7});shard(px+25,GY-30);shard(px+60,GY-20);
   foe(px+60,px+48,px+72);x+=bw+76},

  /* ---- مناشير ---- */
  sawGate(){const w=ri(190,240);ground(x,w);const cx=x+w/2,sp=1.8+diff*1.2;
   if(R()<.5)saw(cx,GY-22,0,15,sp);else saw(cx,GY-9,34,0,sp*.9);
   arc(cx-40,cx+40,40,7);foe(x+36,x+14,cx-50);x+=w},
  sawGap(){const w=ri(70,100);ground(x,w);x+=w;const g=ri(130,150);
   mover(x+g/2-17,GY,34,(g-60)/2,0,1.2+diff*.4);saw(x+g/2,GY-40,0,14,1.5+diff);
   arc(x,x+g,26,7);x+=g},
  sawmill(){const w=ri(220,260);ground(x,w);const cx=x+w/2,sp=1.1+diff*.8,ph0=R()*6;
   for(const r of[12,24,36])saw(cx,GY-44,0,0,sp,r,ph0);
   arc(cx-50,cx+50,30,8);foe(x+36,x+14,cx-60);x+=w},

  /* ---- ليزر ومهراس وحجارة ---- */
  laserHall(){let px=x+44;const n=ri(3,4);
   for(let k=0;k<n;k++){const low=k%2===0;lv.lasers.push({x:px,y0:low?GY-22:-10,y1:GY,per:2.6-diff*.5,ph:k*.7});shard(px+16,GY-30);px+=ri(40,52)}
   const w=px-x+30;ground(x,w);x+=w},
  crusherRun(){let px=x+50;const n=ri(2,3);
   for(let k=0;k<n;k++){lv.crushers.push({x:px,w:24,per:2.6,ph:k*.85});shard(px+12,GY-20);px+=24+ri(30,40)}
   const w=px-x+40;ground(x,w);x+=w},
  stalactites(){const w=ri(230,280);ground(x,w);
   for(let k=0;k<5;k++)lv.drops.push({x:x+50+k*Math.floor((w-80)/5),state:0,t:0,y:-12,vy:0});
   for(let k=0;k<6;k++)shard(x+40+k*(w-80)/5,GY-14);
   foe(x+w-40,x+w-90,x+w-14);x+=w},

  /* ---- حواجز وأبراج وتسلق ---- */
  hurdles(){const w=ri(210,270);ground(x,w);const n=ri(3,4),st=(w-50)/n,xs=[];
   for(let k=0;k<n;k++){const hh=[18,28,38,24][ri(0,3)],bx=x+34+k*st+ri(0,8);xs.push(bx);block(bx,GY-hh,12);shard(bx+6,GY-hh-14)}
   foe((xs[0]+xs[1])/2+6,xs[0]+16,xs[1]-6);x+=w},
  steps(){const bw=ri(28,34);ground(x,36);x+=36;
   [1,2,3,2,1].forEach(k=>{block(x,GY-k*16,bw);
    if(k===3){shard(x+bw/2,GY-3*16-12);if(R()<.7)foe(x+bw/2,x+6,x+bw-6,GY-48)}
    x+=bw});
   ground(x,30);x+=30},
  tower(){const w=ri(210,260);ground(x,w);const lx=x+30;
   ledge(lx,GY-34,42);ledge(lx+58,GY-62,42);ledge(lx+116,GY-90,46);
   shard(lx+21,GY-48);shard(lx+79,GY-76);shard(lx+139,GY-104);
   foe(x+w-60,x+w-100,x+w-14);if(R()<.6)foe(x+w-30,x+w-100,x+w-14);x+=w},
  shaft(){ground(x,150);block(x+30,GY-62,14);block(x+74,GY-62,14);
   shard(x+37,GY-76);shard(x+81,GY-76);shard(x+59,GY-30);shard(x+59,GY-50);
   foe(x+120,x+104,x+144);x+=150},
  ivyClimb(){const h=ri(84,110),bw=ri(90,120);ground(x,70);x+=70;
   block(x,GY-h,bw);ladder(x-5,GY-h,h,6,true);
   for(let k=0;k<4;k++)shard(x+16+k*(bw-32)/3,GY-h-14);
   if(R()<.6)lv.spikes.push({x:x+bw/2-14,y:GY-h-7,w:28,h:7});
   foe(x+bw-20,x+bw/2+20,x+bw-8,GY-h);x+=bw},
  sawLadder(){const h=ri(80,100),bw=ri(60,80);ground(x,60);x+=60;
   block(x,GY-h,bw);ladder(x-5,GY-h,h,6,false);
   saw(x,GY-h*.55,20,0,1.5+diff*1.2);
   for(let k=0;k<3;k++)shard(x+14+k*(bw-28)/2,GY-h-14);x+=bw},
  ambush(){const w=ri(260,320);ground(x,w);const n=ri(3,4+Math.floor(diff*3));
   for(let k=0;k<n;k++)foe(x+30+k*(w-60)/n,x+14,x+w-14);
   if(R()<.6)for(let k=0;k<6;k++)shard(x+30+k*(w-60)/5,GY-16);
   x+=w},
  darkRun(){const w=ri(300,360);ground(x,w);lv.darks.push({x:x-20,w:w+40});
   const n=ri(3,5);for(let k=0;k<n;k++)foe(x+40+k*(w-80)/n,x+14,x+w-14);
   for(let k=0;k<8;k++)shard(x+30+k*(w-60)/7,GY-14);x+=w},

  /* ---- ألغاز بسيطة ---- */
  leverGate(){const w=ri(250,300);ground(x,w);const id=++gid,lx=x+60;
   ledge(lx-14,GY-40,40);
   const lev={x:lx-4,y:GY-56,w:8,h:16,on:false,id};lv.levers.push(lev);
   lev.g=gate(x+w-30,id,'lever');
   arc(lx-30,lx+40,30,5);foe(x+w/2,x+90,x+w-60);if(R()<.6)foe(x+120,x+90,x+w-60);x+=w},
  runeGate(){const w=ri(300,340);ground(x,w);const id=++gid;
   ledge(x+40,GY-46,34);rune(x+57,GY-62,id);
   block(x+130,GY-36,30);rune(x+145,GY-52,id);
   lv.spikes.push({x:x+210,y:GY-7,w:36,h:7});rune(x+228,GY-40,id);
   gate(x+w-30,id,'runes');foe(x+100,x+90,x+125);x+=w},
  lockdown(){const w=ri(280,330);ground(x,w);const id=++gid,n=ri(3,4+Math.floor(diff*2));
   for(let k=0;k<n;k++){const e=foe(x+40+k*(w-110)/n,x+16,x+w-60);if(e)e.grp=id}
   gate(x+w-30,id,'kill');
   for(let k=0;k<6;k++)shard(x+30+k*(w-110)/5,GY-14);x+=w},
  secret(){const w=ri(180,220);ground(x,w);const mid=x+w/2;
   block(mid,GY-100,40);ladder(mid-5,GY-100,100,6,true);
   lv.memories.push({x:mid+20,y:GY-118,got:false,text:MEMORIES[a]});
   foe(x+40,x+16,mid-30);x+=w}
 };

 /* [اسم العقبة ، أول فصل تظهر فيه ، أول نسبة تقدم داخل المرحلة] */
 const kit=[
  ['gapJump',0,0],['steps',0,0],['hurdles',0,0],['spikePit',0,0],['tower',0,0],['ambush',0,.05],['ledgeHop',0,.04],
  ['sawGate',0,.06],['spikeTrap',0,.08],['springWall',0,.06],['moving',0,.1],['elevator',0,.1],['stalactites',0,.1],
  ['ivyClimb',0,.08],['leverGate',0,.12],['lockdown',0,.2],
  ['beltRun',1,0],['jetRun',1,.1],['blinkBridge',1,.08],['windGap',1,.15],['darkRun',1,.15],['crumble',1,.1],
  ['runeGate',1,.15],['laserHall',1,.15],['sawLadder',1,.2],
  ['gapDouble',2,0],['spikeGauntlet',2,.15],['crusherRun',2,.15],
  ['sawGap',3,.15],['shaft',3,.05],['sawmill',3,.2]
 ];
 const target=a===10?11200:14400+a*720;
 P.flat();const hist=['flat'];
 while(x<target){
  const prog=x/target;let name;
  if(!lv.memories.length&&prog>.45)name='secret';
  else if(since>700)name='flat';
  else{const opts=kit.filter(k=>k[1]<=a&&k[2]<=prog&&!hist.includes(k[0]));name=opts[ri(0,opts.length-1)][0]}
  const x0=x;P[name]();since+=x-x0;hist.push(name);if(hist.length>3)hist.shift();
 }
 lv.arenaX=x;ground(x,340);
 ledge(x+50,GY-44,46);ledge(x+244,GY-44,46);ledge(x+147,GY-76,46);   // منصات الساحة
 return lv;
}
function updatePlatforms(lv,dt){
 for(const s of lv.solids){
  if(s.mv){const ox=s.x,oy=s.y;s.ph+=dt*s.sp;s.x=s.bx+Math.sin(s.ph)*s.ax;s.y=s.by+Math.sin(s.ph)*s.ay;s.dx=s.x-ox;s.dy=s.y-oy}
  if(s.crumble){
   if(s.state===1){s.t-=dt;if(s.t<=0){s.state=2;s.vy=0}}
   else if(s.state===2){s.vy+=600*dt;s.y+=s.vy*dt;if(s.y>260)s.dead=true}
  }
  if(s.blink){const ph=(G.t+s.ph)%s.per;s.off=ph>s.per*.62}
  if(s.opening&&!s.dead){s.open=Math.min(1,s.open+dt*1.4);s.y=s.y0-s.H0*s.open;if(s.open>=1)s.dead=true}
 }
 for(const k of lv.springs)if(k.t>0)k.t-=dt;
}
function updateSaws(lv,dt){
 for(const s of lv.saws){
  s.ph+=dt*s.sp;
  if(s.orb){s.x=s.bx+Math.cos(s.ph)*s.orb;s.y=s.by+Math.sin(s.ph)*s.orb}
  else{s.x=s.bx+Math.sin(s.ph)*s.ax;s.y=s.by+Math.sin(s.ph)*s.ay}
 }
}
function updateDrops(lv,dt,p){
 for(const d of lv.drops){
  if(d.state===0){if(Math.abs(p.x+4-d.x)<46){d.state=1;d.t=.6}}
  else if(d.state===1){d.t-=dt;if(d.t<=0){d.state=2;d.vy=0;d.y=0}}
  else if(d.state===2){d.vy+=700*dt;d.y+=d.vy*dt;
   if(d.y>GY-12){d.state=3;d.t=2.5;spark(d.x,GY-4,'#cfd3ff',6,70);SFX.crumble()}}
  else{d.t-=dt;if(d.t<=0){d.state=0;d.y=-12}}
 }
}
/* العقبات تقتل فوراً (الـdash يمرّك من خلالها) */
function hazards(p,lv){
 if(p.dash>0)return false;
 const r={x:p.x+1,y:p.y+1,w:p.w-2,h:p.h-2};
 for(const s of lv.spikes){if(Math.abs(s.x-p.x)>60||spikeF(s)<1)continue;if(hit(r,{x:s.x+2,y:s.y+2,w:s.w-4,h:s.h-2}))return true}
 for(const l of lv.lasers){if(Math.abs(l.x-p.x)>30||spikeF(l)<1)continue;if(hit(r,{x:l.x-2,y:l.y0,w:4,h:l.y1-l.y0}))return true}
 for(const s of lv.saws){
  if(Math.abs(s.x-p.x)>60)continue;
  const nx=clamp(s.x,r.x,r.x+r.w),ny=clamp(s.y,r.y,r.y+r.h),dx=s.x-nx,dy=s.y-ny;
  if(dx*dx+dy*dy<s.r*s.r-2)return true;
 }
 for(const k of lv.crushers){if(Math.abs(k.x-p.x)>40)continue;const y=crusherY(k);if(y>GY-60&&hit(r,{x:k.x,y,w:k.w,h:26}))return true}
 for(const d of lv.drops)if(d.state===2&&Math.abs(d.x-p.x)<20&&hit(r,{x:d.x-3,y:d.y,w:6,h:12}))return true;
 return false;
}

/* ================= PLAYER ================= */
function makePlayer(x,y){
 return{x,y,w:8,h:16,vx:0,vy:0,face:1,hp:5,max:5,ground:false,on:null,coy:0,jb:0,jumps:0,
  atk:0,atkCd:0,atkId:0,dash:0,dashCd:0,dashAvail:true,inv:0,stun:0,lock:0,anim:0,
  wallL:false,wallR:false,sliding:false,trailT:0,climb:null,dead:false};
}
const atkBox=p=>({x:p.face>0?p.x+p.w:p.x-20,y:p.y,w:20,h:16});
function hurt(p,dir){
 if(p.dead||p.inv>0||p.dash>0||G.state!=='play')return false;
 p.hp--;p.inv=1.3;p.stun=.2;p.vx=dir*120;p.vy=-140;p.climb=null;G.shake=.2;G.flash=.25;
 SFX.hurt();spark(p.x+4,p.y+8,'#ff4a6a',10,110);
 return true;
}
function ladderAt(p,lv){
 const cx=p.x+p.w/2,cy=p.y+p.h/2;
 for(const l of lv.ladders)if(cx>l.x&&cx<l.x+l.w&&cy>l.y-12&&cy<l.y+l.h)return l;
 return null;
}
function updatePlayer(p,I,dt,lv){
 const S=lv.solids;
 p.anim+=dt;p.atk-=dt;p.atkCd-=dt;p.dashCd-=dt;p.inv-=dt;p.stun-=dt;p.lock-=dt;p.dash-=dt;
 let mx=(I.down('right')?1:0)-(I.down('left')?1:0);
 if(G.invertT>0)mx=-mx;

 /* ---- تسلق السلالم واللبلاب ---- */
 const lad=ladderAt(p,lv);
 if(p.climb&&(!lad||p.stun>0))p.climb=null;
 if(!p.climb&&lad&&p.stun<=0&&p.dash<=0){
  const down=I.down('down')&&p.y+p.h<lad.y+lad.h-3;
  if(I.down('up')||down){p.climb=lad;p.vx=p.vy=0;p.jumps=0;p.dashAvail=true;p.x=lad.x+lad.w/2-p.w/2}
 }
 if(p.climb){
  const l=p.climb,dy=(I.down('down')?1:0)-(I.down('up')?1:0);
  p.vx=0;p.vy=dy*54;p.y+=p.vy*dt;p.x=l.x+l.w/2-p.w/2;p.ground=false;p.on=null;p.wallL=p.wallR=false;
  if(dy)p.face=Math.floor(p.anim*6)%2?1:-1;
  if(p.y+p.h<=l.y){p.y=l.y-p.h;p.x+=l.ex||0;p.climb=null;p.vy=0}
  else if(p.y+p.h>=l.y+l.h){p.y=l.y+l.h-p.h;p.climb=null;p.vy=0}
  else if(I.pressed('jump')&&(!I.down('up')||mx!==0)){p.climb=null;p.vy=-230;p.vx=mx*85;p.jumps=1;p.coy=0;SFX.jump()}
  if(I.pressed('attack')&&p.atkCd<=0){p.atk=.2;p.atkCd=.28;p.atkId++;SFX.slash()}
  return;
 }

 if(p.on&&p.on.mv){p.x+=p.on.dx;p.y+=p.on.dy}
 const wasGround=p.ground,vyB=p.vy;
 if(p.ground){p.coy=.1;p.jumps=0;p.dashAvail=true}else p.coy-=dt;
 if(!p.ground&&p.coy<=0&&p.jumps===0)p.jumps=1;
 p.jb=I.pressed('jump')?.12:p.jb-dt;

 if(p.stun>0){
  p.vy=Math.min(p.vy+780*dt,330);p.vx*=.92;
 }else if(p.dash>0){
  p.vx=p.face*240;p.vy=0;
  p.trailT-=dt;if(p.trailT<=0){G.parts.push({ghost:true,x:p.x-2,y:p.y-2,face:p.face,l:.25,max:.25,vx:0,vy:0,g:0});p.trailT=.03}
 }else{
  if(p.lock<=0){
   const acc=p.ground?900:520;
   p.vx+=clamp(mx*92-p.vx,-acc*dt,acc*dt);
   if(mx)p.face=mx;
  }
  p.vy=Math.min(p.vy+780*dt,330);
  p.sliding=false;
  if(!p.ground&&p.vy>0&&((mx>0&&p.wallR)||(mx<0&&p.wallL))){p.sliding=true;p.vy=Math.min(p.vy,42)}
  if(I.pressed('dash')&&p.dashCd<=0&&p.dashAvail&&G.noDashT<=0){p.dash=.14;p.dashCd=.45;p.dashAvail=false;SFX.dash()}
  if(p.jb>0){
   if(p.coy>0){p.vy=-268;p.jb=0;p.coy=0;p.jumps=1;SFX.jump();dust(p,4)}
   else if(!p.ground&&(p.wallL||p.wallR)){
    const dir=p.wallL?1:-1;p.vx=dir*120;p.vy=-250;p.face=dir;p.lock=.16;p.jb=0;p.jumps=1;SFX.wall();dust(p,4)
   }else if(p.jumps<2){p.vy=-236;p.jumps=2;p.jb=0;SFX.djump();spark(p.x+4,p.y+16,'#ffffff',8,70)}
  }
  if(!I.down('jump')&&p.vy<-105&&p.lock<=0)p.vy=-105;
  if(I.pressed('attack')&&p.atkCd<=0){p.atk=.2;p.atkCd=.28;p.atkId++;SFX.slash()}
 }
 /* حزام ناقل + رياح + سحب البوس */
 let ex=0;
 if(p.on&&p.on.belt)ex+=p.on.belt*38;
 for(const z of lv.winds)if(p.x+4>z.x&&p.x+4<z.x+z.w)ex+=z.f;
 if(G.pullT>0&&G.boss&&G.boss.active)ex+=Math.sign(G.pullX-(p.x+4))*55;
 p.vx+=ex;moveBody(p,S,dt);p.vx-=ex;

 if(p.ground&&!wasGround&&vyB>140){SFX.land();dust(p,5)}
 if(p.on&&p.on.crumble&&p.on.state===0){p.on.state=1;p.on.t=.45;SFX.crumble()}
}
function dust(p,n){for(let i=0;i<n;i++)G.parts.push({x:p.x+4,y:p.y+15,vx:(Math.random()-.5)*50,vy:-Math.random()*25,l:.3,max:.3,col:'#b8bfe8',g:60})}

/* ================= GAME STATE ================= */
const cv=$('#game'),c=cv.getContext('2d');c.imageSmoothingEnabled=false;
const G={state:'title',area:0,t:0,fade:0,fadeTo:null,cam:0,shake:0,flash:0,parts:[],shots:[],zones:[],lv:null,p:null,boss:null,
 arena:false,banner:0,card:null,whisper:null,wi:0,ctrl:store.get('ctrl','key'),shards:0,cp:null,hint:0,startArea:0,fromPause:false,
 deaths:0,deadT:0,ts:1,stop:0,dark:0,invertT:0,noDashT:0,pullT:0,pullX:0,darkT:0,mems:store.get('mems',[])};

function spark(x,y,col,n=8,sp=120){
 for(let i=0;i<n;i++)G.parts.push({x,y,vx:(Math.random()-.5)*sp,vy:-Math.random()*sp*.8,l:.5,max:.5,col,g:300});
}
function loadArea(i,skipIntro){
 const A=AREAS[i];
 G.area=i;G.lv=buildLevel(i);G.p=makePlayer(30,GY-16);
 G.boss=new Boss(i,G.lv.arenaX,GY);
 G.arena=false;G.cam=0;G.banner=3.5;G.parts=[];G.shots=[];G.zones=[];G.cp={x:34,y:GY};G.card=null;G.wi=0;G.hint=7;
 G.dark=0;G.invertT=G.noDashT=G.pullT=G.darkT=0;G.ts=1;G.stop=0;
 store.set('area',i);
 Dialogue.warm=i/10;
 Music.play(A.id);Music.setIntense(false);
 if(skipIntro){G.state='play';return}
 G.state='dialogue';Dialogue.show(DIALOGUE[i].intro,()=>G.state='play');
}
function fadeThen(fn){G.state='fade';G.fadeTo=fn}
function killPlayer(){
 const p=G.p;if(p.dead||G.state!=='play')return;
 p.dead=true;p.climb=null;G.deaths++;G.state='dead';G.deadT=.9;G.ts=.35;
 spark(p.x+4,p.y+8,'#ff4a6a',30,210);spark(p.x+4,p.y+8,'#ffffff',14,150);
 G.shake=.45;G.flash=.45;SFX.death();
}
function die(){
 fadeThen(()=>{
  const p=G.p;p.dead=false;p.hp=p.max;p.inv=1.5;p.vx=p.vy=0;p.stun=0;p.dash=0;p.climb=null;
  G.shots=[];G.zones=[];G.invertT=G.noDashT=G.pullT=G.darkT=0;G.ts=1;
  if(G.arena){
   G.lv.enemies=G.lv.enemies.filter(e=>!e.mn);
   G.boss=new Boss(G.area,G.lv.arenaX,GY);G.boss.start();
   p.x=G.lv.arenaX+30;p.y=GY-16;Music.setIntense(true);
  }else{p.x=G.cp.x-4;p.y=G.cp.y-20}
  G.whisper={text:DEATH_LINES[Math.floor(Math.random()*DEATH_LINES.length)],t:2.5,max:2.5};
  G.state='play';
 });
}
function ending(){
 store.set('area',0);Music.setIntense(false);
 fadeThen(()=>{
  G.state='title';G.lv=null;
  show('#title',true);show('#pbtn',false);show('#cont',false);
  $('#title h1').textContent='THE END';
  $('#tsub').innerHTML='You are not alone, Alexander.<br>A small game... with a big message.';
  $('#start').textContent='AGAIN';
 });
}
function togglePause(){
 if(G.fromPause)return;
 if(G.state==='play'){G.state='pause';show('#pause',true)}
 else if(G.state==='pause'){G.state='play';show('#pause',false)}
}

/* ================= UPDATE ================= */
function updateParts(dt){
 for(const q of G.parts){q.x+=q.vx*dt;q.y+=q.vy*dt;q.vy+=(q.g||0)*dt;q.l-=dt}
 G.parts=G.parts.filter(q=>q.l>0);
}
function update(rd){
 Input.update();G.t+=rd;
 let dt=rd*G.ts*(G.stop>0?.08:1);
 if(G.stop>0)G.stop-=rd;
 G.ts+=(1-G.ts)*Math.min(1,rd*2.5);
 if(G.shake>0)G.shake-=rd;if(G.flash>0)G.flash-=rd;if(G.hint>0)G.hint-=rd;
 if(G.card){G.card.t-=rd;if(G.card.t<=0)G.card=null}
 if(G.whisper){G.whisper.t-=rd;if(G.whisper.t<=0)G.whisper=null}
 if(G.fadeTo){G.fade+=rd*2;if(G.fade>=1){G.fade=1;const f=G.fadeTo;G.fadeTo=null;f()}}
 else if(G.fade>0)G.fade=Math.max(0,G.fade-rd*2);

 if(Input.pressed('pause'))togglePause();
 Dialogue.update(rd);
 if(G.state==='dialogue'){
  if(Input.pressed('interact')||Input.pressed('attack')||Input.pressed('jump'))Dialogue.next();
  updateParts(dt);return;
 }
 if(G.state==='dead'){G.deadT-=rd;updateParts(dt);if(G.deadT<=0)die();return}
 if(G.state!=='play')return;

 const{p,lv,boss}=G,A=AREAS[G.area];
 G.banner-=rd;
 for(const k of['invertT','noDashT','pullT','darkT'])if(G[k]>0)G[k]-=dt;
 updatePlatforms(lv,dt);updateSaws(lv,dt);updateDrops(lv,dt,p);
 updatePlayer(p,Input,dt,lv);

 if(p.y>230||hazards(p,lv)){killPlayer();return}

 // ظلام (مناطق + بوس)
 let dk=0;for(const d of lv.darks)if(p.x>d.x&&p.x<d.x+d.w)dk=1;if(G.darkT>0)dk=1;
 G.dark+=(dk-G.dark)*Math.min(1,rd*3);

 // دخول ساحة البوس
 if(!G.arena&&p.x>lv.arenaX+34){
  G.arena=true;
  lv.solids.push({x:lv.arenaX-6,y:-200,w:6,h:500,wall:true});
  lv.solids.push({x:lv.arenaX+340,y:-200,w:6,h:500,wall:true});
  G.state='dialogue';
  G.card={title:A.boss.toUpperCase(),sub:A.tag,t:3.4,max:3.4};
  Dialogue.show(DIALOGUE[G.area].boss,()=>{G.state='play';boss.start();Music.setIntense(true)});
  return;
 }
 const target=G.arena?lv.arenaX:clamp(p.x-120+p.face*18,0,lv.arenaX);
 G.cam+=(target-G.cam)*Math.min(1,rd*6);

 // نقاط الحفظ
 for(const cp of lv.cps){
  if(!cp.on&&Math.abs(p.x+4-cp.x)<14&&Math.abs(p.y+16-cp.y)<30){
   cp.on=true;G.cp=cp;
   if(p.hp<p.max){p.hp++;SFX.heal()}else SFX.cp();
   spark(cp.x,cp.y-12,A.accent,16,90);
   const Wh=WHISPERS[G.area];G.whisper={text:Wh[G.wi++%Wh.length],t:4.2,max:4.2};
  }
 }
 // الشظايا وقلوب الشفاء
 for(const s of lv.shards){
  if(s.got||Math.abs(s.x-p.x)>30)continue;
  const dx=p.x+4-s.x,dy=p.y+8-s.y;
  if(dx*dx+dy*dy<100){
   s.got=true;spark(s.x,s.y,s.heal?'#ff6a9a':A.accent,5,60);
   if(s.heal){if(p.hp<p.max){p.hp++;SFX.heal()}else SFX.shard(6)}
   else{G.shards++;SFX.shard(G.shards%8);if(G.shards%10===0&&p.hp<p.max){p.hp++;SFX.heal()}}
  }
 }
 // الذكريات
 for(const m of lv.memories){
  if(m.got||Math.abs(m.x-p.x)>20)continue;
  if(Math.abs(m.x-(p.x+4))<14&&Math.abs(m.y-(p.y+8))<16){
   m.got=true;SFX.memory();G.flash=.2;spark(m.x,m.y,'#ffffff',20,120);
   if(!G.mems.includes(G.area)){G.mems.push(G.area);store.set('mems',G.mems)}
   G.whisper={text:m.text,t:7,max:7,top:true};
  }
 }
 // الرونات
 for(const r of lv.runes){
  if(r.got||Math.abs(r.x-p.x)>20)continue;
  if(Math.abs(r.x-(p.x+4))<12&&Math.abs(r.y-(p.y+8))<14){r.got=true;SFX.shard(7);spark(r.x,r.y,'#c070ff',14,100)}
 }
 const box=atkBox(p);
 // المفاتيح
 for(const lev of lv.levers){
  if(!lev.on&&p.atk>0&&hit(box,lev)){lev.on=true;lev.g.opening=true;SFX.lever();SFX.gate();G.shake=.2;spark(lev.x+4,lev.y+6,'#ffd23d',10,100)}
 }
 // البوابات
 for(const g of lv.gates){
  if(g.opening||g.dead)continue;
  if(g.kind==='runes'&&lv.runes.filter(r=>r.id===g.id).every(r=>r.got)){g.opening=true;SFX.gate();G.shake=.2}
  if(g.kind==='kill'&&Math.abs(g.x-p.x)<400&&lv.enemies.filter(e=>e.grp===g.id).every(e=>e.dead)){g.opening=true;SFX.gate();G.shake=.2}
 }
 // النوابض
 for(const k of lv.springs){
  if(Math.abs(k.x-p.x)>30)continue;
  if(p.vy>=0&&hit(p,{x:k.x,y:GY-8,w:k.w,h:8})){p.vy=-350;p.jumps=1;p.coy=0;p.ground=false;k.t=.25;SFX.spring();spark(k.x+8,GY-6,'#ffffff',8,80)}
 }
 // الأعداء
 for(const e of lv.enemies){
  if(e.dead)continue;
  if(!e.mn&&Math.abs(e.x-p.x)>300)continue;
  e.update(dt,p,lv);
  if(p.atk>0&&e.hitId!==p.atkId&&hit(box,e)){
   e.hitId=p.atkId;e.hp--;e.flash=.12;spark(e.x+e.w/2,e.y+e.h/2,A.accent,8,100);
   if(e.hp<=0){
    e.dead=true;SFX.kill();
    lv.shards.push({x:e.x+e.w/2,y:e.y+e.h/2,got:false,t:0});
    if(Math.random()<(e.mn?.45:e.elite?.6:.1))lv.shards.push({x:e.x+e.w/2+6,y:e.y+e.h/2-4,got:false,t:0,heal:true});
   }else SFX.bossHit();
  }else if(hit(p,e))hurt(p,Math.sign(p.x-e.x)||1);
 }
 // البوس
 if(boss.active&&!boss.dead){
  boss.update(dt,p,lv);
  if(boss.vulnerable){
   if(p.atk>0&&boss.hitId!==p.atkId&&boss.inv<=0&&hit(box,boss)){
    boss.hitId=p.atkId;boss.hp--;boss.inv=.25;G.shake=.18;G.stop=.06;
    spark(boss.x+boss.w/2,boss.y+boss.h/2,boss.col,12,120);SFX.bossHit();
    if(boss.hp<=0)boss.beginDeath();
   }
   if(hit(p,boss))hurt(p,Math.sign(p.x-boss.x)||1);
  }
  if(!boss.said&&boss.hp<=boss.max/2&&boss.hp>0){
   boss.said=true;G.state='dialogue';Dialogue.show(DIALOGUE[G.area].mid,()=>G.state='play');
  }
 }
 if(boss.done&&!boss.handled){
  boss.handled=true;G.state='dialogue';
  Dialogue.show(DIALOGUE[G.area].outro,()=>{
   if(G.area>=10)ending();else fadeThen(()=>loadArea(G.area+1));
  });
 }
 // مناطق هجوم البوس (أعمدة نار / أشعة / مكنسة)
 for(const z of G.zones){
  z.t-=dt;
  if(z.t<=0){
   if(z.vx)z.x+=z.vx*dt;
   if(hit(p,{x:z.x,y:z.y,w:z.w,h:z.h}))hurt(p,Math.sign(p.x+4-(z.x+z.w/2))||1);
  }
 }
 G.zones=G.zones.filter(z=>z.t>-z.dur);
 // المقذوفات
 for(const s of G.shots){
  if(s.homing){
   const dx=p.x+4-s.x,dy=p.y+8-s.y,m=Math.hypot(dx,dy)||1;
   s.vx+=dx/m*90*dt;s.vy+=dy/m*90*dt;
   const sp=Math.hypot(s.vx,s.vy);if(sp>s.sp){s.vx*=s.sp/sp;s.vy*=s.sp/sp}
  }
  s.vy+=(s.g||0)*dt;s.x+=s.vx*dt;s.y+=s.vy*dt;s.life-=dt;
  if(s.bounce&&s.y>GY-4&&s.vy>0){s.y=GY-4;s.vy*=-.72;s.bn=(s.bn||0)+1;if(s.bn>3)s.life=0}
  const r=s.wave?{x:s.x-5,y:s.y-4,w:10,h:8}:{x:s.x-3,y:s.y-3,w:6,h:6};
  if(!s.wave&&p.atk>0&&hit(box,r)){s.life=0;spark(s.x,s.y,s.col,6,80);continue}
  if(hit(p,r)){s.life=0;hurt(p,Math.sign(s.vx)||1)}
  if(s.y>230)s.life=0;
 }
 G.shots=G.shots.filter(s=>s.life>0);
 if(p.hp<=0)killPlayer();
 updateParts(dt);
}

/* ================= RENDER ================= */
function txt(s,x,y,col,size,al){
 c.font=(size>=12?'bold ':'')+size+'px "Courier New",monospace';c.textAlign=al||'left';c.fillStyle=col;c.fillText(s,x,y);
}
function drawSolid(A,s,cam,t){
 if(s.wall||s.dead||s.gate||s.x+s.w<cam-4||s.x>cam+W+4)return;
 const x=Math.round(s.x),y=Math.round(s.y);
 if(s.oneway){
  const sh=s.crumble&&s.state===1?Math.round(Math.sin(t*60)):0;
  if(s.blink){
   const ph=(G.t+s.ph)%s.per,warn=ph>s.per*.52&&ph<=s.per*.62;
   if(s.off){c.globalAlpha=.18;c.strokeStyle=A.accent;c.strokeRect(x+.5,y+.5,s.w-1,6);c.globalAlpha=1;return}
   if(warn&&Math.floor(t*16)%2)c.globalAlpha=.4;
  }
  c.fillStyle=s.crumble?'#3a2a26':A.near;c.fillRect(x+sh,y,s.w,7);
  c.globalAlpha=s.mv?.6:.75;c.fillStyle=s.mv?'#fff':A.accent;c.fillRect(x+sh,y,s.w,1);
  c.globalAlpha=.35;c.fillStyle='#000';c.fillRect(x+sh,y+5,s.w,2);
  if(s.mv){c.globalAlpha=.35;c.fillStyle=A.accent;c.fillRect(x+3,y+7,s.w-6,2)}
  if(s.crumble){c.globalAlpha=.5;c.fillStyle='#000';for(let k=6;k<s.w-4;k+=8)c.fillRect(x+k,y+1,1,5)}
  c.globalAlpha=1;return;
 }
 c.fillStyle=BG.mix(A.near,'#ffffff',.06);c.fillRect(x,y,s.w,s.h);
 c.globalAlpha=.3;c.fillStyle='#000';c.fillRect(x,y+14,s.w,s.h);
 c.globalAlpha=.8;c.fillStyle=A.accent;c.fillRect(x,y,s.w,1);
 c.globalAlpha=.18;c.fillRect(x,y+1,s.w,2);
 c.globalAlpha=1;
 BG.tile(c,A,s,cam,t);
 c.globalAlpha=.35;c.fillStyle=A.accent;
 for(let k=2;k<s.w-2;k+=4){const h=1+Math.floor(BG.hs(s.x+k)*3);c.fillRect(x+k,y-h,1,h)}
 c.globalAlpha=1;
 if(s.belt){
  c.fillStyle=A.accent;c.globalAlpha=.6;
  for(let k=0;k<s.w;k+=10){const px=x+(((k+t*30*s.belt)%s.w)+s.w)%s.w;c.fillRect(px,y+3,4,1);c.fillRect(px+(s.belt>0?3:0),y+2,1,3)}
  c.globalAlpha=1;
 }
}
function drawGate(A,s,cam){
 if(s.dead||s.x+s.w<cam-4||s.x>cam+W+4)return;
 const top=Math.max(0,s.y),bot=Math.min(GY,s.y+s.h);if(bot<=top)return;
 const sh=s.opening?Math.round(Math.sin(G.t*50)):0;
 c.fillStyle='#6a6a88';for(let xx=s.x+1;xx<s.x+s.w;xx+=4)c.fillRect(xx+sh,top,2,bot-top);
 c.fillStyle='#2a2a40';c.fillRect(s.x,top,s.w,2);for(let yy=top+10;yy<bot;yy+=22)c.fillRect(s.x,yy,s.w,2);
 const col=s.kind==='lever'?'#ffd23d':s.kind==='runes'?'#c070ff':'#ff4a6a',my=GY-60+(s.y-s.y0);
 c.fillStyle=col;c.globalAlpha=.7+.3*Math.sin(G.t*4);c.fillRect(s.x+2,my,s.w-4,6);c.globalAlpha=1;
}
function drawLadder(A,l,cam){
 if(l.x+l.w<cam-4||l.x>cam+W+4)return;
 const x=Math.round(l.x),y=Math.round(l.y);
 c.fillStyle=BG.mix(A.near,'#ffffff',.3);c.fillRect(x+1,y,1,l.h);c.fillRect(x+l.w-2,y,1,l.h);
 c.fillStyle=A.accent;c.globalAlpha=.8;
 for(let yy=y+4;yy<y+l.h;yy+=6)c.fillRect(x+1,yy,l.w-2,1);
 if(l.ivy){c.fillStyle='#3adf5a';c.globalAlpha=.8;for(let yy=y+2;yy<y+l.h;yy+=9)c.fillRect(x+((yy>>1)%2?0:l.w-2),yy,2,2)}
 c.globalAlpha=1;
}
function drawSpikes(A,s){
 const f=spikeF(s);
 if(s.jet){
  c.fillStyle='#2a2a3a';c.fillRect(s.x,GY-3,s.w,3);
  if(f===0)return;
  const h=f<1?8+Math.sin(G.t*30)*2:s.h+Math.sin(G.t*25)*3,cx=s.x+s.w/2;
  c.fillStyle='#ff8a3a';c.beginPath();c.moveTo(s.x,GY-3);c.lineTo(cx,GY-3-h);c.lineTo(s.x+s.w,GY-3);c.fill();
  c.fillStyle='#ffe27a';c.beginPath();c.moveTo(s.x+3,GY-3);c.lineTo(cx,GY-3-h*.7);c.lineTo(s.x+s.w-3,GY-3);c.fill();
  return;
 }
 if(f===0){c.fillStyle=A.accent;c.globalAlpha=.35;c.fillRect(s.x,s.y+s.h-1,s.w,1);c.globalAlpha=1;return}
 const n=Math.max(1,Math.floor(s.w/6)),w=s.w/n,h=s.h*f;
 c.fillStyle=(f<1&&Math.floor(G.t*14)%2)?'#ff4a6a':'#dfe3ff';
 for(let k=0;k<n;k++){const x=s.x+k*w;c.beginPath();c.moveTo(x,s.y+s.h);c.lineTo(x+w/2,s.y+s.h-h);c.lineTo(x+w,s.y+s.h);c.fill()}
 c.globalAlpha=.4;c.fillStyle=A.accent;c.fillRect(s.x,s.y+s.h-1,s.w,1);c.globalAlpha=1;
}
function drawLaser(A,l){
 const f=spikeF(l);
 c.fillStyle='#2a2a3a';c.fillRect(l.x-3,l.y0<0?0:l.y0,6,3);c.fillRect(l.x-3,l.y1-3,6,3);
 if(f===0)return;
 if(f<1){c.globalAlpha=Math.floor(G.t*16)%2?.5:.15;c.fillStyle='#ff4a6a';c.fillRect(l.x,l.y0<0?0:l.y0,1,l.y1-Math.max(0,l.y0));c.globalAlpha=1;return}
 c.globalAlpha=.3;c.fillStyle='#ff4a6a';c.fillRect(l.x-3,Math.max(0,l.y0),6,l.y1-Math.max(0,l.y0));
 c.globalAlpha=1;c.fillRect(l.x-1,Math.max(0,l.y0),2,l.y1-Math.max(0,l.y0));c.fillStyle='#fff';c.fillRect(l.x,Math.max(0,l.y0),1,l.y1-Math.max(0,l.y0));
}
function drawSaw(A,s,t){
 c.strokeStyle=A.accent;c.globalAlpha=.18;
 if(s.orb){c.beginPath();c.arc(s.bx,s.by,s.orb,0,7);c.stroke();c.fillStyle='#2a2a3a';c.globalAlpha=.9;c.fillRect(s.bx-2,s.by-2,4,4)}
 else{c.beginPath();c.moveTo(s.bx-s.ax,s.by-s.ay);c.lineTo(s.bx+s.ax,s.by+s.ay);c.stroke()}
 c.globalAlpha=1;
 c.save();c.translate(Math.round(s.x),Math.round(s.y));c.rotate(t*9);
 c.fillStyle='#dfe3ff';c.beginPath();
 for(let k=0;k<12;k++){const an=k/12*6.283,r=k%2?s.r*.68:s.r;c.lineTo(Math.cos(an)*r,Math.sin(an)*r)}
 c.closePath();c.fill();
 c.fillStyle=A.near;c.beginPath();c.arc(0,0,2.2,0,7);c.fill();
 c.restore();
}
function drawCrusher(A,k){
 const y=crusherY(k),shake=(y===GY-80&&((G.t+k.ph)%k.per)/k.per>.45)?Math.round(Math.sin(G.t*60)):0;
 c.fillStyle='#555a70';c.fillRect(k.x+k.w/2,0,1,y);
 c.fillStyle=BG.mix(A.near,'#ffffff',.18);c.fillRect(k.x+shake,y,k.w,26);
 c.fillStyle=A.accent;c.globalAlpha=.7;c.fillRect(k.x+shake,y,k.w,1);c.globalAlpha=1;
 c.fillStyle='#dfe3ff';for(let i=0;i<4;i++){const x=k.x+i*6;c.beginPath();c.moveTo(x,y+26);c.lineTo(x+3,y+31);c.lineTo(x+6,y+26);c.fill()}
}
function drawDrop(A,d){
 if(d.state===3)return;
 c.fillStyle='#cfd3ff';
 if(d.state===2){c.beginPath();c.moveTo(d.x-3,d.y);c.lineTo(d.x+3,d.y);c.lineTo(d.x,d.y+12);c.fill();return}
 const sh=d.state===1?Math.round(Math.sin(G.t*60)):0;
 c.beginPath();c.moveTo(d.x-3+sh,0);c.lineTo(d.x+3+sh,0);c.lineTo(d.x+sh,7);c.fill();
 if(d.state===1&&Math.floor(G.t*14)%2){c.fillStyle='#ff4a6a';c.fillRect(d.x-4,GY-2,8,2)}
}
function drawSpring(k){
 const h=k.t>0?3:6;c.fillStyle='#2a2a3a';c.fillRect(k.x,GY-2,k.w,2);
 c.fillStyle='#ffd23d';c.fillRect(k.x+1,GY-2-h,k.w-2,2);
 c.fillStyle='#dfe3ff';for(let i=0;i<3;i++)c.fillRect(k.x+3+i*4,GY-2-h+2,2,h-2);
}
function drawWind(A,z,cam){
 if(z.x+z.w<cam||z.x>cam+W)return;
 c.fillStyle=A.accent;const sg=Math.sign(z.f);
 for(let k=0;k<10;k++){
  const u=(((k*z.w/10+G.t*60*sg)%z.w)+z.w)%z.w;
  c.globalAlpha=.25;c.fillRect(z.x+u,50+k*8,8,1);
 }
 c.globalAlpha=1;
}
function drawLever(l){
 c.fillStyle='#2a2a3a';c.fillRect(l.x,l.y+12,8,4);
 c.fillStyle=l.on?'#6a6a7a':'#ffd23d';
 c.fillRect(l.x+(l.on?1:5),l.y+4,2,9);c.fillRect(l.x+(l.on?0:4),l.y+2,4,3);
 if(!l.on){c.globalAlpha=.2+.15*Math.sin(G.t*5);c.beginPath();c.arc(l.x+6,l.y+4,8,0,7);c.fill();c.globalAlpha=1}
}
function drawRune(r){
 const y=r.y+Math.sin(G.t*3+r.x)*2;
 c.fillStyle='#c070ff';c.globalAlpha=.2+.1*Math.sin(G.t*4);c.beginPath();c.arc(r.x,y,9,0,7);c.fill();c.globalAlpha=1;
 c.fillRect(r.x-1,y-5,2,10);c.fillRect(r.x-3,y-3,6,6);c.fillStyle='#fff';c.fillRect(r.x-1,y-1,2,2);
}
function drawMemory(m){
 const y=m.y+Math.sin(G.t*2)*3;
 c.fillStyle='#ffffff';c.globalAlpha=.15;c.beginPath();c.arc(m.x,y,14,0,7);c.fill();
 c.globalAlpha=.3;c.beginPath();c.arc(m.x,y,8,0,7);c.fill();c.globalAlpha=1;
 c.fillRect(m.x-1,y-6,2,12);c.fillRect(m.x-6,y-1,12,2);c.fillRect(m.x-3,y-3,6,6);
}
function drawShard(A,s,t){
 const y=s.y+Math.sin(t*3+s.t)*2,col=s.heal?'#ff6a9a':A.accent;
 c.globalAlpha=.15;c.fillStyle=col;c.beginPath();c.arc(s.x,y,6,0,7);c.fill();c.globalAlpha=1;
 c.fillRect(Math.round(s.x)-1,Math.round(y)-3,2,6);c.fillRect(Math.round(s.x)-3,Math.round(y)-1,6,2);
 c.fillStyle='#fff';c.fillRect(Math.round(s.x)-1,Math.round(y)-1,2,2);
}
function drawCp(A,cp,t){
 const x=cp.x,y=cp.y;
 c.fillStyle='#2a2a3a';c.fillRect(x-1,y-22,2,22);c.fillRect(x-4,y-24,8,2);
 c.fillStyle=cp.on?A.accent:'#555a70';
 const f=cp.on?Math.round(Math.sin(t*10+x)):0;
 c.fillRect(x-2,y-30+f,4,5);c.fillRect(x-1,y-33+f,2,3);
 if(cp.on){c.globalAlpha=.18;c.beginPath();c.arc(x,y-27,16+Math.sin(t*4)*2,0,7);c.fill();c.globalAlpha=1}
}
function drawShot(s){
 if(s.wave){
  c.globalAlpha=.4;c.fillStyle=s.col;c.fillRect(s.x-6,s.y-5,12,10);
  c.globalAlpha=1;c.fillRect(s.x-4,s.y-3,8,6);c.fillStyle='#fff';c.fillRect(s.x-2,s.y-1,4,2);return;
 }
 c.globalAlpha=.3;c.fillStyle=s.col;c.fillRect(Math.round(s.x)-5,Math.round(s.y)-5,10,10);
 c.globalAlpha=1;c.fillRect(Math.round(s.x)-3,Math.round(s.y)-3,6,6);
 c.fillStyle='#fff';c.fillRect(Math.round(s.x)-1,Math.round(s.y)-1,2,2);
}
function drawZone(z){
 if(z.t>0){
  c.globalAlpha=Math.floor(G.t*14)%2?.55:.2;c.fillStyle=z.col;
  if(z.kind==='erupt')c.fillRect(z.x,GY-2,z.w,2);
  else if(z.kind==='beam')c.fillRect(z.x+z.w/2-1,0,2,GY);
  else c.fillRect(z.x,z.y,2,z.h);
  c.globalAlpha=1;return;
 }
 c.globalAlpha=.3;c.fillStyle=z.col;c.fillRect(z.x-3,z.y,z.w+6,z.h);
 c.globalAlpha=.9;c.fillRect(z.x,z.y,z.w,z.h);c.globalAlpha=1;
 c.fillStyle='#fff';c.fillRect(z.x+z.w/2-1,z.y,2,z.h);
}
function drawPlayer(p,A){
 if(p.dead)return;
 if(p.inv>0&&Math.floor(G.t*20)%2&&p.stun<=0)return;
 const moving=Math.abs(p.vx)>12;
 let fr='idle';
 if(p.climb)fr=Math.floor(p.anim*6)%2?'jump':'fall';
 else if(p.atk>0)fr='atk';
 else if(!p.ground)fr=p.vy<0?'jump':'fall';
 else if(moving)fr='run'+(Math.floor(p.anim*10)%2);
 c.fillStyle='#d84a5a';
 for(let k=1;k<=3;k++){
  const sx=p.x+4-p.face*(2+k*3)-p.vx*.02*k,sy=p.y+4+Math.sin(G.t*9+k)*1.4+k*.4;
  c.fillRect(Math.round(sx),Math.round(sy),3,2);
 }
 Sprites.draw(c,'alex',p.x-2,p.y-2,{flip:p.face<0,fr});
 if(G.invertT>0){c.fillStyle='#c070ff';c.fillRect(p.x+3,p.y-8,2,4);c.fillRect(p.x+3,p.y-3,2,2)}
 if(p.atk>0){
  const cx=p.x+4+p.face*7,cy=p.y+8,a=p.atk/.2;
  c.strokeStyle='#fff';c.lineWidth=2;c.globalAlpha=a;
  c.beginPath();c.arc(cx,cy,15,p.face>0?-1.1:Math.PI-1.1,p.face>0?1.1:Math.PI+1.1);c.stroke();
  c.lineWidth=1;c.globalAlpha=a*.5;c.beginPath();c.arc(cx,cy,11,p.face>0?-.9:Math.PI-.9,p.face>0?.9:Math.PI+.9);c.stroke();
  c.globalAlpha=1;
 }
}
function hintText(){
 if(G.ctrl==='touch')return'◀ ▶ move · JUMP (x2) · ⚔ attack · ⚡ dash · ▲▼ climb ladders · spikes & saws kill!';
 if(G.ctrl==='pad')return Input.pad()?'Stick move/climb · A jump (x2) · X attack · B dash · hazards kill instantly':'Connect a controller, then press any button';
 return'A/D move · Space jump (x2) · J attack · K dash · W/S climb · hazards kill instantly';
}
function drawTitleScene(){
 const A=AREAS[0];
 BG.draw(c,A,0,G.t*9,G.t);
 c.fillStyle=A.near;c.fillRect(0,152,W,28);c.fillRect(36,134,90,20);c.fillRect(52,126,56,10);
 c.fillStyle=A.accent;c.globalAlpha=.7;c.fillRect(52,126,56,1);c.fillRect(36,134,16,1);c.globalAlpha=1;
 c.fillStyle='#d84a5a';for(let k=1;k<=4;k++)c.fillRect(70-k*3,95+Math.sin(G.t*3+k)*1.5+k,3,2);
 Sprites.draw(c,'alex',66,90,{scale:2,fr:'idle'});
 Sprites.draw(c,'lara',252,102,{scale:2,fr:'idle',flip:true,alpha:.5});
 c.fillStyle=A.near;c.globalAlpha=.8;c.fillRect(244,138,36,14);c.globalAlpha=1;
}
function render(){
 if(!G.lv){drawTitleScene();if(G.fade>0){c.fillStyle='rgba(0,0,0,'+G.fade+')';c.fillRect(0,0,W,H)}return}
 const A=AREAS[G.area],{p,lv,boss}=G,cam=Math.round(G.cam);
 const vis=(x,w=30)=>x+w>cam-20&&x<cam+W+20;
 BG.draw(c,A,G.area,cam,G.t);
 BG.pit(c,A,G.t);

 c.save();
 c.translate(-cam+(G.shake>0?Math.round(Math.random()*4-2):0),0);
 for(const s of lv.solids)drawSolid(A,s,cam,G.t);
 for(const g of lv.gates)drawGate(A,g,cam);
 for(const l of lv.ladders)drawLadder(A,l,cam);
 for(const z of lv.winds)drawWind(A,z,cam);
 for(const s of lv.spikes)if(vis(s.x,s.w))drawSpikes(A,s);
 for(const l of lv.lasers)if(vis(l.x,6))drawLaser(A,l);
 for(const k of lv.crushers)if(vis(k.x,k.w))drawCrusher(A,k);
 for(const d of lv.drops)if(vis(d.x,6))drawDrop(A,d);
 for(const k of lv.springs)if(vis(k.x,k.w))drawSpring(k);
 for(const s of lv.saws)if(vis(s.x,20))drawSaw(A,s,G.t);
 for(const l of lv.levers)if(vis(l.x,8))drawLever(l);
 for(const r of lv.runes)if(!r.got&&vis(r.x,10))drawRune(r);
 for(const m of lv.memories)if(!m.got&&vis(m.x,20))drawMemory(m);
 for(const cp of lv.cps)if(vis(cp.x,20))drawCp(A,cp,G.t);
 for(const s of lv.shards)if(!s.got&&vis(s.x,10))drawShard(A,s,G.t);
 for(const e of lv.enemies)if(!e.dead&&vis(e.x,e.w+10))e.draw(c);
 if(!boss.dead)boss.draw(c);
 for(const z of G.zones)drawZone(z);
 for(const s of G.shots)drawShot(s);
 drawPlayer(p,A);
 for(const q of G.parts){
  if(q.ghost){Sprites.draw(c,'alex',q.x,q.y,{flip:q.face<0,fr:'run0',alpha:q.l/q.max*.5})}
  else{c.globalAlpha=Math.min(1,q.l/q.max*1.5);c.fillStyle=q.col;c.fillRect(q.x|0,q.y|0,2,2);c.globalAlpha=1}
 }
 c.restore();

 BG.fg(c,A,G.area,cam);

 // الظلام
 if(G.dark>.02){
  const px=p.x-cam+4,py=p.y+8,g=c.createRadialGradient(px,py,14,px,py,66);
  g.addColorStop(0,'rgba(0,0,0,0)');g.addColorStop(1,'rgba(0,0,0,'+(.95*G.dark)+')');
  c.fillStyle=g;c.fillRect(0,0,W,H);
 }
 // عكس التحكم
 if(G.invertT>0){c.globalAlpha=.1;c.fillStyle='#c070ff';c.fillRect(0,0,W,H);c.globalAlpha=1}
 // قلب واحد = نبض أحمر
 if(p.hp===1&&!p.dead){
  const g=c.createRadialGradient(160,90,70,160,90,200);
  g.addColorStop(0,'rgba(255,30,60,0)');g.addColorStop(1,'rgba(255,30,60,'+(.18+.1*Math.sin(G.t*6))+')');
  c.fillStyle=g;c.fillRect(0,0,W,H);
 }

 // HUD
 for(let i=0;i<p.max;i++)Sprites.draw(c,'heart',6+i*9,6,{pal:i<p.hp?undefined:{x:'#2a3050'}});
 c.fillStyle=A.accent;c.fillRect(7,18,2,6);c.fillRect(5,20,6,2);
 txt(String(G.shards),14,24,'#fff',8);
 txt('☠ '+G.deaths,40,24,'#ff8a9a',8);
 txt('✦ '+G.mems.length+'/11',74,24,'#ffffff',8);
 c.fillStyle='#000';c.globalAlpha=.4;c.fillRect(6,28,20,2);c.globalAlpha=1;
 c.fillStyle=p.dashCd<=0&&G.noDashT<=0?A.accent:'#555a70';c.fillRect(6,28,20*clamp(1-p.dashCd/.45,0,1),2);
 // شريط التقدم نحو البوس
 const pg=G.arena?1:clamp(p.x/lv.arenaX,0,1);
 c.globalAlpha=.45;c.fillStyle='#000';c.fillRect(110,3,100,4);c.globalAlpha=1;
 c.fillStyle=A.accent;c.fillRect(111,4,98*pg,2);
 c.fillStyle='#ff4a6a';c.fillRect(208,2,3,6);
 c.fillStyle='#fff';c.fillRect(Math.round(110+98*pg),2,3,6);
 // حالات
 const st=G.invertT>0?'? CONTROLS INVERTED':G.noDashT>0?'X DASH SEALED':G.pullT>0?'<< PULLED >>':G.darkT>0?'DARKNESS':'';
 if(st)txt(st,160,18,'#ff9aff',7,'center');

 if(G.banner>0){
  const a=Math.min(1,G.banner);c.globalAlpha=a;
  c.letterSpacing='4px';txt(A.name,160,66,'#fff',16,'center');c.letterSpacing='1px';
  txt(A.tag,160,80,A.accent,8,'center');c.letterSpacing='0px';c.globalAlpha=1;c.textAlign='left';
 }
 if(G.hint>0&&G.state==='play'){c.globalAlpha=Math.min(1,G.hint);txt(hintText(),160,172,'#fff',6,'center');c.globalAlpha=1;c.textAlign='left'}
 if(G.whisper){
  const k=G.whisper;c.globalAlpha=Math.min(1,k.t,k.max-k.t);
  if(k.top){const ls=wrap(k.text,46);ls.forEach((l,i)=>txt(l,160,40+i*10,'#ffffff',7,'center'));txt('✦',160,32,'#ffd23d',8,'center')}
  else txt('"'+k.text+'"',160,150,A.accent,8,'center');
  c.globalAlpha=1;c.textAlign='left';
 }
 if(boss.active&&!boss.dead){
  c.fillStyle='#000';c.globalAlpha=.6;c.fillRect(80,167,160,9);c.globalAlpha=1;
  c.fillStyle=boss.ph>=3&&Math.floor(G.t*8)%2?'#fff':A.accent;c.fillRect(82,169,156*clamp(boss.hp/boss.max,0,1),5);
  c.fillStyle='#000';c.fillRect(82+156*.66,169,1,5);c.fillRect(82+156*.33,169,1,5);
  txt(A.boss.toUpperCase()+'  '+['I','II','III'][boss.ph-1],82,165,'#fff',7);
 }
 if(G.card){
  const k=G.card,a=Math.max(0,Math.min(1,k.t,(k.max-k.t)*2));
  c.globalAlpha=a*.85;c.fillStyle='#000';c.fillRect(0,54,W,56);
  c.globalAlpha=a;c.letterSpacing='3px';txt(k.title,160,84,A.accent,16,'center');
  c.letterSpacing='1px';txt(k.sub,160,100,'#fff',8,'center');c.letterSpacing='0px';c.globalAlpha=1;c.textAlign='left';
 }
 if(G.flash>0){c.globalAlpha=Math.min(.35,G.flash);c.fillStyle='#ff2040';c.fillRect(0,0,W,H);c.globalAlpha=1}
 if(G.fade>0){c.fillStyle='rgba(0,0,0,'+G.fade+')';c.fillRect(0,0,W,H)}
}

/* ================= LOOP ================= */
let last=0;
function loop(ts){
 const dt=Math.min(.05,(ts-last)/1000||0);last=ts;
 update(dt);render();
 requestAnimationFrame(loop);
}

/* ================= UI ================= */
const show=(id,v)=>$(id).classList[v?'remove':'add']('hidden');
document.body.className='ctrl-'+G.ctrl;
const rec=('ontouchstart' in window||navigator.maxTouchPoints>0)?'touch':'key';
document.querySelectorAll('#controls .card').forEach(b=>{
 if(b.dataset.c===rec)b.classList.add('rec');
 b.onclick=()=>{b.blur();chooseCtrl(b.dataset.c)};
});
function chooseCtrl(k){
 G.ctrl=k;store.set('ctrl',k);document.body.className='ctrl-'+k;
 show('#controls',false);G.hint=7;
 if(G.fromPause){G.fromPause=false;G.state='play';show('#pause',false);show('#pbtn',true)}
 else{show('#title',false);show('#pbtn',true);loadArea(G.startArea)}
}
function openControls(area){G.startArea=area;G.state='select';show('#controls',true)}
if(store.get('area',0)>0){$('#cont').textContent='CONTINUE · '+AREAS[store.get('area',0)].name;show('#cont',true)}
$('#start').onclick=function(){this.blur();Music.ctx();openControls(0)};
$('#cont').onclick=function(){this.blur();Music.ctx();openControls(store.get('area',0))};
$('#pbtn').onclick=function(){this.blur();togglePause()};
$('#resume').onclick=function(){this.blur();togglePause()};
$('#chg').onclick=function(){this.blur();show('#pause',false);show('#pbtn',false);G.fromPause=true;show('#controls',true)};
$('#quit').onclick=()=>location.reload();

requestAnimationFrame(loop);
