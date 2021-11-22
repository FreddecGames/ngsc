<template>
    <div v-if="unlocked && consumption > 0" class="col">
        <button type="button" class="small text-start w-100" @click="setActivePane(res + 'Pane');">
            <div class="row gx-3 align-items-center">
                <div class="col-auto d-flex pe-0">
                    <img :src="require(`../assets/icons/${res}.png`).default" width="12" height="12" :alt="$t(res)" />
                </div>
                <div class="col text-truncate">
                    <span class="badge text-uppercase text-center me-1">{{ $t(level) }}</span>
                    <small class="text-light me-1">x<format-number :value="count" /></small>
                    <span class="text-normal">{{ $t(itemId) }}</span>
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
        </button>
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
    
        ...mapGetters([ 'canDestroy', 'isUnlocked', 'getItemConsumption', 'getItemCount' ]),
        
        can: function() { return this.canDestroy(this.itemId, 1) },
        
        count: function() { return this.getItemCount(this.itemId) },
        
        unlocked: function() { return this.isUnlocked(this.itemId) },
        
        consumption: function() { return this.getItemConsumption(this.itemId, this.resId) },
    },
    methods: {
    
        ...mapActions([ 'setActivePane', 'destroy' ]),
    },
}
</script>