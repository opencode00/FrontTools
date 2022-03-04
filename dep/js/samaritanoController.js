const URL = 'http://localhost:13594';
const htTable = document.getElementById('table-data');


function updateData(jsonData){
    if (typeof(jsonData) != 'String') 
        jsonData = JSON.stringify(data);
    
    sessionStorage.setItem('diario', jsonData);
}

function filterDate(){
    fecha = document.getElementById('dateFilter')
    getData(fecha.value);
    updateGrid();
}

function fillTurnos(){
    turno = document.getElementById('turno');
    fetch(`${URL}/getTurnos`)
        .then(res => {
            if (res.ok) return res.json()
            else throw Error ('Error descargando los turnos')
        })
        .then(data => {
            // console.log(data);
            for (let i=0;i<data.length;i++){
                el = document.createElement('option');
                el.innerHTML = `${data[i]['Nombre']}`;
                el.value = `${data[i]['Turno']}`;
                el.dataset.in = `${data[i]['HIN']}`;
                el.dataset.out = `${data[i]['HOUT']}`;
                turno.appendChild(el);
            }
        })
        .catch (err => {console.error (err)})
    turno.addEventListener("change", actualizaHorasTurno);
}

function initForm(){
    document.getElementById('nip').value ='';
    document.getElementById('fecha').value = '';
    document.getElementById('turno').options.selectedIndex = 0;
    document.getElementById('exp').options.selectedIndex = 0;
    document.getElementById('asiste').options.selectedIndex = 0;
    document.getElementById('hora_entrada').value = ''
    document.getElementById('hora_salida').value = '';
    document.getElementById('tls').checked = false;
    document.getElementById('na').checked = false;
    document.getElementById('uh').checked = false;
    document.getElementById('ju').checked = false;
    document.getElementById('js').checked = false;
    document.getElementById('esp').checked = false;
    document.getElementById('ct').value = '';
    document.getElementById('apsa').value = '';
    document.getElementById('ae').value = '';
    document.getElementById('obs').value = '';
    document.getElementById('ID').value = '';
    document.getElementById('revisado').checked = false;
}

function actualizaHorasTurno(){
    turnoID = document.getElementById('turno');
    selValue = turnoID.options[turnoID.selectedIndex].value;
    horain = ''
    horaout = ''
    for(let i = 0; i< turnoID.options.length; i++){
        if(turnoID.options[i].value == selValue){
            horain = turnoID.options[i].getAttribute('data-in').toString();
            horaout = turnoID.options[i].getAttribute('data-out').toString();
            break;
        }
    }
    document.getElementById('hora_entrada').value = horain
    document.getElementById('hora_salida').value = horaout
}

function getComboIndexByValue(combo, value){
    element = document.querySelector(combo)
    for (let i=0; i< element.length; i++){
        if(element[i].value == value){
            return i;
        }
    }
}

function crudForm(id= null){
    const data = JSON.parse(sessionStorage.getItem('diario'));
    const form = document.getElementById('form');
    const btn = document.getElementById('btnAdd');
    form.style.display = 'block';
    
    initForm();
    actualizaHorasTurno();
    
    if (id != null){
        btn.innerHTML = 'Actualizar';
        for (let i= 0; i< data.length; i++){
            if (data[i]['ID'] == id){
                document.getElementById('nip').value = data[i]['NIP'].toString().toUpperCase();
                document.getElementById('fecha').value = data[i]['Fecha'].replace(/^(\d{2})\/(\d{2})\/(\d{4})$/g,'$3-$2-$1');
                document.getElementById('turno').options.selectedIndex = getComboIndexByValue('#turno', data[i]['Turno']);
                document.getElementById('exp').options.selectedIndex = getComboIndexByValue('#exp', data[i]['Expediente']);
                document.getElementById('asiste').options.selectedIndex = getComboIndexByValue('#asiste', data[i]['Asiste']);
                document.getElementById('hora_entrada').value = data[i]['HoraIN'];
                document.getElementById('hora_salida').value = data[i]['HoraOUT'];
                data[i]['TLS'] == 1?document.getElementById('tls').checked = true:document.getElementById('tls').checked = false; 
                data[i]['NoAsignado'] == 1?document.getElementById('na').checked = true:document.getElementById('na').checked = false;
                data[i]['UltimaHora'] == 1?document.getElementById('uh').checked = true:document.getElementById('uh').checked = false;
                data[i]['Justificado'] == 1?document.getElementById('ju').checked = true:document.getElementById('uh').checked = false;
                data[i]['JS'] == 1?document.getElementById('js').checked = true:document.getElementById('js').checked = false;
                data[i]['Especialidad'] == 1?document.getElementById('esp').checked = true:document.getElementById('esp').checked = false;
                document.getElementById('ct').value = data[i]['CT'];
                document.getElementById('apsa').value = data[i]['AsignadoPor_SustituyeA'];
                document.getElementById('ae').value = data[i]['Acto_Evento_Seccion'];
                document.getElementById('obs').value = data[i]['Observaciones'];
                document.getElementById('ID').value = data[i]['ID'];
                data[i]['Revisado'] == 1?document.getElementById('revisado').checked = true:document.getElementById('revisado').checked = false;
                break;
            }
        }
    }
}

function sendFormData(){
    let data= {}
    //DB: NIP,Placa,Seccion,Grupo,Nombre, Apellidos
    //Calculados: Comunicado, Diurnas, Nocturnas, Mes, Año
    if (document.getElementById('ID').value != '')
        data['ID'] = document.getElementById('ID').value;

    data['NIP'] = document.getElementById('nip').value
    data['Fecha'] = document.getElementById('fecha').value 
    data['Turno'] =document.getElementById('turno').options[document.getElementById('turno').selectedIndex].value
    data['Expediente'] = document.getElementById('exp').options[document.getElementById('exp').selectedIndex].value
    data['Asiste'] = document.getElementById('asiste').options[document.getElementById('asiste').selectedIndex].value
    data['HoraIN'] = document.getElementById('hora_entrada').value;
    data['HoraOUT'] = document.getElementById('hora_salida').value;
    data['TLS'] = document.getElementById('tls').checked == true?1:0;
    data['NoAsignado'] = document.getElementById('na').checked == true?1:0;
    data['UltimaHora'] = document.getElementById('uh').checked == true?1:0;
    data['Justificado'] = document.getElementById('uh').checked == true?1:0; 
    data['JS'] = document.getElementById('uh').checked == true?1:0; 
    data['Especialidad'] = document.getElementById('uh').checked == true?1:0; 
    data['CT'] = document.getElementById('ct').value; 
    data['AsignadoPor_SustituyeA'] = document.getElementById('apsa').value;
    data['Acto_Evento_Seccion'] = document.getElementById('ae').value;
    data['Observaciones'] = document.getElementById('obs').value;
    data['Revisado'] = document.getElementById('revisado').checked == true?1:0;
  
    fetch(`${URL}/asiento`,{
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
        .then(data => console.log(data.text()))
        .then(updateGrid())
        .then(document.getElementById('form').style.display = 'none')
        .then(play());
}


function updateGrid(jsonData = null){
    if (jsonData == null){
        jsonData = JSON.parse(sessionStorage.getItem('diario'));
    }
    htTable.innerHTML = '';
    opGrid(htTable, columns, jsonData, options);
}


function play() {
    var player = document.getElementById("player");
    player.play();
}