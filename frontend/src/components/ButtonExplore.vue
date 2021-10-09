<template>
    <button type="button" class="btn btn-primary" :class="{ 'disabled text-danger':can != 0 }" @click="explore(itemId)">
        <span v-if="can == 0">{{ $t('button-explore') }}</span>
        <span v-if="can == -1">{{ $t('not-enough-resource') }}</span>
        <span v-if="[-2, -3, -4].includes(can)">{{ $t('error') }}</span>
    </button>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
    props: [ 'itemId' ],
    computed: {
    
        ...mapGetters([ 'canExplore' ]),
        
        can: function() { return this.canExplore(this.itemId) },
    },
    methods: {
    
        ...mapActions([ 'explore' ]),
    },
}
</script>