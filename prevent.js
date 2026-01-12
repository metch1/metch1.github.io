const style = document.createElement("style");
style.textContent = `
#block-toast {
  position: fixed;
  bottom: 24px;
  left: 50%;
  transform: translateX(-50%) translateY(10px);
  background: #fff;
  color: #111;
  padding: 8px 14px;
  font-size: 13px;
  border-radius: 8px;
  box-shadow: 0 10px 25px rgba(0,0,0,0.15);
  opacity: 0;
  pointer-events: none;
  transition: 0.25s ease;
  z-index: 9999;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, sans-serif;
}

#block-toast.show {
  opacity: 1;
  transform: translateX(-50%) translateY(0);
}
`;
document.head.appendChild(style);
let toastTimeout;

function showToast(message) {
  let toast = document.getElementById("block-toast");

  if (!toast) {
    toast = document.createElement("div");
    toast.id = "block-toast";
    document.body.appendChild(toast);
  }

  toast.textContent = message;
  toast.classList.add("show");

  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toast.classList.remove("show");
  }, 1600);
}
document.addEventListener("contextmenu", e => {
  e.preventDefault();
  showToast("Action blocked");
});
document.addEventListener("keydown", e => {
  const key = e.key.toLowerCase();

  if (
    e.key === "F12" ||
    (e.ctrlKey && e.shiftKey && ["i", "j", "c"].includes(key)) ||
    (e.ctrlKey && key === "u")
  ) {
    e.preventDefault();
    showToast("you don't actually need this");
  }
});
