<template>
    <div class="relative mb-4">
        <label for="c4-model-select" class="block mb-2 text-sm text-white">C4 model abstraction</label>
        <div class="text-sm rounded-lg w-full p-2.5 text-white ring-1 ring-inset ring-shark-500 relative bg-black">
            <div @click="toggleDropdown" class="flex gap-3 items-center justify-between cursor-pointer text-shark-400">
                <div class="flex gap-2 items-center">
                    <font-awesome-icon :icon="['fas', 'diagram-project']" />
                    <span :class="selectedModel ? 'text-white' : 'text-shark-400'">
                        {{ selectedModel ? selectedModel : 'Select an abstraction' }}
                    </span>
                </div>
                <font-awesome-icon :icon="['fas', 'caret-down']" :class="{ 'rotate-180': showDropdown }" />
            </div>
            <div v-show="showDropdown" class="absolute top-11 left-0 bg-neutral-700 w-full z-10 max-h-40 overflow-auto">
                <div v-for="model in c4ModelList" :key="model" @click="selectModel(model)"
                    class="p-2 cursor-pointer hover:bg-shark-500">
                    {{ model }}
                </div>
            </div>
        </div>
        <p v-show="errorMessage" class="text-sm text-red">
            {{ errorMessage }}
        </p>
    </div>
</template>

<script>
export default {
    props: ['errorMessage'],
    data() {
        return {
            showDropdown: false,
            selectedModel: null,
            c4ModelList: [
                "Person",
                "Software System",
                "Container",
                "Component"
            ]
        };
    },
    mounted() {
        document.addEventListener('click', this.handleOutsideClick);
    },
    beforeUnmount() {
        document.removeEventListener('click', this.handleOutsideClick);
    },
    methods: {
        toggleDropdown() {
            this.showDropdown = !this.showDropdown;
        },
        selectModel(model) {
            this.selectedModel = model;
            this.toggleDropdown();
            this.$emit('update:modelValue', model);
        },
        handleOutsideClick(event) {
            // Check if the click is outside the component
            if (!this.$el.contains(event.target)) {
                this.showDropdown = false;
            }
        }
    }
};
</script>