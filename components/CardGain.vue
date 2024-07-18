<script setup>

    const props = defineProps([ 'id', 'descs', 'itemId' ])

</script>

<template>
    <card :id="id" name="card-title-gain">
        <template v-slot:col-1>
        
            <block-desc :descs="descs" />
        
        </template>
        <template v-slot:col-2>
        
            <block-gain :itemId="itemId" />

        </template>
    </card>
</template>
