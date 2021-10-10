<template>
    <div v-if="unlocked" class="col-12">
        <card :id="id" :name="name" :icon="icon">
            <template v-slot:header>
                <div v-if="rawConsumption > rawProduction" class="col-auto text-end small">
                    <i class="fas fa-fw fa-exclamation-triangle text-danger"></i>
                </div>
                <div class="col-auto text-end small">
                    <item-count :itemId="itemId" />
                    <small v-if="storageUnlocked && storegable" class="text-normal ms-1">/<item-storage :itemId="itemId" /></small>
                </div>
                <div v-if="storageUnlocked && storegable" class="col-auto">
                    <button type="button" class="btn btn-primary small" :class="{ 'disabled':can != 0 }" @click="upgrade({ id:itemId, count:1 })">
                        <i class="fas fa-fw fa-arrow-alt-circle-up"></i>
                    </button>
                </div>
                <div v-if="rawConsumption > rawProduction" class="col-12">
                    <div class="alert alert-danger text-center">
                        <i class="fas fa-fw fa-exclamation-triangle text-danger me-2"></i>
                        <span>{{ $t('consumptionAlert') }}</span>
                    </div>
                </div>
            </template>
            <template v-slot:col-1>
                <div v-if="rawConsumption > 0" class="col">
                    <div class="row row-cols-1 g-2">
                        <div class="col mt-0">
                            <div class="row gx-2 pb-1 border-bottom small">
                                <div class="col"><span class="text-light">{{ $t('rawConsumption') }}</span></div>
                                <div class="col-auto">
                                    <span class="text-warning">-<format-number :value="rawConsumption" /></span>
                                    <small class="text-normal ms-1">/s</small>
                                </div>
                            </div>
                        </div>
                        <div class="col" style="max-height:200px; overflow-x: hidden;" data-simplebar>
                            <div class="row row-cols-1 g-2">
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
                            <div class="row gx-1 pb-1 border-bottom small">
                                <div class="col"><span class="text-light">{{ $t('rawProduction') }}</span></div>
                                <div class="col-auto">
                                    <span class="text-success">+<format-number :value="rawProduction" /></span>
                                    <small class="text-normal ms-1">/s</small>
                                </div>
                            </div>
                        </div>
                        <div class="col" style="max-height:200px; overflow-x: hidden;" data-simplebar>
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

<script>
import Card from './Card.vue'

import FormatNumber from './FormatNumber.vue'

import ItemCount from './ItemCount.vue'
import ItemStorage from './ItemStorage.vue'

import { mapGetters, mapActions } from 'vuex'

export default {
    props: [ 'id', 'name', 'icon', 'itemId' ],
    components: {
        
        'card': Card,
        
        'format-number': FormatNumber,
        
        'item-count': ItemCount,
        'item-storage': ItemStorage,
    },
    computed: {
    
        ...mapGetters([ 'canUpgrade', 'isUnlocked', 'isStoregable', 'getItemCount', 'getRawProduction', 'getRawConsumption' ]),
        
        can: function() { return this.canUpgrade(this.itemId, 1) },
        unlocked: function() { return this.isUnlocked(this.itemId) },
        storegable: function() { return this.isStoregable(this.itemId) },
        storageUnlocked: function() { return this.getItemCount('missionStorage') >= 1 },
        
        rawProduction: function() { return this.getRawProduction(this.itemId) },
        rawConsumption: function() { return this.getRawConsumption(this.itemId) },
    },
    methods: {
    
        ...mapActions([ 'upgrade' ]),
    },
}
</script>