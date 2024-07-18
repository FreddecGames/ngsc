<script setup>

    const props = defineProps([ 'id' ])

    import { storeToRefs } from 'pinia'
    import { useGameStore } from '~/store/game.js'
    
    const store = useGameStore()
    
    const { activeTab } = storeToRefs(store)

</script>

<template>
    <div class="h-100 tab-pane" :class="{ 'active':activeTab == id }" :id="id" role="tabpanel" :aria-labelledby="id + '-tab'">
        <div class="h-100 d-flex flex-column">
            
            <slot />

        </div>
    </div>
</template>
