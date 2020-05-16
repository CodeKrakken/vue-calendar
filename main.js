var eventBus = new Vue()

Vue.config.devtools = true

function renderDay(events) {
  app.renderDay(events)
}

Vue.component('calendar-day', {
  template: `
    <ul>
      <div v-for="event in events">
        <li>{{ event.start }} - {{ event.end }}</li>
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
  methods: {
    renderDay(events) {
      app.events = events.sort((a, b) => a.start - b.start)
      events.forEach(event =>
        this.format(event)
      ) 
    },
    format(event) {
      var startMinutes = ((event.start + 540) % 60)
      var endMinutes = ((event.end + 540) % 60)
      var startHours = Math.floor((event.start + 540) / 60)
      var endHours = Math.floor((event.end + 540) / 60)
      if (startMinutes < 10) { startMinutes = startMinutes + "0" }
      if (endMinutes < 10) { endMinutes = endMinutes + "0" }
      event.start = startHours + ":" + startMinutes
      event.end = endHours + ":" + endMinutes
    }
  }
})

window.renderDay([{start: 30, end: 120}, {start: 300, end: 330}, {start: 290, end: 330}])
