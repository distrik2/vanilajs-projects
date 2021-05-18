document.addEventListener("DOMContentLoaded", () => {

    const input = document.querySelector('input[type="text"]');
    const todoList = document.querySelector('.todo');
    const form = document.querySelector("form");

    let items;
    if (localStorage.getItem("todoTest") == null) {
        localStorage.setItem("todoTest", JSON.stringify([{}]));
    } else {
        items = JSON.parse(localStorage.getItem("todoTest"));
    }

    function loadTodo() {
        if (localStorage.getItem('todoTest')) {
            items.forEach((i, item) => {
                todoList.innerHTML += `
                    <li>
                        <input type="checkbox" ${items[item].done}>
                        <label>${i.title}</label>
                        <label type="delete" for="">Удалить</label>
                    </li>
                `;
            });
        }
    }


    document.querySelectorAll('li').forEach((j) => {
        console.log(j.children[0]);
    });


    function doneElement() {
        document.querySelectorAll('li').forEach((i, item) => {
            i.addEventListener("change", (e) => {

                if (items[item].done === "checked") {
                    items[item].done = "false";
                } else {
                    items[item].done = "checked";
                }

                localStorage.setItem("todoTest", JSON.stringify(items));
            });
        });
    }

    function deleteElement() {
        document.querySelectorAll('label[type="delete"]').forEach((i, item) => {
            i.addEventListener("click", (e) => {
                i.parentElement.remove();

                items = [];
                document.querySelectorAll('li').forEach((j) => {
                    items.push({
                        title: j.children[1].innerHTML,
                        done: j.children[0].checked
                    });
                });

                localStorage.setItem("todoTest", JSON.stringify(items));
            });
        });
    }

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        let todoObj = {
            title: "",
            done: "false"
        };

        if (input.value !== "" && input.value !== " ") {
            todoObj.title = input.value;
            items.push(todoObj);

            localStorage.setItem("todoTest", JSON.stringify(items));
            todoList.innerHTML += `
                <li>
                    <input type="checkbox">
                    <label>${todoObj.title}</label>
                    <label type="delete" for="">Удалить</label>
                </li>
            `;
            form.reset();
        } else {
            alert("але");
        }

        doneElement();
        deleteElement();
    });

    loadTodo();
    doneElement();
    deleteElement();
});