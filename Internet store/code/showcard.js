//import { catalog } from "../code/catalog.js";
//import {cart} from "../code/pagination.js";
//console.log(cart);
/*----------ПОЛУЧАЕМ ПАРАМЕТРЫ ИЗ URL-----------------------*/
let params = (new URL(document.location)).searchParams;
let title = params.get('title');
console.log(title);

const detail = catalog.find((el) => el.title === title); //записываем в переменную элемент карточку из каталога
//console.log(el.title);
console.log(title);
console.log(detail);

    let colors = detail.color.map(function (elem) {
        let colorItem = document.createElement('div');
        colorItem.className = 'color-item';
        colorItem.style.backgroundColor = elem;
        return colorItem;
    });
    colors = colors.map(c => c.outerHTML);

    let sizes = detail.size.map(function (elem) {
        let sizeItem = document.createElement('div');
        sizeItem.className = 'size-item';
        sizeItem.innerHTML = elem;
        return sizeItem;
    });
    sizes = sizes.map(s => s.outerHTML);
const pasteDetail = document.querySelector('#pastejs');

    
    const cardDetail = ` <div class="breadcrumb">
    <ul class="breadcrumb_ul">
        <li><a href="../index.html">HOME</a></li>
        <li><a href="../page2/index.html">SHORTS</a></li>
       <li>${detail.title}</li>
    </ul>
</div>

    <div class="card__container" data-id="${detail.item}">
        <div class="card__img"> <img src="../img/catalog/${detail.imgSrc}" alt=""></div>
        <div class="card__description">
            <div class="title">${detail.title}<span>&nbsp;ITEM #${detail.item}</span></div>
            <div class="stars">
                <img src="../img/yellow_star.png" alt="star">
                <img src="../img/yellow_star.png" alt="star">
                <img src="../img/yellow_star.png" alt="star">
                <img src="../img/yellow_star.png" alt="star">
                <img src="../img/yellow_star.png" alt="star">
            </div>
            <p class="price">As low as <span class="money_price"><br>${detail.price}</span></p>
            <div class="mini_block">COLOR:</div>
            <div class="colors">${colors.join('')}</div>
            <div class="mini_block">SIZE:<br></div>
            <div class="size">${sizes.join('')} </div>
            <div class="buttons">
                <div class="add_tobag">
                    <a href="#"><img src="../img/add_card.png" alt="add_card"> <span>&nbsp;&nbsp;&nbsp;ADD
                            TO BAG</span></a>
                </div>
                <div class="add_wishlist">
                    <a href="#"><img src="../img/wish.svg" alt="add_wish"> <span>&nbsp;&nbsp;&nbsp;ADD
                            TO WISHLIST</span></a>
                </div>
            </div>
            <div class="social_media">
                <ul class="social_icons">
                    <li><a href="#"><img src="../img/FB.svg"></a></li>
                    <li><a href="#"><img src="../img/twitter.svg"></a></li>
                    <li><a href="#"><img src="../img/pinterest.svg"></a></li>
                    <li><a href="#"><img src="../img/link.svg"></a></li>
                </ul>
            </div>
            <div class="free_shop">
                <div class="free_shop_title">- Worry Free Shopping -</div>
                <hr class="gorizont_line">
                <div class="free_shop_description">
                    <div class="free_delivery">
                        <div class="free_delivery_car"><img src="../img/car.svg" alt=""></div>
                        <div class="free_delivery_car_description">FREE PRIORITY SHIPPING ON <br> ORDERS $99+*
                        </div>
                    </div>
                    <div class="free_delivery_exchange">
                        <div class="exchange"><img src="../img/exchange.svg" alt=""></div>
                        <div class="exchange_description">FREE RETURNS & EXCHANGES*</div>
                    </div>
                </div>
            </div>
        </div>                
    </div>
    <div class="detail_title">DETAILS</div>
    <div class="details">${detail.details}</div>`
    pasteDetail.insertAdjacentHTML('beforeend', cardDetail);
//});

/*-----------ДОБАВЛЕНИЕ В КОРЗИНУ-----------------------*/

window.addEventListener('click', function (event) {
    console.log('click');
    console.log(event.target);
   
    if (event.target.closest('.add_tobag')) {
        console.log('button_cart');
        // Находим обертку кнопки
        const cardWrapper = event.target.closest('.card__container');
        console.log(cardWrapper);
        const btnArt = {
            item: cardWrapper.dataset.id,
        };
        console.log(btnArt.item);
        const elProduct = catalog.find((elem) => elem.item === parseInt(btnArt.item));
        console.log(elProduct);

        if(!localStorage.Product){
            localStorage.Product = JSON.stringify([]);
        };
    
        const cart = JSON.parse(localStorage.Product);
        cart.push(elProduct);
    
        //localStorage.setItem('Product', JSON.stringify(cart));
        localStorage.Product = JSON.stringify(cart);
    
        console.log(cart);
    
        window.open('/cart/index.html');
   
    }
});

   




