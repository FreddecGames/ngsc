<template>
    <card v-if="unlocked && emcUnlocked" :id="id" name="card-title-convert">
        <template v-slot:col-1>
        
            <block-desc :descs="descs" />
        
        </template>
        <template v-slot:col-2>
        
            <block-convert :itemId="itemId" />

        </template>
    </card>
</template>

<script>
import BlockConvert from './BlockConvert.vue'
import BlockDesc from './BlockDesc.vue'

import Card from './Card.vue'

import { mapGetters } from 'vuex'

export default {
    props: [ 'id', 'descs', 'itemId' ],
    components: {
        
        'block-convert': BlockConvert,
        'block-desc': BlockDesc,
        
        'card': Card,
    },
    computed: {
    
        ...mapGetters([ 'getItemCount', 'isUnlocked' ]),

        unlocked: function() { return this.isUnlocked(this.itemId) },
        emcUnlocked: function() { return this.getItemCount('missionEmc') >= 1 },
    },
}
</script>