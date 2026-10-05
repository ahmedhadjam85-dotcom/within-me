/* ===== WITHIN ME — characters.js (v4) : الشخصيات + أعداء كل عالم + البوسات ===== */
const Sprites=(()=>{
 const S={};
 const mir=h=>h.map(r=>r+[...r].reverse().join(''));
 const bot=(a,rows)=>a.slice(0,a.length-rows.length).concat(rows);
 const rep=(a,at,rows)=>a.map((r,i)=>i>=at&&i<at+rows.length?rows[i-at]:r);
 const sk=(pal,a,f)=>({pal,f:{a:mir(a),b:mir(f?f(a):a)}});

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

 /* ---------- ALEXANDER (12x19) : وسيم، شعر مرفوع بخصلة رمادية، معطف أزرق، وشاح ---------- */
 const AH=[
  '...hhhhhh...',
  '..hiihhhhh..',
  '.hhHhhhhhhh.',
  '.hhhsshhhs..',
  '.hhssssEesS.',
  '..hssssssssS',
  '...tssssmsS.',
  '....StttSSS.'.slice(0,12),
  '...rrrrrrR..'
 ];
 const AT=[
  '..ccwwwwwcC.',
  '.ccwwwwwWWcC',
  '.sccwwwwWWcC',
  '.sccccBBccCC',
  '..ccccccccC.'
 ];
 const AA=[AT[0],'.ccwwwWssszz',AT[2],AT[3],AT[4]];
 S.alex=person(AH,AT,AA,{h:'#241a2c',i:'#4a3c5a',H:'#8a8498',s:'#f0c8a0',S:'#c08c68',t:'#a8806e',e:'#14101c',E:'#ffffff',m:'#8a4a4a',
  r:'#d84a5a',R:'#9a2a3c',w:'#dfe4ff',W:'#9aa4d4',c:'#34397a',C:'#22265a',B:'#8a6a3a',p:'#23264a',q:'#161a38',b:'#14121c',z:'#e8f0ff'});

 /* ---------- LARA (12x18) ---------- */
 const LH=['...hhhhhh...','..hhHhhhhh..','.hhhsssssh..','.hhssesssSh.','.hhsssssssSh','.hh.SsssSh..','.hh..hhh.hh.'];
 const LT=['.hhddddddhh.','.hddddddddD.','.sdddddddDh.','.sddddddDDh.','..dddddddDD.','.ddddddddDDD'];
 const LA=[LT[0],'.hdddddssss.',LT[2],LT[3],LT[4],LT[5]];
 S.lara=person(LH,LT,LA,{h:'#4a2438',H:'#7a3a5c',s:'#f0c8a0',S:'#c8967a',e:'#14101c',
  d:'#b48ad8',D:'#7a5aa8',p:'#f0c8a0',q:'#c8967a',b:'#2a1a3a'});

 /* ---------- أعداء كل عالم: g = أرضي ، a = طائر ---------- */
 /* 0 FEAR */
 S.e0g=sk({k:'#120a24',m:'#2a1a48',g:'#4aa3ff',w:'#e0e8ff'},['k.....','kk.kkk','.kkkkk','.kgkkk','.kkkkk','.kkwww','..kkkk','..kmkk','.kk..k','kk....'],a=>bot(a,['..kk.k','.kk..k']));
 S.e0a=sk({k:'#0a0818',w:'#dfe8ff',g:'#4aa3ff'},['..kkk','.kkkk','kkkkk','kkwww','kkwgg','kkwww','kkkkk','kkkkk','k.kk.','.k..k'],a=>bot(a,['.kk.k','k..k.']));
 /* 1 BETRAYAL : أقنعة */
 S.e1g=sk({a:'#c070ff',w:'#e8e0f0',k:'#1a1030',m:'#3a1a6a',d:'#cfd3ff'},['..aaaa','.wwwww','.wkwww','.wwwww','.wwkkk','..mmmm','.mmmmm','.mmmdd','.mm..m','mm....'],a=>bot(a,['..mm.m','.mm..m']));
 S.e1a=sk({a:'#c070ff',w:'#e8e0f0',k:'#1a1030'},['..aaa','.wwww','wwwww','wkwww','wwwww','wwkkk','.wwww','..www','...aa','....a'],a=>bot(a,['..aa.','...a.']));
 /* 2 TEMPTATION : قلوب */
 S.e2g=sk({h:'#ff4a8a',w:'#ffffff',k:'#2a0a2a',m:'#7a1040'},['.hhh..','hhhhh.','hhhhhh','hwkhhh','hhhhhh','hhhmmm','.hhhhh','..hhhh','..kk..','.kkk..'],a=>bot(a,['...kk.','..kkk.']));
 S.e2a=sk({h:'#ff4a8a',a:'#ffc0e0',w:'#ffffff',k:'#2a0a2a'},['..hh.','.hhhh','ahhhh','aawkh','aahhh','.ahhh','..hhh','...hh','....h'],a=>rep(a,2,['.ahhh','aawkh','a.hhh']));
 /* 3 ALCOHOL : قارورات */
 S.e3g=sk({a:'#caa060',g:'#1a8a5a',w:'#e8f8e8',k:'#0d2a20',m:'#2a2a2a',l:'#6affc0'},['....aa','....gg','....gg','...ggg','..gggg','.ggwww','.ggwkw','.ggwmm','.gggll','..kk.k','.kk..k'],a=>bot(a,['...kk.','..kk.k']));
 S.e3a=sk({a:'#caa060',g:'#1a8a5a',l:'#6affc0',w:'#ffffff',k:'#0d2a20'},['...aa','...gg','...gg','..ggg','.gggg','gllll','glkll','gllll','.gggl','..ggg'],a=>rep(a,5,['glwll','glkll','gllwl']));
 /* 4 GREED : ذهب */
 S.e4g=sk({y:'#ffd23d',l:'#fff2a0',k:'#4a2a06',m:'#8a5a10'},['..yyyy','.yyyyy','yyllyy','yyyyyy','yykyyy','yyyyyy','yyymmm','.yyyyy','..yyyy','..kk.k','.kk..k'],a=>bot(a,['...kk.','..kk.k']));
 S.e4a=sk({y:'#ffd23d',l:'#fff2a0',w:'#fffbe0',k:'#4a2a06'},['..yyy','.yyyy','wyyll','wwyyy','wwyky','wyyyy','.yyyy','..yyy','...yy','....y'],a=>rep(a,2,['.yyll','wwyyy','.wyky']));
 /* 5 INJUSTICE : قضاة وميزان */
 S.e5g=sk({w:'#d8d8e0',s:'#a8a8b4',g:'#ff4040',k:'#1a1a22'},['..wwww','.wwwww','.wssss','.wsgss','.wssss','..ssss','.kkkkk','kkkkkk','kkkkkk','.kk..k'],a=>bot(a,['..kk.k']));
 S.e5a=sk({r:'#ff4040',y:'#cfd3ff'},['....r','yyyyy','y....','y....','y....','yyy..','.yy..']);
 /* 6 ANGER : نار */
 S.e6g=sk({a:'#ff4a10',o:'#ffb030',k:'#3a0808',m:'#601010'},['..a.aa','.aaaaa','aaoooo','aokooo','aooooo','aooomm','.aoooo','..aaoo','..aa.a','.a..a.'],a=>bot(a,['..a.aa','a..a..']));
 S.e6a=sk({a:'#ff4a10',o:'#ffb030',w:'#f0e8d8',k:'#2a0808',m:'#6a3a3a'},['..aaa','.aooo','aoooo','owwww','wkkww','wkkww','wwwkw','.wwmm','..wmw','...aa'],a=>rep(a,0,['.aaaa','aoooo','aooo.']));
 /* 7 LYING : مرايا */
 S.e7g=sk({l:'#8fd8ff',w:'#e8faff',k:'#16305a',m:'#5a9ad8'},['.....l','....ll','...lww','..lwww','.lwkww','.lwwww','llwmmm','lllwww','..kk.k','.kk..k'],a=>bot(a,['...kk.','..kk.k']));
 S.e7a=sk({l:'#8fd8ff',w:'#e0f4ff',k:'#16305a',m:'#5a9ad8'},['..lll','.lwww','lwwww','lwkww','lwwww','lwmmm','lwwww','lwwww','l.ww.','..l.l'],a=>bot(a,['.lw.w','l...l']));
 /* 8 ENVY : عيون */
 S.e8g=sk({g:'#2aaf4a',w:'#e8ffe0',k:'#0a2a14',m:'#0a2a14'},['..gggg','.ggggg','ggwkgg','gggggg','gwkggg','gggmmm','.ggggg','..gggg','.gg..g','gg....'],a=>bot(a,['..gg.g','.gg..g']));
 S.e8a=sk({g:'#2aaf4a',w:'#f0fff0',k:'#0a2a14',v:'#d8ff6a'},['..ggg','.gwww','gwwww','gwwkk','gwwkv','gwwkk','gwwww','.gwww','..ggg','.g.g.'],a=>bot(a,['g.g.g']));
 /* 9 PRIDE : تيجان */
 S.e9g=sk({y:'#ffd23d',s:'#e0c8f0',k:'#2a1a48',m:'#5a2a88',w:'#c8a0ff'},['.y.y.y','.yyyyy','..ssss','..skss','..ssss','.mmmmm','mmmmmm','mmwmmm','.mmmmm','.mm..m','mm....'],a=>bot(a,['..mm.m','.mm..m']));
 S.e9a=sk({y:'#ffd23d',v:'#ff4a6a',k:'#2a1a48'},['y.y.y','yyyyy','yyvyy','yykyy','.yyyy','..yyy'],a=>rep(a,0,['.y.y.']));
 /* 10 TRUTH : أرواح وريش */
 S.e10g=sk({a:'#ffd23d',w:'#ffffff',k:'#5a4a88',m:'#ffb0d0'},['..aaaa','.wwwww','wwwwww','wwkwww','wwwwww','wwwwwm','.wwwww','.wwwww','.w.ww.','.w..w.'],a=>bot(a,['.ww.w.','w..w..']));
 S.e10a=sk({w:'#ffffff',k:'#8a7ab8',a:'#ffd23d'},['....w','...ww','..www','.wwkw','.wwww','..www','...ww','....w','....a','....a'],a=>rep(a,3,['.wkww']));

 /* ---------- البوسات (16x16 ، تتناظر تلقائياً) ---------- */
 const B=[
  /* 0 WRAITH — الخوف */
  {pal:{k:'#0a0818',m:'#1c1838',g:'#4aa3ff'},h:['.....kkk','...kkkkk','..kkkkkk','..kkmmmm','..kmmmgg','..kmmmmm','..kkmmmm','.kkkkmmm','.kkkkkkm','kkkkkkkk','kkkkkkkk','kkkmkkkm','kkkkkkkk','kk.kkk.k','k..kk..k','...k....']},
  /* 1 MASKED — الخيانة */
  {pal:{a:'#c070ff',w:'#e8e0f0',k:'#1a1030',m:'#2e1c50'},h:['...aaaaa','..aaaaaa','..wwwwww','.wwwkwww','.wwwwwww','.wwwwkkk','..wwwwww','..kkmmmm','.kkkmmmm','kkkkmmmm','kkkkkmmm','kkkkkkmm','kkkkkkkk','.kkk.kkk','.kkk.kkk','.aaa.aaa']},
  /* 2 HEART — الإغراء : قلب عملاق بجناح */
  {pal:{h:'#ff3a8a',a:'#ffc0e0',w:'#ffffff',k:'#2a0a2a',m:'#7a1040'},h:['..hhhh..','.hhhhhh.','hhhhhhhh','hhwkhhhh','hhhhhhhh','hhhhmmmm','ahhhhhhh','aahhhhhh','aaahhhhh','aaahhhhh','.aahhhhh','..ahhhhh','...hhhhh','....hhhh','.....hhh','......hh']},
  /* 3 BOTTLE — الزجاجة */
  {pal:{a:'#caa060',k:'#0d4a3a',l:'#6affc0',w:'#d8f8e0',g:'#0a2018',m:'#1a7a58'},h:['......aa','......kk','......kl','.....kkl','...kkkkl','..kkkkkl','.kkwwwww','.kkwwwww','.kkgwwww','.kkwwwww','.kkkkkkl','.kkkkkkl','.kmmmmml','.kkkkkkk','..kkkkkk','..kkkkkk']},
  /* 4 GOLEM — الطمع */
  {pal:{l:'#ffe27a',m:'#c8961a',k:'#6a4a0a',g:'#ff3030'},h:['...llllm','..lllmmm','..lgmmmm','..lmmmmm','..llmmmm','lllllmmm','lmmlmmmm','lmmlkmmm','ll..mmmm','...lmmmm','...lmmmm','...kmmmm','..kkkmmm','..kkk.kk','..kkk.kk','.kkkk.kk']},
  /*
