<template>
  <div>
    <label :for="id" class="text-sm leading-6 text-white text-left">
      {{ label }} <span v-if="optional" class="text-shark-400">(optional)</span>
    </label>
    <div class="relative">
      <font-awesome-icon
        :icon="['fas', 'globe']"
        class="absolute left-0 top-0 ml-3 mt-3 text-shark-400"
      />
      <input
        :id="id"
        v-model="inputValue"
        @input="$emit('update:modelValue', inputValue)"
        :placeholder="placeholder"
        class="pl-10 w-full rounded-md border-0 px-3.5 py-2 text-white ring-1 ring-inset ring-shark-500 placeholder:text-shark-400 bg-shark-950 focus:ring-spray-300"
      />

      <p v-if="errorMessage" class="text-sm text-red-500" :class="{ 'text-red': errorMessage }">
        {{ errorMessage }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: ['modelValue', 'label', 'placeholder', 'optional', 'id', 'errorMessage'],
  emits: ['update:modelValue'],
  data() {
    return {
      inputValue: this.modelValue
    }
  },

  methods: {
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
