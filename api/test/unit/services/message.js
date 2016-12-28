const DBHelper       = require('../../test-helper.js')
const P              = require('bluebird')
const Mongoose       = require('mongoose')
const Sinon          = require('sinon')
const assert         = require('assert')
const MessageService = require('../../../services/message')
const MessageModel   = require('../../../models/message')

describe('Message Service', () => {
  afterEach(() => {
    DBHelper.clearDB()
  })

  describe('saveAsync()', () => {
    describe('validate failed', () => {
      it('should return the error of displayName', () => {
        const messageAttrs = { displayName: '' }
        return MessageService.saveAsync(messageAttrs)
        .then(error => {
          assert.equal(error.errors['displayName'], 'Path `displayName` is required.')
        })
      })

      it('should return the error of message', () => {
        const messageAttrs = { message: '' }
        return MessageService.saveAsync(messageAttrs)
        .then(error => {
          assert.equal(error.errors['message'], 'Path `message` is required.')
        })
      })
    })

    describe('failed', () => {
      let createStub
      before(() => {
        createStub = Sinon.stub(MessageModel, 'create').throws(Error('CustomError'))
      })

      after(() => {
        createStub.restore()
      })

      it('should raise an exception', () => {
        return MessageService.saveAsync({})
        .catch(e => {
          assert.equal(e.message, 'CustomError')
        })
      })
    })

    describe('save successfully', () => {
      it('should return the object of message', () => {
        const messageAttrs = { displayName: 'Neng', message: 'hello from Neng' }
        return MessageService.saveAsync(messageAttrs)
        .then(messageObject => {
          assert.equal(messageObject.displayName, 'Neng')
          assert.equal(messageObject.message,     'hello from Neng')
        })
      })
    })
  })

  describe('getHistoryAsync()', () => {
    describe('with no messages', () => {
      it('should return blank array of message object', () => {
        return MessageService.getHistoryAsync()
        .then(messages => {
          assert.equal(messages.length, 0)
        })
      })
    })

    describe('with less than 100 messages', () => {
      before(() => {
        return P.map(new Array(2), (v, i) => MessageService.saveAsync({displayName: `user${i}`, message: `message${i}` }))
      })
      it('should return array of all messages', () => {
        return MessageService.getHistoryAsync()
        .then(messages => {
          assert.equal(messages.length, 2)
          assert.equal(messages[0].displayName, 'user0')
          assert.equal(messages[0].message,     'message0')
        })
      })
    })

    describe('with greater than 100 messages', () => {
      before(() => {
        return P.map(new Array(102), (v, i) => MessageService.saveAsync({displayName: `user${i}`, message: `message${i}` }))
      })

      it('should return array of latest 100 messages', () => {
        return MessageService.getHistoryAsync()
        .then(messages => {
          assert.equal(messages.length, 100)
          assert.equal(messages[0].displayName, 'user2')
          assert.equal(messages[0].message,     'message2')
          assert.equal(messages[99].displayName, 'user101')
          assert.equal(messages[99].message,     'message101')
        })
      })
    })
  })
})
