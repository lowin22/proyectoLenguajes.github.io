const btnReservation = document.getElementById("btn-reservation");
const resultContent = document.querySelector(".cotainer-cite-profile");
const btnSignoff = document.getElementById("btn-signoff");
const btnCalendar = document.getElementById("btn-calendar");


document.addEventListener("DOMContentLoaded", () => {
    const user = localStorage.getItem("user");
    if (!user) {
        window.location.href = "../pages/login.html";
    }
    console.log(user);
    const userData = JSON.parse(user);
    const nameProfile = document.getElementById("name-profile");

    const dataProfile = document.getElementById("data-profile");
    nameProfile.textContent = `${userData.name} ${userData.lastname}`;
    dataProfile.innerHTML = `Cedula: ${userData.card}<br>Numero de telefono: ${userData.phoneNumber}<br>Email: ${userData.email}`;
    GetReservations(userData.card);
});
btnReservation.addEventListener("click", () => {
    window.location.href = "../pages/reservation.html";
});

const GetReservations = async (card) => {
    try {
        const response = await fetch(`https://proyectlanguagesoneapi.onrender.com/reservation?card=${encodeURIComponent(card)}&cancel=0`);
        if (response.ok) {
            const data = await response.json();
            if (data.length > 0) {
                storedData = data;
                console.log(storedData);
                data.forEach(reservation  => {
                    const resultDiv = document.createElement("div");
                    resultDiv.classList.add("content-cite");
                    resultDiv.id=`content-cite${reservation.id}`;
                    resultDiv.innerHTML = `
                    <label id="id-revervation-${reservation.id}" hidden>${reservation.id} </label>
                    <p class="tex-cite" id="tex-cite${reservation.id}">
                    Fecha de la reservacion: ${reservation.dateAppoinment}<br> 
                    Especialidad medica: ${reservation.speciality}<br>
                    Cedula del medico: ${reservation.carddoctor}<br>  
                    Nombre del medico: ${reservation.name}
                    </p>
                    <div class="conten-cite-button">
                        <a id="btn-cite-cancel-${reservation.id}" class="btn-cite-cancel">cancelar</a>
                        <a id="btn-cite-edit-${reservation.id}" class="btn-cite-edit">modificar</a>
                        <a id="btn-cite-accept-${reservation.id}" class="btn-cite-accept">aceptar</a>
                    </div>
                   
                    `;

                const cotainerCiteProfile = document.querySelector(".cotainer-cite-profile");
                cotainerCiteProfile.appendChild(resultDiv);

                const btnCancel = document.getElementById(`btn-cite-cancel-${reservation.id}`);
                btnCancel.addEventListener("click", () => {
                    cancelReservation(reservation.id);
                    const elmitedContent = document.getElementById(`content-cite${reservation.id}`);
                    elmitedContent.remove();
                });

                const btnEdit = document.getElementById(`btn-cite-edit-${reservation.id}`);
                btnEdit.addEventListener("click", () => {
                    window.location.href = `../pages/editreservation.html?id=${reservation.id}`;
                });

                const btnAccept = document.getElementById(`btn-cite-accept-${reservation.id}`);
                btnAccept.addEventListener("click", () => {
                    acceptReservation(reservation.id);
                    btnAccept.remove();
                });
                if(reservation.doctoraccept==1){
                  
                    
                   const textp = document.getElementById(`tex-cite${reservation.id}`);
                    textp.innerHTML+=" <br>El doctor confirmo la cita";
                }
                if(reservation.accepct==1){
                   
                    const acceptButton = document.getElementById(`btn-cite-accept-${reservation.id}`);
                   acceptButton.remove();
                    const textp = document.getElementById(`tex-cite${reservation.id}`);
                    textp.innerHTML+=" <br>Has confirmado la cita.";
                }

                });
                // Agregar eventos de clic a los elementos '.select-doctor' después de crearlos


            } else {
               console.log("");
            }
        } else {
         console.log("");
        }
    } catch (error) {
        console.log("");
       
    }
};
const cancelReservation = async (reservationId) => {
    try {
        // Construir el objeto de datos con la reserva actualizada
        const updatedReservation = {
            cancel: 1 // Cambiar el valor de cancel a 1
        };

        // Realizar la solicitud para actualizar la reserva
        const response = await fetch(`https://proyectlanguagesoneapi.onrender.com/reservation/${reservationId}`, {
            method: 'PATCH', // Utilizar el método PATCH para actualizar parcialmente el recurso
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedReservation) // Convertir el objeto de datos a formato JSON
        });

        if (response.ok) {
            console.log('La reserva ha sido actualizada con éxito.');
        } else {
            console.error('Hubo un problema al actualizar la reserva.');
        }
    } catch (error) {
        console.error('Error al realizar la solicitud:', error);
    }
};
const acceptReservation = async (reservationId) => {
    try {
        // Construir el objeto de datos con la reserva actualizada
        const updatedReservation = {
            accepct: 1 // Cambiar el valor de cancel a 1
        };

        // Realizar la solicitud para actualizar la reserva
        const response = await fetch(`https://proyectlanguagesoneapi.onrender.com/reservation/${reservationId}`, {
            method: 'PATCH', // Utilizar el método PATCH para actualizar parcialmente el recurso
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedReservation) // Convertir el objeto de datos a formato JSON
        });

        if (response.ok) {
            console.log('La reserva ha sido actualizada con éxito.');
            // Realizar cualquier acción adicional después de la actualización exitosa
        } else {
            console.error('Hubo un problema al actualizar la reserva.');
        }
    } catch (error) {
        console.error('Error al realizar la solicitud:', error);
    }
};

btnSignoff.addEventListener("click", () => {
    localStorage.removeItem("user");
    window.location.href = "../pages/login.html";
});
btnCalendar.addEventListener("click", () => {
    window.location.href = "../pages/calendar.html";
});