window.onload = () => {
    document.querySelector('div.quantity-selector input[type="text"]').value = 1;
}

let quantity = 1;
    size = '', 
    color = 'Flats Blue',
    product_name = 'BeachWood Hoodie',
    price = 128.00,
    product_imageUrl = 'url(imgs/flat_blue0.jpg)',
    productID = 'PROD-1';
    

    //Event Handler for mouse hover
let colorArray = Array.from(document.querySelectorAll('.cl'));
colorArray.forEach(a => {
    a.addEventListener('mouseenter', (e) => {
        let imageColor = e.target.attributes[1].nodeValue;
        
        selectAndChangeImages('span#prod-color-text', imageColor, false);
        if(!color){
            document.querySelector('span#prod-color-text').innerText = imageColor;
        }
        
    }, false);
    a.addEventListener('mouseleave', (e) => {
        let imageColor = e.target.attributes[1].nodeValue;
        
        if(color){
            document.querySelector('span#prod-color-text').innerText  = color;
        }else{
            document.querySelector('span#prod-color-text').innerText  = '';
        }

        if(imageColor !== color){
            selectAndChangeImages('span#prod-color-text', color, false);
        }
        
        
    }, false); 

    a.addEventListener('click', (e) => {
        let colors = Array.from(document.querySelectorAll('.cl'));
        colors.forEach(element => {
            element.style.borderColor = 'white';
        });
        e.target.style.borderColor = "#002b5c";
        color = e.target.getAttribute("data-text");
        

        let imageColor = e.target.attributes[1].nodeValue;

        selectAndChangeImages('span#prod-color-text', imageColor, true);

    }, false);

});

const selectAndChangeImages = (selector, targeted, clickedEvent) => {
    if(color){
        document.querySelector(selector).innerText = targeted;
    }
    // else{
    //     document.querySelector(selector).innerText = '';
    // }
    
    fetchData('products.json', targeted).then(products => {
        changeImagesUrl(products[0], clickedEvent);
        product_name = products[1];
        price = products[2]['amount'];
        productID = products[3];
        
    });
}

const changeImagesUrl = (data, clickedEvent) =>{
      arrayImages = Array.from(document.querySelectorAll('section.productLeft > img'));  
      urlKeys = Object.keys(data[0]);
      urlKeys.shift();
      if(clickedEvent){
        for(let i in arrayImages){
            arrayImages[i].src = data[0][(urlKeys[i])];
          }
      }
      
      document.querySelector('div.prod-img-wrap > div').style.backgroundImage =  `url(${data[0][(urlKeys[0])]})`;
      if(clickedEvent){
        product_imageUrl = `url(${data[0][(urlKeys[0])]})`;
      }
      

}




//Event Handler for the Add Button Addition button 
document.querySelector('button.ctrlAdd').addEventListener('click',()=>{
    let target = document.querySelector('div.quantity-selector input');
    let value = parseInt(target.value);
    value++;
    target.value = value;
    quantity = value;
    
},false);

//Event Handler for the Subtraction button 
document.querySelector('button.ctrlSub').addEventListener('click',()=>{
    let target = document.querySelector('div.quantity-selector input');
    let value = parseInt(target.value);
    if(value > 1){
        value--;
    }
    else{
        value = 1;
    } 
    target.value = value;  
    quantity = value;
},false);

const getSubTotal = () =>{
    let cartContents = JSON.parse(localStorage.getItem('myCart'));
    let subTotal= 0;
    for(let i of cartContents){
       subTotal += i.productQuantity * i.productPrice;
    }
    document.querySelector('div.additional_items + div.info > span').innerHTML = `$${subTotal}`;
}

document.getElementById('add-to-cart-btn').addEventListener('click', ()=>{
     if(!size){
        window.alert("Select Size");
    }else{
        document.querySelector('aside.mini-cart').classList.add('show');
        loadMiniCart();
        updateCart();
        getSubTotal();

    }
    
});

//Event Handler for closing the cart on the right
document.querySelector('aside.mini-cart div>p:nth-child(2)').addEventListener('click', _ =>{
    document.querySelector('aside.mini-cart').classList.remove('show');
}, false);


async function fetchData(url, color){
    try{
        const response = await fetch(url);
        const data = await response.json();
        const productName = data.name;
        const cost = data.price;
        const products = data.colors;
        const productID = data.id;
        let singleProduct = products.filter(product => product.text === color );
        return [singleProduct,productName,cost,productID];
    }
    catch(error){
        console.log(error);
    }
    
} 

let sizeArray = Array.from(document.querySelectorAll('span.sz span'));
sizeArray.forEach(element => {
    element.addEventListener('click', (e) => {
        size = e.target.textContent;
        sizeArray.forEach(el => {
            el.parentElement.style.border = '2px solid white';
        })
        document.querySelector('span.select_size').innerHTML = e.target.textContent;
        e.target.parentElement.style.border = '2px solid yellow';
    }, false);
})

//Mini Cart Page
const loadMiniCart = () => {
    let productImage = document.querySelector('div.item-wrap.primary--text > div:nth-child(1)');
    productImage.style.backgroundImage = product_imageUrl;
    document.querySelector('aside.mini-cart div.info span:nth-child(1)').innerHTML = color;
    document.querySelector('aside.mini-cart div.info span:nth-child(2)').innerHTML = size;
    document.querySelector('aside.mini-cart div.quantity span').innerHTML = quantity;
    document.querySelector('aside.mini-cart div.totalCostPrice span').innerHTML = quantity * price;
    
}

const updateCart = () => {
    let cartProduct = {
        productName: product_name,
        productStyle: productID,
        productColor: color,
        productPrice: price,
        productSize: size,
        productQuantity: quantity
    }
    let cartStorage = [];
    if(localStorage.getItem('myCart') !== null){
        cartStorage = JSON.parse(localStorage.getItem('myCart'));
    }

    let result = cartStorage.findIndex(x => {
        return ((x.productName === cartProduct.productName) &&
                (x.productStyle === cartProduct.productStyle) && 
                (x.productColor === cartProduct.productColor) && 
                (x.productSize === cartProduct.productSize));
        
    });
    if(result > -1){
        //Update product quantity
        cartStorage[result].productQuantity += cartProduct.productQuantity;
    }
    else{
        cartStorage.push(cartProduct);
    }
    document.querySelector('div.additional_items > p > span.numberOfItems').innerHTML = cartStorage.length;
    localStorage['myCart'] = JSON.stringify(cartStorage);
        
}   

    
  



