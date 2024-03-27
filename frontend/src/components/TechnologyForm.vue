<template>
    <div class="relative w-full h-min max-w-lg bg-shark-950 p-10 rounded-md">
        <font-awesome-icon @click="handleHomePage" :icon="['fas', 'arrow-left']"
            class="absolute top-3 right-5 text-white text-2xl cursor-pointer hover:scale-125" />
        <h2 class="text-2xl font-semibold tracking-tight text-white">
            Technology choice request
        </h2>
        <form @submit.prevent="submitForm" class="mt-5 space-y-6">
            <TechnologyNameInput v-model="form.technologyName" :error-message="formErrors.technologyName"
                @update:errorMessage="formErrors.technologyName = $event" />

            <DescriptionTextarea v-model="form.description" :error-message="formErrors.description" />

            <Upload @icon-uploaded="handleInitialIcon" @light-icon-changed="handleLightIconChanged"
                @dark-icon-changed="handleDarkIconChanged" :error-message="formErrors.lightIcon" />

            <UrlInput label="Website URL" placeholder="e.g. icepanel.io" id="website-url" v-model="form.websiteURL"
                :error-message="formErrors.websiteURL" />
            <UrlInput label="Docs URL" placeholder="e.g. docs.icepanel.io" optional=true id="docs-url"
                v-model="form.docsUrl" :error-message="formErrors.docsUrl" />
            <UrlInput label="Change log" placeholder="e.g. icepanel.io/changelog" optional=true id="change-log"
                v-model="form.changeLogUrl" :error-message="formErrors.changeLogUrl" />

            <color-dropdown v-model="form.brandColor" />
            <C4ModelDropdown v-model="form.c4ModelAbstraction" :error-message="formErrors.c4ModelAbstraction" />

            <!-- CheckBox -->
            <div>
                <label for="public-tech-choice" class="text-sm text-white">
                    Available to all IcePanel customers
                </label>
                <div class="flex items-center mt-2">
                    <div class="w-4 h-4 flex items-center justify-center rounded mr-2 cursor-pointer"
                        :class="{ 'bg-spray-400': form.isPublic, 'bg-shark-700': !form.isPublic }"
                        @click="form.isPublic = !form.isPublic">
                        <font-awesome-icon icon="check" class="text-black size-3" v-if="form.isPublic" />
                    </div>

                    <label for="public-tech-choice" class="text-sm text-white">Public tech choice</label>
                </div>
            </div>
            <!-- Submit Button -->
            <div class="mt-10">
                <button type="submit"
                    class="w-full flex justify-center items-center gap-2 rounded-md bg-spray-300 hover:bg-spray-200 py-2.5 text-sm font-semibold text-black shadow-sm">
                    <font-awesome-icon :icon="['fas', 'paper-plane']" />
                    Request tech choice
                </button>
            </div>
        </form>
    </div>
</template>

<script>
import axios from 'axios';
import TechnologyNameInput from './NameInput.vue';
import DescriptionTextarea from './DescriptionInput.vue';
import Upload from './Upload.vue';
import UrlInput from './UrlInput.vue';
import ColorDropdown from './ColorDropdown.vue';
import C4ModelDropdown from './C4ModelDropdown.vue';

import {
    technologyFormSchema
} from '../utils/formValidationSchema';

import {
    ZodError
} from 'zod';

export default {
    components: {
        Upload,
        UrlInput,
        ColorDropdown,
        TechnologyNameInput,
        DescriptionTextarea,
        C4ModelDropdown,
    },
    data() {
        return {
            formErrors: {},
            form: {
                technologyName: '',
                description: '',
                websiteURL: '',
                docsUrl: '',
                changeLogUrl: '',
                brandColor: '',
                isPublic: true,
                c4ModelAbstraction: '',
                lightIcon: null,
                darkIcon: null,
            },
        };
    },
    methods: {
        handleHomePage() {
            this.$router.push('/');
        },
        handleInitialIcon(file) {
            this.form.lightIcon = file;
            this.form.darkIcon = file;
        },
        handleLightIconChanged(file) {
            this.form.lightIcon = file;
        },
        handleDarkIconChanged(file) {
            this.form.darkIcon = file;
        },
        validateForm() {
            // Clear previous errors
            this.formErrors = {};

            let isValid = true;

            // Zod schema validation
            const formData = {
                technologyName: this.form.technologyName,
                description: this.form.description,
                websiteURL: this.form.websiteURL,
                docsUrl: this.form.docsUrl || undefined,
                changeLogUrl: this.form.changeLogUrl || undefined,
                c4ModelAbstraction: this.form.c4ModelAbstraction,
                lightIcon: this.form.lightIcon,
            };

            try {
                technologyFormSchema.parse(formData);
            } catch (error) {
                if (error instanceof ZodError) {
                    error.errors.forEach((err) => {
                        this.formErrors[err.path[0]] = err.message;
                    });
                }
                isValid = false;
            }

            return isValid;
        },

        submitForm() {
            if (!this.validateForm()) {
                // Stop the form submission if validation failed
                return;
            }
            const formData = this.generateFormData();
            this.sendFormData(formData);
        },

        generateFormData() {
            const formData = new FormData();
            Object.entries(this.form).forEach(([key, value]) => {
                formData.append(key, value);
            });
            return formData;
        },

        sendFormData(formData) {
            axios.post('http://localhost:3000/api/form', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
                .then(() => {
                    this.$router.push('/');
                })
                .catch((error) => {
                    console.error('Submission error:', error.response.data);
                });
        },
    },
};
</script>
