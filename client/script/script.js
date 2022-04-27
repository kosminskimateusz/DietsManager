// AFTER LOAD PAGE ABLE TO TRANSITION

window.addEventListener("load", () => {
    document.body.classList.remove("preload");
})

import { print } from './page_loader.js'
let products;

print();


const HAMBURGER = document.querySelector('.hamburger');
const SIDE_BAR = document.querySelector('#side-bar');

const toggleSideBar = () => {
    HAMBURGER.classList.toggle('hamburger--active');
    SIDE_BAR.classList.toggle('hide');
}

HAMBURGER.addEventListener('click', toggleSideBar);


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

console.log(window.location.href);
console.log(window.location.origin);
console.log(window.location.host);
const clientUrl = window.location.origin;
if (window.location.href === `${clientUrl}/products.html`) {
    fetch(`${clientUrl}/DietsManager/sampleData/products.json`)
        .then(response => response.json())
        .then(data => {
            for (const el of data.data) {
                console.log(el.id);
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
            productsTable.appendChild(productsTBody);

        })
        .catch(error => console.log(error));
} else if (window.location.href.includes("search__input")) {
}

const search = () => {
    const searchInputValue = document.querySelector("#search__input").value;
    console.log(searchInputValue);
    fetch(`${clientUrl}/DietsManager/sampleData/products.json`)
        .then(response => response.json())
        .then(data => {
            productsTBody.innerHTML = '';
            for (const el of data.data) {
                if (el.name.includes(searchInputValue)) {
                    console.log(el.id);
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

}

const searchButton = document.querySelector("#search__button");

searchButton.addEventListener("click", search);