const choo = require('choo')
const html = require('nanohtml')
const app = choo()

app.use(require('choo-devtools')())
app.use(clicks)

app.route('/', mainView)

function clicks (state, emitter) {
  state.totalClicks = 0

  emitter.on('clicks:add', function (count) {
    state.totalClicks += count
    emitter.emit(state.events.RENDER)
  })
}

function mainView (state, emit) {

  return html`
    <div class="app">
      <div class="flex-container">
        <div class="container">
          <header>
            <img height="70" width="70" class="logo" src="/jsonfeed.svg" >
            <div class="headline">
              <h1>JSON Feed Converter</h1>
              <p>Convert a JSON Feed to an RSS or Atom feed.  For more information see <a href="https://jsonfeed.org/version/1">see the specification</a></p>
            </div>
          </header>
        </div>
      </div>
    </div>
  `
}

module.exports = app.mount('#app')
