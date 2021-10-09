<template>
    <span v-if="storage" :class="{ 'text-light':count < storage, 'text-success':count >= storage }"><format-number :value="count" /></span>
    <span v-if="!storage" class="text-light"><format-number :value="count" /></span>
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
    
        ...mapGetters([ 'getItemCount', 'getItemStorage' ]),
        
        count: function() { return this.getItemCount(this.itemId) },
        storage: function() { return this.getItemStorage(this.itemId) },
    },
}
</script>