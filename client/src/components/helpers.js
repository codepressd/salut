export const calculateCartTotal = (cart) => {
		
		const taxRate = 1.07725;
		//get subtotal
		let subTotal = null;
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