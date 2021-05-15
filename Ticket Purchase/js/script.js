"use strict";

const box = document.querySelectorAll(".box");
const place = document.querySelectorAll("[data-place]");
const form = document.querySelector("form");
const priceplace = document.querySelector(".price_place");
const modalform = document.querySelector(".modal_form");
modalform.classList.add("hidden_sec");

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
    if (!place.classList.contains("placeSale")) {

        modalform.classList.remove("hidden_sec");
        priceplace.innerHTML = `
            <p>2 Ряд, ${place.dataset.place} Место</p> <p>К оплате: 8 675 тенге</p>
        `;

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

                modalform.classList.add("hidden_sec");
                form.reset();

            } else {
                alert("чел");
            }
        });
    }
}

box.forEach(i => {
    i.addEventListener("click", (e) => {
        if (!arrayPush.includes(i.dataset.place)) {
            buyPlace(i);
        }
    });

    i.addEventListener("mouseover", (e) => {
        if (!i.classList.contains("placeSale")) {
            e.target.style.backgroundColor = "rgb(148, 210, 252)";
        }
    });
    i.addEventListener("mouseout", (e) => {
        if (!i.classList.contains("placeSale")) {
            e.target.style.backgroundColor = "";
        }
    });
});

storage();