<script setup>

    const props = defineProps([ 'id', 'descs', 'itemId' ])

    import { useGameStore } from '~/store/game.js'
    
    const store = useGameStore()
    
    const unlocked = computed(() => { return store.isUnlocked(props.itemId) })
    const emcUnlocked = computed(() => { return store.getItemCount('missionEmc') >= 1 })

</script>

<template>
    <card v-if="unlocked && emcUnlocked" :id="id" name="card-title-convert">
        <template v-slot:col-1>
        
            <block-desc :descs="descs" />
        
        </template>
        <template v-slot:col-2>
        
            <block-convert :itemId="itemId" />

        </template>
    </card>
</template>
