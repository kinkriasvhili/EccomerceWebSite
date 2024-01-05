// main.js

let productsmainContainer = document.querySelectorAll(".home-container");
let productsShopContainer = document.querySelector(".pro-container");
let singleProductImgContainer = document.querySelector(".singleProductImage");
let singleProductDetailsContainer = document.querySelector(
  ".singleProductDetails"
);
let searchButton = document.querySelector('.searchButton');
let filterActive = document.querySelector('.filter');
let buttonFilterParagraphElement = document.querySelectorAll('.buttonFilter p');
if(searchButton) {
  searchButton.disabled = true;
}

let searchBoxContainer = document.querySelector('.searchBox');
let featureProductsContainer = document.querySelector('.featureProducts');
let cartElement = document.querySelector('.cartContainer');
// single product html
function oneProductHtml(product, starIcons) {
  let singleProduct =  `
    <a href="singleproduct.html" style="text-decoration: none;">
    <div class="product productShop" data-id=${product.id}>
      <img src="${product.image}" alt="">
      <div class="description">
        <span>${product.brand}</span>
        <h5>${product.title}</h5>
        <div class="star">
        ${starIcons}
        </div>
        <h4>$${product.price}</h4>
      </div>
      <a href="#" class="cart"><i class="fa-solid fa-cart-shopping" ></i></a>
    </div>
    </a>`
  return singleProduct
} 
function oneProductOnCart(item) {
  let cartResult = `
  <tr>
    <td><a style="cursor: pointer;" class="deleteBtn" data-id="${item.id}"><i class="far fa-times-circle"></i></a></td>
    <td><img src="${item.image}" alt=""></td>
    <td>${item.title}</td>
    <td class='productPrice'>$${item.price}</td>
    <td><input data-id=${item.id} class="onCartInput" type="number" value="${item.amount}" min="1"></td>
    <td>${item.size}</td>
    <td class="amountPrice">$${Number(item.price) * Number(item.amount)}</td>
  </tr>
  `
  return cartResult;
}

// getting the products
class Products {
  async getProducts() {
    try {
      let result = await fetch("script/products.json");
      let data = await result.json();
      let products = data.items;
      products = products.map((items) => {
        let { title, price, rating, description, size, brand, gender} = items.fields;
        let { id } = items.sys;
        let image = items.fields.image.fields.file.url;
        return { title, price, rating, id, image, description, size, brand, gender};
      });
      return products;
    } catch (error) {
      console.log("Catch error: ", error);
    }
  }
}

// display products
class UI {
  
  async displayProducts(products) {
    try {
      let singleProductResult = ''
      let homeResult = "";
      let homeResultNews = "";
      let shopResult = "";
      let stopNum = 0;
      products.forEach((product) => {
        stopNum += 1;
        let starIcons = "";
        for (let i = 0; i < product.rating; i++) {
          starIcons += '<i class="fas fa-star"></i>';
        }
        shopResult += oneProductHtml(product, starIcons);
        if (stopNum < 9) {
          homeResult += oneProductHtml(product, starIcons);
        } else if(stopNum < 17 && stopNum > 8) {
          homeResultNews +=  oneProductHtml(product, starIcons);
        }
        if (stopNum >= 5 && stopNum < 9) {
          singleProductResult += oneProductHtml(product, starIcons);
        }
        
      });
      if (productsShopContainer) {
        productsShopContainer.innerHTML = shopResult;
      }
      try {

        productsmainContainer[0].innerHTML = homeResult;
        productsmainContainer[1].innerHTML = homeResultNews;
        featureProductsContainer.innerHTML = singleProductResult;
        this.singleProductDisplay(products);
      } catch(error) {
        if (featureProductsContainer) {
          featureProductsContainer.innerHTML = singleProductResult;
        }
        
        this.singleProductDisplay(products);
      }
    } catch (error) {
      this.singleProductDisplay(products);
      console.log(error);
    }
  }
   searchInput(products) {
    let shopPage = 'shop';
    let currentURL = window.location.href;
    let filename = currentURL.substring(currentURL.lastIndexOf("/") + 1);
    filename = filename.replace(/\.[^/.]+$/, "");
    if(filename === shopPage) {
      searchBoxContainer.addEventListener('input', ()=> {
        let result = '';
        products.forEach(product => {
          let productTitle = product.title.toUpperCase();
          let productTitleNoSpaces = productTitle.replace(/\s/g, '').toUpperCase();
          let productTitleNoSpacesNoHyphens = productTitleNoSpaces.replace(/[\s-]/g, '').toUpperCase();
          let inputValue = searchBoxContainer.value.toUpperCase();
          let inputValueNoSpaces = inputValue.replace(/\s/g, '').toUpperCase();
          let inputValueNoSpacesNoHyphens = inputValueNoSpaces.replace(/[\s-]/g, '').toUpperCase();
  
          if (productTitleNoSpacesNoHyphens.includes(inputValueNoSpacesNoHyphens)) {
            let starIcons = '';
            for (let i = 0; i < product.rating; i++) {
              starIcons += '<i class="fas fa-star"></i>';
            }
            result += oneProductHtml(product, starIcons);
            
  
  
          }
          
        })
        if (productsShopContainer) {
          console.log(productsShopContainer);
          productsShopContainer.innerHTML = result;
          this.singleProductDisplay(products);
        }
      })
    }
   
  }
  filterFun(products) {
    buttonFilterParagraphElement.forEach(paragraph => {
      if(filterActive.classList.contains('filterClose')) {
        paragraph.addEventListener('click', (event)=> {
          let result = '';
          let priceArray = [];
          products.forEach((product, index) => {
            
            //productTitle
            let productTitle = product.title.toUpperCase();
            let productTitleNoSpaces = productTitle.replace(/\s/g, '').toUpperCase();
            let productTitleNoSpacesNoHyphens = productTitleNoSpaces.replace(/[\s-]/g, '').toUpperCase();
            //gender
            let productGender = product.gender.toUpperCase();
            // brand 
            let productBrand = product.brand.toUpperCase();
            //filter
            let filterParagraph = event.target.innerHTML.toUpperCase();
            let filterParagraphNoSpaces = filterParagraph.replace(/\s/g, '').toUpperCase();
            let filterParagraphNoSpacesNoHyphens = filterParagraphNoSpaces.replace(/[\s-]/g, '').toUpperCase();
            if(productTitleNoSpacesNoHyphens.includes(filterParagraphNoSpacesNoHyphens)) {
              let starIcons = '';
              for (let i = 0; i < product.rating; i++) {
                starIcons += '<i class="fas fa-star"></i>';
              }
              result += oneProductHtml(product, starIcons);
            }
            
            if(productBrand.includes(filterParagraphNoSpacesNoHyphens)) {
              console.log(productBrand);
              let starIcons = '';
              for (let i = 0; i < product.rating; i++) {
                starIcons += '<i class="fas fa-star"></i>';
              }
              result += oneProductHtml(product, starIcons);
            }
            if(productGender.includes(filterParagraphNoSpacesNoHyphens)) {
              console.log(productBrand);
              let starIcons = '';
              for (let i = 0; i < product.rating; i++) {
                starIcons += '<i class="fas fa-star"></i>';
              }
              result += oneProductHtml(product, starIcons);
            }
            this.getFiltreResult(result, products)
            if(filterParagraphNoSpacesNoHyphens == 'DOWNTOTOP') {
              priceArray.push(product.price);
              let sortedArray = priceArray.sort((a, b) => a - b);
              this.priceFiltre(products, sortedArray, result)
            }
            if(filterParagraphNoSpacesNoHyphens == 'TOPTODOWN') {
              priceArray.push(product.price);
              if(products.length - 1 == index) {
                
                let sortedArray = priceArray.slice().sort  ((a, b)=> {
                  return b - a;
                });
                this.priceFiltre(products, sortedArray, result)

              }
              
            }
            
          })
        })
        
      }
    })
    
  }
  // displaying result
  getFiltreResult(result, products) {
    if (productsShopContainer) {
      productsShopContainer.innerHTML = result;
      this.singleProductDisplay(products);
    }
  }
  //price filtre
  priceFiltre(products, sortedArray, result) {
    let num = 0
    sortedArray.forEach(price => {
      products.forEach(product => {

        if(product.price == price) {
          num += 1
          let starIcons = '';
          for (let i = 0; i < product.rating; i++) {
            starIcons += '<i class="fas fa-star"></i>';
          }
          result += oneProductHtml(product, starIcons);
          if(num == products.length) {
            this.getFiltreResult(result, products)
          }
        }
      })
    })
  }
  singleProductDisplay(products) {
    
    
    let productsElement = [...document.querySelectorAll(".pro-container")];
    let productList = [];
    productsElement.forEach((container) => {
      let productElement = [...container.querySelectorAll(".product")];
      productList.push(...productElement);
    });


    

    productList.forEach((value) => {
      value.addEventListener("click", () => {
        Storage.clickedValue(value.dataset.id)
      });
    });
    products.forEach((value) => {

      let singlePage = 'singleproduct';
      let currentURL = window.location.href;
      let filename = currentURL.substring(currentURL.lastIndexOf("/") + 1);
      filename = filename.replace(/\.[^/.]+$/, "");
      let id = JSON.parse(localStorage.getItem('ID'));
      if (value.id === id && filename === singlePage) {
        console.log('adamiani')
        singleProductImgContainer.innerHTML = `<img src="${value.image}" width="100%" id="mainImg" class="mainImg" alt="">`;
        singleProductDetailsContainer.innerHTML = `
          <h6>Home / T-shirt</h6>
          <h4>${value.title}</h4>
          <h3>$${value.price}</h3>
          <label class="sizeSelect" for="sizeSelect">Select Size:</label>
          <select id="sizeSelect">
            <option>${value.size[0]}</option>
            <option>${value.size[1]}</option>
            <option>${value.size[2]}</option>
          </select>
          <input class="countInput" type="number" value="1" min="1">
          <button class="normal addCartButton" data-id=${id}>Add To Cart</button>
          <div class="cartAdd"><p class="addStyle">Added To The Cart</p></div>
          <h4>Product Details</h4>
          <p>${value.description}.</p>
        `
         // Get the select element
        let addCartButtonElement = document.querySelector('.addCartButton');
        
        
        addCartButtonElement.addEventListener('click', ()=> {
          let sizeSelect = document.getElementById("sizeSelect");
          let selectedValue = sizeSelect.value;
          Storage.saveSize(selectedValue);
        })
        Storage.value(value);
      }
    });
  }
  loadCart() {
    let cartAddElement = document.querySelector('.addStyle');
    
    document.body.addEventListener('click', (event) => {
      if (event.target.classList.contains('addCartButton')) {
        // console.log(inputCountValues);
        cartAddElement.classList.add('addedToTheClass');
        cartAddElement.classList.remove('addStyle');
        setTimeout(()=> {
          cartAddElement.classList.remove('addedToTheClass');
          cartAddElement.classList.add('addStyle');
        }, 1000)
        this.addToCart();
        this.displayCart();
      }
    });
    
    this.displayCart();
  }
  addToCart() {
    // console.log(inputCountValues);
    let inputElement = document.querySelector('.countInput');
    let cartValue = JSON.parse(localStorage.getItem('value'));
    let storageCart = JSON.parse(localStorage.getItem('cart')) || [];
    let productSize = JSON.parse(localStorage.getItem('productSize'));
    storageCart.push({...cartValue, size:productSize});
    storageCart[storageCart.length - 1].amount = inputElement.value;
    this.displayCart(storageCart);
    
    Storage.saveCart(storageCart);
  }

  displayCart(storageCart) {
    let storageResult = '';
    if(storageCart) {
      storageCart.forEach((item) => {
        storageResult += oneProductOnCart(item);
      });
      Storage.saveDisplayedCart(storageResult);
    }
  }
  
  updateCartElement() {
    let cartOnPage = JSON.parse(localStorage.getItem('cartOnPage'));
    if (cartElement) {
      cartElement.innerHTML = cartOnPage;
      // console.log('working')
      this.displayAmountPrice();
      this.deleteCartItem();
      this.addInputEventListeners();
    }
    
  }
  deleteCartItem() {
    let deleteBtnElements = [...document.querySelectorAll('.deleteBtn')];
    let cart = JSON.parse(localStorage.getItem('cart'));
    deleteBtnElements.forEach(item => {
      item.addEventListener('click', ()=> {
        cart.forEach((value, index) => {
          if (value.id == item.dataset.id) {
            cart.splice(index, 1);
            Storage.saveCart(cart);
            this.displayCart(cart);
            this.updateCartElement();
          }
          
        })
      })
    })
  }
  addInputEventListeners() {
    let cartOnPage = JSON.parse(localStorage.getItem('cartOnPage'));
    // let amountPriceList = document.querySelectorAll('.amountPrice');
    // let storageCart = JSON.parse(localStorage.getItem('cart'));
    
    if(cartOnPage) {
      // let sumOfPrices = 0;
      // amountPriceList.forEach(price => {
      //   price = Number(price.innerHTML.replace('$', ''))
      //   sumOfPrices += price
      // })
      let cartInput = [...document.querySelectorAll('.onCartInput')];
      
      cartInput.forEach(item => {
        item.addEventListener('input', (event)=> {
          // console.log(item.value)
          let storageCart = JSON.parse(localStorage.getItem('cart')) || [];
          let cart = JSON.parse(localStorage.getItem('cart'));
          cart.forEach(product => {
            if(product.id == item.dataset.id) {
              product.amount = item.value;
              // console.log(product.amount);
              Storage.saveCart(cart);


              // console.log(item)
              
              this.displayCart(cart);
              this.updateCartElement();
            }
          })

          // console.log(row);
          let container =[...document.querySelectorAll('.cartContainer tr')];
          let totalPrice = 0;
          container.forEach(row => {
            let amountPrice = row.querySelector('.amountPrice');
            let priceInNumber = Number(amountPrice.innerHTML.replace('$', ''));
            totalPrice += priceInNumber;
          })
          Storage.saveAmountPrice(totalPrice);
          this.displayAmountPrice(totalPrice);
          
          
        });
      })
      
    }
  }
  displayAmountPrice(totalPrice) {
    let priceTotal = [...document.querySelectorAll('.priceTotal')];
    let container =[...document.querySelectorAll('.cartContainer tr')];
    let sumOfPrices = 0;
    container.forEach(row => {
      let amountPrice = row.querySelector('.amountPrice');
      let priceInNumber = Number(amountPrice.innerHTML.replace('$', ''));
      sumOfPrices += priceInNumber;
    })
    
    let StoragePrice = 0; 
    priceTotal.forEach(each => {
      if (totalPrice) {
        let price = JSON.parse(localStorage.getItem('amountPrice'));
        each.innerHTML =`$${price}`;
        
      }else {
        each.innerHTML = `$${sumOfPrices}`;
      }
    }) 
    
    
  }


}

//Local Storage
class Storage {
  static saveProducts(products) {
    localStorage.setItem("products1", JSON.stringify(products));
  }
  static clickedValue(ID) {
    localStorage.setItem('ID', JSON.stringify(ID));
  }
  static value(value) {
    localStorage.setItem('value', JSON.stringify(value));
  }
  static saveCart(mainCart) {
    localStorage.setItem('cart', JSON.stringify(mainCart));
  }
  static saveDisplayedCart(cartResult) {
    localStorage.setItem('cartOnPage', JSON.stringify(cartResult));
  }
  static saveInputValue(inputValue) {
    localStorage.setItem('inputValue', JSON.stringify(inputValue));
  }
  static saveAmountPrice(amountPrice) {
    localStorage.setItem('amountPrice', JSON.stringify(amountPrice));
  }
  static saveSumOfPrices(total) {
    localStorage.setItem('totalprice', JSON.stringify(total))
  } 
  static savePrice(price) {
    localStorage.setItem('priceAmount', JSON.stringify(price))
  }
  static saveSize(size){
    localStorage.setItem('productSize', JSON.stringify(size));
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const ui = new UI();
  const products = new Products();
  products.getProducts().then((products) => {
    ui.displayProducts(products);
    ui.searchInput(products)
    ui.filterFun(products);
    Storage.saveProducts(products);
  })
  .then(()=> {
    ui.loadCart();
     // Call updateCartElement to update the cart on the current page
    ui.updateCartElement();
  })
});

