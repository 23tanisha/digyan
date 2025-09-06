// Unified script for AJAX navigation, mobile menu, and small UI behaviors

// Helper: load a page fragment and inject into #mainContent
async function ajaxLoad(href, push=true) {
  try {
    const resp = await fetch(href, {cache: "no-store"});
    if (!resp.ok) throw new Error("Failed to load");
    const text = await resp.text();
    // We expect fragments (or full pages) — extract <body> if present
    let content = text;
    const bodyStart = text.toLowerCase().indexOf("<body");
    if (bodyStart !== -1) {
      const start = text.indexOf(">", bodyStart) + 1;
      const end = text.toLowerCase().lastIndexOf("</body>");
      if (start && end) content = text.slice(start, end);
    }
    document.getElementById("mainContent").innerHTML = content;
    // run any needed initializers after injecting
    initUI();
    if (push) history.pushState({page: href}, "", href);
    window.scrollTo(0,0);
  } catch (err) {
    console.error("AJAX load error:", err);
    // fallback: full navigation
    window.location.href = href;
  }
}

// Intercept link clicks with data-link attribute
document.addEventListener("click", function(e) {
  const a = e.target.closest("a[data-link]");
  if (a) {
    e.preventDefault();
    const href = a.getAttribute("href");
    ajaxLoad(href);
  }
});

// Handle back/forward
window.addEventListener("popstate", function(e) {
  const href = (e.state && e.state.page) || location.pathname.split("/").pop() || "index.html";
  ajaxLoad(href, false);
});

// Mobile hamburger toggle
function setupMobileNav() {
  const ham = document.getElementById("hamburger");
  const mobileNav = document.getElementById("mobileNav");
  if (!ham || !mobileNav) return;
  ham.onclick = () => {
    const open = mobileNav.style.display === "block";
    mobileNav.style.display = open ? "none" : "block";
    mobileNav.setAttribute("aria-hidden", open ? "true" : "false");
  };
  // close on outside click
  document.addEventListener("click", function(e){
    if (!mobileNav.contains(e.target) && !ham.contains(e.target)) {
      mobileNav.style.display = "none";
      mobileNav.setAttribute("aria-hidden", "true");
    }
  });
}

// Small UI initializers
function initUI() {
  // Reveal on scroll (from original)
  const reveals = document.querySelectorAll(".reveal");
  for (let i=0;i<reveals.length;i++){
    let windowHeight = window.innerHeight;
    let elementTop = reveals[i].getBoundingClientRect().top;
    let elementVisible = 100;
    if (elementTop < windowHeight - elementVisible) {
      reveals[i].classList.add("active");
    } else {
      reveals[i].classList.remove("active");
    }
  }

  // Attach add course button if present
  const addBtn = document.getElementById("addCourseBtn");
  if (addBtn) {
    addBtn.addEventListener("click", function(){
      const cart = document.getElementById("cartInfo");
      if (cart) cart.style.display = "block";
      const total = document.getElementById("totalAmount");
      if (total) total.innerText = "2999";
      // store in localStorage
      const courses = JSON.parse(localStorage.getItem("courses")||"[]");
      courses.push({name:"Full Stack Development Course", price:2999});
      localStorage.setItem("courses", JSON.stringify(courses));
    });
  }

  const proceedBtn = document.getElementById("proceedCheckout");
  if (proceedBtn) {
    proceedBtn.addEventListener("click", function(){ ajaxLoad("checkout.html"); });
  }

  // Modal handlers in Free_Counselling fragment if present
  const form = document.getElementById("counsellingForm");
  if (form) {
    form.addEventListener("submit", function(e){
      e.preventDefault();
      const formData = new FormData(form);
      const encoded = new URLSearchParams(formData);
      // try to POST (will fail locally — user can set to a real endpoint)
      fetch(form.action || "#", { method: form.method || "POST", body: encoded })
        .then(res => {
          form.reset();
          // show a simple thank you (modal may not exist)
          const modal = document.getElementById("thankYouModal");
          if (modal) { modal.style.display = "flex"; document.getElementById("pageContent")?.classList?.add("blurred"); }
        }).catch(err=>{
          console.warn("Form submit (AJAX) failed locally:", err);
          const msg = document.getElementById("formMessage");
          if (msg) msg.innerText = "Submission failed (offline).";
        });
    });
  }

  // Payment popup buttons
  const payBtn = document.getElementById("payNowBtn");
  if (payBtn) {
    payBtn.addEventListener("click", function(){ alert("📢 Please make the payment of ₹2999 on this GPay number: +91 7305510181"); });
  }

  // close popup close buttons
  const closeBtn = document.querySelectorAll(".close-btn");
  closeBtn.forEach(btn => btn.addEventListener("click", function(){ btn.closest(".popup")?.style?.setProperty("display","none"); }));

  // init mobile nav each time a fragment loads (to rebind elements)
  setupMobileNav();
}

// On initial load
document.addEventListener("DOMContentLoaded", function(){
  // Enhance links that are normal anchors to use data-link if internal
  document.querySelectorAll('a[href]').forEach(a=>{
    const href = a.getAttribute('href');
    if (href && !href.startsWith("http") && !href.startsWith("mailto:") && !href.startsWith("tel:") && !a.dataset.link) {
      a.setAttribute('data-link','');
    }
  });
  initUI();
});
