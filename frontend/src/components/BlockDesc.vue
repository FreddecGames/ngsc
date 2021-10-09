<template>
    <div class="col">
        <div class="row row-cols-1 g-1">
            <div v-for="desc in descs" :key="desc" class="col small">
                <i>{{ $t(desc) }}</i>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: [ 'descs' ],
}
</script>