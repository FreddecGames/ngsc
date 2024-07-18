<script setup>

    const props = defineProps([ 'itemId' ])
    
    const percentage = ref(0)

    import { storeToRefs } from 'pinia'
    import { useGameStore } from '~/store/game.js'
    
    const store = useGameStore()
    
    const { autoConversionId } = storeToRefs(store)    
    
    const { setAutoConversionId, convert } = store
    
    const amount = computed(() => { return Math.floor((percentage.value / 100) * maxCount.value) })
    const source = computed(() => { return store.getConversionCost(props.itemId, amount.value) })
    const maxCount = computed(() => { return store.getConversionMaxCount(props.itemId) })
    
    const can = computed(() => { return store.canConvert(props.itemId) })
    
    const autoUnlocked = computed(() => { return store.getItemCount('dmUpgdAutoEmc') >= 1 })
    
</script>

<template>
    <div class="col">
        <div class="row g-2 align-items-center">
    
            <div class="col">
                <div class="row g-0 small">
                    
                    <div class="col-12">
                        <div class="row gx-2 align-items-center justify-content-center">
                        
                            <div class="col-auto d-flex align-items-center">
                                <img class="me-1" :src="'/icons/' + source.id + '.png'" width="14" height="14" :alt="$t(source.id)" />
                                <format-number :value="source.count" />
                            </div>
                            
                            <div class="col-auto">
                                <font-awesome-icon icon="fa-fw fa-long-arrow-alt-right text-muted" />
                            </div>
                            
                            <div class="col-auto d-flex align-items-center">
                                <img class="me-1" :src="'/icons/' + itemId + '.png'" width="14" height="14" :alt="$t(itemId)" />
                                <format-number :value="amount" />
                            </div>
                            
                        </div>
                    </div>
                
                    <div class="col-12" style="position:relative; top:-5px;">
                        <input type="range" class="form-range" min="1" max="100" step="1" v-model.number="percentage" />
                    </div>
                    
                </div>
            </div>
            <div class="col-auto">
                <div class="mb-2">
                    <button type="button" class="btn btn-primary" :class="{ 'disabled text-danger':can != 0 }" @click="convert({ id:itemId, count:amount });">
                        <span v-if="can == 0">{{ $t('button-convert') }}</span>
                        <span v-if="can == -1">{{ $t('not-enough-resource') }}</span>
                        <span v-if="[-2, -3, -4].includes(can)">{{ $t('error') }}</span>
                        <span v-if="can == -5">{{ $t('full') }}</span>
                    </button>
                </div>
            </div>
        </div>
        <div v-if="autoUnlocked" class="row g-2 align-items-start justify-content-end">
            <div class="col-auto">
                <div class="form-check form-switch small">
                    <input v-if="autoConversionId != itemId" class="form-check-input" type="checkbox" :id="'emcInterval-' + itemId" @click="setAutoConversionId(itemId)">
                    <input v-if="autoConversionId == itemId" class="form-check-input" type="checkbox" :id="'emcInterval-' + itemId" checked @click="setAutoConversionId(null)">
                    <label class="form-check-label " :for="'emcInterval-' + itemId"><span>{{ $t('value-emc-automatic') }}</span></label>
                </div>
            </div>
        </div>
    </div>
</template>
