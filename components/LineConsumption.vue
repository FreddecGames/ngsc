<script setup>

    const props = defineProps([ 'resId', 'itemId', 'level', 'res' ])
    
    import { useGameStore } from '~/store/game.js'
    
    const store = useGameStore()

    const { setActivePane, destroy } = store
    
    const can = computed(() => { return store.canDestroy(props.itemId, 1) })
    const count = computed(() => { return store.getItemCount(props.itemId) })
    const unlocked = computed(() => { return store.isUnlocked(props.itemId) })
    const consumption = computed(() => { return store.getItemConsumption(props.itemId, props.resId) })

</script>

<template>
    <div v-if="unlocked && consumption > 0" class="col">
        <div class="row gx-2 align-items-center flex-nowrap">
            <div class="col">
                <button type="button" class="small text-start w-100" @click="setActivePane(res + 'Pane');">
                    <div class="row gx-2 align-items-center">
                        <div class="col text-truncate">
                            <span class="badge text-uppercase text-center p-2 me-2"><img :src="'/icons/' + res + '.png'" class="me-1" width="12" height="12" :alt="$t(res)" /> {{ $t(level) }}</span>
                            <span class="text-light me-1"><small class="opacity-50">x</small> <format-number :value="count" /></span>
                            <span class="text-normal">{{ $t(itemId) }}</span>
                        </div>
                        <div class="col-auto">
                            <span class="text-warning">-<format-number :value="consumption" /></span>
                            <small class="text-normal ms-1">/s</small>
                        </div>
                    </div>
                </button>
            </div>
            <div class="col-auto">
                <button type="button" class="btn btn-danger lh-1" :class="{ 'disabled':!can }" @click="destroy({ id:itemId, count:1 })">
                    <small><font-awesome-icon icon="fa-fw fa-trash" /></small>
                </button>
            </div>
        </div>
    </div>
</template>
