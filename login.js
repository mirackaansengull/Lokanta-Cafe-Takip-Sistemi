
document.addEventListener("DOMContentLoaded", function () {
document.getElementById("login-button").addEventListener("click", handleLogin);
document.addEventListener("keydown", function(event) {
    if (event.key === "Enter") { 
        handleLogin();
    }
});
});


function handleLogin() {
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    if (username === "lokantaci" && password === "lokantaci") {
        window.location.href ="/210707068_MiraçKaanŞengül/lokantaci/lokantaci.html"; 
    } else if (username === "musteri" && password === "musteri") {
        window.location.href ="/210707068_MiraçKaanŞengül/musteri/musteri.html"; 
    }
    else if (username === "admin" && password === "admin") {
        window.location.href ="/210707068_MiraçKaanŞengül/admin/admin.html";
    } 
     else {
        alert("Kullanıcı adı veya şifre hatalı!"); 
    }
}










