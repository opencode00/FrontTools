/**
    <ui-modalbox [dark]>
        <span slot="title" >Titulo</span>
        <div slot="content">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. 
        </div>
    </ui-modalbox>
 */

 const modalboxtpl = document.createElement('template');
 modalboxtpl.innerHTML = `
     <style>
        :host{
            display: inline-block;        
            position: fixed;
            top: 10%;
            bottom: 0;
            left:0;
            right: 0;
            margin: auto;
        }
        
        #modalbox {
            /*width: fit-content;*/
            height: fit-content;
            max-height: 80vh;
            max-width: 90vw;
            box-shadow: 4px 4px 4px rgba(0,0,0,0.4);
        }
        
        #modalbox-title{
            color: #212529;
            background-color: #DDD;
            padding: 1em;
            border: 1px solid rgba(150,150,150, 0.5);
            border-top-left-radius: 8px;
            border-top-right-radius: 8px;
        }	
        
        #modalbox-body{
            color: #212529;
            background-color: #fff;
            padding: 0.7em 1em;
            overflow: auto;
            border: 1px solid rgba(150,150,150, 0.5);
            border-bottom-left-radius: 8px;
            border-bottom-right-radius: 8px;
        }

        .dark #modalbox-title{
            background-color: #212529;
            color: #f8f9fa;
        }	
        
        .dark #modalbox-body {
            color: #f8f9fa;
            background-color: #343a40;
        }
        

        #close_modalbox_button{
            position: absolute;
            right: 1em;
            top: 1em;
            cursor: pointer;
        }
    </style>
    <div id="modalbox">
        <div id="modalbox-title">
            <a id="close_modalbox_button">❌</a>
            <slot name="title"></slot>
        </div>
        <div id="modalbox-body">
            <slot name="content"></slot>
        </div>
    </div>`;
 
 class ui_modalbox extends HTMLElement{
     constructor(){
         super()
         const content = modalboxtpl.content.cloneNode(true);
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
        const modalbox = this.shadowRoot.querySelector('#modalbox');
        const close = this.shadowRoot.querySelector('#close_modalbox_button');
        close.addEventListener('click', ()=>{
            modalbox.style.display = 'none';
        })
        if (this.hasAttribute('dark')){
            this.shadowRoot.querySelector('#modalbox').classList.add('dark')
        }else{
            this.shadowRoot.querySelector('#modalbox').classList.remove('dark');
        } 
     }
 }
 customElements.define('ui-modalbox', ui_modalbox);