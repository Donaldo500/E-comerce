const updateCartPosition = () => {
    const newHeight = header.offsetHeight;

    if (newHeight !== headerHeight) {
        headerHeight = newHeight;

        cart[0].style.top = `${headerHeight}px`;
        cart[0].style.height = `calc(100dvh - ${headerHeight}px)`;
        menu[0].style.top = `${headerHeight}px`;
        menu[0].style.height = `calc(100dvh - ${headerHeight}px)`;
    }
}

const icon = document.getElementsByTagName("img");
const menu = document.getElementsByClassName("menu");

icon[0].addEventListener('click', () => {
    menu[0].classList.add("show_menu");
    cart[0].classList.remove("show_cart");
});

const parent = document.querySelector(".menu_title");
const close = parent.lastElementChild;

close.addEventListener('click', () => {
    menu[0].classList.remove("show_menu");
}); 

const cart = document.getElementsByClassName("cart");

icon[2].addEventListener('click', () => {
    cart[0].classList.add("show_cart");
    menu[0].classList.remove("show_menu");
});

const cartParent = document.querySelector(".cart_title");
const closeCart = cartParent.lastElementChild;

closeCart.addEventListener('click', () => {
    cart[0].classList.remove("show_cart");
});

const products = document.querySelectorAll(".product");
const cart_items = document.querySelector(".cart_items");

products.forEach((product) => {
    const addParent = product.lastElementChild;
    const add = addParent.lastElementChild;

    add.addEventListener('click', () => {
        const article = document.createElement('article');
        article.setAttribute("class", "cart_item");
        cart_items.appendChild(article);

        const imgProduct = document.createElement('img');
        imgProduct.src = product.firstElementChild.src;
        article.appendChild(imgProduct);

        const div = document.createElement('div');
        div.setAttribute("class", "product_info");
        article.appendChild(div);

        const parentdiv = product.querySelector(".info");

        const nameProduct = document.createElement('p');
        nameProduct.textContent = parentdiv.firstElementChild.textContent;
        div.appendChild(nameProduct);

        const priceProduct = document.createElement('p');
        priceProduct.textContent = parentdiv.lastElementChild.textContent;
        div.appendChild(priceProduct);

        const imgTrash = document.createElement('img');
        imgTrash.src = 'img/Trash_icon.png';
        article.appendChild(imgTrash);

        imgTrash.addEventListener('click', () => {
        article.remove();
        cartCount--;
        cartCountElement.textContent = cartCount;

        if (cartCount === 0) {
            cartCountElement.classList.add("hide");
        }

        requestAnimationFrame(() => {
            cart_items.scrollTop = cart_items.scrollHeight;
        });
        });
    });
});

let cartCount = 1;
const cartCountElement = document.getElementById('counter');
const addToCartButtons = document.querySelectorAll('.add_cart');

addToCartButtons.forEach(button => {
  button.addEventListener('click', () => {
    cartCount++;
    cartCountElement.textContent = cartCount;
    
    if(cartCount > 0){
        cartCountElement.classList.remove("hide");
    }
  });
});

const cartItems = document.querySelectorAll(".cart_item");

cartItems.forEach((cartItem) => {
    const trash = cartItem.lastElementChild;

    trash.addEventListener('click', () => {
        cartItem.remove();
        cartCount--;
        cartCountElement.textContent = cartCount;

        if(cartCount == 0){
            cartCountElement.classList.add("hide");
        }
    });
});

const header = document.querySelector('header');
let headerHeight = header.offsetHeight;

updateCartPosition();
requestAnimationFrame(updateCartPosition);
setInterval(updateCartPosition, 100);
