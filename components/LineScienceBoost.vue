<script setup>

    const props = defineProps([ 'itemId', 'icon', 'name' ])
    
    import { storeToRefs } from 'pinia'
    import { useGameStore } from '~/store/game.js'
    
    const store = useGameStore()
    
    const { scienceBoostCount } = storeToRefs(store)
    
    const { build } = store
    
    const can = computed(() => { return store.canBuild(props.itemId, parseInt(scienceBoostCount.value)) })
    const cost = computed(() => { return store.getBuildCosts(props.itemId, parseInt(scienceBoostCount.value))[0] })
    const count = computed(() => { return store.getItemCount(props.itemId) })
    const unlocked = computed(() => { return store.isUnlocked(props.itemId) })

</script>

<template>
    <div v-if="unlocked" class="col">
        <div class="row align-items-center gx-2">
            <div class="col text-truncate">
                <img class="me-2" :src="icon" width="14" height="14" :alt="$t(name)" />
                <span>{{ $t(name) }}</span>
            </div>
            <div class="col-auto">
                <small class="text-success">+{{ count }}%</small>
            </div>
            <line-cost v-if="cost" :cost="cost" />
            <div class="col-auto">
                <button type="button" class="btn btn-success lh-1" :class="{ 'disabled':can != 0 && can != -5 }" @click="build({ id:itemId, count:parseInt(scienceBoostCount) })">
                    <small><font-awesome-icon icon="fas fa-fw fa-plus-circle" /></small>
                </button>
            </div>
        </div>
    </div>
</template>
