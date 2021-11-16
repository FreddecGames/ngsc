<template>
    <div class="col">
    
        <button v-if="cost.id != 'segment' && cost.id != 'dysonT3' && cost.id != 'conquest'" type="button" class="w-100" @click="setActivePane(cost.id + 'Pane');">
            <div class="row g-1 small">
                <div class="col d-flex align-items-center lh-1">
                    <img class="me-1" :src="require(`../assets/icons/${cost.id}.png`).default" width="10" height="10" :alt="$t(cost.id)" />
                    <small :class="{ 'text-danger': storage && cost.count > storage }"><format-number :value="cost.count" /></small>
                </div>
                <div class="col-auto d-flex">
                    <small><timer-count :count="cost.timer" /></small>
                </div>
            </div>
            <line-progress :progress="cost.progress" :count="cost.count" />
        </button>
        
        <button v-if="cost.id == 'segment' || cost.id == 'dysonT3' || cost.id == 'conquest'" type="button" class="w-100">
            <div class="row g-1 small">
                <div class="col d-flex align-items-center lh-1">
                    <img class="me-1" :src="require(`../assets/icons/${cost.id}.png`).default" width="10" height="10" :alt="$t(cost.id)" />
                    <small :class="{ 'text-danger': storage && cost.count > storage }"><format-number :value="cost.count" /></small>
                </div>
                <div class="col-auto d-flex">
                    <small :class="{ 'd-none': count < cost.count}"><i class="text-success fas fa-fw fa-check"></i></small>
                    <small :class="{ 'd-none': count >= cost.count}"><span class="text-muted">---</span></small>
                </div>
            </div>
            <line-progress :progress="cost.progress" :count="cost.count" />
        </button>
        
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