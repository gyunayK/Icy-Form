<template>
  <div class="relative w-full max-w-lg bg-shark-950 p-10 rounded-md">
    <font-awesome-icon
      @click="prevStep"
      :icon="['fas', 'arrow-left']"
      class="absolute top-3 left-5 text-white text-md cursor-pointer hover:scale-125"
    />
    <h2 class="text-2xl font-semibold tracking-tight text-white">Technology choice request</h2>
    <form v-if="this.step == 1" @submit.prevent="handleUrlCheck" class="mt-6 flex flex-col gap-2">
      <div>
        <label :for="id" class="text-sm text-white"> Website URL </label>
        <div class="relative">
          <font-awesome-icon
            :icon="['fas', 'globe']"
            class="absolute left-0 top-0 ml-3 mt-3 text-shark-400"
          />
          <input
            :id="'website-url'"
            v-model="inputValue"
            :placeholder="'e.g. icepanel.io'"
            class="pl-10 w-full rounded-md border-0 px-3.5 py-2 text-white ring-1 ring-inset ring-shark-500 placeholder:text-shark-400 bg-shark-950 focus:ring-spray-300"
            @input="onChangeUrl($event.target.value)"
          />

          <p v-if="errorMessage" class="text-sm text-red-500" :class="{ 'text-red': errorMessage }">
            {{ errorMessage }}
          </p>
        </div>
      </div>

      <Upload
        @icon-uploaded="handleInitialIcon"
        @light-icon-changed="handleLightIconChanged"
        @dark-icon-changed="handleDarkIconChanged"
        :error-message="formErrors.lightIcon"
      />

      <div>
        <button
          type="submit"
          class="w-full flex justify-center items-center gap-2 rounded-md bg-spray-300 hover:bg-spray-200 py-2.5 text-sm font-semibold text-black shadow-sm"
        >
          <font-awesome-icon :icon="['fas', 'paper-plane']" />
          Check
        </button>
      </div>
    </form>

    <div v-if="step == 2" class="flex flex-col justify-center items-center">
      <img src="@/assets/loading.gif" alt="loadingGif" class="scale-50" />
      <!-- <span class="text-white text-lg">Generating Metadata...</span> -->
    </div>
    <div v-if="step == 3" class="mt-6 flex flex-col gap-2">
      <TechnologyNameInput
        v-model="form.technologyName"
        :error-message="formErrors.technologyName"
        @update:errorMessage="formErrors.technologyName = $event"
      />

      <UrlInput
        label="Docs URL"
        placeholder="e.g. docs.icepanel.io"
        id="docs-url"
        v-model="form.docsUrl"
        :error-message="formErrors.docsUrl"
      />
      <UrlInput
        label="Update URL"
        placeholder="e.g. icepanel.io/release-notes"
        id="docs-url"
        v-model="form.updateUrl"
        :error-message="formErrors.updateUrl"
      />
      <DescriptionTextarea v-model="form.description" :error-message="formErrors.description" />
      <color-dropdown v-model="form.theme" />
    </div>

    <!-- <UrlInput label="Change log" placeholder="e.g. icepanel.io/changelog" optional=true id="change-log"
                v-model="form.changeLogUrl" :error-message="formErrors.changeLogUrl" /> -->

    <!-- <C4ModelDropdown v-model="form.c4ModelAbstraction" :error-message="formErrors.c4ModelAbstraction" /> -->

    <!-- CheckBox -->
    <!-- <div>
        <label for="public-tech-choice" class="text-sm text-white">
          Available to all IcePanel customers
        </label>
        <div class="flex items-center mt-2">
          <div
            class="w-4 h-4 flex items-center justify-center rounded mr-2 cursor-pointer"
            :class="{ 'bg-spray-400': form.isPublic, 'bg-shark-700': !form.isPublic }"
            @click="form.isPublic = !form.isPublic"
          >
            <font-awesome-icon icon="check" class="text-black size-3" v-if="form.isPublic" />
          </div>

          <label for="public-tech-choice" class="text-sm text-white">Public tech choice</label>
        </div>
      </div> -->
  </div>
</template>

<script>
import TechnologyNameInput from './NameInput.vue'
import DescriptionTextarea from './DescriptionInput.vue'
import Upload from './Upload.vue'
import UrlInput from './UrlInput.vue'
import ColorDropdown from './ColorDropdown.vue'
import C4ModelDropdown from './C4ModelDropdown.vue'
import axios from 'axios'

import { technologyFormSchema } from '../utils/formValidationSchema'
import { ZodError } from 'zod'

export default {
  components: {
    Upload,
    UrlInput,
    ColorDropdown,
    TechnologyNameInput,
    DescriptionTextarea,
    C4ModelDropdown
  },

  data() {
    return {
      formErrors: {},
      step: 1,
      form: {
        technologyUrl: '',
        technologyName: '',
        description: '',
        updateUrl: '',
        brandColor: null,
        theme: { class: '', name: '' },
        lightIcon: null,
        darkIcon: null
        // changeLogUrl: '',
        // isPublic: true,
        // c4ModelAbstraction: '',
      }
    }
  },
  methods: {
    onChangeUrl(value) {
      this.technologyUrl = value
    },
    handleHomePage() {
      this.$router.push('/')
    },
    handleInitialIcon(file) {
      this.form.lightIcon = file
      this.form.darkIcon = file
    },
    handleLightIconChanged(file) {
      this.form.lightIcon = file
    },
    handleDarkIconChanged(file) {
      this.form.darkIcon = file
    },

    nextStep() {
      this.step++
    },
    prevStep() {
      this.step--
      switch (this.step) {
        case 0:
          this.$router.push('/')
          break
        case 2:
          this.step = 1
          break
      }
    },
    async handleUrlCheck() {
      this.nextStep()
      try {
        const response = await axios.post(import.meta.env.VITE_API_URL+'/api/form/technology', {
          url: this.technologyUrl
        })
        const data = JSON.parse(response.data.data.answer)
        if (data) {
          this.form.technologyName = data.name
          this.form.description = data.desc
          this.form.docsUrl = data.docs
          this.form.updateUrl = data.updateUrl
          this.form.theme.class = data.colourTheme.class
          this.form.theme.name = data.colourTheme.name
          this.nextStep()
        } else {
          this.prevStep()
        }
      } catch (error) {
        this.prevStep()
      }
    }

    // validateForm() {
    //   // Clear previous errors
    //   this.formErrors = {}

    //   let isValid = true

    //   // Zod schema validation
    //   const formData = {
    //     technologyName: this.form.technologyName,
    //     description: this.form.description,
    //     technologyUrl: this.form.technologyUrl,
    //     docsUrl: this.form.docsUrl || undefined,
    //     // changeLogUrl: this.form.changeLogUrl || undefined,
    //     // c4ModelAbstraction: this.form.c4ModelAbstraction,
    //     lightIcon: this.form.lightIcon
    //   }

    //   try {
    //     technologyFormSchema.parse(formData)
    //   } catch (error) {
    //     if (error instanceof ZodError) {
    //       error.errors.forEach((err) => {
    //         this.formErrors[err.path[0]] = err.message
    //       })
    //     }
    //     isValid = false
    //   }
    //   return isValid
    // },

    // submitForm() {
    //   if (!this.validateForm()) return
    //   const formData = this.generateFormData()
    //   this.sendFormData(formData)
    // },

    // generateFormData() {
    //   const formData = new FormData()
    //   Object.entries(this.form).forEach(([key, value]) => {
    //     formData.append(key, value)
    //   })
    //   return formData
    // },

    // sendFormData(formData) {
    //   axios
    //     .post('http://localhost:3000/api/form', formData, {
    //       headers: {
    //         'Content-Type': 'multipart/form-data',
    //       }
    //     })
    //     .then(() => {
    //       this.$router.push('/')
    //     })
    //     .catch((error) => {
    //       console.error('Submission error:', error.response.data)
    //     })
    // }
  }
}
</script>
