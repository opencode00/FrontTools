/**
 *  <ui-card [dark]>
        <span slot="title">Cabecera</span>
        <span slot="content">Contenido Estatico</span>
    </ui-card>

    El metodo setContent(HTMLElement) añade contenido al body de la card dinámicamente
        p = document.querySelector('ui-card')
        div = document.createElement('div');
        p.setContent(div);
 */

 const cardtpl = document.createElement('template');
 cardtpl.innerHTML = `
     <style>
        :host{
            display: inline-block;
        }

        #card {
            width: fit-content;
            box-shadow: 4px 4px 4px rgba(0,0,0,0.4);
            max-width: 90vw;
            max-height: 90vh;
        }
        
        #card-header{
            background-color: #DDD;
            color: #212529;
            padding: 0.9em;
            border: 1px solid rgba(150,150,150, 0.5);
            border-top-left-radius: 8px;
            border-top-right-radius: 8px;
        }	
        
        #card-body{
            background-color: #fff;
            color: #212529;
            overflow: auto;
            padding: 0.7em 1em;
            border: 1px solid rgba(150,150,150, 0.5);
            border-bottom-left-radius: 8px;
            border-bottom-right-radius: 8px;
        }

        .dark #card-header{
            background-color: #212529;
            color: #f8f9fa;
        }
        
        .dark #card-body{
            background-color: #343a40;
            color: #f8f9fa;
        }
     </style>
     <div id="card">
         <div id="card-header">
            <slot name="title"></slot>
         </div>
         <div id="card-body">
             <slot name="content"></slot>
         </div>
     </div>`;   
 
 class ui_card extends HTMLElement{
     constructor(){
         super()
         const content = cardtpl.content.cloneNode(true);
         this.attachShadow({mode: 'open'});
         this.shadowRoot.appendChild(content);
         this.update();
     }   
    
     connectedCallback(){
         this.update();
     }
 
     static get observedAttributes() {
         return ['dark']
     } 
     
     attributeChangedCallback(name, oldVal, newVal){
         this.update()
     }
 
     update(){
        if (this.hasAttribute('dark')){
            this.shadowRoot.querySelector('#card').classList.add('dark')
        }else{
            this.shadowRoot.querySelector('#card').classList.remove('dark');
        } 
     }
     
     setContent(content){
        this.shadowRoot.querySelector('#card-body').appendChild(content);
     }
 }
 customElements.define('ui-card', ui_card);