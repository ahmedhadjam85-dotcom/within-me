/* ===== WITHIN ME — screens.js (v8) =====
   اسم المطوّر + قصة + ذكريات الفصول + ظهور البوسات + مشاهد لارا + الصحوة + الكريدت + الخريطة */
const Screens=(()=>{
 const AUTHOR='Ahmed Hadjam';             // ← غيّر الاسم من هنا
 const E=id=>document.getElementById(id);
 const sh=(id,v)=>E(id).classList[v?'remove':'add']('hidden');
 const ROMAN=['I','II','III','IV','V','VI','VII','VIII','IX','X'];

 /* ---------- خريطة كل عالم ---------- */
 const MAPS=[
  {hub:[50,60],w1:[18,26],w2:[82,26],w3:[50,10],sec:[90,80],boss:[50,92]},
  {hub:[28,52],w1:[55,18],w2:[82,48],w3:[60,86],sec:[8,88],boss:[94,88]},
  {hub:[50,50],w1:[22,16],w2:[78,16],w3:[22,84],sec:[78,84],boss:[50,94]},
  {hub:[24,50],w1:[50,20],w2:[50,80],w3:[78,50],sec:[92,10],boss:[92,90]},
  {hub:[50,24],w1:[14,56],w2:[86,56],w3:[50,62],sec:[50,94],boss:[50,4]},
  {hub:[14,50],w1:[38,18],w2:[38,82],w3:[66,50],sec:[90,16],boss:[92,84]},
  {hub:[50,80],w1:[14,58],w2:[86,58],w3:[50,36],sec:[50,8],boss:[50,96]},
  {hub:[50,50],w1:[24,24],w2:[76,76],w3:[76,24],sec:[24,76],boss:[50,92]},
  {hub:[18,72],w1:[40,34],w2:[64,62],w3:[86,24],sec:[10,12],boss:[92,86]},
  {hub:[50,76],w1:[24,50],w2:[76,50],w3:[50,28],sec:[50,6],boss:[50,94]},
  {hub:[50,50],w1:[22,50],w2:[78,50],w3:[50,22],sec:[50,80],boss:[50,94]}
 ];

 /* ---------- القصة الافتتاحية ---------- */
 const INTRO=[
  {sc:'room',  who:'narr',   en:'This is Alexander. He is forty years old.',ar:'هذا ألكسندر. عمره أربعون سنة.'},
  {sc:'room',  who:'narr',   en:'He was not a good man.',ar:'لم يكن رجلاً صالحاً.'},
  {sc:'bottle',who:'narr',   en:'Every night he drank, to forget what he had done.',ar:'كان يشرب كل ليلة، لينسى ما فعله.'},
  {sc:'door',  who:'narr',   en:'He lied to the people who loved him. And he hurt them.',ar:'كذب على من أحبّوه. وجرحهم.'},
  {sc:'chair', who:'narr',   en:'One by one, they stopped waiting for him.',ar:'واحداً بعد الآخر، توقفوا عن انتظاره.'},
  {sc:'room',  who:'thought',en:'Tomorrow... tomorrow I will fix everything.',ar:'غداً... غداً سأُصلح كل شيء.'},
  {sc:'room',  who:'narr',   en:'But tonight he was tired of himself. He closed his eyes and fell asleep.',ar:'لكنه الليلة تعب من نفسه. أغمض عينيه ونام.'},
  {sc:'sleep', who:'narr',   en:'And then, the world changed.',ar:'ثم تغيّر العالم.',flash:1},
  {sc:'dream', who:'narr',   en:'He woke up inside his own mind.',ar:'استيقظ داخل عقله.'},
  {sc:'dream', who:'narr',   en:'Ten sins. Ten guardians. Everything he never dared to face.',ar:'عشر خطايا. عشرة حرّاس. كل ما لم يجرؤ على مواجهته.'},
  {sc:'dream', who:'lara',   en:'Walk, Alexander. Face every part of yourself. Only then can you wake up.',ar:'امشِ يا ألكسندر. واجه كل جزء من نفسك. عندها فقط تستطيع أن تستيقظ.'},
  {sc:'dream', who:'narr',   en:'There is no map. No guide. Wander, get lost, and find your own way to the guardian of each sin.',ar:'لا خريطة. لا دليل. تجوّل، وتُه، واعثر على طريقك بنفسك إلى حارس كل خطيئة.'}
 ];

 /* ---------- ذكريات الفصول (ترجمة) ---------- */
 const AR_MEM=[
  'طفل اختبأ تحت البطانية. لم يخبره أحد أن الظلام فارغ.',
  'رسالة لم يُردّ عليها. كان الحبر لا يزال رطباً حين توقف عن الكتابة.',
  'باب تُرك مفتوحاً عمداً. أقنع نفسه أنه لم يره.',
  'كأس مرفوع في مطبخ هادئ. كان أحدهم غائباً عن الكرسي.',
  'كل شيء عُدّ مرتين. ولم يكن أي شيء كافياً ليُمسَك.',
  'حكم على نفسه أولاً، وأقسى حكم. والحكم كان دائماً: مذنب.',
  'باب صُفق. واعتذار تدرّب عليه سنوات ولم يُقَل.',
  'تدرّب على ابتسامته حتى نسي أيها الحقيقية.',
  'نافذة في الشارع المقابل. حياة ظنّها حياته.',
  'تاج مصنوع من كل اعتذار ابتلعه.',
  'لارا لم تكن عدوّته. إنها الصوت الذي بقي.'
 ];
 /* ---------- لقطة بداية الفصل ---------- */
 const CH_IN=[
  {en:'The first door. Alexander was always afraid: of tomorrow, of people, of himself.',ar:'الباب الأول. كان ألكسندر خائفاً دائماً: من الغد، ومن الناس، ومن نفسه.'},
  {en:'He broke promises, and he was betrayed too. Now he must remember both sides.',ar:'كسر وعوداً، وخانه الآخرون أيضاً. عليه الآن أن يتذكر الجانبين.'},
  {en:'Pretty things that hurt. He always said yes to them.',ar:'أشياء جميلة تؤذي. كان يقول لها نعم دائماً.'},
  {en:'The bottle never asked questions. That is why he loved it.',ar:'الزجاجة لا تسأل أي سؤال. لهذا أحبّها.'},
  {en:'More money. More things. And still empty inside.',ar:'مزيد من المال. مزيد من الأشياء. وما زال فارغاً من الداخل.'},
  {en:'He judged everyone. And he judged himself even harder.',ar:'حكم على الجميع. وحكم على نفسه بقسوة أكبر.'},
  {en:'A fire he could not control. It burned the people closest to him.',ar:'نار لم يستطع السيطرة عليها. أحرقت أقرب الناس إليه.'},
  {en:'Every lie was easy to tell. Living with them was not.',ar:'كل كذبة كانت سهلة. لكن العيش معها لم يكن كذلك.'},
  {en:'He watched other lives and forgot to live his own.',ar:'راقب حياة الآخرين ونسي أن يعيش حياته.'},
  {en:'He could not say the words: I was wrong.',ar:'لم يستطع أن يقول: لقد كنتُ مخطئاً.'},
  {en:'The last door. Lara is waiting.',ar:'الباب الأخير. لارا تنتظر.'}
 ];
 /* ---------- ظهور البوس ---------- */
 const BOSS_EN=[
  'The Fear: it has watched him sleep for forty years.',
  'The Betrayal: every promise he broke, wearing a smile.',
  'The Temptation: everything he could never refuse.',
  'The Bottle: his oldest, quietest friend.',
  'The Greed: a hunger that was never about gold.',
  'The Judge: the voice that always said guilty.',
  'The Rage: the fire he kept behind his teeth.',
  'The Liar: the face he wore for everyone.',
  'The Envy: a hundred eyes, all looking elsewhere.',
  'The Self: everything he wanted to be, and could not forgive.',
  'Lara: the last guardian. The one who stayed.'
 ];
 const BOSS_AR=[
  'الخوف: يراقبه وهو نائم منذ أربعين سنة.',
  'الخيانة: كل وعد كسره، يرتدي ابتسامة.',
  'الإغراء: كل ما لم يستطع رفضه.',
  'الزجاجة: صديقه الأقدم والأكثر صمتاً.',
  'الطمع: جوع لم يكن يوماً عن الذهب.',
  'القاضي: الصوت الذي قال دائماً: مذنب.',
  'الغضب: النار التي أخفاها خلف أسنانه.',
  'الكاذب: الوجه الذي ارتداه للجميع.',
  'الحسد: مئة عين، كلها تنظر إلى مكان آخر.',
  'الذات: كل ما أراد أن يكونه، ولم يستطع أن يسامحه.',
  'لارا: الحارسة الأخيرة. التي بقيت.'
 ];
 /* ---------- لقطة نهاية الفصل ---------- */
 const CH_OUT=[
  {en:'Fear lets go. Alexander breathes for the first time in years.',ar:'الخوف يتركه. يتنفس ألكسندر لأول مرة منذ سنوات.'},
  {en:'Betrayal is forgiven. Not forgotten. Forgiven.',ar:'الخيانة مغفورة. ليست منسية. مغفورة.'},
  {en:'He walked away from what was hurting him.',ar:'ابتعد عمّا كان يؤذيه.'},
  {en:'The bottle is empty. Alexander is not.',ar:'الزجاجة فارغة. أما ألكسندر فلا.'},
  {en:'He opens his hands. They feel lighter.',ar:'يفتح يديه. تبدوان أخفّ.'},
  {en:'He puts the scales down. Mercy is allowed.',ar:'يضع الميزان جانباً. الرحمة مسموحة.'},
  {en:'The fire becomes a small, warm light.',ar:'تتحول النار إلى ضوء صغير دافئ.'},
  {en:'He says the truth out loud. It does not break him.',ar:'يقول الحقيقة بصوت عالٍ. ولا تكسره.'},
  {en:'He looks at his own life. It is enough.',ar:'ينظر إلى حياته. إنها كافية.'},
  {en:'He lowers the crown and says: I was wrong.',ar:'ينزع التاج ويقول: كنتُ مخطئاً.'}
 ];
 /* ---------- مشاهد المقعد (لارا وألكسندر) ---------- */
 const INTER={
  3:[
   {sc:'bench',who:'lara',en:'You are walking faster than before.',ar:'تمشي أسرع من السابق.'},
   {sc:'bench',who:'alex',en:'It hurts less. And it hurts more. I cannot tell.',ar:'يؤلم أقل. ويؤلم أكثر. لا أستطيع أن أميّز.'},
   {sc:'bench',who:'lara',en:'That is what it feels like when something starts to heal.',ar:'هكذا يكون الشعور حين يبدأ شيء ما بالالتئام.'}
  ],
  5:[
   {sc:'bench',who:'alex',en:'Who are you, Lara? Really?',ar:'من أنتِ يا لارا؟ حقاً؟'},
   {sc:'bench',who:'lara',en:'I am what you left behind when you stopped listening.',ar:'أنا ما تركتَه خلفك حين توقفت عن الإصغاء.'},
   {sc:'bench',who:'alex',en:'Then I am sorry.',ar:'إذن أنا آسف.'},
   {sc:'bench',who:'lara',en:'Not yet. Save it. Say it at the end.',ar:'ليس بعد. احتفظ بها. قلها في النهاية.'}
  ],
  8:[
   {sc:'bench',who:'lara',en:'Look at the stars, Alexander. Nobody owns them. Everyone may look.',ar:'انظر إلى النجوم يا ألكسندر. لا أحد يملكها. والجميع يحق له أن ينظر.'},
   {sc:'bench',who:'alex',en:'I never looked up before.',ar:'لم أنظر إلى الأعلى من قبل.'},
   {sc:'bench',who:'lara',en:'Neither did I. I was too busy watching you.',ar:'ولا أنا. كنت مشغولة بمراقبتك.'}
  ]
 };
 /* ---------- الصحوة الأخيرة ---------- */
 const FINALE=[
  {sc:'truth',who:'lara',   en:'Wake up now, Alexander.',ar:'استيقظ الآن يا ألكسندر.',flash:1},
  {sc:'dawn', who:'narr',   en:'Morning. A real one.',ar:'صباح. صباح حقيقي.'},
  {sc:'dawn', who:'narr',   en:'He woke up in his own room. The dream was gone. The memories were not.',ar:'استيقظ في غرفته. الحلم رحل. لكن الذكريات بقيت.'},
  {sc:'dawn', who:'thought',en:'I know what I have to do.',ar:'أعرف ما يجب أن أفعله.'},
  {sc:'dawn', who:'narr',   en:'He did not touch the bottle. He picked up the phone, and called the first person he had hurt.',ar:'لم يلمس الزجاجة. أمسك الهاتف، واتصل بأول شخص جرحه.'},
  {sc:'dawn', who:'narr',   en:'Some doors take years to open. But he knocked.',ar:'بعض الأبواب تحتاج سنوات لتنفتح. لكنه طرق الباب.'},
  {sc:'dawn', who:'lara',   en:'Thank you for staying.',ar:'شكراً لأنك بقيت.'}
 ];

 let kind=null,t=0,done=null,beats=null,bi=0,n=0,lastN=0,flash=0,tapped=false,wait=0,endCard=false;

 /* ---------- أدوات الرسم ---------- */
 const rr=(x,y,w,h,r)=>{c.beginPath();c.moveTo(x+r,y);c.arcTo(x+w,y,x+w,y+h,r);c.arcTo(x+w,y+h,x,y+h,r);c.arcTo(x,y+h,x,y,r);c.arcTo(x,y,x+w,y,r);c.closePath()};
 const vign=a=>{const g=c.createRadialGradient(160,90,60,160,90,210);g.addColorStop(0,'rgba(0,0,0,0)');g.addColorStop(1,'rgba(0,0,0,'+a+')');c.fillStyle=g;c.fillRect(0,0,W,H)};
 const grad=(a,b)=>{const g=c.createLinearGradient(0,0,0,H);g.addColorStop(0,a);g.addColorStop(1,b);c.fillStyle=g;c.fillRect(0,0,W,H)};
 const spr=(n,x,y,o)=>{try{Sprites.draw(c,n,x,y,o)}catch(e){}};
 function stars(a){c.fillStyle='#fff';for(let k=0;k<50;k++){c.globalAlpha=a*(.2+.6*Math.abs(Math.sin(t*(.5+k%4*.3)+k)));c.fillRect(((k*97+t*(2+k%5))%W)|0,((k*53)%H)|0,1,1)}c.globalAlpha=1}

 /* ---------- مشاهد المقدمة ---------- */
 function sceneRoom(tt){
  grad('#0a0c1c','#1a1430');
  c.fillStyle='#04050e';c.fillRect(214,24,58,66);
  c.fillStyle='#6a86d8';c.globalAlpha=.22;c.fillRect(214,24,58,66);c.globalAlpha=1;
  c.fillStyle='#e8ecff';c.beginPath();c.arc(246,50,9,0,7);c.fill();
  c.fillStyle='#0a0c1c';c.fillRect(241,24,4,66);c.fillRect(214,56,58,4);
  c.fillStyle='#fff';for(let k=0;k<6;k++){c.globalAlpha=.4+.4*Math.sin(tt*2+k);c.fillRect(218+k*9,30+(k*13)%24,1,1)}c.globalAlpha=1;
  c.fillStyle='#8aa6ff';c.globalAlpha=.07;c.beginPath();c.moveTo(214,90);c.lineTo(272,90);c.lineTo(250,150);c.lineTo(160,150);c.fill();c.globalAlpha=1;
  c.fillStyle='#120e22';c.fillRect(0,140,W,40);c.fillStyle='#1c1634';c.fillRect(0,140,W,1);
  c.fillStyle='#2a1c18';c.fillRect(34,124,156,10);c.fillRect(34,100,6,42);c.fillRect(184,114,6,28);
  c.fillStyle='#c8c8e0';c.fillRect(40,114,144,10);
  c.fillStyle='#e8ecff';rr(46,106,34,10,4);c.fill();
  c.save();c.translate(64,114);c.rotate(-Math.PI/2);spr('alex',0,0,{scale:2,fr:'idle'});c.restore();
  c.fillStyle='#34397a';c.beginPath();c.moveTo(86,114);
  for(let x=86;x<=182;x+=4)c.lineTo(x,98+Math.sin(x*.12+tt)*1.5);
  c.lineTo(182,124);c.lineTo(86,124);c.closePath();c.fill();
  c.fillStyle='#22265a';c.fillRect(86,116,96,8);
  for(let k=0;k<3;k++){const a=(tt*.6+k*.33)%1;c.globalAlpha=Math.sin(a*3.14);c.fillStyle='#cfd8ff';c.font=(8+k*3)+'px monospace';c.textAlign='left';c.fillText('z',70+a*26+k*5,92-a*30)}
  c.globalAlpha=1;
 }
 function sceneBottle(tt){
  grad('#1a1208','#2a1c10');
  const fl=.8+.2*Math.sin(tt*9);
  c.fillStyle='#ffb050';c.globalAlpha=.12*fl;c.beginPath();c.arc(230,60,74,0,7);c.fill();c.globalAlpha=.25*fl;c.beginPath();c.arc(230,60,22,0,7);c.fill();c.globalAlpha=1;
  c.fillStyle='#3a2a1a';c.fillRect(230,20,1,24);c.fillStyle='#ffd890';c.fillRect(226,44,9,8);
  c.fillStyle='#120c06';c.fillRect(0,140,W,40);
  spr('alex',130,84,{scale:2,fr:'idle'});
  c.fillStyle='#3a2410';c.fillRect(40,118,240,8);c.fillRect(52,126,6,26);c.fillRect(262,126,6,26);c.fillStyle='#5a3a1c';c.fillRect(40,118,240,2);
  for(let k=0;k<7;k++){
   const x=58+k*16+(k>3?50:0);
   c.fillStyle=k===6?'#1a5a3a':'#2a8a5a';
   if(k===6){c.save();c.translate(x+4,116);c.rotate(1.3);c.fillRect(-4,-9,8,18);c.fillRect(-2,-19,4,10);c.restore()}
   else{c.fillRect(x,100,8,18);c.fillRect(x+2,90,4,10);c.fillStyle='#7affc0';c.globalAlpha=.4;c.fillRect(x+1,102,2,12);c.globalAlpha=1}
  }
  c.fillStyle='#bfe8ff';c.globalAlpha=.7;c.fillRect(156,108,8,10);c.globalAlpha=1;
  vign(.65);
 }
 function sceneDoor(tt){
  c.fillStyle='#14101c';c.fillRect(0,0,W,H);
  c.fillStyle='#1c1628';for(let x=0;x<W;x+=24)c.fillRect(x,0,1,H);
  const ph=tt%3.2,closed=clamp((ph-1.2)/.25,0,1),sk=(ph>1.4&&ph<1.65)?Math.round(Math.sin(tt*70)*2):0;
  c.save();c.translate(sk,0);
  c.fillStyle='#0a0810';c.fillRect(104,34,112,112);
  c.fillStyle='#ffe4b0';c.globalAlpha=.85*(1-closed);c.fillRect(108,38,104,108);c.globalAlpha=1;
  if(closed<1){c.globalAlpha=.9*(1-closed);spr('lara',142,68,{scale:3,fr:'idle'});c.globalAlpha=1}
  c.fillStyle='#4a3020';c.fillRect(216-112*closed,34,112*closed,112);
  c.fillStyle='#2a1a10';c.fillRect(216-112*closed,34,3,112);
  c.fillStyle='#d8b060';if(closed>.9)c.fillRect(150,92,5,5);
  c.restore();
  c.fillStyle='#0c0a12';c.fillRect(0,146,W,34);
  spr('alex',48,108,{scale:2,fr:'idle',alpha:.85});
  if(ph>1.4&&ph<1.52){c.globalAlpha=.7;c.fillStyle='#fff';c.fillRect(0,0,W,H);c.globalAlpha=1}
  vign(.6);
 }
 function sceneChair(tt){
  grad('#1a1020','#2a1830');
  c.strokeStyle='#d8c8a0';c.lineWidth=2;c.beginPath();c.arc(160,42,16,0,7);c.stroke();
  const a=tt*.8;c.beginPath();c.moveTo(160,42);c.lineTo(160+Math.sin(a)*11,42-Math.cos(a)*11);c.moveTo(160,42);c.lineTo(160+Math.sin(a*12)*14,42-Math.cos(a*12)*14);c.stroke();
  c.lineWidth=1;
  c.fillStyle='#120c16';c.fillRect(0,140,W,40);
  for(const x of[70,130,190,250]){c.fillStyle='#2a1c2c';c.fillRect(x-9,96,18,40);c.fillRect(x-11,92,22,6)}
  c.fillStyle='#4a2a3a';c.fillRect(30,110,260,8);c.fillRect(40,118,6,30);c.fillRect(274,118,6,30);
  c.fillStyle='#6a3a4a';c.fillRect(30,110,260,2);
  for(const x of[70,130,190,250]){c.fillStyle='#e8e0f0';c.beginPath();c.ellipse(x,109,11,3,0,0,7);c.fill();c.fillStyle='#bfb8d0';c.beginPath();c.ellipse(x,109,6,1.5,0,0,7);c.fill()}
  for(const x of[100,220]){
   const f=.8+.2*Math.sin(tt*10+x);
   c.fillStyle='#e8d8b0';c.fillRect(x-2,98,4,12);
   c.fillStyle='#ff9a3a';c.beginPath();c.moveTo(x-2,98);c.lineTo(x,92-f*3);c.lineTo(x+2,98);c.fill();
   c.fillStyle='#ffb050';c.globalAlpha=.16*f;c.beginPath();c.arc(x,98,26,0,7);c.fill();c.globalAlpha=1;
  }
  vign(.6);
 }
 function sceneSleep(tt){
  grad('#05050f','#1a0a3a');
  for(let i=0;i<70;i++){
   const a=tt*1.4+i*.35,r=i*3.2+((tt*18)%3.2),x=160+Math.cos(a)*r,y=90+Math.sin(a)*r*.62;
   c.fillStyle=i%3?'#6a4aff':'#c070ff';c.globalAlpha=.7-i*.008;c.fillRect(x|0,y|0,2,2);
  }
  c.globalAlpha=1;
  c.save();c.translate(160,90);c.rotate(tt*.9);spr('alex',-12,-19,{scale:2,fr:'fall'});c.restore();
 }
 function sceneDream(tt){
  const A=AREAS[0];
  BG.draw(c,A,0,tt*9,tt);
  c.fillStyle=A.near;c.fillRect(0,152,W,28);c.fillRect(36,134,90,20);c.fillRect(52,126,56,10);
  c.fillStyle=A.accent;c.globalAlpha=.7;c.fillRect(52,126,56,1);c.fillRect(36,134,16,1);c.globalAlpha=1;
  c.fillStyle='#d84a5a';for(let k=1;k<=4;k++)c.fillRect(70-k*3,95+Math.sin(tt*3+k)*1.5+k,3,2);
  spr('alex',66,86,{scale:2,fr:'idle'});
  spr('lara',252,102,{scale:2,fr:'idle',flip:true,alpha:.55});
  c.fillStyle=A.near;c.globalAlpha=.8;c.fillRect(244,138,36,14);c.globalAlpha=1;
 }
 function sceneArea(i,tt){
  const A=AREAS[i];
  BG.draw(c,A,i,tt*26,tt);
  c.fillStyle=A.near;c.fillRect(0,150,W,30);c.fillStyle=A.accent;c.globalAlpha=.7;c.fillRect(0,150,W,1);c.globalAlpha=1;
  spr('alex',112,112,{scale:2,fr:Math.floor(tt*8)%2?'run0':'run1'});
  vign(.55);
 }
 function sceneDawn(tt){
  const g=c.createLinearGradient(0,0,0,H);g.addColorStop(0,'#ffb27a');g.addColorStop(.5,'#ffe2a8');g.addColorStop(1,'#fff3d8');c.fillStyle=g;c.fillRect(0,0,W,H);
  c.fillStyle='#8ad0ff';c.fillRect(198,22,76,74);
  const sy=96-Math.min(tt*5,34);
  c.save();c.beginPath();c.rect(198,22,76,74);c.clip();
  c.fillStyle='#ffd070';c.beginPath();c.arc(236,sy,14,0,7);c.fill();c.fillStyle='#ffe8a8';c.globalAlpha=.4;c.beginPath();c.arc(236,sy,24,0,7);c.fill();c.globalAlpha=1;
  c.fillStyle='#f4b080';c.fillRect(198,86,76,10);c.restore();
  c.fillStyle='#6a4a2a';c.fillRect(194,18,84,4);c.fillRect(194,96,84,4);c.fillRect(194,18,4,82);c.fillRect(274,18,4,82);c.fillRect(234,18,3,82);c.fillRect(198,58,76,3);
  c.fillStyle='#fff';c.globalAlpha=.13;c.beginPath();c.moveTo(198,96);c.lineTo(274,96);c.lineTo(190,150);c.lineTo(100,150);c.fill();c.globalAlpha=1;
  c.fillStyle='#b8845a';c.fillRect(0,140,W,40);c.fillStyle='#d8a070';c.fillRect(0,140,W,1);
  c.fillStyle='#6a4a2a';c.fillRect(30,120,150,10);c.fillRect(30,98,6,44);c.fillRect(174,114,6,28);
  c.fillStyle='#f4f4ff';c.fillRect(36,112,140,10);c.fillStyle='#8ab0ff';c.fillRect(110,112,66,10);
  spr('alex',70,78,{scale:2,fr:'idle'});
  c.fillStyle='#8a5a30';c.fillRect(186,114,28,28);
  c.fillStyle='#222';c.fillRect(194,108,12,6);c.fillStyle='#8ad0ff';c.globalAlpha=.6+.3*Math.sin(tt*5);c.fillRect(195,109,10,4);c.globalAlpha=1;
 }

 /* ---------- مشاهد الذكريات (11) ---------- */
 const FL=[
  /* 0 FEAR */ tt=>{
   grad('#03040c','#0a1030');
   c.fillStyle='#010208';c.globalAlpha=.92;c.beginPath();c.moveTo(190,150);c.lineTo(206,74+Math.sin(tt*2)*3);c.lineTo(224,46);c.lineTo(246,64);c.lineTo(268,38);c.lineTo(290,72);c.lineTo(300,150);c.fill();c.globalAlpha=1;
   c.fillStyle='#ff4a4a';c.globalAlpha=.6+.4*Math.sin(tt*5);c.fillRect(236,68,4,4);c.fillRect(256,68,4,4);c.globalAlpha=1;
   c.fillStyle='#0a0814';c.fillRect(0,142,W,38);
   c.fillStyle='#2a1c18';c.fillRect(20,122,130,8);c.fillRect(20,108,5,36);
   spr('alex',50,96,{scale:1,fr:'idle'});
   c.fillStyle='#34397a';c.beginPath();c.moveTo(30,122);c.quadraticCurveTo(80,82,146,122);c.fill();
   c.fillStyle='#ffe8a8';c.globalAlpha=.16;c.beginPath();c.moveTo(96,108);c.lineTo(214,62);c.lineTo(214,144);c.fill();c.globalAlpha=1;
   c.fillStyle='#fff';c.fillRect(94,106,4,4);vign(.55);
  },
  /* 1 BETRAYAL */ tt=>{
   grad('#0a0a18','#1a1432');
   c.fillStyle='#04050e';c.fillRect(190,22,90,80);
   c.strokeStyle='#8aa0ff';c.globalAlpha=.5;for(let k=0;k<26;k++){const x=192+((k*37+tt*60)%88),y=24+((k*53+tt*120)%76);c.beginPath();c.moveTo(x,y);c.lineTo(x-2,y+5);c.stroke()}c.globalAlpha=1;
   c.fillStyle='#3a2a20';c.fillRect(186,18,98,4);c.fillRect(186,100,98,4);c.fillRect(186,18,4,86);c.fillRect(280,18,4,86);c.fillRect(234,18,3,86);
   c.fillStyle='#0c0a14';c.fillRect(0,142,W,38);
   c.fillStyle='#3a2418';c.fillRect(30,116,150,7);c.fillRect(40,123,6,22);c.fillRect(164,123,6,22);
   c.fillStyle='#f4f0e0';c.fillRect(86,108,30,8);c.fillStyle='#8a8a9a';for(let k=0;k<3;k++)c.fillRect(90,110+k*2,22,1);
   const f=.8+.2*Math.sin(tt*9);c.fillStyle='#e8d8b0';c.fillRect(134,104,3,12);c.fillStyle='#ff9a3a';c.fillRect(134,100-f*2,3,4);
   c.fillStyle='#ffb050';c.globalAlpha=.14*f;c.beginPath();c.arc(135,102,28,0,7);c.fill();c.globalAlpha=1;
   spr('alex',46,92,{scale:2,fr:'idle'});
   c.fillStyle='#2a1c14';c.fillRect(204,112,22,4);c.fillRect(204,92,3,24);c.fillRect(204,116,3,26);c.fillRect(223,116,3,26);
   vign(.6);
  },
  /* 2 TEMPTATION */ tt=>{
   grad('#2a0830','#6a1a56');
   c.fillStyle='#14061a';c.fillRect(0,142,W,38);
   c.fillStyle='#ffb0d0';c.globalAlpha=.25+.1*Math.sin(tt*3);c.beginPath();c.moveTo(196,40);c.lineTo(240,40);c.lineTo(290,146);c.lineTo(180,146);c.fill();c.globalAlpha=1;
   c.fillStyle='#1a0a20';c.fillRect(196,30,50,116);
   c.fillStyle='#ffd0a0';c.fillRect(222,30,24,116);c.fillStyle='#ff7ac0';c.globalAlpha=.3;c.fillRect(222,30,24,116);c.globalAlpha=1;
   c.fillStyle='#1a0a20';c.fillRect(196,30,28,116);
   c.fillStyle='#0a040e';c.beginPath();c.ellipse(238,100,8,22,0,0,7);c.fill();
   for(let k=0;k<22;k++){const x=(k*47+tt*10)%W,y=((k*29+tt*22)%150);c.fillStyle='#ff7ac0';c.globalAlpha=.6;c.fillRect(x|0,y|0,2,2)}c.globalAlpha=1;
   spr('alex',90,104,{scale:2,fr:'idle'});vign(.5);
  },
  /* 3 ALCOHOL */ tt=>{
   grad('#101810','#1a2a1c');
   c.fillStyle='#0a100a';c.fillRect(0,142,W,38);
   c.fillStyle='#e8e0c0';c.beginPath();c.arc(260,44,16,0,7);c.fill();
   c.strokeStyle='#222';c.lineWidth=2;c.beginPath();c.arc(260,44,16,0,7);c.stroke();
   const a=tt*.6;c.beginPath();c.moveTo(260,44);c.lineTo(260+Math.sin(a)*10,44-Math.cos(a)*10);c.moveTo(260,44);c.lineTo(260+Math.sin(a*12)*13,44-Math.cos(a*12)*13);c.stroke();c.lineWidth=1;
   c.fillStyle='#3a2a1c';c.fillRect(60,112,160,7);c.fillRect(70,119,6,26);c.fillRect(204,119,6,26);
   spr('alex',92,78,{scale:2,fr:'idle'});
   c.fillStyle='#bfe8ff';c.globalAlpha=.7;c.fillRect(150,98,8,14);c.globalAlpha=1;c.fillStyle='#ffd070';c.fillRect(151,104,6,8);
   c.fillStyle='#2a8a5a';c.fillRect(176,96,9,16);c.fillRect(179,88,3,8);
   c.fillStyle='#2a1c14';c.fillRect(236,110,22,4);c.fillRect(236,90,3,24);c.fillRect(236,114,3,28);c.fillRect(255,114,3,28);
   vign(.55);
  },
  /* 4 GREED */ tt=>{
   grad('#1a1004','#3a2408');
   c.fillStyle='#120a02';c.fillRect(0,142,W,38);
   for(let k=0;k<80;k++){const x=150+((k*37)%150),h=((k*13)%14),y=142-h-((k*7)%12);c.fillStyle=k%3?'#ffd23d':'#fff2a0';c.fillRect(x,y,8,3);c.fillStyle='#8a5a10';c.fillRect(x,y+3,8,1)}
   for(let k=0;k<14;k++){const a=(tt*.9+k*.2)%1;c.fillStyle='#fff2a0';c.globalAlpha=Math.sin(a*3.14);c.fillRect(150+((k*57)%150),100-a*30,2,2)}c.globalAlpha=1;
   spr('alex',90,104,{scale:2,fr:Math.floor(tt*4)%2?'atk':'idle'});
   c.fillStyle='#ffd23d';c.globalAlpha=.12;c.beginPath();c.arc(225,120,70,0,7);c.fill();c.globalAlpha=1;
   vign(.55);
  },
  /* 5 INJUSTICE */ tt=>{
   grad('#0a0a0e','#2a2a34');
   c.fillStyle='#14141a';c.fillRect(0,142,W,38);
   c.fillStyle='#3a3a48';c.fillRect(90,60,140,60);c.fillStyle='#2a2a34';c.fillRect(90,60,140,5);
   c.fillStyle='#0a0a10';c.beginPath();c.arc(160,50,14,0,7);c.fill();c.fillRect(146,50,28,34);
   c.fillStyle='#d8d8e0';c.fillRect(152,36,16,8);
   c.fillStyle='#ff4040';c.globalAlpha=.7;c.fillRect(155,50,3,2);c.fillRect(162,50,3,2);c.globalAlpha=1;
   const sw=Math.sin(tt*1.4)*3;
   c.strokeStyle='#d0d0d8';c.lineWidth=2;c.beginPath();c.moveTo(270,40);c.lineTo(270,90);c.moveTo(250,52+sw);c.lineTo(290,52-sw);c.stroke();c.lineWidth=1;
   c.fillStyle='#d0d0d8';c.fillRect(246,52+sw,10,3);c.fillRect(284,50-sw,10,3);
   spr('alex',58,104,{scale:2,fr:'idle'});
   vign(.65);
  },
  /* 6 ANGER */ tt=>{
   grad('#2a0404','#8a1010');
   const fl=.7+.3*Math.sin(tt*12);
   c.fillStyle='#ff4a10';c.globalAlpha=.1*fl;c.fillRect(0,0,W,H);c.globalAlpha=1;
   c.fillStyle='#180404';c.fillRect(0,142,W,38);
   c.fillStyle='#3a1a10';c.fillRect(214,30,60,114);c.fillStyle='#1a0a06';c.fillRect(214,30,60,4);
   for(let k=0;k<16;k++){const a=k*.7+tt*6,r=((tt*40+k*13)%70);c.fillStyle='#f4f0e8';c.fillRect((130+Math.cos(a)*r)|0,(100+Math.sin(a)*r*.6)|0,3,2)}
   spr('alex',118,104,{scale:2,fr:'atk'});
   c.fillStyle='#ff4040';c.globalAlpha=.4*fl;c.beginPath();c.arc(136,116,34,0,7);c.fill();c.globalAlpha=1;
   vign(.6);
  },
  /* 7 LYING */ tt=>{
   grad('#04102a','#1a3a70');
   c.fillStyle='#0a1428';c.fillRect(0,142,W,38);
   c.fillStyle='#8fd8ff';c.fillRect(100,24,120,116);c.fillStyle='#0a1c38';c.fillRect(104,28,112,108);
   c.fillStyle='#8fd8ff';c.globalAlpha=.1;c.fillRect(104,28,112,108);c.globalAlpha=1;
   spr('alex',60,104,{scale:2,fr:'idle'});
   spr('alex',134,78,{scale:3,fr:'idle',flip:true,alpha:.55});
   c.strokeStyle='#fff';c.lineWidth=2;c.beginPath();c.arc(160,104,10,.15,3.0);c.stroke();c.lineWidth=1;
   c.fillStyle='#fff';c.globalAlpha=.15+.1*Math.sin(tt*3);c.fillRect(110,34,10,96);c.globalAlpha=1;
   vign(.5);
  },
  /* 8 ENVY */ tt=>{
   grad('#03120a','#0a2a14');
   c.fillStyle='#060e08';c.fillRect(0,142,W,38);
   c.fillStyle='#0a1a0e';c.fillRect(170,30,130,112);
   c.fillStyle='#ffd890';c.fillRect(196,50,36,30);c.fillRect(244,50,36,30);c.fillStyle='#ffb050';c.globalAlpha=.2;c.fillRect(190,44,100,42);c.globalAlpha=1;
   c.fillStyle='#1a1008';for(const x of[204,214,224,254,268]){c.beginPath();c.arc(x,66,4,0,7);c.fill();c.fillRect(x-4,70,8,10)}
   c.fillStyle='#2a1c10';c.fillRect(196,50,2,30);c.fillRect(214,50,2,30);c.fillRect(196,64,36,2);
   c.fillStyle='#3a3a30';c.fillRect(64,60,3,82);c.fillStyle='#ffe8a8';c.globalAlpha=.8;c.fillRect(60,56,11,5);c.globalAlpha=.1;c.beginPath();c.moveTo(60,61);c.lineTo(72,61);c.lineTo(100,142);c.lineTo(36,142);c.fill();c.globalAlpha=1;
   spr('alex',92,104,{scale:2,fr:'idle'});
   c.fillStyle='#6bff6b';c.globalAlpha=.4+.4*Math.sin(tt*3);c.fillRect(103,108,2,2);c.fillRect(110,108,2,2);c.globalAlpha=1;
   vign(.6);
  },
  /* 9 PRIDE */ tt=>{
   grad('#0e0626','#3a2a78');
   c.fillStyle='#0a0418';c.fillRect(0,150,W,30);
   for(let k=0;k<6;k++){c.fillStyle=k%2?'#2a1a58':'#34226a';c.fillRect(80+k*8,150-k*8,160-k*16,8)}
   c.fillStyle='#4a3a88';c.fillRect(140,64,40,38);c.fillRect(132,98,56,6);
   for(const x of[30,60,260,290]){c.fillStyle='#2a1a58';c.fillRect(x,40,10,110);c.fillRect(x-3,36,16,5)}
   const b=Math.sin(tt*2)*2;
   c.fillStyle='#ffd23d';c.globalAlpha=.25;c.beginPath();c.arc(160,36+b,22,0,7);c.fill();c.globalAlpha=1;
   c.fillRect(150,32+b,20,8);for(let k=0;k<4;k++)c.fillRect(150+k*6,26+b,3,6);
   spr('alex',148,60,{scale:2,fr:'idle'});vign(.55);
  },
  /* 10 TRUTH */ tt=>{
   const g=c.createRadialGradient(160,90,10,160,90,200);g.addColorStop(0,'#ffffff');g.addColorStop(1,'#b8a8e8');c.fillStyle=g;c.fillRect(0,0,W,H);
   for(let k=0;k<26;k++){const a=(tt*.3+k*.13)%1;c.fillStyle='#fff';c.globalAlpha=.8*Math.sin(a*3.14);c.fillRect(((k*61)%W)|0,(150-a*140)|0,2,4)}c.globalAlpha=1;
   c.fillStyle='#8a7ab8';c.globalAlpha=.4;c.fillRect(0,146,W,34);c.globalAlpha=1;
   spr('alex',96,106,{scale:2,fr:'idle'});
   spr('lara',200,106,{scale:2,fr:'idle',flip:true});
  }
 ];

 /* ---------- ظهور البوس ---------- */
 function sceneBoss(i,tt){
  const A=AREAS[i];
  BG.draw(c,A,i,tt*6,tt);
  c.fillStyle='#000';c.globalAlpha=.55;c.fillRect(0,0,W,H);c.globalAlpha=1;
  const cx=160,cy=96;
  c.fillStyle=A.accent;c.globalAlpha=.18+.06*Math.sin(tt*3);c.beginPath();c.arc(cx,cy,78,0,7);c.fill();c.globalAlpha=.1;c.beginPath();c.arc(cx,cy,112,0,7);c.fill();c.globalAlpha=1;
  const lara=i===10,sc=lara?5:6,key=lara?'lara':'boss'+i,fr=lara?'idle':'a';
  let w=96,h=96;try{const s=Sprites.size(key,fr);w=s.w*sc;h=s.h*sc}catch(e){}
  const rise=clamp(tt*1.3,0,1),yy=cy-h/2+(1-rise)*40+Math.sin(tt*2)*2;
  spr(key,cx-w/2,yy,{scale:sc,fr,alpha:rise});
  c.fillStyle=A.near;c.fillRect(0,150,W,30);c.fillStyle=A.accent;c.globalAlpha=.7;c.fillRect(0,150,W,1);c.globalAlpha=1;
  spr('alex',24,112,{scale:2,fr:'idle',alpha:.9});
  if(Math.sin(tt*28)>.96){c.globalAlpha=.25;c.fillStyle='#fff';c.fillRect(0,0,W,H);c.globalAlpha=1}
  vign(.6);
 }
 /* ---------- مقعد النجوم ---------- */
 function sceneBench(tt){
  grad('#04061a','#14123a');stars(1);
  c.fillStyle='#e8ecff';c.beginPath();c.arc(250,36,11,0,7);c.fill();c.globalAlpha=.1;c.beginPath();c.arc(250,36,26,0,7);c.fill();c.globalAlpha=1;
  c.fillStyle='#0a0a1c';c.beginPath();c.moveTo(0,150);c.quadraticCurveTo(120,110,320,150);c.lineTo(320,180);c.lineTo(0,180);c.fill();
  c.fillStyle='#3a3a50';c.fillRect(58,84,3,62);c.fillStyle='#ffe8a8';c.fillRect(54,80,11,5);
  c.globalAlpha=.12;c.beginPath();c.moveTo(54,85);c.lineTo(65,85);c.lineTo(100,148);c.lineTo(20,148);c.fill();c.globalAlpha=1;
  c.fillStyle='#4a3020';c.fillRect(110,118,110,5);c.fillRect(110,104,110,4);c.fillRect(116,123,4,22);c.fillRect(210,123,4,22);
  spr('alex',130,86,{scale:2,fr:'idle'});
  spr('lara',168,86,{scale:2,fr:'idle',flip:true});
  vign(.5);
 }
 function scene(b){
  switch(b.sc){
   case 'room':sceneRoom(t);break;
   case 'bottle':sceneBottle(t);break;
   case 'door':sceneDoor(t);break;
   case 'chair':sceneChair(t);break;
   case 'sleep':sceneSleep(t);break;
   case 'dream':sceneDream(t);break;
   case 'dawn':sceneDawn(t);break;
   case 'truth':sceneArea(10,t);break;
   case 'area':sceneArea(b.area,t);break;
   case 'flash':FL[b.i](t);break;
   case 'boss':sceneBoss(b.area,t);break;
   case 'bench':sceneBench(t);break;
   default:sceneRoom(t);
  }
 }

 /* ---------- بناء اللقطات ---------- */
 const flashBeat=i=>({sc:'flash',i,who:'narr',en:MEMORIES[i],ar:AR_MEM[i],auto:3.6,col:'#ffffff',tag:'A MEMORY<small>FLASHBACK</small>'});
 const chapterBeat=i=>({sc:'area',area:i,who:'narr',en:CH_IN[i].en,ar:CH_IN[i].ar,auto:3.2,col:AREAS[i].accent,
  tag:(i<10?'CHAPTER '+ROMAN[i]:'FINAL CHAPTER')+'<small>'+AREAS[i].name+'</small>'});
 const bossBeat=i=>({sc:'boss',area:i,who:'narr',en:BOSS_EN[i],ar:BOSS_AR[i],auto:3.2,col:AREAS[i].accent,
  tag:AREAS[i].boss.toUpperCase()+'<small>GUARDIAN OF '+AREAS[i].name+'</small>'});
 const outroBeat=i=>({sc:'area',area:i,who:'narr',en:CH_OUT[i].en,ar:CH_OUT[i].ar,auto:3.2,col:AREAS[i].accent,
  tag:'CHAPTER '+ROMAN[i]+' COMPLETE<small>'+AREAS[i].boss.toUpperCase()+' · OVERCOME</small>'});

 /* ---------- التحكم بالفقاعة ---------- */
 function showBeat(){
  const b=beats[bi],bub=E('cbub');
  bub.className=b.who;
  E('cwho').textContent=b.who==='lara'?'LARA':b.who==='alex'?'ALEXANDER':'';
  E('ctext').textContent='';
  E('car').textContent=b.ar||'';E('car').classList.remove('on');
  n=0;lastN=0;wait=0;
  const tag=E('ctag');
  if(b.tag){tag.innerHTML=b.tag;tag.style.color=b.col||'#fff';tag.style.display='block'}else tag.style.display='none';
  bub.style.animation='none';void bub.offsetWidth;bub.style.animation='';
  if(b.flash){flash=.9;try{SFX.boom()}catch(e){}}
 }

 /* ---------- بدء / إنهاء ---------- */
 function hideAll(){sh('cut',false);sh('splash',false);sh('credits',false);sh('cskip',false);E('cend').classList.add('hidden');E('croll').style.display=''}
 function start(k,cb,ai,extra){
  hideAll();kind=k;t=0;done=cb||null;bi=0;n=0;lastN=0;flash=0;tapped=false;wait=0;endCard=false;
  G.state=(k==='splash'||k==='credits')?k:'intro';
  if(k==='splash'){
   sh('splash',true);E('sp1').classList.remove('on');E('sp3').classList.remove('on');E('sp2').textContent='';
  }else if(k==='credits'){
   buildCredits();sh('credits',true);sh('cskip',true);
  }else{
   if(k==='intro'){beats=INTRO;sh('cskip',true);try{Music.play('fear')}catch(e){}}
   else if(k==='chapter'){beats=extra&&extra.length?extra:[chapterBeat(ai)];sh('cskip',true)}
   else if(k==='boss')beats=[bossBeat(ai)];
   else if(k==='outro')beats=[outroBeat(ai)];
   else if(k==='finale'){beats=FINALE;sh('cskip',true);try{Music.play('truth')}catch(e){}}
   sh('cut',true);showBeat();
  }
 }
 function finish(){
  const cb=done;hideAll();kind=null;done=null;beats=null;
  if(cb)cb();
 }
 function tap(){if(kind)tapped=true}
 const adv=()=>{const a=tapped||Input.pressed('interact')||Input.pressed('attack')||Input.pressed('jump');tapped=false;return a};
 function next(){
  bi++;
  if(bi>=beats.length){finish();return}
  showBeat();
 }

 /* ---------- الكريدت ---------- */
 function buildCredits(){
  const L=[
   ['ct','WITHIN ME'],['cs','A journey into the mind'],['gap'],
   ['ch','THANK YOU FOR PLAYING'],['car','شكراً لأنك لعبت'],['gap'],
   ['cl','You walked through fear, betrayal, temptation,'],['cl','alcohol, greed, injustice, anger, lies, envy and pride.'],['cl','And you faced yourself.'],['gap'],
   ['ch','CREATED BY'],['cn',AUTHOR.toUpperCase()],['cl','Story · Code · Art · Music'],['gap'],
   ['ch','CHARACTERS'],['cl','Alexander — the one who slept'],['cl','Lara — the voice that stayed'],['gap'],
   ['ch','YOUR JOURNEY'],
   ['cl','Time  '+fmt(G.time)],['cl','Deaths  '+G.deaths],['cl','Soul memories  '+G.mems.length+' / 11'],
   ['cl','Hearts of courage  '+G.hearts.length],['cl','Relics  '+G.relics.length+' / 11'],['cl','Shards  '+G.shards],['gap'],
   ['cs','"You are not alone."'],['car','"لستَ وحدك."'],['gap'],['ch','THE END']
  ];
  const roll=E('croll');
  roll.style.animation='none';void roll.offsetWidth;roll.style.animation='';
  roll.innerHTML=L.map(l=>'<div class="'+l[0]+'">'+(l[1]||'')+'</div>').join('');
 }
 function showEnd(){
  if(endCard)return;
  endCard=true;E('croll').style.display='none';
  E('cname').textContent=AUTHOR.toUpperCase();E('cend').classList.remove('hidden');
  sh('cskip',false);
 }

 /* ---------- update / render ---------- */
 function update(rd){
  t+=rd;if(flash>0)flash-=rd;
  if(kind==='splash'){
   if(t>.5)E('sp1').classList.add('on');
   const name=AUTHOR.toUpperCase(),k=clamp(Math.floor((t-.9)*8),0,name.length);
   if(E('sp2').textContent.length!==k)E('sp2').textContent=name.slice(0,k);
   if(t>3)E('sp3').classList.add('on');
   if(t>5.2||adv())finish();
   return;
  }
  if(kind==='credits'){
   if(adv()){if(!endCard)showEnd();else finish()}
   if(Input.pressed('pause')){if(!endCard)showEnd();else finish()}
   return;
  }
  if(!beats)return;
  if(Input.pressed('pause')){finish();return}
  const b=beats[bi],full=b.en.length;
  if(n<full){
   n=Math.min(full,n+rd*(b.auto?46:34));
   const k=Math.floor(n);
   if(k!==lastN){
    E('ctext').textContent=b.en.slice(0,k);
    if(k%2===0){try{SFX.blip(b.who==='lara'?460:b.who==='thought'?340:260,.03,'triangle',.03)}catch(e){}}
    lastN=k;
   }
  }else{
   E('car').classList.add('on');wait+=rd;
  }
  if(adv()){
   if(n<full){n=full;lastN=full;E('ctext').textContent=b.en;E('car').classList.add('on')}
   else next();
  }else if(b.auto&&n>=full&&wait>b.auto)next();
 }
 function render(){
  if(kind==='splash'){c.fillStyle='#02030a';c.fillRect(0,0,W,H);stars(.6)}
  else if(kind==='credits'){
   grad('#05061a','#2a1450');stars(1);
   const bob=Math.sin(t*3)*1;
   spr('alex',112,120+bob,{scale:2,fr:Math.floor(t*6)%2?'run0':'run1'});
   spr('lara',168,120+bob,{scale:2,fr:Math.floor(t*6)%2?'run1':'run0'});
   c.fillStyle='#120a28';c.fillRect(0,158,W,22);
  }
  else if(beats)scene(beats[bi]);
  if(flash>0){c.globalAlpha=Math.min(1,flash);c.fillStyle='#fff';c.fillRect(0,0,W,H);c.globalAlpha=1}
  if(G.fade>0){c.fillStyle='rgba(0,0,0,'+G.fade+')';c.fillRect(0,0,W,H)}
 }

 /* ---------- ربط اللمس ---------- */
 ['cut','splash','credits'].forEach(id=>E(id).addEventListener('pointerdown',e=>{if(e.target.id==='cskip')return;tap()}));
 E('cskip').addEventListener('pointerdown',e=>{e.stopPropagation()});
 E('cskip').addEventListener('click',e=>{e.stopPropagation();if(kind==='credits'){showEnd();finish()}else finish()});
 E('croll').addEventListener('animationend',showEnd);

 /* =====================================================
    شاشة الخريطة: ما لم تكتشفه يبقى مخفياً تماماً
    ===================================================== */
 function map(A){
  const M=MAPS[G.area],R=G.world.rooms,hub=R.hub;
  const seenRoom=k=>R[k].expl.some(v=>v);
  const pSeen=k=>{const po=hub.portals.find(q=>q.to===k);return !!(po&&hub.expl[Math.floor(po.x/40)])};
  const secSeen=seenRoom('sec')||!!(hub.brks[0]&&hub.brks[0].dead);
  const bossSeen=!!hub.expl[Math.floor(hub.arenaX/40)]||hub.defeated;
  const nodes=[
   {k:'hub',kind:'hub',lab:'HUB',seen:true,done:hub.defeated},
   {k:'w1',kind:'mini',lab:'LAIR I',seen:seenRoom('w1')||pSeen('w1'),done:G.keys.includes('m1')},
   {k:'w2',kind:'mini',lab:'LAIR II',seen:seenRoom('w2')||pSeen('w2'),done:G.keys.includes('m2')},
   {k:'w3',kind:'puzzle',lab:'ARCHIVE',seen:seenRoom('w3')||pSeen('w3'),done:G.keys.includes('p')},
   {k:'sec',kind:'secret',lab:'FAR',seen:secSeen,done:G.hearts.includes(G.area)},
   {k:'boss',kind:'boss',lab:'BOSS',seen:bossSeen,done:hub.defeated}
  ];
  const col={hub:A.accent,mini:'#ff4a6a',puzzle:'#c070ff',secret:'#ffd23d',boss:'#ff2a4a'};
  const P=k=>[26+M[k][0]*2.68,44+M[k][1]*.54];
  c.fillStyle='rgba(4,5,14,.95)';c.fillRect(8,5,304,170);
  c.strokeStyle=A.accent;c.lineWidth=1;c.strokeRect(8.5,5.5,303,169);c.globalAlpha=.35;c.strokeRect(11.5,8.5,297,163);c.globalAlpha=1;
  c.letterSpacing='3px';txt('MAP · '+A.name,160,21,A.accent,10,'center');c.letterSpacing='0px';
  txt('What you have not seen stays dark.',160,31,'#9aa2d8',6,'center');
  const hp=P('hub');
  for(const nd of nodes){
   if(nd.k==='hub'||!nd.seen)continue;
   const q=P(nd.k);
   c.strokeStyle=col[nd.kind];c.globalAlpha=.8;c.beginPath();c.moveTo(hp[0],hp[1]);c.lineTo(q[0],q[1]);c.stroke();
  }
  c.globalAlpha=1;
  const cur=G.room==='hub'?(hub.arena?'boss':'hub'):G.room;
  for(const nd of nodes){
   if(!nd.seen)continue;
   const [x,y]=P(nd.k),cc=col[nd.kind],r=nd.kind==='hub'||nd.kind==='boss'?7:5;
   c.fillStyle=cc;c.globalAlpha=.25;c.beginPath();c.arc(x,y,r+4,0,7);c.fill();c.globalAlpha=1;
   c.fillStyle=cc;
   if(nd.kind==='hub'){c.beginPath();c.arc(x,y,r,0,7);c.fill();c.fillStyle='#04050e';c.fillRect(x-1,y-3,2,6);c.fillRect(x-3,y-1,6,2)}
   else if(nd.kind==='mini'){c.beginPath();c.moveTo(x,y-r-1);c.lineTo(x+r+1,y);c.lineTo(x,y+r+1);c.lineTo(x-r-1,y);c.fill();c.fillStyle='#04050e';c.fillRect(x-3,y-2,2,2);c.fillRect(x+1,y-2,2,2);c.fillRect(x-2,y+2,4,1)}
   else if(nd.kind==='puzzle'){c.fillRect(x-r,y-r,r*2,r*2);txt('?',x,y+3,'#04050e',8,'center')}
   else if(nd.kind==='secret'){c.fillRect(x-1,y-r-1,2,r*2+2);c.fillRect(x-r-1,y-1,r*2+2,2);c.fillRect(x-3,y-3,6,6)}
   else{c.fillRect(x-r,y-r,r*2,r*2);c.fillStyle='#04050e';c.fillRect(x-4,y-3,3,3);c.fillRect(x+1,y-3,3,3);c.fillRect(x-3,y+2,6,2)}
   if(nd.done){c.fillStyle='#6bff6b';c.fillRect(x+r-1,y-r-5,2,3);c.fillRect(x+r+1,y-r-3,2,2);c.fillRect(x+r+3,y-r-6,2,5)}
   if(nd.k===cur){c.strokeStyle='#fff';c.globalAlpha=.5+.5*Math.sin(G.t*6);c.beginPath();c.arc(x,y,r+7,0,7);c.stroke();c.globalAlpha=1}
   txt(nd.lab,x,y+r+10,'#c8cff0',6,'center');
  }
  const lv=G.lv,N=lv.expl.length,sx=22,sw=276,sy=127;
  txt('ROOM · '+(lv.name||A.name),22,121,'#c8cff0',6);
  c.fillStyle='#0e0e22';c.fillRect(sx,sy,sw,10);
  const cw=sw/N;
  c.fillStyle=A.accent;c.globalAlpha=.4;
  for(let i=0;i<N;i++)if(lv.expl[i])c.fillRect(sx+i*cw,sy,Math.ceil(cw),10);
  c.globalAlpha=1;
  const X=x=>sx+clamp(x/Math.max(1,lv.len),0,1)*sw,seen=x=>lv.expl[Math.floor(x/40)];
  for(const cp of lv.cps)if(cp.on||seen(cp.x)){c.fillStyle=cp.on?'#ffd23d':'#6a6a88';c.fillRect(X(cp.x)-1,sy-2,2,14)}
  for(const po of lv.portals)if(!po.hidden&&seen(po.x)){c.fillStyle=po.kind==='mini'?'#ff4a6a':po.kind==='puzzle'?'#c070ff':po.kind==='secret'?'#ffd23d':'#8fd8ff';c.fillRect(X(po.x)-2,sy+1,4,8)}
  if(lv.hasArena&&seen(lv.arenaX)){c.fillStyle='#ff2a4a';c.fillRect(X(lv.arenaX),sy-3,4,16)}
  c.fillStyle='#fff';c.fillRect(X(G.p.x)-1,sy-4,3,18);
  txt('CLEARED',22,153,'#9aa2d8',6);
  txt(G.keys.length+' / 3',68,153,'#ffd23d',6);
  txt('HEARTS '+G.p.max,106,153,'#ff8aa8',6);
  txt('✦ '+G.mems.length+'/11',162,153,'#fff',6);
  txt('☠ '+G.deaths,208,153,'#ff8a9a',6);
  txt(fmt(G.time),244,153,'#c8cff0',6);
  txt('RELICS',22,166,'#9aa2d8',6);
  for(let i=0;i<11;i++){
   const own=G.relics.includes(i);
   c.fillStyle=own?'#8affd8':'#22223a';
   c.beginPath();c.moveTo(64+i*11,160);c.lineTo(68+i*11,165);c.lineTo(64+i*11,170);c.lineTo(60+i*11,165);c.fill();
  }
  const last=G.relics.length?RELICS[G.relics[G.relics.length-1]]:null;
  if(last)txt(last.name+': '+last.desc,188,166,'#8affd8',5);
  txt('M / MAP to close',298,14,'#7a80b0',5,'right');c.textAlign='left';
 }

 return{start,update,render,tap,map,author:AUTHOR,active:()=>!!kind,INTER,flashBeat,chapterBeat};
})();

/* =====================================================
   ربط اللقطات بالعبة بدون تعديل منطق game.js
   [نهاية بوس] ← [مشهد المقعد] ← [ذكرى] ← [بداية الفصل] ← الحوار
   وقبل كل بوس: [لقطة ظهور] ثم الحوار
   ===================================================== */
(function hookCutscenes(){
 let pendingOutro=null;

 const _ds=Dialogue.show;
 Dialogue.show=function(lines,cb){
  try{
   if(G.world&&DIALOGUE[G.area]){
    if(lines===DIALOGUE[G.area].outro)pendingOutro=G.area;
    if(lines===DIALOGUE[G.area].boss&&!Screens.active()){
     const ar=G.area;
     Screens.start('boss',()=>{G.state='dialogue';_ds.call(Dialogue,lines,cb)},ar);
     return;
    }
   }
  }catch(e){}
  return _ds.call(Dialogue,lines,cb);
 };

 const _load=loadArea;
 loadArea=function(i,skip){
  const po=pendingOutro;pendingOutro=null;
  const proceed=()=>{
   _load(i,true);
   if(skip)return;
   const beats=(Screens.INTER[i]||[]).concat([Screens.flashBeat(i),Screens.chapterBeat(i)]);
   Screens.start('chapter',()=>{
    G.state='dialogue';
    Dialogue.show(DIALOGUE[i].intro,()=>G.state='play');
   },i,beats);
  };
  if(!skip&&po!==null&&po===i-1)Screens.start('outro',proceed,po);
  else proceed();
 };

 const _end=ending;
 ending=function(){
  pendingOutro=null;
  try{show('#pbtn',false);show('#mbtn',false)}catch(e){}
  fadeThen(()=>{Screens.start('finale',()=>_end())});
 };
})();
