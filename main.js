Vue.config.devtools = true

function renderDay(events) {
  app.renderDay(events)
}

Vue.component('calendar-event', {
  template: `
    <div
    :style = "{ width: (100/(event.clashes+1)) + '%', 
    top: (event.start/6) + '%', 
    height: (event.end-event.start)/6 + '%' }"
    class="calendar-event"
    >
      {{ event.startTime }} - {{ event.endTime }}
    </div>
  `,
  props: {
    event: {
      type: Function,
      required: true
    }
  }
})

Vue.component('time-line', {
  template: `
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
  `
})

Vue.component('calendar-day', {
  template: `
    <div class="page">
      <time-line></time-line>
      <div class="events">
        <calendar-event 
        v-for="event in events" 
        :event="event"><calendar-event>
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
        if (!event.clashes) { event.clashes = 0 }
        this.findClashes(event)
      });
      this.events.forEach(event => {
        event.startTime = this.formatTime(event.start);
        event.endTime = this.formatTime(event.end)
      });
    },
    formatTime(rawTime) {
      const nineOClock = 60 * 9;
      const date = dateFns.addMinutes(new Date(2020, 5, 1), nineOClock + rawTime);
      return dateFns.format(date, "h:mma")
    },
    findClashes(event1) {
      this.events.forEach(event2 => {
        if ((event1.end > event2.start) && (event2.end > event1.start) && (event1 !== event2)) {
          event1.clashes ++
        }
      })
    }
  }
})

window.renderDay([{start: 0, end: 300}, {start: 295, end: 530}, {start: 5, end: 120}])

