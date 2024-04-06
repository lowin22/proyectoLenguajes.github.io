
document.addEventListener("DOMContentLoaded", () => {
    const formLogin = document.getElementById("form_login");
    formLogin.addEventListener("submit", async (event) => {
        event.preventDefault();
        const { card, password } = getFormData();
        const esValue = validatePassword(password) && validateEmail(card);
        if(!esValue){
            manageError("Las credenciales son incorrectas. Por favor, verifique e intente nuevamente.");
            clearTextFields();
        }else {
            await getDataLogin(card,password)
        }
    });
});

const getFormData = () => {
    const card = document.getElementById("card").value.trim();
    const password = document.getElementById("password").value.trim();
    return { card, password }
};

const validatePassword = (password) => {
    return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^*]).{8,}$/.test(password);
};

const validateEmail = (card) => {
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
    const fields = document.querySelectorAll("#card, #password");
    fields.forEach((field) => field.value = "");
};

const getDataLogin = async (card, password) => {
    try {
        var encryptedPassword =CryptoJS.SHA256(password).toString();
                console.log(encryptedPassword);
                console.log(password);
        const response = await fetch(`https://proyectlanguagesoneapi.onrender.com/data_user?card=${encodeURIComponent(card)}&encryptedPassword=${encodeURIComponent(encryptedPassword)}`);
        if (response.ok) {
            const data = await response.json();
            if (data.length > 0) {
                localStorage.setItem("user", JSON.stringify(data[0]));
                manageSuccess("Inicio de sesión exitoso");
            } else {
                manageError("Las credenciales son incorrectas. Por favor, verifique e intente nuevamente.");
            }
        } else {
            manageError("Error al procesar la solicitud. Por favor, intente nuevamente más tarde.");
        }
    } catch (error) {
        console.error("Error al procesar la solicitud:", error);
        manageError("Error al procesar la solicitud. Por favor, intente nuevamente más tarde.");
    }
};