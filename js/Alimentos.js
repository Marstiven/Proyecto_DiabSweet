function vacio(elemento) {
    return elemento.value.trim() === '';
}

function modificaracceso(){
    const rol = localStorage.getItem('Rol');
    if(rol==3){
        document.getElementById("btnadd").hidden = true;
        document.getElementById("btnupdate").hidden = true;
        document.getElementById("btndelete").hidden = true;
    }
}

function LlenarTabla() {
    modificaracceso();
    const tableBody = document.querySelector('#alimentosTable tbody');
    if(tableBody== null)return;
    tableBody.innerHTML = ''; 
            fetch('https://proyectodiabsweet.000webhostapp.com/CRUD_alimentos.php?action=Listar')
                
                .then(response => response.json())
                .then(data => {
                    data.forEach(alimento => {
                        const row = document.createElement('tr');
                        row.innerHTML = `
                            <td>${alimento.Id_alimento}</td>
                            <td>${alimento.Nombre}</td>
                            <td>${alimento.Categoria}</td>
                            <td>${alimento.Indice_Glucemico}</td>
                        `;
                        tableBody.appendChild(row);
                    });
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });
        }

        window.onload = LlenarTabla();


function Existe(){

}
function abrirModal(encontrado) {
    if(!encontrado){
         const panel = document.getElementById('panel');
         panel.innerHTML = `No se encontro un Alimento con el ID= `+document.getElementById('Buscador').value;;
    }
    var myModal = new bootstrap.Modal(document.getElementById('miModal'));
    myModal.show();
}   
function cerrar(){
    plataforma1 = document.getElementById("ModificationA");
    plataforma1.hidden = false;

    plataforma2 = document.getElementById("formModificar");
    plataforma2.hidden = true;
}

function Advertencia(Miuser){
    var confirmacion = window.confirm("¿Estas seguro que quieres eliminar este Alimento?");
    return confirmacion == true;
}
function AgregarAlimento(){
    if(!verificar2()){
        const datos = {
        Nombre:document.getElementById('Nombre').value,
        Categoria:document.getElementById('Categoria').value,
        Índice_Glúcemico:document.getElementById('Índice_Glúcemico').value
        }; 
        fetch('https://proyectodiabsweet.000webhostapp.com/CRUD_alimentos.php?action=Agregar',{
            method: 'POST',
            body: JSON.stringify(datos)
        }).then(response => response.json())
        .then(data=>{
            if(data.success){
                LlenarTabla();
                alert("Se ha Agregado correctamente!!!!");
                document.getElementById('Nombre').value = "";
                document.getElementById('Categoria').value = "";
                document.getElementById('Índice_Glúcemico').value = "";
            }
        }).catch(error => console.error('Error en la solicitud:', error.message));
    }
}

function Buscar1() {
    let encontrado = false; 
    let busqueda = document.getElementById('Buscador');
    if (!vacio(busqueda)) {
        const tabla = document.getElementById('alimentosTable');
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
                    <p><b>Categoría:</b> ${filaDatos[2]}</p>
                    <p><b>Índice Glúcemico:</b>  ${filaDatos[3]}</p>
                `;
                encontrado = true;
                break; 
            }
        }
        abrirModal(encontrado);
    }
}

function Buscar2() {
    let busqueda = document.getElementById('Id_alimento');
    if (!vacio(busqueda)) {
        const tabla = document.getElementById('alimentosTable');
        const filas = tabla.getElementsByTagName('tbody')[0].getElementsByTagName('tr');
        for (let i = 0; i < filas.length; i++) {
            const celdas = filas[i].getElementsByTagName('td');
            const filaDatos = [];
            for (let j = 0; j < celdas.length; j++) {
                filaDatos.push(celdas[j].innerText);
            }
            if (filaDatos[0] == busqueda.value) {
                let valores ={
                    Id: filaDatos[0],
                    Nombre: filaDatos[1],
                    Categoria:filaDatos[2],
                    Indice:filaDatos[3],
                }
                    return(valores);
            }
        }
        alert("No se encontro un Alimento con ese ID");
        return false;
    }
}

function EXisteID() {
    let busqueda = document.getElementById('IdAlimento');
    if (!vacio(busqueda)) {
        const tabla = document.getElementById('alimentosTable');
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
        alert("NO existe un Alimento con ese ID")
        return false;
    }    
}


function Borrar(){
    if(EXisteID()){
        const Id = document.getElementById('IdAlimento').value;
        datos = {IdAlimento: Id};
        fetch("https://proyectodiabsweet.000webhostapp.com/CRUD_alimentos.php?action=Eliminar", {
            method: 'POST',
            body: JSON.stringify(datos)
        })
        .then(response => response.json())
        .then(data => {
            if(data.success){
                LlenarTabla();
                document.getElementById('Id_alimento').value = "";
                alert("Se ha eliminado correctamente!!!!");
            } else {
                alert("NO se pudo eliminar");
            }
        })
        .catch(error => console.error('Error en la solicitud:', error.message));
    }
}
function verificar(){
    if(vacio(document.getElementById('Id_alimento')))return false; 
    if(vacio(document.getElementById('Nombre1')))return false; 
    if(vacio(document.getElementById('Categoria1')))return false; 
    if(vacio(document.getElementById('Índice Glúcemico1')))return false; 
     return true;
}
function verificar2(){
    if(vacio(document.getElementById('Nombre1')))return false; 
    if(vacio(document.getElementById('Categoria1')))return false; 
    if(vacio(document.getElementById('Índice Glúcemico1')))return false; 
     return true;
}

function modificarA(){
    if(!verificar())return;
    datos = {
        Id:document.getElementById('Id_alimento').value,
        Nombre:document.getElementById('Nombre1').value,
        Categoria:document.getElementById('Categoria1').value,
        Índice_Glúcemico:document.getElementById('Índice Glúcemico1').value
        };

    fetch("https://proyectodiabsweet.000webhostapp.com/CRUD_alimentos.php?action=Modificar", {
            method: 'POST',
            body: JSON.stringify(datos)
        })
        .then(response => response.json())
        .then(data => {
            if(data.success){
                document.getElementById('Id_alimento').value = "";
                alert("Se ha Modificado Satisfactoriamente!!!!");
                LlenarTabla();
                cerrar();
            } else {
                alert("NO se pudo eliminar");
            }
        })
        .catch(error => console.error('Error en la solicitud:', error.message));
    
}

function asignarvalor() {
    let valores = Buscar2();
    if (!valores) return;
    datosusuario = valores;
    plataforma1 = document.getElementById("ModificationA");
    plataforma1.hidden = true;

    plataforma2 = document.getElementById("formModificar");
    plataforma2.hidden = false;

    Id = valores.Id;
    document.getElementById('Nombre1').value = valores.Nombre;
    document.getElementById('Categoria1').value = valores.Categoria;
    document.getElementById('Índice Glúcemico1').value = valores.Indice;
}
