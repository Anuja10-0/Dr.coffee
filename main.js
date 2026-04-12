const menuBtn = document.getElementById("menu-btn");
const navLinks = document.getElementById("nav-links");
const menuBtnIcon = menuBtn.querySelector("i");

menuBtn.addEventListener("click", () => {
  navLinks.classList.toggle("open");

  const isOpen = navLinks.classList.contains("open");
  menuBtnIcon.className = isOpen
    ? "ri-close-line"
    : "ri-menu-3-line";
});

navLinks.addEventListener("click", () => {
  navLinks.classList.remove("open");
  menuBtnIcon.className = "ri-menu-3-line";
});

function toggleReadMore() {    
  const moreText = document.querySelector(".more-text");
  const btn = document.querySelector(".read-more-btn");

  if (!moreText || !btn) return;

  moreText.classList.toggle("show");
  btn.textContent = moreText.classList.contains("show") 
    ? "Read Less"
    : "Read More";
}
  

const scrollRevealOption = {
  distance: "50px",
  origin: "bottom",
  duration: 1000,
  easing: "ease-in-out",
  reset: false,
};


ScrollReveal().reveal(".header__container h1", scrollRevealOption);
ScrollReveal().reveal(".header__container p", {
  ...scrollRevealOption,
  delay: 200,
}); 
ScrollReveal().reveal(".header__btns", {
  ...scrollRevealOption,
  delay: 400,
});


ScrollReveal().reveal(".about__image img", {
  ...scrollRevealOption,
  origin: "right",
});

ScrollReveal().reveal(".about__content h2", {
  ...scrollRevealOption,
  delay: 200,
});

ScrollReveal().reveal(".about__content p", {
  ...scrollRevealOption,
  delay: 400,
  interval: 150,
});
function bookTable(event) {
  event.preventDefault();

  const firstName = document.getElementById("firstName").value;
  const lastName = document.getElementById("lastName").value;
  const email = document.getElementById("email").value;
  const contact = document.getElementById("contact").value;
  const tableNo = document.getElementById("table_no").value;


  let date = document.getElementById("date").value;

// convert ANY format to YYYY-MM-DD
const d = new Date(date);
date = d.getFullYear() + "-" +
       String(d.getMonth() + 1).padStart(2, "0") + "-" +
       String(d.getDate()).padStart(2, "0");

console.log("Final Date:", date);
  const data = {
    name: firstName + " " + lastName,
    email: email,
    contact: contact,
     table_no: tableNo,
    date: date
  };

  fetch("http://localhost:5000/reserve", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })
  .then(res => res.text())
  .then(response => {
    alert(response);
  })
  .catch(err => {
    console.log(err);
    alert("Error");
  });
}
// ================= ORDER SYSTEM =================
let order = [];
let total = 0;

// Add item to order
function addToOrder(name, price) {
  order.push({ name, price });
  total += price;
  updateBill();
}

// Update bill UI
function updateBill() {
  const list = document.getElementById("orderList");
  const totalAmount = document.getElementById("totalAmount");

  if (!list || !totalAmount) return;

  list.innerHTML = "";

  order.forEach(item => {
    const li = document.createElement("li");
    li.textContent = item.name + " - ₹" + item.price;
    list.appendChild(li);
  });

  totalAmount.textContent = total;
}

// ================= CONFIRM POPUP =================
function openConfirm() {
  document.getElementById("confirmBox").classList.remove("hidden");
}

function closeConfirm() {
  document.getElementById("confirmBox").classList.add("hidden");
}

// ================= SAVE ORDER =================
function confirmOrder() {
  closeConfirm();

  //  prevent empty order
  if (order.length === 0) {
    alert("Please select items ❗");
    return;
  }

  const tableNo = document.getElementById("table_no")?.value || 1;

  // convert items to string
  const itemsList = order.map(item => item.name).join(", ");

  fetch("http://localhost:5000/order", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      table_no: tableNo,
      items: itemsList,
      total: total
    })
  })
  .then(res => res.text())
  .then(msg => {
    alert(msg);

    // store for bill page
    localStorage.setItem("order", JSON.stringify(order));
    localStorage.setItem("total", total);

    // redirect
    window.location.href = "bill.html";
  })
  .catch(err => {
    console.log(err);
    alert("Error");
  });
}
const items = JSON.parse(dataFromDB);

items.forEach(item => {
  console.log(item.name + " ₹" + item.price);
});
//SELECT * FROM orders\G