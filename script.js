// Interactivity for the Sorry Heart Page
(function(){
  const heart = document.getElementById('heartBtn');
  const card = document.getElementById('card');
  const emoji = document.getElementById('emoji');
  const confetti = document.getElementById('confetti');
  const copyBtn = document.getElementById('copyBtn');
  const waBtn = document.getElementById('waBtn');

  // hide card initially
  card.style.display = 'none';

  function burstConfetti(){
    confetti.innerHTML = '';
    for(let i=0;i<28;i++){
      const el = document.createElement('i');
      el.style.left = Math.random()*100 + '%';
      el.style.top = (Math.random()*-30) + 'vh';
      el.style.width = (6+Math.random()*10)+'px';
      el.style.height = (10+Math.random()*12)+'px';
      el.style.background = ['#ff6b9a','#ffd166','#ff9f43','#8ad3ff','#b39ddb'][Math.floor(Math.random()*5)];
      el.style.opacity = 1;
      el.style.transform = `translateY(-20px) rotate(${Math.random()*360}deg)`;
      confetti.appendChild(el);
      // animate using Web Animations API if available
      const fall = el.animate([
        { transform: `translateY(-20px) rotate(0deg)`, opacity:1 },
        { transform: `translateY(${60+Math.random()*120}vh) rotate(${Math.random()*720}deg)`, opacity:0.1 }
      ], { duration: 1600+Math.random()*1200, easing:'cubic-bezier(.2,.7,.2,1)' });
      fall.onfinish = ()=>el.remove();
    }
  }

  heart.addEventListener('click', ()=>{
    heart.classList.remove('pulse');
    heart.style.transform = 'scale(1.06)';
    setTimeout(()=>heart.style.transform='scale(1)',150);

    // show card
    card.style.display = 'block';
    setTimeout(()=>card.classList.add('show'),40);

    // emoji sequence
    emoji.textContent = '🥺';
    setTimeout(()=>emoji.textContent='🙏',700);
    setTimeout(()=>emoji.textContent='💌',1400);

    burstConfetti();

    // disable further clicks
    heart.style.pointerEvents = 'none';
  });

  const baseMessage = `Kal jo maine lunch wale time bola na... woh sirf mazak tha.

But mujhe baad me realize hua ki shayad woh moment thoda awkward lag gaya hoga. Main kisi bhi tarah teri insult karna toh door, mazak me bhi kuch aisa nahi chahunga jo tujhe bura lage.

Tu genuinely achhi lagti hai mujhe as a person, isliye teri respect mere liye important hai. Main kabhi bhi tera mazak nahi udata — agar maine bura feel karaya ho toh sach me sorry bolta hoon.

Man jao Madam, please — Chowmin khilaunga. 🍜`;

  function getFinal(){
    const params = new URLSearchParams(location.search);
    const to = params.get('to') || '';
    const from = params.get('from') || '';
    const header = to ? `${to},\n\n` : '';
    const footer = from ? `\n\n— ${from}` : '';
    return header + baseMessage + footer;
  }

  copyBtn.addEventListener('click', async ()=>{
    const text = getFinal();
    try{
      await navigator.clipboard.writeText(text);
      alert('Message copied — ab paste karke bhej de 😊');
    }catch(e){
      prompt('Copy this text', text);
    }
  });

  waBtn.addEventListener('click', ()=>{
    const text = encodeURIComponent(getFinal());
    const waUrl = `https://wa.me/?text=${text}`;
    window.open(waUrl, '_blank');
  });

  // Accessibility: allow Enter/Space to activate heart button
  heart.addEventListener('keydown', (e)=>{
    if(e.key === 'Enter' || e.key === ' '){
      e.preventDefault();
      heart.click();
    }
  });

})();
