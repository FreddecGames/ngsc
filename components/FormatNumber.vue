<script setup>

    const props = defineProps([ 'value' ])
    
    const format = computed(() => {
        
        let num = parseFloat(Math.abs(props.value))
        if (num > 0 && num < 1e3) return Math.round(parseFloat(props.value) * 100) / 100
        num = Math.floor(num)
        
        const lookup = [
            { value: 1e3, symbol: "k" },
            { value: 1e6, symbol: "M" },
            { value: 1e9, symbol: "G" },
            { value: 1e12, symbol: "T" },
            { value: 1e15, symbol: "P" },
            { value: 1e18, symbol: "E" }
        ]

        const rx = /\.0+$|(\.[0-9]*[1-9])0+$/
        
        let item = lookup.slice().reverse().find(function(item) { return num >= item.value })
        if (props.value < 0) num *= -1
        return (item ? (num / item.value).toPrecision(4).replace(rx, '$1') + item.symbol : '0')
    })
    
</script>

<template>
    {{ format }}
</template>
