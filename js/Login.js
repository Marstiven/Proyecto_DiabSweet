function vacio(argument) {
	if (argument.value===""){argument.style.borderColor = 'red'; return false;}
	argument.style.borderColor = 'gray'
	return true;
}
function verificarL(){
	const argument1 = document.getElementById('user');
	const argument2 = document.getElementById('password');
	if(vacio(argument1) && vacio(argument2)){
		Buscar(argument1,argument2);
	}else{
	alert("Faltan datos por completar");
	}
}

function Buscar(argument1, argument2) {
    fetch('https://proyectodiabsweet.000webhostapp.com/CRUD_root.php?action=Listar')
        .then(response => response.json())
        .then(data => {
            let found = false; 

            data.forEach(usuario => {
                if (usuario.usuario == argument1.value) {
                    found = true;
                    if (usuario.Contraseña == argument2.value) {
                        localStorage.setItem('Rol',usuario.Id_rol);
                        localStorage.setItem('Id',usuario.Id_persona);
                       window.location.href="index.html"
                    } else {
                        alert("La contraseña es incorrecta");
                    }
                }
            });

            if (!found) {
                alert("No se encontró el usuario");
            }
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}


