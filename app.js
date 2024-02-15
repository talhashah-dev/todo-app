let todosList = document.getElementById("list");
let createBtn = document.getElementById("create");


let todos = [];

createBtn.addEventListener("click" , createNewTodo);

function createNewTodo(){
    const item = {
        id: Math.floor(Math.random() * new Date().getTime()),
        text: "",
        complete: false
    };

    todos.unshift(item);

    const { item_el, input_el } = createTodoEle(item);

    todosList.prepend(item_el);

    input_el.removeAttribute("disabled");
    input_el.focus();

    Save();
    
};


function createTodoEle(item){
    const item_el = document.createElement("div");
    item_el.classList.add("item");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = item.complete;

    if(item.complete){
        item_el.classList.add("complete");
    }

    const input_el = document.createElement("input");
    input_el.type = "text";
    input_el.value = item.text;
    input_el.setAttribute("disabled", "");

    const actions_el = document.createElement("div");
    actions_el.classList.add("actions");

    const edit_btl_el = document.createElement("button");
    edit_btl_el.classList.add("material-symbols-outlined");
    edit_btl_el.innerText = "edit";

    const remove_btl_el = document.createElement("button");
    remove_btl_el.classList.add("material-symbols-outlined" , "remove");
    remove_btl_el.innerText = "delete";

    actions_el.append(edit_btl_el);
    actions_el.append(remove_btl_el);

    item_el.append(checkbox);
    item_el.append(input_el);
    item_el.append(actions_el);


    // EVENTS

    checkbox.addEventListener("change" , () => {
        item.complete = checkbox.checked;

        if(item.complete){
            item_el.classList.add("complete");
        } else {
            item_el.classList.remove("complete");
        }

        Save();
    });


    input_el.addEventListener("input" , () => {
        item.text = input_el.value;
    });

    input_el.addEventListener("blur" , () =>{
        input_el.setAttribute("disabled", "");
        Save();
    });

    edit_btl_el.addEventListener("click", () => {
        input_el.removeAttribute("disabled");
        input_el.focus();
    });

    remove_btl_el.addEventListener("click", () =>{
        todos = todos.filter(t => t.id != item.id);

        item_el.remove();

        Save();
    });


     return {item_el, input_el, edit_btl_el, remove_btl_el}

};


function displayTodos(){
    Load();

    for (let i=0 ; i < todos.length; i++){
        const item = todos[i];

        const { item_el } = createTodoEle(item);

        todosList.append(item_el);

    }

};

displayTodos();


function Save(){
    const save = JSON.stringify(todos);

    localStorage.setItem("my_todos" , save);
}


function Load(){
    const data = localStorage.getItem("my_todos");

    if(data){
        todos = JSON.parse(data);
    }
}