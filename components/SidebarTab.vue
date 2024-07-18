<script setup>

    const props = defineProps([ 'name', 'icon', 'paneId', 'warning', 'notifIds' ])

    import { storeToRefs } from 'pinia'
    import { useGameStore } from '~/store/game.js'
    
    const store = useGameStore()
    
    const { activeTab } = storeToRefs(store)

    const { setActiveTab } = store
    
    const notified = computed(() => {
    
        let result = false
        
        if (props.notifIds) {
            for (let i = 0; i < props.notifIds.length; i++) {
                let id = props.notifIds[i]
                if (store.isNotified(id)) result = true
            }
        }
        
        return result
    })

</script>

<template>
    <li class="nav-item col" role="presentation">
        <button class="nav-link px-0" :class="{ 'active':activeTab == paneId }" data-bs-toggle="tab" :data-bs-target="'#' + paneId" type="button" role="tab" :aria-controls="paneId" @click="setActiveTab(paneId)">
            <div class="position-relative">
                <div v-if="notified" class="small text-success" style="position:absolute; top:0; right:1rem;"><small><font-awesome-icon icon="fa-certificate" /></small></div>
                <span class="fs-6"><font-awesome-icon :icon="'fa-fw fa-' + icon" /></span>
            </div>
            <div class="position-relative">
                <small>{{ $t(name) }}</small>
                <slot name="extra" />
            </div>
        </button>
    </li>
</template>
