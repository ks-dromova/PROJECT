
// Div внутри корзины, в который мы добавляем товары
const cartWrapper = document.querySelector('.cart-container');
console.log(cartWrapper);


// Собираем данные с этого товара и записываем их в единый объект productInfo
const productInfo = JSON.parse(localStorage.getItem('Product'));
console.log(productInfo);

productInfo.forEach(element => {
    // Проверять если ли уже такой товар в корзине
    const itemInCart = cartWrapper.querySelector(`[data-id="${element.item}"]`);
    console.log(itemInCart);

    // Если товар есть в корзине
    if (itemInCart) {
        const counterElement = document.querySelector('[data-counter]');
        console.log(counterElement);
        counterElement.innerText++;
    } else {
        // Если товара нет в корзине

        // Собранные данные подставим в шаблон для товара в корзине
        const cartItemHTML = `<div class="cart-item"> <!--flex-->
                <div class="cart-item__img">
                    <img src="../img/catalog/${element.imgSrc}" alt="">
                </div>
                <div class="cart-item__top">
                    <div class="cart-item__title">${element.title}</div>
                    <div class="cart-item__id" data-id="${element.item}">Item ${element.item}</div>
                    <div class="counter_price">
                        <div class="items items--small counter-wrapper">
                            <div class="items__control minus" data-action="minus">-</div>
                            <div class="items__current" data-counter="">1</div>
                            <div class="items__control plus" data-action="plus">+</div>
                        </div>
                        <div class="price">
                            <div class="price__currency">${element.price}&nbsp;$</div>
                        </div>
                    </div>
                   
                </div>
                <div class="cart-item__delete"></div>
            </div>`
        cartWrapper.insertAdjacentHTML('afterbegin', cartItemHTML);
    }
    calcCartPrice();
});


//Расчет общей стоимости товаров
function calcCartPrice() {

    const priceElements = cartWrapper.querySelectorAll('.price__currency');
    const totalPriceEl = document.querySelector('.sum_all');

    let totalPrice = 0;

    priceElements.forEach(function (item) {
        console.log(item);

        const amountEl = item.closest('.cart-item').querySelector('[data-counter]');

        totalPrice += parseInt(item.innerText) * parseInt(amountEl.innerText);

        console.log(totalPrice);
    })

    //отображаем цену на странице
    totalPriceEl.innerText = totalPrice;
}

 //Удаляем товар из Local Storage
 function deleteStorage(){
    const minusProduct = event.target.closest('.cart-item');
    console.log(minusProduct);
    const minusItem = minusProduct.querySelector(`[data-id]`);

    const productMinus = {
        item: minusItem.dataset.id,
    }
    console.log(productMinus);

    const delProduct = catalog.find((e) => e.item === parseInt(productMinus.item));
    console.log(delProduct);

    //const cartPlus = JSON.parse(localStorage.Product);
    const i = productInfo.indexOf(delProduct);
    console.log(i);
    productInfo.splice(i, 1);
    localStorage.setItem('Product', JSON.stringify(productInfo));
}

// Увеличение или уменбшение товара в корзине
window.addEventListener('click', function (event) {

    // Объявляем переменную для счетчика
    let counter;

    // Проверяем клик строго по кнопкам Плюс либо Минус
    if (event.target.dataset.action === 'plus' || event.target.dataset.action === 'minus') {
        // Находим обертку счетчика
        const counterWrapper = event.target.closest('.counter-wrapper');

        // Находим див с числом счетчика
        counter = counterWrapper.querySelector('[data-counter]');
        console.log(counter);
    }

    // Проверяем является ли элемент по которому был совершен клик кнопкой Плюс
    if (event.target.dataset.action === 'plus') {
        counter.innerText = ++counter.innerText;

        // Добавляем товар в локал сторидж при нажатии на +

        const plusProduct = event.target.closest('.cart-item');
        console.log(plusProduct);
        const plusItem = plusProduct.querySelector(`[data-id]`);

        const productPlus = {
            item: plusItem.dataset.id,
        }
        console.log(productPlus);

        const addProduct = catalog.find((e) => e.item === parseInt(productPlus.item));
        console.log(addProduct);

        productInfo.push(addProduct);
        localStorage.setItem('Product', JSON.stringify(productInfo));

    }

    // Проверяем является ли элемент по которому был совершен клик кнопкой Минус
    if (event.target.dataset.action === 'minus') {

        // Проверяем чтобы счетчик был больше 1
        if (parseInt(counter.innerText) > 1) {
            // Изменяем текст в счетчике уменьшая его на 1
            counter.innerText = --counter.innerText;

            //Уменьшаем количество товара в локал сторидж

            deleteStorage();
        }
        else if (parseInt(counter.innerText) === 1) {

           deleteStorage();

            event.target.closest('.cart-item').remove();
        }
        // Пересчет общей стоимости товаров в корзине
        calcCartPrice();
    }

    // Проверяем клик на + или - внутри коризины
    if (event.target.hasAttribute('data-action')) {
        // Пересчет общей стоимости товаров в корзине
        calcCartPrice();
    }
});

  