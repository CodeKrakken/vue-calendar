var eventBus = new Vue()

Vue.config.devtools = true

function renderDay(events) {
  app.renderDay(events)
}

Vue.component('calendar-day', {
  template: `
    <ul>
      <div v-for="event in events"
        class="full">
          <div 
            v-bind:class = "{ clash: event.isClash }"
          >
          <li>{{ event.start }} - {{ event.end }}</li>
        </div>
      </div>
    </ul>
  `,
  data() {
    return {
      events: [],
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
  },
  methods: {
    renderDay(events) {
      app.events = events.sort((a, b) => a.start - b.start)
      events.forEach(event => {
        this.findClashes(event)
        this.formatTime(event)
      })
    },
    formatTime(event) {
  const nineOClock = 60 * 9;
  const startDate = dateFns.addMinutes(new Date(2020, 5, 1), nineOClock + event.start);
  const endDate = dateFns.addMinutes(new Date(2020, 5, 1), nineOClock + event.end);
  event.start = dateFns.format(startDate, "HH:mm")
  event.end = dateFns.format(endDate, "HH:mm");
    },
    findClashes(event1) {
      this.events.forEach(event2 => {
        if ((event1.end > event2.start) && (event1 !== event2)) {
          event1.isClash = true;
          event2.isClash = true
        }
      })
    }
  }
})

window.renderDay([{start: 30, end: 120}, {start: 300, end: 330}, {start: 290, end: 330}])
