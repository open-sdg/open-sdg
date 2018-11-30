var reportingStatus = function(indicatorDataStore) {
  this.indicatorDataStore = indicatorDataStore;

  this.getReportingStatus = function() {

    var that = this;

    return new Promise(function(resolve, reject) {

      // if(Modernizr.localStorage &&) {

      // }

      getPercentages = function(values) {

        var percentageTotal = 100;
        var total = _.reduce(values, function(memo, num) { return memo + num; });
        var percentages = _.map(values, function(v) { return (v / total) * percentageTotal; });

        var off = percentageTotal - _.reduce(percentages, function(acc, x) { return acc + Math.round(x) }, 0);
          return _.chain(percentages).
                  map(function(x, i) { return Math.round(x) + (off > i) - (i >= (percentages.length + off)) }).
                  value();
      }

      that.indicatorDataStore.getData().then(function(data) {
        // for each goal, get a percentage of indicators in the various states:
        // notstarted, inprogress, complete
        var mappedData = _.map(data, function(dataItem) {

          var returnItem = {
            goal_id: dataItem.goal.id,
            completeCount: _.where(dataItem.goal.indicators, { status: 'complete' }).length,
            inProgressCount: _.where(dataItem.goal.indicators, { status: 'inprogress' }).length,
            notStartedCount: _.where(dataItem.goal.indicators, { status: 'notstarted' }).length
          };

          returnItem.totalCount = returnItem.notStartedCount + returnItem.inProgressCount + returnItem.completeCount;
          returnItem.counts = [returnItem.completeCount, returnItem.inProgressCount, returnItem.notStartedCount];
          returnItem.percentages = getPercentages([returnItem.completeCount, returnItem.inProgressCount, returnItem.notStartedCount]);
          
          return returnItem;
        });    

        var getTotalByStatus = function(statusType) {
          return _.chain(mappedData).pluck(statusType).reduce(function(sum, n) { return sum + n; }).value();          
        };

        var overall = {
          totalCount: _.chain(mappedData).pluck('totalCount').reduce(function(sum, n) { return sum + n; }).value(),
          counts: [
            getTotalByStatus('completeCount'),
            getTotalByStatus('inProgressCount'),
            getTotalByStatus('notStartedCount')
          ]
        };

        overall.percentages = getPercentages([overall.counts[0], overall.counts[1], overall.counts[2]]);          
        
        resolve({
          goals: mappedData,
          overall: overall
        });
      });     
    });
  };
};

$(function() {

  if($('.container').hasClass('reportingstatus')) {
    var url = $('.container.reportingstatus').attr('data-url'),
        status = new reportingStatus(new indicatorDataStore(url)),
        types = ['Reported online', 'Statistics in progress', 'Exploring data sources'],
        bindData = function(el, data) {
          $(el).find('.goal-stats span').each(function(index, statEl) {
            var percentage = Math.round(Number(((data.counts[index] / data.totalCount) * 100))) + '%';
            
            $(statEl).attr({
              'style': 'width:' + data.percentages[index] + '%',
              'title': types[index] + ': ' + data.percentages[index] + '%'
            });
  
            $(el).find('span.value:eq(' + index + ')').text(data.percentages[index] + '%');
          }); 
        };

    status.getReportingStatus().then(function(data) {
      bindData($('.goal-overall'), data.overall);
      _.each(data.goals, function(goal) {
        var el = $('.goal[data-goalid="' + goal.goal_id + '"]');
        bindData(el, goal);       
      });
    });
  }
});
