<template>
    <div class="progress" style="height: 1px; margin-top: 2px">
        <div class="progress-bar bg-success" role="progressbar" :style="'width:' + progress +'%'" :aria-valuenow="progress" aria-valuemin="0" :aria-valuemax="count" />
    </div>
</template>

<script>
export default {
    props: [ 'count', 'progress' ],
}
</script>