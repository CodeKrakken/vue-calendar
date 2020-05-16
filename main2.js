<ul>
      <div v-for="event in events">
        <div
          :class="{ clash: event.isClash === true }"
        >
          <li>{{ event.start }} - {{ event.end }}</li>
        </div>
      </div>
    </ul>