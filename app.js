/*
Goals:

    > criar a função que no clique recupera as coisas;
    > recuperar os valores/referencia dos campos;
    > aplicar o conceito de classes para guardar os valores;


*/
// ------------------------------------------------------------

// Criando a classe:
class Despesa{

    constructor(ano, mes, dia, tipo, descricao, valor){
        this.ano = ano
        this.mes = mes
        this.dia = dia
        this.tipo = tipo
        this.descricao = descricao
        this.valor = valor
    }

    // Criar estrutura de validação dos dados do user;
    validaDados(){

        for(let i in this){
            console.log('Validados: ' + this[i])
            if(this[i] == undefined || this[i] == '' || this[i] == null){
                return false
            }
        }
        return true
    }

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
    
    // Validando os dados antes de add no LocalStorage:
    if( despesa.validaDados() ){
        // O if subentende que será executado caso retornar True;
        // Se true, salva dos dados no localStorage e mostra um popup de sucesso;
        
        console.log('Dados validados com sucesso!')
    } else {
        // o else subentende que será executado caso retorne False;
        // Se false, não salva os dados no LocalStorage e mostra um popup de erro;
        console.log('Dados não validados corretamente.')
    }
    



    /* 
    // Zera os campos após criar as despesas
    ano.value = ""
    mes.value = ""
    dia.value = ""
    tipo.value = ""
    descricao.value = ""
    valor.value = ""

     */
})

// ------------------------------------------------------------------
