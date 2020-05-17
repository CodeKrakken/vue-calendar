var eventBus = new Vue()

Vue.config.devtools = true

function renderDay(events) {
  app.renderDay(events)
}

Vue.component('calendar-day', {
  template: `
    <div class="page">
      <div class="timeline">
        <div class="hour">9</div>
        <div class="hour">10</div>
        <div class="hour">11</div>
        <div class="hour">12</div>
        <div class="hour">13</div>
        <div class="hour">14</div>
        <div class="hour">15</div>
        <div class="hour">16</div>
        <div class="hour">17</div>
        <div class="hour">18</div>
      </div>
      <div class="events">
        <div v-for="event in events"
        :style = "{ width: (100/(event.clashes+1)) + '%', top: (event.start/6) + '%', height: (event.end-event.start)/6 + '%' }"
        class="event"
        >
          {{ event.startTime }} - {{ event.endTime }}
        </div>
      </div>
    </div>
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
      this.events = events.sort((a, b) => a.start - b.start)
      this.events.forEach(event => {
        this.findClashes(event)
      });
      this.events.forEach(event => {
        this.formatTime(event)
      });
    },
    formatTime(event) {
      const nineOClock = 60 * 9;
      const startDate = dateFns.addMinutes(new Date(2020, 5, 1), nineOClock + event.start);
      const endDate = dateFns.addMinutes(new Date(2020, 5, 1), nineOClock + event.end);
      event.startTime = dateFns.format(startDate, "HH:mm")
      event.endTime = dateFns.format(endDate, "HH:mm");
    },
    findClashes(event1) {
      this.events.forEach(event2 => {
        if (!event1.clashes) { event1.clashes = 0 }
        if (!event2.clashes) { event2.clashes = 0 }
        if ((event1.end > event2.start) && (event2.end > event1.start) && (event1 !== event2)) {
          event1.clashes ++
        }
      })
    }
  }
})

window.renderDay([{start: 30, end: 120}, {start: 300, end: 330}, {start: 290, end: 330}])
