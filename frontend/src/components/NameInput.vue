<template>
  <div>
    <label for="technology-name" class="text-sm text-white text-left"> Technology name </label>
    <div class="relative">
      <input
        type="text"
        id="technology-name"
        :value="modelValue"
        placeholder="Your technology name"
        @blur="$event.target.value;"
        class="w-full rounded-md border-0 pl-3.5 pr-10 py-2 text-white ring-inset ring-1 ring-shark-500 placeholder:text-shark-400 bg-shark-950 sm:text-sm focus:ring-spray-300"
      />
      <font-awesome-icon
        v-if="inputError === 'User Not Exist'"
        :icon="['fas', 'circle-check']"
        class="absolute right-3 top-1/2 transform -translate-y-1/2 text-green"
      />
      <font-awesome-icon
        v-if="inputError === 'User Exist'"
        :icon="['fas', 'xmark']"
        class="absolute right-3 top-1/2 transform -translate-y-1/2 text-red"
      />
    </div>
    <p
      v-if="errorMessage"
      class="text-sm"
      :class="{
        'text-red': inputError === 'zod' || inputError === 'User Exist',
        'text-green': inputError === 'User Not Exist'
      }"
    >
      {{ errorMessage }}
    </p>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  props: ['modelValue', 'errorMessage', 'errorType'],
  emits: ['update:modelValue', 'update:errorMessage'],

  data() {
    return {
      inputError: 'zod',
      url: ''
    }
  },
  methods: {
    async handleInputChange(value) {
      this.$emit('update:modelValue', value)

      if (!value) {
        this.$emit('update:errorMessage', '')
        this.inputError = 'zod'
        return
      }
      try {
        const response = await axios.post('http://localhost:3000/api/form/technology/name', {
          url: value
        })
        if (response.data.exists) {
          this.$emit('update:errorMessage', 'This already exists!')
          this.inputError = 'User Exist'
        } else {
          this.$emit('update:errorMessage', 'Cool - this hasn’t been added yet!')
          this.inputError = 'User Not Exist'
        }
      } catch (error) {
        console.error('Error checking technology name:', error)
        this.$emit('update:errorMessage', 'An error occurred while checking the technology name.')
        this.inputError = true
      }
    },
    async handleUrlCheck(value) {
      try {
        const response = await axios.post('http://localhost:3000/api/form/technology/', {
          url: value
        })

        console.log(response.data)
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>
