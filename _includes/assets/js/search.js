var indicatorSearch = function(inputElement, indicatorDataStore) {
  that = this;
  this.inputElement = inputElement;
  this.indicatorDataStore = indicatorDataStore;
  this.indicatorData = [];
  this.hasErrored = false;

  this.processData = function(data) {
    for(var goalLoop = 0; goalLoop < data.length; goalLoop++) {
      for(var indicatorLoop = 0; indicatorLoop < data[goalLoop].goal.indicators.length; indicatorLoop++) {
        var currentIndicator = data[goalLoop].goal.indicators[indicatorLoop];
        currentIndicator.goalId = data[goalLoop].goal.id;
        currentIndicator.goalTitle = data[goalLoop].goal.title;
        that.indicatorData.push(currentIndicator);
      }
    }
  };

  this.inputElement.keyup(function(e) {
    var searchValue = that.inputElement.val();
    if(e.keyCode === 13 && searchValue.length) {
      window.location.replace(that.inputElement.data('pageurl') + searchValue);
    }
  });

  var escapeRegExp = function(str) {
    return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/gi, "\\$&");
  };

  if($('#main-content').hasClass('search-results')) {

    var results = [],
        that = this,
        searchString = unescape(location.search.substring(1)).replace("q=", "");

    // we got here because of a redirect, so reinstate:
    this.inputElement.val(searchString);

    $('#main-content h1 span').text(searchString);
    $('#main-content h1').show();

    this.indicatorDataStore.getData().then(function(data) {

      that.processData(data);

      var searchResults = _.filter(that.indicatorData, function(indicator) {
        return indicator.title.toLowerCase().indexOf(searchString.toLowerCase()) != -1 ||
          indicator.description.toLowerCase().indexOf(searchString.toLowerCase()) != -1 ||
          indicator.keywords.toLowerCase().indexOf(searchString.toLowerCase()) != -1;
      });

      // goal
      //    indicators
      // goal
      //    indicators

      _.each(searchResults, function(result) {
        var goal = _.findWhere(results, { goalId: result.goalId }),
            indicator = {
              parsedTitle: result.title.replace(new RegExp('(' + escapeRegExp(searchString) + ')', 'gi'), '<span class="match">$1</span>'),
              parsedDescription: result.description.replace(new RegExp('(' + escapeRegExp(searchString) + ')', 'gi'), '<span class="match">$1</span>'),
              parsedKeywords: result.keywords.replace(new RegExp('(' + escapeRegExp(searchString) + ')', 'gi'), '<span class="match">$1</span>'),
              hasKeywords: result.keywords && result.keywords.length,
              hasDescription: result.description && result.description.length,
              id: result.id,
              title: result.title,
              href: result.href,
              status: result.status
            };

        if(!goal) {
          results.push({
            goalId: result.goalId,
            goalTitle: result.goalTitle,
            indicators: [indicator]
          });
        } else {
          goal.indicators.push(indicator);
        }
      });

      $('.loader').hide();

      var template = _.template(
        $("script.results").html()
      );

      $('div.results').html(template({
        searchResults: results,
        resultsCount: searchResults.length,
        imgPath: $('.results').data('imgpath')
      }));
    });
  }
};

indicatorSearch.prototype = {

};

$(function() {

  var $el = $('#indicator_search');
  new indicatorSearch($el, new indicatorDataStore($el.data('url')));

  $('#jump-to-search').show();
  $('#jump-to-search a').click(function() {
    if($el.is(':hidden')) {
      $('.navbar span[data-target="search"]').click();
    }
    $el.focus();
  });


});

