var eventBus = new Vue()

Vue.config.devtools = true

Vue.component('testing', {
  template: `
    <div>
      Hello!
    </div>`
})

var app = new Vue({
  el: '#app',
  
})