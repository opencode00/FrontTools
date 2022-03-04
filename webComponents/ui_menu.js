/**
    <ui-menu>
        <ul>
            <li>menu item 1</li>
            <ul>
                <li> sumneu item 1</li>
            </ul>
            <li> menu item 2</li>
        </ul>
    </ui-menu>
 */

    const menutpl = document.createElement('template');
    menutpl.innerHTML = `
        <style>

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
    
    class ui_menu extends HTMLElement{
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
    customElements.define('ui-menu', ui_menu);