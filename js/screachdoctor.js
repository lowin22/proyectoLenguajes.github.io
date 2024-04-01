const xInput = document.getElementById("x-input");
const textSearch = document.getElementById("text-search");
const typeSearch = document.getElementById("type-screach");
const contentS = document.querySelector(".content-screach");
const btnClose = document.getElementById("btn-close-screach");
const btnSearch = document.getElementById("btn-search");


textSearch.addEventListener("keyup",()=>{
if(textSearch.value.length>0){
    xInput.style.display="block"
}else{
    xInput.style.display="none"
}
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
xInput.addEventListener("click",()=>{
    textSearch.value=""; 
    xInput.style.display="none";
}
);
btnClose.addEventListener("click",()=>{
    contentS.style.display="none";
}
);
btnSearch.addEventListener("click",()=>{
    contentS.style.display="block";
}
);
