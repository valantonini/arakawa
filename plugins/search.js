const moment = require('moment');

function index(env, callback) {
    class SimpleSearch extends env.ContentPlugin {
        getFilename() {
            return 'search.json'
        }

        getView() {
            return (env, locals, contents, templates, callback) => {
                
                const entries = env.helpers.contents.list(contents).filter((entry) => (
                    entry instanceof env.plugins.MarkdownPage && !entry.metadata.noindex
                ))

                const search = [];
                for (const e of entries) {
                    if(!e.metadata.location){
                        continue;
                    }
                    search.push({
                        title: e.title,
                        category: e.category || "",
                        tags: e.metadata.tags ? e.metadata.tags.join(",") : "",
                        url: e.metadata.location,
                        date: moment(e.date)
                    })
                }

                callback(null, Buffer.from(JSON.stringify(search)));
            }
        }
    }

    env.registerGenerator('simpleSearch', (contents, callback) => {
        callback(null, {
            'search.json': new SimpleSearch()
        })
    })

    callback()
}

module.exports = index