<script setup>
        
    import { storeToRefs } from 'pinia'
    import { useGameStore } from '~/store/game.js'
    
    const store = useGameStore()
    
    const { dmBoostCount } = storeToRefs(store) 
    
    const { setDmBoostCount } = store
    
    const dmCount = computed(() => { return store.getItemCount('darkmatter') })

    const boostAll = function() {
        
        [   'boostEnergy', 'boostPlasma', 'boostMeteorite', 'boostCarbon', 'boostScience',
            'boostOil', 'boostFuel', 'boostMetal', 'boostGem', 'boostWood',
            'boostSilicon', 'boostUranium', 'boostLava', 'boostLunarite', 'boostMethane',
            'boostTitanium', 'boostGold', 'boostSilver', 'boostHydrogen',
            'boostHelium', 'boostIce', 'boostAntimatter',
        ].forEach(id => {
            store.boost({ id:id, count:parseInt(dmBoostCount.value) })
        })
    }
    
</script>

<template>
    <div class="pt-1">
        <div class="row g-2 align-items-center">
            <div class="col-auto">
                <div class="card card-body border-0 p-2">
                    <div class="row g-2 align-items-center">
                        <div class="col-auto">
                            <input type="radio" class="btn-check" id="dmBoost-count-1" value="1" v-model="dmBoostCount" @click="setDmBoostCount(1)" />
                            <label class="btn btn-badge px-1" for="dmBoost-count-1">+1</label>
                        </div>
                        <div class="col-auto">
                            <input type="radio" class="btn-check" id="dmBoost-count-10" value="10" v-model="dmBoostCount" @click="setDmBoostCount(10)" />
                            <label class="btn btn-badge px-1" for="dmBoost-count-10">+10</label>
                        </div>
                        <div class="col-auto">
                            <input type="radio" class="btn-check" id="dmBoost-count-100" value="100" v-model="dmBoostCount" @click="setDmBoostCount(100)" />
                            <label class="btn btn-badge px-1" for="dmBoost-count-100">+100</label>
                        </div>
                    </div>
                </div>
            </div>
            <div class="ms-auto col-auto">
                <button type="button" class="btn btn-primary" :class="{ 'disabled':dmCount < (dmBoostCount * 22) }" @click="boostAll()">
                    {{ $t('button-boostAll') }}
                </button>
            </div>
        </div>
    </div>
</template>
