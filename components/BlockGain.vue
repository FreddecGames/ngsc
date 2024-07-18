<script setup>

    const props = defineProps([ 'itemId' ])
    
    import { useGameStore } from '~/store/game.js'
    
    const store = useGameStore()
    
    const selectedCount = ref(1)

    const counts = computed(() => { return store.getGainCounts(props.itemId) })
    const costs = computed(() => { return store.getGainCosts(props.itemId, selectedCount.value) })
    
</script>

<template>
    <div class="col">
    
        <div v-if="costs" class="row gy-2 gx-3 justify-content-end pb-2">
            <line-cost v-for="cost in costs" :key="cost" :cost="cost" />
        </div>

        <div class="row g-2 align-items-end">
        
            <div class="col">
                <div v-if="counts.length > 1" class="row g-1">
                    <div v-for="count in counts" :key="count" class="col-auto">
                        <input type="radio" class="btn-check" :id="'gain-' + itemId + '-' + count" autocomplete="off" v-model="selectedCount" :value="count" />
                        <label class="btn btn-badge" :for="'gain-' + itemId + '-' + count">+{{ count }}</label>
                    </div>
                </div>
            </div>
            
            <div class="col-auto">
                <button-gain :itemId="itemId" :count="selectedCount" />
            </div>
            
        </div>
        
    </div>
</template>
