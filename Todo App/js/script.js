document.addEventListener("DOMContentLoaded", () => {

    const input = document.querySelector('input[type="text"]');
    const todoList = document.querySelector('.todo');
    const form = document.querySelector("form");

    let items = JSON.parse(localStorage.getItem("todoTest"));
    let itemsLocal = Object.values(localStorage);

    let storageAdd = [];
    let copyStorage = [];
    let testarr = [];

    copyStorage = testarr.concat(items);

    // console.log(copyStorage);


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
        document.querySelectorAll('label[type="delete"]').forEach(i => {
            i.addEventListener("click", (e) => {
                let parent = i.parentElement.children[1].textContent;

                if (localStorage.getItem('todoTest')) {
                    items.forEach((i, item, elem) => {
                        // console.log(i);

                        if (parent === i.title) {
                            // copyStorage.splice(0, i.id);
                            // console.log(i.id);
                            // console.log(copyStorage);
                        }
                    });
                }

                i.parentElement.remove();
            });
        });
    }

    function doneOrNotElement() {
        document.querySelectorAll('input[type="checkbox"]').forEach(i => {
            i.addEventListener("change", (e) => {

                let items = JSON.parse(localStorage.getItem("todoTest"));

                if (localStorage.getItem('todoTest')) {
                    items.forEach(i => {
                        console.log(i.done);
                    });
                }
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
        doneOrNotElement();
    });

    loadTodo();
    deleteElement();
    doneOrNotElement();

});