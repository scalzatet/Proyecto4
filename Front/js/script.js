function login(){
    let user=document.getElementById("user");
    let pass=document.getElementById("pass");
    sessionStorage.clear();
        fetch('http://localhost:7000/usuarios/login',
        {
            method:'POST',
            body:`{"user":"${user.value}","pass":"${pass.value}"}`,
            headers:{"Content-Type":"application/json"}
        }).then(res=>{
            console.log(res.status);
            if(res.status==200){    
                res.json().then(data=>{
                sessionStorage.setItem("jwt", data);
                location.href = "./contactos.html";
                });    
            }
            else{
                alert("usuario o contraseña inválido");
                location.href = location.href; /////////// ---->>>>> ////////

            }
           
        }).catch(e=>{
            console.log(e);
        }); 
}




function aggRegion(){     
    location.href = "./crearegion.html";
};

function aggPais(){     
    location.href = "./crearpais.html";
};

function aggCiudad(){     
    location.href = "./crearciudad.html";
};

 