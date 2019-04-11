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

}

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

    console.log(despesa)

    // Zera os campos após criar as despesas
    ano.value = ""
    mes.value = ""
    dia.value = ""
    tipo.value = ""
    descricao.value = ""
    valor.value = ""

})
