<template>
    <button type="button" class="btn btn-primary d-flex align-items-center" :class="{ 'disabled text-danger':can != 0 }" @click="statue(itemId)">
        <img class="me-1" :src="require(`../assets/icons/statue.png`).default" width="12" height="12" :alt="$t('statue')" />
        <span v-if="can == 0">{{ $t('button-build') }}</span>
        <span v-if="can == -1">{{ $t('not-enough-resource') }}</span>
        <span v-if="[-2, -3, -4].includes(can)">{{ $t('error') }}</span>
    </button>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
    props: [ 'itemId' ],
    computed: {
    
        ...mapGetters([ 'canStatue' ]),
        
        can: function() { return this.canStatue(this.itemId) },
    },
    methods: {
    
        ...mapActions([ 'statue' ]),
    },
}
</script>