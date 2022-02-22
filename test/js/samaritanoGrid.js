const options = {
    bindValue: "ID",
    headerFixed: true,
    bindedReplaceText: '%bind%'
}

const columns = [
    {
        header: 'Acciones',
        type: 'html',  
        // value: `<input type="button" onclick="alert(\'Fila ${bindedReplaceText}\')" value="Editar">`,
        // value: `<a href="http://localhost:13594/editar/%binded%" target="_blank">Editar</a>`,
        value: `<button onclick="crudForm(${options['bindedReplaceText']})">Editar</button>`,
    },
    {
        header: 'NIP',
        type: 'field',
        value:"NIP",
        sorter: true, 
        filter: true,
        width: 80,
    },
    {
        header: 'Sección',
        type: 'field',
        value:"Seccion",
        width: 170,
        sorter: true, 
        filter: true,
    },
    {
        header: 'Grp',
        type: 'field',
        value:"Grupo",
        sorter: true, 
        filter: true,
        width: 50
    },
    {
        header: 'Nombre y Apellidos',
        type: 'fieldGroup',
        value: ["Nombre","Apellidos"],
        width: 300,
    },
    {
        header: 'Fecha',
        type: 'field',
        value:"Fecha",
        sorter: true, 
        filter: true,
    },
    {
        header: 'Com.',
        type: 'field',
        value:"Comunicado",
        sorter: true, 
        filter: true,
        width: 50
    },
    {
        header: 'Turno',
        type: 'field',
        value:"Turno",
        sorter: true, 
        filter: true,
        width: 50
    },
    {
        header: 'Asiste',
        type: 'field',
        value:"Asiste",
        sorter: true, 
        filter: true,
        width: 50
    },
    {
        header: 'H.In',
        type: 'field',
        value:"HoraIN",
    },
    {
        header: 'H.Out',
        type: 'field',
        value:"HoraOUT",
    },
    {
        header: 'Diur',
        type: 'field',
        value: "Diurnas",
    },
    {
        header: 'Noct',
        type: 'field',
        value:"Nocturnas",
    },
    {
        header: 'Observaciones',
        type: 'field',
        value:"Observaciones",
        sorter: true, 
        filter: true,
        width: 200
    },
    {
        header: 'Expediente',
        type: 'field',
        value:"Expediente",
        sorter: true, 
        filter: true,
    },
    {
        header: 'JS',
        type: 'checkbox',
        value:"JS",
        sorter: true, 
        filter: true,
    },
    {
        header: 'TLS',
        type: 'checkbox',
        value:"TLS",
        sorter: true, 
        filter: true,
    },
    {
        header: 'Especialidad',
        type: 'checkbox',
        value:"Especialidad",
        sorter: true, 
        filter: true,
    },
]