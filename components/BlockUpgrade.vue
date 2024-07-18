<script setup>

    const props = defineProps([ 'itemId' ])

    import { useGameStore } from '~/store/game.js'
    
    const store = useGameStore()
    
    const { addAutoStorageId, removeAutoStorageId } = store
    
    const costs = computed(() => { return store.getUpgradeCosts(props.itemId) })
    
    const autoUnlocked = computed(() => { return store.getItemCount('ulUpgdAutoStorage') >= 1 })
    const autoStorage = computed(() => { return store.autoStorageIds.includes(props.itemId) })

</script>

<template>
    <div class="col">
    
        <div class="row gy-2 gx-3 justify-content-end" :class="{ 'row-cols-1':costs.length <= 1, 'row-cols-3':costs.length > 1 }">
            <line-cost v-for="cost in costs" :key="cost" :cost="cost" />
        </div>
        
        <div class="pt-2">
            <div class="row gx-2 align-items-end">
            
                <div v-if="autoUnlocked" class="col-auto">
                    <div class="form-check form-switch">
                        <input v-if="!autoStorage" class="form-check-input" type="checkbox" :id="'autoStorage-' + itemId" @click="addAutoStorageId(itemId)">
                        <input v-if="autoStorage" class="form-check-input" type="checkbox" :id="'autoStorage-' + itemId" checked @click="removeAutoStorageId(itemId)">
                        <label class="form-check-label small" :for="'autoStorage-' + itemId">{{ $t('value-automatic') }}</label>
                    </div>
                </div>
                
                <div class="col d-flex justify-content-end">
                    <button-upgrade :itemId="itemId" />
                </div>
                
            </div>
        </div>
    </div>
</template>
