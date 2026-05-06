// ============================================
// Main.js - Frontend JavaScript
// ============================================
// Handles all fetch API calls and DOM manipulation
// for the Dry Fruit Store application
// ============================================

const API_URL = "/api/products";

// ─── TOAST NOTIFICATIONS ─────────────────────
function showToast(message, type = "success") {
  let container = document.getElementById("toast-container");
  if (!container) {
    container = document.createElement("div");
    container.id = "toast-container";
    container.className = "toast-container";
    document.body.appendChild(container);
  }
  const toast = document.createElement("div");
  toast.className = `toast-message toast-${type}`;
  toast.innerHTML = `<span>${type === "success" ? "✅" : "❌"}</span> ${message}`;
  container.appendChild(toast);
  setTimeout(() => toast.remove(), 3000);
}

// ─── FETCH ALL PRODUCTS ──────────────────────
async function fetchProducts() {
  try {
    const res = await fetch(API_URL);
    const data = await res.json();
    return data.success ? data.data : [];
  } catch (err) {
    console.error("Fetch error:", err);
    showToast("Failed to load products", "error");
    return [];
  }
}

// ─── FETCH SINGLE PRODUCT ────────────────────
async function fetchProductById(id) {
  try {
    const res = await fetch(`${API_URL}/${id}`);
    const data = await res.json();
    return data.success ? data.data : null;
  } catch (err) {
    console.error("Fetch error:", err);
    showToast("Failed to load product", "error");
    return null;
  }
}

// ─── CREATE PRODUCT ──────────────────────────
async function createProduct(productData) {
  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(productData),
    });
    const data = await res.json();
    if (data.success) {
      showToast("Product added successfully!");
      return true;
    } else {
      showToast(data.message || "Failed to add product", "error");
      return false;
    }
  } catch (err) {
    console.error("Create error:", err);
    showToast("Server error", "error");
    return false;
  }
}

// ─── UPDATE PRODUCT ──────────────────────────
async function updateProduct(id, productData) {
  try {
    const res = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(productData),
    });
    const data = await res.json();
    if (data.success) {
      showToast("Product updated successfully!");
      return true;
    } else {
      showToast(data.message || "Failed to update product", "error");
      return false;
    }
  } catch (err) {
    console.error("Update error:", err);
    showToast("Server error", "error");
    return false;
  }
}

// ─── DELETE PRODUCT ──────────────────────────
async function deleteProduct(id) {
  try {
    const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    const data = await res.json();
    if (data.success) {
      showToast("Product deleted successfully!");
      return true;
    } else {
      showToast(data.message || "Failed to delete product", "error");
      return false;
    }
  } catch (err) {
    console.error("Delete error:", err);
    showToast("Server error", "error");
    return false;
  }
}

// ─── RENDER PRODUCTS LIST (products.html) ────
async function renderProducts() {
  const container = document.getElementById("products-container");
  if (!container) return;

  // Show spinner
  container.innerHTML = `<div class="col-12 spinner-wrapper"><div class="spinner"></div></div>`;

  const products = await fetchProducts();

  if (products.length === 0) {
    container.innerHTML = `
      <div class="col-12 empty-state">
        <div class="empty-state-icon">🥜</div>
        <h4>No Products Found</h4>
        <p>Start by adding your first dry fruit product!</p>
        <a href="/add" class="btn btn-primary-custom mt-3">+ Add Product</a>
      </div>`;
    return;
  }

  // Store products globally for search filtering
  window._allProducts = products;
  displayProducts(products);
}

// ─── DISPLAY PRODUCTS (used by render & search) ─
function displayProducts(products) {
  const container = document.getElementById("products-container");
  if (!container) return;

  if (products.length === 0) {
    container.innerHTML = `
      <div class="col-12 empty-state">
        <div class="empty-state-icon">🔍</div>
        <h4>No Matching Products</h4>
        <p>Try a different search term.</p>
      </div>`;
    return;
  }

  container.innerHTML = products.map(p => `
    <div class="col-md-6 col-lg-4 mb-4" style="animation:fadeInUp 0.5s ease both">
      <div class="product-card">
        <div class="product-card-image-wrapper">
          <img src="${p.image || 'https://images.unsplash.com/photo-1616684000067-36952fde56ec?w=400&h=300&fit=crop'}"
               alt="${p.name}" class="product-card-image"
               onerror="this.src='https://images.unsplash.com/photo-1616684000067-36952fde56ec?w=400&h=300&fit=crop'">
          <span class="product-card-badge ${p.quantity <= 0 ? 'out-of-stock' : ''}">
            ${p.quantity > 0 ? 'In Stock' : 'Out of Stock'}
          </span>
        </div>
        <div class="product-card-body">
          <h5 class="product-card-name">${p.name}</h5>
          <div class="product-card-price">Rs. ${p.price.toLocaleString()}</div>
          <div class="product-card-qty">📦 Qty: ${p.quantity} kg</div>
          <div class="product-card-actions">
            <button class="btn-edit" onclick="window.location.href='/edit/${p._id}'">✏️ Edit</button>
            <button class="btn-delete" onclick="confirmDelete('${p._id}','${p.name}')">🗑️ Delete</button>
          </div>
        </div>
      </div>
    </div>
  `).join("");
}

// ─── SEARCH / FILTER ─────────────────────────
function setupSearch() {
  const searchInput = document.getElementById("search-input");
  if (!searchInput) return;

  searchInput.addEventListener("input", (e) => {
    const term = e.target.value.toLowerCase().trim();
    if (!window._allProducts) return;

    const filtered = window._allProducts.filter(p =>
      p.name.toLowerCase().includes(term)
    );
    displayProducts(filtered);
  });
}

// ─── CONFIRM DELETE (modal) ──────────────────
let deleteTargetId = null;

function confirmDelete(id, name) {
  deleteTargetId = id;
  document.getElementById("delete-product-name").textContent = name;
  const modal = new bootstrap.Modal(document.getElementById("deleteModal"));
  modal.show();
}

async function executeDelete() {
  if (!deleteTargetId) return;
  const success = await deleteProduct(deleteTargetId);
  if (success) {
    // Close modal and refresh
    bootstrap.Modal.getInstance(document.getElementById("deleteModal")).hide();
    renderProducts();
  }
  deleteTargetId = null;
}

// ─── ADD PRODUCT FORM ────────────────────────
function setupAddForm() {
  const form = document.getElementById("add-product-form");
  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const btn = form.querySelector("button[type='submit']");
    btn.disabled = true;
    btn.textContent = "Adding...";

    const productData = {
      name: document.getElementById("product-name").value.trim(),
      price: parseFloat(document.getElementById("product-price").value),
      quantity: parseInt(document.getElementById("product-quantity").value),
      image: document.getElementById("product-image").value.trim() || undefined,
    };

    const success = await createProduct(productData);
    if (success) {
      setTimeout(() => (window.location.href = "/products"), 1000);
    } else {
      btn.disabled = false;
      btn.textContent = "Add Product";
    }
  });
}

// ─── EDIT PRODUCT FORM ───────────────────────
async function setupEditForm() {
  const form = document.getElementById("edit-product-form");
  if (!form) return;

  // Get product ID from the URL: /edit/:id
  const pathParts = window.location.pathname.split("/");
  const productId = pathParts[pathParts.length - 1];

  if (!productId) {
    showToast("Invalid product ID", "error");
    return;
  }

  // Load existing data into form
  const product = await fetchProductById(productId);
  if (!product) {
    showToast("Product not found", "error");
    return;
  }

  document.getElementById("edit-name").value = product.name;
  document.getElementById("edit-price").value = product.price;
  document.getElementById("edit-quantity").value = product.quantity;
  document.getElementById("edit-image").value = product.image || "";

  // Handle form submission
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const btn = form.querySelector("button[type='submit']");
    btn.disabled = true;
    btn.textContent = "Updating...";

    const updatedData = {
      name: document.getElementById("edit-name").value.trim(),
      price: parseFloat(document.getElementById("edit-price").value),
      quantity: parseInt(document.getElementById("edit-quantity").value),
      image: document.getElementById("edit-image").value.trim() || undefined,
    };

    const success = await updateProduct(productId, updatedData);
    if (success) {
      setTimeout(() => (window.location.href = "/products"), 1000);
    } else {
      btn.disabled = false;
      btn.textContent = "Update Product";
    }
  });
}

// ─── HOME PAGE STATS ─────────────────────────
async function loadHomeStats() {
  const countEl = document.getElementById("stat-total");
  if (!countEl) return;

  const products = await fetchProducts();
  countEl.textContent = products.length;

  const valueEl = document.getElementById("stat-value");
  if (valueEl) {
    const totalValue = products.reduce((sum, p) => sum + p.price * p.quantity, 0);
    valueEl.textContent = "Rs. " + totalValue.toLocaleString();
  }

  const categoriesEl = document.getElementById("stat-categories");
  if (categoriesEl) {
    const inStock = products.filter(p => p.quantity > 0).length;
    categoriesEl.textContent = inStock;
  }
}

// ─── INITIALIZE ON PAGE LOAD ─────────────────
document.addEventListener("DOMContentLoaded", () => {
  // Run setup based on which page is loaded
  renderProducts();
  setupSearch();
  setupAddForm();
  setupEditForm();
  loadHomeStats();
});
