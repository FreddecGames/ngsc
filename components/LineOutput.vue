<script setup>

    const props = defineProps([ 'output' ])

</script>

<template>
    <div class="col d-flex align-items-center justify-content-end" :title="$t(output.id)">
        <img class="me-1" :src="'/icons/' + output.id + '.png'" width="14" height="14" :alt="$t(output.id)" />
        <small class="text-success">+<format-number :value="output.count" /><small class="opacity-50"> /s</small></small>
    </div>
</template>
