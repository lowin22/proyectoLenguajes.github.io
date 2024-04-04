const xInput = document.getElementById("x-input");
const textSearch = document.getElementById("text-search");
const typeSearch = document.getElementById("type-screach");
const contentS = document.querySelector(".content-screach");
const btnClose = document.getElementById("btn-close-screach");
const btnSearch = document.getElementById("btn-search");
const numberpage = document.getElementById("numberpage");
const span = document.getElementById("no-result");
const resultContent = document.querySelector(".result-content");
const btnNext = document.getElementById("btn-next");
const btnPrev = document.getElementById("btn-prev");
let storedData = null;

let currentPage = 1;
const itemsPerPage = 5; 

document.addEventListener("DOMContentLoaded", () => {
    const user = localStorage.getItem("user");
    if (!user) {
        window.location.href = "../pages/login.html"; 
    }
    const userData = JSON.parse(user); 
        const card = userData.card; 
        document.getElementById("card").value = card;
    const formRegister = document.getElementById("form_register")
    formRegister.addEventListener("submit", async (event) => {
        event.preventDefault();
        const { card, dateAppoinment, name,speciality,carddoctor  } = getFormData();
        
        const isFecthValid = await validateFecthDoctor(carddoctor,dateAppoinment);
        if(!isFecthValid){
            const esValue = validateDate(dateAppoinment)&&validateData(card)&&validateData(dateAppoinment)&&validateData(name)&&validateData(carddoctor);
            if (esValue) {
                const urlParams = new URLSearchParams(window.location.search);
                const reservationId = urlParams.get('id');
                console.log(reservationId);
                updateData({ card, name, dateAppoinment, speciality, carddoctor }, reservationId);
            } else {
              manageError("La fecha ingresada no es valida");
            }
        }else{
            manageError("ya existen reservaciones");
        }
        
      });
});
const getFormData = () => {
    const card = document.getElementById("card").value.trim();
    const name = document.getElementById("name_complete").value.trim();
    const dateAppoinment = document.getElementById("date-appoinment").value.trim();
    const speciality = document.getElementById("speciality").value.trim();
    const carddoctor = document.getElementById("carddoctor").value.trim();
    return { card, dateAppoinment, name,speciality,carddoctor}
};
const updateData = async (data, id) => {
    try {
        const response = await fetch(`http://localhost:3000/reservation/${id}`, {
            method: 'PATCH', // Utilizar el método PATCH para actualizar parcialmente el recurso
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            console.log('La reserva se actualizó correctamente');
            // Manejar el éxito de la actualización aquí si es necesario
        } else {
            console.error('Hubo un problema al actualizar la reserva');
            // Manejar el error de la actualización aquí si es necesario
        }
    } catch (error) {
        console.error('Error al enviar los datos:', error);
        // Manejar cualquier error de la solicitud aquí si es necesario
    }
};

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
        numberpage.textContent=currentPage;
        numberpage.style.display="block";
       searchDoctors();

    }//en of key.event de enter
});
const validateDate = (date) => {
    const dateObj = new Date(date);
    return !isNaN(dateObj) && dateObj.getFullYear() === 2024;
}


const validateUbicationSearch = (location) => {
    return true;
};
const validateLastNameSearch = (lastname) => {
    return /^[A-Z][a-zA-Z\s'.-]+$/.test(lastname);
};
const validatePhoneNumberSearch = (phoneNumber) => {
    return /^\d{4}-\d{4}$/.test(phoneNumber);
};
const validateCardSearch = (card) => {
    return /^\d{2}-\d{4}-\d{4}$/.test(card);
};
const validateData = (data) => {
    return data.length>0;
};
const manageEventSpan = (successMessage) => {
    span.textContent = successMessage;
    span.style.display = "block";
};

const manageSuccess = (successMessage) => {
    document.getElementById("modal-message").innerHTML = successMessage;
    showModal();
  
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
    currentPage=1;
    numberpage.textContent=currentPage;
}
);
btnSearch.addEventListener("click", () => {
    contentS.style.display = "block";
}
);
const validateFecthDoctor = async (card,date) => {
    try {
        const response = await fetch(`http://localhost:3000/reservation?carddoctor=${encodeURIComponent(card)}&dateAppoinment=${date}`);
        if (response.ok) {
            const data = await response.json();
            console.log(data);
          return data.length>0;
        } else {
            manageEventSpan('Error al procesar la solicitud.');
        }
    } catch (error) {
        console.error("Error al procesar la solicitud:", error);
        manageEventSpan('Error al procesar la solicitud.');
    }
};
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
const validateNameDoctor = async (card,page,limit) => {
    try {
        const response = await fetch(`http://localhost:3000/doctor?name=${encodeURIComponent(card)}&_page=${page}&_limit=${limit}`);
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
const validateSpecDoctor = async (card,page,limit) => {
    try {
        const response = await fetch(`http://localhost:3000/doctor?specialty=${encodeURIComponent(card)}&_page=${page}&_limit=${limit}`);
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
const validateDirectionDoctor = async (direction,page,limit) => {
    try {
        const response = await fetch(`http://localhost:3000/doctor?direction=${encodeURIComponent(direction)}&_page=${page}&_limit=${limit}`);
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
   
    const nameDoctor = document.getElementById("name_complete");
    const speciality = document.getElementById("speciality");
    const carddoctor = document.getElementById("carddoctor");


   
   nameDoctor.value=`${doctorData.name} ${doctorData.last_name}`;
   speciality.value=doctorData.specialty;
   carddoctor.value=doctorData.card;
    contentS.style.display = "none";
}
function searchDoctors() {
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
                validateNameDoctor(textSearch.value,currentPage,5);
            } else {
                manageEventSpan('Formato de nombre no valido');
            }
        } else if (selectedValue === "speciality") {
            if (validateLastNameSearch(textSearch.value)) {
                validateSpecDoctor(textSearch.value, currentPage, 5);
            } else {
                manageEventSpan('Formato de especialiadad no valido');
            }
        } else if (selectedValue === "ubication") {
            if (validateUbicationSearch(textSearch.value)) {
                validateDirectionDoctor(textSearch.value, currentPage, 5);
                
            }
        }
    }
}

btnNext.addEventListener("click", () => {
    currentPage++;
    numberpage.textContent = currentPage;
    searchDoctors();
});

btnPrev.addEventListener("click", () => {
    if (currentPage > 1) {
        currentPage--;
        numberpage.textContent = currentPage;
        searchDoctors();
    }
});
