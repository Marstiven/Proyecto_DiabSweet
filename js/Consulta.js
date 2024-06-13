function IsEmpty(argument) {
    return argument.value.trim() === '';
}
rol="";
document.addEventListener('DOMContentLoaded', function() {
    rol = localStorage.getItem('Rol');
    Id_perfil = localStorage.getItem('Id');
    getusuarios(rol);
    Accesousuarios(rol);
    LLenarPrincipal();
});
Id_perfil="";
Id_consulta="";
Id_User="";
Fecha="";
elementos = {};
tabla = "";
usuarios=[];

function Accesousuarios(rol) {
    if(rol == "3"){
    document.getElementById('create').hidden=true;
    document.getElementById('delete').hidden=true;
    document.getElementById('Gestionarbtn').hidden=true;
    document.getElementById('back').hidden=true;
    document.getElementById('Buscar').hidden=true;
    document.getElementById('Id_consulta').hidden=true;
    document.getElementById('Id_User').hidden=true;
    document.getElementById('Fecha').hidden=true;
    document.getElementById('textfecha').hidden=true;
    document.getElementById('MisAlimentos').hidden=true;
    document.getElementById('Guardar').hidden=true;
    document.getElementById('frase').hidden=false;
    }     
}

function cambiosentabla(idTabla1, idTabla2) {
    const tabla1 = document.getElementById(idTabla1);
    const tabla2 = document.getElementById(idTabla2);

    const tbody1 = tabla1.getElementsByTagName('tbody')[0];
    const tbody2 = tabla2.getElementsByTagName('tbody')[0];

    const filas1 = tbody1.getElementsByTagName('tr');
    const filas2 = tbody2.getElementsByTagName('tr');

    if (filas1.length !== filas2.length) {
        return false;
    }

    for (let i = 0; i < filas1.length; i++) {
        const celdas1 = filas1[i].getElementsByTagName('td');
        const celdas2 = filas2[i].getElementsByTagName('td');

        if (celdas1.length !== celdas2.length) {
            return false;
        }

        for (let j = 0; j < celdas1.length; j++) {
            if (celdas1[j].textContent.trim() !== celdas2[j].textContent.trim()) {
                return false;
            }
        }
    }
    return true; 
}

//para guardar la consulta
function cambios(){
    if(document.getElementById('Id_consulta').value !=Id_consulta)return true;
    if(document.getElementById('Id_User').value !=Id_User)return true;
    if(document.getElementById('Fecha').value !=Fecha)return true;
    if(cambiosentabla(tabla,document.getElementById('MisAlimentos')))return true;
    return false;
}

function getusuarios(rol) {
    fetch('https://proyectodiabsweet.000webhostapp.com/CRUD_Usuarios.php?action=Listar')
        .then(response => response.json())
        .then(data => {
            data.forEach(usuario => {
                if (rol != "3") {
                    usuarios.push({
                        Id: usuario.Id_persona,
                        Nombre: usuario.Nombre + " " + usuario.Apellido
                    });
                } else {
                    if (usuario.Id_persona == Id_perfil) {
                        usuarios.push({
                            Id: usuario.Id_persona,
                            Nombre: usuario.Nombre + " " + usuario.Apellido
                        });
                    }
                }
            });
        })
        .catch(error => {
            console.error('Error fetching data:', error.message);
        });
}

function ExisteUsuario(){
    const iduser = document.getElementById("Id_User");
    usuarios.forEach(user=>{
        if(user.Id == iduser)return true;
    })
    return false;
}

function Acceso(){
    document.getElementById('create').hidden=true;
    document.getElementById('delete').hidden=true;
    document.getElementById('Buscar').hidden=true;
    document.getElementById('back').hidden=false;
    document.getElementById('Id_consulta').hidden=false;
    document.getElementById('Id_User').hidden=false;
    document.getElementById('Fecha').hidden=false;
    document.getElementById('textfecha').hidden=false;
    document.getElementById('MisAlimentos').hidden=false;
    document.getElementById('Guardar').hidden=false;
    document.getElementById('Gestionarbtn').hidden=false;
}

function back(){
    document.getElementById('create').hidden=false;
    document.getElementById('delete').hidden=false;
    document.getElementById('Gestionarbtn').hidden=true;
    document.getElementById('back').hidden=true;
    document.getElementById('Buscar').hidden=false;
    document.getElementById('Id_consulta').hidden=true;
    document.getElementById('Id_User').hidden=true;
    document.getElementById('Fecha').hidden=true;
    document.getElementById('textfecha').hidden=true;
    document.getElementById('MisAlimentos').hidden=true;
    document.getElementById('Guardar').hidden=true;
}

function vacios(){
     if(IsEmpty(document.getElementById('Id_consulta')))return false;
    if(IsEmpty(document.getElementById('Id_User')))return false;
    if(IsEmpty(document.getElementById('Fecha')))return false;
    const tabla = document.getElementById('MisAlimentos');
    const tbody = tabla.getElementsByTagName('tbody')[0];
    const filas = tbody.getElementsByTagName('tr');
    if(filas.length === 0){alert("No hay alimentos registrados,no se puede guardar");return false;}
    return true;
}

//para buscar consulta
function BuscarConsulta(){
    const id_consulta = document.getElementById('ID_Buscar');
    let existe = false;
    if(!IsEmpty(id_consulta)){
        fetch("https://proyectodiabsweet.000webhostapp.com/CRUD_Consultas.php?action=Listar")
            .then(response => response.json())
            .then(jsonData => {
                jsonData.forEach(consulta => {
                    if(consulta.Id_Consulta == id_consulta.value){asignardatos(consulta); existe = true} 
                });
                 if(!existe){
                    alert("No se encontró una consulta con ese Id");
                }
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }
}
    
function LLenarPrincipal(){
fetch('https://proyectodiabsweet.000webhostapp.com/CRUD_alimentos.php?action=Listar')        
    .then(response => response.json())
    .then(data => {
        const tableBody = document.querySelector('#Alimentos tbody');
        tableBody.innerHTML = ''; 

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

function asignardatos(argument){
    document.getElementById('Id_consulta').value = argument.Id_Consulta;
    document.getElementById('Id_User').value = argument.Id_User;
    document.getElementById('Fecha').value = argument.Fecha;

    const fila = Getfila(argument.Id_Alimento, 'Alimentos');
    const Id_alimento = fila.getElementsByTagName('td')[0].textContent.trim();
    const Nombre_alimento = fila.getElementsByTagName('td')[1].textContent.trim();
    const Categoria_alimento = fila.getElementsByTagName('td')[2].textContent.trim();
    const Indice_glucemico = fila.getElementsByTagName('td')[3].textContent.trim();

    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${Id_alimento}</td>
        <td>${Nombre_alimento}</td>
        <td>${Categoria_alimento}</td>
        <td>${Indice_glucemico}</td>
    `;

    const tableBody = document.querySelector('#Alimentos tbody');
    tableBody.appendChild(row);
}

//para eliminar la consulta
function Aviso(Miuser){
    var confirmacion = window.confirm("¿Estas seguro que quieres Eliminar esta Consulta ?");
    return confirmacion;
}
function ELiminarConsulta() {
 if(Aviso()){
    let Idconsulta = document.getElementById('Id_consulta').value;
    fetch('https://proyectodiabsweet.000webhostapp.com/CRUD_Consultas.php?action=Eliminar',{
    method:'POST',
    body: JSON.stringify({Id_Consulta:Idconsulta})
    }).then(response => response.json())
    .then(data=>{
        if(data.success){
            alert("Se elimino correctamente!!");
            back();
        }
    }).catch(error => {
        console.error('Error fetching data:', error);
    });
 }
}


//para gestionar los alimentos

function  repetiralimento(argument) {
    const tabla = document.getElementById('MisAlimentos');
    const tbody = tabla.getElementsByTagName('tbody')[0];
    const filas = tbody.getElementsByTagName('tr');
    for (var i = filas.length - 1; i >= 0; i--) {
        const Id = filas[i].getElementsByTagName('td')[0].textContent.trim();
        if(argument == Id)return true;
    }
    return false;
}

function filltableagregar(){
    fetch('https://proyectodiabsweet.000webhostapp.com/CRUD_alimentos.php?action=Listar')        
        .then(response => response.json())
        .then(data => {
            const tableBody = document.querySelector('#alimentosTable1 tbody');
            tableBody.innerHTML = ''; 

            data.forEach(alimento => {
                if(!repetiralimento(alimento.Id_alimento)){
                    const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${alimento.Id_alimento}</td>
                    <td>${alimento.Nombre}</td>
                    <td>${alimento.Categoria}</td>
                    <td>${alimento.Indice_Glucemico}</td>
                `;
                tableBody.appendChild(row);
                }
            });
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}

function accesodelete(filas) {
     if(filas.length === 0){
        document.getElementById('alimentosTable2').hidden=true;
        document.getElementById('ID_Eliminar').hidden=true;
        document.getElementById('btneliminar').hidden=true;
        document.getElementById('avisodelete').hidden=false;
        return;
    }
    else{document.getElementById('alimentosTable2').hidden=false;
        document.getElementById('ID_Eliminar').hidden=false;
        document.getElementById('btneliminar').hidden=false;
        document.getElementById('avisodelete').hidden=true;}

}
function filltableEliminar(){
    const tableBody = document.querySelector('#alimentosTable2 tbody');
    tableBody.innerHTML = ''; 
    const tabla = document.getElementById('MisAlimentos');
    const tbody = tabla.getElementsByTagName('tbody')[0];
    const filas = tbody.getElementsByTagName('tr');
    for (var i = filas.length - 1; i >= 0; i--) {
        const Id_alimento = filas[i].getElementsByTagName('td')[0].textContent.trim();
        const Nombre_alimento = filas[i].getElementsByTagName('td')[1].textContent.trim();
        const Categoria_alimento = filas[i].getElementsByTagName('td')[2].textContent.trim();
        const Indice_glucemico = filas[i].getElementsByTagName('td')[3].textContent.trim();

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${Id_alimento}</td>
            <td>${Nombre_alimento}</td>
            <td>${Categoria_alimento}</td>
            <td>${Indice_glucemico}</td>
        `;
        tableBody.appendChild(row);
    }
    accesodelete(filas);
}

function Existe(id,id_tabla){
    const tabla = document.getElementById(id_tabla);
    const tbody = tabla.getElementsByTagName('tbody')[0];
    const filas = tbody.getElementsByTagName('tr');
    for (var i = filas.length - 1; i >= 0; i--) {
        const fila = filas[i].getElementsByTagName('td')[0].textContent.trim();
        if(fila === id.value)return true;
    }
    alert("NO se encontro un alimento registrado con ese ID!!")
    return false;
}
function Getfila(id,id_tabla){
    const tabla = document.getElementById(id_tabla);
    const tbody = tabla.getElementsByTagName('tbody')[0];
    const filas = tbody.getElementsByTagName('tr');
    for (var i = filas.length - 1; i >= 0; i--) {
        const fila = filas[i].getElementsByTagName('td')[0];
        if(fila.textContent.trim() === id)return filas[i];
    }
    return null;
}

function add(){
    const id = document.getElementById('ID_Agregar');
    if(!IsEmpty(id)){
        if (Existe(id, 'alimentosTable1')) {
            const datos = Getfila(id.value, 'alimentosTable1');
            if (datos) {
                const Id_alimento = datos.getElementsByTagName('td')[0].textContent.trim();
                const Nombre_alimento = datos.getElementsByTagName('td')[1].textContent.trim();
                const Categoria_alimento = datos.getElementsByTagName('td')[2].textContent.trim();
                const Indice_glucemico = datos.getElementsByTagName('td')[3].textContent.trim();

                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${Id_alimento}</td>
                    <td>${Nombre_alimento}</td>
                    <td>${Categoria_alimento}</td>
                    <td>${Indice_glucemico}</td>
                `;
                
                const tableBody = document.querySelector('#MisAlimentos tbody');
                tableBody.appendChild(row);
                document.getElementById('MisAlimentos').hidden = false;
                alert("se agrego correctamente!!");
                document.getElementById('ID_Agregar').value = "";
                filltableagregar();
            }
        } 
    }
}
function cut(){
    const id = document.getElementById('ID_Eliminar');
    if(!IsEmpty(id)){
        if(Existe(id,'alimentosTable2')){
            const tabla = document.getElementById('MisAlimentos');
            const tbody = tabla.getElementsByTagName('tbody')[0];
            const filas = tbody.getElementsByTagName('tr');
            
            for (let i = 0; i < filas.length; i++) {
                const celdas = filas[i].getElementsByTagName('td');
                if (celdas[0].textContent.trim() === id.value) {
                    filas[i].remove();
                    alert("Se elimino correctamente");
                    filltableEliminar();
                    return;
                }
            }
        }
    }
}

//para modificar consulta
function detectarcambios(Id) {
   
}

//para guardar consulta
function verificarId_Consulta(){
}
function search(){
    fetch('https://proyectodiabsweet.000webhostapp.com/CRUD_Consultas.php?action=Buscar',{
            method: 'POST',
            body: JSON.stringify({Id_Consulta:document.getElementById('Id_consulta').value})
        }).then(response=> response.json())
        .then(jsonData=>{
            if(jsonData.Id_Consulta == null){return true;}
            else{ return  false;}
        }).catch(error => {
        console.error('Error fetching data:', error);
    });
}
function verificarusuario() {
    const iduser = document.getElementById('Id_User').value;
    for (var i = usuarios.length - 1; i >= 0; i--) {
        if(usuarios[i].Id == iduser) {return true;}
    }
    alert("No existe un usuario con ese ID");
    return false;
}
function keep(){
    if(!vacios()){alert("Faltan datos por completar");return;}
    if(!search())return;
    alert("parte1");
    if(!verificarusuario())return;
    const consulta=document.getElementById('Id_consulta').value ;
    const IdUser=document.getElementById('Id_User').value;
    const fecha= document.getElementById('Fecha').value;
    alert("llegue aca");
    const tabla = document.getElementById('MisAlimentos');
    const tbody = tabla.getElementsByTagName('tbody')[0];
    const filas = tbody.getElementsByTagName('tr');
    for (var i = filas.length - 1; i >= 0; i--) {
        const Id_alimento = filas[i].getElementsByTagName('td')[0].textContent.trim();
        const datos = {
            Id_Consulta:consulta,
            Id_User:IdUser,
            Fecha:fecha,
            Id_Alimento:Id_alimento
        }
        fetch('https://proyectodiabsweet.000webhostapp.com/CRUD_Consultas.php?action=Agregar',{
            method: 'POST',
            body: JSON.stringify(datos)
        }).then(response=> response.json())
        .then(jsonData=>{
        }).catch(error => {
        console.error('Error fetching data:', error);
    });
    alert("se guardo satisfactoriamente");
    }
}
//hacer un metodo que guarde cada producto como un objeto de la consulta