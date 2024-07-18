<script setup>

    const props = defineProps([ 'name', 'icon', 'paneId', 'itemId' ])

    import { storeToRefs } from 'pinia'
    import { useGameStore } from '~/store/game.js'
    
    const store = useGameStore()
    
    const { activePane } = storeToRefs(store)    
    
    const { upgrade } = store
    
    const can = computed(() => store.canUpgrade(props.itemId, 1))
    const unlocked = computed(() => store.isUnlocked(props.itemId))
    const upgradable = computed(() => store.isUpgradable(props.itemId))
    const storegable = computed(() => store.isStoregable(props.itemId))
    const storageUnlocked = computed(() => store.getItemCount('missionStorage') >= 1)

</script>

<template>
    <sidebar-item v-if="unlocked" :name="name" :icon="icon" :paneId="paneId">
        <template v-slot:extra>
            
            <div class="col-auto text-end small">
                <item-prod :itemId="itemId" />
            </div>
            
            <div class="col-auto text-end small" style="width:90px;">
                <item-count :itemId="itemId" />
            </div>
            
        </template>
        <template v-if="storageUnlocked" v-slot:buttons>
        
            <button v-if="upgradable" type="button" class="btn small" :class="{ 'active':activePane == paneId, 'disabled text-muted':can != 0 }" @click="upgrade({ id:itemId, count:1 })">
                <font-awesome-icon icon="fas fa-fw fa-arrow-alt-circle-up" />
            </button>
            
            <button v-if="!upgradable" class="btn small disabled" :class="{ 'active':activePane == paneId }" style="width:35px"></button>

        </template>
    </sidebar-item>
</template>
