$(function() {

	var config = capitalOneConfig;
	function formatURL(path) {
		return 'http://api.reimaginebanking.com/' + path + '?key=' + config.apiKey;
	}
	function createTransaction(donation) {
		var URL = formatURL('accounts/' + config.donorAccountID + '/transfers');
		var postData = {
			medium: 'balance',
			payee_id : config.charityAccountID,
			// transaction_date : new Date().toDateString(),
			description : "Donation to fund X's surgery",
			amount : donation
		};
		$.ajax({
			url: URL,
			type: 'POST',
			data: postData,
			dataType: 'json',
			contentType: "application/json; charset=utf-8",
			success : function (data, textStatus) {
				console.log(data);
				console.log(textStatus);
			},
			error : function (xhr, ajaxOptions, throwError) {
				console.log(xhr);
				console.log(ajaxOptions);
				console.log(throwError);
			}
		});
	}

	function updateTable(id, tableID) {
		$.ajax({
			url : formatURL('accounts/' + id + '/transfers'),
			method : 'GET',
			dataType : 'json',
			success : function (data, textStatus) {
				$.each(data, function(index, transaction) {
					if ($('#' + transaction._id).length === 0) {
						var numTransactions = index + 1;
						$('#' + tableID + ' tr:last').after('<tr><td>Transaction</td><td>' + numTransactions + '</td></tr>');
						$.each(transaction, function(key, value) {
							if (key.indexOf('_id') < 0) {
								$('#' + tableID + ' tr:last').after('<tr><td>' + key + '</td><td>' + value + '</td></tr>');
							}
						});
					}
				});
			}
		});
	}

	updateTable(config.charityAccountID, 'charityTransactionTable');
	updateTable(config.donorAccountID, 'donorTransactionTable');
	$("#donateButton").click(function() {
		createTransaction(5);
	});
	$("#refreshButton").click(function() {
		updateTable(config.charityAccountID, 'charityTransactionTable');
		updateTable(config.donorAccountID, 'donorTransactionTable');
	});
});
