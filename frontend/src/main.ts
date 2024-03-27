import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faCaretDown,
  faPalette,
  faSquare,
  faPaperPlane,
  faFaceSmile,
  faGlobe,
  faRotateLeft,
  faCheck,
  faDiagramProject,
  faPlus,
  faArrowLeft,
  faCircleCheck,
  faXmark
} from '@fortawesome/free-solid-svg-icons'

import App from './App.vue'
import router from './router'

const app = createApp(App)
library.add(
  faCaretDown,
  faPalette,
  faSquare,
  faPaperPlane,
  faFaceSmile,
  faGlobe,
  faRotateLeft,
  faCheck,
  faDiagramProject,
  faPlus,
  faArrowLeft,
  faCircleCheck,
  faXmark
)

app.use(createPinia())
app.use(router)
app.component('FontAwesomeIcon', FontAwesomeIcon)

app.mount('#app')
