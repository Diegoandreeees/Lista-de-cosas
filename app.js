// variables globales
const formularioUI = document.getElementById('formulario')
const listaActividadesUI = document.getElementById('listaActividades')
let arrayActividades = []


// funciones

const CrearItem = (actividad) => {

    let item = {
        actividad: actividad,
        estado: false
    }

    arrayActividades.push(item)

    return item

}

const GuardarDB = actividad => {

    localStorage.setItem('rutina', JSON.stringify(arrayActividades))

    pintarDB()

}

const pintarDB = () => {
    
    listaActividadesUI.innerHTML = '';

    arrayActividades = JSON.parse(localStorage.getItem('rutina'))

    if(arrayActividades === null) {
        arrayActividades = []
    }else{

        arrayActividades.forEach(element => {

            if (element.estado) {

                listaActividadesUI.innerHTML += `
                <div class="alert alert-success" role="alert"><i class="material-icons float-start me-2"><span class="material-icons-outlined">
                favorite
                </span></i><b>${element.actividad}</b> - ${element.estado}
                <span class="float-end"><i class="material-icons">done</i><i class="material-icons">delete</i></span></div>
                 `
                
            }else{
                listaActividadesUI.innerHTML += `
                <div class="alert alert-danger" role="alert"><i class="material-icons float-start me-2"><span class="material-icons-outlined">
                favorite_border
                </span></i><b>${element.actividad}</b> - ${element.estado}
                <span class="float-end"><i class="material-icons">done</i><i class="material-icons">delete</i></span></div>
                `
            }
            
        });

    }

}

const EliminarDB = (actividad) => {
     
    let indexArray 
    arrayActividades.forEach((elemento, index) => {
        console.log(index)
        if (elemento.actividad === actividad) {
            indexArray = index
        }
    })
    arrayActividades.splice(indexArray, 1)
    GuardarDB()
}

const EditarDB = (actividad) => {

    let indexArray = arrayActividades.findIndex((elemento) => elemento.actividad === actividad);

    arrayActividades[indexArray].estado = true

    GuardarDB()
}


// Event listener

formularioUI.addEventListener('submit', (e) => {
    
    e.preventDefault();
    let actividadUI = document.getElementById('actividad').value;

    CrearItem(actividadUI);

    GuardarDB();

    formularioUI.reset();

})

document.addEventListener('DOMContentLoaded', pintarDB)

listaActividadesUI.addEventListener('click', e =>{

    e.preventDefault()
    

    if (e.target.innerHTML === 'done' || e.target.innerHTML === 'delete') {
        let text = e.path[2].childNodes[1].innerHTML
        //accion de eliminar 
        if (e.target.innerHTML === 'delete') {
            EliminarDB(text)
        }
        //accion de editar
        if (e.target.innerHTML === 'done') {
            EditarDB(text)
        }
    }

})