// ------------------------------------------------------------
// Criando a classe:
class Expense{

    constructor(year, month, day, type, description, value){
        this.year = year
        this.month = month
        this.day = day
        this.type = type
        this.description = description
        this.value = value
    }

    // Criar estrutura de validação dos dados do user;
    dataValidate(){

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
class Db{
    constructor(){
        let id = localStorage.getItem('id')

        if(id === null){
            localStorage.setItem('id', 0)
        }
    }
    getNextId(){
        let next_id = localStorage.getItem('id')
        return parseInt(next_id) + 1
    }

    storageWrite(d){
        
        let id = this.getNextId()
        localStorage.setItem(id, JSON.stringify(d))
        localStorage.setItem('id', id)
    }

    fetchRegisters(){
        // array de objetos:
        let expenses = new Array()

        // quantia de ids para recuperar
        let id = localStorage.getItem('id')
        
        for(let i = 1; i <= id; i++){
            //recupera a despesa:
            let expense = JSON.parse(localStorage.getItem(i))
            // verificar itens removidos:
            if(expense === null){
                continue //continua o loop pulando a iteração em questão;
            }
            // adicionando um id aos objetos para identificar depois:
            expense.id = i
            // push do obj na array:
            expenses.push(expense)
        }
        // retorna a array de objetos:
        return expenses
    }

    // Método para recuperar dados do user na pesquisa dele:
    search(expense){

        let filteredExpenses = Array()
        filteredExpenses = this.fetchRegisters()

        // Os filters só passarao se os campos forem diferentes de zero, e se iguais ao resultado do localStorage, caso não, o filter é pulado e não passa no condicional
        if(expense.year != ''){  
            filteredExpenses = filteredExpenses.filter((d) =>{
                return d.year == expense.year
            })
        }

        if(expense.month != ''){
            filteredExpenses = filteredExpenses.filter((d) =>{
                return d.month == expense.month
            })
        }

        if(expense.day != ''){
            filteredExpenses = filteredExpenses.filter((d) =>{
                return d.day == expense.day
            })
        }

        if(expense.type != ''){
            filteredExpenses = filteredExpenses.filter((d) =>{
                return d.type == expense.type
            })
        }

        if(expense.description != ''){
            filteredExpenses = filteredExpenses.filter((d) =>{
                return d.description == expense.description
            })
        }

        if(expense.value != ''){
            filteredExpenses = filteredExpenses.filter((d) =>{
                return d.value == expense.value
            })
        }

        return filteredExpenses

    }

    itemRemove(id){
        localStorage.removeItem(id)
    }

}

let db = new Db()

// ------------------------------------------------------------------
// Função em si:
let register = function(){

    let year = document.getElementById('year')
    let month = document.getElementById('month')
    let day = document.getElementById('day')
    let type = document.getElementById('type')
    let description = document.getElementById('description')
    let value = document.getElementById('value')

    let expense = new Expense(
        year.value,
        month.value,
        day.value,
        type.value,
        description.value,
        value.value,
    )
    
    // Validando os dados antes de add no LocalStorage e modificando o toast dinamicamente:
    if( expense.dataValidate() ){
        // Se true, salva dos dados no localStorage e mostra um toast de sucesso;
        db.storageWrite(expense)
        M.toast({html: 'Your expense was succefully registered', classes: 'light-green darken-4'})

        // Zera os campos após criar as despesas
        year.value = ''
        month.value = ''
        day.value = ''
        type.value = ''
        description.value = ''
        value.value = ''

    } else {
        M.toast({html: 'Some fields need to be filled in order to complete the register!', classes: 'red darken-4'})
    }
}
// ------------------------------------------------------------------
// Função que carrega a lista de itens ao carregar a consulta.html:
let loadRegisters = function(expenses = Array(), filter = false){

    if(expenses.length == 0 && filter == false){
        // Recuperando os valores da array 'despesas'
        expenses = db.fetchRegisters()
    }

    // referenciando a table body do html:
    let expenses_list = document.getElementById('expenses_list')
    expenses_list.innerHTML = ''

    // Iterando sobre os itens salvos e escrevendo nas tables:
    // d é cada 'fatia' que o callback da função retorna.
    expenses.forEach(function(d){ 

        // ajustando o d.type, que com valor number:
        switch(parseInt(d.type)){

            case 1: d.type = 'Food'
                break;
            case 2: d.type = 'Education'
                break;
            case 3: d.type = 'Leisure'
                break;
            case 4: d.type = 'Heath'
                break;
            case 5: d.type = 'Transport'
                break

        }
        // console.log(d.type)

        // Inserindo os valores nas tables:
        let line = expenses_list.insertRow()
        line.insertCell(0).innerHTML = `${d.day}/${d.month}/${d.year} `
        line.insertCell(1).innerHTML = d.type
        line.insertCell(2).innerHTML = d.description
        line.insertCell(3).innerHTML = `$ ${d.value}`

        // Botão para deletar despesa
        let btn = document.createElement('button') // criar o button
        btn.className = 'btn red darken-4' // add uma class
        btn.innerHTML = '<i class="fas fa-times"></i>'
        btn.style.borderRadius = '12px'
        btn.id = `_button_id_${d.id}`
        btn.onclick = function(){
            let id = this.id.replace('_button_id_', '')

            db.itemRemove(id)
            window.location.reload()
        }
        line.insertCell(4).append(btn) // insere ele na tbody

        // Adicionando o total gasto:
        let total_spent = document.getElementById('total_spend')
        
        //itera sobre os valores 'value' de expenses 
        let mappedSpent = expenses.map((item) => {
            return parseFloat(item.value)
        })

        // Soma os valores da array produza pelo map
        let sumSpent = mappedSpent.reduce((a,b) => a + b)

        total_spent.innerHTML = `$ ${sumSpent.toFixed(2)}`
    })
}
// ------------------------------------------------------------------
// Lógica para filtrar itens:
let searchRegisters = function(){

    // Recuperando os valores dos campos:
    let year = document.getElementById('year').value
    let month = document.getElementById('month').value
    let day = document.getElementById('day').value
    let type = document.getElementById('type').value
    let description = document.getElementById('description').value
    let value = document.getElementById('value').value

    let expense = new Expense(year, month, day, type, description, value)

    let expenses = db.search(expense)

    loadRegisters(expenses, true)
}

// ------------------------------------------------------------------
//jQuery:
// for sidenav-mobile:
$(document).ready(function(){
    $('.sidenav').sidenav();
});
//for selects:
$(document).ready(function(){
    $('select').formSelect();
});
// Cleave.js:
new Cleave('#value', {
    numeral: true,
    numeralDecimalMark: '.',
    delimiter: ''
})