window.onload = () => {
    "use strict";   
    if("serviceWorker" in navigator){
        navigator.serviceWorker.register("./sw.js");
    }
};

let posicaoInicial;
const capturarLocalizacao = document.getElementById('localizacao');
const latitude = document.getElementById('latitude');
const longitude = document.getElementById('longitude');
const map = document.getElementById('mapa');

const sucesso = (posicao) => {
    posicaoInicial = posicao;
    latitude.innerHTML = posicaoInicial.coords.latitude;
    longitude.innerHTML = posicaoInicial.coords.longitude;
};

const erro = (error) => {
    let errorMessage;
    switch(error.code){
        case 0:
            errorMessage = "Erro desconhecido"
        break;
        case 1:
            errorMessage = "Permissão negada!"
        break;
        case 2:
            errorMessage = "Captura de posição indisponível!"
        break;
        case 3:
            errorMessage = "Tempo de solicitação excedido!" 
        break;
    }
    console.log('Ocorreu um erro: ' + errorMessage);
};

capturarLocalizacao.addEventListener('click', () => {
    navigator.geolocation.getCurrentPosition(sucesso, erro);

    map.src = "https://maps.google.com/maps?q="+ posicaoInicial.coords.latitude+ "," + posicaoInicial.coords.longitude +"&z=16&output=embed"

});

// async function ProdutosAPI(){
//     const response = await fetch("https://projetofinalteste.lucasgodoy04.repl.co/produtos_api")
//     const data = await response.json();
//     const apiList = document.getElementById("apiList")
 
//     console.log(data)
 
//     data.map((produto) => {
//      apiList.innerHTML += 
//     `
//     <div id="produtos">
//      <h2>${produto.nome}</h2>
//      <h2>R$ ${produto.preco}</h2>
//      <h3>${produto.descricao}</h3>
//      <br/> <img id="img" width="300px" src=${produto.codigo}></img>
//     </div>
//      `
//     })
// }

async function postNews() {
    const res = await fetch(url);
    const data = await res.json();
    main.innerHTML = data.map(createArticle).join('\n');
}

let url = "https://bd-produtos-react-app.cyclic.app";
const main = document.querySelector('main');

function createArticle(article){
    return `
           <div class="article">
                <a target="_blank">
                    <img src="${article.titulo}" class="image" alt="${article.img}"/>
                    <h2>${article.preco}</h2>
                </a>
           </div>
    `
}
