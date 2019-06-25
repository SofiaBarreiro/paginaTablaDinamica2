
var btnAlta;
var divFrm;
var frmAlta;
var divInfo;
var btnCancelar;
var lista;
var personaA;
var thead;

window.onload = asignarEventos;


function asignarEventos() {
    $(document).ready(function () {
        console.log('jquery andando');
    })

    cerrarFormulario();
    traerPersonas();
    $('#btnAlta').click(function () { 
        
        abrirFormulario();
        mostrarFormulario(lista[0]["id"], "alta");
    });
}


function cerrarFormulario() {
    var closeUp = document.getElementById('closeUp');
    closeUp.setAttribute('class', 'show');
    var form = document.getElementById("divFrm");

    if (form.classList.contains("show")) {
        form.classList.remove("show");
    }
    if (!form.classList.contains("hide")) {
        form.classList.add("hide");
    }
    limpiarElementos();

}
function abrirFormulario() {
    var closeUp = document.getElementById('closeUp');
    closeUp.setAttribute('class', 'hide');

    var form = document.getElementById("divFrm");

    if (form.classList.contains("hide")) {
        form.classList.remove("hide");
    }
    if (!form.classList.contains("show")) {
        form.classList.add("show");
    }

}
function mostrarFormulario(id, operacion) {

    var form = document.getElementById("divFrm");

    for (var i = 0; i < lista.length; i++) {

        for (var j in lista[i]) {
            if (lista[i][j] == id) {

                personaA = lista[i];

            }

        }

    }

    if (operacion == "modificar") {

        cargarPersonaEnForm(personaA, operacion);
        var botonModificar = document.createElement("button");
        botonModificar.setAttribute('id', 'btnModificar');
        botonModificar.setAttribute("type", "button");
        botonModificar.textContent = 'Change';
        botonModificar.setAttribute('class', 'btn btn-warning');

        var botonEliminar = document.createElement("button");

        botonEliminar.setAttribute("type", "button");
        botonEliminar.textContent = 'Delete';
        botonEliminar.setAttribute('class', 'btn btn-warning');



        botonEliminar.addEventListener("click", () => {
            var persona = modificarTabla('modificar', personaA.id);
            cerrarFormulario();
            borrarTabla();
            eliminarPersona(persona.id);
            traerPersonas();
        })

        botonModificar.addEventListener("click", () => {

            var persona = modificarTabla('modificar', personaA.id);
            if (persona != false) {

                cerrarFormulario();
                borrarTabla();
                modificarPersona(persona);
                traerPersonas();
            }

        })
        form.appendChild(botonModificar);
        form.appendChild(botonEliminar);

    }
    else {
        cargarPersonaEnForm(personaA, operacion);

        var botonEnviar = document.createElement("input");
        botonEnviar.setAttribute('id', 'btnEnviar');

        botonEnviar.setAttribute("type", "button");
        botonEnviar.setAttribute("value", "Save");
        botonEnviar.setAttribute('class', 'btn btn-warning');

        botonEnviar.addEventListener("click", () => {

            var persona = modificarTabla('agregar');
            if (persona != false) {
                borrarTabla();
                cerrarFormulario();
                guardarPersona(persona);
                traerPersonas();

            }



        })
        form.appendChild(botonEnviar);
    }


    var botonCerrar = document.createElement("button");
    botonCerrar.setAttribute("type", "button");
    botonCerrar.textContent = 'Close';
    botonCerrar.setAttribute('class', 'btn btn-warning');


    botonCerrar.addEventListener('click', () => {
        cerrarFormulario();
    });
    form.appendChild(botonCerrar);
}
function obtenerPersonaForm() {
    var obj = {};
    lista[0];

    for (var key in lista[0]) {
        obj[key] = document.getElementById(key).value;
    }

    return obj;

}
function cargarPersonaEnForm(persona, operacion) {
    var form = document.getElementById("divFrm");

    for (var key in persona) {

        var label = document.createElement("label");
        label.style.display = "block";
        var datoLabel = document.createTextNode(key);
        label.appendChild(datoLabel);

        var genderF;
        var genderM;
        var select = document.createElement('select');



        if (key == "gender") {

            select.setAttribute('class', "form-control");
            select.setAttribute('id', "exampleFormControlSelect1");
            console.log(select.textContent);

            genderF = document.createElement("option");
            genderM = document.createElement("option");
            genderF.setAttribute("value", "Female");
            genderM.setAttribute("value", "Male");
            genderF.setAttribute("id", "genderF");
            genderM.setAttribute("id", "genderM");
            var f = document.createTextNode("Female");
            var m = document.createTextNode("Male");
            genderF.appendChild(f);
            genderM.appendChild(m);
            select.appendChild(genderF);
            select.appendChild(genderM);
            form.appendChild(select);


        } else {

            var dato;
            dato = document.createElement("input");
            dato.setAttribute("id", key);
            dato.setAttribute("type", "text");
            dato.style.display = "block";
            dato.setAttribute('class', "form-control")
            dato.setAttribute('aria-describedby', 'emailHelp');
            dato.setAttribute('position', 'fixed');

            switch (key) {
                case ('active'):
                    label.style.display = "none";
                    dato.style.display = "none";
                    break;
                case ('email'):
                    dato.placeholder = 'example@email.com';
                    break;
                case ('id'):
                    dato.readOnly = true;
                default:
                    dato.placeholder = key;
                    break;

            }
            form.appendChild(dato);

        }



        if (operacion == "alta") {
            var datoPersona = document.createTextNode(persona[key]);
            dato.appendChild(datoPersona);
            dato.textContent = datoPersona;
        } else {
            if (key != 'gender') {
                dato.value = persona[key];
            }
        }

        form.appendChild(label);



    }
    console.log(select);

}

function limpiarElementos() {

    var elemento = document.getElementById("divFrm");

    while (elemento.firstChild) {
        elemento.removeChild(elemento.firstChild);
    }
}
function setSpinner(mostrar) {

    var spinner = document.getElementById('divSpinner');
    if (mostrar == 'show') {

        spinner.setAttribute('display', 'block');


    }
    if (mostrar == 'hide') {

        spinner.setAttribute('class', 'hide');


    }


}

function manejadorRespuesta() {

    if (xhr.readyState == 4) {

        if (xhr.status == 200) {
            var arrayPersonas = JSON.parse(xhr.responseText);
            lista = arrayPersonas.data;
            armarTabla(lista);

        }
    }


}
function manejadorRespuesta2() {

    if (xhr.readyState == 4) {

        if (xhr.status == 200) {
            var arrayPersonas = JSON.parse(xhr.responseText);
            lista = arrayPersonas.data;
            armarTabla(lista);
        }
    }

}




function armarTabla(lista) {
    setSpinner('hide');
    var div = document.getElementById('bodyTabla');
    var divTabla = document.getElementById('tablaLista');

    if (thead == null) {
        thead = document.createElement('thead');
        var tr = document.createElement('tr');
        var encabezados = ['Id', 'First name', 'Last name', 'Email', 'Gender'];
        thead.appendChild(tr);

        for (var i in encabezados) {

            var th = document.createElement('th');
            var text = document.createTextNode(encabezados[i]);
            th.appendChild(text);
            tr.appendChild(th);



        }


        divTabla.appendChild(thead);

    }






    for (var i in lista) {
        var tr = document.createElement('tr');
        div.appendChild(tr);

        for (var j in lista[i]) {
            if (j != 'active') {

                var td = document.createElement('td');
                text = document.createTextNode(lista[i][j]);

                td.appendChild(text);
                tr.appendChild(td);

                td.addEventListener('click', (e) => {
                    abrirFormulario();
                    mostrarFormulario(e.target.parentNode.firstChild.textContent, "modificar");

                });
            }

        }
    }


}

function borrarTabla() {

    var body = document.getElementById('bodyTabla');
    while (body.firstChild) {
        body.removeChild(body.firstChild);
    }
}


function modificarTabla(accion, id) {
    var retornoLista;
    var obj = {};


    obj["id"] = id;
    obj["first_name"] = document.getElementById("first_name").value;
    obj["last_name"] = document.getElementById("last_name").value;
    obj["email"] = document.getElementById("email").value;
    obj["gender"] = document.getElementById("exampleFormControlSelect1").value;




    if (accion == 'modificar') {
        for (var i in lista) {
            if (id == lista[i].id) {
                lista[i] = obj;
                retornoLista = lista[i];

            }


        }

    }

    if (accion == 'agregar') {

        obj["id"] = lista.length + 1;

        retornoLista = obj;

    }
    console.log(retornoLista);
    if (retornoLista.email.trim() === "" || retornoLista.first_name.trim() === "" || retornoLista.last_name.trim() === "") {

        console.log('no se pudo guardar el usuario, faltan datos');
        console.log(retornoLista);
        retornoLista = false;
    }

    console.log(retornoLista);
    return retornoLista;

}
