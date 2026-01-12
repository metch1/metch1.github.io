const container = document.querySelector(".review-container");

fetch("reviews.json")
  .then(res => res.json())
  .then(reviews => {
    reviews.forEach(review => {
      const card = document.createElement("div");
      card.className = "review-card";

      // Convert the socials object to a JSON string for the data attribute
      const socialsData = review.socials ? JSON.stringify(review.socials) : "{}";

      card.innerHTML = `
        <img 
          src="${review.avatar || "REVIEWS_BOT.png"}"
          class="review-pfp"
          alt="${review.name}"
          data-name="${review.name}"
          data-bio="${review.bio || ""}"
          data-socials='${socialsData}'
        >
        <div class="review-content">
          <span class="review-author">${review.name}</span>
          <p class="review-text text-top">${review.text}</p>
        </div>
      `;

      container.appendChild(card);
    });
  })
  .catch(err => {
    console.error("Failed to load reviews:", err);
  });
