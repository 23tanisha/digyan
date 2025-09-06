// Unified script for AJAX navigation, mobile menu, and small UI behaviors

// Helper: load a page fragment and inject into #mainContent
async function ajaxLoad(href, push = true) {
    try {
        const resp = await fetch(href, { cache: "no-store" });
        if (!resp.ok) throw new Error("Failed to load");
        const text = await resp.text();
        // Simple: replace #mainContent, or use whole body if not fragment
        let content = text;
        const mainMatch = text.match(/<main[^>]*>([\\s\\S]*?)<\\/main>/i);
        if (mainMatch) content = mainMatch[2];
        document.getElementById("mainContent").innerHTML = content;
        initUI();
        if (push) history.pushState({ page: href }, "", href);
        window.scrollTo(0, 0);
    } catch (err) {
        console.error("AJAX load error:", err);
        window.location.href = href; // fallback
    }
}

// Intercept link clicks with data-link attribute
document.addEventListener("click", function (e) {
    const a = e.target.closest("a[data-link]");
    if (a) {
        e.preventDefault();
        const href = a.getAttribute("href");
        ajaxLoad(href);
    }
});

// Handle back/forward navigation
window.addEventListener("popstate", function (e) {
    const href = (e.state && e.state.page) || location.pathname.split("/").pop() || "index.html";
    ajaxLoad(href, false);
});

// Hamburger/mobile nav toggle logic
function setupMobileNav() {
    const ham = document.getElementById("hamburger");
    const mobileNav = document.getElementById("mobileNav");
    if (!ham || !mobileNav) return;

    ham.onclick = () => {
        const open = mobileNav.style.display === "block";
        mobileNav.style.display = open ? "none" : "block";
        mobileNav.setAttribute("aria-hidden", open ? "true" : "false");
    };
    // Close when clicking outside mobileNav or hamburger
    document.addEventListener("click", function (e) {
        if (!mobileNav.contains(e.target) && !ham.contains(e.target)) {
            mobileNav.style.display = "none";
            mobileNav.setAttribute("aria-hidden", "true");
        }
    });
}

// UI initializers for reveals and touch usability
function initUI() {
    // Reveal animation on scroll (simple fade)
    const reveals = document.querySelectorAll(".reveal");
    for (let i = 0; i < reveals.length; i++) {
        const windowHeight = window.innerHeight;
        const elementTop = reveals[i].getBoundingClientRect().top;
        if (elementTop < windowHeight - 50) {
            reveals[i].classList.add("active");
        } else {
            reveals[i].classList.remove("active");
        }
    }
    // Other scripts: focus, form validation, etc. can go here
    setupMobileNav();
}

// Ensure setupMobileNav logic runs on DOM ready
if (document.readyState !== "loading") {
    setupMobileNav();
    initUI();
} else {
    document.addEventListener("DOMContentLoaded", () => {
        setupMobileNav();
        initUI();
    });
}

// Optional: Make all tap targets large enough for touch
function enhanceTouchTargets() {
    document.querySelectorAll('.btn, button, input, .hamburger, .mobile-nav a')
        .forEach(el => {
            el.style.minWidth = "48px";
            el.style.minHeight = "48px";
        });
}
enhanceTouchTargets();
