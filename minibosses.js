/* ===== WITHIN ME — minibosses.js (v6) : 22 ميني بوس فريد + أعداء ثالثين لكل عالم ===== */
const MB=(()=>{
 const mir=h=>h.map(r=>r+[...r].reverse().join(''));
 const H={
  /* ---------- 0 FEAR ---------- */
  m0a:['......kk','.....kkk','....kkkk','...kkmmm','...kmmmm','...kmgmm','...kmmmm','..kkkmmm','..kkkkmm','.k.kkkkm','k..kmkkk','k..kkkkk','.k.kkkkk','..k.kkk.','..k..kk.','.k...k..'],
  m0b:['..kkkkkk','.kkllllk','.kllmmmm','.klmgmmm','.kllmmmm','..kkmmmm','kkkkkkmm','kllkkkmm','klllkaam','kllkkaam','kkkkkmmm','.kkkkmmm','..kkmmmm','..kkk.kk','.kkkk.kk','kkkkk.kk'],
  /* ---------- 1 BETRAYAL ---------- */
  m1a:['l......l','.l....kk','..l..kkk','...lkkww','...kwwww','...kwgww','...kwwwk','....kkkk','..llkmmm','.l.kkmmm','l..kkmmm','...kkmmm','...kkkmm','...kk.kk','...kk.kk','..kkk.kk'],
  m1b:['.......k','......kk','.....kkk','....kkkk','..kkkkkk','..kwwkww','..kwgkgw','..kwwkww','..kkkkkk','.kkkmmmm','kkkkmmmm','kkkkmmaa','kkkkmmmm','.kkkkmmm','..kkkkkm','...kkkkk'],
  /* ---------- 2 TEMPTATION ---------- */
  m2a:['....a.aa','...aaaaa','...aalaa','....kwww','....kwgw','....kwww','a..kkmmm','aa.kmmmm','aaakmmmm','aaakkmmm','.aakkmmm','..akkmmm','...kmmmm','...kkmmm','....kmmm','.....kmm'],
  m2b:['ll....ll','.ll...kk','.lkkkkkk','..kkkkkk','..kggkkk','..kkkkkk','..kkwwkk','..kkkkkk','.kkmmmmm','kkkmmmmm','kkkmmmmm','kkkkmmmm','kkkkkkkk','kk.kkkkk','kk.kk.kk','ll.ll.ll'],
  /* ---------- 3 ALCOHOL ---------- */
  m3a:['...aaaaa','..aaaaaa','...kkkkk','..kmgmmm','..kmmmmm','..kkmwwm','.kkkkkkk','kkllllll','kkmmmmmm','kkmmmmmm','kkllllll','kkmmmmmm','kkmmmmmm','kkllllll','.kkkkkkk','..kk.kkk'],
  m3b:['......kk','.....kkk','....kkmm','...kmmmm','..kmwwww','..kmwggg','..kmwggk','..kmwwww','..kkmmmm','.kkkmmmm','.kkmaamm','.kkmaamm','.kkkmmmm','..kkkkmm','..kkkkkk','...kkkkk'],
  /* ---------- 4 GREED ---------- */
  m4a:['..kkkkkk','k.kllllk','kkklgmmm','.kkllmmm','..kkmwww','..kkkkkk','.kkllllm','kkllaalm','kkllaalm','kkllllmm','kkkkkkmm','.kkkkkmm','.kk.kkkk','.kk.kkkk','kkk.kkkk','kkk.kkkk'],
  m4b:['...kkkkk','..kllllk','..klmmmm','..klggmm','..kkkkkk','.kkllllk','kklllaal','kllaaall','kllaakkl','kllaaall','kklllaal','.kkllllk','..kkkkkk','..kkk.kk','..kkk.kk','.kkkk.kk'],
  /* ---------- 5 INJUSTICE ---------- */
  m5a:['..kkkkkk','.kaaaaaa','.kkkkkkk','..kmmmmm','..kmgmmm','..kmmmmm','..kkkkkk','.kllkkmm','kllkkkmm','k.lkkkmm','k.lkkkmm','..lkkkmm','..kkkkmm','..kkk.kk','..kkk.kk','.kkkk.kk'],
  m5b:['.....aaa','..a.a..a','..a.a..a','..lllllw','..lwwwww','..lwgwww','..lwwwww','...kkmmm','..kkkmmm','..kkkkmm','.kkkkkmm','.kkkkkkm','..kkkkkk','..a.kkkk','..a..kkk','..a...kk'],
  /* ---------- 6 ANGER ---------- */
  m6a:['a.a.a...','aaaaaa..','.aaaaakk','.aakkkkk','..kkgkkk','..kkkkkk','..kwkwkk','..kkkkkk','.kkmmmmm','kkkmmmmm','kkkmmaam','kkkmmmmm','kk.kkkkk','kk.kk.kk','kk.kk.kk','aa.aa.aa'],
  m6b:['....kkkk','...kkkkk','..kkgkkk','..kkkkkk','..kkwkwk','..kk.k.k','...kkkkk','..kkaakk','.kkkaaak','.kkkkkkk','..kkaakk','.kkkaakk','.kkkkkkk','..kkaakk','.kkkkkkk','kkkkkkkk'],
  /* ---------- 7 LYING ---------- */
  m7a:['...l..ll','..ll.lll','.llllwww','.llwwwww','.lwwgwww','.llwwwww','..llwwww','...llwww','.l..llww','ll...lll','l.....ll','......l.','.....l..','.l......','ll......','l.......'],
  m7b:['...lllll','..llmmmm','.llmwwww','.lmwwwww','.lmwwggg','.lmwwgkk','.lmwwggg','.lmwwwww','.llmwwww','..llmmmm','...lllll','...kkmmm','..kkkmmm','..kkk.kk','..kkk.kk','.kkkk.kk'],
  /* ---------- 8 ENVY ---------- */
  m8a:['...kkkkk','..kmmmmm','.kmwwwww','.kwwwwww','kmwwgggg','kmwwgkkk','kmwwgggg','.kwwwwww','.kmwwwww','..kmmmmm','k.kkkkkk','.k.kk.kk','k..k..k.','.k.k.k..','k..k..k.','...k...k'],
  m8b:['.a.a.a.a','.aaaaaaa','..kwwwww','..kwgwww','..kwwwww','..kkmmmm','a.kkmmmm','a.kmmmmm','.akmmmmm','.aakmmmm','aakkmmmm','a.kkkmmm','.akkkmmm','aakkkkmm','a.kkkkkm','..kkkkkk'],
  /* ---------- 9 PRIDE ---------- */
  m9a:['..a.a.a.','..aaaaaa','..kllllk','.kklgmmm','.kllllmm','..kkmmmm','kkkkkkmm','klllkkmm','klllkkmm','kllkkkmm','kkkkkmmm','.kkkkmmm','..kkmmmm','..kkk.kk','.kkkk.kk','kkkkk.kk'],
  m9b:['...aaaaa','..a.....','..a.kkkk','..a.kwww','...kwwgw','...kwwww','....kwww','..kkkmmm','.kkkkmmm','lkkkkmmm','l.kkkmmm','l.kkkkmm','l..kkkmm','l..kkkkm','l..kkkkk','l...kkkk'],
  /* ---------- 10 TRUTH ---------- */
  m10a:['..l.l.l.','.lllllll','.lwwwwww','..lkwwww','..lwwwww','..lwwwww','.lwwwwww','lwwmwwww','lwwmwwww','lwwwwwww','.lwwwwww','.l.wwwww','..l.www.','..l..ww.','...l..w.','....l..w'],
  m10b:['..aaaaaa','..a.....','..a.kkkk','..a.klll','...klgll','...klwww','..kkkwww','.kllkmmm','kllkkmmm','kllkkmmm','kkkkkmmm','.kllkmmm','..kkkkkk','..kkk.kk','..kkk.kk','.kkkk.kk'],

  /* ---------- أعداء ثالثين (يقفزون/يندفعون) لكل عالم : 12x9 ---------- */
  e0h:['.k...k','..kkkk','.kkggk','.kkkkk','k.kkkk','.k.kmk','k.kkkk','..k..k','.k...k'],
  e1h:['l....l','.l..l.','..aaaa','.awwww','.wkwww','.wwwww','..mmmm','.mm..m','mm...m'],
  e2h:['.mmm..','mmmmm.','mmmmmm','mwkmmm','mmmmmm','.mmmmm','..mmmm','..kk.k','.kk..k'],
  e3h:['.wlwlw','wwwwww','.mmmmm','.mgmmm','.mmmmm','.mmmmm','.mmmmm','..kk.k','.kk..k'],
  e4h:['.lllll','lmmmmm','lwkwkw','lmmmmm','lmaamm','lmmmmm','llllll','.kk..k','kk...k'],
  e5h:['.kkkkk','kkllll','kkllgl','.kkkkk','...kkk','...kmm','...kmm','..kk.k','.kk..k'],
  e6h:['a....a','aa..aa','.akkkk','.akgkk','..kkkk','.kwkwk','.kmmmm','..kk.k','.kk..k'],
  e7h:['l....l','.l..l.','..llll','.lwwww','lwwgww','.lwwww','..llll','.l.l.l','l..l..'],
  e8h:['.a.a.a','aaaaaa','agaaga','aaaaaa','amaama','.aaaaa','..kk.k','.kk..k','kk...k'],
  e9h:['.a.a.a','.aaaaa','..llll','..lgll','..llll','.mmmmm','mmmmmm','.mm.mm','.kk.kk'],
  e10h:['..aaaa','.a....','..wwww','..wkww','..wwww','wwwwww','.wwwww','..ww.w','.ww..w']
 };
 const spr={};for(const k in H)spr[k]=mir(H[k]);
 const cache=new Map();
 function draw(c,key,x,y,o={}){
  const f=spr[key];if(!f)return;
  const sc=o.scale||3,pal=o.pal||{},ck=key+'|'+sc+'|'+JSON.stringify(pal);
  let b=cache.get(ck);
  if(!b){
   const w=f[0].length,h=f.length;
   b=document.createElement('canvas');b.width=w*sc;b.height=h*sc;const g=b.getContext('2d');
   for(let j=0;j<h;j++)for(let i=0;i<w;i++){const ch=f[j][i];if(ch==='.'||!pal[ch])continue;g.fillStyle=pal[ch];g.fillRect(i*sc,j*sc,sc,sc)}
   cache.set(ck,b);
  }
  const pa=c.globalAlpha;if(o.alpha!=null)c.globalAlpha=pa*o.alpha;
  c.drawImage(b,Math.round(x),Math.round(y));c.globalAlpha=pa;
 }
 return{draw,has:k=>!!spr[k]};
})();

/* ---- حركات الأنماط ---- */
const MINI_ARCH={
 brute:  {fly:false,spd:20,w:40,h:46,m:[['slam','orbs'],['slam','charge','rain'],['slam','charge','erupt','summon']]},
 phantom:{fly:true, spd:28,w:30,h:40,m:[['teleport','orbs'],['teleport','spread','homing'],['teleport','ring','homing','volley']]},
 knight: {fly:false,spd:30,w:34,h:46,m:[['charge','volley'],['stab','charge','volley'],['stab','charge','ring','volley']]},
 beast:  {fly:false,spd:34,w:40,h:42,m:[['charge','bounce'],['charge','slam','bounce'],['charge','slam','spread','bounce']]},
 mage:   {fly:true, spd:26,w:32,h:46,m:[['orbs','beam'],['homing','beam','spread'],['homing','beam','ring','sweep']]},
 queen:  {fly:true, spd:24,w:36,h:44,m:[['summon','orbs'],['summon','spread','rain'],['summon','ring','rain','homing']]},
 worm:   {fly:false,spd:18,w:34,h:46,m:[['erupt','orbs'],['erupt','spread','erupt'],['erupt','sweep','ring']]},
 cyclops:{fly:false,spd:22,w:40,h:46,m:[['sweep','beam'],['sweep','beam','rain'],['sweep','beam','ring','erupt']]}
};
/* لكل عالم: [ميني بوس أسهل ، أقوى] + حركة مميزة (sig) تنضاف للمرحلتين 2 و3 */
const MINI=[
 [{name:'The Whisperer',arch:'phantom',sig:'darkness'},{name:'Hollow Keeper',arch:'brute',sig:'erupt'}],
 [{name:'Hollow Duelist',arch:'knight',sig:'volley'},{name:'Three-Faced Mage',arch:'mage',sig:'confuse'}],
 [{name:'Rose Siren',arch:'queen',sig:'pull'},{name:'Velvet Beast',arch:'beast',sig:'spread'}],
 [{name:'Cork Brute',arch:'brute',sig:'confuse'},{name:'Drunken Cyclops',arch:'cyclops',sig:'bounce'}],
 [{name:'Coin Hoarder',arch:'beast',sig:'rain'},{name:'Vault Knight',arch:'knight',sig:'beam'}],
 [{name:'The Bailiff',arch:'knight',sig:'sweep'},{name:'Hanging Judge',arch:'mage',sig:'beam'}],
 [{name:'Ember Beast',arch:'beast',sig:'erupt'},{name:'Magma Worm',arch:'worm',sig:'rain'}],
 [{name:'Shard Phantom',arch:'phantom',sig:'ring'},{name:'Mirror Cyclops',arch:'cyclops',sig:'volley'}],
 [{name:'The Green Eye',arch:'cyclops',sig:'nodash'},{name:'Thorn Queen',arch:'queen',sig:'erupt'}],
 [{name:'Crowned Brute',arch:'brute',sig:'beam'},{name:'Marble Mage',arch:'mage',sig:'sweep'}],
 [{name:'Echo of Doubt',arch:'phantom',sig:'confuse'},{name:'Echo of Pride',arch:'knight',sig:'ring'}]
];
const MPAL={};
function miniPal(a){
 if(MPAL[a])return MPAL[a];
 const A=AREAS[a],m=BG.mix;
 return MPAL[a]={k:m(A.mid,'#000000',.35),m:m(A.far,'#ffffff',.28),l:m(A.accent,'#ffffff',.55),a:A.accent,g:m(A.accent,'#ffffff',.85),w:'#e8ecff'};
}
function miniDef(a,tier){
 const m=MINI[a][tier],ar=MINI_ARCH[m.arch],sg=m.sig?[m.sig]:[];
 return{name:m.name,arch:m.arch,spr:'m'+a+(tier?'b':'a'),pal:miniPal(a),fly:ar.fly,spd:ar.spd*(1+a*.02),
  hp:Math.round((tier?15+a*2.4:9+a*1.6)*(1+HARD*.5)),
  m:[ar.m[0],ar.m[1].concat(sg),ar.m[2].concat(sg)],w:ar.w,h:ar.h,mini:true,tier};
}
