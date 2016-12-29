// For authoring Nightwatch tests, see
// http://nightwatchjs.org/guide#usage

module.exports = {
  'signin': function (browser) {
    // automatically uses dev Server port from /config.index.js
    // default: http://localhost:8080
    // see nightwatch.conf.js
    const devServer = browser.globals.devServerURL

    browser
      .url(devServer)
      .waitForElementVisible('#app', 3000)
      .setValue('input[type=text]', 'Neng')
      .click('button[name=signin]')
      .waitForElementVisible('div.panel-heading', 1000)
      .assert.containsText('div.panel-heading', 'RECENT CHAT HISTORY')
  },

  'send message': function (browser) {
    browser
      .setValue('input[type=text]', 'Hello, this is the first test')
      .click('button[name=send]')
      .waitForElementVisible('li.media', 1000)
      .assert.value('input[type=text]', '')
      .assert.containsText('li.media', 'Hello, this is the first test')
      .assert.containsText('li.media', 'Neng')
      .end()
  }
}
