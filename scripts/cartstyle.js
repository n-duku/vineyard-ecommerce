let myCart = [];
let discount = 0;
let itemsQuantity = 0;
let subTotal = 0;
const applyingPromoCode = () =>{
    let passed = false;
    let inputValue = document.querySelector('div.promotion div input[type="text"]').value;
    if(inputValue.length > 5){
        passed = false;
    }
    else if(inputValue.length < 5){
        passed = false;
    }
    else{
        let re = new RegExp('[a-z0-9A-Z]{5}');
        passed = re.test(inputValue);
    }
    if(passed){
        discount = 0.5;
    }
    else{
        discount = 0;
    }
    applyPromoToCode();
}

const applyPromoToCode = () => {
    document.querySelector('div.calculation > div.discount').innerHTML = `${discount*100}%`;
    if(discount === 0){
        document.querySelector('div.calculation > div.estimatedTotal').innerHTML = `$${subTotal}`;
    }else{
    document.querySelector('div.calculation > div.estimatedTotal').innerHTML = `$${discount * subTotal}`;
    }
}

const getTotalItems = () => {
    let cartContents = JSON.parse(localStorage.getItem('myCart'));
    for(let i of cartContents){
        itemsQuantity += i.productQuantity;
    }
    document.querySelector('div.cart > span.cart-count').innerHTML = itemsQuantity;
    document.querySelector('div.head > span > span.cart-count').innerHTML = itemsQuantity;
 }

 const getSubTotal = () =>{
     let cartContents = JSON.parse(localStorage.getItem('myCart'));
     for(let i of cartContents){
        subTotal += i.productQuantity * i.productPrice;
     }
     let subTotalCont = document.querySelector('div.calculation > div.subtotalAmount');
     subTotalCont.innerHTML += `$${subTotal}`;
     document.querySelector('div.calculation > div.estimatedTotal').innerHTML = `$${subTotal}`;
 }

 getSubTotal();

getTotalItems();

window.onload = () => {
    if(localStorage.getItem('myCart') !== null){
        myCart = JSON.parse(localStorage.getItem('myCart'));
    }else{
        console.log("Empty Cart");
    }
    generateHTML(myCart);
        
}

const generateHTML = cartContent =>{
    const mainCartContent = document.querySelector('div.cartContents');
    for(let content of cartContent){
        let cartItem = document.createElement('div');
        mainCartContent.appendChild(cartItem);
        cartItem.innerHTML = `
        <div class="bag-contents">
        <div class="bag-products">
            <div class="bag-product">
                <div class="product-description">
                    <div class="product-image"><img src="imgs/flat_blue0.jpg" alt="product-image" width="110%"></div>
                    <div class="bag-info">
                        <p>${content.productName}</p>
                        <p><span class="bolden">Style:</span> 
                            ${content.productStyle} 
                            <span class="bolden">Color:</span> ${content.productColor}
                        </p>
                        <p><span class="bolden">Size: </span>${content.productSize}
                        </p>
                        <p class="edit-area"><a href="">Remove</a> 
                        </p>
                    </div>
                </div>
                <div>
                        <div class="product-quantity-update">
                            <div class="priceInfo">
                                <span class="unitPrice">UNIT PRICE</span><br>
                                <span class="unitPriceAmount">@ <span class="amountPrice"></span> <span class="currency">$</span>${content.productPrice}</span>
                            </div>
                            
                        </div>
                       <p>
                        <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike"> Free gift package?
                       </p> 
                </div>
                <div class="product-total-price">
                    <span class="currency">$</span><span class="amount">${content.productPrice * content.productQuantity}</span>
                    
                </div>
            </div>
            

        </div>

         </div>
        
        `   
    }

   

    
}

// const updateProductQuantity = (cartArrays) =>{
//     let quantityArrays = cartArrays.map(x => x.productQuantity);
//     let selectArrays = Array.from(document.querySelectorAll('#productsNumb'));
//     console.log(selectArrays);
//     for(let i in selectArrays){
//         console.log(selectArrays[i])
//         selectArrays[i].selectedIndex = 8; //quantityArrays[i];
//         // console.log(quantityArrays[i]);
//     }
// }
let first = document.querySelector('div.promotion div input[type="button"]');
first.addEventListener('click', applyingPromoCode,false);

