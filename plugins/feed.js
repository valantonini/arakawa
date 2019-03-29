const _ = require('lodash')
const pug = require('pug')

function index(env, callback) {

  const defaults = {
    articles: 'articles', // directory containing contents to paginate
  };

  // assign defaults any option not set in the config file
  const options = env.config.feed || {};
  for (const key in defaults) {
    if (options[key] == null) {
      options[key] = defaults[key];
    }
  }

  class Feed extends env.plugins.Page {
    getFilename() {
      return 'feed.xml'
    }

    getView() {
      return (env, locals, contents, templates, callback) => {
        if (!locals.url) {
          return callback(new Error('locals.url must be defined.'))
        }

        const template = pug.compileFile(`${__dirname}/templates/feed.pug`)

        const entries = env.helpers.contents
          .list(contents[options.articles])
          .filter((entry) => (
            entry instanceof env.plugins.MarkdownPage && !entry.metadata.noindex
          ))
          .sort((a, b) => b.metadata.date - a.metadata.date);

        const context = _.merge({
          entries
        }, locals)

        callback(null, Buffer.from(template(context)))
      }
    }
  }

  env.registerGenerator('feed', (contents, callback) => {
    callback(null, {
      'feed.xml': new Feed()
    })
  })

  callback()
}

module.exports = index