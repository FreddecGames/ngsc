<template>
    <div class="col">
    
        <button v-if="cost.id != 'segment' && cost.id != 'dysonT3' && cost.id != 'conquest'" type="button" class="w-100" @click="setActivePane(cost.id + 'Pane');">
            <div class="row g-1 small">
                <div class="col d-flex align-items-center">
                    <img class="me-1" :src="require(`../assets/icons/${cost.id}.png`).default" width="12" height="12" :alt="$t(cost.id)" />
                    <span :class="{ 'text-danger': storage && cost.count > storage }"><format-number :value="cost.count" /></span>
                </div>
                <div v-if="storage" class="col-auto">
                    <timer-count :itemId="cost.id" :count="cost.count" />
                </div>
            </div>
            <line-progress :itemId="cost.id" :count="cost.count" />
        </button>
        
        <div v-if="cost.id == 'segment' || cost.id == 'dysonT3' || cost.id == 'conquest'">
            <div class="row g-1 small">
                <div class="col d-flex align-items-center">
                    <img class="me-1" :src="require(`../assets/icons/${cost.id}.png`).default" width="12" height="12" :alt="$t(cost.id)" />
                    <span :class="{ 'text-danger': storage && cost.count > storage }"><format-number :value="cost.count" /></span>
                </div>
                <div v-if="storage" class="col-auto">
                    <timer-count :itemId="cost.id" :count="cost.count" />
                </div>
                <div v-if="!storage && count >= cost.count" class="col-auto">
                    <i class="text-success fas fa-fw fa-check"></i>
                </div>
            </div>
            <line-progress :itemId="cost.id" :count="cost.count" />
        </div>
        
    </div>
</template>

<script>
import FormatNumber from './FormatNumber.vue'
import LineProgress from './LineProgress.vue'
import TimerCount from './TimerCount.vue'

import { mapGetters, mapActions } from 'vuex'

export default {
    props: [ 'cost' ],
    components: {
        
        'format-number': FormatNumber,
        
        'line-progress': LineProgress,
        
        'timer-count': TimerCount,
    },
    computed: {
    
        ...mapGetters([ 'getItemCount', 'getItemStorage' ]),
        
        count: function() { return this.getItemCount(this.cost.id) },
        storage: function() { return this.getItemStorage(this.cost.id) },
    },
    methods: {
    
        ...mapActions([ 'setActivePane' ]),
    },
}
</script>