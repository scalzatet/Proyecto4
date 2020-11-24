let jwt = sessionStorage.getItem("jwt");


let rows = document.getElementById("rows"); 
let menuUsuarios = document.getElementById("menuUsuarios");  
let nombre = document.getElementById("nombre");
let apellido = document.getElementById("apellido");
let email = document.getElementById("email");
let cargo = document.getElementById("cargo");
let listaCompanias  = document.getElementById("compania"); 
let listaRegiones  = document.getElementById("region"); 
let listaPaises  = document.getElementById("pais"); 
let listaCiudades = document.getElementById("ciudad");  
let interes = document.getElementById("interes"); 
let canal_favorito = document.getElementById("contacto1"); 
let eliminarCont = document.getElementById("eliminarContacto");  

let agregarContacto = document.getElementById("agregarContacto"); 
let crearContactoBtn = document.getElementById("crearContacto"); 
let editarContactoBtn = document.getElementById("editarContacto"); 
let eliminarContactoBtn = document.getElementById("eliminarContacto"); 
let multDelete = document.getElementById("multDelete"); 
let deleteMultContact = document.getElementById("deleteMultContact"); 



multDelete
setTimeout(() => {
    $(document).ready(function() {
        $('#tContacts').DataTable();
    });
}, 1050);



window.onload = function () {
    console.log(jwt);
    console.log(parseJwt(jwt).roleId);
    if (jwt != null) {
        if (parseJwt(jwt).roleId == 2) {
            menuUsuarios.remove();
        }
        fetch('http://localhost:7000/contactos/', {
            method: 'GET',
            headers: { "Authorization": "Bearer " + jwt }
        }).then(res => {
            res.json().then(data => {
                data.forEach((e) => {
                    let template = `<tr><td> <input type="checkbox" data-id="${e.contactosId}" onclick="getChecked()"></td>
                        <td>${e.nombre} ${e.apellido}<br>${e.email}</td>
                        <td>${e.ciudad}</td>
                        <td>${e.compania}</td>
                        <td>${e.cargo}</td>
                        <td><div class="progress">
                                <div class="progress-bar" style="width: ${e.interes}%" role="progressbar" aria-valuenow="${e.interes}" aria-valuemin="0" aria-valuemax="100">${e.interes}%</div>
                            </div>
                        </td>
                        <td>${e.canal_favorito}</td>
                        <td><button  onclick="validarActualizar(${e.contactosId})" type='button' data-toggle="modal" data-target="#modalAgregarContacto" class='btn btn-info btn-sm acc'><i class="fa fa-pencil-square-o" aria-hidden="true"></i></button>
                            <button onclick="validarEliminar(${e.contactosId})"  data-toggle="modal" data-target="#modalBorrarContacto" type='button' class='btn btn-danger btn-sm acc'><span class="material-icons"><i class="fa fa-trash-o" aria-hidden="true"></i></span></button>
                        </td></tr>`;
                    rows.insertAdjacentHTML('beforeend', template);
                });
            });
            encontrarCompanias(jwt);
            encontrarRegiones(jwt);
        }).catch(error => {
            console.log(error);
        });
    } else {
        location.href = "../index.html";
    }
    agregarContacto.addEventListener('click', () => {
        nombre.value = "";
        apellido.value = "";
        email.value = "";
        cargo.value = "";
        editarContactoBtn.style.display = "none";
        crearContactoBtn.style.display = "initial";
    });
    crearContactoBtn.addEventListener('click', () => {
        agregarContactoFunc(jwt);
    });
};

////////////////////// CHEKED//////////////////////////
let idsContacts = [];

function getChecked() {
    let itemSelect = document.querySelectorAll('input[type="checkbox"]:checked');
    count.innerHTML = itemSelect.length + " Select";
    multDelete.style.display = itemSelect.length < 2 ? "none": "initial";
}

deleteMultContact.addEventListener('click', () => {
    multDeleteContacts();
});

function multDeleteContacts() {
    let itemSelect = document.querySelectorAll('input[type="checkbox"]:checked');
    itemSelect.forEach((e) => {
        if (jwt != null) {
            fetch(`http://localhost:7000/contactos/${e.dataset.id}`, {
                method: 'DELETE',
                headers:{"Content-Type":"application/json"}
            }).then(res => {
                if (res.status == 200) {
                } else {
                    console.log("error");
                }
            }).catch(error => {
                 console.log(error);
            }); 
        }
    });
    alert('Contactos Eliminados con éxito');

    location.href = location.href;
}

    

//////////////////////////////   LISTAR COMPAÑIAS    /////////////////////////


function encontrarCompanias(jwt) {
    fetch('http://localhost:7000/companias/', {
            method: 'GET',
            headers: { "Authorization": "Bearer " + jwt }
    }).then(res => {
        res.json().then(data => {
            data.forEach((e) => {
                let templateCompanias = `<option value=${e.companiaId}>${e.nombre}</option>`
                console.log(e.nombre);
                console.log(e.companiaId);
                listaCompanias.insertAdjacentHTML('beforeend', templateCompanias);
            });
        });
    }).catch(error => {
        console.log(error);
    });
};


//////////////////////////////   LISTAR REGIONES    /////////////////////////


function encontrarRegiones(jwt) {
    fetch('http://localhost:7000/ubicacion/regiones/', {
            method: 'GET',
            headers: { "Authorization": "Bearer " + jwt }
    }).then(res => {
        res.json().then(data => {
            data.forEach((e) => {
                let templateRegiones = `<option value=${e.id}>${e.region}</option>`
                listaRegiones.insertAdjacentHTML('beforeend', templateRegiones);
            });
        });
            
    }).catch(error => {
        console.log(error);
    });
};

    listaRegiones.addEventListener('change', () => {
    document.getElementById('pais').innerHTML = '';
    document.getElementById('ciudad').innerHTML = '';
    let opcionPaises = document.createElement("option");
    let opcionCiudades = document.createElement("option");
    opcionPaises.innerHTML = "Seleccionar...";
    opcionPaises.value = 0;
    opcionCiudades.innerHTML = "Seleccionar...";
    opcionCiudades.value = 0;
    listaPaises.appendChild(opcionPaises);
    listaCiudades.appendChild(opcionCiudades);

    encontrarPaises(jwt, listaRegiones.value);
});

//////////////////////////////   LISTAR PAISES    /////////////////////////

function encontrarPaises(jwt, regionId) {
    fetch(`http://localhost:7000/ubicacion/paises/${regionId}`, {
            method: 'GET',
            headers: { "Authorization": "Bearer " + jwt }
    }).then(res => {
        res.json().then(data => {
            data.forEach((e) => {
                let templatePaises = `<option value=${e.id}>${e.pais}</option>`
                listaPaises.insertAdjacentHTML('beforeend', templatePaises);
            });
        });
        
    }).catch(error => {
        console.log(error);
    });
}

    listaPaises.addEventListener('change', () => {
    document.getElementById('ciudad').innerHTML = '';
    let option = document.createElement("option");
    option.innerHTML = "Seleccionar...";
    option.value = 0;
    listaCiudades.appendChild(option);
    encontrarCiudad(jwt, listaPaises.value);
});

//////////////////////////////   LISTAR CIUDADES    /////////////////////////



function encontrarCiudad(jwt, paisId) {
    fetch(`http://localhost:7000/ubicacion/ciudades/${paisId}`, {
            method: 'GET',
            headers: { "Authorization": "Bearer " + jwt }
    }).then(res => {
        res.json().then(data => {
            data.forEach((e) => {
             let templateCiudades = `<option value=${e.id}>${e.ciudad}</option>`
                listaCiudades.insertAdjacentHTML('beforeend', templateCiudades);
            });
        });
        
    }).catch(error => {
        console.log(error);
    });
}

//////////////////////////    AGREGAR CONTACTO     /////////////////////

function agregarContactoFunc() {
    //console.log(jwt);
    //console.log(listaCiudades.value);
    //console.log(listaCompanias.value);
    if (jwt != null) {
       fetch("http://localhost:7000/contactos/agregar", {
            method: 'POST',
            body: `{
                "nombre": "${nombre.value}",
                "apellido": "${apellido.value}",
                "email": "${email.value}",
                "ciudadId": ${listaCiudades.value},
                "companiaId": ${listaCompanias.value},
                "cargo": "${cargo.value}",
                "canal_favorito": "${canal_favorito.value}",
                "interes": "${interes.value}"
            }`,
            headers:{"Content-Type":"application/json"}
    }).then(res => {
        if (res.status == 200) {
            res.json().then(data => {
            console.log(data);
            alert('Contacto creado con éxito');
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


//////////////////////////////   ELIMINAR CONTACTO    /////////////////////////

function validarEliminar(contactosId) {
    eliminarContactoBtn.addEventListener('click', ()=> {
        eliminarContacto(contactosId);

    });
}

function eliminarContacto(contactosId) {
    if (jwt != null) {
        fetch(`http://localhost:7000/contactos/${contactosId}`, {
        method: 'DELETE',
        headers:{"Content-Type":"application/json"}
    }).then(res => {
        if (res.status == 200) {
            alert('Contacto eliminado con éxito');
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

function validarActualizar(contactosId) {
    if (jwt != null) {
        fetch(`http://localhost:7000/contactos/${contactosId}`, {
             method: 'GET',
             headers: { "Authorization": "Bearer " + jwt }
     }).then(res => {
         if (res.status == 200) {
             res.json().then(data => {
                nombre.value = data[0].nombre;
                apellido.value = data[0].apellido;
                email.value = data[0].email;
                listaCompanias.value = data[0].companiaId;


                
                cargo.value = data[0].cargo;
                interes.value = data[0].interes;
                canal_favorito.value = data[0].canal_favorito;

                
                console.log(data);
             });
         } else {
             console.log("error");
             }
         }).catch(error => {
             console.log(error);
         }); 
    }
    crearContactoBtn.style.display = "none";
    editarContactoBtn.style.display = "initial";
    editarContactoBtn.addEventListener('click', () => {
    editarContactoFunc(jwt, contactosId);
    });
}


function editarContactoFunc(jwt, contactosId) {
    if (jwt != null) {
        fetch(`http://localhost:7000/contactos/${contactosId}`, {
             method: 'PUT',
             body: `{
                "nombre": "${nombre.value}",
                "apellido": "${apellido.value}",
                "email": "${email.value}",
                "ciudadId": ${listaCiudades.value},
                "companiaId": ${listaCompanias.value},
                "cargo": "${cargo.value}",
                "canal_favorito": "${canal_favorito.value}",
                "interes": "${interes.value}"
            }`,
            headers:{"Content-Type":"application/json"}
        }).then(res => {
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