/*!
    * Start Bootstrap - SB Admin v7.0.1 (https://startbootstrap.com/template/sb-admin)
    * Copyright 2013-2021 Start Bootstrap
    * Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-sb-admin/blob/master/LICENSE)
    */
    // 
// Scripts
// 

function getData(fecha = null){
    console.log('obteniendo datos...');
    if (fecha != null){
        fetch(`${URL}/diario/${fecha}`)
        .then(res=>res.text())
        .then(data=>sessionStorage.setItem('diario',data))
        .then(updateGrid());
    }else{
        fetch(`${URL}/diario`)
        .then(res=>res.text())
        .then(data=>sessionStorage.setItem('diario',data))
        .then(updateGrid())
    }
    return true;
}


function initInterface(){
    fillTurnos();
    document.getElementById('form').style.display = 'none';
    document.getElementById('btnAdd').innerHTML = 'Añadir';
    document.getElementById('btnAdd').addEventListener("click", sendFormData);
}


window.addEventListener('DOMContentLoaded', event => {

    // Toggle the side navigation
    // const sidebarToggle = document.body.querySelector('#sidebarToggle');
    // if (sidebarToggle) {
    //     // Uncomment Below to persist sidebar toggle between refreshes
    //     // if (localStorage.getItem('sb|sidebar-toggle') === 'true') {
    //     //     document.body.classList.toggle('sb-sidenav-toggled');
    //     // }
    //     sidebarToggle.addEventListener('click', event => {
    //         event.preventDefault();
    //         document.body.classList.toggle('sb-sidenav-toggled');
    //         localStorage.setItem('sb|sidebar-toggle', document.body.classList.contains('sb-sidenav-toggled'));
    //     });
    // }
    
    initInterface();
    getData();
});

