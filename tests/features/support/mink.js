const cucumber = require('cucumber');
const mink = require('cucumber-mink');

const driver = new mink.Mink({
  baseUrl: 'http://localhost:8080',
  viewport: {
    width: 1366,
    height: 768,
  },
});

driver.hook(cucumber);
