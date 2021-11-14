<template>
    <div class="col">
    
        <div v-if="costs" class="row gy-2 gx-3 justify-content-end" :class="{ 'row-cols-1':costs.length <= 1, 'row-cols-2':costs.length == 2, 'row-cols-3':costs.length >= 3 }">
            <line-cost v-for="cost in costs" :key="cost" :cost="cost" />
        </div>


        <div class="pt-2 row g-2 align-items-center justify-content-end">
        
            <div class="col-auto">
                <button-statue :itemId="itemId" />
            </div>
            
        </div>
        
    </div>
</template>

<script>
import ButtonStatue from './ButtonStatue.vue'

import LineCost from './LineCost.vue'

import { mapGetters } from 'vuex'

export default {
    props: [ 'itemId' ],
    components: {
        
        'button-statue': ButtonStatue,
        
        'line-cost': LineCost,
    },
    computed: {
    
        ...mapGetters([ 'statue/costs' ]),
        
        costs: function() { return this['statue/costs'](this.itemId) },
    },
}
</script>