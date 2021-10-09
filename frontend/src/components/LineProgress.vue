<template>
    <div class="progress" style="height: 1px; margin-top: 2px">
        <div class="progress-bar bg-success" role="progressbar" :style="'width:' + progress +'%'" :aria-valuenow="progress" aria-valuemin="0" :aria-valuemax="count" />
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    props: [ 'itemId', 'count' ],
    computed: {
    
        ...mapGetters([ 'getItemCount' ]),
        
        progress: function() { return Math.min(100, ((this.getItemCount(this.itemId) / this.count) * 100).toFixed()) },
    },
}
</script>