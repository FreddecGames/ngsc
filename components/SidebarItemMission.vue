<script setup>

    const props = defineProps([ 'name', 'icon', 'paneId', 'missions' ])

    import { useGameStore } from '~/store/game.js'
    
    const store = useGameStore()

    const unlocked = computed(() => {
    
        let result = false
        
        if (props.missions) {
            for (let i = 0; i < props.missions.length; i++) {
                let item = props.missions[i]
                if (store.isUnlocked(item)) result = true
            }
        }
        else result = true
        
        return result
    })
    
    const count = computed(() => {
    
        let count = 0
        
        if (props.missions) {
            for (let i = 0; i < props.missions.length; i++) {
                let item = props.missions[i]
                if (store.getItemCount(item) >= store.getItemMax(item)) count++
            }
        }
        
        return count
    })
    
    const max = computed(() => { return props.missions.length })

</script>

<template>
    <sidebar-item v-if="unlocked" :name="name" :icon="icon" :paneId="paneId">
        <template v-slot:extra>
        
            <div v-if="count >= max" class="col-auto text-end small">
                <small class="text-uppercase text-success">Completed</small>
            </div>
            
            <div v-if="count < max" class="col-auto text-end small">
                <span class="text-light">{{ count }}</span>
                <small class="text-normal ms-1">/{{ max }}</small>
            </div>
            
        </template>
    </sidebar-item>
</template>
