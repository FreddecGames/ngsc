<template>
    <div class="col">
    
        <div class="row gy-2 gx-3 justify-content-end" :class="{ 'row-cols-1':costs.length <= 1, 'row-cols-3':costs.length > 1 }">
            <line-cost v-for="cost in costs" :key="cost" :cost="cost" />
        </div>
        
        <div class="pt-3">
            <div class="row align-items-center">
            
                <div v-if="autoUnlocked" class="col-auto">
                    <div class="form-check form-switch">
                        <input v-if="!autoStorage" class="form-check-input" type="checkbox" :id="'autoStorage-' + itemId" @click="addAutoStorageId(itemId)">
                        <input v-if="autoStorage" class="form-check-input" type="checkbox" :id="'autoStorage-' + itemId" checked @click="removeAutoStorageId(itemId)">
                        <label class="form-check-label small" :for="'autoStorage-' + itemId">{{ $t('value-automatic') }}</label>
                    </div>
                </div>
                
                <div class="col d-flex justify-content-end">
                    <button-upgrade :itemId="itemId" />
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
    computed: {
        
        ...mapState([ 'autoStorageIds' ]),
        
        ...mapGetters([ 'getUpgradeCoeff', 'getUpgradeCosts', 'getItemCount' ]),
        
        coeff: function() { return this.getUpgradeCoeff(this.itemId) },
        costs: function() { return this.getUpgradeCosts(this.itemId) },
        
        autoUnlocked: function() { return this.getItemCount('ulUpgdAutoStorage') >= 1 },
        autoStorage: function() { return this.autoStorageIds.includes(this.itemId) },
    },
    methods: {
    
        ...mapActions([ 'addAutoStorageId', 'removeAutoStorageId' ]),
    },
}
</script>