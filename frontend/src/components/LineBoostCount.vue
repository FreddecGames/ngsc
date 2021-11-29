<template>
    <div class="pt-1">
        <div class="row g-2 align-items-center">
            <div class="col-auto">
                <input type="radio" class="btn-check" id="dmBoost-count-1" value="1" v-model="selectedCount" @click="setDmBoostCount(1)" />
                <label class="btn btn-badge px-1" for="dmBoost-count-1">+1</label>
            </div>
            <div class="col-auto">
                <input type="radio" class="btn-check" id="dmBoost-count-10" value="10" v-model="selectedCount" @click="setDmBoostCount(10)" />
                <label class="btn btn-badge px-1" for="dmBoost-count-10">+10</label>
            </div>
            <div class="col-auto">
                <input type="radio" class="btn-check" id="dmBoost-count-100" value="100" v-model="selectedCount" @click="setDmBoostCount(100)" />
                <label class="btn btn-badge px-1" for="dmBoost-count-100">+100</label>
            </div>
            <div class="col"></div>
            <div class="col-auto">
                <button type="button" class="btn btn-primary" :class="{ 'disabled':dmCount < (dmBoostCount * 22) }" @click="boostAll()">
                    {{ $t('button-boostAll') }}
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
    data() {
        return {
        
            selectedCount: 1,
        }
    },
    computed: {
        
        ...mapState([ 'dmBoostCount' ]),
        
        ...mapGetters([ 'getItemCount' ]),
        
        dmCount: function() { return this.getItemCount('darkmatter') },
    },
    methods: {
    
        ...mapActions([ 'setDmBoostCount', 'boost' ]),
        
        boostAll() {
            
            [   'boostEnergy', 'boostPlasma', 'boostMeteorite', 'boostCarbon', 'boostScience',
                'boostOil', 'boostFuel', 'boostMetal', 'boostGem', 'boostWood',
                'boostSilicon', 'boostUranium', 'boostLava', 'boostLunarite', 'boostMethane',
                'boostTitanium', 'boostGold', 'boostSilver', 'boostHydrogen',
                'boostHelium', 'boostIce', 'boostAntimatter',
            ].forEach(id => {
                this.boost({ id:id, count:this.dmBoostCount })
            })
        },
    },
}
</script>