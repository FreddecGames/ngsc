<template>
    <page-pane :id="id" :name="name" :icon="icon">
        
        <template v-slot:titleBar>
        
            <div class="col-auto text-end">
                <img class="me-1" :src="require(`../assets/icons/conquest.png`).default" width="12" height="12" :alt="$t('statue')" />
                <span class="text-light">{{ conquered }}</span>
                <small class="text-normal ms-1">/{{ stars }}</small>
            </div>
            
            <div class="col-auto text-end">
                <img class="me-1" :src="require(`../assets/icons/statue.png`).default" width="12" height="12" :alt="$t('statue')" />
                <span class="text-light">{{ statues }}</span>
                <small class="text-normal ms-1">/{{ stars }}</small>
            </div>

        </template>
        
        <card id="carnelianDescCard" name="description">
            <template v-slot:col-1>
                <block-desc :descs="descs1" />
            </template>
            <template v-slot:col-2>
                <block-desc :descs="descs2" />
            </template>
        </card>
        
        <slot />
        
    </page-pane>
</template>

<script>
import BlockDesc from './BlockDesc.vue'

import Card from './Card.vue'

import PagePane from './PagePane.vue'

import { mapGetters } from 'vuex'

export default {
    props: [ 'id', 'name', 'icon', 'faction', 'descs1', 'descs2' ],
    components: {
        
        'block-desc': BlockDesc,
        
        'card': Card,
        
        'page-pane': PagePane,
    },
    computed: {
    
        ...mapGetters([ 'getStarCount', 'getConqueredStarCount', 'getStatueStarCount' ]),
        
        stars: function() { return this.getStarCount(this.faction) },
        conquered: function() { return this.getConqueredStarCount(this.faction) },
        statues: function() { return this.getStatueStarCount(this.faction) },
    },
}
</script>