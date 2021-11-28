<template>
    <div v-if="unlocked" class="col">
        <div class="row align-items-center gx-2">
            <div class="col text-truncate">
                <img class="me-1" :src="require(`../assets/icons/${icon}`).default" width="12" height="12" :alt="$t(name)" />
                <span>{{ $t(name) }}</span>
            </div>
            <div class="col-auto">
                <small class="text-success">+{{ count }}%</small>
            </div>
            <div class="col-4">
                <line-cost v-if="cost" :cost="cost" />
            </div>
            <div class="col-auto">
                <button type="button" class="btn btn-success small" :class="{ 'disabled':can != 0 && can != -5 }" @click="build({ id:itemId, count:scienceBoostCount })">
                    <i class="fas fa-fw fa-plus-circle"></i>
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import LineCost from './LineCost.vue'

import { mapState, mapGetters, mapActions } from 'vuex'

export default {
    props: [ 'itemId', 'icon', 'name' ],
    components: {
        
        'line-cost': LineCost,
    },
    computed: {
        
        ...mapState([ 'scienceBoostCount' ]),
        
        ...mapGetters([ 'getItemCount', 'isUnlocked', 'getBuildCosts', 'canBuild' ]),
        
        can: function() { return this.canBuild(this.itemId, this.scienceBoostCount) },
        cost: function() { return this.getBuildCosts(this.itemId, this.scienceBoostCount)[0] },
        count: function() { return this.getItemCount(this.itemId) },
        unlocked: function() { return this.isUnlocked(this.itemId) },
    },
    methods: {
    
        ...mapActions([ 'build' ]),
    },
}
</script>