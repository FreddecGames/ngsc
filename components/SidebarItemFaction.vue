<script setup>

    const props = defineProps([ 'name', 'icon', 'paneId', 'faction' ])

    import { useGameStore } from '~/store/game.js'
    
    const store = useGameStore()
    
    const totalStar = computed(() => store.getStarCount(props.faction))
    const currentStar = computed(() => store.getConqueredStarCount(props.faction))
    const currentStatue = computed(() => store.getStatueStarCount(props.faction))
    const possibleStar = computed(() => store.getUnlockedStarCount(props.faction))

</script>

<template>
    <sidebar-item :name="name" :icon="icon" :paneId="paneId" :unlockerIds="[ 'shipT1' ]">
        <template v-slot:extra>
        
            <div class="col-auto text-end small">
                <img class="me-1" src="/icons/conquest.png" width="16" height="16" :alt="$t('statue')" />
                <span class="text-light">{{ currentStar }}</span>
            </div>
            
            <div class="col-auto text-end small">
                <img class="me-1" src="/icons/statue.png" width="16" height="16" :alt="$t('statue')" />
                <span class="text-light">{{ currentStatue }}</span>
            </div>
            
            <div class="col-auto text-end small">
                <small class="text-normal">/{{ possibleStar}} ({{ totalStar }})</small>
            </div>
            
        </template>
    </sidebar-item>
</template>
