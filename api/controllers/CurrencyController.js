/**
 * CurrencyController
 *
 * @description :: Server-side logic for managing Currencies
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	rate : function(req,res) {
		var currencyRate = {
			NGN : 335 ,
			GBP  : 0.600
		}
		return ResponseService.json(200 , res, "exchange rate returned successfully" , currencyRate);
	}
};
