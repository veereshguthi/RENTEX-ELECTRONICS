let products = [];
let cart = JSON.parse(
  localStorage.getItem("rentxCart") || "[]"
);

const grid =
  document.getElementById("productsGrid");

const search =
  document.getElementById("search");

const categoryFilter =
  document.getElementById("categoryFilter");


async function loadProducts() {

  const params = new URLSearchParams();

  if (search.value.trim()) {
    params.set(
      "search",
      search.value.trim()
    );
  }

  if (categoryFilter.value !== "All") {
    params.set(
      "category",
      categoryFilter.value
    );
  }

  const response =
    await fetch(
      "/api/products?" +
      params.toString()
    );

  products = await response.json();

  displayProducts();
}


function displayProducts() {

  if (!products.length) {

    grid.innerHTML =
      `<p style="color:#999">
        No products found.
      </p>`;

    return;
  }

  grid.innerHTML =
    products.map(product => `

      <article class="product">

        <div class="product-image">

          <img
            src="${product.image}"
            alt="${product.name}"
            loading="lazy"
          >

        </div>

        <div class="product-info">

          <h3>
            ${product.name}
          </h3>

          <p>
            ${product.category}
            • Premium rental device
          </p>

          <div class="product-bottom">

            <div>
              <span class="price">
                ₹${product.price}
              </span>

              <span class="per-day">
                / day
              </span>
            </div>

            <button
              class="rent-button"
              onclick="addToCart(${product.id})"
            >
              Rent
            </button>

          </div>

        </div>

      </article>

    `).join("");
}


async function addToCart(id) {

  const response =
    await fetch(`/api/products/${id}`);

  const product =
    await response.json();

  const existing =
    cart.find(item => item.id === id);

  if (existing) {

    existing.days++;

  } else {

    cart.push({
      ...product,
      days: 1
    });

  }

  saveCart();

  openCart();
}


function saveCart() {

  localStorage.setItem(
    "rentxCart",
    JSON.stringify(cart)
  );

  updateCartCount();

  displayCart();
}


function updateCartCount() {

  const count =
    cart.reduce(
      (total, item) =>
        total + item.days,
      0
    );

  document.getElementById(
    "cartCount"
  ).textContent = count;
}


function displayCart() {

  const container =
    document.getElementById(
      "cartItems"
    );

  if (!cart.length) {

    container.innerHTML =
      `<p style="color:#999">
        Your cart is empty.
      </p>`;

  } else {

    container.innerHTML =
      cart.map(item => `

        <div class="cart-item">

          <img
            src="${item.image}"
            alt="${item.name}"
          >

          <div class="cart-item-info">

            <b>
              ${item.name}
            </b>

            <br>

            <small>
              ₹${item.price}/day ×
              ${item.days} day(s)
            </small>

          </div>

          <button
            class="remove"
            onclick="removeFromCart(${item.id})"
          >
            Remove
          </button>

        </div>

      `).join("");
  }

  const total =
    cart.reduce(
      (sum, item) =>
        sum +
        item.price *
        item.days,
      0
    );

  document.getElementById(
    "cartTotal"
  ).textContent =
    "₹" +
    total.toLocaleString("en-IN");
}


function removeFromCart(id) {

  cart =
    cart.filter(
      item => item.id !== id
    );

  saveCart();
}


function openCart() {

  displayCart();

  document
    .getElementById("cartModal")
    .classList.add("active");
}


function closeCart() {

  document
    .getElementById("cartModal")
    .classList.remove("active");
}


document
  .getElementById("cartButton")
  .addEventListener(
    "click",
    openCart
  );


document
  .getElementById("closeCart")
  .addEventListener(
    "click",
    closeCart
  );


document
  .getElementById("cartModal")
  .addEventListener(
    "click",
    event => {

      if (
        event.target.id ===
        "cartModal"
      ) {
        closeCart();
      }

    }
  );


document
  .getElementById("checkout")
  .addEventListener(
    "click",
    () => {

      if (!cart.length) {

        alert(
          "Your rental cart is empty."
        );

        return;
      }

      alert(
        "Demo checkout successful! " +
        "Payment and booking integration " +
        "can be added next."
      );

    }
  );


search.addEventListener(
  "input",
  loadProducts
);


categoryFilter.addEventListener(
  "change",
  loadProducts
);


document
  .querySelectorAll(
    ".category-card"
  )
  .forEach(button => {

    button.addEventListener(
      "click",
      () => {

        categoryFilter.value =
          button.dataset.category;

        loadProducts();

        document
          .getElementById("products")
          .scrollIntoView({
            behavior: "smooth"
          });

      }
    );

  });


loadProducts();

updateCartCount();
