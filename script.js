const checkVector = [1,2,3,4,5,6,7,1];

function addCheckDigit(barcode){
    let total = 0;
    for(let i = 0; i < barcode.length; i++){
        total += Number(barcode.charAt(i)) * checkVector[i];    
    }
    let checkDigit = 10 - (total%10);
    if (checkDigit == 10){
        checkDigit = 0;
    }
    return barcode + checkDigit.toString();
}

const foodItems = [
    {
        barcode: '10000116',
        name: 'Oreos',
        price: 5.99,
        cateogory: 'Food'
    }
];
function createFoodBarcode(item){
    let barcode = "1";
    barcode += foodItems.length.toString() + "0";
    while(barcode.length != 7){
        barcode += Math.floor(Math.random() * 10).toString()
        
    }
    barcode = addCheckDigit(barcode);
    foodItems[foodItems.length] = {
        barcode: barcode,
        name: item.name,
        price: item.price,
        cateogory: 'Food'
    }
    return barcode;
}



const drinkItems = [];
function createDrinkBarcode(item){
    let barcode = "2";
    barcode += drinkItems.length.toString()+"0";
    while(barcode.length != 7){
        barcode += Math.floor(Math.random() * 10).toString()
        
    }
    barcode = addCheckDigit(barcode);
    drinkItems[drinkItems.length] = {
        barcode: barcode,
        name: item.name,
        price: item.price,
        cateogory: 'Drink'
    }
    return barcode;
}
const miscItems = [];
function createMiscBarcode(item){
    let barcode = "3";
    barcode += miscItems.length.toString()+"0";
    while(barcode.length != 7){
        barcode += Math.floor(Math.random() * 10).toString()
        
    }
    barcode = addCheckDigit(barcode);
    miscItems[miscItems.length] = {
        barcode: barcode,
        name: item.name,
        price: item.price,
        category: 'Misc'
    }
    return barcode;
}
function codabar(barcode){
    let total = 0;
    for(let i = 0; i < barcode.length; i++){
        total += Number(barcode.charAt(i)) * checkVector[i];    
    }
    if (total % 10 != 0){
        return false;
    }
    return true;
}
const barcodeLookup = document.getElementById("barcodeLookup")
const lookUpText = document.getElementById("lookupBarcode")
function lookUp(){
    let barcode = barcodeLookup.value;
    if(!codabar(barcode)){
        lookUpText.innerText = 'This barcode is not in our system!';
        return;
    }
    let currentItem = {};
    switch (barcode.charAt(0)){
        case '1':
            currentItem = foodItems[barcode.charAt(1)]
            while (currentItem.barcode != barcode){
                currentItem = foodItems[barcode.charAt(i)+1]
            }
            lookUpText.innerText = "This product is " + currentItem.name + " with a price of $"+ currentItem.price
            break;
        case '2':
            currentItem = drinkItems[barcode.charAt(1)]
            while (currentItem.barcode != barcode){
                currentItem = drinkItems[barcode.charAt(i)+1]
            }
            lookUpText.innerText = "This product is " + currentItem.name + " with a price of $"+ currentItem.price
            break;
        case '3':
            currentItem = miscItems[barcode.charAt(1)]
            while (currentItem.barcode != barcode){
                currentItem = miscItems[barcode.charAt(i)+1]
            }
            lookUpText.innerText = "This product is " + currentItem.name + " with a price of $"+ currentItem.price
            break;
    }
}
const itemName = document.getElementById("itemName")
const price = document.getElementById("price")
const category = document.getElementById("itemCatagories")
const add = document.getElementById("addItem")
const formUpdate = document.getElementById("formUpdate")
function addItem(){
    if(itemName.value == "" || price.value <=0 ){
        return;
    }
    let barcode;
    switch(category.value){
        case "Food":
            if(foodItems.find((food) => food.name == itemName.value)){
                formUpdate.innerText= "Item already exists"
                return;
            }
            barcode = createFoodBarcode({name: itemName.value, price: price.value})
            formUpdate.innerText = (itemName.value + " has been add with a barcode of  "+ barcode);
            break;
        case "Drink":
            if(drinkItems.find((drink) => drink.name == itemName.value)){
                formUpdate.innerText = "Item already exists"
                return;
            }
            barcode = createDrinkBarcode({name: itemName.value, price: price.value})
            formUpdate.innerText = (itemName.value + " has been add with a barcode of  "+ barcode);
            break;
        case "Misc":
            if(miscItems.find((misc) => misc.name == itemName.value)){
                formUpdate.innerText= "Item already exists"
                return;
            }
            barcode = createMiscBarcode({name: itemName.value, price: price.value})
            formUpdate.innerText = (itemName.value + " has been add with a barcode of  "+ barcode);
            break;
    }
    let item = {
        name: itemName.value,
        price: price.value,
        category: category.value,
        barcode: barcode
    }
    addToList(item);
    add.reset();
}
const itemContainer = document.getElementById("itemContainer")
function addToList(item){
    //make item div
    const newItem = document.createElement('div')
    newItem.className = "item"
    //make name
    let name = document.createElement('p')
    name.textContent = item.name;
    name.className = 'name'
    newItem.appendChild(name)
    //make price
    let price = document.createElement('p')
    price.textContent = '$' +item.price;
    price.className = 'price'
    newItem.appendChild(price)
    //make category
    let category = document.createElement('p')
    category.textContent = item.category;
    console.log(item.category)
    newItem.appendChild(category)
    //make item
    let barcode = document.createElement('p')
    barcode.textContent = item.barcode;
    newItem.appendChild(barcode)
    itemContainer.appendChild(newItem);
    

}