<template>

    <button type="button" class="btn btn-primary" :class="{ 'disabled':!can }" @click="meetModal.show()">
        {{ $t('button-meet') }}
    </button>
    
</template>

<script>
import { Modal } from 'bootstrap'

import { mapGetters } from 'vuex'

export default {
    created() {

        this.$nextTick(() => {
        
            let element = document.getElementById('meetModal')
            this.meetModal = new Modal(element)
        })
    },
    computed: {
    
        ...mapGetters([ 'getItemCount' ]),
        
        can: function() { return this.getItemCount('statue') >= 150 },
    },
    beforeUnmount() {
    
        delete this.meetModal
    },
}
</script>