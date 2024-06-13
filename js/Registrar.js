function verificar() {
    let elementos = [
        document.getElementById('Nombre'),
        document.getElementById('Apellido'),
        document.getElementById('Edad'),
        document.getElementById('Sexo'),
        document.getElementById('Telefono'),
        document.getElementById('Correo'),
        document.getElementById('Usuario'),
        document.getElementById('Contraseña')
    ];

    for (let i = 0; i < elementos.length; i++) {
        if (vacio(elementos[i])) {
            alert("Faltan datos por completar");
            return false;
        }
    }
    return true;

}
function Agregar() {
    if (!verificar()) return;

    const datos = {
        Nombre: document.getElementById('Nombre').value,
        Apellido: document.getElementById('Apellido').value,
        Edad: document.getElementById('Edad').value,
        Sexo: document.getElementById('Sexo').value,
        Correo: document.getElementById('Correo').value,
        Telefono: document.getElementById('Telefono').value,
        usuario: document.getElementById('Usuario').value,
        Contraseña: document.getElementById('Contraseña').value
    };

    fetch('https://proyectodiabsweet.000webhostapp.com/CRUD_Usuarios.php?action=Agregar', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(datos)
    })
    .then(response => response.json())
    .then(jsonData => {
        if (jsonData.success) {
            alert('Guardado con éxito:');
            window.location.href="Login.html";
        } else if(!jsonData.success) {
            alert('Ya existe ese usuario');
            document.getElementById('Usuario').style.borderColor='red';
        }else {
            console.error('Error:', jsonData.error);
        }
    })
    .catch(error => console.error('Error en la solicitud:', error.message));
}

function vacio(argument) {
	if (argument.value===""){argument.style.borderColor = 'red'; return true;}
	argument.style.borderColor = 'gray'
	return false;
}
