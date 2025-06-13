document.addEventListener("DOMContentLoaded", () => {
    const products = [
      { id: 1, name: "Product 1", price: 29.99 },
      { id: 2, name: "Product 2", price: 19.99 },
      { id: 3, name: "Product 3", price: 59.999 },
    ];
    
  
    let cart = JSON.parse(localStorage.getItem("cart")) || [];


    const productlist = document.getElementById("product-list");
    const cartitems = document.getElementById("cart-items");
    const emptycartMessage = document.getElementById("empty-cart");
    const cartTotalMessage = document.getElementById("cart-total");
    const checkoutbtn = document.getElementById("checkout-btn");
    const totalPricedisplay = document.getElementById("total-price");

    rendercart();
  
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
      savecart();
      rendercart();
    }
  
    function rendercart() {
      cartitems.innerHTML = "";
      let totalprice = 0;
  
      if (cart.length > 0) {
        emptycartMessage.classList.add("hidden");
        cartTotalMessage.classList.remove("hidden");
  
        cart.forEach((item, index) => {
          totalprice += item.price;
  
          const cartitem = document.createElement("div");
          cartitem.className = "flex justify-between items-center bg-gray-700 p-3 rounded";
  
          const itemText = document.createElement("span");
          itemText.textContent = `${item.name} - ₹${item.price.toFixed(2)}`;
  
          const removebtn = document.createElement("button");
          removebtn.className = "px-4 py-2 bg-red-500 hover:bg-red-600 rounded text-white";
          removebtn.textContent = "Remove";
          removebtn.addEventListener("click", () => {
            cart.splice(index, 1);
            savecart();
            rendercart();
          });
  
          cartitem.appendChild(itemText);
          cartitem.appendChild(removebtn);
          cartitems.appendChild(cartitem);
        });
  
        totalPricedisplay.textContent = `₹${totalprice.toFixed(2)}`;
      } else {
        emptycartMessage.classList.remove("hidden");
        cartTotalMessage.classList.add("hidden");
        totalPricedisplay.textContent = "₹0.00";
      }
    }
  
    checkoutbtn.addEventListener("click", () => {
      cart.length = 0;
      savecart();
      rendercart();
      alert("Checkout successful!");
    });

    function savecart() {
      // ✅ Store tasks in localStorage
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  });
  