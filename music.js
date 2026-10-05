/* ===== WITHIN ME — music.js : محرك الموسيقى + موسيقى كل فصل ===== */
const Music=(()=>{
 let ac,master,nbuf,cur=null,timer=null,step=0,next=0,intense=false,curId=null;
 const T={};
 const mf=m=>440*Math.pow(2,(m-69)/12);
 const deg=(tr,d)=>{const s=tr.scale,n=s.length;return tr.root+s[((d%n)+n)%n]+12*Math.floor(d/n)};

 function ctx(){
  if(!ac){
   ac=new(window.AudioContext||window.webkitAudioContext)();
   master=ac.createGain();master.gain.value=0;
   const d=ac.createDelay(1);d.delayTime.value=.32;
   const fb=ac.createGain();fb.gain.value=.38;
   const lp=ac.createBiquadFilter();lp.type='lowpass';lp.frequency.value=2200;
   master.connect(ac.destination);master.connect(d);d.connect(lp);lp.connect(fb);fb.connect(d);lp.connect(ac.destination);
   nbuf=ac.createBuffer(1,ac.sampleRate,ac.sampleRate);
   const ch=nbuf.getChannelData(0);for(let i=0;i<ch.length;i++)ch[i]=Math.random()*2-1;
  }
  if(ac.state==='suspended')ac.resume();
  return ac;
 }
 function note(f,t,d,type,vol,atk=.02){
  const o=ac.createOscillator(),g=ac.createGain();
  o.type=type;o.frequency.value=f;
  g.gain.setValueAtTime(.0001,t);
  g.gain.linearRampToValueAtTime(vol,t+atk);
  g.gain.exponentialRampToValueAtTime(.0001,t+d);
  o.connect(g);g.connect(master);o.start(t);o.stop(t+d+.05);
 }
 function kick(t){
  const o=ac.createOscillator(),g=ac.createGain();
  o.frequency.setValueAtTime(130,t);o.frequency.exponentialRampToValueAtTime(40,t+.15);
  g.gain.setValueAtTime(.26,t);g.gain.exponentialRampToValueAtTime(.0001,t+.18);
  o.connect(g);g.connect(master);o.start(t);o.stop(t+.2);
 }
 function noise(t,d,vol,hp){
  const s=ac.createBufferSource(),f=ac.createBiquadFilter(),g=ac.createGain();
  s.buffer=nbuf;f.type='highpass';f.frequency.value=hp;
  g.gain.setValueAtTime(vol,t);g.gain.exponentialRampToValueAtTime(.0001,t+d);
  s.connect(f);f.connect(g);g.connect(master);s.start(t);s.stop(t+d+.02);
 }

 function tick(){
  if(!cur||!ac)return;
  const tr=cur,sd=60/(tr.bpm*(intense?1.12:1))/4;
  while(next<ac.currentTime+.35){
   const bar=Math.floor(step/16),sp=step%16;
   const ch=tr.chords[bar%tr.chords.length];
   // pad (accord)
   if(sp===0)for(const o of[0,2,4])note(mf(deg(tr,ch+o)),next,sd*16,'sine',.03,.5);
   // lead
   const l=tr.lead[sp];
   if(l!==null){
    note(mf(deg(tr,ch+l)+12),next,sd*2.2,tr.wave,.06);
    if(intense)note(mf(deg(tr,ch+l)+24),next,sd,'square',.02);
   }
   // bass
   const b=tr.bass[sp>>1];
   if(sp%2===0&&b!==null)note(mf(deg(tr,ch+b)-12),next,sd*3,'triangle',.12);
   // arpeggio
   if(tr.arp&&sp%2===1)note(mf(deg(tr,ch+[0,2,4,7][(sp>>1)%4])+24),next,sd,'sine',.022);
   // drums
   const dr=Math.min(3,tr.drums+(intense?1:0));
   if(dr>=1&&sp%(dr===1?8:4)===0)kick(next);
   if(dr>=2&&sp%2===1)noise(next,.04,.05,6000);
   if(dr>=3&&sp%8===4)noise(next,.12,.09,1800);
   next+=sd;step++;
  }
 }

 return{
  ctx,
  register(id,def){T[id]=def},
  play(id){
   ctx();if(curId===id)return;
   curId=id;cur=T[id];step=0;next=ac.currentTime+.2;
   const t=ac.currentTime;
   master.gain.cancelScheduledValues(t);
   master.gain.setValueAtTime(0,t);
   master.gain.linearRampToValueAtTime(.55,t+1.8);
   if(!timer)timer=setInterval(tick,100);
  },
  setIntense(v){intense=v},
  stop(){
   if(!ac)return;const t=ac.currentTime;
   master.gain.cancelScheduledValues(t);master.gain.setValueAtTime(master.gain.value,t);
   master.gain.linearRampToValueAtTime(0,t+.8);curId=null;cur=null;
  }
 };
})();

/* لكل فصل: bpm, root(MIDI), scale, wave, drums(0-3), arp, chords(درجات), lead(16), bass(8) */

/* 1. FEAR — بطيء، بارد، ظلام */
Music.register('fear',{bpm:64,root:45,scale:[0,2,3,5,7,8,10],wave:'sine',drums:0,arp:true,
 chords:[0,-2,-4,-3],
 lead:[0,null,null,2,null,null,4,null,3,null,null,null,1,null,null,null],
 bass:[0,null,null,null,-3,null,null,null]});

/* 2. BETRAYAL — نغمات خادعة (phrygian dominant) */
Music.register('betrayal',{bpm:82,root:47,scale:[0,1,4,5,7,8,10],wave:'triangle',drums:1,arp:true,
 chords:[0,1,0,-2],
 lead:[0,null,1,null,4,null,3,null,1,null,null,2,null,null,0,null],
 bass:[0,null,null,0,null,null,-2,null]});

/* 3. TEMPTATION — حلو ومسموم */
Music.register('temptation',{bpm:92,root:52,scale:[0,2,3,5,7,8,11],wave:'triangle',drums:1,arp:true,
 chords:[0,3,4,0],
 lead:[0,null,2,null,4,null,2,null,3,null,1,null,2,null,null,null],
 bass:[0,null,null,null,2,null,null,null]});

/* 4. ALCOHOL — متمايلة، مشوّشة */
Music.register('alcohol',{bpm:76,root:43,scale:[0,2,3,5,7,9,10],wave:'triangle',drums:0,arp:false,
 chords:[0,3,-1,2],
 lead:[0,null,null,1,null,0,null,null,-1,null,0,null,null,2,null,null],
 bass:[0,null,-2,null,0,null,-3,null]});

/* 5. GREED — لامعة وجشعة */
Music.register('greed',{bpm:108,root:50,scale:[0,2,4,7,9],wave:'square',drums:2,arp:true,
 chords:[0,2,3,1],
 lead:[0,2,4,2,0,null,2,null,4,5,4,2,0,null,null,null],
 bass:[0,null,0,null,-2,null,-1,null]});

/* 6. INJUSTICE — ثقيلة كالمحكمة */
Music.register('injustice',{bpm:58,root:41,scale:[0,2,3,5,7,8,10],wave:'triangle',drums:2,arp:false,
 chords:[0,0,-2,-4],
 lead:[0,null,null,null,3,null,null,null,2,null,null,null,0,null,null,null],
 bass:[0,null,null,null,0,null,null,null]});

/* 7. ANGER — سريعة وعنيفة */
Music.register('anger',{bpm:148,root:40,scale:[0,1,3,5,7,8,10],wave:'sawtooth',drums:3,arp:false,
 chords:[0,1,0,-2],
 lead:[0,0,null,1,0,null,3,null,0,0,null,4,3,null,1,null],
 bass:[0,0,null,0,-2,null,0,null]});

/* 8. LYING — غريبة، whole-tone */
Music.register('lying',{bpm:84,root:54,scale:[0,2,4,6,8,10],wave:'sine',drums:1,arp:true,
 chords:[0,2,1,3],
 lead:[0,null,3,null,1,null,4,null,2,null,5,null,3,null,null,null],
 bass:[0,null,null,null,2,null,null,null]});

/* 9. ENVY — خضراء وحزينة */
Music.register('envy',{bpm:90,root:48,scale:[0,2,3,5,7,8,11],wave:'triangle',drums:2,arp:true,
 chords:[0,-3,-2,-4],
 lead:[0,null,2,3,null,2,null,0,4,null,3,null,2,null,null,null],
 bass:[0,null,null,-3,null,null,-2,null]});

/* 10. PRIDE — مهيبة، قصر زجاجي */
Music.register('pride',{bpm:74,root:50,scale:[0,2,4,6,7,9,11],wave:'square',drums:2,arp:true,
 chords:[0,4,3,5],
 lead:[0,null,null,4,null,null,6,null,7,null,null,null,4,null,null,null],
 bass:[0,null,null,null,3,null,null,null]});

/* 11. THE TRUTH — نور ودفء */
Music.register('truth',{bpm:62,root:55,scale:[0,2,4,5,7,9,11],wave:'sine',drums:0,arp:true,
 chords:[0,3,4,2],
 lead:[0,null,2,null,4,null,null,6,7,null,null,null,4,null,2,null],
 bass:[0,null,null,null,4,null,null,null]});
