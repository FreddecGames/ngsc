<template>
    <div class="col">
        <div class="row g-2 align-items-start">
    
            <div class="col">
                <div class="row g-0 small">
                    
                    <div class="col-12">
                        <div class="row gx-1 align-items-center justify-content-center">
                        
                            <div class="col-auto d-flex align-items-center">
                                <img class="me-1" :src="require(`../assets/icons/${source.id}.png`)" width="12" height="12" :alt="$t(source.id)" />
                                <format-number :value="source.count" />
                            </div>
                            
                            <div class="col-auto">
                                <i class="fas fa-fw fa-long-arrow-alt-right"></i>
                            </div>
                            
                            <div class="col-auto d-flex align-items-center">
                                <img class="me-1" :src="require(`../assets/icons/${itemId}.png`)" width="12" height="12" :alt="$t(itemId)" />
                                <format-number :value="amount" />
                            </div>
                            
                        </div>
                    </div>
                
                    <div class="col-12">
                        <input type="range" class="form-range" min="1" :max="maxCount" step="1" v-model.number="amount" />
                    </div>
                    
                </div>
            </div>
            <div class="col-auto">
                <div class="mb-2">
                    <button type="button" class="btn btn-primary" :class="{ 'disabled text-danger':can != 0 }" @click="convert({ id:itemId, count:amount }); amount = Math.min(amount, maxCount);">
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
                <div class="form-check form-switch">
                    <input v-if="autoConversionId != itemId" class="form-check-input" type="checkbox" :id="'emcInterval-' + itemId" @click="setAutoConversionId(itemId)">
                    <input v-if="autoConversionId == itemId" class="form-check-input" type="checkbox" :id="'emcInterval-' + itemId" checked @click="setAutoConversionId(null)">
                    <label class="form-check-label small" :for="'emcInterval-' + itemId">{{ $t('value-emc-automatic') }}</label>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import FormatNumber from './FormatNumber.vue'

import { mapState, mapGetters, mapActions } from 'vuex'

export default {
    props: [ 'itemId' ],
    components: {
        
        'format-number': FormatNumber,
    },
    data() {
        return {
        
            amount: 1,
        }
    },
    computed: {
        
        ...mapState([ 'autoConversionId' ]),
        
        ...mapGetters([ 'getConvertionCosts', 'getConvertionMaxCount', 'canConvert', 'getItemCount' ]),
        
        source: function() { return this.getConvertionCosts(this.itemId, this.amount)[0] },
        maxCount: function() { return this.getConvertionMaxCount(this.itemId) },
        
        can: function() { return this.canConvert(this.itemId, this.amount) },
        
        autoUnlocked: function() { return this.getItemCount('dmUpgdAutoEmc') >= 1 },
    },
    methods: {
    
        ...mapActions([ 'setAutoConversionId', 'convert' ]),
    },
}
</script>