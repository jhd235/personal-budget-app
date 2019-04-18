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
            // console.log('Validados: ' + this[i])
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

    recuperaRegistros(){

        console.log('Estamos recuperando, peraê vey.')
    }

}

let bd = new Bd()

// ------------------------------------------------------------------
// Função em si:
let cadastrar = function(){

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
    
    // Validando os dados antes de add no LocalStorage e modificando o modal dinamicamente:
    let modal_label = document.getElementById('modal_label')
    let modal_body = document.getElementById('modal_body')
    let modal_header = document.getElementById('modal_header')
    let modal_button = document.getElementById('btn_modal')

    if( despesa.validaDados() ){
        // Se true, salva dos dados no localStorage e mostra um popup de sucesso;
        modal_header.className = 'modal-header text-success'
        modal_button.className = 'btn btn-success'
        modal_label.innerHTML = 'Despesa Cadastrada!'
        modal_body.innerHTML = 'Sua despesa foi cadastrada com sucesso!'
        modal_button.innerHTML = 'Fechar'

        bd.gravaStorage(despesa)
        $('#registerDialog').modal('show') //jQuery popup sucesso

        // Zera os campos após criar as despesas
        ano.value = ""
        mes.value = ""
        dia.value = ""
        tipo.value = ""
        descricao.value = ""
        valor.value = ""

    } else {
        // Se false, não salva os dados no LocalStorage e mostra um popup de erro;
        modal_header.className = 'modal-header text-danger'
        modal_button.className = 'btn btn-danger'
        modal_label.innerHTML = 'Opa, algo deu errado!'
        modal_body.innerHTML = 'Algum campo necessita ser preenchido para completar o cadastro!'
        modal_button.innerHTML = 'Voltar e corrigir'

        $('#registerDialog').modal('show') //jQuery popup erro
    }

}
// ------------------------------------------------------------------
// Função que carrega a lista de itens ao carregar a consulta.html:
let carregaRegistros = function(){

    bd.recuperaRegistros()
}