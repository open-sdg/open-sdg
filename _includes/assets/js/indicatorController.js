// @deprecated start
// Some backwards compatibiliy code after Lodash migration.
_.findWhere = _.find;
// @deprecated end

var indicatorController = function (model, view) {
  this._model = model;
  this._view = view;
};

indicatorController.prototype = {
  initialise: function () {
    this._model.initialise();
  }
};
