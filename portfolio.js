document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryContainer = document.querySelector('.gallery-grid');

    // Load gallery items from JSON
    fetch('gallery.json')
        .then(res => res.json())
        .then(data => {
            data.forEach(item => {
                const card = document.createElement('div');
                card.classList.add('portfolio-item', item.type);
                card.setAttribute('data-category', item.type);

                card.innerHTML = `
                    <div class="portfolio-card">
                        <div class="portfolio-media">
                            ${item.type === 'video' ? `
                                <video controls poster="${item.thumb}">
                                    <source src="${item.video}" type="video/mp4">
                                    Your browser does not support the video tag.
                                </video>
                                <div class="play-button">
                                    <i class='bx bx-play-circle'></i>
                                </div>
                            ` : `<img src="${item.thumb}" alt="${item.title}">`}
                        </div>
                        <div class="portfolio-info">
                            <h3>${item.title}</h3>
                            <p>${item.desc}</p>
                            <span class="portfolio-tag">${item.tag}</span>
                        </div>
                    </div>
                `;

                galleryContainer.appendChild(card);
            });

            // After gallery is loaded, apply filter functionality
            const portfolioItems = document.querySelectorAll('.portfolio-item');

            filterButtons.forEach(button => {
                button.addEventListener('click', function() {
                    filterButtons.forEach(btn => btn.classList.remove('active'));
                    this.classList.add('active');

                    const filterValue = this.getAttribute('data-filter');

                    portfolioItems.forEach(item => {
                        if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                            item.classList.remove('hidden');
                        } else {
                            item.classList.add('hidden');
                        }
                    });
                });
            });
        })
        .catch(err => console.error('Failed to load gallery.json:', err));
});
