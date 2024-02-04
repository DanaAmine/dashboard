const sideMenu = document.querySelector("aside");
const menuBtn = document.getElementById("menu-btn");
const closeBtn = document.getElementById("close-btn");
const showingLink = document.getElementById("showing");
const darkMode = document.querySelector(".dark-mode");

menuBtn.addEventListener("click", toggleMenu);
closeBtn.addEventListener("click", toggleMenu);
darkMode.addEventListener("click", toggleDarkMode);


toggleDarkMode()
async function fetchData() {
  try {
    var tech = "aHR0cHM6Ly9zZWN1cml0eWRhc2hib2FyZC5vbnJlbmRlci5jb20vYXBpL3VzZXJz";
    const response = await fetch(atob(tech));
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

function toggleMenu() {
  sideMenu.style.display = sideMenu.style.display === "block" ? "none" : "block";
}

function toggleDarkMode() {
  document.body.classList.toggle("dark-mode-variables");
  darkMode.querySelectorAll("span").forEach(span => span.classList.toggle("active"));
}

function clearTable() {
  const tbody = document.querySelector("table tbody");
  tbody.innerHTML = "";
}

function createTableRow(user) {
  return `
    <tr>
      <td>${user.username}</td>
      <td>${user.points}</td>
      <td class="${user.task === "pending" ? "warning" : "primary"}">${user.task}</td>
      <td class="${user.activity === "inactive" ? "danger" : user.activity === "pending" ? "warning" : "primary"}">${user.activity}</td>
      <td class="primary">Details</td>
    </tr>
  `;
}

async function showAll() {
  try {
    const data = await fetchData();
    if (data.status === "success") {
      const users = data.data.sort((a, b) => b.points - a.points);
      clearTable();
      users.forEach(user => {
        document.querySelector("table tbody").innerHTML += createTableRow(user);
      });
    } else {
      console.error("Failed to fetch users:", data.error);
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

async function showTopThree() {
  try {
    const data = await fetchData();
    if (data.status === "success") {
      const users = data.data.sort((a, b) => b.points - a.points).slice(0, 3);
      clearTable();
      users.forEach(user => {
        document.querySelector("table tbody").innerHTML += createTableRow(user);
      });
    } else {
      console.error("Failed to fetch users:", data.error);
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

let hided = true;
function toggleShow() { 
  if (hided) {
    showAll();
    console.log(hided)
    showingLink.textContent = "Hide";
    // btn.textContent = "Hide"; 
    hided = false;
    console.log(hided)

  } else {
    showTopThree(); // Changed from showTopThree to hide
    showingLink.textContent = "Show All";
    hided = true;
  }
}
showTopThree()

showingLink.addEventListener("click", toggleShow);
