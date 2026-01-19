const f = document.getElementById("reviewForm");
const s = document.getElementById("status");
const H = 6 * 36e5, K = "lastReviewTime", T = "t";

sessionStorage[T] ||= Date.now();

const ok = () => !localStorage[K] || Date.now() - localStorage[K] >= H;

f.addEventListener("submit", async e => {
  e.preventDefault();

  if (Date.now() - sessionStorage[T] < 3e3)
    return s.textContent = "Wait a moment ⏳";

  if (!ok())
    return s.textContent = "Try again later ⏳";

  const name = f.name.value.trim();
  const message = f.message.value.trim();
  const avatarUrl = f.avatar.value.trim();

  if (name.length < 2 || message.length < 5)
    return s.textContent = "Fill the form properly.";

  s.textContent = "Sending...";

  try {
    const r = await fetch("https://comment.zaki76785.workers.dev", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, message, avatarUrl })
    });

    if (!r.ok) throw 0;

    s.textContent = "Thanks 💙";
    f.reset();
    localStorage[K] = Date.now();
  } catch {
    s.textContent = "Error.";
  }
});
