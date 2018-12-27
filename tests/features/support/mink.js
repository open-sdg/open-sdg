const cucumber = require('cucumber');
const mink = require('cucumber-mink');

const driver = new mink.Mink({
  baseUrl: 'http://127.0.0.1:4000',
  viewport: {
    width: 1366,
    height: 768,
  },
  selectors: {
    "the Table tab": ".data-view .nav-link[href='#tableview']",
    "the Chart tab": ".data-view .nav-link[href='#chartview']",
    "sortable table": "#tableview table",
    "vistual chart": "#chartview canvas",
    "the Global metadata tab": ".nav-tabs .nav-link[href='#globalmetadata']",
    "the National metadata tab": ".nav-tabs .nav-link[href='#metadata']",
    "the Sources metadata tab": ".nav-tabs .nav-link[href='#sources']",
    "goal indicator": ".indicator-cards > div",
    "the high-contrast button": ".nav .contrast-high a",
    "goal icon": ".goal-tiles a img",
    "high-contrast goal icon": ".goal-tiles a img[src*='high-contrast']",
    "the language toggle dropdown": ".nav .language-toggle-button",
    "the first language option": ".nav .language-options a:first-child",
    "goal status": ".goal .frame",
    "the search box": ".navbar #indicator_search",
  }
});

driver.hook(cucumber);
