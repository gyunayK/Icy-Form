<template>
    <div class="bg-shark-950 w-full h-full md:h-min p-10 rounded-md max-w-lg">
        <h1 class="text-3xl text-white font-semibold mb-5">Your technology requests</h1>
        <button @click="handleNewRequest"
            class="bg-spray-300 hover:bg-spray-200 text-black font-bold py-2 px-4 rounded mb-5 w-full">
            <font-awesome-icon :icon="['fas', 'plus']" /> New request
        </button>
        <div class="flex justify-between text-lg font-semibold text-shark-400 mb-1">
            <h1>
                Technology Name
            </h1>
            <span>
                Status
            </span>
        </div>

        <div v-for="request in requests" :key="request._id"
            class="flex justify-between items-center py-2 px-3 mb-2 bg-shark-900 rounded-md">
            <span class="text-white text-lg">{{ request.technologyName }}</span>
            <span :class="statusClass(request.status)" class="border  px-2 rounded-full">
                {{ request.status }}
            </span>
        </div>

        <div v-if="requests.length === 0" class="text-shark-300 text-center mt-5">
            You haven't made any requests yet.
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            requests: [],
        };
    },
    created() {
        this.fetchRequests();
    },
    methods: {
        handleNewRequest() {
            this.$router.push('/form');
        },
        fetchRequests() {
            axios.get('http://localhost:3000/api/form')
                .then(response => {
                    this.requests = response.data;
                })
                .catch(error => {
                    console.error('There was an error fetching the requests:', error);
                });
        },
        statusClass(status) {
            return {
                'text-green border-green bg-green-10': status === 'Approved',
                'text-yellow border-yellow bg-yellow-10': status === 'Pending approval',
                'text-red border-red bg-red-10': status === 'Rejected',
            };
        },
    },
};
</script>
