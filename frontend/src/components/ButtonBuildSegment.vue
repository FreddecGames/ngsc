<template>
    <button type="button" class="btn btn-primary" :class="{ 'disabled text-danger':can != 0 }" @click="onBuild()">
        <span>{{ $t(btnText) }}</span>
    </button>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
    props: [ 'itemId', 'count', 'priceFuel', 'btnText' ],
    computed: {
    
        ...mapGetters([ 'getItemCount', 'getBuildMaxCount', 'getItemMax' ]),
        
        can: function() {
        
            let max = this.getItemMax(this.itemId)
            let count = this.getItemCount(this.itemId)
            if (max && count >= max) return -6
            
            let segmentCount = this.getItemCount('segment')
            let segmentMaxBuild = this.getBuildMaxCount('segment')
            if (!segmentMaxBuild) return -1
            
            if (segmentCount + segmentMaxBuild < this.count) return -1
            
            let fuelCount = this.getItemCount('fuel')
            if (fuelCount >= this.priceFuel) return 0
            else return -1
        },
    },
    methods: {
    
        ...mapActions([ 'updateCanBuild', 'build' ]),
        
        onBuild() {
        
            let segmentCount = this.getItemCount('segment')
            let segmentToBuildCount = Math.max(this.count - segmentCount, 0)
            
            if (segmentToBuildCount > 0) this.build({ id:'segment', count:segmentToBuildCount }).then(() => { this.updateCanBuild(this.itemId).then(() => { this.build({ id:this.itemId, count:1 }) }) })
            else this.build({ id:this.itemId, count:1 })
        },
    },
}
</script>