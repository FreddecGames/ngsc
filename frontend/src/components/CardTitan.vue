<template>
    <div class="col-4 col-sm-4 col-lg-2">
        <div class="card card-body">
            <div class="row row-cols-1 g-2">
    
                <div class="col text-center">
                    <span class="text-uppercase">{{ $t(name) }}</span>
                </div>
                
                <div class="col text-center">
                    <img class="me-1" :src="require(`../assets/icons/${icon}`).default" width="24" height="24" :alt="$t(name)" />
                </div>
                
                <div v-if="count < 1" class="col">
                    <button type="button" class="w-100 btn btn-primary" :class="{ 'disabled':ulCount < 10 }" @click="build({ id:itemId, count:1 })">
                        <div class="w-100 row gx-1 align-items-center justify-content-center">
                        
                            <div class="col-auto d-flex align-items-center">
                                <img class="me-1" :src="require(`../assets/icons/ultrite.png`).default" width="12" height="12" :alt="$t('darkmatter')" />
                                10
                            </div>
                            
                            <div class="col-auto d-flex align-items-center">
                                {{ $t('button-activate') }}
                            </div>
                            
                        </div>
                    </button>
                </div>
                
                <div v-if="count > 0" class="col text-center">
                    <small class="text-success text-uppercase">{{ $t('activated') }}</small>
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
        ulCount: function() { return this.getItemCount('ultrite') },
    },
    methods: {
    
        ...mapActions([ 'build' ]),
    },
}
</script>