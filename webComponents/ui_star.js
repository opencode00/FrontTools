/**
    <ui-star [selected]><ui-star>
    selected: Especifica si la estrella se ve vacia o llena. Por defecto vacia.
 */

 const startpl = document.createElement('template');
 startpl.innerHTML = `
    <style>
        #id_star{
            color: yellow;
        }
    </style>
    <span id="id_star"></span> 
 `
 //&#x2605;
 
 class ui_star extends HTMLElement{
     constructor(){
         super()
         const content = startpl.content.cloneNode(true);
         this.attachShadow({mode: 'open'});
         this.shadowRoot.appendChild(content);
         this.update();
     }   
    
     connectedCallback(){
        this.update();
     }
 
     static get observedAttributes() {
         return ['selected']
     } 
     
     attributeChangedCallback(name, oldVal, newVal){
         this.update()
     }
 
     update(){
        if(this.hasAttribute('selected')){
            this.shadowRoot.querySelector('#id_star').innerHTML = "&#x2605;";
        }else{
            this.shadowRoot.querySelector('#id_star').innerHTML = "&#x2606;";
        }
     }

 }
 customElements.define('ui-star', ui_star);