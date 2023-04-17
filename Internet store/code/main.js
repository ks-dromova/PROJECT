
let currentPage = 1;
let rows = 10,

    sizeRez= [];
    colRez= [];


function displayList(arr, rowPerPage, page) {
    const postsEl = document.querySelector('#products_container');
    postsEl.innerHTML = "";
    page--;

    const start = rowPerPage * page; /*rowPerPage-это количество страниц*/
    const end = start + rowPerPage;



    let paginatedData = arr.slice(start, end);

    paginatedData.forEach((e) => {

        let colors = e.color.map(function (elem) {
            let colorItem = document.createElement('div');
            colorItem.className = 'color-item';
            colorItem.style.backgroundColor = elem;
            return colorItem;
        });
        colors = colors.map(c => c.outerHTML);

        const productHTML = `<div class="card" data-id="${e.item}">
    <img src="../img/catalog/${e.imgSrc}" alt=""><br>
    <div class="name">${e.title}</div>
    <div class="stars">
        <img src="../img/yellow_star.png" alt="star">
        <img src="../img/yellow_star.png" alt="star">
        <img src="../img/yellow_star.png" alt="star">
        <img src="../img/yellow_star.png" alt="star">
        <img src="../img/yellow_star.png" alt="star">
    </div>
    <p class="price">As low as <span class="money">$${e.price}</span></p>
    <div class="colors" id="colors_container">${colors.join('')}</div>
    <div class="add_card" data-action= "button_cart" dara-art = "${e.item}">
        <a href="#"><img src="../img/add_card.png" alt="add_card"> <span>&nbsp;&nbsp;&nbsp;ADD
                TO CART</span></a>
    </div>`;

        postsEl.insertAdjacentHTML('beforeend', productHTML);

    })
}
/*----------Кнопки в зависимости от количества постов-----------*/
function displayPagination(arr, rowPerPage) {
    const paginationEl = document.querySelector('.pagination');
    paginationEl.innerHTML = "";
    const pagesCount = Math.ceil(arr.length / rowPerPage); /*округляет в большую сторону*/
    const ulEl = document.createElement("ul");
    ulEl.classList.add('pagination_list');

    for (let i = 0; i < pagesCount; i++) {
        const liEl = displayPaginationBtn(i + 1);
        ulEl.appendChild(liEl);
    }
    paginationEl.appendChild(ulEl);
}

function displayPaginationBtn(page) {
    const liEl = document.createElement("li");
    liEl.classList.add('pagination_item')
    liEl.innerText = page

    if (currentPage == page) liEl.classList.add('pagination_item_active');

    liEl.addEventListener('click', () => {
        currentPage = page;
        if (sizeRez.length > 0) {
            displayList(sizeRez, rows, currentPage);
        } else {
            if (colRez.length > 0) {
                displayList(colRez, rows, currentPage);
            } else {
                displayList(catalog, rows, currentPage);
            }
        }


        let currentItemLi = document.querySelector('li.pagination_item_active');
        currentItemLi.classList.remove('pagination_item_active');

        liEl.classList.add('pagination_item_active');
    })

    return liEl;

}

displayList(catalog, rows, currentPage);
displayPagination(catalog, rows);

/*----------filter SIZE--------------------*/

document.querySelector('.filter_box').addEventListener('click', (event) => {
    const filterClass = event.target.dataset['f'];
    console.log(filterClass);

    if (sizeRez.length > 0){
        return
    }else

    if(colRez.length > 0){
        colRez.filter((e) => {

            if (String(e.size).includes(filterClass) == true) sizeRez.push(e);

        });
        console.log(sizeRez);
    } else{

    catalog.filter((e) => {

        if (String(e.size).includes(filterClass) == true) sizeRez.push(e);


    });
    console.log(sizeRez);
}

    displayList(sizeRez, rows, currentPage);
    displayPagination(sizeRez, rows);

  if(sizeRez.length > 0 && colRez.length > 0){
    sizeRez = [];
    colRez = [];

  }
});

/*-----------------------------------------------------------------------*/

document.querySelector('#filter_box').addEventListener('click', (event) => {
    const filterColClass = event.target.dataset['f'];
    console.log(filterColClass);

    if (colRez.length > 0){
        return
    }else

    if(sizeRez.length > 0){
        sizeRez.filter((e) => {

            if (e.color.includes(filterColClass) == true) colRez.push(e);

        });
        console.log(colRez);
    } else{

    catalog.filter((e) => {

        if (e.color.includes(filterColClass) == true) colRez.push(e);

    });

    console.log(colRez);
}

    displayList(colRez, rows, currentPage);
    displayPagination(colRez, rows);

    if(sizeRez.length > 0 && colRez.length > 0){
        sizeRez = [];
        colRez = [];
    }
});

    /*----------------------ДОБАВЛЕНИЕ В КОРЗИНУ----------------------*/
    window.addEventListener('click', function (event) {
        console.log('click');
        console.log(event.target);

        if (event.target.closest('.add_card')) {
            console.log('button_cart');
            // Находим обертку кнопки
            const cardWrapper = event.target.closest('.card');
            console.log(cardWrapper);
            const btnArt = {
                item: cardWrapper.dataset.id,
            };
            console.log(btnArt.item);
            const elProduct = catalog.find((elem) => elem.item === parseInt(btnArt.item));
            console.log(elProduct);

            if (!localStorage.Product) {
                localStorage.Product = JSON.stringify([]);
            };

            const cart = JSON.parse(localStorage.Product);
            cart.push(elProduct);

            localStorage.setItem('Product', JSON.stringify(cart));

            console.log(cart);

            window.open('/cart/index.html');

        }

        if (event.target.closest('.card')) {
            console.log('click');
            const card = event.target.closest('.card');
            const productInfo = {
                title: card.querySelector('.name').innerText,
            };
            console.log(productInfo);
            window.open(`/view_short_details/index.html?title=${productInfo.title}`);

        }
    });

