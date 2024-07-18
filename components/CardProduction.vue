<script setup>

    const props = defineProps([ 'id', 'name', 'icon', 'itemId' ])

    import { useGameStore } from '~/store/game.js'
    
    const store = useGameStore()
    
    const { upgrade } = store
    
    const can = computed(() => { return store.canUpgrade(props.itemId, 1) })
    const unlocked = computed(() => { return store.isUnlocked(props.itemId) })
    const storegable = computed(() => { return store.isStoregable(props.itemId) })
    const storageUnlocked = computed(() => { return store.getItemCount('missionStorage') >= 1 })
    
    const rawProduction = computed(() => { return store.getRawProduction(props.itemId) })
    const rawConsumption = computed(() => { return store.getRawConsumption(props.itemId) })

</script>

<template>
    <div v-if="unlocked" class="col-12">
        <card :id="id" :name="name" :icon="icon">
            <template v-slot:header>
                <div v-if="rawConsumption > rawProduction" class="col-auto text-end small">
                    <span class="text-danger"><font-awesome-icon icon="fa-fw fa-exclamation-triangle" /></span>
                </div>
                <div class="col-auto text-end small">
                    <item-count :itemId="itemId" />
                    <small v-if="storageUnlocked && storegable" class="text-normal ms-1">/<item-storage :itemId="itemId" /></small>
                </div>
                <div v-if="storageUnlocked && storegable" class="col-auto">
                    <button type="button" class="btn btn-primary lh-1" :class="{ 'disabled':can != 0 }" @click="upgrade({ id:itemId, count:1 })">
                        <small><font-awesome-icon icon="fa-fw fa-arrow-alt-circle-up" /></small>
                    </button>
                </div>
            </template>
            <template v-slot:col-1>
                <div class="col">
                    <div class="row row-cols-1 g-2">
                        <div class="col mt-0">
                            <div class="row gx-2 py-2 small">
                                <div class="col"><span class="text-light">{{ $t('rawConsumption') }}</span></div>
                                <div class="col-auto">
                                    <span :class="{ 'text-warning':rawConsumption != 0 }"><span v-if="rawConsumption > 0">-</span><format-number :value="rawConsumption" /></span>
                                    <small class="text-normal ms-1">/s</small>
                                </div>
                            </div>
                        </div>
                        <div v-if="rawConsumption != 0" class="col scrollbar" style="max-height:200px; overflow-x: hidden;">
                            <div class="row row-cols-1 g-2">
                                <div v-if="rawConsumption > rawProduction" class="col-12">
                                    <div class="alert alert-danger text-center">
                                        <span class="me-2"><font-awesome-icon icon="fas fa-fw fa-exclamation-triangle" /></span>
                                        <span>{{ $t('consumptionAlert') }}</span>
                                    </div>
                                </div>
                                <slot name="consumers" />
                            </div>
                        </div>
                    </div>
                </div>
            </template>
            <template v-slot:col-2>
                <div class="col">
                    <div class="row row-cols-1 g-2">
                        <div class="col mt-0">
                            <div class="row gx-2 py-2 small">
                                <div class="col"><span class="text-light">{{ $t('rawProduction') }}</span></div>
                                <div class="col-auto">
                                    <span class="text-success">+<format-number :value="rawProduction" /></span>
                                    <small class="text-normal ms-1">/s</small>
                                </div>
                            </div>
                        </div>
                        <div class="col scrollbar" style="max-height:200px; overflow-x: hidden;">
                            <div class="row row-cols-1 g-2">
                                <slot name="producers" />
                            </div>
                        </div>
                    </div>
                </div>
            </template>
        </card>
    </div>
</template>
