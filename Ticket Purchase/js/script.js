"use strict";

const box = document.querySelectorAll(".box");
const place = document.querySelectorAll("[data-place]");
const form = document.querySelector("form");
const priceplace = document.querySelector(".price_place");
const modalform = document.querySelector(".modal_form");

let items;
if (localStorage.getItem("ticketSale") == null) {
    localStorage.setItem("ticketSale", JSON.stringify([{}]));
} else {
    items = JSON.parse(localStorage.getItem("ticketSale"));
}

function loadFreePlace(item) {
    place.forEach(i => {
        if (i.dataset.place == item) {
            i.classList.add("placeSale");
        }
    });
}

function storage() {
    if (items) {
        items.forEach(i => {
            loadFreePlace(i.place);
        });
    }
}

storage();

function buyPlace(place) {
    if (!place.classList.contains("placeSale")) {

        modalform.classList.remove("hidden_sec");
        priceplace.innerHTML = `
            <p>2 Ряд, ${place.dataset.place} Место</p> <p>К оплате: 8 675 тенге</p>
        `;

        form.addEventListener("submit", (e) => {

            let data = new FormData(form);
            let objForm = Object.fromEntries(data.entries());

            if (objForm.username !== null && objForm.username !== "" &&
                objForm.email !== null && objForm.email !== "") {

                objForm.place = place.dataset.place;

                place.classList.add("placeSale");
                items.push(objForm);
                localStorage.setItem('ticketSale', JSON.stringify(items));

                modalform.classList.add("hidden_sec");
                form.reset();

            } else {
                alert("чел");
                e.preventDefault();
            }
        });
    }
}

box.forEach(i => {
    i.addEventListener("click", (e) => {
        buyPlace(i);
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