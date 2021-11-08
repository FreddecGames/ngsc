<template>
    <button type="button" class="btn btn-primary" :class="{ 'disabled text-danger':can != 0 && can != -5 }" @click="build({ id:itemId, count:count })">
        <span v-if="can == 0 || can == -5">{{ $t(btnText) }}</span>
        <span v-if="can == -1">{{ $t('not-enough-resource') }}</span>
        <span v-if="can == -2">{{ $t('too-much-consumption') }}</span>
        <span v-if="[-3, -4].includes(can)">{{ $t('error') }} {{ can }}</span>
        <span v-if="can == -6">{{ $t('full') }}</span>
        <span v-if="can == -7">{{ $t('too-many') }}</span>
    </button>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
    props: [ 'itemId', 'count', 'btnText' ],
    computed: {
    
        ...mapGetters([ 'canBuild' ]),
        
        can: function() { return this.canBuild(this.itemId, this.count) },
    },
    methods: {
    
        ...mapActions([ 'build' ]),
    },
}
</script>