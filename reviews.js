fetch('reviews.json').then(r=>r.json()).then(d=>{
  const c=document.getElementById('reviewsContainer');
  d.reviewsContainer.forEach(col=>{
    const colDiv=document.createElement('div');
    colDiv.className='reviews-column';
    colDiv.innerHTML=`<div class="reviews-track-${col.column}"></div>`;
    const track=colDiv.firstChild;
    col.reviews.forEach(r=>{
      track.innerHTML+=`<div class="review-card"><img src="${r.image}" alt="User" class="review-pfp"><div class="review-content"><div class="review-meta"><span class="review-author">${r.author}</span><span class="review-date">${r.date}</span></div><p class="review-text">${r.text}</p></div></div>`;
    });
    c.appendChild(colDiv);
    animateTrack(track,col.column==='down');
  });
}).catch(e=>console.error('Error loading reviews:',e));

/*
function animateTrack(track, down){
  track.innerHTML+=track.innerHTML;
  
  // Wait a tiny bit for DOM to update
  setTimeout(() => {
    let y=down?-track.scrollHeight/2:0, s=0.1; // 0.1 for slow
    
    function animate(){
      y+=down?s:-s;
      if(y<=-track.scrollHeight/2) y=0;
      if(y>=0) y=-track.scrollHeight/2;
      track.style.transform=`translateY(${y}px)`;
      requestAnimationFrame(animate);
    }
    
    requestAnimationFrame(animate);
  }, 50); // 50ms delay
}  */