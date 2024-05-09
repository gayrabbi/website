class Links extends HTMLElement{
    constructor(){
        super();
    }


    connectedCallback(){
        this.innerHTML = `
    <div id="links">
        <a href="index.html">home</a>
        <a href="blog.html">blog</a>
        <a href="https://twitter.com/Rabbi_Melon">twitter</a>
        <a href="https://github.com/RabbiMelonMilkman">github</a>
    </div>
        `;
    }
}
customElements.define('link-component', Links)