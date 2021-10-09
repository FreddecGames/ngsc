<template>
    <div v-if="unlocked" class="col nav nav-tabs border-0" role="tablist">
        <div class="w-100 row row-cols-1 g-0">
        
            <slot />
            
        </div>
    </div>
</template>

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