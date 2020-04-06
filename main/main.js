'use strict';

function printReceipt(inputs) {
	let decodeditem = decodeReceipt(inputs);
 	let receipt = calReceipt(calItemPrice(getQuantity(getName(inputs))));
 	console.log(receipt);
}

function decodeReceipt(itemBarcode) {
	let decodeditem = [];
	let matchedItems = getName(itemBarcode);
	let countedItem = getQuantity(matchedItems);
	let singleItemPrice = calItemPrice(countedItem);
	return decodeditem;
}

function getName(itemBarcode) {
	let itemResult = [] 
	itemResult= loadAllItems();
	//console.log(itemResult);
	let itemName = [];
	for (let loop = 0 ; loop < itemResult.length ; loop ++) {
        var matcheditem = itemBarcode.filter(element => itemResult[loop].barcode.includes(element));
        itemName.push(matcheditem);
    }
    return itemName;
	//console.log(itemName);
}


function getQuantity(matchedItems) {
	let itemQuantity = loadAllItems();
    itemQuantity= itemQuantity.map(function(o){o.quantity = 0; return o;});

    for (let loop = 0 ; loop < matchedItems.length ; loop ++) {
        var quantity = matchedItems[loop].length;
        itemQuantity[loop].quantity = quantity;
    }
    return itemQuantity ; //array
}

function calItemPrice(countedItem) {
    var itemPrice = countedItem;
    itemPrice= itemPrice.map(function(o){o.singlePrice = 0; return o;});
    for (let loop = 0 ; loop < countedItem.length ; loop ++) {
        var singlePrice = countedItem[loop].price * countedItem[loop].quantity;
        itemPrice[loop].singlePrice = singlePrice;
    }
    return itemPrice; //array
}


function calReceipt(itemPrice) {
    let totalPrice = calTotal(itemPrice);
    return combineReceipt(totalPrice, itemPrice);
}


function calTotal(itemPrice) {
	let totalPrice = 0;
    for (let loop = 0 ; loop < itemPrice.length ; loop ++){
        totalPrice = totalPrice + parseFloat(itemPrice[loop].price) * parseInt(itemPrice[loop].quantity);
    }
    return totalPrice;
}

function combineReceipt(totalPrice,itemPrice ) {
	let combinedReceipt ='***<store earning no money>Receipt *** \n';
	for (let loop = 0 ; loop < itemPrice.length ; loop ++){
            if (itemPrice[loop].quantity != 0){
            combinedReceipt = combinedReceipt +  "Name:"+ itemPrice[loop].name+"，Quantity:"+ itemPrice[loop].quantity+" "+
            itemPrice[loop].unit;

            if(itemPrice[loop].quantity > 1){
                    combinedReceipt = combinedReceipt + "s,Unit:"+parseFloat(itemPrice[loop].price).toFixed(2)+" (yuan),Subtotal:"+
                    parseFloat(itemPrice[loop].singlePrice).toFixed(2)+" (yuan)";
            }

            if(itemPrice[loop].quantity == 1){
            combinedReceipt = combinedReceipt + ",Unit:"+parseFloat(itemPrice[loop].price).toFixed(2)+" (yuan),Subtotal:"+
            parseFloat(itemPrice[loop].singlePrice).toFixed(2)+" (yuan)";
            }

                if(loop != itemPrice.length - 1){
                    combinedReceipt = combinedReceipt + "\n";
                }
            }
        }
    return ("***<store earning no money>Receipt *** " + "\n" + combinedReceipt + "----------------------"+"\n"+
            "total:"+ parseFloat(totalPrice).toFixed(2) +" (yuan)"+"\n"+"**********************");

}



