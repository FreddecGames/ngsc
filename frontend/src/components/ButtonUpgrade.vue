<template>
    <button type="button" class="btn btn-primary" :class="{ 'disabled text-danger':can != 0 }" @click="upgrade({ id:itemId, count:count })">
        <span v-if="can == 0">{{ $t('button-upgrade') }}</span>
        <span v-if="can == -1">{{ $t('not-enough-resource') }}</span>
        <span v-if="[-2, -3, -4].includes(can)">{{ $t('error') }}</span>
    </button>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
    props: [ 'itemId', 'count' ],
    computed: {
    
        ...mapGetters([ 'canUpgrade' ]),
        
        can: function() { return this.canUpgrade(this.itemId, this.count) },
    },
    methods: {
    
        ...mapActions([ 'upgrade' ]),
    },
}
</script>