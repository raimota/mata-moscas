/*Declarações
***********************************************************/
let height = 0;
let width = 0;
let heart = 1;
let time = 60;//segundos

let createGnatTime = 1500;

let level = window.location.search;
level = level.replace('?', '');

if(level === 'normal'){
    //1s e meio
    createGnatTime = 1500;
}else{
    if(level === 'hard'){
        //1s
        createGnatTime = 1000;
    }else{
        //1/4 de segundos - 750
        createGnatTime = 750;
    }
}

/*Funções
**********************************************************/

function resizeStage(){
    height = window.innerHeight;
    width = window.innerWidth;
    //console.log('height: ' + height, 'width: ' + width);
}

function randomPos(){
    //remover o mosquito
    if(document.getElementById('gnat')){
        document.getElementById('gnat').remove();

        if(heart > 3){
            window.location.href='gameOver.html';
        }else{
            document.getElementById('heart' + heart).src="imagens/coracao_vazio.png";
            heart++;
        }        
    }

    //gerar posições aleatorias p/ o mosquito
    let posX = parseInt(Math.random() * width) - 90;
    let posY = parseInt(Math.random() * height) - 90;
    console.log(posX, posY);

    //controle do mosquito para ele não ficar fora da tela
    posX = (posX < 0)? 0 : posX; 
    posY = (posY < 0)? 0 : posY; 

    //Criar o elemento html(gnat)
    gnat = document.createElement('img');
    gnat.src = 'imagens/mosca.png';
    gnat.className = randomSize()+ ' ' + randomSide();

    gnat.style.left = posX + 'px';
    gnat.style.top = posY + 'px';
    gnat.style.position = 'absolute';
    gnat.id = 'gnat';
    gnat.onclick = function(){
        this.remove();
    };

    document.body.appendChild(gnat);

    randomSide();
}

function randomSize(){
    let classe = parseInt(Math.random()*3);

    switch(classe){
        case 0:
            return 'gnat1';
        case 1:
            return 'gnat2';
        case 2:
            return 'gnat3';
    }
}

function randomSide(){
    let classe = parseInt(Math.random()*2);

    switch(classe){
        case 0:
            return 'sideA';
        case 1:
            return 'sideB';       
    }
}

//Chamada Eventos
resizeStage();

let stopWatch = setInterval(function(){    
    time--;

    if(time < 0){        
        clearInterval(stopWatch);
        clearInterval(createGnat);        
        window.location.href='victory.html';
    }else{
        document.getElementById('stopWatch').innerHTML = time;
    }    
}, 1000);

document.getElementById('stopWatch').innerHTML = time;


let createGnat= setInterval(function(){randomPos();}, createGnatTime);



