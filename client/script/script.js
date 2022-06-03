// AFTER LOAD PAGE ABLE TO TRANSITION

window.addEventListener("load", () => {
    document.body.classList.remove("preload");
})

import { print } from './page_loader.js'


// SIDEBAR MENU SHOW/HIDE

const HAMBURGER = document.querySelector('.hamburger');
const SIDE_BAR = document.querySelector('#side-bar');

let open;
if (localStorage.getItem("sideBar")) {
    open = localStorage.getItem("sideBar");
} else {
    open = false;
    localStorage.setItem("sideBar", open.toString());
}


// !!! FIX IT !!!




if (open) {
    HAMBURGER.classList.add('hamburger--active');
    SIDE_BAR.classList.remove('hide');
}



//


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
        open = true;
        localStorage.setItem("sideBar", open.toString());
        window.addEventListener('click', hideSidebarOutsideClick);
        window.addEventListener('touchstart', hideSidebarOutsideClick);
    } else {
        open = false;
        localStorage.setItem("sideBar", open.toString());
        window.removeEventListener('click', hideSidebarOutsideClick);
        window.removeEventListener('touchstart', hideSidebarOutsideClick);
        // console.log("toggle");
    }
}

HAMBURGER.addEventListener('click', toggleSideBar);


// DROP-DOWN DIETS MENU WITH TRANSITION

const DIETS_BUTTON = document.querySelector("a.diets");
console.log(DIETS_BUTTON);
const DIETS_LIST = document.querySelector(".inner-list.diets");
console.log(DIETS_LIST);

const transformUp = "visibility .2s ease-in-out, max-height .6s ease-in-out, opacity .1s ease-in-out, padding .4s ease-in-out";
const transformDown = "visibility .6s ease-in-out, max-height .6s ease-in-out, opacity .2s .4s ease-in-out, padding .4s ease-in-out";


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


// FILL PRODUCTS TABLE WITH DATA

const productsTable = document.querySelector("#products");
const productsTBody = document.createElement("tbody");
productsTBody.classList.add("products__body");


// RENDER DATA FROM DB

const renderFromDB = async function () {
    const searchInputValue = document.querySelector("#search__input").value;
    console.log(searchInputValue);
    await fetch(`http://localhost:5000/products/`)
        .then(response => response.json())
        .then(data => {
            productsTBody.innerHTML = '';
            for (const el of data) {
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
                    // Add row to Table Body
                    productsTBody.appendChild(tableRow);
                }
            }
            productsTable.appendChild(productsTBody);
        })
}


// RENDER DATA FROM SAMPLE DATA

const render = async function () {
    const searchInputValue = document.querySelector("#search__input").value;
    console.log(searchInputValue);
    await fetch(`./sampleData/products.json`)
        .then(response => response.json())
        .then(data => {
            productsTBody.innerHTML = '';
            for (const el of data) {
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
                    // Add row to Table Body
                    productsTBody.appendChild(tableRow);
                }
            }
            productsTable.appendChild(productsTBody);
        })
        .catch(error => console.log(error));
    return false;
}



// DYNAMIC SEARCH
const searchInput = document.querySelector("#search__input");

if (searchInput) {
    render();
    searchInput.addEventListener("input", () => {
        render();
    })
}
