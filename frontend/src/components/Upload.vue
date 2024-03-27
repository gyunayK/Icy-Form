<template>
    <div>
        <div class="flex justify-between">
            <h1 class="text-sm leading-6 text-white">Icon</h1>
            <!-- Reset button shows only when any image is uploaded -->
            <div v-if="lightIcon || darkIcon" class="text-shark-400 space-x-1 cursor-pointer hover:text-shark-300"
                @click="resetFile">
                <span>Reset</span>
                <font-awesome-icon :icon="['fas', 'rotate-left']" />
            </div>
        </div>
        <div class="relative block w-full rounded-lg border border-dashed bg-shark-900 p-8 text-center focus:outline-none"
            :class="{ 'border-[#1BCBF5]': isDragOver, 'border-shark-500': !isDragOver, 'border-rose-500': fileTooLarge }"
            @dragover.prevent="dragOver" @dragenter.prevent="dragEnter" @dragleave.prevent="dragLeave"
            @drop.prevent="onFileDrop">
            <!-- Original input for uploading the image; it's hidden and can be triggered by the buttons below -->
            <input ref="fileInput" type="file" accept=".svg, .png, .jpeg" class="hidden" @change="onFileChange" />
            <!-- Instructions to user for dragging and dropping an image -->
            <div v-if="!lightIcon && !darkIcon" class="text-shark-400 text-sm space-y-2 max-w-60 mx-auto">
                <p>Drag and drop image here</p>
                <p>Format: SVG / PNG / JPEG</p>
                <button type="button" @click="openFileDialog"
                    class="bg-shark-600 hover:bg-shark-500 p-2 w-full rounded-md text-white">
                    Click to choose image
                </button>
            </div>
            <!-- Image preview sections -->
            <div class="flex justify-center gap-4" v-if="lightIcon || darkIcon">
                <!-- Light mode preview; shows either the selected light image or the original upload -->
                <div>
                    <h1 class="text-sm text-shark-400">Light mode version</h1>
                    <div class="w-48 h-32 bg-white flex items-center justify-center rounded-md">
                        <img :src="lightIcon" class="h-20 w-full object-contain" alt="Light mode preview" />
                    </div>
                    <input type="file" @change="onLightIconChange" class="hidden" ref="lightInput"
                        accept=".svg, .png, .jpeg" />
                    <button type="button" @click="triggerLightInput"
                        class="bg-shark-600 hover:bg-shark-500 p-2 w-full rounded-md text-white mt-2">
                        Change light icon
                    </button>
                </div>
                <!-- Dark mode preview; shows either the selected dark image or the original upload -->
                <div>
                    <h1 class="text-sm text-shark-400">Dark mode version</h1>
                    <div class="w-48 h-32 bg-gray-900 flex items-center justify-center rounded-md">
                        <img :src="darkIcon" class="h-20 w-full object-contain" alt="Dark mode preview" />
                    </div>
                    <input type="file" @change="onDarkIconChange" class="hidden" ref="darkInput"
                        accept=".svg, .png, .jpeg" />
                    <button type="button" @click="triggerDarkInput"
                        class="bg-shark-600 hover:bg-shark-500 p-2 w-full rounded-md text-white mt-2">
                        Change dark icon
                    </button>
                </div>
            </div>
        </div>
        <!-- File size warning message -->
        <p class="text-sm" :class="{ 'text-shark-400': !fileTooLarge, 'text-red': fileTooLarge }">
            {{ fileTooLarge ? 'Your file size is too big. Max file size: 5mb' : 'Max file size: 5mb' }}
        </p>
        <!-- Error message from parent component -->
        <p v-if="errorMessage" class="text-sm text-red">
            {{ errorMessage }}

        </p>
    </div>
</template>

<script>
export default {
    props: ['errorMessage'],

    data() {
        return {
            isDragOver: false,
            fileTooLarge: false,
            lightIcon: null,
            darkIcon: null,
        };
    },
    methods: {
        openFileDialog() {
            this.$refs.fileInput.click();
        },
        resetFile() {
            this.lightIcon = null;
            this.darkIcon = null;
            this.$refs.fileInput.value = '';
            this.$refs.lightInput.value = '';
            this.$refs.darkInput.value = '';
            this.fileTooLarge = false;
        },
        dragOver() {
            this.isDragOver = true;
        },
        dragEnter() {
            this.isDragOver = true;
        },
        dragLeave() {
            this.isDragOver = false;
        },
        onFileDrop(event) {
            const files = event.dataTransfer.files;
            this.handleFiles(files);
            this.isDragOver = false;
        },
        onFileChange(event) {
            const files = event.target.files;
            this.handleFiles(files);
        },
        handleFiles(files) {
            if (files.length > 0) {
                const file = files[0];
                if (file.size <= 5000000) { // 5mb
                    this.lightIcon = URL.createObjectURL(file);
                    this.darkIcon = URL.createObjectURL(file);
                    this.fileTooLarge = false;
                    this.$emit('icon-uploaded', file);
                } else {
                    this.fileTooLarge = true;
                }
            }
        },
        triggerLightInput() {
            this.$refs.lightInput.click();
        },
        onLightIconChange(event) {
            const file = event.target.files[0];
            if (file && file.size <= 5000000) { // 5mb limit
                this.lightIcon = URL.createObjectURL(file);
                this.$emit('light-icon-changed', file);
                this.fileTooLarge = false;
            } else {
                this.fileTooLarge = true;
            }
        },
        triggerDarkInput() {
            this.$refs.darkInput.click();
        },
        onDarkIconChange(event) {
            const file = event.target.files[0];
            if (file && file.size <= 5000000) { // 5mb limit
                this.darkIcon = URL.createObjectURL(file);
                this.$emit('dark-icon-changed', file);
                this.fileTooLarge = false;
            } else {
                this.fileTooLarge = true;
            }
        }
    },
};
</script>
