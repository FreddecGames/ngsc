<template>
    <div class="col-4 col-sm-4 col-lg-2">
        <div class="card card-body">
            <div class="row row-cols-1 g-2">
    
                <div class="col text-center">
                    <img class="me-1" :src="require(`../assets/icons/${icon}`)" width="12" height="12" :alt="$t(name)" />
                    <span class="text-uppercase text-steelblue">{{ $t(name) }}</span>
                </div>
                
                <div class="col text-center">
                    <span class="h5" :class="{ 'text-muted':count <= 0, 'text-success':count > 0 }">+{{ count }}%</span>
                </div>
                
                <div class="col">
                    <button type="button" class="w-100 btn btn-primary" :class="{ 'disabled':dmCount < 1 }" @click="build({ id:itemId, count:1 })">
                        <div class="w-100 row gx-1 align-items-center justify-content-center">
                        
                            <div class="col-auto d-flex align-items-center">
                                <img class="me-1" :src="require(`../assets/icons/darkmatter.png`)" width="12" height="12" :alt="$t('darkmatter')" />
                                1
                            </div>
                            
                            <div class="col-auto">
                                <i class="text-normal fas fa-fw fa-long-arrow-alt-right"></i>
                            </div>
                            
                            <div class="col-auto d-flex align-items-center">
                                +1%
                            </div>
                            
                        </div>
                    </button>
                </div>
                
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
    props: [ 'name', 'icon', 'itemId' ],
    computed: {
    
        ...mapGetters([ 'getItemCount' ]),
        
        count: function() { return this.getItemCount(this.itemId) },
        dmCount: function() { return this.getItemCount('darkmatter') },
    },
    methods: {
    
        ...mapActions([ 'build' ]),
    },
}
</script>