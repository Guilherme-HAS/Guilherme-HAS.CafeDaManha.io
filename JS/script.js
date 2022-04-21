
//ARRAYS (global)
var listaAlimentoTotal = [];
var listaAlimentoPessoal = [];
var listaCpf = [];
var cafeDaManha = []; // Pessoas(objeto) e seus atributos(cpf nome alimento)
 

//FUNÇÕES

function starting(){

    cafeDaManha = JSON.parse(localStorage.getItem("cafedamanha"));
    if(cafeDaManha !==null){
        if(listaCpf.length ===0){

            for (let index = 0; index < cafeDaManha.length; index++) {
                const element = cafeDaManha[index];
                listaCpf.push(element.cpf);
            }
        }
    }

}

function adicionarAlimento(){
    
    var cpf = document.getElementById("cpf");
    var alimento = document.getElementById("alimento");
    var table = document.getElementById("table");
    
    //Condição (para adicionar alimento)
    
    if (alimento.value =="") {
        alert("Informe o nome do alimento");
    }else if(listaAlimentoTotal.includes(alimento.value)){
        alert("Este alimento ja foi escolhido");
    }else if(listaCpf.includes(cpf.value)){
        alert("Este cpf ja foi cadastrado")
    }else{
        let row = table.insertRow();
        let cell = row.insertCell(0);
        
        cell.innerHTML = alimento.value;
        listaAlimentoTotal.push(alimento.value);
        listaAlimentoPessoal.push(alimento.value);
    }
    
}

function salvar(){
    if(cafeDaManha ===null){
        cafeDaManha = []
    }
    if(listaAlimentoPessoal.length > 0){
        var pessoa = { 
        nome:document.getElementById("nome").value,
        cpf:document.getElementById("cpf").value,
        alimento:listaAlimentoPessoal                                
        };
        cafeDaManha.push(pessoa);
   
        localStorage.setItem("cafedamanha", JSON.stringify(cafeDaManha));
        listaCpf.push(cpf.value);
    }

    listaAlimentoPessoal = [];         
    
    window.location.href="index.html";
}

function carregarTabelaPrincipal(){
    var tabelaPrincipal = document.getElementById("tabelaPrincipal");
    console.log(cafeDaManha);
    if (cafeDaManha !== null) {
        for (let index = 0; index < cafeDaManha.length; index++) {
            const element = cafeDaManha[index];
            var row = tabelaPrincipal.insertRow();
            var cellnome = row.insertCell(0);
            var cellcpf= row.insertCell(1);
            var cellalimento= row.insertCell(2);
            var cellexcluir= row.insertCell(3)
            var celleditar=row.insertCell(4);
            var alimentos = "";
         
            cellnome.innerHTML = element.nome;
            cellcpf.innerHTML = element.cpf;
        
            cellexcluir.innerHTML= "<button id='btnEX' class='btn btn-danger' onClick='deletar("+element.cpf+")'>Excluir</button>";
            celleditar.innerHTML= "<button id='btnED' class = 'btn btn-success'>Editar</button>";
            
            for (let x = 0; x < element.alimento.length; x++) {
                const elemento = element.alimento[x];
                alimentos +=   elemento +"/" ;
                
            }
            cellalimento.innerHTML =  alimentos ;

            
        }
        
    }
}

function deletar(cpf){

    var copiacafeDaManha = [];
    for (let index = 0; index < cafeDaManha.length; index++) {
        const element = cafeDaManha[index];
        if (element.cpf !==cpf.toString()) {
            copiacafeDaManha.push(element);   
        }
    }
    localStorage.setItem("cafedamanha", JSON.stringify(copiacafeDaManha));
    window.location.reload();
}


  