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
			data: JSON.stringify(postData),
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

	function getBalance(id, balanceID) {
		$.ajax({
			url: formatURL('accounts/' + id),
			method : 'GET',
			dataType : 'json',
			success : function (data, textStatus) {
				$('#' + balanceID).text('$' + data.balance);
			}
		})
	}

	function updateTable(id, tableID, balanceID) {
		getBalance(id, balanceID);
		$.ajax({
			url : formatURL('accounts/' + id + '/transfers'),
			method : 'GET',
			dataType : 'json',
			success : function (data, textStatus) {
				$.each(data, function(index, transaction) {
					if ($('#' + id + transaction._id).length === 0) {
						var amount = transaction.amount;
						if (id === transaction.payer_id) {
							amount *= -1;
						}
						$('#' + tableID + ' tr:last').after('<tr id=' + id + transaction._id + '><td>' + transaction.description + '</td><td>' + amount + '</td></tr>');
					}
				});
			}
		});
	}

	updateTable(config.charityAccountID, 'charityTransactionTable', 'charityBalance');
	updateTable(config.donorAccountID, 'donorTransactionTable', 'donorBalance');
	$("#refreshButton").click(function() {
		updateTable(config.charityAccountID, 'charityTransactionTable');
		updateTable(config.donorAccountID, 'donorTransactionTable');
	});
	$("#donateButton").click(function() {
		createTransaction(5);
	});
});
