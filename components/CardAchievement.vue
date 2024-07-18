<script setup>

    const props = defineProps([ 'name', 'icon', 'unlockerId', 'achs' ])

    import { useGameStore } from '~/store/game.js'
    
    const store = useGameStore()

    const unlocked = computed(() => { return store.isUnlocked(props.unlockerId) })
    const dmUnlocked = computed(() => { return store.isUnlocked('darkmatter') })
    
    const darkmatter = computed(() => {
        let dm = 0
        props.achs.forEach(itemId => { dm += store.getItemCount(itemId) })
        return dm
    })
    
</script>

<template>
    <div v-if="unlocked" class="col-12 col-sm-6 col-lg-4">
        <div class="card">
        
            <div class="card-header">
                <div class="row g-2 align-items-center">
                
                    <div class="col d-flex align-items-center">
                        <img class="me-2" :src="icon" width="12" height="12" :alt="$t(name)" />
                        <span class="text-uppercase text-steelblue">{{ $t(name) }}</span>
                    </div>
                    
                    <div v-if="dmUnlocked" class="col-auto d-flex align-items-center">
                        <img class="me-2" src="/icons/darkmatter.png" width="12" height="12" :alt="$t('darkmatter')" />
                        <small class="text-success">+{{ darkmatter }}</small>
                    </div>
                    
                </div>
            </div>
            
            <div class="card-body">
                <div class="row row-cols-1 g-2">
                    <slot />
                </div>
            </div>

        </div>
    </div>
</template>
