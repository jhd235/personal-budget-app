/*
Goals:

    > criar a função que no clique recupera as coisas;
    > recuperar os valores/referencia dos campos;
    > aplicar o conceito de classes para guardar os valores;


*/
// ------------------------------------------------------------

// Criando a classe:
class Despesa{

    constructor(id, ano, mes, dia, tipo, descricao, valor){
        this.id = id
        this.ano = ano
        this.mes = mes
        this.dia = dia
        this.tipo = tipo
        this.descricao = descricao
        this.valor = valor
    }

    // Criar estrutura de validação dos dados do user;

}
// ------------------------------------------------------------------
class Bd{

    constructor(){
        let id = localStorage.getItem('id')
        if(id === null){
            localStorage.setItem('id', 0)
        }
    }

    getProxId(){
        let prox_id = localStorage.getItem('id')
        return parseInt(prox_id) + 1
    }

    gravaStorage(d){
        
        let id = this.getProxId()
        localStorage.setItem(id, JSON.stringify(d))

        localStorage.setItem('id', id)
    }

}

let bd = new Bd()

// ------------------------------------------------------------------
// Event Listener para executar eventos onClick:
let btn_cad = document.getElementById('btn_cad');
btn_cad.addEventListener('click', function(){

    let ano = document.getElementById('ano')
    let mes = document.getElementById('mes')
    let dia = document.getElementById('dia')
    let tipo = document.getElementById('tipo')
    let descricao = document.getElementById('descricao')
    let valor = document.getElementById('valor')

    let despesa = new Despesa(
        ano.value,
        mes.value,
        dia.value,
        tipo.value,
        descricao.value,
        valor.value,
    )

    // console.log(despesa)
    
    bd.gravaStorage(despesa)

    // Zera os campos após criar as despesas
    ano.value = ""
    mes.value = ""
    dia.value = ""
    tipo.value = ""
    descricao.value = ""
    valor.value = ""

})

// ------------------------------------------------------------------
