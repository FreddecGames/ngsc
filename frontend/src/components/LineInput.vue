<template>
    <div class="col d-flex align-items-center justify-content-end" style="width: 85px;">
        <img class="me-1" :src="require(`../assets/icons/${input.id}.png`)" width="12" height="12" :alt="$t(input.id)" />
        <small :class="{ 'text-warning':input.count <= prod, 'text-danger':input.count > prod }">-<format-number :value="input.count" /></small>
        <small class="ms-1">/s</small>
    </div>
</template>

<script>
import FormatNumber from './FormatNumber.vue'

import { mapGetters } from 'vuex'

export default {
    props: [ 'input' ],
    components: {
        
        'format-number': FormatNumber,
    },
    computed: {
    
        ...mapGetters([ 'getItemProd' ]),
        
        prod: function() { return this.getItemProd(this.input.id) },
    },
}
</script>