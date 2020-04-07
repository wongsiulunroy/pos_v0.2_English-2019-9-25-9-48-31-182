'use strict';

function printReceipt(inputs) {
	let decodeditem = decodeReceipt(inputs);
 	let receipt = calReceipt(calItemPrice(getQuantity(getName(inputs))));
 	console.log(receipt);
}

function decodeReceipt(inputs) {
	let decodeditem = [];
	let itemName = getName(inputs);
	let itemQuantity = getQuantity(itemName);
	let itemPrice = calItemPrice(itemQuantity);
	return decodeditem;
}

function getName(inputs) {
	let itemResult = [] 
	itemResult= loadAllItems();
	//console.log(itemResult);
	let itemName = [];
	for (let loop = 0 ; loop < itemResult.length ; loop ++) {
        var matcheditem = inputs.filter(element => itemResult[loop].barcode.includes(element));
        itemName.push(matcheditem);
    }
    return itemName;
	//console.log(itemName);
}


function getQuantity(itemName) {
	let itemQuantity = loadAllItems();
    itemQuantity= itemQuantity.map(function(o){o.quantity = 0; return o;});

    for (let loop = 0 ; loop < itemName.length ; loop ++) {
        var quantity = itemName[loop].length;
        itemQuantity[loop].quantity = quantity;
    }
    return itemQuantity ; //array
}

function calItemPrice(itemQuantity) {
    var itemPrice = itemQuantity;
    itemPrice= itemPrice.map(function(o){o.singlePrice = 0; return o;});
    for (let loop = 0 ; loop < itemQuantity.length ; loop ++) {
        var singlePrice = itemQuantity[loop].price * itemQuantity[loop].quantity;
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



