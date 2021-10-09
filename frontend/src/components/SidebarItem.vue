<template>
    <div v-if="unlocked" class="col ps-1">
        <div class="btn-group ps-2 w-100 position-relative">
            
            <div v-if="notified" class="position-absolute top-0 left-0 small" style="z-index: 1;">
                <i class="fas fa-fw fa-certificate text-success small"></i>
            </div>
            
            <button type="button" class="btn pe-0 w-100" :class="{ 'active':activePane == paneId }" data-bs-toggle="tab" :data-bs-target="'#' + paneId" role="tab" :aria-controls="paneId" @click="setSidebarOpen(false); setActivePane(paneId); unNotified(paneId);">
                <div class="row g-2 w-100">
                
                    <div class="col d-flex align-items-center">
                        <img class="me-2" :src="require(`../assets/icons/${icon}`)" width="16" height="16" :alt="name" />
                        <span>{{ $t(name) }}</span>
                    </div>
                    
                    <slot name="extra" />
                    
                </div>
            </button>
            
            <slot name="buttons" />
            
        </div>
    </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
    props: [ 'name', 'icon', 'paneId', 'unlockerIds' ],
    computed: {
    
        ...mapState([ 'sidebarOpen', 'activePane' ]),
        
        ...mapGetters([ 'isUnlocked', 'isNotified' ]),
        
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
        
        notified: function() { return this.isNotified(this.paneId) },
    },
    methods: {
    
        ...mapActions([ 'setSidebarOpen', 'setActivePane', 'unNotified' ]),
    },
}
</script>