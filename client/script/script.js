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