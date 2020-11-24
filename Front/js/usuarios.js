
let rows = document.getElementById("rows"); 
let menuUsuarios = document.getElementById("menuUsuarios");  
let usuario = document.getElementById("usuario");
let nombre = document.getElementById("nombre");
let apellido = document.getElementById("apellido");
let email = document.getElementById("email");
let perfil = document.getElementById("perfil");
let password = document.getElementById("password");
let passwordRep = document.getElementById("passwordRep");
let agregarUsuario = document.getElementById("agregarUsuario");
let crearUsuarioBtn = document.getElementById("crearUsuario"); 
let editarUsuarioBtn = document.getElementById("editarUsuario");  
let eliminarUsuarioBtn = document.getElementById("eliminarUsuario"); 

setTimeout(() => {
    $(document).ready(function() {
        $('#tUsuarios').DataTable();
    });
}, 180);
 

window.onload = function () {
    let jwt = sessionStorage.getItem("jwt");
    console.log(jwt);
    console.log(parseJwt(jwt).roleId);
    if (jwt != null) {
        if (parseJwt(jwt).roleId == 2) {
            menuUsuarios.remove();
        }
        fetch('http://localhost:7000/usuarios/', {
            method: 'GET',
            headers: { "Authorization": "Bearer " + jwt }
        }).then(res => {
            res.json().then(data => {
                data.forEach((e) => {
                    let template = `<tr>
                        <td>${e.usuario}</td>
                        <td>${e.nombre} ${e.apellido}</td>
                        <td>${e.email}</td>                        
                        <td>${e.rol}</td>                        
                        <td><button  onclick="validarActualizar(${e.usuarioId})" type='button' data-toggle="modal" data-target="#modalAgregarUsuario" class='btn btn-info btn-sm acc'><i class="fa fa-pencil-square-o" aria-hidden="true"></i></button>
                            <button onclick="validarEliminar(${e.usuarioId})" data-toggle="modal" data-target="#modalBorrarUsurio" type='button' class='btn btn-danger btn-sm acc'><span class="material-icons"><i class="fa fa-trash-o" aria-hidden="true"></i></span></button>
                        </td></tr>`;
                    rows.insertAdjacentHTML('beforeend', template);
                });
            });
        }).catch(error => {
            console.log(error);
        });
    } else {
        location.href = "../index.html";
    }
    agregarUsuario.addEventListener('click', () => {
        usuario.value = "";
        nombre.value = "";
        apellido.value = "";
        email.value = "";
        perfil.value = "";
        password.value = "";
        passwordRep.value = "";
        editarUsuarioBtn.style.display = "none";
        crearUsuarioBtn.style.display = "initial";
    });
    crearUsuarioBtn.addEventListener('click', () => {
        agregarUsuarioFunc(jwt);
    });
};


//////////////////////////    AGREGAR USUARIOS     /////////////////////

function agregarUsuarioFunc() {
    let jwt = sessionStorage.getItem("jwt");
    if (jwt != null) {
       fetch("http://localhost:7000/usuarios/agregar", {
            method: 'POST',
            body: `{
                "usuario": "${usuario.value}",
                "nombre": "${nombre.value}",
                "apellido": "${apellido.value}",
                "email": "${email.value}",
                "roleId": ${perfil.value},
                "contrasena": "${password.value}",
                "contrasenaRep": "${passwordRep.value}"
            }`,
            headers:{"Content-Type":"application/json"}
    }).then(res => {
        if (res.status == 200) {
            res.json().then(data => {
            console.log(data);
            alert('Usuario creado con éxito');
            location.href = location.href; /////////// ---->>>>> ////////

            });
        } else {
            console.log("error");
            }
        }).catch(error => {
            console.log(error);
        }); 
    } 
}


//////////////////////////////   ELIMINAR USUARIO    /////////////////////////

function validarEliminar(usuarioId) {
    eliminarUsuarioBtn.addEventListener('click', ()=> {
        eliminarUsuario((usuarioId) );
    });
}

function eliminarUsuario(usuarioId) {
    console.log(usuarioId);
    let jwt = sessionStorage.getItem("jwt");
    if (jwt != null) {
        fetch(`http://localhost:7000/usuarios/${usuarioId}`, {
        method: 'DELETE',
        headers:{"Content-Type":"application/json"}
    }).then(res => {
        if (res.status == 200) {
            alert('Usuario eliminado con éxito');
            location.href = location.href; /////////// ---->>>>> ////////

        } else {
            console.log("error");
        }
    }).catch(error => {
         console.log(error);
    }); 
    }
}


//////////////////////////////   ACTUALIZAR CONTACTO    /////////////////////////

    function validarActualizar(usuarioId) {
    let jwt = sessionStorage.getItem("jwt");
    if (jwt != null) {
        fetch(`http://localhost:7000/usuarios/${usuarioId}`, {
             method: 'GET',
             headers: { "Authorization": "Bearer " + jwt }
     }).then(res => {
         if (res.status == 200) {
             res.json().then(data => {
                usuario.value = data[0].usuario;
                nombre.value = data[0].nombre;
                apellido.value = data[0].apellido;
                email.value = data[0].email;
                perfil.value = data[0].roleId;
                password.value = data[0].contrasena;
                passwordRep.value = data[0].contrasena;

                console.log(data);

             });
         } else {
             console.log("error");
             }
         }).catch(error => {
             console.log(error);
         }); 
    }
    crearUsuarioBtn.style.display = "none";
    editarUsuarioBtn.style.display = "initial";
    editarUsuarioBtn.addEventListener('click', () => {
    editarUsuarioFunc(jwt, usuarioId);
    });
}


function editarUsuarioFunc(jwt, usuarioId) {
    if (jwt != null) {
        fetch(`http://localhost:7000/usuarios/${usuarioId}`, {
             method: 'PUT',
             body: `{
                "usuario": "${usuario.value}",
                "nombre": "${nombre.value}",
                "apellido": "${apellido.value}",
                "email": "${email.value}",
                "roleId": "${perfil.value}",
                "contrasena": "${password.value}",
                "contrasenaRep": "${passwordRep.value}"
            }`,
            headers:{"Content-Type":"application/json"}
        }).then(res => {
            console.log(perfil.value);
            if (res.status == 200) {
                alert("Contacto Actualizado con Éxito!");
                location.href = location.href; /////////// ---->>>>> ////////

            } else {
                console.log("error");
            }
        }).catch(error => {
             console.log(error);
        }); 
    }
}

////////////////////////////////


function parseJwt(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
};