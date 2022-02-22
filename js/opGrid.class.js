/**
 *
 * htmlElement: es el document.getElementByID del elemento donde se va a anexar la tabla.
 * 
 * data: Son los datos en formato json. {clave: valor}
 * 
 * columns (Array de objetos) - Definición de los tipos de datos (obtenidos de data) que va a mostrar la tabla. Un array de objetos por cada columna de la grid.
 *   {
 *      header: (string) nombre de la cabecera de la tabla. Tambien se usa para general los ID de los elementos HTML de la tabla.,
 *      
 *      type: (string) tipo de dato a mostrar en la tabla
 *          field: Será un campo (key) dentro de data (array)
 *          fieldGroup: (Array) Array de valores da data para mostrar juntos. Se juntan con joinGroup (P.D espacio).
 *          checkbox|boolean: Convierte los valores booleanos o 0 y 1 del campo dentro de data.
 *          html: define un valor html para enlaces, botones, etc.
 * 
 *      value:(string) valor segun el tipo:
 *          field: nombre de campo/s dentro de data
 *          html: valor html que se quiera mostrar.Importante el atributo binded y bindedReplaceText
 *                (EJ: `<button onclick="crudForm(-- bindedReplaceText--)">Editar</button>`,)
 *                NOTA: bindedReplaceText puede ser: 
 *                      - la propiedad (con el mismo nombre) del objeto de configuracion options
 *                      - un valor de texto cualquiera que coincida con el el valor de la propiedad del objeto de configuración options. 
 *                        Como por defecto esta propiedad tiene el valor %binded% podemos usar esta cadena.
 *       
 *       sort: (bool) crea un elemento para ordenar por dicha columna
 *       filter: (bool) crea un input para filtar los datos de dicha columna. Pulsar sobre la cabecera. 
 *       width: (int) ancho de la columna
 *    }
 * 
 * options (Objeto) - Define las opciones de funcionalidad del grid
 *   {
 *      tableID:    (string) (dataTable) ID Html de la tabla. Tambien participa en el ID de otros elementos.
 *      tableClass: (string) (opTable) Clase Html de la tabla
 *      thClass:    (string) (thClass) Clase Html de las columnas de la cabecera.
 *      trClass:    (string) (trClass) Clase Html de filas de datos.
 *      tdClass:    (string) (tdClass) Clase Html de columnas de datos.
 *      bindedReplaceText: (string) (%binded%) texto con el que se reeemplazará el valor de bindValue en las columnas definidas por el usuario.
 *      groupJoin:  (string) (' ') Carcater de union para el tipo fieldGroup 
 *      bindValue: (string) ("ID) nombre del campo de data para enlazar con la API o la BBDD
 *      headerFixed: (bool) (true) fija la cabecera de la tabla
 *   }   
 */ 

 function opGrid(htmlElement, columns, data, options){
    
    if (!options.hasOwnProperty('tableID'))  options['tableID'] = 'dataTable';
    if (!options.hasOwnProperty('tableClass')) options['tableClass'] = 'opTable table';
    if (!options.hasOwnProperty('thClass'))  options['thClass'] = 'thClass';
    if (!options.hasOwnProperty('trClass'))  options['trClass'] = 'trClass';
    if (!options.hasOwnProperty('tdClass'))  options['tdClass'] = 'tdClass';
    if (!options.hasOwnProperty('bindedReplaceText')) options['bindedReplaceText'] = '%binded%';
    if (!options.hasOwnProperty('groupJoin')) options['groupJoin'] = ' ';
    if (!options.hasOwnProperty('bindValue'))  options['bindValue'] = "ID";
    if (!options.hasOwnProperty('headerFixed')) options['headerFixed'] = true;
    options['sort'] = -1;

    let filtered= data;
    let table = document.createElement('table');
    table.className += options['tableClass'].toString();
    table.setAttribute('id', options['tableID'].toString())
    
    let thead = document.createElement('thead');
    let tbody = document.createElement('tbody');
    thead.setAttribute('id', `${options.tableID.toString()}_tHead`)
    tbody.setAttribute('id', `${options.tableID.toString()}_tBody`)
    
    if (options['headerFixed']){
        thead.style.position = 'sticky';
        thead.style.top = 0;
    }
    
    //Cabeceras
    renderHeader();
    
    //Cuerpo de la tabla
    renderBody(data);
    localStorage.setItem('bodyCache', tbody.innerHTML);

    table.appendChild(thead);
    table.appendChild(tbody);
    htmlElement.appendChild(table)
    
    //Sorters
    let sorters = document.getElementsByClassName('sorter');
    for (let i= 0; i < sorters.length; i++){
        sorters[i].addEventListener('click', () =>{
            toggleSort(sorters[i])
            if (typeof(data[i][sorters[i].dataset.id]) == 'string'){
                sortString(sorters[i].dataset.id)
            }else{
                sortNumber(sorters[i].dataset.id)
            }
        });
    }

    //Filters
    let hfilters = document.getElementsByClassName('filter');
    for (let i= 0; i < hfilters.length; i++){
        hfilters[i].addEventListener('click', () =>{
            toggleFilter(hfilters[i].dataset.id);
        });
    }

    filters = document.getElementsByClassName('filter-item');
    for (let i= 0; i < filters.length; i++){
        if (filters[i].nodeName == 'INPUT'){
            DOMfilter(filters[i]);   //Version que esconde filas
            //filter(filters[i]);    //Version que filtra la fuente de datos
        }else{
            filters[i].addEventListener('click', () =>{
                resetFilters(filters[i].dataset.id);
            });
        }
    }

    function renderHeader(){
        //Cabeceras
        var tr =  document.createElement('tr');
        tr.setAttribute('id',`${options['tableID'].toString()}_trHead`);
        for (header in columns){
            let th =  document.createElement('th');
            th.className += options['thClass'].toString();
            th.setAttribute('id', `header-${columns[header]['value']}`)
            th.setAttribute('data-id', `${columns[header]['value']}`)

            let cabecera = columns[header]['header'];
            let orden = '';
            let filter = ''
            if (columns[header]['filter']){
                cabecera = `<a class="filter" data-id="${columns[header]['value']}" id="filter-${columns[header]['value']}">${columns[header]['header']}</a>`;
                filter =  `<div id="div-filter-${columns[header]['value']}" style="display:none;">`;
                filter += `<input type="text" data-id="${columns[header]['value']}" id="input-${columns[header]['value']}" class="filter-item" style="width: ${columns[header]['header'].length}em">`;
                filter += `<a data-id="${columns[header]['value']}" class="filter-item" style="color:red;">x</a>`
                filter += `</div>`;
            }

            if (columns[header]['sorter'])
                orden = `<a class="sorter" data-sort="${options['sort']}" data-id="${columns[header]['value']}" id="sort-${columns[header]['value']}">&#8645;</a>`;

            th.innerHTML =  `${cabecera} ${orden} <br> ${filter}`;           
            tr.appendChild(th)
        }
        thead.appendChild(tr)
    }    

    function renderBody(datos){
        //Cuerpo -Datos
        //for (item of datos){
        datos.map(item =>{
            let tr = document.createElement('tr');
            tr.className += options['trClass'].toString();
            tr.setAttribute('id', item[options['bindValue']]);
            columns.map(field=>{
                let text = ''
                let td = document.createElement('td');
                if (field.width !== undefined)
                    td.setAttribute('width', `${field.width}`);
                td.className += options['tdClass'];
                td.setAttribute ('data-field', field.value);
                switch(field.type){
                    case 'field':
                        td.innerHTML = item[field.value];
                        td.setAttribute('id', `${field.header.toLowerCase()}-${item[options['bindValue']]}`);
                        break;
                    case 'fieldGroup':
                        for (i in field.value){
                            text += item[field.value[i]] + options['groupJoin'];
                        }
                        td.innerHTML = text;
                        td.setAttribute('id', `${field.header.toLowerCase()}-${item[options['bindValue']]}`);
                        break;
                    case 'checkbox':
                    case 'boolean':
                        if (item[field.value] == 1) text='checked';
                        td.innerHTML = `<input type="checkbox" ${text} onclick='return false'>`;
                        td.setAttribute('id', `${field.header.toLowerCase()}-${item[options['bindValue']]}`);
                        break;
                    case 'html':
                        td.innerHTML = field.value.replace(options['bindedReplaceText'], item[options['bindValue']]);
                        td.setAttribute('id', `${field.header.toLowerCase()}-htmlcontent`);
                    break;
                }
                tr.appendChild(td);
            });
            tbody.appendChild(tr);
        });
    }

    function toggleSort(el){
        if (el.dataset.sort == '1'){
            el.dataset.sort = '-1';
            options['sort'] = -1;
        }
        else{
            el.dataset.sort = '1';
            options['sort'] = 1;
        }
    }

    function sortString(key){
        console.log('sorting...');
        sort = parseInt(options['sort'])
        data.sort((a, b) => {
            if (a[`${key}`] > b[`${key}`]) {
            return 1 * sort;
            }
            if (a[`${key}`] < b[`${key}`]) {
            return -1 * sort;
            }
            return 0;
        });
        tbody.innerHTML = '';
        renderBody(data);
    }
    
    function sortNumber(key){
        data.sort((a, b) => {
            if(parseInt(options['sort']) == -1) return b[`${key}`] - a[`${key}`];
            else return a[`${key}`] - b[`${key}`];
        });
        tbody.innerHTML = '';
        renderBody(data);
    }

    function toggleFilter(id){
        el = document.getElementById(`div-filter-${id}`);
        txt = document.getElementById(`input-${id}`);
        
        if(el.style.display == 'block'){
            el.style.display = 'none';
        }
        else{
            el.style.display = 'block';
            txt.focus();
        }
    }



    //Version que esconde las filas 
    function DOMfilter(el){
        filtered = Array.from(document.querySelectorAll(`.${options['tdClass']}`));
        el.addEventListener('keyup', (ev)=>{
            if(ev.key == ';' || ev.key=='Backspace'){
                filtered.map(row=>{
                    valor = el.value.split(';');
                    if (row.dataset.field == el.dataset.id){
                        if (el.value.indexOf('/') != -1){
                            if (row.innerHTML.indexOf(el.value) == -1){
                                row.parentNode.style.display = 'none'
                                // row.parentNode.classList.add('disabled')    
                            }else{
                                row.parentNode.style.display = 'table-row'
                            }
                        }
                        if(!valor.includes(row.innerHTML)){
                            row.parentNode.style.display = 'none';
                            // row.parentNode.classList.add('disabled');
                        }else{
                            row.parentNode.style.display = 'table-row';
                        }
                        if (valor == ''){
                            row.parentNode.style.display = 'table-row';
                            // row.parentNode.classList.remove('disabled');
                        }
                    }
                });
            }
        });
    }

    //Version que recontruye la tabla
    function filter(el){
        el.addEventListener('keyup', (ev)=>{
            if(ev.key == ';'){
                raw = el.value.split(';');
                cmp = raw.filter(itm => itm != '');
                if (cmp.length == 1 && el.value.indexOf('/') != -1){
                    filtered = filtered.filter(row=>{
                        return row[el.dataset.id].indexOf(cmp.toString()) != -1;
                    });
                }else{
                    filtered = data.filter(row=>{
                        if (typeof(row[el.dataset.id]) == 'string'){
                            return cmp.includes(row[el.dataset.id]);
                        }else{
                            return cmp.includes(row[el.dataset.id].toString());
                        }
                    });
                }
                console.log(filtered);
                tbody.innerHTML = '';
                renderBody(filtered);
            }
        });
    }

    function resetFilters(id){
        inputs = document.querySelector(`#input-${id}`)

        inputs.value ='';
        inputs.parentNode.style.display = 'none';
        filtered = data;
        location.reload()
    }
}