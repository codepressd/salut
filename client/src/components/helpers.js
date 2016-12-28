export const calculateCartTotal = (cart) => {
		
		const taxRate = 1.07725;
		//get subtotal
		let subTotal = 0;
			cart.map((product) => {
					subTotal += Number(product.price) * Number(product.quantity);
			})

		let total = subTotal * taxRate;
		let tax = total - subTotal;
		//fix to two decimals
		const finalSubTotal = subTotal.toFixed(2);
		const finalTax = tax.toFixed(2);
		const finalTotal = total.toFixed(2);

		return {
			subTotal: finalSubTotal,
			total: finalTotal,
			tax: finalTax
		}
}

const randomNumber = () => {
	let text = '';
   	var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';

	for( var i = 0 ; i < 10; i++ ){
		text += possible.charAt(Math.floor(Math.random() * possible.length));
	}	
    	return text;
}

const getDate = () =>{
	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth()+1; //January is 0!
	var yyyy = today.getFullYear();

	if(dd<10) {
	    dd='0'+dd
	} 

	if(mm<10) {
	    mm='0'+mm
	} 

	return today = mm+'/'+dd+'/'+yyyy;
}

export const sortCart = (cart, user) => {
	let itemsOrdered = cart.length;
	let supplierArray = [];
	let orderDate = getDate();
	let cartTotal = calculateCartTotal(cart);
	const orderNumber = 'Salut-'+randomNumber();//create order number
	let suppliersProducts = {};

	const uniqueSupplierIDs = [...new Set(cart.map(item => item.product.supplierId))];

	for (var i =0 ; i < uniqueSupplierIDs.length; i++){

		let currentId = uniqueSupplierIDs[i];
		var product = cart.filter(function(el){
			return el.product.supplierId === uniqueSupplierIDs[i];
		});
		suppliersProducts[currentId] = product;
		
	}
	
	const sortedOrder = {
		orderNumber: orderNumber,
		orderTotal: cartTotal,
		itemsOrdered: itemsOrdered,
		orderDate: orderDate,
		userId: user,
		productsOrdered: suppliersProducts
	};
	
	return sortedOrder;
}