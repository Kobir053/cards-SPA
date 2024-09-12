import { cards, users } from "./data.js";

let mode = true;

const darkMode = () => {
    const newLink = document.createElement("link");
    newLink.setAttribute("rel", "stylesheet");
    newLink.setAttribute("type", "text/css");
    newLink.setAttribute("href", "./dark.css");
    newLink.setAttribute("id", "newlink");
    document.head.appendChild(newLink);
    const btn = document.getElementById("mode");
    btn.textContent = "Light Mode";
}

const lightMode = () => {
    const link = document.getElementById("newlink");
    document.head.removeChild(link);
    const btn = document.getElementById("mode");
    btn.textContent = "Dark Mode";
}

const setMode = () => {
    mode = !mode;
    if(mode == true){
        lightMode();
    }
    else{
        darkMode();
    }
}

const setListener = (element, func, event) => {
    element.addEventListener(event, func);
} 

const setPage = () => {
    if(window.localStorage.getItem("isLoggedIn")){
        homePage();
        showCards();
    }
    else{
        loginPage();
    }
}

const cleanLocalStorage = () => {
    window.localStorage.removeItem("isLoggedIn");
}

const isValidUser = () => {
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const email = emailInput.value;
    const password = passwordInput.value;
    const userIdx = users.findIndex((user) => user.email == email && user.password == password);
    if(userIdx != -1){
        emailInput.value = "";
        passwordInput.value = "";
        return true;
    }
    return false;
}

const showModal = () => {
    const modal = document.getElementById("modal");
    modal.style.display = "flex";
    setTimeout(()=>{modal.style.display = "none"}, 3000);
}

const homePage = () => {
    const section = document.querySelector("section");
    section.style.display = "none";

    const modal = document.querySelector("body #modal");
    modal.style.display = "none";

    const header = document.querySelector("header");
    const main = document.querySelector("main");
    header.style.display = "block";
    main.style.display = "flex";
}

const loginPage = () => {
    const section = document.querySelector("section");
    section.style.display = "block";

    const modal = document.querySelector("body #modal");
    modal.style.display = "none";

    const header = document.querySelector("header");
    const main = document.querySelector("main");
    header.style.display = "none";
    main.style.display = "none";
}

const showCards = () => {
    const main = document.querySelector("main");
    if(main.childElementCount > 0)
        return;
    cards.forEach((card) => {
        const cardDiv = document.createElement("div");
        const h2 = document.createElement("h2");
        const img = document.createElement("img");
        const h4 = document.createElement("h4");
    
        h2.textContent = card.title;
        img.src = card.img;
        img.alt = card.alt;
        h4.textContent = card.description;
        cardDiv.append(h2, img, h4);
        main.appendChild(cardDiv);
    });
}

const login = (e) => {
    e.preventDefault();
    if(isValidUser()){
        window.localStorage.setItem("isLoggedIn", true);
        homePage();
        showCards();
    }
    else{
        showModal();
    }
}

const logout = () => {
    cleanLocalStorage();
    setPage();
}

const myForm = document.querySelector("form");
setListener(myForm, login, "submit");

const logOutBTN = document.getElementById("logout");
setListener(logOutBTN, logout, "click");

const darkModeBTN = document.getElementById("mode");
setListener(darkModeBTN, setMode, "click");

window.onload = () => {
    // localStorage.removeItem("isLoggedIn");
    setPage();
}