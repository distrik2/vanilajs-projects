"use strict";
document.addEventListener("DOMContentLoaded", () => {

    const binary = document.querySelector(".Binary");
    const decimal = document.querySelector(".Decimal");
    binary.setAttribute("readonly", "readonly");

    function toBinari(dec) {
        let decimal = +dec;
        let a = "";
        while (true) {
            a = a + decimal % 2;
            decimal = Math.floor(decimal / 2);
            if (decimal === 0) {
                break;
            }
        }
        return a.split("").reverse().join("");
    }
    decimal.addEventListener("input", (e) => {
        if (Number(decimal.value) && decimal.value !== null && decimal.value !== " ") {
            binary.value = toBinari(decimal.value);
        }
    });

});

