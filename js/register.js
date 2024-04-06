
document.addEventListener("DOMContentLoaded", () => {
    const formRegister = document.getElementById("form_register")
    formRegister.addEventListener("submit", async (event) => {
        event.preventDefault();
        const { card,name,lastname,phoneNumber,email,password, passwordConfirmed  } = getFormData();
       
        const isCardValid = await validateCardPerson(card);
        if(isCardValid){
            const esValue = validatePassword(password) 
            && validateEmail(email) &&validateName(name)&&validateLastName(lastname)
            &&validatePhoneNumber(phoneNumber)&&validateCard(card)&&validatePasswords(password,passwordConfirmed);
            if (esValue) {
               
                var encryptedPassword =CryptoJS.SHA256(password).toString();
                console.log(encryptedPassword);
                console.log(password);
                sendData({ card, name, lastname, phoneNumber, email, encryptedPassword });
            } else {
                manageError("Existe un problema con los datos");
            }
        }
       
    });

});

const getFormData = () => {
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const name = document.getElementById("name_complete").value.trim();
    const lastname = document.getElementById("last_name").value.trim();
    const phoneNumber = document.getElementById("phone_number").value.trim();
    const card = document.getElementById("card").value.trim();
    const passwordConfirmed = document.getElementById("password_confirmed").value.trim();

    return { card, name, lastname, phoneNumber,email,password,passwordConfirmed }
};
const validatePasswords = (password, password_confirmed) => {
    if (password === password_confirmed) {
        return true;
    } else {
        const fields = document.querySelectorAll("#password, #password_confirmed");
        fields.forEach((field) => field.value = "");
        return false; 
    }
};
const validatePassword = (password) => {
    return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^*]).{8,}$/.test(password);
};

const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};
const validateName = (name) => {
    if(name.length>20){
        console.log("mas de 30 carateres");
        return false;
    }
    return /^[A-Z][a-zA-Z\s'.-]+$/.test(name);
};
const validateLastName = (lastname) => {
    if(lastname.length>30){
        console.log("mas de 20 carateres");
        return false;
    }
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
    const fields = document.querySelectorAll("#card, #password, #name_complete, #last_name, #phone_number, #email, #password_confirmed");
    fields.forEach((field) => field.value = "");
};
const sendData = (data) => {
    fetch('https://proyectlanguagesoneapi.onrender.com/data_user/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (response.ok) {
            manageSuccess("Se agregaron los datos de usuario correctamente");
        } else {
            manageError("No se pudo registrar los datos");
        }
    })
    .catch(error => {
        console.error('Error al enviar los datos:', error);
        manageError("No se pudo registrar los datos");
    });
};
const validateCardPerson = async (card) => {
    try {
      const response = await fetch(`https://proyectlanguagesoneapi.onrender.com/data_user?card=${encodeURIComponent(card)}`);
      if (response.ok) {
        const data = await response.json();
        if (data.length > 0) {
            console.log(data);
          manageError("La cedula del paciente ya existe en el sistema");
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
