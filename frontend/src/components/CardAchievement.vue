<template>
    <div v-if="unlocked" class="col-12 col-sm-6 col-lg-4">
        <div class="card">
        
            <div class="card-header">
                <div class="row g-2 align-items-center">
                
                    <div class="col d-flex align-items-center">
                        <img class="me-1" :src="require(`../assets/icons/${icon}`).default" width="12" height="12" :alt="$t(name)" />
                        <span class="text-uppercase text-steelblue">{{ $t(name) }}</span>
                    </div>
                    
                    <div v-if="dmUnlocked" class="col-auto d-flex align-items-center">
                        <img class="me-1" :src="require(`../assets/icons/darkmatter.png`).default" width="12" height="12" :alt="$t('darkmatter')" />
                        <small class="text-success">+{{ darkmatter }}</small>
                    </div>
                    
                </div>
            </div>
            
            <div class="card-body">
                <div class="row row-cols-1 g-2">
                    <slot />
                </div>
            </div>

        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    props: [ 'name', 'icon', 'unlockerId', 'achs' ],
    computed: {
    
        ...mapGetters([ 'isUnlocked', 'getItemCount' ]),
        
        unlocked: function() { return this.isUnlocked(this.unlockerId) },
        dmUnlocked: function() { return this.isUnlocked('darkmatter') },
        
        darkmatter: function() {
            let dm = 0
            this.achs.forEach(itemId => { dm += this.getItemCount(itemId) })
            return dm
        },
    },
}
</script>