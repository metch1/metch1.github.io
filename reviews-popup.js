const popup = document.getElementById("reviewPopup");
const popupPfp = document.getElementById("popupPfp");
const popupName = document.getElementById("popupName");
const popupBio = document.getElementById("popupBio");
const popupSocials = document.getElementById("popupSocials");
const closeBtn = document.querySelector(".popup-close");

document.addEventListener("click", (e) => {
  const img = e.target.closest(".review-pfp");
  if (!img) return;

  popupPfp.src = img.src;
  popupName.textContent = img.dataset.name || "";
  popupBio.textContent = img.dataset.bio || "";

  popupSocials.innerHTML = "";

  const socials = JSON.parse(img.dataset.socials || "{}");

  for (const [platform, link] of Object.entries(socials)) {
    let iconClass = "";

    switch(platform.toLowerCase()) {
      case "instagram": iconClass = "bx bxl-instagram"; break;
      case "tiktok": iconClass = "bx bxl-tiktok"; break;
      case "youtube": iconClass = "bx bxl-youtube"; break;
      case "linkedin": iconClass = "bx bxl-linkedin"; break;
      case "twitter": iconClass = "bx bxl-twitter"; break;
      case "discord": iconClass = "bx bxl-discord"; break;
      case "carrd": iconClass = "bx bxs-credit-card-front"; break;
      case "behance": iconClass = "bx bxl-behance"; break;
      default: iconClass = "bx bxl-link"; // fallback for unknown
    }

    popupSocials.innerHTML += `
      <a href="${link}" target="_blank" class="popup-social-link">
        <i class='${iconClass}'></i>
      </a>
    `;
  }

  popup.classList.add("active");
});

closeBtn.addEventListener("click", () => {
  popup.classList.remove("active");
});

popup.addEventListener("click", (e) => {
  if (e.target === popup) {
    popup.classList.remove("active");
  }
});
