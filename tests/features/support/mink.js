const cucumber = require('cucumber');
const mink = require('cucumber-mink');

const driver = new mink.Mink({
  baseUrl: 'http://127.0.0.1:4000/open-sdg-site-testing/',
  viewport: {
    width: 1366,
    height: 768,
  },
});

driver.hook(cucumber);
