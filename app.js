/*
Goals:
    > criar a função que no clique recupera as coisas;
    > recuperar os valores/referencia dos campos;
    > aplicar o conceito de classes para guardar os valores;
    > Modificar método 'onclick' no html por algo no proprio js, tipo usar um condicional para ver se caso retornar 'null', dar um continue, caso não, busca pelo botão.
    > Adicionar uma página com indicadores e/ou gráficos;
    > Adicionar alguns modais para confirmar exclusão de despesas
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
        // array de objetos:
        let despesas = new Array()

        // quantia de ids para recuperar
        let id = localStorage.getItem('id')
        
        for(let i = 1; i <= id; i++){
            //recupera a despesa:
            let despesa = JSON.parse(localStorage.getItem(i))

            // verificar itens removidos:
            if(despesa === null){

                continue //continua o loop pulando a iteração em questão;
            }

            // adicionando um id aos objetos para identificar depois:
            despesa.id = i

            // push do obj na array:
            despesas.push(despesa)

        }

        // retorna a array de objetos:
        return despesas
    }

    // Método para recuperar dados do user na pesquisa dele:
    pesquisar(despesa){

        let despesasFiltradas = Array()
        despesasFiltradas = this.recuperaRegistros()

        // Os filters só passarao se os campos forem diferentes de zero, e se iguais ao resultado do localStorage, caso não, o filter é pulado e não passa no condicional
        if(despesa.ano != ''){  
            despesasFiltradas = despesasFiltradas.filter((d) =>{
                return d.ano == despesa.ano
            })
        }

        if(despesa.mes != ''){
            despesasFiltradas = despesasFiltradas.filter((d) =>{
                return d.mes == despesa.mes
            })
        }

        if(despesa.dia != ''){
            despesasFiltradas = despesasFiltradas.filter((d) =>{
                return d.dia == despesa.dia
            })
        }

        if(despesa.tipo != ''){
            despesasFiltradas = despesasFiltradas.filter((d) =>{
                return d.tipo == despesa.tipo
            })
        }

        if(despesa.descricao != ''){
            despesasFiltradas = despesasFiltradas.filter((d) =>{
                return d.descricao == despesa.descricao
            })
        }

        if(despesa.valor != ''){
            despesasFiltradas = despesasFiltradas.filter((d) =>{
                return d.valor == despesa.valor
            })
        }

        return despesasFiltradas

    }

    removerItem(id){
        localStorage.removeItem(id)
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
        ano.value = ''
        mes.value = ''
        dia.value = ''
        tipo.value = ''
        descricao.value = ''
        valor.value = ''

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
let carregaRegistros = function(despesas = Array(), filtro = false){

    if(despesas.length == 0 && filtro == false){
        // Recuperando os valores da array 'despesas'
        despesas = bd.recuperaRegistros()
    }

    // referenciando a table body do html:
    let lista_despesas = document.getElementById('lista_despesas')
    lista_despesas.innerHTML = ''

    // Iterando sobre os itens salvos e escrevendo nas tables:
    // d é cada 'fatia' que o callback da função retorna.
    despesas.forEach(function(d){ 

        // console.log(d.tipo)
        // ajustando o d.tipo, que com valor number:
        switch(parseInt(d.tipo)){

            case 1: d.tipo = 'Alimentação'
                break;
            case 2: d.tipo = 'Educação'
                break;
            case 3: d.tipo = 'Lazer'
                break;
            case 4: d.tipo = 'Saúde'
                break;
            case 5: d.tipo = 'Transporte'
                break

        }
        // console.log(d.tipo)

        // Inserindo os valores nas tables:
        let linha = lista_despesas.insertRow()
        linha.insertCell(0).innerHTML = `${d.dia}/${d.mes}/${d.ano} `
        linha.insertCell(1).innerHTML = d.tipo
        linha.insertCell(2).innerHTML = d.descricao
        linha.insertCell(3).innerHTML = d.valor

        // Botão para deletar despesa
        let btn = document.createElement('button') // criar o button
        btn.className = 'btn btn-danger' // add uma class
        btn.innerHTML = '<i class="fas fa-times"></i>'
        btn.style.borderRadius = '12px'
        btn.id = `_botao_id_${d.id}`
        btn.onclick = function(){
            let id = this.id.replace('_botao_id_', '')
            // alert(id)

            bd.removerItem(id)
            window.location.reload()
        }
        linha.insertCell(4).append(btn) // insere ele na tbody

        // console.log(d)

    })

/*  
    // aguardando resposta do prof se isto está ok tbm:
    let despesas = bd.recuperaRegistros() 
    console.log(despesas)
 */
}
// ------------------------------------------------------------------
// Lógica para filtrar itens:
let pesquisarRegistros = function(){

    // Recuperando os valores dos campos:
    let ano = document.getElementById('ano').value
    let mes = document.getElementById('mes').value
    let dia = document.getElementById('dia').value
    let tipo = document.getElementById('tipo').value
    let descricao = document.getElementById('descricao').value
    let valor = document.getElementById('valor').value

    let despesa = new Despesa(ano, mes, dia, tipo, descricao, valor)

    let despesas = bd.pesquisar(despesa)

    carregaRegistros(despesas, true)

}