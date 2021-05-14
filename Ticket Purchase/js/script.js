"use strict";

const box = document.querySelectorAll(".box");
const place = document.querySelectorAll("[data-place]");
const form = document.querySelector("form");
form.classList.add("hidden_sec");

let items = JSON.parse(localStorage.getItem("test"));
let arrayPush = [];
let copyСoncat = [];
if (localStorage.getItem('test')) { arrayPush = copyСoncat.concat(items); }

function loadFreePlace(item) {
    place.forEach(i => {
        if (i.dataset.place == item) {
            i.classList.add("placeSale");
        }
    });
}

function storage() {
    if (localStorage.getItem('test')) {
        items.forEach(i => {
            loadFreePlace(i.place);
        });
    }
}

function buyPlace(place) {
    
    form.classList.remove("hidden_sec");
    form.addEventListener("submit", (e) => {
        // e.preventDefault();

        let data = new FormData(form);
        let objForm = Object.fromEntries(data.entries());

        if (objForm.username !== null && objForm.username !== "" &&
            objForm.email !== null && objForm.email !== "") {

            objForm.place = place.dataset.place;

            place.classList.add("placeSale");
            arrayPush.push(objForm);
            localStorage.setItem('test', JSON.stringify(arrayPush));

        } else {
            console.log("чел");
        }

        form.classList.add("hidden_sec");
        form.reset();
    });
}

box.forEach(i => {
    i.addEventListener("click", (e) => {
        if (arrayPush.includes(i.dataset.place)) {
            alert("Занято");
        } else {
            buyPlace(i);
        }
    });


    i.addEventListener("mouseover", (e) => {
        e.target.style.backgroundColor = "rgb(148, 210, 252)";
    });
    i.addEventListener("mouseout", (e) => {
        e.target.style.backgroundColor = "";
    });


});

storage();