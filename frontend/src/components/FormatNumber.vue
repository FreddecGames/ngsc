<template>
    {{ format }}
</template>

<script>
export default {
    props: [ 'value' ],
    computed: {
    
        format: function() {
            
            let num = parseFloat(Math.abs(this.value))
            if (num > 0 && num < 1) return num.toFixed(1)
            
            const lookup = [
                { value: 1, symbol: "" },
                { value: 1e3, symbol: "k" },
                { value: 1e6, symbol: "M" },
                { value: 1e9, symbol: "G" },
                { value: 1e12, symbol: "T" },
                { value: 1e15, symbol: "P" },
                { value: 1e18, symbol: "E" }
            ]
    
            const rx = /\.0+$|(\.[0-9]*[1-9])0+$/
            
            let item = lookup.slice().reverse().find(function(item) { return num >= item.value })
            if (this.value < 0) num *= -1
            return (item ? (num / item.value).toPrecision(4).replace(rx, '$1') + item.symbol : '0')
        }
    },
}
</script>