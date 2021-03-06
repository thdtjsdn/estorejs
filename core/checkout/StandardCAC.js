/**
 * StandardCAC is the checkout handler for pull style checkouts.
 * @class StandardCAC
 *
 * @constructor
 *
 */
module.exports = function StandardCAC(res, next) {

	this.onGatewayNotFound = function() {
		next();
	};

	this.onTransactionSaveFailed = function(err, trn) {
		next();
	};

	this.onTransactionApproved = function(trn) {

		var url = '/checkout/success/' + trn.tid;
		res.redirect(url);
	};

	/**
	 * onTransactionDeclined
	 *
	 * @method onTransactionDeclined
	 * @return
	 *
	 */
	this.onTransactionDeclined = function() {
		res.redirect('/checkout/declined');
	};


	this.onValidationError = function(err) {

		var errors = err.errors || err;
		res.locals.$errors = errors;
		res.render('checkout/index.html');
	};


};
