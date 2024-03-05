import {serviceArray} from '/data.js'

const washBtn = document.getElementById('wash-btn')
const mowBtn = document.getElementById('mow-btn')
const pullBtn = document.getElementById('pull-btn')
const cart = document.getElementById('cart')
const invoiceBtn = document.getElementById('invoice-btn')
const cartEl = document.getElementById('cart')
const acceptEl = document.getElementById('accept')
const totalEl = document.getElementById('total')
totalEl.classList.add('default');

let cartArray =[]

invoiceBtn.addEventListener('click' , function(){
    if(cartArray.length >0){

    }
})

document.addEventListener('click', e =>{

    if (e.target.dataset.remove) {
        handleRemoveBtn(e.target.dataset.remove)
    }
    if(e.target.dataset.add){
handleAddTaskBtnToCart(e.target.dataset.add)
    }
    if(e.target === invoiceBtn){
        handleInvoiceBtn()
    }

})

//handle

function handleAddTaskBtnToCart(taskId){
   const cartTask = serviceArray.filter(task => {
    return task.id === parseInt(taskId)
   })[0]
   const taskExists = cartArray.some(task => task.id ===parseInt(taskId) );
   if(!taskExists){
    cartArray.push(cartTask)
    render()
   }
}

function handleRemoveBtn(taskId){
cartArray.splice(taskId, 1)
if(cartArray.length<1){
cart.classList.add('hidden')
acceptEl.classList.add('hidden')
    totalEl.innerHTML = `$<span id="total">${getCartTotal()}</span>` 
    render()
}else{
    render()
}
}

function handleInvoiceBtn(){
    if(cartArray.length>0){

         cartArray = []
         console.log('fired')
         cartEl.classList.add('hidden')
         acceptEl.classList.add('hidden')
         totalEl.innerHTML = `0`
         
    }
    
}

//render

function renderTasks(){
    document.getElementById('container-cart').innerHTML = getTasks()
}

function renderCartTasks(){

    cartEl.innerHTML=''
    totalEl.innerHTML = `0`
    
    if(cartArray.length > 0){
    cartEl.innerHTML = getCartTasks()
    cartEl.classList.remove('hidden')
    acceptEl.classList.remove('hidden')
    totalEl.classList.add('plus')
    totalEl.innerHTML = getCartTotal()
 
}
}


function render(){
    renderCartTasks()
    renderTasks()
}

//get

function getCartTasks(){
    if(cartArray.length>0){
        let cartTasks = ''
        let total =0
        cartArray.forEach((task, index) =>{
cartTasks +=`
     <div class="cart">
     <div class="task-between">
     <div class="right-between">
         <p>${task.name}</p>
         <button class="remove-item-btn" data-remove="${index}">remove</button>
         </div>
         <p><span>$</span>${task.price}</p>
         </div>
</div>
`
        })
        return cartTasks
    }
}

function getTasks(){

    let cartTasks = ''
    serviceArray.forEach( task =>{
        cartTasks +=`
        <div class="options">
<button id="wash-btn" class="wash-el" data-add="${task.id}">${task.name}: $${task.price}</button>
</div>
        `
    })
    return cartTasks
}

function getCartTotal(){
    let total = 0
    cartArray.forEach(task =>{
        total += task.price
    })
    return total 

}

render()
