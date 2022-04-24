
//ARRAYS (global)
var listaAlimentoTotal = [];
var listaAlimentoPessoal = [];
var listaCpf = [];
var cafeDaManha = []; // Pessoas(objeto) e seus atributos(cpf nome alimento)
var editando = false;
 

//FUNÇÕES

function starting(){
    
    // Quando inicializar a pagina, vai preencher o array cafeDaManha com o LocalStorage.
    cafeDaManha = JSON.parse(localStorage.getItem("cafedamanha"));
   
   // Preenchendo os arrays listaCpf e listaAlimentoTotal com todos que ja foram cadastrados no cafeDaManha
   //para que as validações das proximas funções funcionem corretamente 
    if(cafeDaManha !==null){
        if(listaCpf.length ===0){

            for (let index = 0; index < cafeDaManha.length; index++) {
                const element = cafeDaManha[index];
                listaCpf.push(element.cpf);
                listaAlimentoTotal =listaAlimentoTotal.concat(element.alimento);
            }
        }
    }
    // Pegar o parametro da url, caso esteja sendo editado.
    var url_string = window.location.href;
    var url = new URL(url_string);
    var cpf = url.searchParams.get("cpf");
    if (cpf !==null){
        editando = true;
        var table = document.getElementById("table");
        for (let index = 0; index < cafeDaManha.length; index++) {
            const element = cafeDaManha[index];
            //Preenchendo os campos do formulario com os dados do usuario que está sendo editado
            if (element.cpf === cpf) {
                document.getElementById("nome").value = element.nome;
                document.getElementById("cpf").value = element.cpf;
                console.log(element.alimento);
                for (let a = 0; a < element.alimento.length; a++) { 
                    const elemento = element.alimento[a];
                    listaAlimentoPessoal.push(elemento);
                   let row = table.insertRow();
                   let cell = row.insertCell(0);
                  // let cellapagar= row.insertCell();
                   cell.innerHTML = elemento;
                  //cellapagar.innerHTML = "<button id='btnApagar' class='btn btn-secondary'>Apagar</button>";
                  
               }
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
    }else{
        let row = table.insertRow();
        let cell = row.insertCell(0);
        
        cell.innerHTML = alimento.value;
        listaAlimentoTotal.push(alimento.value);
        listaAlimentoPessoal.push(alimento.value);
    }
    
}

function salvar(){
    var nome = document.getElementById("nome");
    var cpf = document.getElementById("cpf");

    if(cafeDaManha ===null){
        cafeDaManha = []
    } 
    if(nome.value =="" || cpf.value =="" || listaAlimentoPessoal.length ===0 ){
        alert("Preencha todos os campos!");
    }else if(editando !== true  && listaCpf.includes(cpf.value)){
        alert("Este cpf ja foi cadastrado")
    }
    else
    {
        var pessoa = { 
            nome:document.getElementById("nome").value,
            cpf:document.getElementById("cpf").value,
            alimento:listaAlimentoPessoal                                 
        };
        if(!editando){
            cafeDaManha.push(pessoa);
            listaCpf.push(cpf.value);
        }else{
            for (let index = 0; index < cafeDaManha.length; index++) {
                const element = cafeDaManha[index];
                if (element.cpf == pessoa.cpf) {
                    element.nome = pessoa.nome;
                    element.alimento = pessoa.alimento;
                }
            }
        
        }
        localStorage.setItem("cafedamanha", JSON.stringify(cafeDaManha));
                 

        window.location.href="index.html";
    }
}

function carregarTabelaPrincipal(){
    var tabelaPrincipal = document.getElementById("tabelaPrincipal");;
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
            celleditar.innerHTML= "<button id='btnED' class = 'btn btn-success' onClick='editar("+element.cpf+")'>Editar</button>";
            
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

function editar(cpf){
    window.location.href="cadastro.html?cpf="+cpf;

}

  