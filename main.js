var eventBus = new Vue()

Vue.config.devtools = true

function renderDay(events) {
  app.events = events
}

Vue.component('calendar-day', {
  template: `
    <div>
      {{ events }}
    </div>
  `,
  data() {
    return {
      events: []
    }
  }
})

var app = new Vue({
  el: '#app',
  template: `
    <calendar-day></calendar-day>
  `,
  data: {
    events: []
  }
})
