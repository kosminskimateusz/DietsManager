// AFTER LOAD PAGE ABLE TO TRANSITION

window.addEventListener("load", () => {
    document.body.classList.remove("preload");
})


import { print } from './page_loader.js'

const HAMBURGER = document.querySelector('.hamburger');
const SIDE_BAR = document.querySelector('#side-bar');

function hideSidebarOutsideClick(evt) {
    if (!document.querySelector('nav').contains(evt.target)
        && !document.querySelector('.hamburger').contains(evt.target)) {
        toggleSideBar();
        window.removeEventListener('click', hideSidebarOutsideClick);
        window.removeEventListener('touchstart', hideSidebarOutsideClick);
    }
}

const toggleSideBar = () => {
    HAMBURGER.classList.toggle('hamburger--active');
    SIDE_BAR.classList.toggle('hide');

    if (HAMBURGER.classList.contains('hamburger--active')) {
        window.addEventListener('click', hideSidebarOutsideClick);
        window.addEventListener('touchstart', hideSidebarOutsideClick);
    } else {
        window.removeEventListener('click', hideSidebarOutsideClick);
        window.removeEventListener('touchstart', hideSidebarOutsideClick);
        // console.log("toggle");
    }
}

HAMBURGER.addEventListener('click', toggleSideBar);




const config = { attributes: true };




// MUTATION OBSERVER FOR HAMBURGER--ACTIVE

// const callback = function (mutationList, observer) {
//     for (const mutation of mutationList) {
//         if (mutation.type === 'attributes') {
//             if (HAMBURGER.classList.contains('hamburger--active')) {

//                 console.log("changed");
//             }
//         }
//     }
// }

// const observer = new MutationObserver(callback);
// observer.observe(HAMBURGER, config);


// Drop-down Diets menu

const DIETS_BUTTON = document.querySelector("a.diets");
console.log(DIETS_BUTTON);
const DIETS_LIST = document.querySelector(".inner-list.diets");
console.log(DIETS_LIST);

const transformUp = "max-height .6s ease-in-out, opacity .2s ease-in-out, padding .4s ease-in-out";
const transformDown = "max-height .6s ease-in-out, opacity .2s .4s ease-in-out, padding .4s ease-in-out";

const toggleList = () => {
    if (!DIETS_LIST.classList.contains("toggle")) {
        DIETS_LIST.classList.add("toggle");
        DIETS_LIST.style.transition = transformUp;
    } else {
        DIETS_LIST.classList.remove("toggle");
        DIETS_LIST.style.transition = transformDown;
    }
}
DIETS_BUTTON.addEventListener('click', toggleList);







// await fetch('http://localhost:5000/products/')
//     .then(res => res.json())
//     .then(data => products = data)
//     .then(() => console.log(products));


// async function getProducts() {
//     try {
//         let exam;
//         const response = await (await fetch('https://www.boredapi.com/api/activity')
//             .then(res => res.json())
//             .then(data => exam = data));

//         return exam;
//     } catch (error) {
//         console.error(error.message);
//     }
// }


// FILL PRODUCTS TABLE WITH DATA

const productsTable = document.querySelector("#products");
const productsTBody = document.createElement("tbody");
productsTBody.classList.add("products__body");


const render = async function () {
    const searchInputValue = document.querySelector("#search__input").value;
    console.log(searchInputValue);
    await fetch(`./sampleData/products.json`)
        .then(response => response.json())
        .then(data => {
            productsTBody.innerHTML = '';
            for (const el of data.data) {
                if (el.name.toLowerCase().includes(searchInputValue.toLowerCase())) {
                    const tableRow = document.createElement("tr");
                    // Add ID to table
                    const idTableData = document.createElement("td");
                    idTableData.innerHTML = el.id;
                    tableRow.appendChild(idTableData);
                    // Add Name to table
                    const nameTableData = document.createElement("td");
                    nameTableData.innerHTML = el.name;
                    tableRow.appendChild(nameTableData);
                    // Add Kcal to table
                    const kcalTableData = document.createElement("td");
                    kcalTableData.innerHTML = el.kcal;
                    tableRow.appendChild(kcalTableData);

                    productsTBody.appendChild(tableRow);
                }
            }
            productsTable.appendChild(productsTBody);
        })
        .catch(error => console.log(error));
    return false;
}

render();

// DYNAMIC SEARCH
const searchInput = document.querySelector("#search__input");

searchInput.addEventListener("input", () => {
    render();
})
