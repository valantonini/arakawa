const _ = require('lodash')
const pug = require('pug')

function index (env, callback) {
  class Feed extends env.plugins.Page {
    getFilename () {
      return 'feed.xml'
    }

    getView () {
      return (env, locals, contents, templates, callback) => {
        if (!locals.url) {
          return callback(new Error('locals.url must be defined.'))
        }

        const template = pug.compileFile(`${__dirname}/templates/feed.pug`)

        const entries = env.helpers.contents.list(contents.posts).filter((entry) => (
          entry instanceof env.plugins.MarkdownPage && !entry.metadata.noindex
        ))
        const context = _.merge({entries}, locals)

        callback(null, Buffer.from(template(context)))
      }
    }
  }

  env.registerGenerator('feed', (contents, callback) => {
    callback(null, {'feed.xml': new Feed()})
  })

  callback()
}

module.exports = index