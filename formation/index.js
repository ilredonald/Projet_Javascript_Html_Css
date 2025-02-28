//console.log("Hello World !");
//const a = 'hello';
//console.log(a);

const H1 = document.querySelector("h1");
const app = document.querySelector("#app");

H1.addEventListener('mouseover', () => {
    app.innerHTML = `
    hay
    `;
});

H1.addEventListener('mouseout', () =>{
    app.innerHTML = `
    clique ici;
    `;
});
