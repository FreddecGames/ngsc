<template>
    <span v-if="count <= 0" class="text-normal"><format-number :value="count" /></span>
    <span v-if="count > 0" class="text-success">+<format-number :value="count" /></span>
</template>

<script>
import FormatNumber from './FormatNumber.vue'

import { mapGetters } from 'vuex'

export default {
    props: [ 'itemId' ],
    components: {
        
        'format-number': FormatNumber,
    },
    computed: {
    
        ...mapGetters([ 'getItemProd' ]),
        
        count: function() { return this.getItemProd(this.itemId).toPrecision(4) },
    },
}
</script>