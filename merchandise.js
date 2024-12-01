// Get the product elements and popup elements
const products = document.querySelectorAll(".product");
const popup = document.getElementById("popup");
const closePopup = document.getElementById("close-popup");
const addToCartBtn = document.getElementById("add-to-cart-btn");
const cartItems = document.getElementById("cart-items");
const checkoutBtn = document.getElementById("checkout-btn");
const purchaseSuccess = document.getElementById("purchase-success");
let cart = [];

// Show popup with product details
products.forEach((product) => {
  const button = product.querySelector(".view-details-btn");
  button.addEventListener("click", () => {
    const productName = product.getAttribute("data-product");
    const productImg = product.querySelector("img").src;

    // Update the popup with product details
    document.getElementById("popup-title").innerText = productName;
    document.getElementById("popup-img").src = productImg;

    addToCartBtn.setAttribute("data-product", productName);
    addToCartBtn.setAttribute("data-img", productImg);

    popup.style.display = "flex"; // Show the popup
  });
});

// Close the popup
closePopup.addEventListener("click", () => {
  popup.style.display = "none";
});

// Add product to cart
addToCartBtn.addEventListener("click", () => {
  const productName = addToCartBtn.getAttribute("data-product");
  const productImg = addToCartBtn.getAttribute("data-img");

  // Add product to cart array
  cart.push({ productName, productImg });
  updateCart();
  popup.style.display = "none"; // Close the popup
});

// Update cart display
function updateCart() {
  cartItems.innerHTML = ""; // Clear the cart before updating
  cart.forEach((item, index) => {
    const li = document.createElement("li");
    li.textContent = item.productName;

    // Add remove button to cart items
    const removeBtn = document.createElement("button");
    removeBtn.textContent = "Remove";
    removeBtn.addEventListener("click", () => {
      cart.splice(index, 1); // Remove item from cart array
      updateCart(); // Update cart display
    });

    li.appendChild(removeBtn);
    cartItems.appendChild(li);
  });
}

// Checkout process
checkoutBtn.addEventListener("click", () => {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;

  if (name && email && cart.length > 0) {
    // Show success message
    purchaseSuccess.style.display = "block";
    cart = []; // Clear cart after purchase
    updateCart(); // Update cart display

    // Clear the form fields
    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
  } else {
    alert("Please fill in all details and add items to the cart.");
  }
});

// Select DOM elements for mobile menu
const menu = document.querySelector("#mobile-menu");
const menuLinks = document.querySelector(".navbar__menu");
const navbarContainer = document.querySelector(".navbar__container");
const body = document.body;
const overlay = document.createElement("div");

// Create and append overlay
overlay.classList.add("overlay");
document.body.appendChild(overlay);

// ----- MOBILE MENU TOGGLE -----

// Function to toggle the mobile menu state
function toggleMenuState() {
  menu.classList.toggle("is-active");
  menuLinks.classList.toggle("active");
  navbarContainer.classList.toggle("active");
  body.classList.toggle("active");
  overlay.style.display = menu.classList.contains("is-active")
    ? "block"
    : "none";
  body.classList.toggle("no-scroll", menu.classList.contains("is-active")); // Prevent scrolling when menu is active
}

// Event listener for mobile menu toggle
menu.addEventListener("click", toggleMenuState);

// Close menu when overlay is clicked
overlay.addEventListener("click", toggleMenuState);

// Add corresponding CSS for .no-scroll to prevent scrolling
