/* ===== WITHIN ME — backdrops.js (v9) =====
   خلفيات إبداعية لكل عالم (الخوف يبقى الأصلي). تتحمّل بعد game.js */
(function(){
const hs=BG.hs,T=Math.PI*2,orig=BG.draw,cache={};
const fc=(g,col,a)=>{g.fillStyle=col;g.globalAlpha=a==null?1:a};
const poly=(g,p)=>{g.beginPath();g.moveTo(p[0],p[1]);for(let k=2;k<p.length;k+=2)g.lineTo(p[k],p[k+1]);g.closePath();g.fill()};
const circ=(g,x,y,r)=>{g.beginPath();g.arc(x,y,Math.max(.1,r),0,T);g.fill()};
const ell=(g,x,y,rx,ry)=>{g.beginPath();g.ellipse(x,y,Math.max(.1,rx),Math.max(.1,ry),0,0,T);g.fill()};
const rc=(g,x,y,w,h)=>g.fillRect(Math.round(x),Math.round(y),Math.round(w),Math.round(h));
function lay(g,off,w,fn){const n0=Math.floor(off/w);for(let n=n0;n<=n0+Math.ceil(W/w)+1;n++)fn(Math.round(n*w-off),n)}
function wrapx(x,m){return((x%m)+m)%m}
function skyOf(i,stops,paint){
 if(cache[i])return cache[i];
 const k=document.createElement('canvas');k.width=W;k.height=H;const x=k.getContext('2d');
 const gr=x.createLinearGradient(0,0,0,H);stops.forEach((s,j)=>gr.addColorStop(j/(stops.length-1),s));
 x.fillStyle=gr;x.fillRect(0,0,W,H);if(paint)paint(x);x.globalAlpha=1;return cache[i]=k;
}
const stars=(x,n,seed)=>{x.fillStyle='#fff';for(let k=0;k<n;k++){x.globalAlpha=.3+hs(k+seed)*.6;x.fillRect(hs(k*3+seed)*W|0,hs(k*7+seed)*100|0,1,1)}};
const ground=(g,col,y)=>{fc(g,col);rc(g,0,y,W,H-y)};
const BASE=150;

const BD={
/* 1 الخيانة: زجاج مكسور وخناجر عائمة وقمر مشقوق */
1:{sky:['#0a0420','#2a0f52','#7a2aa8'],paint:x=>stars(x,50,11),
 draw(g,cam,oy,t,A){
  const mx=70-cam*.02;fc(g,'#e8d8ff');circ(g,mx,44+oy*.3,16);fc(g,'#c8a8ff',.14);circ(g,mx,44+oy*.3,28);
  g.strokeStyle='#14062c';g.lineWidth=2;g.globalAlpha=1;g.beginPath();g.moveTo(mx+2,28+oy*.3);g.lineTo(mx-4,38+oy*.3);g.lineTo(mx+3,46+oy*.3);g.lineTo(mx-2,60+oy*.3);g.stroke();
  fc(g,'#e8d8ff',.8);circ(g,mx+26+Math.sin(t*.5)*3,30+Math.cos(t*.4)*3,3);circ(g,mx-24+Math.sin(t*.6)*3,66,2);
  fc(g,A.far);lay(g,cam*.08,70,(x,n)=>{const h=60+hs(n*3)*50;poly(g,[x,BASE+oy,x+8,BASE+oy-h,x+16+hs(n)*10,BASE+oy-h*.6,x+30,BASE+oy])});
  lay(g,cam*.2,86,(x,n)=>{const h=70+hs(n*7)*60,lean=(hs(n*2)-.5)*22;fc(g,A.mid);poly(g,[x,BASE+oy,x+lean,BASE+oy-h,x+lean+26,BASE+oy-h+6,x+28,BASE+oy]);
   for(let k=0;k<5;k++)if(hs(n*9+k)>.45){fc(g,'#d8a8ff',.4+.4*Math.sin(t*2+n+k));rc(g,x+lean*.5+6,BASE+oy-h*.8+k*10,3,4)}});
  for(let k=0;k<10;k++){const x=wrapx(hs(k)*480-cam*.35,480)-30,y=18+hs(k+3)*84+Math.sin(t+k)*5+oy*.3,a=Math.sin(t*.6+k)*.5;
   g.save();g.translate(x,y);g.rotate(a);fc(g,'#e8e0ff',.75);poly(g,[-1.5,-9,1.5,-9,2,6,0,11,-2,6]);fc(g,'#7a4ac8',.9);rc(g,-3,4,6,2);g.restore()}
  fc(g,'#fff',.07);lay(g,cam*.5,110,(x,n)=>{poly(g,[x,BASE+oy,x+8,40+oy,x+22,BASE+oy])});
  ground(g,A.near,BASE+oy);
 }},
/* 2 الإغراء: ملاهي وردية ودولاب هواء وأضواء */
2:{sky:['#220628','#8a2070','#ff7ab0'],paint:x=>{x.fillStyle='#ffd0e0';x.globalAlpha=.9;x.beginPath();x.arc(240,104,36,0,T);x.fill();x.fillStyle='#8a2070';for(let k=0;k<6;k++)x.fillRect(200,90+k*8+k,80,1+k*.7)},
 draw(g,cam,oy,t,A){
  lay(g,cam*.08,480,(x)=>{const cx=x+240,cy=88+oy*.5,R=58;g.strokeStyle='#5a1050';g.lineWidth=2;g.globalAlpha=1;
   g.beginPath();g.moveTo(cx,cy);g.lineTo(cx-26,BASE+oy);g.moveTo(cx,cy);g.lineTo(cx+26,BASE+oy);g.stroke();
   g.beginPath();g.arc(cx,cy,R,0,T);g.stroke();g.beginPath();g.arc(cx,cy,R*.5,0,T);g.stroke();
   for(let k=0;k<12;k++){const a=t*.15+k*T/12;g.beginPath();g.moveTo(cx,cy);g.lineTo(cx+Math.cos(a)*R,cy+Math.sin(a)*R);g.stroke();
    fc(g,k%2?'#ffd890':'#ff7ac0');rc(g,cx+Math.cos(a)*R-3,cy+Math.sin(a)*R,6,6)}});
  lay(g,cam*.22,120,(x,n)=>{const h=30+hs(n)*14;fc(g,A.mid);rc(g,x+12,BASE+oy-24,76,24);
   for(let k=0;k<6;k++){fc(g,k%2?'#ff7ac0':'#2a0830',.85);poly(g,[x+8+k*14,BASE+oy-24,x+22+k*14,BASE+oy-24,x+50,BASE+oy-24-h])}
   fc(g,'#ffd23d');rc(g,x+50,BASE+oy-24-h-8,1,8);poly(g,[x+51,BASE+oy-24-h-8,x+60+Math.sin(t*4+n)*2,BASE+oy-24-h-5,x+51,BASE+oy-24-h-3])});
  lay(g,cam*.4,90,(x,n)=>{g.strokeStyle='#2a0830';g.lineWidth=1;g.globalAlpha=.8;g.beginPath();g.moveTo(x,36+oy);g.quadraticCurveTo(x+45,64+oy,x+90,36+oy);g.stroke();
   for(let k=1;k<10;k++){const u=k/10,bx=x+u*90,by=36+oy+Math.sin(u*Math.PI)*17;fc(g,['#ffd23d','#ff4a9a','#4af0ff'][(k+n)%3],.5+.5*Math.sin(t*3+k+n));circ(g,bx,by+2,1.8)}});
  for(let k=0;k<16;k++){const x=wrapx(hs(k)*W+Math.sin(t+k)*8-cam*(.1+hs(k+2)*.3),W),y=H-((t*(10+k%5*3)+hs(k+9)*H)%(H+20));
   fc(g,k%3?'#ff6aa8':'#ff3a6a',.65);if(k%2){circ(g,x-2,y,2.4);circ(g,x+2,y,2.4);poly(g,[x-4.4,y+1,x+4.4,y+1,x,y+6])}else{ell(g,x,y,4,5);g.strokeStyle='#ffd0e0';g.lineWidth=.6;g.beginPath();g.moveTo(x,y+5);g.lineTo(x+1,y+13);g.stroke()}}
  fc(g,'#fff',.07);for(let k=0;k<3;k++){const a=Math.sin(t*.5+k*2)*.6;poly(g,[90+k*70,H,90+k*70+8,H,90+k*70+8+Math.sin(a)*120,0,90+k*70-12+Math.sin(a)*120,0])}
  ground(g,A.near,BASE+oy);
 }},
/* 3 الكحول: قبو غارق بزجاجات عملاقة وفقاعات */
3:{sky:['#02140f','#0b4a3a','#26b890'],
 draw(g,cam,oy,t,A){
  fc(g,'#b8ffe0',.07);for(let k=0;k<6;k++){const x=wrapx(30+k*64+Math.sin(t*.4+k)*12-cam*.05,400)-20;poly(g,[x,0,x+16,0,x+60+Math.sin(t*.3+k)*10,BASE,x+20,BASE])}
  lay(g,cam*.08,130,(x,n)=>{const h=90+hs(n)*30;fc(g,A.far);rc(g,x+34,BASE+oy-h,40,h);rc(g,x+46,BASE+oy-h-26,16,28);rc(g,x+42,BASE+oy-h-30,24,5);
   fc(g,A.hz,.35);const lv=h*(.4+hs(n*3)*.3);g.beginPath();g.moveTo(x+34,BASE+oy-lv);for(let k=0;k<=40;k+=4)g.lineTo(x+34+k,BASE+oy-lv+Math.sin(t*2+k*.3+n)*1.5);g.lineTo(x+74,BASE+oy);g.lineTo(x+34,BASE+oy);g.fill();
   fc(g,'#e8ffd0',.25);rc(g,x+40,BASE+oy-h+20,6,h*.5)});
  lay(g,cam*.22,72,(x,n)=>{fc(g,A.mid);ell(g,x+30,BASE+oy-16,22,16);rc(g,x+8,BASE+oy-16,44,16);ell(g,x+30,BASE+oy,22,4);fc(g,'#0a2a20',.8);rc(g,x+8,BASE+oy-22,44,2);rc(g,x+8,BASE+oy-8,44,2);if(n%2){fc(g,A.mid);ell(g,x+30,BASE+oy-40,18,13);rc(g,x+12,BASE+oy-40,36,14)}});
  lay(g,cam*.36,104,(x,n)=>{const sw=Math.sin(t*1.2+n)*3,len=26+hs(n)*22;g.strokeStyle='#2a6a50';g.lineWidth=1;g.globalAlpha=.8;g.beginPath();g.moveTo(x+30,0);g.lineTo(x+30+sw,len);g.stroke();
   fc(g,'#ffe890',.9);rc(g,x+27+sw,len,7,9);fc(g,'#ffe890',.16);circ(g,x+30+sw,len+5,17)});
  for(let k=0;k<3;k++){const x=wrapx(k*190+t*(10+k*4)-cam*.3,520)-60,y=60+k*28+Math.sin(t+k)*5;fc(g,'#0a3a2c',.9);ell(g,x,y,9,4);poly(g,[x-8,y,x-15,y-4,x-15,y+4])}
  g.strokeStyle='#cfffe8';g.lineWidth=.7;for(let k=0;k<28;k++){g.globalAlpha=.55;const x=wrapx(hs(k)*W-cam*.2+Math.sin(t+k)*3,W),y=H-((t*(10+k%6*4)+hs(k+5)*H)%(H+10));g.beginPath();g.arc(x,y,1+k%3,0,T);g.stroke()}
  fc(g,'#9affd8',.5);for(let x=0;x<W;x+=3)rc(g,x,6+Math.sin(x*.07+t*2)*2,3,2);
  ground(g,A.near,BASE+oy);
 }},
/* 4 الطمع: قبو ذهب ببوابة عملاقة وعملات */
4:{sky:['#120800','#4a2c08','#d0962a'],
 draw(g,cam,oy,t,A){
  fc(g,'#ffe27a',.1);for(let k=0;k<4;k++)poly(g,[120+k*20,0,150+k*20,0,100+k*70-30,BASE,60+k*70,BASE]);
  lay(g,cam*.05,420,(x)=>{const cx=x+210,cy=104+oy*.4;fc(g,'#2e1a04');circ(g,cx,cy,96);g.strokeStyle='#b8861a';g.lineWidth=3;g.globalAlpha=.6;[96,76,40].forEach(r=>{g.beginPath();g.arc(cx,cy,r,0,T);g.stroke()});
   for(let k=0;k<12;k++){const a=k*T/12;fc(g,'#e8b83a',.7);circ(g,cx+Math.cos(a)*86,cy+Math.sin(a)*86,3)}
   g.lineWidth=4;for(let k=0;k<6;k++){const a=t*.1+k*T/6;g.beginPath();g.moveTo(cx,cy);g.lineTo(cx+Math.cos(a)*38,cy+Math.sin(a)*38);g.stroke()}fc(g,'#ffd23d',.8);circ(g,cx,cy,8)});
  lay(g,cam*.2,116,(x,n)=>{const h=26+hs(n)*22;fc(g,A.mid);g.beginPath();g.moveTo(x,BASE+oy);g.quadraticCurveTo(x+56,BASE+oy-h*2,x+116,BASE+oy);g.fill();
   for(let k=0;k<9;k++){fc(g,'#ffd23d',.4+.5*Math.sin(t*3+k+n*2));rc(g,x+12+hs(n*5+k)*92,BASE+oy-3-hs(n*3+k)*h*1.2,2,1)}
   if(n%2){fc(g,'#5a3408');rc(g,x+80,BASE+oy-16,22,13);poly(g,[x+80,BASE+oy-16,x+102,BASE+oy-16,x+98,BASE+oy-24,x+84,BASE+oy-24]);fc(g,'#ffd23d');rc(g,x+89,BASE+oy-14,4,4)}});
  lay(g,cam*.36,124,(x,n)=>{fc(g,'#5a3a0c');rc(g,x+10,40+oy*.5,16,BASE-40);rc(g,x+6,36+oy*.5,24,6);rc(g,x+6,BASE+oy-4,24,5);fc(g,'#ffd23d',.6);rc(g,x+13,40+oy*.5,2,BASE-44);fc(g,'#ffd23d',.8);rc(g,x+6,36+oy*.5,24,1)});
  for(let k=0;k<22;k++){const x=wrapx(hs(k)*W-cam*.25,W),y=((t*(24+k%5*8)+hs(k+3)*H)%(H+10))-5,w=Math.abs(Math.cos(t*4+k))*5+1;fc(g,'#ffd23d',.85);rc(g,x-w/2,y,w,4)}
  ground(g,A.near,BASE+oy);
 }},
/* 5 الظلم: قاعة محكمة حديدية وميزان عملاق */
5:{sky:['#07070a','#24242c','#5a5a6a'],
 draw(g,cam,oy,t,A){
  lay(g,cam*.04,520,(x)=>{const cx=x+260,ty=34+oy*.3,a=Math.sin(t*.3)*.09;g.strokeStyle=A.far;g.fillStyle=A.far;g.globalAlpha=1;g.lineWidth=5;
   g.beginPath();g.moveTo(cx,0);g.lineTo(cx,ty);g.stroke();g.lineWidth=4;g.beginPath();g.moveTo(cx-110,ty-110*a);g.lineTo(cx+110,ty+110*a);g.stroke();
   [[-1,-110*a],[1,110*a]].forEach(([s,d])=>{const px=cx+s*110,py=ty+d;g.lineWidth=1;g.beginPath();g.moveTo(px,py);g.lineTo(px-24,py+62);g.moveTo(px,py);g.lineTo(px+24,py+62);g.stroke();ell(g,px,py+64,30,6)});
   g.lineWidth=7;g.beginPath();g.moveTo(cx,ty);g.lineTo(cx,BASE+oy);g.stroke()});
  lay(g,cam*.2,98,(x,n)=>{fc(g,A.mid);rc(g,x+10,30+oy*.4,26,BASE-30);rc(g,x+5,26+oy*.4,36,6);fc(g,'#000',.3);for(let k=0;k<4;k++)rc(g,x+14+k*6,32+oy*.4,1,BASE-34);
   fc(g,'#dfe6ff',.05);poly(g,[x+46,60,x+64,60,x+120,BASE,x+70,BASE]);g.strokeStyle='#9aa0b8';g.globalAlpha=.4;g.lineWidth=1;g.beginPath();g.moveTo(x+36,50+oy*.4);g.quadraticCurveTo(x+68,86+oy*.4,x+108,50+oy*.4);g.stroke()});
  lay(g,cam*.4,44,(x,n)=>{const sw=Math.sin(t*.8+n)*2,len=20+hs(n)*50;g.strokeStyle='#7a7a90';g.lineWidth=2;g.globalAlpha=.6;g.setLineDash([2,2]);g.beginPath();g.moveTo(x,0);g.lineTo(x+sw,len);g.stroke();g.setLineDash([])});
  g.strokeStyle='#aab0c8';g.lineWidth=.7;for(let k=0;k<40;k++){g.globalAlpha=.3;const x=wrapx(hs(k)*W-cam*.3-t*10,W),y=((t*120+hs(k+4)*H*2)%(H+20))-10;g.beginPath();g.moveTo(x,y);g.lineTo(x-3,y+8);g.stroke()}
  ground(g,A.near,BASE+oy);
 }},
/* 6 الغضب: براكين ولهب وأنهار حمم */
6:{sky:['#160202','#6a0a06','#f06a1a'],paint:x=>{x.fillStyle='#ff5a20';x.globalAlpha=.35;x.beginPath();x.arc(236,70,34,0,T);x.fill();x.globalAlpha=.9;x.fillStyle='#ffb070';x.beginPath();x.arc(236,70,22,0,T);x.fill()},
 draw(g,cam,oy,t,A){
  for(let k=0;k<6;k++){fc(g,'#1a0404',.5);ell(g,wrapx(k*120-cam*.05-t*6,520)-40,22+k*13+Math.sin(t*.3+k)*3,90,12)}
  const L=t%7.3;if(L<.07||(L>.15&&L<.2)){fc(g,'#ffcc88',.22);rc(g,0,0,W,100)}
  lay(g,cam*.06,280,(x,n)=>{const ax=x+140,ay=64+hs(n)*22+oy*.5;fc(g,'#2e0806');poly(g,[x,BASE+oy,ax-18,ay+6,ax-8,ay,ax+8,ay,ax+18,ay+6,x+280,BASE+oy]);
   fc(g,'#ff7a20',.9);ell(g,ax,ay+1,9,2.5);fc(g,'#ffd060',.8);ell(g,ax,ay+1,5,1.4);
   g.strokeStyle='#ff5a10';g.lineWidth=1.4;g.globalAlpha=.85;g.setLineDash([5,4]);g.lineDashOffset=-t*18;g.beginPath();g.moveTo(ax-4,ay+3);g.lineTo(ax-18,ay+30);g.lineTo(ax-14,ay+52);g.lineTo(ax-40,BASE+oy);g.moveTo(ax+4,ay+3);g.lineTo(ax+14,ay+28);g.lineTo(ax+28,ay+50);g.lineTo(ax+52,BASE+oy);g.stroke();g.setLineDash([]);
   if(n%2===0){for(let j=0;j<9;j++){fc(g,'#3a1210',.55-j*.05);circ(g,ax+Math.sin(t*.8+j)*7+j*2,ay-6-j*9-((t*14)%9),5+j*.9)}}
   for(let j=0;j<16;j++){const u=(t*.7+j*.13+n*.3)%1,px=ax+(hs(j+n)*2-1)*46*u,py=ay-70*Math.sin(u*Math.PI);fc(g,j%2?'#ffb030':'#ff5a10',1-u);rc(g,px,py,2,2)}});
  lay(g,cam*.2,150,(x,n)=>{const h=44+hs(n*3)*34;fc(g,'#3e0c08');poly(g,[x,BASE+oy,x+34,BASE+oy-h,x+52,BASE+oy-h*1.1,x+90,BASE+oy-h*.6,x+150,BASE+oy]);
   g.strokeStyle='#ff6a18';g.lineWidth=1;g.globalAlpha=.8;g.setLineDash([3,3]);g.lineDashOffset=-t*14;g.beginPath();g.moveTo(x+50,BASE+oy-h*1.05);g.lineTo(x+60,BASE+oy-h*.6);g.lineTo(x+54,BASE+oy-h*.3);g.lineTo(x+66,BASE+oy);g.stroke();g.setLineDash([])});
  const gr=g.createLinearGradient(0,BASE-6+oy,0,H);gr.addColorStop(0,'#ffd060');gr.addColorStop(.25,'#ff6a14');gr.addColorStop(1,'#7a0e04');g.fillStyle=gr;g.globalAlpha=1;rc(g,0,BASE-4+oy,W,H);
  fc(g,'#ffe090',.7);for(let x=0;x<W;x+=4)rc(g,x,BASE-5+oy+Math.sin(x*.12+t*2.4+cam*.03)*1.6,4,2);
  lay(g,cam*.5,72,(x,n)=>{const h=40+hs(n*5)*44;fc(g,'#120303');poly(g,[x,BASE+oy+8,x+10,BASE+oy-h*.5,x+22,BASE+oy-h,x+34,BASE+oy-h*.4,x+60,BASE+oy+8]);fc(g,'#ff5a1a',.5);rc(g,x+22,BASE+oy-h,1,h*.8)});
  lay(g,cam*.8,22,(x,n)=>{const fh=8+hs(n*3)*16+Math.sin(t*8+n*2)*3;fc(g,n%2?'#ff4a10':'#ffa030',.9);poly(g,[x,BASE+oy+6,x+5,BASE+oy+6-fh,x+10,BASE+oy+6-fh*.4,x+14,BASE+oy+6-fh*.9,x+20,BASE+oy+6]);fc(g,'#ffe890',.8);poly(g,[x+6,BASE+oy+6,x+9,BASE+oy+6-fh*.5,x+12,BASE+oy+6])});
  for(let k=0;k<44;k++){const x=wrapx(hs(k)*W-cam*.2-t*(6+k%4*3)+Math.sin(t+k)*4,W),y=H-((t*(18+k%7*7)+hs(k+7)*H)%(H+10));fc(g,k%3?'#ff8a30':'#ffd060',.85);rc(g,x,y,1+(k%3===0),1+(k%3===0))}
  fc(g,'#ff5a10',.07+.03*Math.sin(t*5));rc(g,0,0,W,H);
 }},
/* 7 الكذب: متاهة مرايا وأقنعة وانعكاسات */
7:{sky:['#041030','#1d4a8a','#9ae0ff'],paint:x=>{x.fillStyle='#fff';x.globalAlpha=.9;x.beginPath();x.arc(90,40,13,0,T);x.fill();x.globalAlpha=.4;x.beginPath();x.arc(104,44,13,0,T);x.fill();stars(x,30,21)},
 draw(g,cam,oy,t,A){
  lay(g,cam*.08,92,(x,n)=>{const h=70+hs(n)*50;fc(g,A.far);poly(g,[x+10,BASE+oy,x,BASE+oy-h,x+36,BASE+oy-h-10,x+62,BASE+oy-h+6,x+54,BASE+oy]);fc(g,'#fff',.1+.08*Math.sin(t+n));poly(g,[x+14,BASE+oy-h+4,x+24,BASE+oy-h,x+30,BASE+oy-10,x+18,BASE+oy-10])});
  lay(g,cam*.22,70,(x,n)=>{const h=40+hs(n*4)*40;fc(g,A.mid);rc(g,x+8,BASE+oy-h,22,h);poly(g,[x+8,BASE+oy-h,x+19,BASE+oy-h-14,x+30,BASE+oy-h])});
  ground(g,'#0b2a52',BASE+oy);
  g.save();g.beginPath();g.rect(0,BASE+oy,W,H);g.clip();g.translate(0,2*(BASE+oy));g.scale(1,-1);g.globalAlpha=.22;
  lay(g,cam*.22,70,(x,n)=>{const h=40+hs(n*4)*40;g.fillStyle='#9ae0ff';rc(g,x+8,BASE+oy-h,22,h);poly(g,[x+8,BASE+oy-h,x+19,BASE+oy-h-14,x+30,BASE+oy-h])});g.restore();
  fc(g,'#fff',.2);for(let x=0;x<W;x+=6)rc(g,x,BASE+oy+2+hs(x)*40+Math.sin(t*2+x)*2,3,1);
  for(let k=0;k<5;k++){const x=wrapx(k*110-cam*.3+Math.sin(t*.4+k)*10,520)-40,y=30+k*20+Math.sin(t*.7+k)*6+oy*.3;fc(g,'#e8f4ff',.8);ell(g,x,y,9,12);fc(g,'#0b2a52');rc(g,x-5,y-4,3,1.4);rc(g,x+2,y-4,3,1.4);g.strokeStyle='#0b2a52';g.lineWidth=1;g.beginPath();g.arc(x,y+2,4,.2,2.9);g.stroke()}
  for(let k=0;k<8;k++){const x=wrapx(hs(k)*W-cam*.4+t*6,W),y=wrapx(hs(k+3)*H+t*8*(k%2?1:-1),H);g.save();g.translate(x,y);g.rotate(t+k);fc(g,'#cfe8ff',.35);poly(g,[0,-6,4,0,0,6,-4,0]);g.restore()}
 }},
/* 8 الحسد: عين عملاقة وغابة أشواك ونوافذ حياة الآخرين */
8:{sky:['#010a04','#0b3a1a','#2fae4a'],paint:x=>stars(x,26,31),
 draw(g,cam,oy,t,A){
  const ex=200-cam*.02,ey=30+oy*.3,px=Math.cos(t*.5)*10,py=Math.sin(t*.7)*3;
  fc(g,'#d8f8d8',.9);ell(g,ex,ey,42,17);fc(g,'#1aa040');circ(g,ex+px,ey+py,12);fc(g,'#031a08');ell(g,ex+px,ey+py,2.6,10);fc(g,'#fff',.8);circ(g,ex+px-3,ey+py-4,2);
  g.strokeStyle='#031a08';g.lineWidth=2;g.globalAlpha=.8;g.beginPath();g.ellipse(ex,ey,42,17,0,Math.PI,T);g.stroke();
  for(let b=0;b<3;b++){fc(g,['#4aff80','#8affd0','#2ad060'][b],.1);for(let x=0;x<W;x+=4)rc(g,x,24+b*12+Math.sin(x*.03+t*.5+b)*8,4,9)}
  lay(g,cam*.1,100,(x,n)=>{fc(g,A.far);g.beginPath();g.moveTo(x+40,BASE+oy);g.bezierCurveTo(x+30,BASE+oy-30,x+54,BASE+oy-46,x+44,BASE+oy-70);g.lineTo(x+52,BASE+oy-70);g.bezierCurveTo(x+60,BASE+oy-46,x+40,BASE+oy-30,x+52,BASE+oy);g.fill();
   for(let k=0;k<5;k++){const ty=BASE+oy-20-k*16;poly(g,[x+(k%2?52:40),ty,x+(k%2?64:28),ty-4,x+(k%2?52:40),ty-8])}
   fc(g,'#0b3a1a');ell(g,x+46,BASE+oy-74,26,13);if(Math.sin(t*.6+n*2)>-.8){fc(g,'#6bff6b',.9);rc(g,x+38,BASE+oy-76,3,2);rc(g,x+50,BASE+oy-76,3,2)}});
  lay(g,cam*.22,76,(x,n)=>{const h=50+hs(n*3)*60;fc(g,A.mid);rc(g,x+6,BASE+oy-h,48,h);for(let r=0;r<Math.floor(h/12);r++)for(let q=0;q<3;q++)if(hs(n*17+r*3+q)>.4){fc(g,'#ffd890',.5+.4*Math.sin(t*.8+r+q+n));rc(g,x+12+q*14,BASE+oy-h+6+r*12,6,7)}});
  lay(g,cam*.45,60,(x,n)=>{const len=24+hs(n)*60;g.strokeStyle='#17702a';g.lineWidth=2;g.globalAlpha=.85;g.beginPath();g.moveTo(x,0);for(let y=0;y<=len;y+=6)g.lineTo(x+Math.sin(y*.18+n+t*.8)*4,y);g.stroke();fc(g,'#6bff6b',.85);for(let y=8;y<len;y+=10)poly(g,[x+Math.sin(y*.18+n+t*.8)*4,y,x+7,y-2,x+3,y+4])});
  for(let k=0;k<26;k++){const x=wrapx(hs(k)*W-cam*.3+Math.sin(t*.7+k)*14,W),y=70+hs(k+5)*80+Math.sin(t*.9+k*2)*8;fc(g,'#c8ff60',.3+.6*Math.abs(Math.sin(t*1.5+k)));rc(g,x,y,2,2)}
  ground(g,A.near,BASE+oy);
 }},
/* 9 الكبرياء: قصر رخام فوق بحر غيوم وتيجان */
9:{sky:['#10062a','#4a2a90','#f4c878'],paint:x=>{const gr=x.createRadialGradient(160,110,10,160,110,170);gr.addColorStop(0,'rgba(255,230,160,.9)');gr.addColorStop(1,'rgba(255,230,160,0)');x.fillStyle=gr;x.fillRect(0,0,W,H);stars(x,30,41)},
 draw(g,cam,oy,t,A){
  g.save();g.translate(160,112+oy*.3);g.rotate(t*.04);fc(g,'#fff0b0',.07);for(let k=0;k<10;k++){g.rotate(T/10);poly(g,[0,0,230,-14,230,14])}g.restore();
  lay(g,cam*.06,300,(x,n)=>{fc(g,A.far);rc(g,x+90,BASE+oy-50,120,50);ell(g,x+150,BASE+oy-50,30,26);poly(g,[x+148,BASE+oy-76,x+152,BASE+oy-76,x+150,BASE+oy-100]);
   [20,60,230,262].forEach(ox=>{rc(g,x+ox,BASE+oy-58,16,58);poly(g,[x+ox-2,BASE+oy-58,x+ox+8,BASE+oy-78,x+ox+18,BASE+oy-58])});
   fc(g,'#ffd23d',.8);rc(g,x+90,BASE+oy-50,120,1);circ(g,x+150,BASE+oy-101,2);for(let k=0;k<6;k++){fc(g,'#ffe890',.4+.4*Math.sin(t+k+n));rc(g,x+100+k*16,BASE+oy-34,4,8)}});
  lay(g,cam*.1,90,(x,n)=>{fc(g,'#fff',.18);ell(g,x+30,BASE+oy+8,40,10);ell(g,x+62,BASE+oy+4,28,9)});
  lay(g,cam*.25,84,(x,n)=>{fc(g,A.mid);rc(g,x+8,36+oy*.5,16,BASE-36);rc(g,x+4,32+oy*.5,24,6);fc(g,'#ffd23d');rc(g,x+4,32+oy*.5,24,1.5);rc(g,x+4,BASE+oy-4,24,3);
   if(n%2){const w=Math.sin(t*2+n)*3;fc(g,'#b01a3a',.9);poly(g,[x+34,40+oy*.5,x+50+w,52+oy*.5,x+50+w,86+oy*.5,x+42,78+oy*.5,x+34,86+oy*.5]);fc(g,'#ffd23d');rc(g,x+34,40+oy*.5,16,2)}});
  for(let k=0;k<7;k++){const x=wrapx(k*92-cam*.3+Math.sin(t*.5+k)*8,520)-40,y=26+hs(k)*70+Math.sin(t*.8+k)*5+oy*.3;fc(g,'#ffd23d',.9);poly(g,[x-7,y+5,x-7,y-2,x-3,y+1,x,y-5,x+3,y+1,x+7,y-2,x+7,y+5]);fc(g,'#fff',.4+.4*Math.sin(t*3+k));rc(g,x-1,y-6,2,2)}
  ground(g,A.near,BASE+oy);fc(g,'#ffd23d',.5);rc(g,0,BASE+oy,W,1);
 }},
/* 10 الحقيقة: شفق أبيض وجزر عائمة وريش */
10:{sky:['#18143a','#6a5ab0','#f4eaff'],paint:x=>stars(x,40,51),
 draw(g,cam,oy,t,A){
  const gr=g.createRadialGradient(160,70,4,160,70,120);gr.addColorStop(0,'rgba(255,255,255,.95)');gr.addColorStop(1,'rgba(255,255,255,0)');g.fillStyle=gr;g.globalAlpha=1;rc(g,0,0,W,H);
  for(let b=0;b<4;b++){fc(g,['#8affd0','#c0a0ff','#ffffff','#8ad0ff'][b],.13);for(let x=0;x<W;x+=3)rc(g,x,22+b*13+Math.sin(x*.025+t*.5+b*1.7+cam*.003)*11,3,10)}
  lay(g,cam*.1,260,(x,n)=>{const ix=x+130,iy=60+hs(n)*40+Math.sin(t*.5+n)*4+oy*.4;fc(g,A.far);poly(g,[ix-46,iy,ix+46,iy,ix+22,iy+30,ix,iy+52,ix-20,iy+30]);fc(g,'#fff',.45);rc(g,ix-46,iy,92,2);
   fc(g,'#9ae8ff',.7);for(let k=0;k<12;k++)rc(g,ix-14+hs(k)*4,iy+8+((t*30+k*9)%70),1,2);for(let k=0;k<3;k++){fc(g,'#e8f4ff',.8);poly(g,[ix-30+k*26,iy,ix-24+k*26,iy-14-hs(n+k)*10,ix-18+k*26,iy])}});
  lay(g,cam*.3,150,(x,n)=>{fc(g,'#fff',.35);ell(g,x+40,BASE+oy-4,50,12);ell(g,x+90,BASE+oy-8,38,10);ell(g,x+120,BASE+oy-2,30,8)});
  for(let k=0;k<16;k++){const x=wrapx(hs(k)*W-cam*.3+Math.sin(t*.8+k)*12,W),y=((t*(10+k%4*4)+hs(k+3)*H)%(H+10))-5;fc(g,'#fff',.85);ell(g,x,y,1.6,4);fc(g,'#cfc0ff',.6);rc(g,x,y-4,1,8)}
  for(let k=0;k<20;k++){fc(g,'#fff',.2+.7*Math.abs(Math.sin(t*(1+k%3)+k)));rc(g,hs(k*3)*W,hs(k*5)*120,1,1)}
  ground(g,A.near,BASE+oy);fc(g,'#fff',.55);rc(g,0,BASE+oy,W,1);
 }}
};

BG.draw=function(g,A,i,cam,t){
 const B=BD[i];if(!B)return orig(g,A,i,cam,t);
 g.globalAlpha=1;g.drawImage(skyOf(i,B.sky,B.paint),0,0);
 const oy=Math.max(0,Math.min(44,-(G.camY||0)*.18));
 B.draw(g,cam,oy,t,A);g.globalAlpha=1;
};
})();
