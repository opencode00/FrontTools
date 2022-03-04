/**
 *   <ui-celement superior="oc" inferior="drive" color="#ffcb00" style="font-size:1em" cross="false">
 *      <span slot="content">(Dr)</span>
 *   </ui-celement>
 *
 *   font-size: es para cambiar el tamaño del widget
 *   cross: solo cambia el lado del número atómico de arriba
 **/

const chemtpl = document.createElement('template');
chemtpl.innerHTML = `
    <style>
        #element{
            font-family: Console;
            color: #ffcb00;
            width: 6em;
            border: 0.4em solid #ffcb00;
        }
        #content{
            font-size: 3em; 
            line-height: 1.1em;
        }
        .atomic{
            font-size: 0.7em;
            margin-right: 2px;
            padding: 2px;
        }
        #superior{
            margin-bottom: -5px;
        }
        #inferior{
            text-align: right;
        }
    </style>
    <div id="element">
        <div class="atomic" id="superior"></div>
        <div id="content">
            <slot name="content" ></slot>
        </div>
        <div class="atomic" id="inferior"></div>
    </div>`;

class ui_cElement extends HTMLElement{
    constructor(){
        super()
        if (!this.hasAttribute('cross')) this.setAttribute('cross', false);
        const content = chemtpl.content.cloneNode(true);
        this.attachShadow({mode: 'open'});
        this.shadowRoot.appendChild(content);
        this.update();
    }   
   
    connectedCallback(){
        this.update();
    }

    static get observedAttributes() {
        return ['superior','inferior','color', 'cross']
    } 
    
    attributeChangedCallback(name, oldVal, newVal){
        this.update()
    }

    update(){
        if(this.getAttribute('cross') == 'false')
            this.shadowRoot.querySelector('#superior').style.textAlign = 'right';
        else
            this.shadowRoot.querySelector('#superior').style.textAlign = 'left';
        this.shadowRoot.querySelector('#element').style.color = this.getAttribute('color');
        this.shadowRoot.querySelector('#element').style.borderColor = this.getAttribute('color');
        this.shadowRoot.querySelector('#superior').innerHTML = this.getAttribute('superior');
        this.shadowRoot.querySelector('#inferior').innerHTML = this.getAttribute('inferior');
    }
}
customElements.define('ui-celement', ui_cElement);