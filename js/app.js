// variables and elements
let $ = document
const changeThemeBtnElem = $.getElementById("change-theme-btn")
const changeThemeBtnIconElem = $.getElementById("change-theme-btn-icon")
const formElem = $.getElementById("form")
const todoInputElem = $.getElementById("todo-input")
const todoContainerElem = $.getElementById("todo-container")

let theme = null
let todoList = []
let userTodo = null

// functions
const changeTheme = () => {
    if (theme === "dark") {
        theme = "light"
        localStorage.setItem("theme", theme)
        changeThemeBtnIconElem.classList.replace("fa-sun", "fa-moon")
    } else {
        theme = "dark"
        localStorage.setItem("theme", theme)
        changeThemeBtnIconElem.classList.replace("fa-moon", "fa-sun")
    }
    setTheme(theme)
}
const setTheme = theme => {

    if (theme === "dark") {
        changeThemeBtnIconElem.className = "header__right-icon fa fa-sun"

        document.documentElement.style.setProperty("--text-color", "#FFF")
        document.documentElement.style.setProperty("--body-bg-color", "#333")
        document.documentElement.style.setProperty("--box-bg-color", "#525252")
        document.documentElement.style.setProperty("--trash-color", "#F44336")
        document.documentElement.style.setProperty("--send-button-color", "#4FC3F7")
        document.documentElement.style.setProperty("--theme-btn-color", "#FFEB3B")
    } else {
        changeThemeBtnIconElem.className = "header__right-icon fa fa-moon"

        document.documentElement.style.setProperty("--text-color", "#333")
        document.documentElement.style.setProperty("--body-bg-color", "#f1f1f1")
        document.documentElement.style.setProperty("--box-bg-color", "#FFF")
        document.documentElement.style.setProperty("--trash-color", "#FF2B2B")
        document.documentElement.style.setProperty("--send-button-color", "#1976D2")
        document.documentElement.style.setProperty("--theme-btn-color", "#333")
    }

}
const addNewTodo = event => {
    event.preventDefault()

    if (todoInputElem.value) {
        userTodo = {
            id:  todoList.length + 1,
            title: todoInputElem.value
        }
        
        todoInputElem.value = ""
        todoList.push(userTodo)
        localStorage.setItem("todoList", JSON.stringify(todoList))
        console.table(todoList);

        loadTodoElements()
    }
}
const loadTodoElements = () => {
    todoContainerElem.innerHTML = ""

    todoList.forEach(todo => {
        todoContainerElem.insertAdjacentHTML("beforeend", `
            <div class="todo-section__todo box-shd">
                <h4 class="todo-section__todo-title">${todo.title}</h4>
                <i class="todo-section__todo-trash fa fa-trash" onclick="deleteTodo(${todo.id})"></i>
            </div>`)
    })
}
const deleteTodo = todoId => {
    let userTargetTodoIndex = todoList.findIndex(todo => todo.id === todoId)

    todoList.splice(userTargetTodoIndex, 1)
    localStorage.setItem("todoList", JSON.stringify(todoList))

    loadTodoElements()
}

// event listeners
window.addEventListener("load", () => {
    theme = localStorage.getItem("theme")
    setTheme(theme)

    let savedTodoList = JSON.parse(localStorage.getItem("todoList"))
    if (savedTodoList) {
        todoList = savedTodoList;
        loadTodoElements()
    }
})
changeThemeBtnElem.addEventListener("click", changeTheme)
formElem.addEventListener("submit", event => addNewTodo(event))