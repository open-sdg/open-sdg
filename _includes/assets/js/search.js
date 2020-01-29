var indicatorSearch = function() {
  // Helper function to make a search query "fuzzier", using the ~ syntax.
  var getFuzzierQuery = function(query, fuzziness) {
    return query
      .split(' ')
      .map(function(x) { return x + '~' + fuzziness; })
      .join(' ');
  }
  // Helper function to get the matched words from a result set.
  var getMatchedTerms = function(results) {
    var matchedTerms = {};
    results.forEach(function(result) {
      Object.keys(result.matchData.metadata).forEach(function(matchedTerm) {
        matchedTerms[matchedTerm] = true;
      })
    });
    return Object.keys(matchedTerms);
  }
  // Helper function to get a boost score, if any.
  var getSearchFieldOptions = function(field) {
    var opts = {}
    if (opensdg.searchIndexBoost[field]) {
      opts['boost'] = intval(opensdg.searchIndexBoost[field])
    }
    return opts
  }
  var urlParams = new URLSearchParams(window.location.search);
  var searchTerms = urlParams.get('q');
  if (searchTerms) {
    document.getElementById('search-bar-on-page').value = searchTerms;
    document.getElementById('search-term').innerHTML = searchTerms;

    var searchIndex = lunr(function () {
      this.ref('url');
      // Index the expected fields.
      this.field('title', getSearchFieldOptions('title'));
      this.field('content', getSearchFieldOptions('content'));
      this.field('id', getSearchFieldOptions('id'));
      // Index any extra fields.
      opensdg.searchIndexExtraFields.forEach(function(extraField) {
        this.field(extraField, getSearchFieldOptions(extraField));
      });
      // Index all the documents.
      for (var ref in opensdg.searchItems) {
        this.add(opensdg.searchItems[ref]);
      };
    });

    var searchTermsToUse = searchTerms;
    // This is to allow for searching by indicator with dashes.
    if (searchTerms.split('-').length == 3 && searchTerms.length < 15) {
      // Just a best-guess check to see if the user intended to search for an
      // indicator ID.
      searchTermsToUse = searchTerms.replace(/-/g, '.');
    }
    // Perform the search.
    var results = searchIndex.search(searchTermsToUse);
    var didYouMean = false;

    // If we didn't find anything, get progressively "fuzzier" to look for
    // "did you mean?" options.
    if (!results.length) {
      var fuzziness;
      for (fuzziness = 1; fuzziness < 5; fuzziness++) {
        var fuzzierQuery = getFuzzierQuery(searchTermsToUse, fuzziness);
        var alternateResults = searchIndex.search(fuzzierQuery);
        if (alternateResults.length) {
          var matchedTerms = getMatchedTerms(alternateResults);
          if (matchedTerms) {
            didYouMean = matchedTerms;
          }
          break;
        }
      }
    }
    var resultItems = [];
    var escapeRegExp = function(str) {
      return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/gi, "\\$&");
    };
    results.forEach(function(result) {
      var doc = opensdg.searchItems[result.ref]
      // Truncate the contents.
      if (doc.content.length > 400) {
        doc.content = doc.content.substring(0, 400) + '...';
      }
      // Indicate the matches.
      doc.content = doc.content.replace(new RegExp('(' + escapeRegExp(searchTerms) + ')', 'gi'), '<span class="match">$1</span>');
      doc.title = doc.title.replace(new RegExp('(' + escapeRegExp(searchTerms) + ')', 'gi'), '<span class="match">$1</span>');
      resultItems.push(doc);
    });

    $('.loader').hide();

    // Print the results using a template.
    var template = _.template(
      $("script.results-template").html()
    );
    $('div.results').html(template({
      searchResults: resultItems,
      resultsCount: resultItems.length,
      didYouMean: didYouMean,
    }));
  }
};

$(function() {

  var $el = $('#indicator_search');
  $('#jump-to-search').show();
  $('#jump-to-search a').click(function() {
    if($el.is(':hidden')) {
      $('.navbar span[data-target="search"]').click();
    }
    $el.focus();
  });

  indicatorSearch();
});
