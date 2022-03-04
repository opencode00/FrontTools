/**
    <ui-melement style="font-size: 2em" superior="oc" inferior="drive" color="#ffcb00">
        <span slot="content">(Dr)</span>
    </ui-melement>

    font-size no es necesario, solo a efectos de cambiar el tamaño del widget.
 */

const mathtpl = document.createElement('template');
mathtpl.innerHTML = `
    <style>
        #general{
            display: inline-flex;
        }
        #element{
            font-family: Console;
            color: #ffcb00;
            border: 0.2em solid #ffcb00;
            padding: 0.7em 0.1em;
            width: max-content;
        }
        #content{
            width: max-content;
            float:left;
        }
        #powers{
            display: flex;
            flex-direction: column;
            justify-content: center;
            
        }
        #superior{
            font-size: 0.5em;
        }
        #inferior{
            display: flex;
            font-size: 0.5em;
            min-height: 0.5rem;
            align-items: end;
        }
    </style>
    <div id="general">
        <div id="element">
            <div id="content">
                <slot name="content"></slot>
            </div>
            <div id="powers">
                <div id="superior"></div>
                <div id="inferior"></div>
            </div>
        </div>
    </div>`;

class ui_mElement extends HTMLElement{
    constructor(){
        super()
        const content = mathtpl.content.cloneNode(true);
        this.attachShadow({mode: 'open'});
        this.shadowRoot.appendChild(content);
        this.update();
    }   
   
    connectedCallback(){
        this.update();
    }

    static get observedAttributes() {
        return ['superior','inferior','color']
    } 
    
    attributeChangedCallback(name, oldVal, newVal){
        this.update()
    }

    update(){
        this.shadowRoot.querySelector('#element').style.color = this.getAttribute('color');
        this.shadowRoot.querySelector('#element').style.borderColor = this.getAttribute('color');
        this.shadowRoot.querySelector('#superior').innerHTML = this.getAttribute('superior');
        this.shadowRoot.querySelector('#inferior').innerHTML = this.getAttribute('inferior');
    }
}
customElements.define('ui-melement', ui_mElement);