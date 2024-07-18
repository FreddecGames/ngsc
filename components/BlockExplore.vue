<script setup>

    const props = defineProps([ 'itemId' ])

    import { useGameStore } from '~/store/game.js'
    
    const store = useGameStore()
    
    const costs = computed(() => { return store.getExploreCosts(props.itemId) })
    
</script>

<template>
    <div class="col">
    
        <div class="row gy-2 gx-3 justify-content-end" :class="{ 'row-cols-1':costs.length <= 1, 'row-cols-2':costs.length == 2, 'row-cols-3':costs.length >= 3 }">
            <line-cost v-for="cost in costs" :key="cost" :cost="cost" />
        </div>


        <div class="pt-2 row g-2 align-items-center justify-content-end">
        
            <div class="col-auto">
                <button-explore :itemId="itemId" />
            </div>
            
        </div>
        
    </div>
</template>
