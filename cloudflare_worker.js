const form = document.getElementById("reviewForm");
const statusText = document.getElementById("status");
const LIMIT_HOURS = 0;
const STORAGE_KEY = "lastReviewTime";

function canSubmit() {
  const last = localStorage.getItem(STORAGE_KEY);
  if (!last) return true;
  const lastTime = parseInt(last, 10);
  const now = Date.now();
  return now - lastTime >= LIMIT_HOURS * 60 * 60 * 1000;
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  if (!canSubmit()) {
    statusText.textContent = "You can submit again after 6 hours ⏳";
    return;
  }

  const name = document.getElementById("name").value.trim();
  const message = document.getElementById("message").value.trim();
  const avatarUrl = document.getElementById("avatar").value.trim();

  statusText.textContent = "Sending...";

  try {
    const res = await fetch("https://comment.zaki76785.workers.dev", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, message, avatarUrl })
    });

    if (res.ok) {
      statusText.textContent = "Thanks for your review 💙";
      form.reset();
      localStorage.setItem(STORAGE_KEY, Date.now());
    } else {
      statusText.textContent = "Something went wrong.";
    }
  } catch {
    statusText.textContent = "Network error.";
  }
});
