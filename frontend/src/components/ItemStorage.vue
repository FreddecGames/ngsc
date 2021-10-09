<template>
    <format-number :value="count" />
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
    
        ...mapGetters([ 'getItemStorage' ]),
        
        count: function() { return this.getItemStorage(this.itemId).toPrecision(4) },
    },
}
</script>