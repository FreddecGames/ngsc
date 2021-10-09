<template>
    <span class="text-light"><format-number :value="count" /></span>
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
    
        ...mapGetters([ 'getItemUpgrade' ]),
        
        count: function() { return this.getItemUpgrade(this.itemId) },
    },
}
</script>