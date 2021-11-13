<template>
    <button type="button" class="btn btn-primary" :class="{ 'disabled text-danger':can != 0 }" @click="gain({ id:itemId, count:count })">
        <span v-if="can == 0">{{ $t('button-gain') }}</span>
        <span v-if="can == -1">{{ $t('not-enough-resource') }}</span>
        <span v-if="[-2, -3, -4].includes(can)">{{ $t('error') }}</span>
        <span v-if="can == -5">{{ $t('full') }}</span>
        <span v-if="can == -6">{{ $t('full') }}</span>
    </button>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
    props: [ 'itemId', 'count' ],
    computed: {
    
        ...mapGetters([ 'canGain' ]),
        
        can: function() { return this.canGain(this.itemId, this.count) },
    },
    methods: {
    
        ...mapActions([ 'gain' ]),
    },
}
</script>