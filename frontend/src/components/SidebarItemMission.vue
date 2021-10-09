<template>
    <sidebar-item v-if="unlocked" :name="name" :icon="icon" :paneId="paneId">
        <template v-slot:extra>
        
            <div v-if="count >= max" class="col-auto text-end small">
                <small class="text-uppercase text-success">Completed</small>
            </div>
            
            <div v-if="count < max" class="col-auto text-end small">
                <span class="text-light">{{ count }}</span>
                <small class="text-normal ms-1">/{{ max }}</small>
            </div>
            
        </template>
    </sidebar-item>
</template>

<script>
import SidebarItem from './SidebarItem.vue'

import { mapGetters } from 'vuex'

export default {
    props: [ 'name', 'icon', 'paneId', 'missions' ],
    components: {
        
        'sidebar-item': SidebarItem,
    },
    computed: {
        
        ...mapGetters([ 'isUnlocked', 'getItemCount', 'getItemMax' ]),
        
        unlocked: function() { 
            let result = false
            if (this.missions) {
                for (let i = 0; i < this.missions.length; i++) {
                    let item = this.missions[i]
                    if (this.isUnlocked(item)) result = true
                }
            }
            else result = true
            return result
        },
        
        count: function() { 
            let count = 0
            if (this.missions) {
                for (let i = 0; i < this.missions.length; i++) {
                    let item = this.missions[i]
                    if (this.getItemCount(item) >= this.getItemMax(item)) count++
                }
            }
            return count
        },
        
        max: function() { return this.missions.length },
    },
}
</script>