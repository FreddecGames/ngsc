<template>
    <div v-if="unlocked && consumption > 0" class="col small">
        <div class="row gx-3 align-items-center">
            <div class="col">
                <span class="badge text-uppercase text-center me-1">{{ $t(level) }}</span>
                <span class="text-normal">{{ $t(res) }}</span>
            </div>
            <div class="col-auto">
                <span class="text-warning">-<format-number :value="consumption" /></span>
                <small class="text-normal ms-1">/s</small>
            </div>
            <div class="col-auto">
                <button type="button" class="btn btn-danger small" :class="{ 'disabled':!can }" @click="destroy({ id:itemId, count:1 })">
                    <i class="fas fa-fw fa-trash"></i>
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import FormatNumber from './FormatNumber.vue'

import { mapGetters, mapActions } from 'vuex'

export default {
    props: [ 'resId', 'itemId', 'level', 'res' ],
    components: {
        
        'format-number': FormatNumber,
    },
    computed: {
    
        ...mapGetters([ 'canDestroy', 'isUnlocked', 'getItemConsumption' ]),
        
        can: function() { return this.canDestroy(this.itemId, 1) },
        
        unlocked: function() { return this.isUnlocked(this.itemId) },
        
        consumption: function() { return this.getItemConsumption(this.itemId, this.resId) },
    },
    methods: {
    
        ...mapActions([ 'destroy' ]),
    },
}
</script>