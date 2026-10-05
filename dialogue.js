/* ===== WITHIN ME — dialogue.js : الحوارات + الهمسات + واجهة الدايلوج ===== */
const A_='Alexander',L_='Lara',N_='...';

/* لارا: قاسية بالبداية ... وتلين مع كل فصل */
const DIALOGUE=[
 /* 1 — FEAR */
 {intro:[
   {who:N_,text:'Cold. No sky, no ground... only the sound of something breathing.'},
   {who:A_,text:'Where... am I?'},
   {who:L_,text:'Not where. What. You are inside the thing you have been running from.'},
   {who:A_,text:'Who are you? How do you know me?'},
   {who:L_,text:'I know the shape of your silence. That is enough.'},
   {who:L_,text:"Walk. And stop looking over your shoulder. It only teaches the dark where you're weak."}],
  boss:[
   {who:N_,text:'The shadows lean closer. Something wakes.'},
   {who:'The Fear',text:'Forty years you carried me. Not once did you look at my face.'},
   {who:A_,text:"I wasn't afraid."},
   {who:'The Fear',text:'Then why is your heart so loud?'},
   {who:L_,text:"Don't answer it. It feeds on answers."}],
  mid:[{who:'The Fear',text:'Strike me and I only become the dark between your thoughts.'}],
  outro:[
   {who:'The Fear',text:'...I was only ever the door.'},
   {who:N_,text:'The dark exhales. For a moment, it almost sounds like grief.'},
   {who:L_,text:"Tch. You're still breathing. Don't get proud. That was the easy one."},
   {who:A_,text:'Easy?'},
   {who:L_,text:'Keep walking.'}]},
 /* 2 — BETRAYAL */
 {intro:[
   {who:N_,text:'The path is beautiful. That is what makes it suspicious.'},
   {who:L_,text:'Careful. Every road here is a promise somebody broke.'},
   {who:A_,text:'Why are you so cold with me?'},
   {who:L_,text:'Because warmth is how you got hurt the first time.'},
   {who:A_,text:"I don't remember being hurt."},
   {who:L_,text:'Exactly.'}],
  boss:[
   {who:N_,text:'Two faces turn toward you. One of them smiles.'},
   {who:'The Betrayal',text:"Alexander. My oldest friend. I would never hurt you."},
   {who:A_,text:'...You said that before.'},
   {who:'The Betrayal',text:'And you believed me. Beautiful, wasn\'t it?'},
   {who:L_,text:"Don't listen. Pathetic... you still want to."}],
  mid:[{who:'The Betrayal',text:'Trust is a blade, Alexander. You always held it by the edge.'}],
  outro:[
   {who:'The Betrayal',text:'Say it. Say that it hurt.'},
   {who:A_,text:'It hurt.'},
   {who:N_,text:'The mask cracks. Behind it, only a tired reflection.'},
   {who:L_,text:'Hm. That was honest. ...Keep going.'}]},
 /* 3 — TEMPTATION */
 {intro:[
   {who:N_,text:'Warm light. Soft music. Every pleasure you ever refused to name.'},
   {who:L_,text:"Pretty, aren't they? They always were your weakness."},
   {who:A_,text:"I'm not weak."},
   {who:L_,text:'Then walk past them without looking back. Go on.'},
   {who:A_,text:'Why does it feel like they are calling my name?'},
   {who:L_,text:'Because they learned it from you.'}],
  boss:[
   {who:N_,text:'Petals fall upward. A voice, soft as breath.'},
   {who:'The Temptation',text:"Stay. You've carried so much. Rest here, with me."},
   {who:A_,text:'Just for a moment...'},
   {who:L_,text:'Alexander. Look at me. Not at her.'},
   {who:'The Temptation',text:'She only ever scolds you. I never would.'}],
  mid:[{who:'The Temptation',text:"Come closer. I'll be gentle. I'm always gentle... at first."}],
  outro:[
   {who:'The Temptation',text:'Everyone leaves in the end. Even you.'},
   {who:N_,text:'The sweetness fades. Underneath, it was only hunger.'},
   {who:L_,text:'You looked twice. But you walked on. ...Fine. Better than I expected.'},
   {who:A_,text:'Was that a compliment?'},
   {who:L_,text:"Don't push it."}]},
 /* 4 — ALCOHOL */
 {intro:[
   {who:N_,text:'Green glass. Laughter that never reaches the eyes.'},
   {who:L_,text:'You hide in the bottle because silence is too honest.'},
   {who:A_,text:'It helped me forget.'},
   {who:L_,text:'It helped you disappear. There is a difference.'},
   {who:A_,text:'Does it matter, if the pain stops?'},
   {who:L_,text:'It matters to the people who stayed.'}],
  boss:[
   {who:N_,text:'A towering shape of glass groans to life.'},
   {who:'The Bottle',text:'Old friend. I was warm when no one else was.'},
   {who:A_,text:'You were.'},
   {who:'The Bottle',text:'And I never asked a single question.'},
   {who:L_,text:'That is why it was never a friend. Friends ask.'}],
  mid:[{who:'The Bottle',text:'Pour me out, and you pour yourself out too.'}],
  outro:[
   {who:'The Bottle',text:'...I only wanted you to stop hurting.'},
   {who:A_,text:'I know. I know you did.'},
   {who:L_,text:"Don't thank me. Just stay standing. That is the whole fight."}]},
 /* 5 — GREED */
 {intro:[
   {who:N_,text:'Gold rivers. Gold walls. Gold silence.'},
   {who:L_,text:'More. Always more. And still you felt hollow.'},
   {who:A_,text:'Everyone wants more.'},
   {who:L_,text:'Not everyone loses themselves counting.'},
   {who:A_,text:'What was I trying to fill?'},
   {who:L_,text:'...Ask me again when you are ready for the answer.'}],
  boss:[
   {who:N_,text:'Coins rain upward. A golem of hunger rises.'},
   {who:'The Greed',text:'Take it. Take everything. There is always one more room.'},
   {who:A_,text:"I don't want it."},
   {who:'The Greed',text:'Liar. You never stopped reaching.'},
   {who:L_,text:'Reaching is not the sin. Never opening your hand is.'}],
  mid:[{who:'The Greed',text:'Enough? What a strange, small word.'}],
  outro:[
   {who:'The Greed',text:'Without me... what will you hold?'},
   {who:A_,text:'Maybe nothing. Maybe that is fine.'},
   {who:L_,text:"You let go of the gold. I didn't think you would."},
   {who:L_,text:'...Good.'}]},
 /* 6 — INJUSTICE */
 {intro:[
   {who:N_,text:'Iron bars. Scales that never balance.'},
   {who:L_,text:'You were the judge and the accused. Which one hurt more?'},
   {who:A_,text:'I only wanted things to be fair.'},
   {who:L_,text:'Fair to whom? ...Never mind. Walk.'},
   {who:A_,text:"You don't sound angry anymore."},
   {who:L_,text:'I am tired of being angry at someone who was only ever tired.'}],
  boss:[
   {who:N_,text:'A gavel falls. The whole world flinches.'},
   {who:'The Judge',text:'Order. The accused will stand.'},
   {who:A_,text:'On what charge?'},
   {who:'The Judge',text:'Every mercy you denied yourself. Every kindness you called weakness.'},
   {who:L_,text:'Do not kneel. He has no jurisdiction over a heart.'}],
  mid:[{who:'The Judge',text:'Guilty. Guilty. Guilty. And still you stand?'}],
  outro:[
   {who:'The Judge',text:'Then who... will forgive you?'},
   {who:N_,text:'The gavel crumbles to dust.'},
   {who:L_,text:"I'm not saying you were wrong. I'm saying you were tired. We both were."}]},
 /* 7 — ANGER */
 {intro:[
   {who:N_,text:'The sky is bleeding. Embers fall like slow rain.'},
   {who:L_,text:'Burn, if you must. But look at what is left of those you scorched.'},
   {who:A_,text:"I'm so tired of being angry."},
   {who:L_,text:'I know.'},
   {who:A_,text:'Do you?'},
   {who:L_,text:'Who do you think carried it with you?'}],
  boss:[
   {who:N_,text:'The ground splits. A horned shape claws free of the fire.'},
   {who:'The Rage',text:'FINALLY. You always kept me chained behind your teeth.'},
   {who:A_,text:'I never wanted you.'},
   {who:'The Rage',text:'You NEEDED me. Every time they hurt you, I answered.'},
   {who:L_,text:'He is right. He did. ...But we do not need a guard dog anymore.'}],
  mid:[{who:'The Rage',text:'LET ME OUT! LET ME OUT!'}],
  outro:[
   {who:'The Rage',text:'...I was only ever your wound.'},
   {who:A_,text:'I am sorry I chained you.'},
   {who:L_,text:'Breathe. The fire was never your enemy. It was how your heart screamed.'}]},
 /* 8 — LYING */
 {intro:[
   {who:N_,text:'Mirrors that remember a different you.'},
   {who:L_,text:'Every lie was a door you closed on yourself.'},
   {who:A_,text:'I only lied to survive.'},
   {who:L_,text:'I know. That is why I never hated you.'},
   {who:A_,text:'Then why were you so cruel?'},
   {who:L_,text:'Because the truth is cruel. I only delivered it.'}],
  boss:[
   {who:N_,text:'A thousand reflections turn at once.'},
   {who:'The Liar',text:'Which one of us is real, Alexander?'},
   {who:A_,text:"...I'm not sure anymore."},
   {who:'The Liar',text:'Good. Certainty is the loudest lie.'},
   {who:L_,text:'Look for the one who flinches. That one is real.'}],
  mid:[{who:'The Liar',text:'Break me, and a thousand pieces will say your name.'}],
  outro:[
   {who:'The Liar',text:'Say it. Just once. The thing you never told anyone.'},
   {who:A_,text:'I was afraid. All of it. The whole time.'},
   {who:N_,text:'The glass falls silent. The reflection finally smiles.'},
   {who:L_,text:'...Thank you. For saying it.'}]},
 /* 9 — ENVY */
 {intro:[
   {who:N_,text:'Windows glow in every tower. None of them yours.'},
   {who:L_,text:'You looked at their lives and forgot you had one.'},
   {who:A_,text:'You sound... different.'},
   {who:L_,text:'Maybe I am tired of being cruel to you.'},
   {who:A_,text:'What changed?'},
   {who:L_,text:'You did. You stopped running. I noticed.'}],
  boss:[
   {who:N_,text:'A crowned ghost with a hundred eyes drifts down.'},
   {who:'The Envy',text:'Theirs. Theirs. Why was it never mine?'},
   {who:A_,text:'I wanted what they had.'},
   {who:'The Envy',text:'And you called it ambition. How tidy.'},
   {who:L_,text:'He feeds on comparison. Stop measuring yourself with their ruler.'}],
  mid:[{who:'The Envy',text:'Every smile is a theft from me.'}],
  outro:[
   {who:'The Envy',text:'Do you know what I wanted? Just to be seen.'},
   {who:A_,text:'I see you.'},
   {who:L_,text:'What they have was never yours to lose. What you have is still yours.'}]},
 /* 10 — PRIDE */
 {intro:[
   {who:N_,text:'A palace of glass and violet light. Beautiful. Unreachable. Lonely.'},
   {who:L_,text:'Almost there. Your pride built this tower so no one could reach you.'},
   {who:A_,text:'And no one did.'},
   {who:L_,text:'I did. I always could.'},
   {who:A_,text:'Then why did I never see you?'},
   {who:L_,text:'You did. You just called me your conscience, and turned the volume down.'}],
  boss:[
   {who:N_,text:'On the highest throne, a figure wearing your face.'},
   {who:'The Self',text:'I am everything you wanted to be. Kneel.'},
   {who:A_,text:'You are not me.'},
   {who:'The Self',text:'I am the you who never apologized.'},
   {who:L_,text:'Alexander... he is the last wall. After him, only me.'}],
  mid:[{who:'The Self',text:'You cannot forgive what you refuse to admit.'}],
  outro:[
   {who:'The Self',text:"...It's so cold up here."},
   {who:A_,text:'Come down. It is warmer.'},
   {who:L_,text:"One door left. I'll be waiting. ...Be gentle with me."}]},
 /* 11 — THE TRUTH */
 {intro:[
   {who:N_,text:'The noise stops. Light, without a source.'},
   {who:L_,text:'You came all this way.'},
   {who:A_,text:'Lara... who are you?'},
   {who:L_,text:'The part of you that never stopped caring. Even when I screamed.'},
   {who:A_,text:'All those cruel words...'},
   {who:L_,text:'Were the only way I knew to stay beside you.'},
   {who:L_,text:'So fight me. Fight yourself. And then, forgive.'}],
  boss:[
   {who:N_,text:'She raises her hand. The light bends toward her.'},
   {who:L_,text:"Don't hold back. I'm not afraid anymore."},
   {who:A_,text:"I don't want to hurt you."},
   {who:L_,text:'You never could. That was always the point.'},
   {who:L_,text:'Show me you can face yourself. That is all I ask.'}],
  mid:[{who:L_,text:"Don't stop. Please. Almost there."}],
  outro:[
   {who:L_,text:'You did it.'},
   {who:A_,text:"I'm sorry. For all of it."},
   {who:L_,text:"That's all I ever wanted to hear... I'm sorry too."},
   {who:N_,text:"In the end, you weren't fighting monsters."},
   {who:N_,text:'You were learning to stay.'}]}
];

/* همسات تظهر عند كل نقطة حفظ */
const WHISPERS=[
 ['Breathe.','The dark is only unfinished light.','Keep your eyes open.'],
 ['Not every hand that reaches is kind.','Trust slowly.','Remember who stayed.'],
 ['Sweetness has a price.','Look away. Walk on.','You are stronger than this.'],
 ['The glass remembers your face.','One step. Then another.','Sober light is still light.'],
 ['What are you holding on to?','Open your hand.','Nothing here is yours.'],
 ['Mercy is not weakness.','You may put the scales down.','Fair is not the same as kind.'],
 ['The fire is only pain, loud.','Unclench.','Still here. Still here.'],
 ['Which of these is you?','Say it plainly.','The truth is quieter than a lie.'],
 ['Their light is not your dark.','Look at your own hands.','You are enough, unfinished.'],
 ['Higher is not closer.','Put the crown down.','I am right here.'],
 ['Almost home.','I never left.','Forgive. Then stay.']
];

/* ---- واجهة الدايلوج: typewriter + بورتريه + دفء لارا ---- */
const Dialogue=(()=>{
 const q$=s=>document.querySelector(s);
 const box=q$('#dialogue'),nm=q$('#dname'),tx=q$('#dtext'),pc=q$('#portrait').getContext('2d');
 let q=[],i=0,full='',n=0,done=null,active=false,lastN=0,speed=34,who='';
 const api={warm:0};

 function line(){
  const l=q[i];who=l.who;
  nm.textContent=l.who;
  nm.className='';nm.style.color='';
  full=l.text;n=0;lastN=0;tx.textContent='';speed=34;
  pc.clearRect(0,0,48,48);
  if(l.who===A_){nm.className='n-alexander';Sprites.draw(pc,'alex',0,0,{scale:4,fr:'idle'})}
  else if(l.who===L_){
   const w=api.warm;                       // 0 = قاسية ... 1 = حنونة
   nm.style.color='hsl('+(350-20*w)+','+(90-30*w)+'%,'+(55+30*w)+'%)';
   speed=44-16*w;                          // كلامها يهدأ مع الوقت
   Sprites.draw(pc,'lara',0,0,{scale:4,fr:'idle'});
  }else if(l.who!==N_){
   const k=AREAS.findIndex(a=>a.boss===l.who);
   if(k>=0){nm.style.color=AREAS[k].accent;Sprites.draw(pc,'boss'+k,0,0,{scale:3,fr:'a'})}
  }
 }
 function next(){
  if(!active)return;
  if(n<full.length){n=full.length;tx.textContent=full;return}
  if(++i>=q.length){
   active=false;box.classList.add('hidden');
   const f=done;done=null;if(f)f();
  }else line();
 }
 box.addEventListener('click',next);

 api.next=next;
 api.show=(lines,cb)=>{q=lines;i=0;done=cb;active=true;box.classList.remove('hidden');line()};
 api.update=dt=>{
  if(!active||n>=full.length)return;
  n=Math.min(full.length,n+dt*speed);
  const k=Math.floor(n);tx.textContent=full.slice(0,k);
  if(k>lastN&&k%2===0&&who!==N_){
   if(who===A_)SFX.blip(300,.03,'triangle',.04);
   else if(who===L_)SFX.blip(430+api.warm*60,.03,'triangle',.04);
   else SFX.blip(120,.04,'sawtooth',.04);
  }
  lastN=k;
 };
 return api;
})();
