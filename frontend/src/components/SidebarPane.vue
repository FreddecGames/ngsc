<template>
    <div class="h-100 tab-pane" :class="{ 'active':activeTab == id }" :id="id" role="tabpanel" :aria-labelledby="id + '-tab'">
        <div class="h-100 d-flex flex-column">
            
            <slot />

        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
    props: [ 'id' ],
    computed: {
    
        ...mapState([ 'activeTab' ]),
    },
}
</script>