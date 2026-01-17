document.addEventListener('DOMContentLoaded', () => {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const galleryContainer = document.querySelector('.gallery-grid');

  fetch('gallery.json')
    .then(res => res.json())
    .then(items => {
      items.forEach((item, index) => {
        const card = document.createElement('figure');
        card.className = `portfolio-item ${item.type}`;
        card.dataset.category = item.type;

        card.innerHTML = `
          <div class="portfolio-card">
            <div class="portfolio-media">
              ${
                item.type === 'video'
                  ? `
                    <video
                      controls
                      preload="metadata"
                      poster="${item.thumb}"
                      aria-label="${item.title} – ${item.desc}"
                    >
                      <source src="${item.video}" type="video/webm">
                      Your browser does not support the video tag.
                    </video>
                  `
                  : `
                    <img
                      src="${item.thumb}"
                      alt="${item.title} – ${item.desc} by MetcHI"
                      loading="lazy"
                      decoding="async"
                    >
                  `
              }
            </div>

            <figcaption class="portfolio-info">
              <h3>${item.title}</h3>
              <p>${item.desc}</p>
              <span class="portfolio-tag">${item.tag}</span>
            </figcaption>
          </div>
        `;

        galleryContainer.appendChild(card);
      });

      // FILTERING
      const portfolioItems = document.querySelectorAll('.portfolio-item');

      filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
          filterButtons.forEach(b => b.classList.remove('active'));
          btn.classList.add('active');

          const filter = btn.dataset.filter;

          portfolioItems.forEach(item => {
            item.classList.toggle(
              'hidden',
              filter !== 'all' && item.dataset.category !== filter
            );
          });
        });
      });
    })
    .catch(err => console.error('Failed to load gallery:', err));
});
