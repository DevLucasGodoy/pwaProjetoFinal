window.onload = () => {
    "use strict";   
    if("serviceWorker" in navigator){
        navigator.serviceWorker.register("./sw.js");
    }
};

let posicaoInicial;//variavel para capturar a posicao
const capturarLocalizacao = document.getElementById('localizacao');
const latitude = document.getElementById('latitude');
const longitude = document.getElementById('longitude');
const map = document.getElementById('mapa');

const sucesso = (posicao) => {//callback de sucesso para captura da posicao
    posicaoInicial = posicao;
    latitude.innerHTML = posicaoInicial.coords.latitude;
    longitude.innerHTML = posicaoInicial.coords.longitude;
};

const erro = (error) => {//callback de error (falha para captura de localizacao)
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

    map.src = "http://maps.google.com/maps?q="+ posicaoInicial.coords.latitude+"," + posicaoInicial.coords.longitude +"&z=16&output=embed"+"," 

});

async function ProdutosAPI(){
    const response = await fetch("https://projetofinalteste.lucasgodoy04.repl.co/produtos_api")
    const data = await response.json();
    const apiList = document.getElementById("apiList")
 
    console.log(data)
 
    data.map((produto) => {
     apiList.innerHTML += 
    `
    <div id="produtos">
     <h2>${produto.nome}</h2>
     <h2>R$ ${produto.preco},00</h2>
     <h3>${produto.descricao}</h3>
     <br/> <img id="img" width="300px" src=${produto.codigo}></img>
    </div>
     `
    })
 }