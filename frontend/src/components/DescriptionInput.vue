<template>
  <div>
    <label for="description" class="text-sm text-white text-left">
      Description
    </label>
    <div>
      <textarea id="description" :value="modelValue" @input="$emit('update:modelValue', $event.target.value)"
        placeholder="e.g. A C4 model diagramming and modelling tool for agile teams to align on technical decisions."
        class="resize-none block w-full rounded-md border-none px-3.5 py-2 text-white ring-inset ring-1 ring-shark-500 placeholder:text-shark-400 bg-shark-950 sm:text-sm sm:leading-6 focus:ring-spray-300"
        rows="2"></textarea>
      <p v-if="errorMessage" class="text-sm text-red-500" :class="{ 'text-red': errorMessage }">
        {{ errorMessage }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: ['modelValue', 'errorMessage'],
};
</script>
