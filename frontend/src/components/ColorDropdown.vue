<template>
    <div class="relative mb-4 " ref="dropdownContainer">
        <label for="color-select" class="block mb-2 text-sm text-white">Brand colour<span
                class="text-shark-400 ml-1">(optional)</span></label>
        <div class="text-sm rounded-lg w-full p-2.5 text-white ring-1 ring-inset ring-shark-500  relative bg-black">
            <div @click="toggleDropdown" class="flex gap-3 items-center justify-between cursor-pointer text-shark-400">
                <div class="flex gap-2 items-center">
                    <font-awesome-icon :icon="['fas', 'palette']" :class="colorClass(selectedColor)" />
                    <span :class="selectedColor ? selectedColor.class : 'text-shark-400'">
                        {{ selectedColor ? selectedColor.name : 'Select colour' }}
                    </span>

                </div>
                <font-awesome-icon :icon="['fas', 'caret-down']" :class="{ 'rotate-180': showDropdown }" />
            </div>
            <div v-show="showDropdown" class="absolute top-11 left-0 bg-neutral-700 w-full z-10 max-h-40 overflow-auto">
                <div v-for="color in colorList" :key="color.name" @click="selectColor(color)"
                    class="flex gap-2 p-2 cursor-pointer hover:bg-shark-500">
                    <font-awesome-icon :icon="['fas', 'square']" :class="colorClass(color)" />
                    {{ color.name }}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import colorList from '@/utils/colorConstraints.ts';

export default {
    data() {
        return {
            showDropdown: false,
            selectedColor: null,
            colorList
        };
    },
    methods: {
        toggleDropdown() {
            this.showDropdown = !this.showDropdown;
        },
        selectColor(color) {
            this.selectedColor = color;
            this.toggleDropdown();
            this.$emit('update:modelValue', color);
        },
        colorClass(color) {
            return color ? color.class : 'text-gray-400';
        },
        handleClickOutside(event) {
            if (this.$refs.dropdownContainer && !this.$refs.dropdownContainer.contains(event.target)) {
                this.showDropdown = false;
            }
        },

    },
    mounted() {
        document.addEventListener('click', this.handleClickOutside);
    },
    beforeUnmount() {
        document.removeEventListener('click', this.handleClickOutside);
    },
};
</script>
