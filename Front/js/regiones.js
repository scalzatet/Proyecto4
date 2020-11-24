let jwt = sessionStorage.getItem("jwt");

let rows = document.getElementById("rows");
let menuUsuarios = document.getElementById("menuUsuarios");  
let region = document.getElementById("region"); 
let pais = document.getElementById("pais"); 
let ciudad = document.getElementById("ciudad"); 
let listaRegiones = document.getElementById("regionList"); 

let listaRegionesEdit = document.getElementById("regionListEdit"); 
let listaPaisesEdit = document.getElementById("paisListEdit"); 
let listaCiudadesEdit = document.getElementById("ciudadListEdit"); 


let listaPaises = document.getElementById("paisList"); 

let agregarRegion = document.getElementById("agregarRegion"); 
let agregarPais = document.getElementById("agregarPais"); 
let agregarCiudad = document.getElementById("agregarCiudad"); 

let regionEdit = document.getElementById("regionEdit"); 
let paisEdit = document.getElementById("paisEdit"); 
let ciudadEdit = document.getElementById("ciudadEdit"); 




let crearRegionBtn = document.getElementById("crearRegion"); 
let crearPaisBtn = document.getElementById("crearPais"); 
let crearCiudadBtn = document.getElementById("crearCiudad"); 

let editarRegionBtn = document.getElementById("editarRegion"); 
let editarPaisBtn = document.getElementById("editarPais"); 
let editarCiudadBtn = document.getElementById("editarCiudad"); 


let listaRegionesElim = document.getElementById("regionListElim"); 
let eliminarRegionDefinitivamente = document.getElementById("eliminarRegionDefinitivamente");

let listaPaisesElim = document.getElementById("paisListElim"); 
let eliminarPaisDefinitivamente = document.getElementById("eliminarPaisDefinitivamente"); 

let listaCiudadesElim = document.getElementById("ciudadListElim"); 
let eliminarCiudadDefinitivamente = document.getElementById("eliminarCiudadDefinitivamente"); 




setTimeout(() => {
    $(document).ready(function () {
        $('#tUbication').DataTable();
    });
}, 230);


window.onload = function () {
    if (jwt != null) {
        if (parseJwt(jwt).roleId == 2) {
            menuUsuarios.remove();
        }
        fetch('http://localhost:7000/ubicacion', {
            method: 'GET',
            headers: { "Authorization": "Bearer " + jwt }
        }).then(res => {
            res.json().then(data => {
                data.forEach((e) => {
                    let template = `<tr><td><input type="checkbox"></td>
                                        <td>${e.regionDesc}</td>
                                        <td>${e.paisDesc}</td>
                                        <td>${e.ciudad}</td>
                                        </tr>`;
                    rows.insertAdjacentHTML('beforeend', template);
                });
            });
        }).catch(error => {
            console.log(error);
        });
    } else {
        location.href = "../index.html";
    }




    agregarRegion.addEventListener('click', () => {
        region.value = "";
/*         editarContactoBtn.style.display = "none";
 */        crearRegionBtn.style.display = "initial";
    });
    crearRegionBtn.addEventListener('click', () => {
        agregarRegionFunc(jwt);
    });




    agregarPais.addEventListener('click', () => {
        pais.value = "";
/*         editarContactoBtn.style.display = "none";
 */     crearPaisBtn.style.display = "initial";
        encontrarRegiones(jwt)
    });
    crearPaisBtn.addEventListener('click', () => {
        agregarPaisFunc(jwt);
    });





    agregarCiudad.addEventListener('click', () => {
        ciudad.value = "";
/*         editarContactoBtn.style.display = "none";
 */     crearCiudadBtn.style.display = "initial";
        encontrarPaises(jwt)
    });
    crearCiudadBtn.addEventListener('click', () => {
        agregarCiudadFunc(jwt);
    });

};




function agregarRegionFunc() {
    let jwt = sessionStorage.getItem("jwt");
    if (jwt != null) {
        fetch("http://localhost:7000/ubicacion/regiones/crear", {
            method: 'POST',
            body: `{
                "region": "${region.value}"
            }`,
            headers: { "Content-Type": "application/json" }
        }).then(res => {
            if (res.status == 409) {
                alert("Región ya Existente!");
                location.href = location.href; /////////// ---->>>>> ////////

            }
            if (res.status == 200) {
                res.json().then(data => {
                    console.log(data);
                    alert('Región creado con éxito');
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

////////////////////// CREAR PAIS ////////////////


function encontrarRegiones(jwt) {
    fetch('http://localhost:7000/ubicacion/regiones/', {
        method: 'GET',
        headers: { "Authorization": "Bearer " + jwt }
    }).then(res => {
        res.json().then(data => {
            data.forEach((e) => {
                let templateRegiones = `<option value=${e.id}>${e.region}</option>`
                listaRegiones.insertAdjacentHTML('beforeend', templateRegiones);
                listaRegionesEdit.insertAdjacentHTML('beforeend', templateRegiones);
                listaRegionesElim.insertAdjacentHTML('beforeend', templateRegiones);
            });
        });
    }).catch(error => {
        console.log(error);
    });
    //Editar
        editarRegionBtn.addEventListener('click', () => {
        let regionId = listaRegionesEdit.value;
        let regionAEditar = regionEdit.value;
        editarRegionFunc(regionId, regionAEditar);
    });
    //Eliminar
    eliminarRegionDefinitivamente.addEventListener('click', () => {
        let regionId = listaRegionesElim.value;
        eliminarRegionFunc(regionId);
    });
};



function agregarPaisFunc() {
    console.log(listaRegiones.value);

    let jwt = sessionStorage.getItem("jwt");
    if (jwt != null) {

        fetch("http://localhost:7000/ubicacion/paises/crear", {
            method: 'POST',
            body: `{
                "pais": "${pais.value}",
                "regionId": ${listaRegiones.value}

            }`,
            headers: { "Content-Type": "application/json" }
        }).then(res => {
            if (res.status == 409) {
                alert("País ya Existente!");
                location.href = location.href; /////////// ---->>>>> ////////

            }
            if (res.status == 200) {
                res.json().then(data => {
                    console.log(data);
                    alert('País creado con éxito');
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

////////////////////// CREAR CIUDAD ////////////////



function encontrarPaises(jwt) {
    fetch('http://localhost:7000/ubicacion/paises/', {
        method: 'GET',
        headers: { "Authorization": "Bearer " + jwt }
    }).then(res => {
        res.json().then(data => {
            data.forEach((e) => {
                let templatePaises = `<option value=${e.id}>${e.pais}</option>`
                listaPaises.insertAdjacentHTML('beforeend', templatePaises);
                listaPaisesEdit.insertAdjacentHTML('beforeend', templatePaises);
                listaPaisesElim.insertAdjacentHTML('beforeend', templatePaises);

            });
        });
    }).catch(error => {
        console.log(error);
    });
    //Editar
    editarPaisBtn.addEventListener('click', () => {
        let paisId = listaPaisesEdit.value;
        let paisAEditar = paisEdit.value;

        editarPaisFunc(paisId, paisAEditar);
    });

    //Eliminar
    eliminarPaisDefinitivamente.addEventListener('click', () => {
        let paisId = listaPaisesElim.value;
        eliminarPaisFunc(paisId);
    });
};



function agregarCiudadFunc() {
    console.log(listaPaises.value);
    console.log(ciudad.value);

    let jwt = sessionStorage.getItem("jwt");
    if (jwt != null) {

        fetch("http://localhost:7000/ubicacion/ciudades/crear", {
            method: 'POST',
            body: `{
                "ciudad": "${ciudad.value}",
                "paisId": ${listaPaises.value}
            }`,
            headers: { "Content-Type": "application/json" }
        }).then(res => {
            if (res.status == 409) {
                alert("Ciudad ya Existente!");
                location.href = location.href; /////////// ---->>>>> ////////

            }
            if (res.status == 200) {
                res.json().then(data => {
                    console.log(data);
                    alert('Ciudad creado con éxito');
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


///////////////////////////// ACTUALIZAR REGIÓN //////////////////////////

function editarRegionFunc(regionId, regionAEditar) {
    console.log(regionId);
    console.log(regionAEditar);
    console.log(jwt);
    if (jwt != null) {
        fetch(`http://localhost:7000/ubicacion/regiones/${regionId}`, {
            method: 'PUT',
            body: `{
                "region": "${regionAEditar}"
            }`,
            headers: { "Content-Type": "application/json" }
        }).then(res => {
            if (res.status == 200) {
                alert("Región Actualizado con Éxito!");
                location.href = location.href; /////////// ---->>>>> ////////

            } else {
                console.log("error");
            }
        }).catch(error => {
            console.log(error);
        });
    }
}



///////////////////////////// ACTUALIZAR PAIS //////////////////////////

function editarPaisFunc(paisId, paisAEditar) {
    console.log(paisId);
    console.log(paisAEditar);
    console.log(jwt);
    if (jwt != null) {
        fetch(`http://localhost:7000/ubicacion/paises/${paisId}`, {
            method: 'PUT',
            body: `{
                "pais": "${paisAEditar}"
            }`,
            headers: { "Content-Type": "application/json" }
        }).then(res => {
            if (res.status == 200) {
                alert("País Actualizado con Éxito!");
                location.href = location.href; /////////// ---->>>>> ////////

            } else {
                console.log("error");
            }
        }).catch(error => {
            console.log(error);
        });
    }
}


/////////////////////////////ACTUALIZAR CIUDAD///////////////////////////


function encontrarCiudad(jwt) {
    fetch('http://localhost:7000/ubicacion/', {
        method: 'GET',
        headers: { "Authorization": "Bearer " + jwt }
    }).then(res => {
        res.json().then(data => {
            data.forEach((e) => {
                let templateCiudades = `<option value=${e.ciudadId}>${e.ciudad}</option>`
                listaCiudadesEdit.insertAdjacentHTML('beforeend', templateCiudades);
                listaCiudadesElim.insertAdjacentHTML('beforeend', templateCiudades);


            });
        });
    }).catch(error => {
        console.log(error);
    });
    ///Editar
    editarCiudadBtn.addEventListener('click', () => {
        let ciudadId = listaCiudadesEdit.value;
        let ciudadAEditar = ciudadEdit.value;
        editarCiudadFunc(ciudadId, ciudadAEditar);
    });
    ///Eliminar
    eliminarCiudadDefinitivamente.addEventListener('click', () => {
        let ciudadId = listaCiudadesElim.value;
        eliminarCiudadFunc(ciudadId);
    });
};


function editarCiudadFunc(ciudadId, ciudadAEditar) {
    console.log(ciudadId);
    console.log(ciudadAEditar);
    console.log(jwt);
    if (jwt != null) {
        fetch(`http://localhost:7000/ubicacion/ciudades/${ciudadId}`, {
            method: 'PUT',
            body: `{
                "ciudad": "${ciudadAEditar}"
            }`,
            headers: { "Content-Type": "application/json" }
        }).then(res => {
            if (res.status == 200) {
                alert("Ciudad Actualizada con Éxito!");
                location.href = location.href; /////////// ---->>>>> ////////

            } else {
                console.log("error");
            }
        }).catch(error => {
            console.log(error);
        });
    }
}

//////////////////////////ELIMINAR REGION///////////////////////////////7


function eliminarRegionFunc(regionId) {
    console.log(regionId);
    if (jwt != null) {
        fetch(`http://localhost:7000/ubicacion/regiones/${regionId}`, {
            method: 'DELETE',
            headers:{"Content-Type":"application/json"}
        }).then(res => {
            if (res.status == 200) {
                alert("Región Eliminada con Éxito!");
                location.href = location.href; /////////// ---->>>>> ////////

            } else {
                console.log("error");
            }
        }).catch(error => {
            console.log(error);
        });
    }
}


//////////////////////////ELIMINAR PAIS///////////////////////////////7


function eliminarPaisFunc(paisId) {
    console.log(paisId);
    if (jwt != null) {
        fetch(`http://localhost:7000/ubicacion/paises/${paisId}`, {
            method: 'DELETE',
            headers:{"Content-Type":"application/json"}
        }).then(res => {
            if (res.status == 200) {
                alert("País Eliminado con Éxito!");
                location.href = location.href; /////////// ---->>>>> ////////

            } else {
                console.log("error");
            }
        }).catch(error => {
            console.log(error);
        });
    }
}


//////////////////////////ELIMINAR CIUDAD///////////////////////////////7


function eliminarCiudadFunc(ciudadId) {
    if (jwt != null) {
        fetch(`http://localhost:7000/ubicacion/ciudades/${ciudadId}`, {
            method: 'DELETE',
            headers:{"Content-Type":"application/json"}
        }).then(res => {
            if (res.status == 200) {
                alert("Ciudad Eliminada con Éxito!");
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