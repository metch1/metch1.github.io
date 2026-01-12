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
      case "instagram": iconClass = "bxl-instagram"; break;
      case "tiktok": iconClass = "bxl-tiktok"; break;
      case "youtube": iconClass = "bxl-youtube"; break;
      case "linkedin": iconClass = "bxl-linkedin"; break;
      case "twitter": iconClass = "bxl-twitter"; break;
      case "discord": iconClass = "bxl-discord"; break;
      case "carrd": iconClass = "bxs-credit-card-front"; break;
      default: iconClass = "bxs-link"; // fallback for unknown
    }

    popupSocials.innerHTML += `
      <a href="${link}" target="_blank" class="popup-social-link">
        <i class='bx ${iconClass}'></i>
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
