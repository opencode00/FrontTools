/**
    <ui-notification color="black" background="yellow" locate="[top* | bottom]">
        <span slot="content">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </span>
    </ui-notification>
 */

    const notiftpl = document.createElement('template');
    notiftpl.innerHTML = `
        <style>
            :host{
                display: block;
            }
            #notification{
                position: absolute;
                width: 90vw;
                margin: 0 auto;
                padding: 15px;
                border-radius: 5px;
                border: 1px solid rgba(0,0,0,0.4);;
                box-shadow: 4px 4px 4px rgba(0,0,0,0.4);
                z-index:1;
                left:0;
                right:0;
            }
            #close_notificacion_button{
                position: absolute;
                right: 5px;
                top: 5px;
                cursor: pointer;
            }
        </style>
        <div id="notification">
            <a id="close_notificacion_button">❌</a> 
            <slot id="notification-message" name="content"></slot>
        </div>`;   
    
    class ui_notification extends HTMLElement{
        constructor(){
            super()
            const content = notiftpl.content.cloneNode(true);//document.importNode(notiftpl, true)
            this.attachShadow({mode: 'open'});
            this.shadowRoot.appendChild(content);
            this.update();
        }   
       
        connectedCallback(){
            this.update();
        }
    
        static get observedAttributes() {
            return ['background', 'color', 'locate'] 
        } 
        
        attributeChangedCallback(name, oldVal, newVal){
            this.update()
        }
    
        update(){
            const not = this.shadowRoot.querySelector('#notification');
            const close = this.shadowRoot.querySelector('#close_notificacion_button');
            close.addEventListener('click', ()=>{
                not.style.display = 'none';
            })
            if (this.getAttribute('locate') == 'bottom')
                not.style.bottom = '10px';
            else
                not.style.top = '10px';
            not.style.backgroundColor = this.getAttribute('background');
            not.style.color = this.getAttribute('color');
        }
    }
    customElements.define('ui-notification', ui_notification);