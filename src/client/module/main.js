const html = require('choo/html')

module.exports = function mainView (state, emit) {
    return html`
      <body>
        <h1>count is ${state.count}</h1>
        <button onclick=${onclick}>Incrementzoids</button>
      </body>
    `

    function onclick () {
        emit('increment', 1)
      }
}