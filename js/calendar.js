// Obtener referencia a los elementos relevantes
const monthNameElement = document.getElementById('month-name');
const calendarElement = document.getElementById('calendar');
const prevMonthButton = document.getElementById('prevMonth');
const nextMonthButton = document.getElementById('nextMonth');
const xInput = document.getElementById("x-input");
const resultContent = document.querySelector('.content-screach');

let reservationsData = [];

let currentDate = new Date();
currentDate.setDate(1);
document.addEventListener("DOMContentLoaded", () => {
    const user = localStorage.getItem("user");
    if (!user) {
        window.location.href = "../pages/login.html";
    }
    console.log(user);
    const userData = JSON.parse(user);
    const nameProfile = document.getElementById("name-profile");

   
    GetReservations(userData.card);
});
const GetReservations = async (card) => {
    try {
        const response = await fetch(`https://proyectlanguagesoneapi.onrender.com/reservation?card=${encodeURIComponent(card)}&cancel=0`);
        if (response.ok) {
            const data = await response.json();
            if (data.length > 0) {
                // Almacenar los datos de las reservaciones
                reservationsData = data;
                // Actualizar el calendario con las reservaciones
                updateCalendar();
            } else {
               console.log("no hay datos");
            }
        } else {
            console.log("Error al procesar la informacion");
        }
    } catch (error) {
        console.error("Error al procesar la solicitud:", error);
       
    }
};


function updateCalendar() {
   
    calendarElement.innerHTML = '';

  
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

   
    const monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Setiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    monthNameElement.textContent = `${monthNames[currentMonth]} ${currentYear}`;

    
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  
    for (let i = 1; i <= daysInMonth; i++) {
        const button = document.createElement('button');
        button.classList.add('date');
        button.textContent = i;

       
        const dateToCheck = new Date(currentYear, currentMonth, i).toISOString().split('T')[0];
        const hasReservation = reservationsData.some(reservation => reservation.dateAppoinment === dateToCheck);
        if (hasReservation) {
            button.classList.add('current-day');
        }

        button.addEventListener('click', function() {
            const reservation = reservationsData.find(reservation => reservation.dateAppoinment === dateToCheck);
            if (reservation) {
              
                let acceptDoctor ="La cita aun no fue aceptada por el doctor";
                let  acceptPatient ="La cita aun no fue aceptada por el paciente";
                const resultElement = document.querySelector('.result');
                if(reservation.accepct==1){
                    acceptPatient="La cita fue aceptada por el paciente"
                }
                if(reservation.doctoraccept==1){
                    acceptDoctor="La cita fue aceptada por el doctor"
                }
                resultElement.innerHTML = `
                    <h3>Detalles de la cita medica</h3>
                    <p>Nombre del doctor: ${reservation.name}</p>
                    <p>Cédula del Doctor: ${reservation.carddoctor}</p>
                    <p>Cédula del paciente: ${reservation.card}</p>
                    <p>Especialidad: ${reservation.speciality}</p>
                    <p>Fecha de la cita: ${reservation.dateAppoinment}</p>
                    <p> ${acceptDoctor}</p>
                    <p>${acceptPatient}</p>
                   
                    
                `;
            
                resultContent.style.display = 'block';
              
            } else {
               
                document.querySelector('.content-screach').style.display = 'none';
            }
        });

        calendarElement.appendChild(button);
    }
}


nextMonthButton.addEventListener('click', function() {
    currentDate.setMonth(currentDate.getMonth() + 1);
    updateCalendar();
});


prevMonthButton.addEventListener('click', function() {
    currentDate.setMonth(currentDate.getMonth() - 1);
    updateCalendar();
});
xInput.addEventListener("click", () => {
    document.getElementById('content-screach').style.display = 'none';
});


updateCalendar();
