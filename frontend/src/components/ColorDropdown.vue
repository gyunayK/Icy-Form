<template>
  <div ref="dropdownContainer">
    <label for="color-select" class="text-sm text-white">
      Brand colour
      <!-- <span class="text-shark-400 ml-1">(optional)</span> -->
    </label>
    <div
      class="text-sm rounded-lg w-full p-2.5 text-white ring-1 ring-inset ring-shark-500 relative"
      :class="computedBackgroundColor"
    >
      <div
        @click="toggleDropdown"
        class="flex gap-3 items-center justify-between cursor-pointer text-shark-400"
      >
        <div class="flex gap-2 items-center">
          <font-awesome-icon
            :icon="['fas', 'palette']"
            :class="computedTextColor"
            :style="computedTextStyle"
          />
          <span :class="computedTextColor" :style="computedTextStyle">
            {{ selectedColor ? selectedColor.name : 'Select colour' }}
          </span>
        </div>
        <font-awesome-icon :icon="['fas', 'caret-down']" :class="{ 'rotate-180': showDropdown }" />
      </div>
      <div
        v-show="showDropdown"
        class="absolute top-11 left-0 ring-1 ring-inset ring-shark-500 rounded-b-md bg-neutral-700 w-full z-10 max-h-40 overflow-auto"
      >
        <div
          v-for="color in colorList"
          :key="color.name"
          @click="selectColor(color)"
          class="flex gap-2 p-2 cursor-pointer hover:bg-shark-500"
        >
          <font-awesome-icon
            :icon="['fas', 'square']"
            :class="color.class"
            :style="{ color: color.class }"
          />
          {{ color.name }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import colorList from '@/utils/colorConstraints.ts'

export default {
  props: ['modelValue'],
  data() {
    return {
      showDropdown: false,
      selectedColor: null,
      colorList
    }
  },
  computed: {
    computedBackgroundColor() {
      const darkColors = ['dark', 'black']
      if (
        this.selectedColor &&
        darkColors.some((color) => this.selectedColor.name.toLowerCase().includes(color))
      ) {
        return 'bg-shark-200'
      }
      return 'bg-shark-950'
    },
    computedColorStyle() {
      if (this.selectedColor && this.selectedColor.class) {
        if (this.selectedColor.class.startsWith('#')) {
          return { color: this.selectedColor.class }
        }
        if (this.selectedColor.class.startsWith('text')) {
          return {}
        }
      }
      return {}
    },
    computedTextColor() {
      if (this.selectedColor.class && this.selectedColor.class.startsWith('text')) {
        return this.selectedColor.class
      }
      return 'text-shark-400'
    },
    computedTextStyle() {
      if (this.selectedColor.class && this.selectedColor.class.startsWith('#')) {
        return { color: this.selectedColor.class }
      }
      return {}
    }
  },
  methods: {
    toggleDropdown() {
      this.showDropdown = !this.showDropdown
    },
    selectColor(color) {
      this.selectedColor = color
      this.toggleDropdown()
      this.$emit('update:modelValue', color)
    },
    handleClickOutside(event) {
      if (this.$refs.dropdownContainer && !this.$refs.dropdownContainer.contains(event.target)) {
        this.showDropdown = false
      }
    }
  },
  watch: {
    modelValue: {
      immediate: true,
      handler(newVal) {
        this.selectedColor = newVal
        //if the new value .name dosnt exist in the color list add it
        let exists = this.colorList.find((color) => color.name === newVal.name)

        if (!exists) {
          this.colorList.unshift(newVal)
        }
      }
    }
  },
  mounted() {
    document.addEventListener('click', this.handleClickOutside)
  },
  beforeUnmount() {
    document.removeEventListener('click', this.handleClickOutside)
  }
}
</script>
