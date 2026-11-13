'use strict';
const frequencies = {G4:392.00,C4:261.63,E4:329.63,A4:440.00,C5:523.25};
let ctx, master, destination, recorder, chunks=[], timerInterval, startedAt=0, previousUrl=null;
const $=id=>document.getElementById(id);
async function initAudio(){
  if(!ctx){ctx=new (window.AudioContext||window.webkitAudioContext)();master=ctx.createGain();master.gain.value=.65;master.connect(ctx.destination);destination=ctx.createMediaStreamDestination();master.connect(destination)}
  if(ctx.state==='suspended') await ctx.resume();
}
// Short, gently decaying synthesized pluck; no external samples or libraries.
function pluck(note, delay=0){
  const when=ctx.currentTime+delay, f=frequencies[note], duration=1.7;
  const osc=ctx.createOscillator(), gain=ctx.createGain(), filter=ctx.createBiquadFilter();
  osc.type='triangle';osc.frequency.setValueAtTime(f,when);
  filter.type='lowpass';filter.frequency.setValueAtTime(2700,when);filter.frequency.exponentialRampToValueAtTime(850,when+duration);
  gain.gain.setValueAtTime(.0001,when);gain.gain.exponentialRampToValueAtTime(.35,when+.008);gain.gain.exponentialRampToValueAtTime(.0001,when+duration);
  osc.connect(filter);filter.connect(gain);gain.connect(master);osc.start(when);osc.stop(when+duration+.02);
}
async function playNotes(notes){try{await initAudio();notes.forEach((n,i)=>pluck(n,i*.085))}catch(err){$('status').textContent='Audio could not start. Try tapping again.'}}
const open=['G4','C4','E4','A4'];
document.querySelectorAll('.string').forEach(btn=>btn.addEventListener('click',async()=>{await playNotes([btn.dataset.note]);btn.classList.add('playing');setTimeout(()=>btn.classList.remove('playing'),170)}));
$('strumOpen').addEventListener('click',()=>playNotes(open));
$('strumC').addEventListener('click',()=>playNotes(['G4','C4','E4','C5']));
$('practiceC').addEventListener('click',()=>playNotes(['G4','C4','E4','C5']));
document.addEventListener('keydown',e=>{if(e.repeat||e.altKey||e.ctrlKey||e.metaKey||['INPUT','TEXTAREA'].includes(document.activeElement.tagName))return;const i=['1','2','3','4'].indexOf(e.key);if(i!==-1){e.preventDefault();document.querySelectorAll('.string')[i].click()}});
function formatTime(ms){let s=Math.floor(ms/1000);return String(Math.floor(s/60)).padStart(2,'0')+':'+String(s%60).padStart(2,'0')}
$('record').addEventListener('click',async()=>{
  try{
    await initAudio();if(typeof MediaRecorder==='undefined'||!MediaRecorder.isTypeSupported){/* allow browser to select its default */}
    if(typeof MediaRecorder==='undefined')throw new Error('Recording is not supported in this browser. Try a recent version of Chrome, Firefox or Safari.');
    const candidates=['audio/webm;codecs=opus','audio/mp4','audio/webm'];
    const type=candidates.find(t=>MediaRecorder.isTypeSupported(t));
    recorder=new MediaRecorder(destination.stream,type?{mimeType:type}:undefined);
    chunks=[];recorder.ondataavailable=e=>{if(e.data.size)chunks.push(e.data)};
    recorder.onstop=()=>{
      clearInterval(timerInterval);
      const mime=recorder.mimeType||'audio/webm';const blob=new Blob(chunks,{type:mime});
      if(previousUrl)URL.revokeObjectURL(previousUrl);previousUrl=URL.createObjectURL(blob);
      $('playback').src=previousUrl;$('download').href=previousUrl;
      $('download').download='my-ukulele-music.'+(mime.includes('mp4')?'m4a':'webm');
      $('result').hidden=false;$('status').textContent='Recording ready! Listen or download it.';
    };
    recorder.start();startedAt=Date.now();$('timer').textContent='00:00';
    timerInterval=setInterval(()=>$('timer').textContent=formatTime(Date.now()-startedAt),250);
    $('record').disabled=true;$('stop').disabled=false;$('result').hidden=true;
    $('status').textContent='Recording! Tap strings or play a chord.';
  }catch(err){$('status').textContent=err.message||'Could not start recording.'}
});
$('stop').addEventListener('click',()=>{if(recorder&&recorder.state==='recording'){recorder.stop();$('record').disabled=false;$('stop').disabled=true;$('timer').textContent=formatTime(Date.now()-startedAt)}});
