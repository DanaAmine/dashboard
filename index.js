const sideMenu = document.querySelector("aside");
const menuBtn = document.getElementById("menu-btn");
const closeBtn = document.getElementById("close-btn");
const btn = document.querySelector(".recent-orders a");
const darkMode = document.querySelector(".dark-mode");

menuBtn.addEventListener("click", () => {
  sideMenu.style.display = "block";
});

closeBtn.addEventListener("click", () => {
  sideMenu.style.display = "none";
});

darkMode.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode-variables");
  darkMode.querySelector("span:nth-child(1)").classList.toggle("active");
  darkMode.querySelector("span:nth-child(2)").classList.toggle("active");
});

Orders.sort(function (a, b) {
  return b.productNumber - a.productNumber;
});

for (let i = 0; i < 3; i++) {
  const tr = document.createElement("tr");
  const trContent = `
        <td>${Orders[i].productName}</td>
        <td>${Orders[i].productNumber}</td>
        <td class="${
          Orders[i].paymentStatus === "pending" ? "warning" : "primary"
        }">${Orders[i].paymentStatus}</td>
        <td class="${
          Orders[i].status === "inActive"
            ? "danger"
            : Orders[i].status === "Pending"
            ? "warning"
            : "primary"
        }">${Orders[i].status}</td>
        <td class="primary">Details</td>
    `;
  tr.innerHTML = trContent;
  document.querySelector("table tbody").appendChild(tr);
}

function clearTable() {
    const tbody = document.querySelector("table tbody");
    tbody.innerHTML = "";
}

function showAll() {
  clearTable();
  Orders.forEach((order) => {
    const tr = document.createElement("tr");
    const trContent = `
            <td>${order.productName}</td>
            <td>${order.productNumber}</td>
            <td class="${
              order.paymentStatus === "pending" ? "warning" : "primary"
            }">${order.paymentStatus}</td>
            <td class="${
              order.status === "inActive"
                ? "danger"
                : order.status === "Pending"
                ? "warning"
                : "primary"
            }">${order.status}</td>
            <td class="primary">Details</td>
        `;
    tr.innerHTML = trContent;
    document.querySelector("table tbody").appendChild(tr);
  });
}

function hide() {
  clearTable();
  for (let i = 0; i < 3; i++) {
    const tr = document.createElement("tr");
    const trContent = `
            <td>${Orders[i].productName}</td>
            <td>${Orders[i].productNumber}</td>
            <td class="${
              Orders[i].paymentStatus === "pending" ? "warning" : "primary"
            }">${Orders[i].paymentStatus}</td>
            <td class="${
              Orders[i].status === "inActive"
                ? "danger"
                : Orders[i].status === "Pending"
                ? "warning"
                : "primary"
            }">${Orders[i].status}</td>
            <td class="primary">Details</td>
        `;
    tr.innerHTML = trContent;
    document.querySelector("table tbody").appendChild(tr);
  }
}

let hided = true;
function toggleShow() {
  if (hided) {
    showAll();
    btn.innerHTML = "Hide";
    hided = false;
  } else {
    hide();
    btn.innerHTML = "Show All";
    hided = true;
  }
}


