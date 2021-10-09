<template>
    <li class="nav-item col" role="presentation">
        <button class="nav-link" :class="{ 'active':activeTab == paneId }" data-bs-toggle="tab" :data-bs-target="'#' + paneId" type="button" role="tab" :aria-controls="paneId" @click="setActiveTab(paneId)">
            <div class="h6"><i :class="'fas fa-fw fa-' + icon"></i></div>
            <div class="position-relative">
                <i v-if="notified" class="small me-1 fas fa-fw fa-certificate text-success"></i>
                <small>{{ $t(name) }}</small>
                <slot name="extra" />
            </div>
        </button>
    </li>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
    props: [ 'name', 'icon', 'paneId', 'notifIds' ],
    computed: {
    
        ...mapState([ 'activeTab' ]),
        
        ...mapGetters([ 'isNotified' ]),
        
        notified: function() {
            let result = false
            if (this.notifIds) {
                for (let i = 0; i < this.notifIds.length; i++) {
                    let id = this.notifIds[i]
                    if (this.isNotified(id)) result = true
                }
            }
            return result
        },
    },
    methods: {
    
        ...mapActions([ 'setActiveTab' ]),
    },
}
</script>