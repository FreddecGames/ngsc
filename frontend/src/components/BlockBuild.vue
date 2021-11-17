<template>
    <div class="col">
        
        <div v-if="(!max || count < max) && costs" class="row gy-2 gx-3 justify-content-end" :class="{ 'row-cols-1':costs.length <= 1, 'row-cols-3':costs.length > 1 }">
            <line-cost v-for="cost in costs" :key="cost" :cost="cost" />
        </div>

        <div v-if="outputs" class="pt-3">
            <div class="row g-1">
                <div class="col">
                    <small class="text-muted">{{ $t('value-production') }}</small>
                </div>
                <div class="col-auto">
                    <div class="row gx-3">
                        <line-output v-for="output in outputs" :key="output.id" :output="output" />
                    </div>
                </div>
            </div>
        </div>
        
        <div v-if="inputs" class="pt-1">
            <div class="row g-1">
                <div class="col">
                    <small class="text-muted">{{ $t('value-consumption') }}</small>
                </div>
                <div class="col-auto">
                    <div class="row gx-3">
                        <line-input v-for="input in inputs" :key="input.id" :input="input" />
                    </div>
                </div>
            </div>
        </div>
        
        <div v-if="stats" class="pt-2">
            <div class="row g-1">
                <div class="col">
                    <small class="text-muted">{{ $t('value-stats') }}</small>
                </div>
                <div class="col-auto">
                    <div class="row gx-3">
                        <div class="col text-end">
                            <small class="text-success">+{{ stats.power }}</small>
                            <small class="ms-1">{{ $t('power') }}</small>
                        </div>
                        <div class="col text-end">
                            <small class="text-success">+{{ stats.defense }}</small>
                            <small class="ms-1">{{ $t('defense') }}</small>
                        </div>
                        <div class="col text-end">
                            <small class="text-success">+{{ stats.speed }}</small>
                            <small class="ms-1">{{ $t('speed') }}</small>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <div v-if="!max || count < max" class="pt-3 row g-2 align-items-center justify-content-end">
        
            <div v-if="counts.length > 1" class="col">
                <div class="row g-0">
                    <div v-for="count in counts" :key="count" class="col-auto">
                        <input type="radio" class="btn-check" :id="'build-' + itemId + '-' + count" autocomplete="off" v-model="selectedCount" :value="count" />
                        <label class="btn btn-badge px-1" :for="'build-' + itemId + '-' + count">
                            +{{ count }}
                            <small v-if="count == maxCount" class="ms-1">Max</small>
                            <small v-if="count == nextCount" class="ms-1">Next</small>
                        </label>
                    </div>
                    <div v-if="nextCount > 0 && !counts.includes(nextCount)" class="col-auto">
                        <input type="radio" class="btn-check" :id="'build-' + itemId + '-next'" autocomplete="off" v-model="selectedCount" :value="nextCount" />
                        <label class="btn btn-badge px-1" :for="'build-' + itemId + '-next'">+{{ nextCount }} <small class="ms-1">Next</small></label>
                    </div>
                    <div v-if="maxCount > 0 && !counts.includes(maxCount)" class="col-auto">
                        <input type="radio" class="btn-check" :id="'build-' + itemId + '-max'" autocomplete="off" v-model="selectedCount" :value="maxCount" />
                        <label class="btn btn-badge px-1" :for="'build-' + itemId + '-max'">+{{ maxCount }} <small class="ms-1">Max</small></label>
                    </div>
                </div>
            </div>
            
            <slot />
            
            <div class="col-auto">
                <button-build :itemId="itemId" :count="selectedCount" :btnText="btnText" @click="onBuild()" />
            </div>
            
        </div>
        
    </div>
</template>

<script>
import ButtonBuild from './ButtonBuild.vue'

import LineCost from './LineCost.vue'
import LineInput from './LineInput.vue'
import LineOutput from './LineOutput.vue'

import { mapGetters } from 'vuex'

export default {
    props: [ 'itemId', 'btnText' ],
    components: {
        
        'button-build': ButtonBuild,
        
        'line-cost': LineCost,
        'line-input': LineInput,
        'line-output': LineOutput,
    },
    data() {
        return {
        
            selectedCount: 1,
        }
    },
    created() {
    
        if (this.count >= this.max) this.selectedCount = this.max
    },
    computed: {
    
        ...mapGetters([ 'getBuildCounts', 'getBuildMaxCount', 'getBuildCosts', 'getItemInputs', 'getItemOutputs', 'getItemStats', 'getItemMax', 'getItemCount', 'getBuildNextCount' ]),
        
        max: function() { return this.getItemMax(this.itemId) },
        count: function() { return this.getItemCount(this.itemId) },
        counts: function() {
        
            let result = []
            let temp = this.getBuildCounts(this.itemId)
            for (let i in temp) {
                let item = temp[i]
                if (!this.max || this.count + item <= this.max) result.push(item)
            }
            return result
        },
        
        costs: function() { return this.getBuildCosts(this.itemId, this.selectedCount) },
        stats: function() { return this.getItemStats(this.itemId, this.selectedCount) },
        inputs: function() { return this.getItemInputs(this.itemId, this.selectedCount) },
        outputs: function() { return this.getItemOutputs(this.itemId, this.selectedCount) },
        
        maxCount: function() { return this.getBuildMaxCount(this.itemId) },
        nextCount: function() { return this.getBuildNextCount(this.itemId) },
    },
    methods: {
    
        onBuild: function() {
            if (!this.counts.includes(this.selectedCount) && this.selectedCount != this.maxCount)
                this.selectedCount = this.counts[0]
        },
    },
}
</script>