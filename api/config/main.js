const _   = require('lodash')

var env               = process.env.NODE_ENV || 'development'

if (env != 'production'){
  require('dotenv').config({silent: true})
}

const globalConfig = {
  MONGO_USER:                 getEnv('MONGO_USER') || undefined,
  MONGO_PASS:                 getEnv('MONGO_PASS') || undefined
}

const localConfig = {

  development: {
    MONGO_URL:                getEnv('MONGO_URL')  || 'mongodb://127.0.0.1/chat_development'
  },

  test: {
    MONGO_URL:                getEnv('MONGO_URL')  || 'mongodb://127.0.0.1/chat_test'
  },

  production: {
    MONGO_URL:                getEnv('MONGO_URL')  || 'mongodb://127.0.0.1/chat_production'
  }
}[env]

const config = _.merge({ }, globalConfig, localConfig)
console.log(`Loaded config: '${env}'`)

function getEnv (envVar) {
  return process.env[`${envVar}`]
}

module.exports = config
