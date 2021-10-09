<template>
    <div v-if="unlocked" class="col small">
    
        <i v-if="icon" :class="'text-steelblue small fa fa-fw me-1 ' + icon"></i>
        <span class="text-steelblue text-uppercase">{{ $t(name) }}</span>
        
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    props: [ 'icon', 'name', 'unlockerIds' ],
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