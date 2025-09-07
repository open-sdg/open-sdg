/**
 * @param {Object} args
 * @return null
 */

function initialiseFieldsWithGlobalValues(args) {
	
	var dataIsComparable = args.dataIsComparable;
	if (dataIsComparable === false) {
		$('#toggles').hide()
		$(OPTIONS.rootElement).addClass('no-global-data');
	}
	else {
        $(OPTIONS.rootElement).removeClass('no-global-data');
    }
	
	$('.toggle-switch-check').change(function() {
		if (this.checked) {
			MODEL.enableComparisonMode();
			if (args.headlineIsComparable) {
				 MODEL.updateHeadlineSelectedFields()
			}
			
			$('#toolbar').hide();
			if (args.fieldsAreComparable) {
				var template = _.template($('#categories_template').html());
				$('#categories').html(template({
					fields: args.fields,
					comparableFieldValues: args.comparableFieldValues
				}));
				$('#categories').show();
                $(OPTIONS.rootElement).on('change', '#category-select', function () {
					MODEL.updateSelectedComparisonValue($(this).find(':selected').data('field').concat("|",$(this).val()));
                });
			}	
		}
		else {
			MODEL.disableComparisonMode();
			MODEL.resetChartWithoutComparison();
			$('#categories').hide();
			$('#toolbar').show();
		}
	});
}
