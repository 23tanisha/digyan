// =============================

// Scroll Reveal Animation

// =============================

function revealOnScroll() {

  const reveals = document.querySelectorAll(".reveal");

  for (let i = 0; i < reveals.length; i++) {

    let windowHeight = window.innerHeight;

    let elementTop = reveals[i].getBoundingClientRect().top;

    let elementVisible = 100;

    if (elementTop < windowHeight - elementVisible) {

      reveals[i].classList.add("active");

    } else {

      reveals[i].classList.remove("active");

    }

  }

}

window.addEventListener("scroll", revealOnScroll);

revealOnScroll();

// =============================

// Add Course Button

// =============================

document.getElementById("addCourseBtn").addEventListener("click", function() {

  document.getElementById("cartInfo").style.display = "block";

  document.getElementById("totalAmount").innerText = "2999";

});

// =============================

// Proceed to Checkout Button

// =============================

document.getElementById("checkoutBtn").addEventListener("click", function() {

  document.getElementById("checkoutBox").style.display = "block";

});

// =============================

// Pay Now Button → Show Alert

// =============================

document.getElementById("payNowBtn").addEventListener("click", function() {

  alert("📢 Please make the payment of ₹2999 on this GPay number: +91 7305510181");

});
 