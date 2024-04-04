document.addEventListener("DOMContentLoaded", () => {
    const user = localStorage.getItem("user");
    const reservationLink = document.getElementById("reservationLink");

    reservationLink.addEventListener("click", (event) => {
        if (!user) {
            event.preventDefault(); 
            window.location.href = "../pages/login.html"; 
        }
        localStorage.removeItem("user");
    });
});