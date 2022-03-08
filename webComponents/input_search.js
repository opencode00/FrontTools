/**
    <input-search onkeyup="getData(this)">
        <div id="results" slot="data"></div>
    </input-search>
    .
    .
    <script>
        function getData(el){
            console.log("get data ejecutado")
            const val = el.shadowRoot.querySelector('input').value
            document.querySelector('#results').innerHTML += '<a href="/ubicacion/cancion1">cancion1</a><br>'
        }
    </script>
 **/

const insertpl = document.createElement('template');
insertpl.innerHTML = `
    <style>
        .off{
            display: none
        }

        input{
            position: relative;
            font-size: 1.2rem;
            border: 1px solid #555;
            border-radius: 8px;
            padding: 0.4rem 0.5rem 0.4rem 40px;
            background: white url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' class='bi bi-search' viewBox='0 0 16 16'%3E%3Cpath d='M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z'%3E%3C/path%3E%3C/svg%3E") no-repeat 13px center;
        }
        #results{
            position: absolute;
            background-color: white;
            padding: 4px;
            font-size: 1.2rem;
            border-radius: 6px;
        }
        </style>

    <input id="inputbox" type="search"/>
    <div id="results" class="off">
        <slot name="data"></slot>
    </div>
`

class input_search extends HTMLElement{
    constructor(){
        super()
        if (!this.hasAttribute('width')){
            this.setAttribute('width', '16rem');
        } 
        const content = insertpl.content.cloneNode(true);
        this.attachShadow({mode: 'open'});
        this.shadowRoot.appendChild(content);
        this.update();
    }   
   
    connectedCallback(){
        this.update();
    }

    // static get observedAttributes() {
    //     return ['superior','inferior','color', 'cross']
    // } 
    
    // attributeChangedCallback(name, oldVal, newVal){
    //     this.update()
    // }

    update(){
        const input = this.shadowRoot.querySelector('#inputbox');
        const results = this.shadowRoot.querySelector('#results');
        
        results.style.width = '16rem';

        if(this.getAttribute('width') != 'false'){
            input.style.width = this.getAttribute('width');
            results.style.width = this.getAttribute('width');
        }
        
        input.addEventListener('keyup',()=>{
            const input = this.shadowRoot.querySelector('#inputbox')
            
            if (input.value == ''){
                results.classList.add('off');
                this.shadowRoot.querySelector('#results').innerHTML= '';
            }
            else
                results.classList.remove('off');
        });
    }
}

customElements.define('input-search', input_search);