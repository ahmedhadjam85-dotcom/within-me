/* ===== WITHIN ME — enemies.js (v4) : الأعداء (أشكال كل عالم) + البوسات ===== */
const E_DEF={
 shade:  {hp:1,w:12,h:10},
 wisp:   {hp:1,w:10,h:10},
 hopper: {hp:2,w:12,h:8},
 watcher:{hp:2,w:12,h:12},
 charger:{hp:3,w:14,h:10}
};
const FLASH={k:'#fff',d:'#fff',h:'#fff',m:'#fff',l:'#fff',a:'#fff',w:'#fff',y:'#fff',s:'#fff',f:'#fff',o:'#fff'};
const flashCache={};
function flashPal(skin){
 if(!flashCache[skin]){const o={};for(const k of Object.keys(Sprites.pal(skin)))o[k]='#ffffff';flashCache[skin]=o}
 return flashCache[skin];
}

class Enemy{
 constructor(type,x,gy,a,b,col,elite,area){
  const d=E_DEF[type];
  const air=type==='wisp'||type==='watcher';
  Object.assign(this,{type,air,hp:d.hp*(elite?2:1),w:d.w,h:d.h,x,a,b,col,dir:1,t:Math.random()*6,vx:0,vy:0,
   ground:false,dead:false,flash:0,cd:1+Math.random()*2,state:0,st:0,hitId:-1,
   elite:!!elite,sp:elite?1.25:1,mn:false,grp:0,skin:'e'+(area||0)+(air?'a':'g')});
  this.y=air?gy-d.h-30-Math.random()*18:gy-d.h;
  this.by=this.y;
 }
 patrol(sp,dt){
  this.x+=this.dir*sp*this.sp*dt;
  if(this.x<this.a){this.x=this.a;this.dir=1}
  if(this.x>this.b){this.x=this.b;this.dir=-1}
 }
 update(dt,p,lv){
  this.t+=dt;this.flash-=dt;
  const dx=p.x-this.x,adx=Math.abs(dx),ady=Math.abs(p.y-this.y),k=this.sp;
  switch(this.type){
   case 'shade':this.patrol(26,dt);break;

   case 'wisp':
    if(adx<150){this.x+=Math.sign(dx)*24*k*dt;this.dir=Math.sign(dx)||1}else this.patrol(18,dt);
    this.x=clamp(this.x,this.a-30,this.b+30);
    this.y=this.by+Math.sin(this.t*2.4)*7;
    break;

   case 'hopper':
    this.cd-=dt;
    if(this.ground&&this.cd<=0&&adx<150){this.vy=-205;this.vx=Math.sign(dx)*58*k;this.cd=1.2+Math.random();this.dir=Math.sign(dx)||1}
    if(this.ground&&this.vy>=0)this.vx=0;
    this.vy=Math.min(this.vy+780*dt,330);
    moveBody(this,lv.solids,dt);
    this.x=clamp(this.x,this.a,this.b);
    break;

   case 'watcher':
    this.y=this.by+Math.sin(this.t*1.6)*4;this.dir=Math.sign(dx)||1;
    this.cd-=dt;
    if(this.cd<=0&&adx<200){
     this.cd=this.elite?1.6:2.3;
     const cx=this.x+6,cy=this.y+6,ex=p.x+4-cx,ey=p.y+8-cy;
     const n=this.elite?3:1;
     for(let i=0;i<n;i++){const an=Math.atan2(ey,ex)+(i-(n-1)/2)*.25;
      G.shots.push({x:cx,y:cy,vx:Math.cos(an)*72,vy:Math.sin(an)*72,life:4,col:this.col,sp:72})}
     SFX.shoot();
    }
    break;

   case 'charger':
    if(this.state===0){
     this.patrol(28,dt);
     if(adx<130&&ady<26&&Math.sign(dx)===this.dir){this.state=1;this.st=.35}
    }else if(this.state===1){
     this.st-=dt;if(this.st<=0){this.state=2;this.st=.6}
    }else if(this.state===2){
     this.x+=this.dir*135*k*dt;this.st-=dt;
     if(this.x<=this.a||this.x>=this.b)this.st=0;
     this.x=clamp(this.x,this.a,this.b);
     if(this.st<=0){this.state=3;this.st=.8}
    }else{this.st-=dt;if(this.st<=0)this.state=0}
    break;
  }
 }
 draw(c){
  const fr=Math.floor(this.t*4)%2?'b':'a';
  const sz=Sprites.size(this.skin,fr);
  const sx=this.x+(this.w-sz.w)/2,sy=this.air?this.y+(this.h-sz.h)/2:this.y+this.h-sz.h;
  const cx=this.x+this.w/2,cy=this.y+this.h/2;
  if(this.air||this.elite){
   c.globalAlpha=this.elite?.28:.16;c.fillStyle=this.elite?'#ffd23d':this.col;
   c.beginPath();c.arc(cx,cy,this.elite?12:10,0,7);c.fill();c.globalAlpha=1;
  }
  Sprites.draw(c,this.skin,sx,sy,{flip:this.dir<0,fr,pal:this.flash>0?flashPal(this.skin):undefined});
  if(this.elite){
   const tx=Math.round(cx),ty=Math.round(sy);
   c.fillStyle='#ffd23d';c.fillRect(tx-3,ty-4,1,3);c.fillRect(tx,ty-5,1,4);c.fillRect(tx+3,ty-4,1,3);c.fillRect(tx-3,ty-2,7,1);
  }
  if(this.type==='charger'&&this.state===1){c.fillStyle=this.col;c.fillRect(this.x+6,this.y-9,2,5);c.fillRect(this.x+6,this.y-3,2,2)}
 }
}

/* ============ البوسات ============
   الحركات: orbs volley spread ring rain bounce homing charge stab slam teleport summon
            erupt beam sweep pull confuse nodash darkness blackout(ظلام كامل)            */
const BOSS_DEF=[
 /* 0 Fear      */{fly:true, spd:26,hp:14,m:[['orbs','summon','erupt'],['spread','blackout','erupt','summon'],['ring','blackout','teleport','erupt','summon']]},
 /* 1 Betrayal  */{fly:false,spd:30,hp:16,m:[['charge','volley','summon'],['stab','volley','charge','summon'],['stab','ring','volley','charge','summon']]},
 /* 2 Temptation*/{fly:true, spd:24,hp:18,m:[['homing','orbs','summon'],['pull','homing','ring','summon'],['pull','ring','homing','beam','summon']]},
 /* 3 Alcohol   */{fly:false,spd:22,hp:20,m:[['bounce','slam','summon'],['confuse','bounce','slam','spread'],['confuse','slam','bounce','rain','summon']]},
 /* 4 Greed     */{fly:false,spd:26,hp:22,m:[['rain','charge','summon'],['rain','spread','charge','summon'],['rain','ring','charge','erupt','summon']]},
 /* 5 Injustice */{fly:false,spd:24,hp:24,m:[['slam','beam','orbs'],['slam','beam','rain','summon'],['slam','beam','sweep','rain','summon']]},
 /* 6 Anger     */{fly:false,spd:34,hp:26,m:[['charge','erupt','slam'],['charge','ring','erupt','summon'],['charge','sweep','erupt','ring','slam','summon']]},
 /* 7 Lying     */{fly:true, spd:30,hp:28,m:[['teleport','spread','summon'],['stab','volley','ring','summon'],['teleport','confuse','ring','volley','summon']]},
 /* 8 Envy      */{fly:true, spd:30,hp:30,m:[['homing','nodash','summon'],['homing','teleport','nodash','rain','summon'],['homing','nodash','ring','beam','summon']]},
 /* 9 Pride     */{fly:false,spd:30,hp:32,m:[['charge','slam','beam'],['charge','slam','ring','beam','summon'],['charge','sweep','slam','beam','ring','summon']]},
 /* 10 Lara     */{fly:false,spd:32,hp:38,m:[['ring','homing','beam'],['teleport','homing','beam','erupt','summon'],['teleport','ring','sweep','homing','beam','summon']]}
];

class Boss{
 constructor(a,ax,gy){
  this.a=a;this.def=BOSS_DEF[a];this.final=a===10;this.ax=ax;this.gy=gy;
  this.sc=this.final?3:4;
  this.w=this.final?22:42;this.h=this.final?50:56;
  this.x=ax+250;this.y=gy-this.h;this.vx=0;this.vy=0;this.ground=false;
  this.hp=this.max=this.def.hp;this.t=0;this.cd=1.6;this.ai=0;this.jt=3;this.inv=0;
  this.warn=0;this.charge=0;this.cdir=1;this.tp=0;this.slam=0;this.after=null;this.dir=-1;
  this.active=false;this.dead=false;this.said=false;this.ph=1;this.hitId=-1;
  this.intro=0;this.dying=0;this.done=false;this.handled=false;this.q=[];this.trail=[];this.trT=0;this.flashT=0;
  this.col=AREAS[a].accent;
 }
 start(){
  this.active=true;this.intro=1.1;this.t=0;
  G.shake=.5;G.flash=.25;SFX.boom();
  spark(this.x+this.w/2,this.gy-4,this.col,26,200);
 }
 get vulnerable(){return this.active&&this.intro<=0&&this.dying<=0&&!(this.tp>0&&Math.abs(this.tp-.4)/.4<.5)}
 get alpha(){return this.tp>0?Math.min(1,Math.abs(this.tp-.4)/.4):1}
 center(){return{x:this.x+this.w/2,y:this.y+this.h/2}}
 fire(x,y,vx,vy,o){G.shots.push(Object.assign({x,y,vx,vy,life:5,col:this.col,sp:Math.hypot(vx,vy)},o||{}))}
 later(t,f){this.q.push({t,f})}

 beginDeath(){
  this.dying=1.8;G.shots=[];G.zones=[];this.q=[];G.blackT=0;G.darkT=0;
  for(const e of G.lv.enemies)if(e.mn&&!e.dead){e.dead=true;spark(e.x+6,e.y+5,this.col,8,100)}
  G.ts=.3;Music.setIntense(false);
 }
 onPhase(){
  this.flashT=.6;this.cd=1.3;this.inv=.6;
  G.shake=.5;G.flash=.3;G.stop=.12;SFX.boom();
  const c=this.center();
  for(let i=0;i<24;i++){const an=i/24*6.283;G.parts.push({x:c.x,y:c.y,vx:Math.cos(an)*150,vy:Math.sin(an)*150,l:.6,max:.6,col:this.col,g:0})}
 }

 attack(kind,p,lv){
  const c=this.center(),ang=Math.atan2(p.y+8-c.y,p.x+4-c.x),ph=this.ph;
  switch(kind){
   case 'orbs':{const n=ph>=2?3:1;for(let i=0;i<n;i++){const an=ang+(i-(n-1)/2)*.22;this.fire(c.x,c.y,Math.cos(an)*82,Math.sin(an)*82)}SFX.shoot();break}
   case 'volley':{const n=3+(ph>=3?2:0);for(let i=0;i<n;i++)this.later(i*.18,()=>{const cc=this.center(),an=Math.atan2(p.y+8-cc.y,p.x+4-cc.x);this.fire(cc.x,cc.y,Math.cos(an)*118,Math.sin(an)*118);SFX.shoot()});break}
   case 'spread':{const n=ph>=3?9:ph>=2?7:5;for(let i=0;i<n;i++){const an=ang+(i-(n-1)/2)*.28;this.fire(c.x,c.y,Math.cos(an)*72,Math.sin(an)*72)}SFX.shoot();break}
   case 'ring':{const n=ph>=3?18:ph>=2?14:10,off=Math.random()*6;
    for(let i=0;i<n;i++){const an=i/n*6.283+off;this.fire(c.x,c.y,Math.cos(an)*60,Math.sin(an)*60)}
    if(ph>=2)this.later(.5,()=>{const cc=this.center();for(let i=0;i<n;i++){const an=(i+.5)/n*6.283+off;this.fire(cc.x,cc.y,Math.cos(an)*60,Math.sin(an)*60)}});
    SFX.shoot();break}
   case 'rain':{const n=5+ph*2;for(let i=0;i<n;i++)this.fire(lv.arenaX+20+Math.random()*300,-10-Math.random()*50,0,72+Math.random()*34,{life:4});SFX.shoot();break}
   case 'bounce':{const d=Math.sign(p.x-this.x)||1;this.fire(c.x,c.y,d*78,-150,{g:420,bounce:true,life:5});if(ph>=2)this.fire(c.x,c.y,d*108,-120,{g:420,bounce:true,life:5});if(ph>=3)this.fire(c.x,c.y,d*55,-170,{g:420,bounce:true,life:5});SFX.shoot();break}
   case 'homing':{const n=ph>=3?3:2;for(let i=0;i<n;i++)this.fire(c.x,c.y,(i-(n-1)/2)*44,-44,{homing:true,sp:46+ph*4,life:6});SFX.shoot();break}
   case 'charge':this.warn=.4;this.cdir=Math.sign(p.x-this.x)||1;break;
   case 'slam':if(this.ground){this.vy=-330;this.slam=1;this.vx=Math.sign(p.x-this.x)*62}else this.cd=.4;break;
   case 'teleport':this.tp=.8;break;
   case 'stab':this.tp=.8;this.after='charge';break;
   case 'summon':{
    const alive=lv.enemies.filter(e=>e.mn&&!e.dead).length;
    if(alive>=3){this.attack('orbs',p,lv);break}
    const n=ph>=3?3:2,pool=['shade','wisp','hopper','charger'];
    for(let i=0;i<n;i++){
     const type=pool[Math.floor(Math.random()*pool.length)],x=lv.arenaX+30+Math.random()*270;
     const e=new Enemy(type,x,this.gy,lv.arenaX+12,lv.arenaX+318,this.col,false,this.a);
     e.mn=true;lv.enemies.push(e);spark(x+6,this.gy-10,this.col,12,110);
    }
    SFX.tone(150,420,.3,'sawtooth',.05);break}
   case 'erupt':{const n=ph>=3?6:ph>=2?5:4;
    for(let i=0;i<n;i++)this.later(i*.22,()=>{
     const px=clamp(p.x+(i-2)*46+(Math.random()*20-10),lv.arenaX+14,lv.arenaX+326);
     G.zones.push({kind:'erupt',x:px-10,w:20,y:this.gy-70,h:70,t:.85,dur:.4,col:this.col});SFX.crumble();
    });break}
   case 'beam':{const n=ph>=3?4:ph>=2?3:2;
    for(let i=0;i<n;i++){const px=i===0?p.x+4:lv.arenaX+30+Math.random()*280;
     G.zones.push({kind:'beam',x:px-8,w:16,y:0,h:this.gy,t:1.0,dur:.4,col:this.col})}
    SFX.tone(800,300,.4,'sine',.05);break}
   case 'sweep':{const d=Math.random()<.5?1:-1;
    G.zones.push({kind:'sweep',x:d>0?lv.arenaX+8:lv.arenaX+322,w:10,y:this.gy-44,h:44,t:.9,dur:3.4,vx:d*(80+ph*10),col:this.col});
    SFX.tone(300,600,.5,'sawtooth',.05);break}
   case 'pull':G.pullT=1.4;G.pullX=this.x+this.w/2;SFX.tone(200,80,.8,'sine',.07);break;
   case 'confuse':G.invertT=4.5;SFX.tone(500,150,.5,'triangle',.07);break;
   case 'nodash':G.noDashT=5;SFX.tone(400,100,.5,'sawtooth',.05);break;
   case 'darkness':G.darkT=4.5;SFX.tone(120,60,.8,'sine',.07);break;
   case 'blackout':
    G.blackT=7;G.flash=.15;
    G.whisper={text:'The light goes out...',t:2.6,max:2.6};
    SFX.tone(300,40,1.1,'sine',.09);break;
  }
 }

 update(dt,p,lv){
  this.t+=dt;this.inv-=dt;this.cd-=dt;this.flashT-=dt;
  this.trail=this.trail.filter(g=>(g.l-=dt)>0);
  for(const e of this.q)e.t-=dt;
  const due=this.q.filter(e=>e.t<=0);this.q=this.q.filter(e=>e.t>0);
  if(this.dying<=0)due.forEach(e=>e.f());

  if(this.intro>0){this.intro-=dt;return}
  if(this.dying>0){
   this.dying-=dt;G.shake=.15;
   if(Math.random()<.7)spark(this.x+Math.random()*this.w,this.y+Math.random()*this.h,this.col,3,120);
   if(this.dying<=0){
    this.dead=true;this.done=true;G.flash=.6;G.shake=.7;SFX.boom();
    spark(this.x+this.w/2,this.y+this.h/2,this.col,60,240);spark(this.x+this.w/2,this.y+this.h/2,'#ffffff',30,200);
   }
   return;
  }
  const r=this.hp/this.max,ph=r>.66?1:r>.33?2:3;
  if(ph!==this.ph){this.ph=ph;this.onPhase()}
  const d=this.def,dx=p.x+4-(this.x+this.w/2),sp=ph===1?1:ph===2?1.15:1.35;

  // --- تيليبورت ---
  if(this.tp>0){
   const prev=this.tp;this.tp-=dt;
   if(prev>.4&&this.tp<=.4){
    spark(this.x+this.w/2,this.y+this.h/2,this.col,14,100);
    if(this.after==='charge')this.x=clamp(p.x-p.face*70,lv.arenaX+12,lv.arenaX+328-this.w);
    else this.x=lv.arenaX+24+Math.random()*(290-this.w);
    spark(this.x+this.w/2,this.y+this.h/2,this.col,14,100);
   }
   if(this.tp<=0){
    this.cd=.9;
    if(this.after==='charge'){this.after=null;this.cdir=Math.sign(p.x-this.x)||1;this.warn=.25}
    else this.attack(Math.random()<.5?'orbs':'spread',p,lv);
   }
   return;
  }

  // --- حركة ---
  if(this.warn>0){this.warn-=dt;this.vx=0;if(this.warn<=0){this.charge=.65;SFX.dash()}}
  else if(this.charge>0){
   this.charge-=dt;this.vx=this.cdir*200;
   this.trT-=dt;if(this.trT<=0){this.trail.push({x:this.x,y:this.y,l:.3,dir:this.dir});this.trT=.04}
   if(this.x<=lv.arenaX+9||this.x>=lv.arenaX+331-this.w)this.charge=0;
  }else{
   this.vx=Math.abs(dx)>24?Math.sign(dx)*d.spd*sp:0;
   this.dir=dx>=0?1:-1;
  }

  // --- هجوم ---
  if(!this.slam&&this.charge<=0&&this.warn<=0&&this.cd<=0){
   const list=d.m[ph-1],kind=list[this.ai++%list.length];
   this.attack(kind,p,lv);
   if(this.tp<=0&&this.warn<=0)this.cd=(ph===1?2.4:ph===2?1.9:1.5)+Math.random()*.6;
   if(kind==='blackout')this.cd+=2.5;
  }

  // --- فيزياء ---
  if(d.fly){
   this.x+=this.vx*dt;
   this.y=this.gy-this.h-34+Math.sin(this.t*1.8)*9;
   this.vy=0;this.ground=false;
  }else{
   this.vy=Math.min(this.vy+780*dt,330);
   this.jt-=dt;
   if(this.jt<=0&&this.ground&&!this.slam&&this.charge<=0&&this.warn<=0){this.vy=-250;this.jt=3.2}
   moveBody(this,lv.solids,dt);
   if(this.slam===1&&!this.ground)this.slam=2;
   else if(this.slam===2&&this.ground){
    this.slam=0;const c=this.center();
    for(const s of[-1,1])this.fire(c.x,this.gy-5,s*105,0,{wave:true,life:2.6});
    G.shake=.4;SFX.boom();spark(c.x,this.gy,this.col,20,150);
   }
  }
  this.x=clamp(this.x,lv.arenaX+9,lv.arenaX+331-this.w);
 }

 spr(c,x,y,al,pal,dir){
  if(this.final){
   const run=Math.abs(this.vx)>5?'run'+(Math.floor(this.t*8)%2):'idle';
   Sprites.draw(c,'lara',x-7,y-4,{scale:3,flip:dir<0,fr:this.ground?run:'fall',pal,alpha:al});
  }else Sprites.draw(c,'boss'+this.a,x-11,y-8,{scale:4,fr:'a',pal,alpha:al});
 }
 /* عيونه تلمع فوق الظلام الكامل */
 drawEyes(c){
  const cx=this.x+this.w/2,cy=this.y+this.h*.28;
  c.globalAlpha=.3;c.fillStyle=this.col;c.beginPath();c.arc(cx,cy+1,14,0,7);c.fill();c.globalAlpha=1;
  c.fillStyle='#ffffff';c.fillRect(Math.round(cx-9),Math.round(cy),5,3);c.fillRect(Math.round(cx+4),Math.round(cy),5,3);
 }
 draw(c){
  const A=this.alpha,cx=this.x+this.w/2,cy=this.y+this.h/2;
  const jx=this.dying>0?Math.round(Math.random()*4-2):0;
  c.globalAlpha=.3*A;c.fillStyle='#000';c.beginPath();c.ellipse(cx,this.gy+1,this.w*.7,3,0,0,7);c.fill();
  c.fillStyle=this.col;
  c.globalAlpha=(.14+.06*Math.sin(this.t*4)+(this.ph>=3?.1:0))*A;c.beginPath();c.arc(cx,cy,this.w*1.1,0,7);c.fill();
  c.globalAlpha=.08*A;c.beginPath();c.arc(cx,cy,this.w*1.7,0,7);c.fill();
  if(this.ph>=2){
   const n=this.ph>=3?8:4;c.globalAlpha=.85*A;
   for(let k=0;k<n;k++){const an=this.t*2+k*6.283/n;c.fillRect(Math.round(cx+Math.cos(an)*this.w*.9),Math.round(cy+Math.sin(an)*this.h*.55),2,2)}
  }
  c.globalAlpha=1;
  for(const g of this.trail)this.spr(c,g.x,g.y,Math.min(.4,g.l*1.5),null,g.dir);
  const flash=(this.inv>0||this.warn>0||this.flashT>0||this.dying>0)&&Math.floor(this.t*26)%2;
  this.spr(c,this.x+jx,this.y,A,flash?FLASH:null,this.dir);
  if(this.warn>0){c.fillStyle=this.col;c.fillRect(cx-1,this.y-12,3,7);c.fillRect(cx-1,this.y-3,3,3)}
 }
}
