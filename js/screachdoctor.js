const xInput = document.getElementById("x-input");
const textSearch = document.getElementById("text-search");
const typeSearch = document.getElementById("type-screach");
const contentS = document.querySelector(".content-screach");
const btnClose = document.getElementById("btn-close-screach");
const btnSearch = document.getElementById("btn-search");
const span = document.getElementById("no-result");
const resultContent = document.querySelector(".result-content");
let storedData = null;


textSearch.addEventListener("keyup", () => {
    if (textSearch.value.length > 0) {
        xInput.style.display = "block"
    } else {
        xInput.style.display = "none"
        span.style.display = "none";
    }
});
textSearch.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        resultContent.innerHTML = "";
        const selectedValue = typeSearch.value;
        if (textSearch.value.length > 0) {
            if (selectedValue === "card") {
                if (validateCardSearch(textSearch.value)) {

                    validateCardDoctor(textSearch.value);
                } else {
                    manageEventSpan('Formato de cedula no valido');
                }
            } else if (selectedValue === "name") {
                if (validateLastNameSearch(textSearch.value)) {
                    validateNameDoctor(textSearch.value);
                }else {
                    manageEventSpan('Formato de nombre no valido');
                }
            } else if (selectedValue === "speciality") {
                if (validateLastNameSearch(textSearch.value)) {
                    validateSpecDoctor(textSearch.value);
                }else {
                    manageEventSpan('Formato de especialiadad no valido');
                }
            } else if (selectedValue === "ubication") {
                if (validateLastNameSearch(textSearch.value)) {

                }
            }
        }

    }//en of key.event de enter
});

const validateLastNameSearch = (lastname) => {
    return /^[A-Z][a-zA-Z\s'.-]+$/.test(lastname);
};
const validatePhoneNumberSearch = (phoneNumber) => {
    return /^\d{4}-\d{4}$/.test(phoneNumber);
};
const validateCardSearch = (card) => {
    return /^\d{2}-\d{4}-\d{4}$/.test(card);
};
const manageEventSpan = (successMessage) => {
    span.textContent = successMessage;
    span.style.display = "block";
};

const manageSuccess = (successMessage) => {
    document.getElementById("modal-message").innerHTML = successMessage;
    showModal();
    clearTextFields();
};

const manageError = (errorMessage) => {
    document.getElementById("modal-message").innerHTML = errorMessage;
    showModal();
};

const showModal = () => {
    const modal = document.getElementById("myModal");
    modal.style.display = "block";
    const close = document.getElementsByClassName("close")[0];
    close.onclick = () => {
        modal.style.display = "none";
    }
    window.onclick = (event) => {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
};
xInput.addEventListener("click", () => {
    textSearch.value = "";
    xInput.style.display = "none";
    span.style.display = "none";
    resultContent.innerHTML = "";
}
);
btnClose.addEventListener("click", () => {
    contentS.style.display = "none";
    span.style.display = "none";
    resultContent.innerHTML = "";
}
);
btnSearch.addEventListener("click", () => {
    contentS.style.display = "block";
}
);

//apartado de busqueda de los medicos importantes 
const validateCardDoctor = async (card) => {
    try {
        const response = await fetch(`http://localhost:3000/doctor?card=${encodeURIComponent(card)}`);
        if (response.ok) {
            const data = await response.json();
            if (data.length > 0) {
                storedData = data;
                console.log(storedData);
                data.forEach(doctor => {
                    const resultDiv = document.createElement("div");
                    resultDiv.classList.add("result");
            
                    resultDiv.innerHTML = `
                    <h3 class="name-doctor">${doctor.name} ${doctor.last_name}</h3>
                    <a href="#" class="select-doctor" id="select-doctor" data-card="${doctor.card}">
                        <span>${doctor.card}</span>
                    </a>
                `;
            
                    resultContent.appendChild(resultDiv); // Agregar al contenido existente
               
    });
     // Agregar eventos de clic a los elementos '.select-doctor' después de crearlos
     const selectDoctorLinks = document.querySelectorAll(".select-doctor");
     selectDoctorLinks.forEach(selectDoctorLink => {
         selectDoctorLink.addEventListener("click", (event) => {
             event.preventDefault();
             const selectedCard = event.currentTarget.dataset.card;
             const selectedDoctor = storedData.find(doctor => doctor.card === selectedCard);
             fillCardData(selectedDoctor);
         });
     });

            } else {
                manageEventSpan('No se encontraron medicos');
            }
        } else {
            manageEventSpan('Error al procesar la solicitud.');
        }
    } catch (error) {
        console.error("Error al procesar la solicitud:", error);
        manageEventSpan('Error al procesar la solicitud.');
    }
};
//apartado de busqueda de los medicos importantes 
const validateNameDoctor = async (card) => {
    try {
        const response = await fetch(`http://localhost:3000/doctor?name=${encodeURIComponent(card)}`);
        if (response.ok) {
            const data = await response.json();
            if (data.length > 0) {
                storedData = data;
                console.log(storedData);
                data.forEach(doctor => {
                    const resultDiv = document.createElement("div");
                    resultDiv.classList.add("result");
            
                    resultDiv.innerHTML = `
                    <h3 class="name-doctor">${doctor.name} ${doctor.last_name}</h3>
                    <a href="#" class="select-doctor" id="select-doctor" data-card="${doctor.card}">
                        <span>${doctor.card}</span>
                    </a>
                `;
            
                    resultContent.appendChild(resultDiv); // Agregar al contenido existente
               
    });
     // Agregar eventos de clic a los elementos '.select-doctor' después de crearlos
     const selectDoctorLinks = document.querySelectorAll(".select-doctor");
     selectDoctorLinks.forEach(selectDoctorLink => {
         selectDoctorLink.addEventListener("click", (event) => {
             event.preventDefault();
             const selectedCard = event.currentTarget.dataset.card;
             const selectedDoctor = storedData.find(doctor => doctor.card === selectedCard);
             fillCardData(selectedDoctor);
         });
     });

            } else {
                manageEventSpan('No se encontraron medicos');
            }
        } else {
            manageEventSpan('Error al procesar la solicitud.');
        }
    } catch (error) {
        console.error("Error al procesar la solicitud:", error);
        manageEventSpan('Error al procesar la solicitud.');
    }
};
const validateSpecDoctor = async (card) => {
    try {
        const response = await fetch(`http://localhost:3000/doctor?specialty=${encodeURIComponent(card)}`);
        if (response.ok) {
            const data = await response.json();
            if (data.length > 0) {
                storedData = data;
                console.log(storedData);
                data.forEach(doctor => {
                    const resultDiv = document.createElement("div");
                    resultDiv.classList.add("result");
            
                    resultDiv.innerHTML = `
                    <h3 class="name-doctor">${doctor.name} ${doctor.last_name}</h3>
                    <a href="#" class="select-doctor" id="select-doctor" data-card="${doctor.card}">
                        <span>${doctor.card}</span>
                    </a>
                `;
            
                    resultContent.appendChild(resultDiv); // Agregar al contenido existente
               
    });
     // Agregar eventos de clic a los elementos '.select-doctor' después de crearlos
     const selectDoctorLinks = document.querySelectorAll(".select-doctor");
     selectDoctorLinks.forEach(selectDoctorLink => {
         selectDoctorLink.addEventListener("click", (event) => {
             event.preventDefault();
             const selectedCard = event.currentTarget.dataset.card;
             const selectedDoctor = storedData.find(doctor => doctor.card === selectedCard);
             fillCardData(selectedDoctor);
         });
     });

            } else {
                manageEventSpan('No se encontraron medicos');
            }
        } else {
            manageEventSpan('Error al procesar la solicitud.');
        }
    } catch (error) {
        console.error("Error al procesar la solicitud:", error);
        manageEventSpan('Error al procesar la solicitud.');
    }
};
// Función para rellenar la información del doctor seleccionado
function fillCardData(doctorData) {
    const cardContent = document.querySelector(".card-content");
    const nameDoctor = cardContent.querySelector("h1");
    const aboutDoctor = cardContent.querySelector("p");

    nameDoctor.textContent = `${doctorData.name} ${doctorData.last_name}`;
    aboutDoctor.innerHTML = `Especialidad: ${doctorData.specialty}<br>Detalles: ${doctorData.details}<br>Email: ${doctorData.email}`;
    contentS.style.display = "none";
}


