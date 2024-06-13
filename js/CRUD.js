 
let Id_user="";


 document.getElementById('Formulario').addEventListener('submit', function (e) {
            e.preventDefault();

            const formData = new FormData(this);
            const id = document.getElementById('Id').value;

            if (id) {
                updateUser(formData);
            } else {
                createUser(formData);
            }
        });

function createUser(formData) {
    fetch('create.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.text())
    .then(data => {
        alert(data);
        fetchUsers();
    });
}

function fetchUsers() {
    fetch('read.php')
    .then(response => response.json())
    .then(data => {
        const usersList = document.getElementById('usersList');
        usersList.innerHTML = '';
        data.forEach(user => {
            usersList.innerHTML += `
                <div>
                    <p>${user.Nombre} ${user.Apellido}</p>
                    <button onclick="editUser(${user.Id})">Edit</button>
                    <button onclick="deleteUser(${user.Id})">Delete</button>
                </div>
            `;
        });
    });
}




function editUser(id) {
    fetch(`read.php`)
    .then(response => response.json())
    .then(data => {
        const user = data.find(u => u.Id == id);
        document.getElementById('Id').value = user.Id;
        document.getElementById('Nombre').value = user.Nombre;
        document.getElementById('Apellido').value = user.Apellido;
        document.getElementById('Edad').value = user.Edad;
        document.getElementById('Sexo').value = user.Sexo;
        document.getElementById('Correo').value = user.Correo;
        document.getElementById('Telefono').value = user.Telefono;
        document.getElementById('Usuario').value = user.Usuario;
        document.getElementById('Contraseña').value = user.Contrasena;
    });
}

function updateUser(formData) {
    fetch('update.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.text())
    .then(data => {
        alert(data);
        fetchUsers();
    });
}

function deleteUser(id) {
    const formData = new FormData();
    formData.append('Id', id);

    fetch('delete.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.text())
    .then(data => {
        alert(data);
        fetchUsers();
    });
}

function Tolist() {
    return fetch('read.php')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const usersList = [];
            data.forEach(user => {
                usersList.push(user);
            });
            return usersList;
        })
        .catch(error => {
            console.error('Error fetching user list:', error);
            return [];
        });
}

function verificar_user(){
    alert("hello");
    const usuario = document.getElementById("user").value;
    const password = document.getElementById("password").value;
    const Usuarios = Tolist();
 Tolist().then(Usuarios => {
        let userFound = false;
        Usuarios.forEach(user => {
            if (usuario == user.Usuario) {
                if (password == user.Contraseña) {
                    alert("bienvenido");
                    userFound = true;
                    return;
                }
            }
        });
        if (!userFound) {
            alert("El usuario es incorrecto!!!");
        }
    }).catch(error => {
        console.error('Error verifying user:', error);
        alert("Error al verificar el usuario.");
    });
}

