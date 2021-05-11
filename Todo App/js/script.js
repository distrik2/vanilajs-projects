document.addEventListener("DOMContentLoaded", () => {

    const input = document.querySelector('input[type="text"]');
    const todoList = document.querySelector('.todo');
    const chekbox = document.querySelectorAll('input[type="checkbox"]');
    const form = document.querySelector("form");

    let items = JSON.parse(localStorage.getItem("todoTest"));
    let storageAdd = [];
    let copyStorage = [];
    if (items != null) { storageAdd = copyStorage.concat(items); }

    function loadTodo() {
        if (localStorage.getItem('todoTest')) {
            items.forEach(i => {
                todoList.innerHTML += `
                    <li>
                        <input type="checkbox" name="" id="">
                        <label for="${i.id}">${i.title}</label>
                        <label type="delete" for="">Удалить</label>
                    </li>
                `;
            });
        }
    }

    function deleteElement() {
        document.querySelectorAll('label[type="delete"]').forEach((i, item) => {
            i.addEventListener("click", (e) => {
                i.parentElement.remove();
                
                storageAdd.splice(item, 1);
                localStorage.setItem("todoTest", JSON.stringify(storageAdd));
            });
        });
    }

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        let todoObj = {
            title: "",
            done: "false",
            id: 0
        };

        if (input.value !== "" && input.value !== " ") {
            todoObj.title = input.value;
            todoObj.id = storageAdd.length;
            storageAdd.push(todoObj);

            localStorage.setItem("todoTest", JSON.stringify(storageAdd));
            todoList.innerHTML += `
                <li>
                    <input type="checkbox" name="" id="">
                    <label for="${todoObj.id}">${todoObj.title}</label>
                    <label type="delete" for="">Удалить</label>
                </li>
            `;
            form.reset();
        } else {
            alert("але");
        }

        deleteElement();
    });

    loadTodo();
    deleteElement();
});