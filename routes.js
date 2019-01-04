const routes = require('next-routes')


module.exports = routes()
.add('action', '/action/:id')
.add('indicator', '/indicator/:id')
.add('index', '/')
