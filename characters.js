/* ===== WITHIN ME — characters.js : الشخصيات + الأعداء + البوسات (بكسل آرت) ===== */
const Sprites=(()=>{
 const S={};
 const mir=h=>h.map(r=>r+[...r].reverse().join(''));   // نصف الشكل → شكل كامل متناظر

 /* ---------- أرجل مشتركة (5 صفوف) ---------- */
 const LEG={
  idle:['..ppp..ppq..','..ppp..ppq..','..ppp..ppq..','..bbb..bbb..','..bbb..bbbb.'],
  s1:['.ppp....ppq.','.ppp.....pq.','pp.......pq.','bb........bb','bb.......bbb'],
  s2:['...pppppq...','...pppppq...','...pp..pq...','...bb..bb...','...bb..bbb..'],
  jump:['..pppppppq..','..pp.pp.pq..','..bb.bb.bb..','............','............'],
  fall:['.ppp...ppq..','.ppp...ppq..','.ppp...ppq..','.bbb...bbb..','............']
 };
 const person=(head,torso,atkTorso,pal)=>({pal,f:{
  idle:[...head,...torso,...LEG.idle],
  run0:[...head,...torso,...LEG.s1],
  run1:[...head,...torso,...LEG.s2],
  jump:[...head,...torso,...LEG.jump],
  fall:[...head,...torso,...LEG.fall],
  atk:[...head,...atkTorso,...LEG.idle]
 }});

 /* ---------- ALEXANDER (12x18) : معطف أزرق + وشاح أحمر ---------- */
 const AH=['...hhhhhh...','..hhhHhhhh..','.hhhsssssh..','.hhssesssSs.','..hsssssssS.','...SsssssS..','....rrrrrr..'];
 const AT=['..ccwwwwwcC.','.ccwwwwwWWcC','.scwwwwwWWcC','.sccwwwwWWcC','..ccccccccC.','..pppppppqq.'];
 const AA=[AT[0],'.ccwwwwWssss',AT[2],AT[3],AT[4],AT[5]];
 S.alex=person(AH,AT,AA,{h:'#2b1d2e',H:'#6a6478',s:'#e8b890',S:'#c08c68',e:'#14101c',r:'#d84a5a',
  w:'#dfe4ff',W:'#9aa4d4',c:'#3a3f78',C:'#262a58',p:'#23264a',q:'#161a38',b:'#14121c'});

 /* ---------- LARA (12x18) : فستان بنفسجي + شعر طويل ---------- */
 const LH=['...hhhhhh...','..hhHhhhhh..','.hhhsssssh..','.hhssesssSh.','.hhsssssssSh','.hh.SsssSh..','.hh..hhh.hh.'];
 const LT=['.hhddddddhh.','.hddddddddD.','.sdddddddDh.','.sddddddDDh.','..dddddddDD.','.ddddddddDDD'];
 const LA=[LT[0],'.hdddddssss.',LT[2],LT[3],LT[4],LT[5]];
 S.lara=person(LH,LT,LA,{h:'#4a2438',H:'#7a3a5c',s:'#f0c8a0',S:'#c8967a',e:'#14101c',
  d:'#b48ad8',D:'#7a5aa8',p:'#f0c8a0',q:'#c8967a',b:'#2a1a3a'});

 /* ---------- الأعداء ---------- */
 S.shade={pal:{k:'#150d2a',m:'#2a1850',g:'#ffffff'},f:{
  a:mir(['...kkk','..kkkk','.kkkkk','.kkgkk','.kkkkk','.kkmkk','.kkkkk','.kkkkk','.kk.kk','kk..kk']),
  b:mir(['...kkk','..kkkk','.kkkkk','.kkgkk','.kkkkk','.kkmkk','.kkkkk','.kkkkk','..kkk.','.kk..k'])}};
 S.wisp={pal:{f:'#ffffff',g:'#0a0a14'},f:{
  a:mir(['....f','...ff','..fff','.ffff','.fgff','.ffff','..fff','...ff','.f..f','....f']),
  b:mir(['....f','...ff','..fff','.ffff','.fgff','.ffff','..fff','...ff','..f.f','.f...'])}};
 S.hopper={pal:{k:'#102a1a',m:'#1e5a38',g:'#ffffff'},f:{
  a:mir(['..kkkk','.kkkkk','kkgkkk','kkkkkk','kkkmmm','kkkkkk','.kk..k','kk....'])}};
 S.watcher={pal:{o:'#2a1a40',w:'#e8e8f0',k:'#111111',g:'#ff4a6a'},f:{
  a:mir(['...ooo','..oooo','.oowww','oowwww','oowwkk','oowwkg','oowwkk','oowwww','.oowww','..oooo','...ooo','..o..o']),
  b:mir(['...ooo','..oooo','.oowww','oowwww','oowwkk','oowwkg','oowwkk','oowwww','.oowww','..oooo','...ooo','.o..o.'])}};
 S.charger={pal:{h:'#e8e0c8',k:'#2a1420',m:'#4a2a38',g:'#ffffff'},f:{
  a:mir(['h......','hh.kkkk','.hkkkkk','.kkgkkk','.kkkkkk','.kkkmmm','..kkkkk','..kkkkk','..kk..k','..kk...']),
  b:mir(['h......','hh.kkkk','.hkkkkk','.kkgkkk','.kkkkkk','.kkkmmm','..kkkkk','..kkkkk','..k..kk','...kk..'])}};

 /* ---------- البوسات (16x16 ، تتناظر تلقائياً) ---------- */
 const B=[
  /* 0 WRAITH — الخوف */
  {pal:{k:'#0a0818',m:'#1c1838',g:'#4aa3ff'},h:['.....kkk','...kkkkk','..kkkkkk','..kkmmmm','..kmmmgg','..kmmmmm','..kkmmmm','.kkkkmmm','.kkkkkkm','kkkkkkkk','kkkkkkkk','kkkmkkkm','kkkkkkkk','kk.kkk.k','k..kk..k','...k....']},
  /* 1 MASKED — الخيانة */
  {pal:{a:'#c070ff',w:'#e8e0f0',k:'#1a1030',m:'#2e1c50'},h:['...aaaaa','..aaaaaa','..wwwwww','.wwwkwww','.wwwwwww','.wwwwkkk','..wwwwww','..kkmmmm','.kkkmmmm','kkkkmmmm','kkkkkmmm','kkkkkkmm','kkkkkkkk','.kkk.kkk','.kkk.kkk','.aaa.aaa']},
  /* 2 SIREN — الإغراء */
  {pal:{a:'#ff7ac0',m:'#7a2a5a',s:'#f0c8d8',g:'#ffffff'},h:['.....mmm','....mmmm','....msss','....mgss','....msss','..aa.mss','.aaaammm','aaaaammm','aaaaammm','.aaaammm','..aaammm','...aammm','....mmmm','....mmmm','....mm..','....m...']},
  /* 3 BOTTLE — الزجاجة */
  {pal:{a:'#caa060',k:'#0d4a3a',l:'#6affc0',w:'#d8f8e0',g:'#0a2018',m:'#1a7a58'},h:['......aa','......kk','......kl','.....kkl','...kkkkl','..kkkkkl','.kkwwwww','.kkwwwww','.kkgwwww','.kkwwwww','.kkkkkkl','.kkkkkkl','.kmmmmml','.kkkkkkk','..kkkkkk','..kkkkkk']},
  /* 4 GOLEM — الطمع */
  {pal:{l:'#ffe27a',m:'#c8961a',k:'#6a4a0a',g:'#ff3030'},h:['...llllm','..lllmmm','..lgmmmm','..lmmmmm','..llmmmm','lllllmmm','lmmlmmmm','lmmlkmmm','ll..mmmm','...lmmmm','...lmmmm','...kmmmm','..kkkmmm','..kkk.kk','..kkk.kk','.kkkk.kk']},
  /* 5 JUDGE — القاضي */
  {pal:{w:'#d8d8e0',s:'#a8a8b4',m:'#55555f',k:'#1a1a22',g:'#ff4040'},h:['...wwwww','..wwwwww','..wsssss','..wsgsss','..wsssss','...ssmmm','..kkmmmm','.kkkmmmm','.kkkkmmm','.kkkkkmm','kkkkkkmm','kkkkkkkm','kkkkkkkk','kkkkkkkk','kkkmkkkk','kkkkkkkk']},
  /* 6 DEMON — الغضب */
  {pal:{a:'#ff7a30',k:'#3a0808',m:'#7a1414',w:'#fff0c0',g:'#ffee66'},h:['a...kkkk','aa.kkkkk','.akkkkkk','..kgkkkk','..kkkkkk','..kkwwww','..kkkkkk','.kkmmmmm','kkkmmmmm','kkkmmaam','kkkmmaaa','.kkmmmmm','.kkkmmmm','.kkk.mmm','.kkk.kkk','.aaa.aaa']},
  /* 7 MIRROR — الكذب */
  {pal:{l:'#e8faff',m:'#5a9ad8',k:'#16305a',g:'#ffffff'},h:['.....lll','....lmmm','...lmmmm','...lmgmm','...lmmmm','....lmmm','..llllmm','.lmmmlmm','lmmmlmmm','lmmmllmm','lmmmmlmm','.lmmmlmm','.lmmmmlm','..lmm.lm','..lmm.lm','..lkk.lk']},
  /* 8 ENVY — الحسد */
  {pal:{a:'#9affb0',k:'#0a2a14',m:'#16603a',g:'#d8ff6a'},h:['...a.a.a','...aaaaa','..kkkkkk','..kgkkgk','..kkkkkk','..kkgggk','..kkkkkk','.kkmmmmm','.kmgmmgm','.kkmmmmm','.kkmgmmm','.kkmmmmm','kkkkmmmm','kkk.kmmm','kk..kk.m','k...k...']},
  /* 9 KING — الكبرياء */
  {pal:{y:'#ffd23d',s:'#e0c8f0',k:'#2a1a48',m:'#5a2a88',w:'#f0e8ff',g:'#d8b8ff',b:'#1a1030'},h:['.y.y.y.y','.yyyyyyy','..ssssss','..sgssss','..ssssss','..kwwwss','.mmkkmmm','mmmmmmmm','mmmmkkkk','mmmmkkkk','mmmmkkyk','mmmmkkkk','mmmmkkkk','mmm.kkkk','mm..kk.k','m...bb.b']}
 ];
 B.forEach((b,i)=>S['boss'+i]={pal:b.pal,f:{a:mir(b.h)}});

 S.heart={pal:{x:'#ff4a6a'},f:{a:['.xx.xx.','xxxxxxx','xxxxxxx','.xxxxx.','..xxx..','...x...']}};

 /* ---------- الرسم (مع cache) ---------- */
 const cache=new Map();
 function bake(name,fr,o){
  const s=S[name],f=s.f[fr],sc=o.scale||1,w=f[0].length,h=f.length;
  const pal=o.pal?Object.assign({},s.pal,o.pal):s.pal;
  const cv=document.createElement('canvas');cv.width=w*sc;cv.height=h*sc;
  const g=cv.getContext('2d');
  for(let j=0;j<h;j++)for(let i=0;i<w;i++){
   const ch=f[j][o.flip?w-1-i:i];
   if(ch==='.'||!pal[ch])continue;
   g.fillStyle=pal[ch];g.fillRect(i*sc,j*sc,sc,sc);
  }
  return cv;
 }
 function draw(c,name,x,y,o={}){
  const s=S[name];if(!s)return;
  const fr=o.fr&&s.f[o.fr]?o.fr:Object.keys(s.f)[0];
  const key=name+'|'+fr+'|'+(o.scale||1)+'|'+(o.flip?1:0)+'|'+(o.pal?JSON.stringify(o.pal):'');
  let b=cache.get(key);if(!b){b=bake(name,fr,o);cache.set(key,b)}
  const pa=c.globalAlpha;
  if(o.alpha!=null)c.globalAlpha=pa*o.alpha;
  c.drawImage(b,Math.round(x),Math.round(y));
  c.globalAlpha=pa;
 }
 return{draw};
})();
