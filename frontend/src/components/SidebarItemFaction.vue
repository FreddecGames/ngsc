<template>
    <sidebar-item :name="name" :icon="icon" :paneId="paneId" :unlockerIds="[ 'shipT1' ]">
        <template v-slot:extra>
        
            <div class="col-auto text-end small">
                <img class="me-1" :src="require(`../assets/icons/conquest.png`).default" width="12" height="12" :alt="$t('statue')" />
                <small class="text-light">{{ currentStar }}</small>
            </div>
            
            <div class="col-auto text-end small">
                <img class="me-1" :src="require(`../assets/icons/statue.png`).default" width="12" height="12" :alt="$t('statue')" />
                <small class="text-light">{{ currentStatue }}</small>
            </div>
            
            <div class="col-auto text-end small">
                <small class="text-normal">/{{ possibleStar}} ({{ totalStar }})</small>
            </div>
            
        </template>
    </sidebar-item>
</template>

<script>
import SidebarItem from './SidebarItem.vue'

import { mapGetters } from 'vuex'

export default {
    props: [ 'name', 'icon', 'paneId', 'faction' ],
    components: {
        
        'sidebar-item': SidebarItem,
    },
    computed: {
    
        ...mapGetters([ 'getStarCount', 'getConqueredStarCount', 'getStatueStarCount', 'getUnlockedStarCount' ]),
    
        totalStar: function () { return this.getStarCount(this.faction) },
        currentStar: function () { return this.getConqueredStarCount(this.faction) },
        currentStatue: function () { return this.getStatueStarCount(this.faction) },
        possibleStar: function () { return this.getUnlockedStarCount(this.faction) },
    },
}
</script>