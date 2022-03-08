/**
    <menu-item>
        <a slot="menu">Menu Item</a>
        <div slot="submenu" style="background-color: white">
            <a>Submenu1 </a><br/>
            <a>Submenu2</a>
        </div> 
    </menu-item>
 */

    const menuItemtpl = document.createElement('template');
    menuItemtpl.innerHTML = `
        <style>
        .disabled{
            display:none;
        }
        #menu-item{
            position: relative;
        }
        #submenu{
            position: absolute;
        }
        </style>

        <span id="menu-item">
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
        }
    
        update(){
            const menu = this.shadowRoot.querySelector('slot#menu');
            menu.addEventListener('click', ()=>{
                this.shadowRoot.querySelector('#submenu').classList.toggle('disabled');
            });

        }
    }
    customElements.define('menu-item', ui_menuItem);