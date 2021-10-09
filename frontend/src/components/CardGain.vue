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

<script>
import BlockDesc from './BlockDesc.vue'
import BlockGain from './BlockGain.vue'

import Card from './Card.vue'

export default {
    props: [ 'id', 'descs', 'itemId' ],
    components: {
        
        'block-desc': BlockDesc,
        'block-gain': BlockGain,

        'card': Card,
    },
}
</script>