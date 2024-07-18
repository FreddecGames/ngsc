<script setup>

    const props = defineProps([ 'name', 'icon', 'paneId', 'unlockerIds' ])

    import { storeToRefs } from 'pinia'
    import { useGameStore } from '~/store/game.js'
    
    const store = useGameStore()
    
    const { activePane } = storeToRefs(store)

    const { setSidebarOpen, setActivePane, unNotified } = store

    const unlocked = computed(() => {
    
        let result = false
        
        if (props.unlockerIds) {
            for (let i = 0; i < props.unlockerIds.length; i++) {
                let id = props.unlockerIds[i]
                if (store.isUnlocked(id)) result = true
            }
        }
        else result = true
        
        return result
    })
    
    const notified = computed(() => store.isNotified(props.paneId))

</script>

<template>
    <div v-if="unlocked" class="col">
        <div class="btn-group w-100 position-relative">
            
            <div v-if="notified" class="position-absolute top-0 left-0 small" style="z-index: 1;">
                <small class="text-success"><font-awesome-icon icon="fa-certificate" /></small>
            </div>
            
            <button type="button" class="btn pe-0 w-100" :class="{ 'active':activePane == paneId }" data-bs-toggle="tab" :data-bs-target="'#' + paneId" role="tab" :aria-controls="paneId" @click="setSidebarOpen(false); setActivePane(paneId); unNotified(paneId);">
                <div class="w-100 row g-2 align-items-center">
                
                    <div class="col-auto lh-1">
                        <img :src="icon" width="16" height="16" :alt="name" />
                    </div>
                    
                    <div class="col text-start text-truncate">
                        <span class="text-truncate">{{ $t(name) }}</span>
                    </div>
                    
                    <slot name="extra" />
                    
                </div>
            </button>
            
            <slot name="buttons" />
            
        </div>
    </div>
</template>
