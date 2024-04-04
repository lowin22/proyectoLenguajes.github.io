const btnReservation = document.getElementById("btn-reservation");
const resultContent = document.querySelector(".cotainer-cite-profile");



document.addEventListener("DOMContentLoaded", () => {
    const user = localStorage.getItem("user");
    if (!user) {
        window.location.href = "../pages/login.html";
    }
    console.log(user);
    const userData = JSON.parse(user);
    const nameProfile = document.getElementById("name-profile");

    const dataProfile = document.getElementById("data-profile");
    nameProfile.textContent = `${userData.name} ${userData.last_name}`;
    dataProfile.innerHTML = `Cedula: ${userData.card}<br>Numero de telefono: ${userData.phone_number}<br>Email: ${userData.email}`;
    GetReservations(userData.card);
});
btnReservation.addEventListener("click", () => {
    window.location.href = "../pages/reservation.html";
});

const GetReservations = async (card) => {
    try {
        const response = await fetch(`http://localhost:3000/reservation?card=${encodeURIComponent(card)}&cancel=0`);
        if (response.ok) {
            const data = await response.json();
            if (data.length > 0) {
                storedData = data;
                console.log(storedData);
                data.forEach(reservation  => {
                    const resultDiv = document.createElement("div");
                    resultDiv.classList.add("content-cite");
                
                    resultDiv.innerHTML = `
                    <label id="id-revervation-${reservation.id}" hidden>${reservation.id} </label>
                    <p class="tex-cite">
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
                });

                const btnEdit = document.getElementById(`btn-cite-edit-${reservation.id}`);
                btnEdit.addEventListener("click", () => {
                    window.location.href = `../pages/editreservation.html?id=${reservation.id}`;
                });

                const btnAccept = document.getElementById(`btn-cite-accept-${reservation.id}`);
                btnAccept.addEventListener("click", () => {
                    acceptReservation(reservation.id);
                });


                });
                // Agregar eventos de clic a los elementos '.select-doctor' después de crearlos


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
const cancelReservation = async (reservationId) => {
    try {
        // Construir el objeto de datos con la reserva actualizada
        const updatedReservation = {
            cancel: 1 // Cambiar el valor de cancel a 1
        };

        // Realizar la solicitud para actualizar la reserva
        const response = await fetch(`http://localhost:3000/reservation/${reservationId}`, {
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
        const response = await fetch(`http://localhost:3000/reservation/${reservationId}`, {
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
