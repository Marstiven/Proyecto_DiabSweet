document.addEventListener('DOMContentLoaded', function() {
    function verificarSesion(){
        const rol = localStorage.getItem('Rol');
        if (rol !== null && rol !== 'undefined') {
            let obj = document.getElementById('loginButton');
            if (obj) {
                obj.innerHTML = "Cerrar sesión";
                modificaracceso(rol);
                obj.removeAttribute('href');
            }else{
                modificaracceso(rol);
            }
        } 
    }

    function habilitar(obj){
        if(obj != null)
        obj.hidden = false;
    }

    function modificaracceso(rol){
        if(rol == "1"){
            habilitar(document.getElementById("menu"));
            habilitar(document.getElementById("Admin"));
            habilitar(document.getElementById("Datos"));
            habilitar(document.getElementById("Usuarios"));
            habilitar(document.getElementById("Alimentos"));
            habilitar(document.getElementById("Consultas"));
        }
        if(rol=="2"){
            habilitar(document.getElementById("menu"));
            habilitar(document.getElementById("Consultas"));
            habilitar(document.getElementById("Datos"));
            habilitar(document.getElementById("Alimentos"));
            habilitar(document.getElementById("Usuarios"));
        }
        if(rol == "3"){
            habilitar(document.getElementById("menu"));
            habilitar(document.getElementById("Consultas"));
            habilitar(document.getElementById("Alimentos"));
            habilitar(document.getElementById("Datos"));
        }
    }

    function iniciar() {
        let obj = document.getElementById('loginButton');
        if (obj) {
            if (obj.textContent === "Iniciar Sesión") {
                window.location.href = 'Login.html';
            } else {
            	localStorage.clear();
                document.getElementById('menu').hidden = true;
                location.reload();
                obj.innerHTML = "Iniciar Sesión";
            }
        }
    }

    verificarSesion();

const loginButton = document.getElementById('loginButton');
if (loginButton) {
    loginButton.onclick = iniciar;
}
});