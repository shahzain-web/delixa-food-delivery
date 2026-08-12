// ===============================
// 3D Coverflow Premium Testimonial Slider
// ===============================

let testimonialSwiper;

if (document.querySelector(".testimonialSwiper")) {

    testimonialSwiper = new Swiper(".testimonialSwiper", {
        effect: "coverflow",
        grabCursor: true,
        centeredSlides: true,
        loop: true,
        slidesPerView: "auto",
        speed: 1000,

        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
        },

        coverflowEffect: {
            rotate: 15,
            stretch: 0,
            depth: 220,
            modifier: 2,
            slideShadows: false,
            scale: 0.9,
        },

        pagination: {
            el: ".swiper-pagination",
            clickable: true,
            dynamicBullets: true,
        },

        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },

        keyboard: {
            enabled: true,
            onlyInViewport: true,
        },

        mousewheel: {
            forceToAxis: true,
        },

        breakpoints: {
            320: {
                slidesPerView: 1,
                coverflowEffect: {
                    rotate: 10,
                    depth: 120,
                    modifier: 1,
                },
            },

            768: {
                slidesPerView: 2,
                coverflowEffect: {
                    rotate: 15,
                    depth: 180,
                    modifier: 1.5,
                },
            },

            1200: {
                slidesPerView: 3,
                coverflowEffect: {
                    rotate: 15,
                    depth: 220,
                    modifier: 2,
                },
            },
        },

        on: {
            init: function () {
                animateActiveSlide(this);
            },

            slideChangeTransitionStart: function () {
                animateActiveSlide(this);
            }
        }
    });
}

// ===============================
// Premium Active Card Animation
// ===============================

function animateActiveSlide(swiper) {

    document.querySelectorAll(".swiper-slide").forEach(slide => {
        slide.style.opacity = ".55";
        slide.style.transform = "scale(.85)";
    });

    const active = swiper.slides[swiper.activeIndex];

    if (active) {
        active.style.opacity = "1";
        active.style.transform = "scale(1)";
    }
}

// ===============================
// Pause on Hover
// ===============================

const slider = document.querySelector(".testimonialSwiper");

if (slider && testimonialSwiper) {

    slider.addEventListener("mouseenter", () => {
        testimonialSwiper.autoplay.stop();
    });

    slider.addEventListener("mouseleave", () => {
        testimonialSwiper.autoplay.start();
    });

}
//=====================================
//      PREMIUM PRELOADER
//=====================================

window.addEventListener("load", () => {

    const preloader = document.getElementById("preloader");

    // Minimum loading time (1.2 second)
    if (preloader) {
        setTimeout(() => {

            preloader.classList.add("hide");

            // Remove from DOM after animation
            setTimeout(() => {
                preloader.remove();
            }, 800);

        }, 1200);
    }

});
// Premium Counter Animation

const counters = document.querySelectorAll(".counter");

const observer = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            const counter = entry.target;

            const target = +counter.dataset.target;

            let current = 0;

            const increment = target / 100;

            const update = () => {

                if (current < target) {

                    current += increment;

                    counter.innerText = Math.ceil(current);

                    requestAnimationFrame(update);

                } else {

                    counter.innerText = target.toLocaleString();

                }

            }

            update();

            observer.unobserve(counter);

        }

    });

}, { threshold: 0.5 });

counters.forEach(counter => observer.observe(counter));
/*=========================================
        DARK / LIGHT MODE
=========================================*/

const themeToggle = document.getElementById("themeToggle");
if (themeToggle) {
    const body = document.body;
    const themeIcon = themeToggle.querySelector("i");

    // Load Saved Theme
    if (localStorage.getItem("theme") === "dark") {

        body.classList.add("dark-mode");

        themeIcon.classList.remove("fa-moon");
        themeIcon.classList.add("fa-sun");

    }

    // Toggle Theme
    themeToggle.addEventListener("click", () => {

        body.classList.toggle("dark-mode");

        if (body.classList.contains("dark-mode")) {

            themeIcon.classList.remove("fa-moon");
            themeIcon.classList.add("fa-sun");

            localStorage.setItem("theme", "dark");

        } else {

            themeIcon.classList.remove("fa-sun");
            themeIcon.classList.add("fa-moon");

            localStorage.setItem("theme", "light");

        }

    });
}
/*=========================================
      CHECKOUT FORM & SUCCESS POPUP
=========================================*/

const orderBtn = document.querySelector(".place-order-btn");

if (orderBtn) {

    orderBtn.addEventListener("click", function (e) {

        e.preventDefault();

        const name = document.querySelector('input[placeholder="Full Name"]');
        const email = document.querySelector('input[placeholder="Email Address"]');
        const phone = document.querySelector('input[placeholder="Phone Number"]');
        const city = document.querySelector('input[placeholder="City"]');
        const address = document.querySelector("textarea");

        if (
            name.value.trim() === "" ||
            email.value.trim() === "" ||
            phone.value.trim() === "" ||
            city.value.trim() === "" ||
            address.value.trim() === ""
        ) {

            alert("⚠ Please fill all required fields.");

            return;
        }

        // Success Popup

        document.body.insertAdjacentHTML("beforeend", `

        <div class="success-popup">

            <div class="success-box">

                <i class="fas fa-circle-check"></i>

                <h2>Order Placed Successfully!</h2>

                <p>

                    Thank you for choosing Delixa ❤️

                </p>

            </div>

        </div>

        `);

        setTimeout(() => {

            window.location.href = "argo.html";

        }, 3000);

    });

}/*=====================================
        PREMIUM SHOPPING CART
=====================================*/

let cart = JSON.parse(localStorage.getItem("delixaCart")) || [];

const cartItems = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");
const cartCount = document.getElementById("cartCount");

const cartBtn = document.getElementById("cartBtn");
const cartSidebar = document.getElementById("cartSidebar");
const closeCart = document.getElementById("closeCart");

/*=========================
Open / Close Cart
=========================*/

if (cartBtn) {

    cartBtn.onclick = () => {

        cartSidebar.classList.add("active");

    }

}

if (closeCart) {

    closeCart.onclick = () => {

        cartSidebar.classList.remove("active");

    }

}

/*=========================
Add To Cart
=========================*/

document.querySelectorAll(".add-cart").forEach(btn => {

    btn.addEventListener("click", () => {

        const name = btn.dataset.name;
        const price = parseInt(btn.dataset.price);

        const existing = cart.find(item => item.name === name);

        if (existing) {

            existing.qty++;

        }
        else {

            cart.push({

                name: name,
                price: price,
                qty: 1

            });

        }

        saveCart();

    });

});

/*=========================
Save
=========================*/

function saveCart() {

    localStorage.setItem("delixaCart", JSON.stringify(cart));

    renderCart();

}

/*=========================
Render Cart
=========================*/

function renderCart() {

    if (!cartItems) return;

    cartItems.innerHTML = "";

    let total = 0;

    let count = 0;

    if (cart.length === 0) {

        cartItems.innerHTML = "<p class='empty-cart'>Your cart is empty.</p>";

        cartTotal.innerHTML = "Rs.0";

        cartCount.innerHTML = "0";

        return;

    }

    cart.forEach((item, index) => {

        total += item.price * item.qty;

        count += item.qty;

        cartItems.innerHTML += `

<div class="cart-item">

<div>

<h5>${item.name}</h5>

<p>Rs.${item.price}</p>

</div>

<div class="qty-box">

<button onclick="decreaseQty(${index})">-</button>

<span>${item.qty}</span>

<button onclick="increaseQty(${index})">+</button>

</div>

<button class="remove-btn" onclick="removeItem(${index})">

<i class="fas fa-trash"></i>

</button>

</div>

`;

    });

    cartTotal.innerHTML = "Rs." + total;

    cartCount.innerHTML = count;

}

/*=========================
Increase
=========================*/

function increaseQty(index) {

    cart[index].qty++;

    saveCart();

}

/*=========================
Decrease
=========================*/

function decreaseQty(index) {

    if (cart[index].qty > 1) {

        cart[index].qty--;

    }
    else {

        cart.splice(index, 1);

    }

    saveCart();

}

/*=========================
Remove
=========================*/

function removeItem(index) {

    cart.splice(index, 1);

    saveCart();

}

renderCart();

/*=========================
Checkout
=========================*/

const checkoutBtn = document.querySelector(".checkout-btn");

if (checkoutBtn) {

    checkoutBtn.onclick = () => {

        if (cart.length === 0) {

            alert("Your cart is empty!");

            return;

        }

        window.location.href = "checkout.html";

    };

}/*=====================================
      CHECKOUT PAGE
=====================================*/
console.log("Checkout JS Running");
const checkoutItems = document.getElementById("checkoutItems");
const subtotal = document.getElementById("subtotal");
const tax = document.getElementById("tax");
const grandTotal = document.getElementById("grandTotal");

if (checkoutItems) {

    const cart = JSON.parse(localStorage.getItem("delixaCart")) || [];

    let subTotalPrice = 0;

    checkoutItems.innerHTML = "";

    if (cart.length === 0) {

        checkoutItems.innerHTML = `
            <p style="text-align:center;padding:30px;">
                Your cart is empty 🛒
            </p>
        `;

    } else {

        cart.forEach(item => {

            const itemTotal = item.price * item.qty;

            subTotalPrice += itemTotal;

            checkoutItems.innerHTML += `

                <div class="checkout-item">

                    <div>

                        <div class="checkout-name">
                            ${item.name}
                        </div>

                        <div class="checkout-qty">
                            Quantity : ${item.qty}
                        </div>

                    </div>

                    <div class="checkout-price">

                        Rs. ${itemTotal}

                    </div>

                </div>

            `;

        });

    }

    const deliveryFee = 150;

    const taxAmount = Math.round(subTotalPrice * 0.05);

    const finalTotal = subTotalPrice + deliveryFee + taxAmount;

    subtotal.innerHTML = "Rs. " + subTotalPrice;

    tax.innerHTML = "Rs. " + taxAmount;

    grandTotal.innerHTML = "Rs. " + finalTotal;

}/*=====================================
      PLACE ORDER SYSTEM
=====================================*/

const placeOrderBtn = document.getElementById("placeOrder");

if (placeOrderBtn) {

    placeOrderBtn.addEventListener("click", function () {

        const cart = JSON.parse(localStorage.getItem("delixaCart")) || [];

        if (cart.length === 0) {

            alert("Your cart is empty!");

            return;
        }

        alert("🎉 Order Placed Successfully!");

        // Cart Empty
        localStorage.removeItem("delixaCart");

        // Redirect Home Page
        window.location.href = "argo.html";

    });

}
/*=====================================
    LOGIN / SIGNUP MODAL
=====================================*/

const loginForm = document.getElementById("loginForm");
const signupForm = document.getElementById("signupForm");

const showSignup = document.getElementById("showSignup");
const showLogin = document.getElementById("showLogin");

// Login -> Signup
if (showSignup) {

    showSignup.addEventListener("click", function (e) {

        e.preventDefault();

        loginForm.style.display = "none";
        signupForm.style.display = "block";

    });

}

// Signup -> Login
if (showLogin) {

    showLogin.addEventListener("click", function (e) {

        e.preventDefault();

        signupForm.style.display = "none";
        loginForm.style.display = "block";

    });

}

/*=====================================
      SHOW / HIDE PASSWORD
=====================================*/

function togglePassword(inputId, iconId) {

    const input = document.getElementById(inputId);
    const icon = document.querySelector(`#${iconId} i`);

    if (!input || !icon) return;

    if (input.type === "password") {

        input.type = "text";

        icon.classList.remove("fa-eye");
        icon.classList.add("fa-eye-slash");

    } else {

        input.type = "password";

        icon.classList.remove("fa-eye-slash");
        icon.classList.add("fa-eye");

    }

}

const loginEye = document.getElementById("toggleLoginPassword");

if (loginEye) {

    loginEye.addEventListener("click", function () {

        togglePassword("loginPassword", "toggleLoginPassword");

    });

}

const signupEye = document.getElementById("toggleSignupPassword");

if (signupEye) {

    signupEye.addEventListener("click", function () {

        togglePassword("signupPassword", "toggleSignupPassword");

    });

}

/*=====================================
      BASIC VALIDATION
=====================================*/

const signupData = document.getElementById("signupFormData");

if (signupData) {

    signupData.addEventListener("submit", function (e) {

        e.preventDefault();

        const password =
            document.getElementById("signupPassword").value;

        const confirm =
            document.getElementById("confirmPassword").value;

        if (password !== confirm) {

            alert("Passwords do not match!");

            return;

        }

        alert("Account Created Successfully!");

    });

}

const loginData = document.getElementById("loginFormData");

if (loginData) {

    loginData.addEventListener("submit", function (e) {

        e.preventDefault();

        alert("Login Successful!");

    });

}
/*=====================================
      LOCAL STORAGE LOGIN SYSTEM
=====================================*/

// ---------- SIGNUP ----------

const signupFormData = document.getElementById("signupFormData");

if (signupFormData) {

    signupFormData.addEventListener("submit", function (e) {

        e.preventDefault();

        const name = document.getElementById("signupName").value.trim();
        const email = document.getElementById("signupEmail").value.trim();
        const phone = document.getElementById("signupPhone").value.trim();
        const password = document.getElementById("signupPassword").value;
        const confirm = document.getElementById("confirmPassword").value;

        if (password !== confirm) {

            alert("Passwords do not match!");
            return;

        }

        const user = {

            name,
            email,
            phone,
            password

        };

        localStorage.setItem("delixaUser", JSON.stringify(user));

        alert("🎉 Account Created Successfully!");

        signupForm.style.display = "none";
        loginForm.style.display = "block";

    });

}

// ---------- LOGIN ----------

const loginFormData = document.getElementById("loginFormData");

if (loginFormData) {

    loginFormData.addEventListener("submit", function (e) {

        e.preventDefault();

        const email = document.getElementById("loginEmail").value.trim();
        const password = document.getElementById("loginPassword").value;

        const savedUser = JSON.parse(localStorage.getItem("delixaUser"));

        if (!savedUser) {

            alert("No account found. Please Sign Up first.");
            return;

        }

        if (
            email === savedUser.email &&
            password === savedUser.password
        ) {

            alert("✅ Login Successful!");

            localStorage.setItem("isLoggedIn", "true");

            location.reload();

        } else {

            alert("❌ Invalid Email or Password");

        }

    });

}
/*=====================================
      USER SESSION
=====================================*/

const userArea = document.getElementById("userArea");

const currentUser = JSON.parse(localStorage.getItem("delixaUser"));

if (

    userArea &&
    localStorage.getItem("isLoggedIn") === "true" &&
    currentUser

) {

    userArea.innerHTML = `

<button class="btn btn-success dropdown-toggle"

data-bs-toggle="dropdown">

👤 ${currentUser.name}

</button>

<ul class="dropdown-menu">

<li>

<a class="dropdown-item" href="#">

My Profile

</a>

</li>

<li>

<a class="dropdown-item" href="#">

My Orders

</a>

</li>

<li>

<hr class="dropdown-divider">

</li>

<li>

<a class="dropdown-item text-danger"

id="logoutBtn"

href="#">

Logout

</a>

</li>

</ul>

`;

}
/*=====================================
      LOGOUT
=====================================*/

document.addEventListener("click", function (e) {

    if (e.target.id === "logoutBtn") {

        localStorage.removeItem("isLoggedIn");

        alert("Logged Out Successfully!");

        location.reload();

    }

});


