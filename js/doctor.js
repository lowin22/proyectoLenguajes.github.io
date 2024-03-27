const form = document.getElementById('geolocation-form');
const locationInput = document.getElementById('location');
const longitudeOutput = document.getElementById('longitude');
const latitudeOutput = document.getElementById('latitude');

const API_KEY = '3c85d661e4a24d9cbfbb6413ccb89953';

form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const location = locationInput.value;
    const response = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(location)}&key=${API_KEY}`);
    const data = await response.json();
    if (data.results.length > 0) {
        const result = data.results[0];
        longitudeOutput.textContent = `${result.geometry.lng}`;
        latitudeOutput.textContent = `${result.geometry.lat}`;
    } else {
        alert('No results found.');
    }
});

document.addEventListener("DOMContentLoaded", () => {
    populateSpecialities();
    const formRegister = document.getElementById("form_register")
    formRegister.addEventListener("submit", async (event) => {
        event.preventDefault();
        const { card, name, lastname, phoneNumber, email, speciality_name, details, longitude, latitude } = getFormData();
        const isCardValid = await validateCardDoctor(card);
        if (isCardValid) {
          const esValue = validateCard(card) && validateEmail(email) && validateName(name) && validateLastName(lastname) && validatePhoneNumber(phoneNumber);
          if (esValue) {
            sendData({ card, name, lastname, phoneNumber, email, speciality_name, details, longitude, latitude });
          } else {
            manageError("hay datos de ingreso");
          }
        }
      });
});

const getFormData = () => {
    const card = document.getElementById("card").value.trim();
    const name = document.getElementById("name_complete").value.trim();
    const lastname = document.getElementById("last_name").value.trim();
    const phoneNumber = document.getElementById("phone_number").value.trim();
    const email = document.getElementById("email").value.trim();
    const speciality_name = document.getElementById("speciality_name").value.trim();
    const details = document.getElementById("textarea").value.trim();
    const longitude= document.getElementById("longitude").textContent.trim();
    const latitude= document.getElementById("latitude").textContent.trim();
    return { card, name, lastname, phoneNumber,email,speciality_name,details,longitude,latitude}
};
const validatePassword = (password) => {
    return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^*]).{8,}$/.test(password);
};
const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};
const validateName = (name) => {
    return /^[A-Z][a-zA-Z\s'.-]+$/.test(name);
};
const validateLastName = (lastname) => {
    return /^[A-Z][a-zA-Z\s'.-]+$/.test(lastname);
};
const validatePhoneNumber = (phoneNumber) => {
    return /^\d{4}-\d{4}$/.test(phoneNumber);
};
const validateCard = (card) => {
    return /^\d{2}-\d{4}-\d{4}$/.test(card);
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
const clearTextFields = () => {
    const fields = document.querySelectorAll("#card, #textarea, #name_complete, #last_name, #phone_number, #email, #speciality_name");
    fields.forEach((field) => field.value = "");
};
const sendData = (data) => {
    fetch('http://localhost:3000/doctor/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (response.ok) {
            manageSuccess();
        } else {
            manageError();
        }
    })
    .catch(error => {
        console.error('Error al enviar los datos:', error);
        manageError();
    });
};
const validateCardDoctor = async (card) => {
    try {
      const response = await fetch(`http://localhost:3000/doctor?card=${encodeURIComponent(card)}`);
      if (response.ok) {
        const data = await response.json();
        if (data.length > 0) {
            console.log(data);
          manageError("El medico ya existe en el sistema");
          return false;
        } else {
          return true;
        }
      } else {
        manageError("Error al procesar la solicitud. Por favor, intente nuevamente más tarde.");
      }
    } catch (error) {
      console.error("Error al procesar la solicitud:", error);
      manageError("Error al procesar la solicitud. Por favor, intente nuevamente más tarde.");
      return false;
    }
  };

  const populateSpecialities = async () => {
    try {
      const response = await fetch(`http://localhost:3000/specialty`);
      if (response.ok) {
        const data = await response.json();
        const specialityList = document.getElementById("speciality");
  
        for (const speciality of data) {
          const option = document.createElement("option");
          option.value = speciality.name;
          specialityList.appendChild(option);
        }
      } else {
        manageError("Error al cargar las especialidades. Por favor, intente nuevamente más tarde.");
      }
    } catch (error) {
      console.error("Error al cargar las especialidades:", error);
      manageError("Error al cargar las especialidades. Por favor, intente nuevamente más tarde.");
    }
  };

