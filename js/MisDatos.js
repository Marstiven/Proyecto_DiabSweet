function BuscarDatos(){
	const ID = localStorage.getItem('Id');
	if(ID == null){return;}
	 fetch('https://proyectodiabsweet.000webhostapp.com/CRUD_Usuarios.php?action=Buscar', {
        method: 'POST',
        body: JSON.stringify({Id_user:ID})
    }).then(response => response.json())
	 .then(data =>{
	 	        valores = data[0];
                document.getElementById('Nombre').value = valores.Nombre;
			    document.getElementById('Apellido').value = valores.Apellido;
			    document.getElementById('Edad').value = valores.Edad;
			    document.getElementById('Sexo').value = valores.Sexo;
			    document.getElementById('Correo').value = valores.Correo;
			    document.getElementById('Telefono').value = valores.Telefono;
			    document.getElementById('Usuario').value = valores.usuario;
			    document.getElementById('Contraseña').value = valores.Contraseña;
        })
	 .catch(error => {
            console.error('Error fetching data:', error.message);
        });
}
activa = false;
function mostrarpassword(){
	const password = document.getElementById('Contraseña');
            if (!activa) {
                password.type = 'text';
                activa = true;
            } else {
                password.type = 'password';
                activa = false;
            }
}


window.onload=BuscarDatos();