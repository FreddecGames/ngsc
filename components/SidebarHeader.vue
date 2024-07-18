<script setup>

    const props = defineProps([ 'name', 'unlockerIds' ])
    
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
    <div v-if="unlocked" class="col small">    
        <span class="text-steelblue text-uppercase">{{ $t(name) }}</span>
    </div>
</template>
