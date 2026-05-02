document.addEventListener('DOMContentLoaded',()=>{
  const loader=document.getElementById('page-loader');
  window.addEventListener('load',()=>setTimeout(()=>loader?.classList.add('hide'),500));

  const cursorDot=document.querySelector('.cursor-dot');
  const cursorOutline=document.querySelector('.cursor-outline');
  let ox=0,oy=0;
  document.addEventListener('mousemove',(e)=>{cursorDot.style.transform=`translate(${e.clientX}px,${e.clientY}px)`;ox+=(e.clientX-ox)*0.15;oy+=(e.clientY-oy)*0.15;cursorOutline.style.transform=`translate(${ox-10}px,${oy-10}px)`});

  const typing=document.querySelector('.typing-text');
  if(typing){const text=typing.dataset.text||'';let i=0;const t=()=>{typing.textContent=text.slice(0,i++)+(i%4===0?'|':'');if(i<=text.length+1)setTimeout(t,55)};t();}

  document.querySelectorAll('.particle-bg').forEach(bg=>{for(let i=0;i<40;i++){const p=document.createElement('span');p.style.cssText=`position:absolute;width:${Math.random()*3+1}px;height:${Math.random()*3+1}px;background:#fff;border-radius:50%;left:${Math.random()*100}%;top:${Math.random()*100}%;opacity:${Math.random()*0.5};animation:float ${Math.random()*8+6}s linear infinite`;bg.appendChild(p)}});
  const st=document.createElement('style');st.textContent='@keyframes float{0%{transform:translateY(0)}100%{transform:translateY(-35px)}}';document.head.appendChild(st);

  const sections=document.querySelectorAll('section,header');const navLinks=document.querySelectorAll('nav a');
  const io=new IntersectionObserver((entries)=>{entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('in');if(e.target.matches('section,header')){const id=e.target.id;navLinks.forEach(l=>l.classList.toggle('active',l.getAttribute('href')===`#${id}`));}})},{threshold:.2});
  document.querySelectorAll('.reveal,section,header').forEach(el=>io.observe(el));

  const skillsObserver=new IntersectionObserver((entries)=>{entries.forEach(entry=>{if(entry.isIntersecting){entry.target.querySelectorAll('.skill-bar-fill').forEach(bar=>bar.style.width=(bar.dataset.level||0)+'%')}})},{threshold:.45});
  const skillsSection=document.querySelector('#skills');if(skillsSection)skillsObserver.observe(skillsSection);

  const themeBtn=document.getElementById('theme-toggle');
  const applyTheme=(m)=>{document.body.classList.toggle('light',m==='light');themeBtn.innerHTML=m==='light'?'<i class="fa-solid fa-sun"></i>':'<i class="fa-solid fa-moon"></i>';localStorage.setItem('theme',m)};
  applyTheme(localStorage.getItem('theme')||'dark');
  themeBtn?.addEventListener('click',()=>applyTheme(document.body.classList.contains('light')?'dark':'light'));

  window.addEventListener('scroll',()=>{const y=window.scrollY*0.15;document.querySelectorAll('.parallax').forEach(s=>s.style.backgroundPosition=`50% ${y}px`)});

  document.querySelectorAll('.ripple-btn').forEach(btn=>btn.addEventListener('click',e=>{const r=document.createElement('span');const rect=btn.getBoundingClientRect();const size=Math.max(rect.width,rect.height);r.style.cssText=`position:absolute;width:${size}px;height:${size}px;border-radius:50%;left:${e.clientX-rect.left-size/2}px;top:${e.clientY-rect.top-size/2}px;background:#ffffff66;transform:scale(0);animation:ripple .6s ease`;btn.appendChild(r);setTimeout(()=>r.remove(),620)}));
  const rstyle=document.createElement('style');rstyle.textContent='@keyframes ripple{to{transform:scale(2);opacity:0}}';document.head.appendChild(rstyle);

  const contactForm=document.querySelector('.contact-form-wrapper form');
  contactForm?.addEventListener('submit',(e)=>{e.preventDefault();const msg=document.querySelector('.success-message');msg.textContent='✅ Message sent successfully! I will get back to you soon.';msg.animate([{opacity:0,transform:'translateY(8px)'},{opacity:1,transform:'translateY(0)'}],{duration:420,fill:'forwards'});contactForm.reset();});
});
