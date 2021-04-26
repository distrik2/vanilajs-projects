document.addEventListener("DOMContentLoaded", () => {

    const h1Text = document.querySelector(".h1_text");
    const btns = document.querySelector(".btn");
    const restartBtn = document.querySelector(".restart_btn");
    const timer = document.querySelector(".timer");
    const testTimer = document.querySelector(".timer__________");
    const textType = document.querySelector(".text_type");
    let myArr = ["кабина", "кабинет", "каблук", "кавалерия",
        "казарма", "калач", "калека", "календарь", "калина",
        "калитка", "калоша", "камера", "кампания", "камыш",
        "канал", "канарейка", "каникулы", "канонада",
        "канцелярия", "капитал", "капитан", "капитуляция",
        "капкан", "капуста", "карабкаться", "караван",
        "карандаш", "карантин", "карась", "караулить",
        "карета", "карикатура", "картон", "картофель",
        "карусель", "кассета", "кастрюля", "каталог",
        "катастрофа", "категория", "кафтан", "кашлять",
        "каштан", "каяться", "квалификация", "квартал",
        "квартира", "квитанция", "кенгуру", "керосин",
        "кибитка", "килограмм", "километр", "киоск",
        "кипеть", "клавиши", "кобура", "коварство",
        "коверкать", "ковырять", "коврижка", "ковыль",
        "колбаса", "колебание", "коллективный", "коллегия",
        "колесо", "колея", " колибри", "количество", "колодец",
        "колокол", "колонна", "колонка", "колос", "колосс",
        "колорит", "колоссальный", "колотить", "колхоз", "колыбель",
        "колыхать", "командир", "комбайн", "комбинация", "комбинезон",
        "комедия", "комендант", "комета", "комиссия", "комитет", "комната",
        "коммунист", "компания", "комплект", "компас", "компенсация",
        "композитор", "компот", "комсомолец"];
    let chekar = [];
    let countText = 0;
    let TextRight = 0;

    let trueARR1 = [];
    let falseARR2 = [];

    function addArray(text) {
        countText++;
        chekar.push(text.toLowerCase());
    }

    function contains(where, what) {
        for (var i = 0; i < what.length; i++) {
            if (where.indexOf(what[i]) != -1) {++TextRight, trueARR1.push(what[i]) ,delete where[i];}
            else {falseARR2.push(what[i]);}
        }
    }

    function ArrayFOR() {
        let start = Date.now();
        let timerINTERVAL = setInterval(function () {
            let timePassed = Date.now() - start;
            if (timePassed >= Number(timer.value) * 1000) {
                clearInterval(timerINTERVAL);
            }
            arrDraw();
        }, 900);

        let item = 0;
        function arrDraw() {
            h1Text.innerHTML = myArr[item];
            ++item;
            testTimer.innerHTML--;
            if (testTimer.innerHTML < 0) {
                testTimer.innerHTML = 0;
            }
        }
    }

    textType.addEventListener("keydown", (e) => {
        if (e.code === "Enter") {
            if (e.target.value !== "" && e.target.value !== " ") {
                addArray(e.target.value);
                e.target.value = "";
            }
        }
    });

    textType.style.display = "none";
    restartBtn.style.display = "none";
    testTimer.style.display = "none";
    btns.addEventListener("click", (event) => {
        btns.classList.toggle("active");
        event.preventDefault();

        let start = Date.now();

        function draw() {
            contains(myArr, chekar);
            btns.classList.remove("active");
            timer.removeAttribute("readonly", "readonly");
            textType.style.display = "none";
            h1Text.innerHTML = 'Впишите желаемое время в секундах:';
            h1Text.innerHTML = `Вы написали ${TextRight} верных слов из ${countText}, за ${timer.value} секунд.`;
            restartBtn.style.display = "block";
            timer.style.display = "none";
            testTimer.style.display = "none";
            textType.value = "";
            timer.value = "";
            console.log(trueARR1, falseARR2);
            countText = 0; TextRight = 0; chekar = [];
            console.log(Date.now() - start);
        }


        if (timer.value === "" || isNaN(timer.value) || timer.value === " " || timer.value > 60 || timer.value <= 5) {
            alert("чел, можно только числовые значение меньше 60 и больше 5");
            btns.classList.remove("active");
            timer.value = "";

        } else {
            setTimeout(draw, timer.value * 1000 + 1000);
            ArrayFOR();
            testTimer.innerHTML = +timer.value;
            textType.style.display = "block";
            btns.style.display = "none";
            timer.style.display = "none";
            testTimer.style.display = "block";
        }
    });

});