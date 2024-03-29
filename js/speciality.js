document.addEventListener("DOMContentLoaded", () => {
    const formLogin = document.getElementById("form_login");
    formLogin.addEventListener("submit", async (event) => {
        event.preventDefault();
        const { name, description } = getFormData();
        const isValid = validatePassword(description) && await validateSpeciality(name);
        if (!isValid) {
            //manageError("La descripcion no cumple con los requisitos");
            clearTextFields();
        } else {
            await sendData({name, description});
        }
    });
});

const getFormData = () => {
    const name = document.getElementById("name_speciality").value.trim();
    const description = document.getElementById("description").value.trim();
    return { name, description }
};

const validatePassword = (description) => {
    return description.length <= 150 && description.length >= 30;
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
    const fields = document.querySelectorAll("#name_speciality, #description");
    fields.forEach((field) => field.value = "");
};
const validateSpeciality = async (name) => {
    try {
        const response = await fetch(`https://proyectlanguagesoneapi.onrender.com/specialty?name=${encodeURIComponent(name)}`);
        if (response.ok) {
            const data = await response.json();
            if (data.length > 0) {
                manageError("La especialidad medica ya existe");
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

const manageCustomError = (error, errorMessage) => {
    console.error(error.message);
    manageError(errorMessage);
};
const sendData = (data) => {
    fetch('https://proyectlanguagesoneapi.onrender.com/specialty', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (response.ok) {
            manageSuccess("Se ingreso correctamente");
        } else {
            manageError("Error al enviar los datos");
        }
    })
    .catch(error => {
        console.error('Error al enviar los datos:', error);
        manageError();
    });
};

