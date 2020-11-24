let rows = document.getElementById("rows"); 
let menuUsuarios = document.getElementById("menuUsuarios");  
let nombre = document.getElementById("nombre");
let direccion = document.getElementById("direccion");
let email = document.getElementById("email");
let telefono = document.getElementById("telefono");

let listaCiudades  = document.getElementById("ciudad"); 


let agregarCompania = document.getElementById("agregarCompania"); 
let crearCompaniaBtn = document.getElementById("crearCompania"); 
let editarCompaniaBtn = document.getElementById("editarCompania"); 
let eliminarCompaniaBtn = document.getElementById("eliminarCompania"); 


setTimeout(() => {
    $(document).ready(function() {
        $('#tCompanias').DataTable();
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
        fetch('http://localhost:7000/companias/', {
            method: 'GET',
            headers: { "Authorization": "Bearer " + jwt }
        }).then(res => {
            res.json().then(data => {
                data.forEach((e) => {
                    let template = `<tr>
                        <td>${e.nombre}</td>
                        <td>${e.direccion}</td>
                        <td>${e.email}</td>
                        <td>${e.telefono}</td>
                        <td>${e.ciudadDesc}</td>
                        
                        <td><button  onclick="validarActualizar(${e.companiaId})" type='button' data-toggle="modal" data-target="#modalAgregarCompania" class='btn btn-info btn-sm acc'><i class="fa fa-pencil-square-o" aria-hidden="true"></i></button>
                            <button onclick="validarEliminar(${e.companiaId})"  data-toggle="modal" data-target="#modalBorrarCompania" type='button' class='btn btn-danger btn-sm acc'><span class="material-icons"><i class="fa fa-trash-o" aria-hidden="true"></i></span></button>
                        </td></tr>`;
                    rows.insertAdjacentHTML('beforeend', template);
                });
            });
            encontrarCiudades(jwt);
        }).catch(error => {
            console.log(error);
        });
    } else {
        location.href = "../index.html";
    }

    agregarCompania.addEventListener('click', () => {
        nombre.value = "";
        direccion.value = "";
        email.value = "";
        telefono.value = "";
        editarCompaniaBtn.style.display = "none";
        crearCompaniaBtn.style.display = "initial";
    });
    crearCompaniaBtn.addEventListener('click', () => {
        agregarCompaniaFunc(jwt);
    });
};


//////////////////////////////   LISTAR CIUDADES    /////////////////////////


function encontrarCiudades(jwt) {
    fetch('http://localhost:7000/ubicacion/', {
            method: 'GET',
            headers: { "Authorization": "Bearer " + jwt }
    }).then(res => {
        res.json().then(data => {
            data.forEach((e) => {
                let templateCiudades = `<option value=${e.ciudadId}>${e.ciudad}</option>`
                listaCiudades.insertAdjacentHTML('beforeend', templateCiudades);
            });
        });
    }).catch(error => {
        console.log(error);
    });
};

//////////////////////////////   AGREGAR COMPAÑÌA    /////////////////////////


function agregarCompaniaFunc(jwt) {
    console.log(listaCiudades.value);
    if (jwt != null) {
       fetch("http://localhost:7000/companias/agregar", {
            method: 'POST',
            body: `{
                "nombre": "${nombre.value}",
                "direccion": "${direccion.value}",
                "email": "${email.value}",
                "telefono": ${telefono.value},
                "ciudadId": ${listaCiudades.value}
            }`,
            headers:{"Content-Type":"application/json"}
    }).then(res => {
        if (res.status == 200) {
            res.json().then(data => {
                alert("Compañía Creada con Éxito!");
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


//////////////////////////////   ELIMINAR COMPAÑÌA    /////////////////////////

function validarEliminar(companiaId) {
    console.log("skskksks");
    eliminarCompaniaBtn.addEventListener('click', ()=> {

        eliminarCompaniaFunc(companiaId);

    });
}

function eliminarCompaniaFunc(companiaId) {
    console.log("otrocos");

    let jwt = sessionStorage.getItem("jwt");
    if (jwt != null) {
        fetch(`http://localhost:7000/companias/${companiaId}`, {
        method: 'DELETE',
        headers:{"Content-Type":"application/json"}
    }).then(res => {
        if (res.status == 200) {
            alert('Compañía eliminada con Éxito');
            location.href = location.href; /////////// ---->>>>> ////////

        } else {
            console.log("error");
        }
    }).catch(error => {
         console.log(error);
    }); 
    }
}


//////////////////////////////   ACTUALIZAR COMPAÑÍA    /////////////////////////

function validarActualizar(companiaId) {
    let jwt = sessionStorage.getItem("jwt");
    if (jwt != null) {
        fetch(`http://localhost:7000/companias/${companiaId}`, {
             method: 'GET',
             headers: { "Authorization": "Bearer " + jwt }
     }).then(res => {
         if (res.status == 200) {
             res.json().then(data => {
                nombre.value = data[0].nombre;
                direccion.value = data[0].direccion;
                email.value = data[0].email;
                telefono.value = data[0].telefono;
                listaCiudades.value = data[0].ciudadId;
                console.log(data);
             });
         } else {
             console.log("error");
             }
         }).catch(error => {
             console.log(error);
         }); 
    }
    crearCompaniaBtn.style.display = "none";
    editarCompaniaBtn.style.display = "initial";
    editarCompaniaBtn.addEventListener('click', () => {
    editarCompaniaFunc(jwt, companiaId);
    });
}


function editarCompaniaFunc(jwt, companiaId) {
    console.log(companiaId);

    if (jwt != null) {
        fetch(`http://localhost:7000/companias/${companiaId}`, {
             method: 'PUT',
             body: `{
                "nombre": "${nombre.value}",
                "direccion": "${direccion.value}",
                "email": "${email.value}",
                "telefono": ${telefono.value},
                "ciudadId": ${listaCiudades.value}
            }`,
            headers:{"Content-Type":"application/json"}
        }).then(res => {
            if (res.status == 200) {
                alert("Compañía Actualizado con Éxito!");
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