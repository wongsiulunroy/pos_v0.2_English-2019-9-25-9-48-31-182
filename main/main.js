'use strict';

function printReceipt(inputs) {
 getName(inputs)
 getQuantity(inputs)
 let decodeditem = decodeReceipt(inputs)
 let receipt = calReceipt(decodeditem)
 combineReceipt(receipt)
}



function getName(inputs) {
	let itemResult = [] 
	itemResult= loadAllItems();
	//console.log(itemResult);
	let itemName = [];

	itemResult.forEach(function(i) { itemName[i] = (itemName[i]||0) + 1;});
	//console.log(quantity);
	
	//for (let x = 0; x<)
	/*for (let i = 0;i<itemResult.length; i++){

		itemName.push(itemResult[i].name);

		//if (inputs.filter(element=>itemResult[i].barcode.includes(element))){
			//itemName.push(itemResult[i].name);
		//}
		
	}*/
	console.log(itemName);


}

function getQuantity(inputs) {
	let quantity = [];
	inputs.forEach(function(i) { quantity[i] = (quantity[i]||0) + 1;});
	console.log(quantity);
	return quantity;
}

function calItemPrice(input) {
	let itemResult = [] 
	itemResult= loadAllItems();
	let itemPrice=[];


	return itemPrice;
}

function decodeReceipt(inputs) {
	let decodeditem = [];
	let itemName = getName(inputs)
	let quantity = getQuantity(inputs)
	let itemPrice = calItemPrice(inputs)

	return decodeditem;
}

function calReceipt(decodeditem) {
	let receipt = [];
	return receipt;
}

function calSubTotal(itemPrice, quantity) {
	let subTotal = [];
	return subTotal;
}

function calTotal(subTotal) {
	let TotalPrice = 0;
	return TotalPrice;
}

function combineReceipt(receipt) {
	let combinedReceipt ="";
	return combinedReceipt;
}



