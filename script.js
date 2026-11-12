const q=document.getElementById('q'),out=document.getElementById('results');
let data=null;
async function load(){if(!data){const r=await fetch('travel_recommendation_api.json');data=await r.json();}return data;}
function card(i){return `<article class="card"><img src="${i.imageUrl}" alt="${i.name}"><div><h3>${i.name}</h3><p>${i.description}</p></div></article>`;}
async function search(){
  const t=q.value.trim().toLowerCase();if(!t){out.innerHTML='';return;}
  const d=await load();let res=[];
  if(t.startsWith('beach'))res=d.beaches;
  else if(t.startsWith('temple'))res=d.temples;
  else if(t.startsWith('countr'))res=d.countries.flatMap(c=>c.cities);
  else{const c=d.countries.find(c=>c.name.toLowerCase()===t||t.includes(c.name.toLowerCase()));if(c)res=c.cities;}
  out.innerHTML=res.length?res.map(card).join(''):'<p class="msg">No matches. Try "beach", "temple", "country", or a country name like Japan.</p>';
}
function reset(){q.value='';out.innerHTML='';}
document.getElementById('go')?.addEventListener('click',search);
document.getElementById('reset')?.addEventListener('click',reset);
q?.addEventListener('keydown',e=>{if(e.key==='Enter')search();});
