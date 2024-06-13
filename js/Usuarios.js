
usuario = "";
Id="";
function vacio(elemento) {
    return elemento.value.trim() === '';
}
function abrirModal(encontrado) {
    if(!encontrado){
         const panel = document.getElementById('panel');
         panel.innerHTML = `No se encontro un usuario con el ID= `+document.getElementById('Buscador').value;;
    }
    var myModal = new bootstrap.Modal(document.getElementById('miModal'));
    myModal.show();
}   
function cerrar(){
    plataforma1 = document.getElementById("Modification1");
    plataforma1.hidden = false;

    plataforma2 = document.getElementById("FormularioModificar");
    plataforma2.hidden = true;
    document.getElementById('Id').value="";
}

function confirmacion(Miuser){
    var confirmacion = window.confirm("¿Estas seguro que quieres Eliminar al usuario con ID: "+Miuser+" ?");
    return confirmacion == true;
}

function detectarcambios(valores){
    if(datosusuario.Nombre != valores.Nombre ||
    datosusuario.Apellido != valores.Apellido  ||
    datosusuario.Edad != valores.Edad  ||
    datosusuario.Sexo != valores.Sexo  ||
    datosusuario.Correo  != valores.Correo  ||
    datosusuario.Telefono  != valores.Telefono  ||
    datosusuario.usuario  != valores.usuario  ||
    datosusuario.Contraseña != valores.Contraseña)return true;
    alert("No se detectaron cambios");
    return false;
}

function verificar() {
    const ids = ['Nombre', 'Apellido', 'Edad', 'Sexo', 'Telefono', 'Correo', 'Usuario', 'Contraseña'];
    let elementos = ids.map(id => document.getElementById(id));

    for (let i = 0; i < elementos.length; i++) {
        if (!elementos[i]) {
            alert(`El elemento con ID '${ids[i]}' no fue encontrado.`);
            return false;
        } else if (vacio(elementos[i])) {
            alert(`El campo '${ids[i]}' está vacío.`);
            return false;
        }
    }
    return elementos;
}
function verificar2() {
    const ids = ['Nombre1', 'Apellido1', 'Edad1', 'Sexo1', 'Telefono1', 'Correo1', 'Usuario1', 'Contraseña1'];
    let elementos = ids.map(id => document.getElementById(id));

    for (let i = 0; i < elementos.length; i++) {
        if (!elementos[i]) {
            alert(`El elemento con ID '${ids[i]}' no fue encontrado.`);
            return false;
        } else if (vacio(elementos[i])) {
            alert(`El campo '${ids[i]}' está vacío.`);
            return false;
        }
    }
    return elementos;
}

function cambiodeuser() {
    const dato= document.getElementById('Usuario1').value;
    let existe = false;
    if( usuario != dato){
        fetch('https://proyectodiabsweet.000webhostapp.com/CRUD_root.php?action=Listar')
        .then(response => response.json())
        .then(data => {
            data.forEach(user => {
                if(user.usuario == dato) {
                    alert("Ya existe ese usuario");document.getElementById('Usuario1').value=usuario;
                    existe= true;}
            });
            if(!existe)Modificar();
        }).catch(error => console.error('Error en la solicitud:', error.message));     
    }else Modificar();
}
function Limpiar() {
    document.getElementById('Nombre').value="";
    document.getElementById('Apellido').value="";
    document.getElementById('Edad').value="";
    document.getElementById('Sexo').value="";
    document.getElementById('Correo').value="";
    document.getElementById('Telefono').value="";
    document.getElementById('Usuario').value="";
    document.getElementById('Contraseña').value="";
    
}


datosusuario = "";

function Modificar() {
    if(verificar2())
    {
        const nuevo = {
        Id_user: Id,
        Nombre: document.getElementById('Nombre1').value,
        Apellido: document.getElementById('Apellido1').value,
        Edad: document.getElementById('Edad1').value,
        Sexo: document.getElementById('Sexo1').value,
        Correo: document.getElementById('Correo1').value,
        Telefono: document.getElementById('Telefono1').value,
        usuario: document.getElementById('Usuario1').value,
        Contraseña: document.getElementById('Contraseña1').value
        };
        if(!detectarcambios(nuevo))return;


        fetch('https://proyectodiabsweet.000webhostapp.com/CRUD_Usuarios.php?action=Actualizar', {
        method: 'POST',
        body: JSON.stringify(nuevo)
        })
        .then(response => response.json())
        .then(jsonData => {
        if(jsonData.success){
            alert('Se ha modificado Correctamente!!!');
            LlenarTabla();
            asignarvalores();
            cerrar();
        }
        }).catch(error => console.error('Error en la solicitud:', error.message));    
    }  
}
function Agregar(){
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
            alert('!!!Guardado con éxito!!!');
            Limpiar();
            LlenarTabla();
        } else if(!jsonData.success) {
            alert('Ya existe ese usuario');
            document.getElementById('Usuario').style.borderColor='red';
        }else {
            console.error('Error:', jsonData.error);
        }
    })
    .catch(error => console.error('Error en la solicitud:', error.message));
}

function LlenarTabla(){
    fetch('https://proyectodiabsweet.000webhostapp.com/CRUD_Usuarios.php?action=Listar')
        .then(response => response.json())
        .then(data => {
            const tableBody = document.querySelector('#UsuariosTabla tbody');
            if(tableBody==null)return;

            tableBody.innerHTML= '';

            data.forEach(usuario => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${usuario.Id_persona}</td>
                    <td>${usuario.Nombre}</td>
                    <td>${usuario.Apellido}</td> 
                    <td>${usuario.Edad}</td>
                    <td>${usuario.Sexo}</td>
                    <td>${usuario.Correo}</td>
                    <td>${usuario.Telefono}</td>
                    <td>${usuario.usuario}</td>
                    <td>${usuario.Contraseña}</td>
            `;
                tableBody.appendChild(row);
            });
        })
        .catch(error => {
            console.error('Error fetching data:', error.message);
        });
}
       
function Eliminar() {
    let id = document.getElementById('Id_user');
    if(!vacio(id)){
        if(!EXisteID())return;
        if(!confirmacion(id.value))return;
        const data ={Id_user: id.value}

        fetch('https://proyectodiabsweet.000webhostapp.com/CRUD_Usuarios.php?action=Eliminar', {
            method: 'POST',
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(jsonData => {
        if(jsonData.success){
            alert('Se Elimino Correctamente!!!');
            id.value="";
            LlenarTabla();
        }
        }).catch(error => console.error('Error en la solicitud:', error.message));    
    } 
}


function Buscar1() {
    let encontrado = false; 
    let busqueda = document.getElementById('Buscador');
    if (!vacio(busqueda)) {
        const tabla = document.getElementById('UsuariosTabla');
        const filas = tabla.getElementsByTagName('tbody')[0].getElementsByTagName('tr');
        const panel = document.getElementById('panel');
        panel.innerHTML = '';
        for (let i = 0; i < filas.length; i++) {
            const celdas = filas[i].getElementsByTagName('td');
            const filaDatos = [];
            for (let j = 0; j < celdas.length; j++) {
                filaDatos.push(celdas[j].innerText);
            }
            if (filaDatos[0] == busqueda.value) {
                panel.innerHTML = `
                    <p><b>ID:</b> ${filaDatos[0]}</p>
                    <p><b>Nombre:</b> ${filaDatos[1]}</p>
                    <p><b>Apellido:</b> ${filaDatos[2]}</p>
                    <p><b>Edad:</b>  ${filaDatos[3]}</p>
                    <p><b>Sexo:</b> ${filaDatos[4]}</p>
                    <p><b>Correo:</b> ${filaDatos[5]}</p>
                    <p><b>Telefono:</b> ${filaDatos[6]}</p>
                    <p><b>usuario:</b> ${filaDatos[7]}</p>
                    <p><b>Contraseña:</b> ${filaDatos[8]}</p>
                `;
                encontrado = true;
                break; 
            }
        }
        abrirModal(encontrado);
    }
}

function Buscar2() {
    let busqueda = document.getElementById('Id');
    if (!vacio(busqueda)) {
        const tabla = document.getElementById('UsuariosTabla');
        const filas = tabla.getElementsByTagName('tbody')[0].getElementsByTagName('tr');
        for (let i = 0; i < filas.length; i++) {
            const celdas = filas[i].getElementsByTagName('td');
            const filaDatos = [];
            for (let j = 0; j < celdas.length; j++) {
                filaDatos.push(celdas[j].innerText);
            }
            if (filaDatos[0] == busqueda.value) {
                let valores ={
                    Id_persona: filaDatos[0],
                    Nombre: filaDatos[1],
                    Apellido:filaDatos[2],
                    Edad: filaDatos[3],
                    Sexo: filaDatos[4],
                    Correo: filaDatos[5],
                    Telefono: filaDatos[6],
                    usuario:filaDatos[7],
                    Contraseña: filaDatos[8]};
                    return(valores);
            }
        }
        alert("No se encontro un usuario con ese ID");
        return false;
    }
}

function EXisteID() {
    let busqueda = document.getElementById('Id_user');
    if (!vacio(busqueda)) {
        const tabla = document.getElementById('UsuariosTabla');
        const filas = tabla.getElementsByTagName('tbody')[0].getElementsByTagName('tr');
        for (let i = 0; i < filas.length; i++) {
            const celdas = filas[i].getElementsByTagName('td');
            const filaDatos = [];
            for (let j = 0; j < celdas.length; j++) {
                filaDatos.push(celdas[j].innerText);
            }
            if (filaDatos[0] == busqueda.value) {
                return true;
            }
        }
        alert("NO existe un usuario con ese ID")
        return false;
    }    
}

function asignarvalores() {
    let valores = Buscar2();
    if (!valores) return;
    datosusuario = valores;
    plataforma1 = document.getElementById("Modification1");
    plataforma1.hidden = true;

    plataforma2 = document.getElementById("FormularioModificar");
    plataforma2.hidden = false;

    Id = valores.Id_persona;
    usuario = valores.usuario;
    document.getElementById('Nombre1').value = valores.Nombre;
    document.getElementById('Apellido1').value = valores.Apellido;
    document.getElementById('Edad1').value = valores.Edad;
    document.getElementById('Sexo1').value = valores.Sexo;
    document.getElementById('Correo1').value = valores.Correo;
    document.getElementById('Telefono1').value = valores.Telefono;
    document.getElementById('Usuario1').value = valores.usuario;
    document.getElementById('Contraseña1').value = valores.Contraseña;
}





window.onload = LlenarTabla();
