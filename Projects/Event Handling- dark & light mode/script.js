let modeBtn = document.querySelector('#mode');
let body = document.querySelector("body");
let currMode = "light";

modeBtn.addEventListener("click", () => {
    if(currMode === "light"){
        currMode = "dark";
        body.classList.remove("light");   // remove old class
        body.classList.add("dark");       // add new class
    } else {
        currMode = "light";
        body.classList.remove("dark");    // remove old class
        body.classList.add("light");      // add new class
    }
    console.log(currMode);
});