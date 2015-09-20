$(function() {
	var config = capitalOneConfig;
	function formatURL(path) {
		return 'api.reimaginebanking.com/' + path + '?key=' + config.apiKey;
	}
	function createTransaction(amount) {
		var URL = formatURL('accounts/' + config.donorAccountID + '/transfers');
		$.ajax({
			url: URL,
			method: 'POST',
			data: {
				medium: 'balance',
				payee_id : config.charityAccountID,
				amount : amount,
				transaction_date : new Date().toDateString(),
				description : "Donation to fund X's surgery"
			},
			dataType: 'json',
			success : function (data, textStatus) {
				console.log(data);
				console.log(textStatus);
			}
		});
	}

	function updateTable(id, tableID) {
		$.ajax({
			url : formatURL('accounts/' + id + '/transfers'),
			method : 'GET',
			dataType : 'json',
			success : function (data, textStatus) {
				if ($('#' + data._id).length === 0) {
					var $transactions = $('#' + tableID).children('tr:contains("Transactions")');
					var max = 0;
					$.each($transactions, function(index, element) {
						var num = parseInt(element.next().val());
						if (isNaN(num)) {
							alert('failed: ' + element);
						} else if (num > max) {
							max = num;
						}
					});
					var numTransactions = max + 1;
					$('#' + tableID + ' tr:last').after('<tr><td>Transaction</td><td>' + numTransactions + '</td></tr>');
					$.each(data, function(key, value) {
						if (key.indexOf('_id') >= 0) {
							$('#' + tableID + 'tr:last').after('<tr><td>' + key + '</td><td>' + value + '</td></tr>');
						}
					});
				}
			}
		});
	}

	updateTable(config.charityAccountID, 'charityTransactionTable');
	updateTable(config.donorAccountID, 'donorTransactionTable');
	$("#donateButton").click(function() {
		createTransaction(5);
		console.log('donated');
	});
	$("#refreshButton").click(function() {
		updateTable(config.charityAccountID, 'charityTransactionTable');
		updateTable(config.donorAccountID, 'donorTransactionTable');
		console.log('refreshed');
	});
	alert('readied');
});