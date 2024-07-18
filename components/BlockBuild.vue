<script setup>

    const props = defineProps([ 'itemId', 'btnText' ])

    import { useGameStore } from '~/store/game.js'
    
    const store = useGameStore()
    
    const max = computed(() => { return store.getItemMax(props.itemId) })
    const counts = computed(() => { return store.getBuildCounts(props.itemId) })
    
    const maxCount = computed(() => { return store.getBuildMaxCount(props.itemId) })
    const nextCount = computed(() => { return store.getBuildNextCount(props.itemId) })
    const currentCount = computed(() => { return store.getItemCount(props.itemId) })
    
    const selectedCount = ref(1)
    
    const realCount = computed(() => {

        let res = 0

        if (selectedCount.value == 'next') res = nextCount.value
        else if (selectedCount.value == 'max') res = maxCount.value
        else res = selectedCount.value
        
        return res
    })
    
    const costs = computed(() => { return store.getBuildCosts(props.itemId, realCount.value) })        
    const stats = computed(() => { return store.getItemStats(props.itemId, realCount.value) })
    const inputs = computed(() => { return store.getItemInputs(props.itemId, realCount.value) })            
    const outputs = computed(() => { return store.getItemOutputs(props.itemId, realCount.value) })

</script>

<template>
    <div v-if="!max || currentCount < max" class="col">
        
        <div v-if="stats">
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
        
        <div v-if="outputs">
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
        
        <div v-if="inputs" class="pt-3">
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
        
        <div v-if="costs" class="pt-3">
            <div class="row gy-3 gx-3 justify-content-end">
                <div class="col">
                    <small class="text-muted">{{ $t('value-costs') }}</small>
                </div>
                <line-cost v-for="cost in costs" :key="cost" :cost="cost" />
            </div>
        </div>
        
        <div class="pt-3 row g-2 align-items-center justify-content-end">
                    
            <slot />
            
            <div class="col">
                <div v-if="counts.length > 1" class="row g-0 justify-content-end">
                    <div v-for="count in counts" :key="count" class="col-auto">
                        <input type="radio" class="btn-check" :id="'build-' + itemId + '-' + count" autocomplete="off" v-model="selectedCount" :value="count" />
                        <label class="btn btn-badge" :for="'build-' + itemId + '-' + count">
                            +{{ count }}
                        </label>
                    </div>
                    <div v-if="nextCount > 0" class="col-auto">
                        <input type="radio" class="btn-check" :id="'build-' + itemId + '-next'" autocomplete="off" v-model="selectedCount" :value="'next'" />
                        <label class="btn btn-badge align-items-baseline" :for="'build-' + itemId + '-next'">Next <small class="ms-1">+{{ nextCount }}</small></label>
                    </div>
                    <div v-if="maxCount > 0" class="col-auto">
                        <input type="radio" class="btn-check" :id="'build-' + itemId + '-max'" autocomplete="off" v-model="selectedCount" :value="'max'" />
                        <label class="btn btn-badge align-items-baseline" :for="'build-' + itemId + '-max'">Max <small class="ms-1">+{{ maxCount }}</small></label>
                    </div>
                </div>
            </div>
            
            <div class="col-auto">
                <button-build :itemId="itemId" :count="realCount" :btnText="btnText" />
            </div>
            
        </div>
        
    </div>
</template>
