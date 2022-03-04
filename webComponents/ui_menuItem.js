/**
    <ui-menuItem type="">
        <a slot="menu" >Menu Item name</a>
        <ul slot="submenu">
            <li> submenu item 1</li>
            <li> submenu item 2</li>
        </ul>
    </ui-menuItem>
 */

    const menuItemtpl = document.createElement('template');
    menuItemtpl.innerHTML = `
        <style>
        .disabled{
            display:none;
        }
        .element{
            display: inline;
            position: relative;
        }
        #submenu{
            position: absolute;
        }
        #submenu-item > ul > li {
            background-color: yellow;
            margin: 0;
            list-style: none;
        }
        </style>
        
        <div class="element">
            <slot id="menu" name="menu"></slot>
            <div id="submenu">
                <slot id="submenu_item" name="submenu"></slot>
            </div>
        </div>
        `;
    
    class ui_menuItem extends HTMLElement{
        constructor(){
            super()
            const content = menuItemtpl.content.cloneNode(true);
            this.attachShadow({mode: 'open'});
            this.shadowRoot.appendChild(content);
            this.update();
        }   
       
        connectedCallback(){
            this.shadowRoot.querySelector('#submenu').classList.add('disabled');
            // this.update();
        }
    
        // static get observedAttributes() {
        //     // return ['superior','inferior','color']
        // } 
        
        // attributeChangedCallback(name, oldVal, newVal){
        //     this.update()
        // }
    
        update(){
            const menu = this.shadowRoot.querySelector('slot#menu');
            menu.addEventListener('click', ()=>{
                console.log('ok')
                this.shadowRoot.querySelector('#submenu').classList.toggle('disabled');
            });

        }
    }
    customElements.define('menu-item', ui_menuItem);