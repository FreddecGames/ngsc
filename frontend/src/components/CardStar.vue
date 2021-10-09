<template>
    <card v-if="unlocked" :id="id" :name="name">
        <template v-slot:header>
            
            <div v-if="donor" class="col-auto">
                <i class="small fas fa-fw fa-star text-donor me-1"></i>
                <small class="text-uppercase text-donor">{{ $t('donorStar') }}</small>
            </div>
            
            <div v-if="status == 'conquered' || status == 'statued'" class="col-auto">
                <img class="me-1" :src="require(`../assets/icons/conquest.png`)" width="12" height="12" :alt="$t('statue')" />
            </div>
        
            <div v-if="status == 'statued'" class="col-auto">
                <img class="me-1" :src="require(`../assets/icons/statue.png`)" width="12" height="12" :alt="$t('statue')" />
            </div>
            
        </template>
        <template v-slot:col-1>
            <div v-if="status == 'new'" class="col">
                <div class="row gx-2">
                
                    <div class="col-auto">
                        <small class="text-muted">{{ $t('value-distance') }}</small>
                    </div>
                    
                    <div class="col-auto">
                        <span class="text-light">{{ distance }}</span>
                        <small class="ms-1">LY</small>
                    </div>
                    
                </div>
            </div>
        
            <div v-if="status != 'new'" class="col">
                <div class="row gx-3">
                
                    <div class="col-auto">
                        <small class="text-muted">{{ $t('value-invadingBonus') }}</small>
                    </div>
                    
                    <div v-for="res in resources" :key="res" class="col-auto">
                        <img class="me-1" :src="require(`../assets/icons/${res}.png`)" width="12" height="12" :alt="$t(res)" />
                        <small v-if="!donor" class="text-success">+25%</small>
                        <small v-if="donor" class="text-donor">+50%</small>
                    </div>
                    
                </div>
            </div>
        
            <div v-if="status == 'conquered'" class="col">
                <small>{{ $t('statue-desc1') }}</small>
            </div>
            
        </template>
        <template v-slot:col-2>
            
            <block-explore v-if="status == 'new'" :itemId="itemId" />

            <div v-if="status == 'explored'" class="col">
                <div class="row gx-2">
                
                    <div class="col">
                        <small class="text-muted">{{ $t('value-enemyFleet') }}</small>
                    </div>
                    
                    <div class="col-auto">
                        <div class="row gx-3">
                            <div class="col text-end">
                                <small class="text-light">{{ stats.power }}</small>
                                <small class="ms-1">{{ $t('power') }}</small>
                            </div>
                            <div class="col text-end">
                                <small class="text-light">{{ stats.defense }}</small>
                                <small class="ms-1">{{ $t('defense') }}</small>
                            </div>
                            <div class="col text-end">
                                <small class="text-light">{{ stats.speed }}</small>
                                <small class="ms-1">{{ $t('speed') }}</small>
                            </div>
                        </div>
                    </div>
                    
                </div>
                <div class="row gx-2">
                
                    <div class="col">
                        <small class="text-muted">{{ $t('value-yourFleet') }}</small>
                    </div>
                    
                    <div class="col-auto">
                        <div class="row gx-3">
                            <div class="col text-end">
                                <small :class="{ 'text-light': getFleetStats.power >= stats.power, 'text-danger': getFleetStats.power < stats.power }">{{ getFleetStats.power }}</small>
                                <small class="ms-1">{{ $t('power') }}</small>
                            </div>
                            <div class="col text-end">
                                <small :class="{ 'text-light': getFleetStats.defense >= stats.defense, 'text-danger': getFleetStats.defense < stats.defense }">{{ getFleetStats.defense }}</small>
                                <small class="ms-1">{{ $t('defense') }}</small>
                            </div>
                            <div class="col text-end">
                                <small :class="{ 'text-light': getFleetStats.speed >= stats.speed, 'text-danger': getFleetStats.speed < stats.speed }">{{ getFleetStats.speed }}</small>
                                <small class="ms-1">{{ $t('speed') }}</small>
                            </div>
                        </div>
                    </div>
                    
                </div>
                <div class="pt-2 row g-2 align-items-center justify-content-end">
                
                    <div class="col-auto">
                        <button type="button" class="btn btn-primary d-flex align-items-center" :class="{ 'disabled text-danger':can != 0 }" @click="conquer(itemId)">
                            <img class="me-1" :src="require(`../assets/icons/conquest.png`)" width="12" height="12" :alt="$t('conquest')" />
                            <span v-if="can == 0">{{ $t('button-conquer') }}</span>
                            <span v-if="can == -1">{{ $t('not-enough-ship') }}</span>
                            <span v-if="[-2, -3, -4].includes(can)">{{ $t('error') }}</span>
                        </button>
                    </div>
                    
                </div>
            </div>
            
            <block-statue v-if="status == 'conquered'" :itemId="itemId" />
            
            <div v-if="status == 'statued'" class="col text-end">
                <small>{{ $t('statueBuilt-desc1') }}</small>
            </div>
            
        </template>

    </card>
</template>

<script>
import BlockExplore from './BlockExplore.vue'
import BlockStatue from './BlockStatue.vue'

import Card from './Card.vue'

import { mapGetters, mapActions } from 'vuex'

export default {
    props: [ 'id', 'name', 'itemId' ],
    components: {
        
        'block-explore': BlockExplore,
        'block-statue': BlockStatue,
        
        'card': Card,
    },
    computed: {
    
        ...mapGetters([ 'isUnlocked', 'getItemStatus', 'getItemDistance', 'getItemStats', 'getFleetStats', 'canConquer', 'getStarResources', 'isDonor' ]),
        
        unlocked: function() { return this.isUnlocked(this.itemId) },
        status: function() { return this.getItemStatus(this.itemId) },
        distance: function() { return this.getItemDistance(this.itemId) },
        stats: function() { return this.getItemStats(this.itemId, 1) },
        can: function() { return this.canConquer(this.itemId) },
        resources: function() { return this.getStarResources(this.itemId) },
        donor: function() { return this.isDonor(this.itemId) },
    },
    methods: {
    
        ...mapActions([ 'conquer' ]),
    },
}
</script>