var eventBus = new Vue()

Vue.config.devtools = true

function format(event) {
  event.start = Math.floor((event.start + 540) / 60) + ":" + ((event.end + 540) % 60)
  event.end = Math.floor((event.end + 540) / 60) + ":" + ((event.end + 540) % 60);
}

function renderDay(events) {
  app.events = events.sort((a, b) => a.start - b.start)
  events.forEach(event =>
    format(event)
  ) 
}

Vue.component('calendar-day', {
  template: `
    <ul>
      <div v-for="event in events">
        <li>{{ event }}</li>
      </div>
    </ul>
  `,
  data() {
    return {
      events: []
    }
  },
  props: {
    events: {
      type: Array,
      required: true
    }
  }
})

var app = new Vue({
  el: '#app',
  template: `
    <calendar-day :events="events"></calendar-day>
  `,
  data: {
    events: [],
    eventStarts: []
  },
})

window.renderDay([{start: 30, end: 120}, {start: 300, end: 330}, {start: 290, end: 330}])
