const matchButton = document.querySelector("#matchButton");
const matchResult = document.querySelector("#matchResult");
const fromInput = document.querySelector("#fromInput");
const toInput = document.querySelector("#toInput");
const steps = [...document.querySelectorAll(".step")];
const toggles = [...document.querySelectorAll(".toggle-option")];
const pulseTicker = document.querySelector("#pulseTicker");

const personaData = {
  sender: {
    kicker: "For senders",
    title: "Why pay more to wait three days?",
    copy:
      "Send documents, gadgets, and small packages with a trusted student traveler for a fraction of standard interstate courier pricing.",
    amount: "₦12,800",
    hint: "Compared with a typical express courier quote."
  },
  traveler: {
    kicker: "For travelers",
    title: "Clear your transport fare before you even board.",
    copy:
      "Traveling from Kano to Ilorin this weekend? Fill your empty baggage allowance with verified lightweight parcels and earn along your normal route.",
    amount: "₦9,500",
    hint: "Potential earning from two small verified parcels."
  }
};

const fallbackPulse = [
  { status: "Active Match", item: "Laptop", route: "BUK New Campus to Lagos via Rano Air" },
  { status: "Delivered", item: "Credentials", route: "Safely verified at BUK Old Campus" },
  { status: "Escrow Released", item: "Phone charger kit", route: "Kano Line to Ilorin" },
  { status: "OTP Confirmed", item: "Admission files", route: "Sabon Gari to ABU Zaria" },
  { status: "Traveler Accepted", item: "Small parcel", route: "Kofar Ruwa to Hotoro" }
];

function findCommuters() {
  const from = fromInput.value.trim() || "your pickup";
  const to = toInput.value.trim() || "your destination";
  const count = Math.max(2, Math.min(8, Math.ceil((from.length + to.length) / 5)));
  matchResult.textContent = `${count} trusted commuters on ${from} to ${to} right now.`;
}

function rotateHandshake() {
  let index = 0;
  window.setInterval(() => {
    steps.forEach((step) => step.classList.remove("active"));
    steps[index].classList.add("active");
    index = (index + 1) % steps.length;
  }, 1800);
}

function setPersona(persona) {
  const content = personaData[persona];
  document.querySelector("#personaKicker").textContent = content.kicker;
  document.querySelector("#personaTitle").textContent = content.title;
  document.querySelector("#personaCopy").textContent = content.copy;
  document.querySelector("#personaAmount").textContent = content.amount;
  document.querySelector("#personaHint").textContent = content.hint;

  toggles.forEach((toggle) => {
    const isActive = toggle.dataset.persona === persona;
    toggle.classList.toggle("active", isActive);
    toggle.setAttribute("aria-selected", String(isActive));
  });
}

function normalizeOrders(orders) {
  if (!Array.isArray(orders)) return fallbackPulse;

  return orders.slice(0, 8).map((order) => ({
    status: order.status || order.state || "Active Match",
    item: order.item || order.package_name || order.description || "Verified parcel",
    route:
      order.route ||
      [order.pickup, order.destination].filter(Boolean).join(" to ") ||
      "Trusted route in progress"
  }));
}

function renderPulse(items) {
  const doubled = [...items, ...items];
  pulseTicker.innerHTML = doubled
    .map(
      (item) =>
        `<span class="ticker-item"><strong>[${item.status}]</strong> ${item.item} - ${item.route}</span>`
    )
    .join("");
}

async function loadPulse() {
  try {
    const response = await fetch("/api/orders", { headers: { Accept: "application/json" } });
    if (!response.ok) throw new Error("No live orders available");
    const data = await response.json();
    renderPulse(normalizeOrders(data));
  } catch {
    renderPulse(fallbackPulse);
  }
}

matchButton.addEventListener("click", findCommuters);
toggles.forEach((toggle) => {
  toggle.addEventListener("click", () => setPersona(toggle.dataset.persona));
});

rotateHandshake();
loadPulse();
