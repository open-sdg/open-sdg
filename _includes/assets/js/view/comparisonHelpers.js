/**
 * @param {Object} args
 * @return null
 */

function initialiseFieldsWithGlobalValues(args) {
	
	console.log('headlineIsComparable: '+args.headlineIsComparable);
	var dataIsComparable = args.dataIsComparable
	if (dataIsComparable === false) {
		$('#toggles').hide()
		$(OPTIONS.rootElement).addClass('no-global-data');
	}
	else {
        	$(OPTIONS.rootElement).removeClass('no-global-data');
    	}
	
	
	$('.toggle-switch-check').change(function() {
		if (this.checked) {
			MODEL.comparisonToggle = true;
			if (args.headlineIsComparable) {
				 MODEL.updateHeadlineSelectedFields()
			}
			
			console.log('Toggle on: ', this.checked);
			console.log('dataIsComparable: '+args.dataIsComparable);
			console.log('fieldsAreComparable: '+args.fieldsAreComparable)
			$('#toolbar').hide();
			if (args.fieldsAreComparable) {
				var template = _.template($('#categories_template').html());
				$('#categories').html(template({
				fields: args.fields,
				comparableFieldValues: args.comparableFieldValues
			}));
				console.log('fieldsAreComparable: ', args.fieldsAreComparable)
				console.log('comparableFieldValues: ', args.comparableFieldValues)
				$('#categories').show();
                                $(OPTIONS.rootElement).on('change', '#category-select', function () {
					MODEL.updateSelectedComparisonValue($(this).find(':selected').data('field').concat("|",$(this).val()));
                                });
			}	
		} else {
			MODEL.comparisonToggle = false;
			MODEL.startValues = [{"field":"Reporting type","value":"National"}]
			console.log('startValues: ', MODEL.startValues)
			$('#categories').hide();
			$('#toolbar').show()
		}
	});
}
