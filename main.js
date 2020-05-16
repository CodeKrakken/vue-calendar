var eventBus = new Vue()

Vue.config.devtools = true

function renderDay(events) {
  app.events = events
}

Vue.component('testing', {
  template: `
    <div>
      Hello!
    </div>`
})

var app = new Vue({
  el: '#app',
  template: `
    <div>
      {{ events }}
    </div>
    `,
  data: {
    events: []
  }
})
