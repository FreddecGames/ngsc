<script setup>

    const props = defineProps([ 'descs' ])

</script>

<template>
    <div class="col">
        <div class="row row-cols-1 g-2">
            <div v-for="desc in descs" :key="desc" class="col small text-justify">
                <span>{{ $t(desc) }}</span>
            </div>
        </div>
    </div>
</template>
