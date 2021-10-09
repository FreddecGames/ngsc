<template>
    <div class="col d-flex align-items-center justify-content-end" style="width: 85px;">
        <img class="me-1" :src="require(`../assets/icons/${output.id}.png`)" width="12" height="12" :alt="$t(output.id)" />
        <small class="text-success">+<format-number :value="output.count" /></small>
        <small class="ms-1">/s</small>
    </div>
</template>

<script>
import FormatNumber from './FormatNumber.vue'

export default {
    props: [ 'output' ],
    components: {
        
        'format-number': FormatNumber,
    },
}
</script>