<template>
    <div class="col">
    
        <div class="row gy-2 gx-3 justify-content-end">
            <line-cost v-for="cost in costs" :key="cost" :cost="cost" />
        </div>
        
        <div class="pt-2">
            <div class="row align-items-center">
            
                <div v-if="autoUnlocked" class="col-auto">
                    <div class="form-check form-switch">
                        <input v-if="autoStorageId != itemId" class="form-check-input" type="checkbox" :id="'emcInterval-' + itemId" @click="setAutoStorageId(itemId)">
                        <input v-if="autoStorageId == itemId" class="form-check-input" type="checkbox" :id="'emcInterval-' + itemId" checked @click="setAutoStorageId(null)">
                        <label class="form-check-label small" :for="'emcInterval-' + itemId">{{ $t('value-automatic') }}</label>
                    </div>
                </div>
                
                <div class="col d-flex justify-content-end">
                    <button-upgrade :itemId="itemId" :count="selectedCount" />
                </div>
                
            </div>
        </div>
    </div>
</template>

<script>
import ButtonUpgrade from './ButtonUpgrade.vue'

import LineCost from './LineCost.vue'

import { mapState, mapGetters, mapActions } from 'vuex'

export default {
    props: [ 'itemId' ],
    components: {
        
        'button-upgrade': ButtonUpgrade,
        
        'line-cost': LineCost,
    },
    data() {
        return {
        
            selectedCount: 1,
        }
    },
    computed: {
        
        ...mapState([ 'autoStorageId' ]),
        
        ...mapGetters([ 'getUpgradeCoeff', 'getUpgradeCosts', 'getItemCount' ]),
        
        coeff: function() { return this.getUpgradeCoeff(this.itemId) },
        costs: function() { return this.getUpgradeCosts(this.itemId, this.selectedCount) },
        
        autoUnlocked: function() { return this.getItemCount('ulUpgdAutoStorage') >= 1 },
    },
    methods: {
    
        ...mapActions([ 'setAutoStorageId' ]),
    },
}
</script>