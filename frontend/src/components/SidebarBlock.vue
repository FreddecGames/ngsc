<template>
    <div v-if="unlocked" class="sidebar-block">
        <div class="row row-cols-1 g-2">
        
            <slot />
            
        </div>
    </div>
</template>

<style>
    .sidebar-block {
        flex-shrink: 0; min-height: 0;
        padding: .5rem .75rem .5rem .25rem;
    }
    
    .sidebar-block:last-child {
        flex-shrink: inherit;
        margin-bottom: 52px;
        padding-bottom: 32px;
    }
</style>

<script>
import { mapGetters } from 'vuex'

export default {
    props: [ 'unlockerIds' ],
    computed: {
    
        ...mapGetters([ 'isUnlocked' ]),
        
        unlocked: function() {
            let result = false
            if (this.unlockerIds) {
                for (let i = 0; i < this.unlockerIds.length; i++) {
                    let id = this.unlockerIds[i]
                    if (this.isUnlocked(id)) result = true
                }
            }
            else result = true
            return result
        },
    },
}
</script>