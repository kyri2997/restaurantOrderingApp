// index.js
import {menuArray} from "/data.js"

function Item (name,price){
    this.name = name
    this.price = price
}

function Order (name){
    this.name = name
    this.orderItemsArr = []
    this.addItem = function (item){
        this.orderItemsArr.push(item)
        console.log(`Added ${item.name} to the order. Total items in order: ${this.orderItemsArr.length}`);
    };
    this.getTotalPrice = function(){
       return this.orderItemsArr.reduce((total, currentItem)=>
            total + currentItem.price,0)
        }
    }


const newOrder = new Order("My Order")

const menuHtml = menuArray.map(function(food, index){
    return `
        <div class="menu-container" id="menu-container-el">
        <img src=${food.image}>
        <div class="item-container" id="item-container-el">
            <h1 class="item-name">${food.name}</h1>
            <h2 class="item-description">${food.ingredients}</h2>
            <p class="item-price">$${food.price}</p>
        </div>
        <button class="add-item" id="addFoodItem${index}-el" data-name="${food.name}" data-price="${food.price}">+</button>
        </div>
    ` 
}).join("")

document.getElementById("section-el").innerHTML = menuHtml

menuArray.forEach((food,index)=>{
    const button = document.getElementById(`addFoodItem${index}-el`)
    button.addEventListener("click", function(){
        const name = button.getAttribute("data-name")
        const price = parseFloat(button.getAttribute("data-price"))
        
        const newItem = new Item(name,price)
        newOrder.addItem(newItem)
        
        renderOrder()
        
    })
    const orderBtn = document.getElementById("order-btn")

})

function renderOrder(){
    const orderHtml = newOrder.orderItemsArr.map(item=>`
<div class="order-item">
            <h2 class="item-name">${item.name}</h2>
            <h3 class="item-price"> $${item.price}</h3>
        </div>`
        ).join("");
        
    document.getElementById("order-section-el").innerHTML= `
    <h1 class="your-order">Your order</h2>
    ${orderHtml}
    <div class="order-item" id="total-price">
        <h3 class="order-item-name">Total price:</h3> 
        <h3 class="item-price">$${newOrder.getTotalPrice()}</h3>
    </div>  
    <div class="complete-order">
        <button class="order-btn">Complete Order</button>
    </div>
    `
}

document.getElementById("order-section-el").addEventListener("click", function(event) {
    if (event.target && event.target.classList.contains("order-btn")) {
        const modal = document.getElementById("modal");
        modal.style.display = "flex"; 
    }
});


const payForm = document.getElementById('pay-form')
const orderSection = document.getElementById('order-section-el')
const modalDiv =document.getElementById("modal-choice-btns") 


payForm.addEventListener('submit', function(e){
    modal.style.display = "none"
    e.preventDefault()
    
    const payFormData = new FormData(payForm)
    const name = payFormData.get('name')
    
    orderSection.innerHTML = `
   <h2 class="thanks">Thanks for your order,&nbsp <span class="modal-display-name"> ${name}</span>. It's on the way!</h2>
    `
    })