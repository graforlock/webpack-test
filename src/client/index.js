require('../../styles/styles.scss');

const html = require('choo/html')
const log = require('choo-log')
const choo = require('choo')

const mainView = require('./module/main')

const app = choo()
app.use(log())
app.use(countStore)
app.route('/', mainView)
app.mount('body')

function countStore (state, emitter) {
  state.count = 0
  emitter.on('increment', function (count) {
    state.count += count
    emitter.emit('render')
  })
}
