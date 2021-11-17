<template>
    <div v-if="unlocked && !done" class="col">
        <div class="row align-items-center gx-2">
            <div class="col text-truncate">
                <span class="badge text-uppercase text-center me-1">{{ $t(level) }}</span>
                <span>{{ $t(name) }}</span>
            </div>
            <div class="col-4">
                <line-cost v-if="cost" :cost="cost" />
            </div>
            <div class="col-auto">
                <button-build :itemId="itemId" count="1" btnText="button-research" class="lh-1" />
            </div>
        </div>
    </div>
</template>

<script>
import ButtonBuild from './ButtonBuild.vue'

import LineCost from './LineCost.vue'

import { mapGetters } from 'vuex'

export default {
    props: [ 'itemId', 'level', 'name' ],
    components: {
        
        'button-build': ButtonBuild,
        
        'line-cost': LineCost,
    },
    computed: {
        
        ...mapGetters([ 'getItemCount', 'isUnlocked', 'getBuildCosts' ]),
        
        done: function() { return this.getItemCount(this.itemId) >= 1 },
        unlocked: function() { return this.isUnlocked(this.itemId) },
        
        cost: function() { return this.getBuildCosts(this.itemId, 1)[0] },
    },
}
</script>