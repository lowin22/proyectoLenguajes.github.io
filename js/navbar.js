let menu = document.querySelector('#hamburguer');
let navbar = document.querySelector('.navbar');

menu.onclick=()=>{
    menu.classList.toggle('bx-x');
    navbar.classList.toggle('open');
}