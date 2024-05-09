class Header extends HTMLElement{
    constructor(){
        super();
    }


    connectedCallback(){
        this.innerHTML = `
        <div id="headerimgs">
        <img src="milkrabbi.png" id="logo">
        <img src="banner.png" id="banner">
        <img src="milkrabbi.png" id="logo">
        </div>
        `;
    }
}
customElements.define('header-component', Header)