// Crear elementos HTML
const header = document.createElement('header');
const nav = document.createElement('nav');
const logoDiv = document.createElement('div');
const logoSpan = document.createElement('span');
const hamburgerDiv = document.createElement('div');
const ul = document.createElement('ul');
const li1 = document.createElement('li');
const li2 = document.createElement('li');
const li3 = document.createElement('li');
const li4 = document.createElement('li');
const a1 = document.createElement('a');
const a2 = document.createElement('a');
const a3 = document.createElement('a');
const a4 = document.createElement('a');
const script = document.createElement('script');

// Agregar clases a los elementos
logoDiv.classList.add('logo');
logoSpan.classList.add('three-tittle');
hamburgerDiv.classList.add('hamburger');
ul.classList.add('nav-links');
a1.classList.add('login-button');

// Agregar texto a los elementos
logoSpan.textContent = 'Árbol de Seda';
a1.textContent = 'Registrar Doctor';
a2.textContent = 'Registrarse';
a3.textContent = 'Especialidad';
a4.textContent = 'Login';

// Agregar href a los elementos <a>
a1.setAttribute('href', './pages/doctor.html');
a2.setAttribute('href', './pages/register.html');
a3.setAttribute('href', './pages/speciality.html');
a4.setAttribute('href', './pages/login.html');

// Adjuntar elementos HTML
header.appendChild(nav);
nav.appendChild(logoDiv);
logoDiv.appendChild(logoSpan);
nav.appendChild(hamburgerDiv);
nav.appendChild(ul);
ul.appendChild(li1);
ul.appendChild(li2);
ul.appendChild(li3);
ul.appendChild(li4);
li1.appendChild(a1);
li2.appendChild(a2);
li3.appendChild(a3);
li4.appendChild(a4);

// Agregar el script
script.setAttribute('src', '../js/navbar.js');

// Adjuntar el script al final del header
header.appendChild(script);

// Adjuntar el header al body o a algún otro elemento existente en el DOM
document.body.appendChild(header);
