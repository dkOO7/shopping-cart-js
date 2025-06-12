document.addEventListener("DOMContentLoaded", () => {
  const products = [
    { id: 1, name: "Product 1", price: 29.99 },
    { id: 2, name: "Product 2", price: 19.99 },
    { id: 3, name: "Product 3", price: 59.999 },
  ];

  const cart = [];
  const productlist = document.getElementById("product-list");
  const cartitems = document.getElementById("cart-items");
  const emptycartMessage = document.getElementById("empty-cart");
  const cartTotalMessage = document.getElementById("cart-total");
  const checkoutbtn = document.getElementById("checkout-btn");
  const totalPricedisplay = document.getElementById("total-price");

  products.forEach((product) => {
    const productDiv = document.createElement("div");
    productDiv.className =
      "bg-gray-600 p-4 rounded-lg shadow-md flex flex-col items-center justify-between text-white";

    productDiv.innerHTML = `
            <span class="block mb-2">${product.name} - ₹${product.price.toFixed(2)}</span>
            <button 
              data-id="${product.id}" 
              class="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded text-white"
            >
              Add to Cart
            </button>
        `;

    productlist.appendChild(productDiv);
  });

  productlist.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
      const productid = parseInt(e.target.getAttribute("data-id"));
      const product = products.find((p) => p.id === productid);
      addtocart(product);
    }
  });

  function addtocart(product) {
    cart.push(product);
    rendercart();
  }

  function rendercart() {
    cartitems.innerText = "";
    let totalprice = 0
    if (cart.length > 0) {
      emptycartMessage.classList.add("hidden");
      cartTotalMessage.classList.remove("hidden");

      cart.forEach((item, index) => {
        totalprice += item.price;

        const cartitem = document.createElement("div");
        cartitem.className = "text-white mb-1";
        cartitem.innerHTML = `
            ${item.name} - ₹${item.price.toFixed(2)}
          `;
        cartitems.appendChild(cartitem);
      });
      totalPricedisplay.textContent = `₹${totalprice.toFixed(2)}`;
    } else {
      emptycartMessage.classList.remove("hidden");
      cartTotalMessage.classList.add("hidden"); // ✅ This hides total block properly
      totalPricedisplay.textContent = "₹0.00"; // ✅ Reset price text
    }
      
  }


  checkoutbtn.addEventListener("click", () => {
    cart.length = 0;
    rendercart(); // ✅ Update UI
    alert("Checkout successful!");
  });
  
});
