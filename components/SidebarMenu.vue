<script setup>

    const props = defineProps([ 'unlockerIds' ])

    import { useGameStore } from '~/store/game.js'
    
    const store = useGameStore()

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

</script>

<template>
    <div v-if="unlocked" class="col nav nav-tabs border-0" role="tablist">
        <div class="w-100 row row-cols-1 g-0">
        
            <slot />
            
        </div>
    </div>
</template>
