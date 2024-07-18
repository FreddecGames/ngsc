<script setup>

    const props = defineProps([ 'cost' ])

    import { useGameStore } from '~/store/game.js'
    
    const store = useGameStore()

    const { setActivePane } = store

    const count = computed(() => { return store.getItemCount(props.cost.id) })
    const storage = computed(() => { return store.getItemStorage(props.cost.id) })

</script>

<template>
    <div class="col-6">
    
        <button v-if="cost.id != 'segment' && cost.id != 'dysonT3' && cost.id != 'conquest' && cost.id != 'shield' && cost.id != 'engine' && cost.id != 'aero'" type="button" class="w-100" @click="setActivePane(cost.id + 'Pane');" :title="$t(cost.id)">
            <div class="row g-1 lh-1">
                <div class="col d-flex align-items-center">
                    <img class="me-1" :src="'/icons/' + cost.id + '.png'" width="14" height="14" :alt="$t(cost.id)" />
                    <small :class="{ 'text-danger': storage && cost.count > storage }"><format-number :value="cost.count" /></small>
                </div>
                <div class="col-auto d-flex">
                    <small><timer-countdown :target="cost.count" :itemId="cost.id" /></small>
                </div>
            </div>
            <line-progress :target="cost.count" :itemId="cost.id" />
        </button>
        
        <button v-else type="button" class="w-100" :title="$t(cost.id)">
            <div class="row g-1 lh-1">
                <div class="col d-flex align-items-center lh-1">
                    <img class="me-1" :src="'/icons/' + cost.id + '.png'" width="14" height="14" :alt="$t(cost.id)" />
                    <small :class="{ 'text-danger': storage && cost.count > storage }"><format-number :value="cost.count" /></small>
                </div>
                <div class="col-auto d-flex">
                    <small :class="{ 'd-none': count < cost.count}"><i class="text-success fas fa-fw fa-check"></i></small>
                    <small :class="{ 'd-none': count >= cost.count}"><span class="text-muted">---</span></small>
                </div>
            </div>
            <line-progress :target="cost.count" :itemId="cost.id" />
        </button>
        
    </div>
</template>
