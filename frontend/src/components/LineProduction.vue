<template>
    <div v-if="unlocked" class="col small">
        <div class="row gx-3 align-items-center">
            <div class="col">
                <span class="badge text-uppercase text-center me-1">{{ $t(level) }}</span>
                <span class="text-normal">{{ $t(itemId) }}</span>
            </div>
            <div class="col-auto">
                <span class="text-success">+<format-number :value="production" /></span>
                <small class="text-normal ms-1">/s</small>
            </div>
            <div class="col-auto">
                <button type="button" class="btn btn-success small" :class="{ 'disabled':can != 0 && can != -5 }" @click="build({ id:itemId, count:1 })">
                    <i class="fas fa-fw fa-plus-circle"></i>
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import FormatNumber from './FormatNumber.vue'

import { mapGetters, mapActions } from 'vuex'

export default {
    props: [ 'resId', 'itemId', 'level' ],
    components: {
        
        'format-number': FormatNumber,
    },
    computed: {
    
        ...mapGetters([ 'canBuild', 'isUnlocked', 'getItemProduction' ]),
        
        can: function() { return this.canBuild(this.itemId, 1) },
        
        unlocked: function() { return this.isUnlocked(this.itemId) },
        
        production: function() { return this.getItemProduction(this.itemId, this.resId) },
    },
    methods: {
    
        ...mapActions([ 'build' ]),
    },
}
</script>