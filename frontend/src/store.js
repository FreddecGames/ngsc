import { createStore } from 'vuex'

import LZString from 'lz-string'

function costCompare(cost1, cost2) {
    
    if (!cost1 || !cost2) {
        return false;
    }
    
    if (cost1.length != cost2.length) {
        return false;
    }
    
    for (let i = 0, l = cost1.length; i < l; i++) {

        if (cost1[i].id != cost2[i].id) return false
        if (cost1[i].count != cost2[i].count) return false
        if (cost1[i].coeff != cost2[i].coeff) return false
        if (cost1[i].mod != cost2[i].mod) return false
        if (cost1[i].base != cost2[i].base) return false
        if (cost1[i].progress != cost2[i].progress) return false
        if (cost1[i].timer != cost2[i].timer) return false
    }
    return true;
}

const base = {
    
    /*------------------------------------------------------------------------*/
    energy: {
        storage:{ max:50, count:50, coeff:2, costs:[{ id:'energy', count:50, coeff:2 }] },
        prod:0,
    },
    energyT1: {
        destroyable:true,
        build:{ counts:[1], multi:true, next:true, costs:[{ id:'metal', count:30, coeff:1.1 }, { id:'gem', count:35, coeff:1.1 }] },
        outputs:[{ id:'energy', count:1.5 }],
    },
    energyT2: {
        destroyable:true,
        build:{ counts:[1], multi:true, next:true, costs:[{ id:'metal', count:50, coeff:1.1 }, { id:'gem', count:25, coeff:1.1 }] },
        outputs:[{ id:'energy', count:2 }],
        inputs:[{ id:'carbon', count:1 }],
    },
    energyT3: {
        destroyable:true,
        build:{ counts:[1], multi:true, next:true, costs:[{ id:'lunarite', count:110, coeff:1.1 }, { id:'titanium', count:90, coeff:1.1 }] },
        outputs:[{ id:'energy', count:23 }],
        inputs:[{ id:'methane', count:6 }],
    },
    energyT4: {
        destroyable:true,
        build:{ counts:[1], multi:true, next:true, costs:[{ id:'lunarite', count:20000, coeff:1.1 }, { id:'titanium', count:10000, coeff:1.1 }] },
        outputs:[{ id:'energy', count:153 }],
        inputs:[{ id:'uranium', count:7 }],
    },
    energyT5: {
        destroyable:true,
        build:{ counts:[1], multi:true, next:true, costs:[{ id:'lunarite', count:25000, coeff:1.1 }, { id:'gem', count:30000, coeff:1.1 }, { id:'silver', count:20000, coeff:1.1 }] },
        outputs:[{ id:'energy', count:191 }],
        inputs:[{ id:'lava', count:11 }],
    },
    energyT6: {
        destroyable:true,
        build:{ counts:[1], multi:true, next:true, costs:[{ id:'lunarite', count:30000, coeff:1.1 }, { id:'titanium', count:20000, coeff:1.1 }, { id:'silicon', count:15000, coeff:1.1 }] },
        outputs:[{ id:'energy', count:273 }],
        inputs:[{ id:'hydrogen', count:10 }, { id:'helium', count:10 }],
    },
    /*------------------------------------------------------------------------*/
    plasma: {
        gain:{ counts:[1], costs:[{ id:'energy', count:1000 }, { id:'hydrogen', count:10 }] },
        storage:{ max:50, count:50, coeff:2, costs:[{ id:'plasma', count:50, coeff:2 }] },
        prod:0,
    },
    plasmaT1: {
        destroyable:true,
        build:{ counts:[1], multi:true, next:true, costs:[{ id:'lunarite', count:75000, coeff:1.1 }, { id:'gem', count:68000, coeff:1.1 }, { id:'silicon', count:59000, coeff:1.1 }] },
        outputs:[{ id:'plasma', count:1 }],
        inputs:[{ id:'energy', count:1000 }, { id:'hydrogen', count:10 }],
    },
    plasmaT2: {
        destroyable:true,
        build:{ counts:[1], multi:true, next:true, costs:[{ id:'lunarite', count:810000, coeff:1.1 }, { id:'silicon', count:720000, coeff:1.1 }, { id:'meteorite', count:970, coeff:1.1 }] },
        outputs:[{ id:'plasma', count:13 }],
        inputs:[{ id:'energy', count:8500 }, { id:'helium', count:85 }],
    },
    plasmaT3: {
        destroyable:true,
        build:{ counts:[1], multi:true, next:true, costs:[{ id:'lunarite', count:6200000, coeff:1.1 }, { id:'silicon', count:5900000, coeff:1.1 }, { id:'meteorite', count:12100, coeff:1.1 }] },
        outputs:[{ id:'plasma', count:160 }],
        inputs:[{ id:'energy', count:71000 }, { id:'helium', count:750 }, { id:'hydrogen', count:650 }]
    },
    plasmaT4: {
        destroyable:true,
        build:{ counts:[1], multi:true, next:true, costs:[{ id:'carbon', count:51000000, coeff:1.1 }, { id:'silicon', count:44000000, coeff:1.1 }, { id:'meteorite', count:147000, coeff:1.1 }] },
        outputs:[{ id:'plasma', count:2000 }],
        inputs:[{ id:'energy', count:600000 }, { id:'helium', count:5800 }, { id:'hydrogen', count:6000 }],
    },
    /*------------------------------------------------------------------------*/
    meteorite: {
        gain:{ counts:[1], costs:[{ id:'plasma', count:3 }] },
        storage:{ max:50, count:50, coeff:2, costs:[{ id:'meteorite', count:50, coeff:2 }] },
        conversion:{ costs:[{ id:'plasma', count:3 }] },
        prod:0,
    },
    meteoriteT1: {
        destroyable:true,
        build:{ counts:[1], multi:true, next:true, costs:[{ id:'lunarite', count:100000, coeff:1.1 }, { id:'silicon', count:60000, coeff:1.1 }] },
        outputs:[{ id:'meteorite', count:1 }],
        inputs:[{ id:'plasma', count:3 }],
    },
    meteoriteT2: {
        destroyable:true,
        build:{ counts:[1], multi:true, next:true, costs:[{ id:'lunarite', count:940000, coeff:1.1 }, { id:'uranium', count:490000, coeff:1.1 }, { id:'silicon', count:510000, coeff:1.1 }] },
        outputs:[{ id:'meteorite', count:8 }],
        inputs:[{ id:'plasma', count:21 }],
    },
    meteoriteT3: {
        destroyable:true,
        build:{ counts:[1], multi:true, next:true, costs:[{ id:'silicon', count:3230000, coeff:1.1 }, { id:'silver', count:5890000, coeff:1.1 }, { id:'gem', count:8340000, coeff:1.1 }] },
        outputs:[{ id:'meteorite', count:72 }],
        inputs:[{ id:'plasma', count:111 }],
    },
    meteoriteT4: {
        destroyable:true,
        build:{ counts:[1], multi:true, next:true, costs:[{ id:'lunarite', count:25800000, coeff:1.1 }, { id:'lava', count:19700000, coeff:1.1 }, { id:'gold', count:21900000, coeff:1.1 }] },
        outputs:[{ id:'meteorite', count:142 }],
        inputs:[{ id:'plasma', count:135 }],
    },
    /*------------------------------------------------------------------------*/
    carbon: {
        gain:{ counts:[1], costs:[{ id:'wood', count:2 }] },
        storage:{ max:50, count:50, coeff:2, costs:[{ id:'carbon', count:50, coeff:2 }, { id:'metal', count:20, coeff:2 }] },
        conversion:{ costs:[{ id:'energy', count:2 }] },
        prod:0,
    },
    carbonT1: {
        destroyable:true,
        build:{ counts:[1], multi:true, next:true, costs:[{ id:'metal', count:10, coeff:1.1 }, { id:'wood', count:5, coeff:1.1 }] },
        outputs:[{ id:'carbon', count:1 }],
        inputs:[{ id:'wood', count:2 }],
    },
    carbonT2: {
        destroyable:true,
        build:{ counts:[1], multi:true, next:true, costs:[{ id:'metal', count:80, coeff:1.1 }, { id:'wood', count:40, coeff:1.1 }, { id:'oil', count:100, coeff:1.1 }] },
        outputs:[{ id:'carbon', count:4 }],
        inputs:[{ id:'energy', count:3 }, { id:'wood', count:6 }],
    },
    carbonT3: {
        destroyable:true,
        build:{ counts:[1], multi:true, next:true, costs:[{ id:'lunarite', count:3500, coeff:1.1 }, { id:'gem', count:6200, coeff:1.1 }, { id:'silicon', count:3800, coeff:1.1 }] },
        outputs:[{ id:'carbon', count:53 }],
        inputs:[{ id:'energy', count:13 }, { id:'wood', count:56 }, { id:'lava', count:2 }], 
    },
    carbonT4: {
        destroyable:true,
        build:{ counts:[1], multi:true, next:true, costs:[{ id:'lunarite', count:15800, coeff:1.1 }, { id:'lava', count:12500, coeff:1.1 }, { id:'meteorite', count:560, coeff:1.1 }] },
        outputs:[{ id:'carbon', count:210 }],
        inputs:[{ id:'energy', count:34 }, { id:'wood', count:148 }, { id:'plasma', count:1 }],
    },
    carbonT5: {
        destroyable:true,
        build:{ counts:[1], multi:true, next:true, costs:[{ id:'metal', count:133000, coeff:1.1 }, { id:'wood', count:189000, coeff:1.1 }, { id:'lava', count:160000, coeff:1.1 }] },
        outputs:[{ id:'carbon', count:2267 }],
        inputs:[{ id:'energy', count:187 }, { id:'wood', count:950 }],
    },
    /*------------------------------------------------------------------------*/
    oil: {
        gain:{ counts:[1] },
        storage:{ max:50, count:50, coeff:2, costs:[{ id:'oil', count:50, coeff:2 }, { id:'metal', count:20, coeff:2 }] },
        conversion:{ costs:[{ id:'energy', count:3 }] },
        prod:0,
    },
    oilT1: {
        destroyable:true,
        build:{ counts:[1], multi:true, next:true, costs:[{ id:'metal', count:60, coeff:1.1 }, { id:'gem', count:20, coeff:1.1 }] },
        outputs:[{ id:'oil', count:1 }],
    },
    oilT2: {
        destroyable:true,
        build:{ counts:[1], multi:true, next:true, costs:[{ id:'metal', count:250, coeff:1.1 }, { id:'gem', count:80, coeff:1.1 }, { id:'oil', count:50, coeff:1.1 }] },
        outputs:[{ id:'oil', count:10 }],
        inputs:[{ id:'energy', count:4 }],
    },
    oilT3: {
        destroyable:true,
        build:{ counts:[1], multi:true, next:true, costs:[{ id:'lunarite', count:2400, coeff:1.1 }, { id:'titanium', count:2700, coeff:1.1 }, { id:'silicon', count:3900, coeff:1.1 }] },
        outputs:[{ id:'oil', count:127 }],
        inputs:[{ id:'energy', count:17 }],
    },
    oilT4: {
        destroyable:true,
        build:{ counts:[1], multi:true, next:true, costs:[{ id:'lunarite', count:19400, coeff:1.1 }, { id:'titanium', count:16800, coeff:1.1 }, { id:'meteorite', count:760, coeff:1.1 }] },
        outputs:[{ id:'oil', count:498 }],
        inputs:[{ id:'energy', count:44 }],
    },
    oilT5: {
        destroyable:true,
        build:{ counts:[1], multi:true, next:true, costs:[{ id:'uranium', count:110000, coeff:1.1 }, { id:'carbon', count:96000, coeff:1.1 }, { id:'lava', count:167000, coeff:1.1 }] },
        outputs:[{ id:'oil', count:4444 }],
        inputs:[{ id:'energy', count:258 }],
    },
    /*------------------------------------------------------------------------*/
    metal: {
        gain:{ counts:[1] },
        storage:{ max:50, count:50, coeff:2, costs:[{ id:'metal', count:50, coeff:2 }] },
        conversion:{ costs:[{ id:'energy', count:1 }] },
        prod:0,
    },
    metalT1: {
        destroyable:true,
        build:{ counts:[1], multi:true, next:true, costs:[{ id:'metal', count:10, coeff:1.1 }, { id:'wood', count:5, coeff:1.1 }] },
        outputs:[{ id:'metal', count:1 }],
    },
    metalT2: {
        destroyable:true,
        build:{ counts:[1], multi:true, next:true, costs:[{ id:'metal', count:160, coeff:1.1 }, { id:'gem', count:60, coeff:1.1 }, { id:'oil', count:50, coeff:1.1 }] },
        outputs:[{ id:'metal', count:8 }],
        inputs:[{ id:'energy', count:2 }],
    },
    metalT3: {
        destroyable:true,
        build:{ counts:[1], multi:true, next:true, costs:[{ id:'lunarite', count:2800, coeff:1.1 }, { id:'gem', count:3400, coeff:1.1 }, { id:'silicon', count:4100, coeff:1.1 }] },
        outputs:[{ id:'metal', count:108 }],
        inputs:[{ id:'energy', count:9 }],
    },
    metalT4: {
        destroyable:true,
        build:{ counts:[1], multi:true, next:true, costs:[{ id:'lunarite', count:29000, coeff:1.1 }, { id:'gold', count:18700, coeff:1.1 }, { id:'meteorite', count:900, coeff:1.1 }] },
        outputs:[{ id:'metal', count:427 }],
        inputs:[{ id:'energy', count:24 }],
    },
    metalT5: {
        destroyable:true,
        build:{ counts:[1], multi:true, next:true, costs:[{ id:'titanium', count:184000, coeff:1.1 }, { id:'gold', count:133000, coeff:1.1 }, { id:'oil', count:170000, coeff:1.1 }] },
        outputs:[{ id:'metal', count:4768 }],
        inputs:[{ id:'energy', count:131 }],
    },
    /*------------------------------------------------------------------------*/
    gem: {
        gain:{ counts:[1] },
        storage:{ max:50, count:50, coeff:2, costs:[{ id:'gem', count:50, coeff:2 }, { id:'metal', count:20, coeff:2 }] },
        conversion:{ costs:[{ id:'energy', count:3 }] },
        prod:0,
    },
    gemT1: {
        destroyable:true,
        build:{ counts:[1], multi:true, next:true, costs:[{ id:'metal', count:15, coeff:1.1 }, { id:'gem', count:10, coeff:1.1 }] },
        outputs:[{ id:'gem', count:1 }],
    },
    gemT2: {
        destroyable:true,
        build:{ counts:[1], multi:true, next:true, costs:[{ id:'metal', count:120, coeff:1.1 }, { id:'gem', count:200, coeff:1.1 }, { id:'oil', count:60, coeff:1.1 }] },
        outputs:[{ id:'gem', count:4 }],
        inputs:[{ id:'energy', count:2 }],
    },
    gemT3: {
        destroyable:true,
        build:{ counts:[1], multi:true, next:true, costs:[{ id:'lunarite', count:3400, coeff:1.1 }, { id:'gem', count:8000, coeff:1.1 }, { id:'silicon', count:4500, coeff:1.1 }] },
        outputs:[{ id:'gem', count:89 }],
        inputs:[{ id:'energy', count:15 }],
    },
    gemT4: {
        destroyable:true,
        build:{ counts:[1], multi:true, next:true, costs:[{ id:'lunarite', count:21000, coeff:1.1 }, { id:'gem', count:27000, coeff:1.1 }, { id:'meteorite', count:800, coeff:1.1 }] },
        outputs:[{ id:'gem', count:358 }],
        inputs:[{ id:'energy', count:40 }],
    },
    gemT5: {
        destroyable:true,
        build:{ counts:[1], multi:true, next:true, costs:[{ id:'uranium', count:181000, coeff:1.1 }, { id:'carbon', count:185000, coeff:1.1 }, { id:'meteorite', count:12500, coeff:1.1 }] },
        outputs:[{ id:'gem', count:3747 }],
        inputs:[{ id:'energy', count:260 }],
    },
    /*------------------------------------------------------------------------*/
    wood: {
        gain:{ counts:[1] },
        storage:{ max:50, count:50, coeff:2, costs:[{ id:'wood', count:50, coeff:2 }, { id:'metal', count:20, coeff:2 }] },
        conversion:{ costs:[{ id:'energy', count:1 }] },
        prod:0,
    },
    woodT1: {
        destroyable:true,
        build:{ counts:[1], multi:true, next:true, costs:[{ id:'metal', count:10, coeff:1.1 }, { id:'wood', count:5, coeff:1.1 }] },
        outputs:[{ id:'wood', count:1 }],
    },
    woodT2: {
        destroyable:true,
        build:{ counts:[1], multi:true, next:true, costs:[{ id:'metal', count:50, coeff:1.1 }, { id:'gem', count:90, coeff:1.1 }, { id:'oil', count:40, coeff:1.1 }] },
        outputs:[{ id:'wood', count:6 }],
        inputs:[{ id:'energy', count:4 }],
    },
    woodT3: {
        destroyable:true,
        build:{ counts:[1], multi:true, next:true, costs:[{ id:'lunarite', count:3000, coeff:1.1 }, { id:'titanium', count:2700, coeff:1.1 }, { id:'silicon', count:2500, coeff:1.1 }] },
        outputs:[{ id:'wood', count:74 }],
        inputs:[{ id:'energy', count:16 }],
    },
    woodT4: {
        destroyable:true,
        build:{ counts:[1], multi:true, next:true, costs:[{ id:'lunarite', count:16000, coeff:1.1 }, { id:'oil', count:31200, coeff:1.1 }, { id:'meteorite', count:490, coeff:1.1 }] },
        outputs:[{ id:'wood', count:297 }],
        inputs:[{ id:'energy', count:43 }],
    },
    woodT5: {
        destroyable:true,
        build:{ counts:[1], multi:true, next:true, costs:[{ id:'metal', count:122000, coeff:1.1 }, { id:'gem', count:151000, coeff:1.1 }, { id:'hydrogen', count:183000, coeff:1.1 }] },
        outputs:[{ id:'wood', count:3278 }],
        inputs:[{ id:'energy', count:244 }],
    },
    /*------------------------------------------------------------------------*/
    silicon: {
        gain:{ counts:[1] },
        storage:{ max:50, count:50, coeff:2, costs:[{ id:'silicon', count:50, coeff:2 }, { id:'lunarite', count:20, coeff:2 }] },
        conversion:{ costs:[{ id:'energy', count:23 }] },
        prod:0,
    },
    siliconT1: {
        destroyable:true,
        build:{ counts:[1], multi:true, next:true, costs:[{ id:'lunarite', count:150, coeff:1.1 }, { id:'titanium', count:30, coeff:1.1 }] },
        outputs:[{ id:'silicon', count:1 }],
    },
    siliconT2: {
        destroyable:true,
        build:{ counts:[1], multi:true, next:true, costs:[{ id:'lunarite', count:500, coeff:1.1 }, { id:'gem', count:1200, coeff:1.1 }, { id:'oil', count:1600, coeff:1.1 }] },
        outputs:[{ id:'silicon', count:9 }],
        inputs:[{ id:'energy', count:18 }],
    },
    siliconT3: {
        destroyable:true,
        build:{ counts:[1], multi:true, next:true, costs:[{ id:'lunarite', count:3000, coeff:1.1 }, { id:'gem', count:8300, coeff:1.1 }, { id:'silver', count:2400, coeff:1.1 }] },
        outputs:[{ id:'silicon', count:40 }],
        inputs:[{ id:'energy', count:53 }],
    },
    siliconT4: {
        destroyable:true,
        build:{ counts:[1], multi:true, next:true, costs:[{ id:'lunarite', count:20000, coeff:1.1 }, { id:'silicon', count:17700, coeff:1.1 }, { id:'meteorite', count:400, coeff:1.1 }] },
        outputs:[{ id:'silicon', count:157 }],
        inputs:[{ id:'energy', count:138 }],
    },
    siliconT5: {
        destroyable:true,
        build:{ counts:[1], multi:true, next:true, costs:[{ id:'titanium', count:204000, coeff:1.1 }, { id:'wood', count:205000, coeff:1.1 }, { id:'meteorite', count:17800, coeff:1.1 }] },
        outputs:[{ id:'silicon', count:1487 }],
        inputs:[{ id:'energy', count:746 }],
    },
    /*------------------------------------------------------------------------*/
    uranium: {
        gain:{ counts:[1] },
        storage:{ max:50, count:50, coeff:2, costs:[{ id:'uranium', count:50, coeff:2 }, { id:'lunarite', count:20, coeff:2 }] },
        conversion:{ costs:[{ id:'energy', count:37 }] },
        prod:0,
    },
    uraniumT1: {
        destroyable:true,
        build:{ counts:[1], multi:true, next:true, costs:[{ id:'lunarite', count:4000, coeff:1.1 }, { id:'titanium', count:2000, coeff:1.1 }, { id:'gold', count:2000, coeff:1.1 }] },
        outputs:[{ id:'uranium', count:1 }],
    },
    uraniumT2: {
        destroyable:true,
        build:{ counts:[1], multi:true, next:true, costs:[{ id:'lunarite', count:10000, coeff:1.1 }, { id:'uranium', count:80, coeff:1.1 }, { id:'oil', count:10000, coeff:1.1 }] },
        outputs:[{ id:'uranium', count:9 }],
        inputs:[{ id:'energy', count:40 }],
    },
    uraniumT3: {
        destroyable:true,
        build:{ counts:[1], multi:true, next:true, costs:[{ id:'lunarite', count:21700, coeff:1.1 }, { id:'titanium', count:23000, coeff:1.1 }, { id:'silicon', count:13500, coeff:1.1 }] },
        outputs:[{ id:'uranium', count:61 }],
        inputs:[{ id:'energy', count:180 }],
    },
    uraniumT4: {
        destroyable:true,
        build:{ counts:[1], multi:true, next:true, costs:[{ id:'lunarite', count:93100, coeff:1.1 }, { id:'methane', count:47000, coeff:1.1 }, { id:'meteorite', count:830, coeff:1.1 }] },
        outputs:[{ id:'uranium', count:235 }],
        inputs:[{ id:'energy', count:436 }],
    },
    uraniumT5: {
        destroyable:true,
        build:{ counts:[1], multi:true, next:true, costs:[{ id:'titanium', count:486000, coeff:1.1 }, { id:'silicon', count:266000, coeff:1.1 }, { id:'ice', count:364000, coeff:1.1 }] },
        outputs:[{ id:'uranium', count:2412 }],
        inputs:[{ id:'energy', count:2719 }],
    },
    /*------------------------------------------------------------------------*/
    lava: {
        gain:{ counts:[1] },
        storage:{ max:50, count:50, coeff:2, costs:[{ id:'lava', count:50, coeff:2 }, { id:'lunarite', count:20, coeff:2 }] },
        conversion:{ costs:[{ id:'energy', count:42 }] },
        prod:0,
    },
    lavaT1: {
        destroyable:true,
        build:{ counts:[1], multi:true, next:true, costs:[{ id:'lunarite', count:4000, coeff:1.1 }, { id:'gem', count:7000, coeff:1.1 }] },
        outputs:[{ id:'lava', count:1 }],
    },
    lavaT2: {
        destroyable:true,
        build:{ counts:[1], multi:true, next:true, costs:[{ id:'lunarite', count:16000, coeff:1.1 }, { id:'titanium', count:14000, coeff:1.1 }, { id:'silicon', count:6000, coeff:1.1 }] },
        outputs:[{ id:'lava', count:7 }],
        inputs:[{ id:'energy', count:58 }],
    },
    lavaT3: {
        destroyable:true,
        build:{ counts:[1], multi:true, next:true, costs:[{ id:'lunarite', count:69000, coeff:1.1 }, { id:'titanium', count:57000, coeff:1.1 }, { id:'silicon', count:39000, coeff:1.1 }] },
        outputs:[{ id:'lava', count:43 }],
        inputs:[{ id:'energy', count:237 }],
    },
    lavaT4: {
        destroyable:true,
        build:{ counts:[1], multi:true, next:true, costs:[{ id:'lunarite', count:298000, coeff:1.1 }, { id:'gold', count:121000, coeff:1.1 }, { id:'meteorite', count:750, coeff:1.1 }] },
        outputs:[{ id:'lava', count:187 }],
        inputs:[{ id:'energy', count:689 }],
    },
    lavaT5: {
        destroyable:true,
        build:{ counts:[1], multi:true, next:true, costs:[{ id:'lunarite', count:288000, coeff:1.1 }, { id:'gem', count:210000, coeff:1.1 }, { id:'ice', count:238000, coeff:1.1 }] },
        outputs:[{ id:'lava', count:2103 }],
        inputs:[{ id:'energy', count:4142 }],
    },
    /*------------------------------------------------------------------------*/
    lunarite: {
        gain:{ counts:[1] },
        storage:{ max:50, count:50, coeff:2, costs:[{ id:'lunarite', count:50, coeff:2 }, { id:'metal', count:400, coeff:2 }] },
        conversion:{ costs:[{ id:'energy', count:15 }] },
        prod:0,
    },
    lunariteT1: {
        destroyable:true,
        build:{ counts:[1], multi:true, next:true, costs:[{ id:'gem', count:500, coeff:1.1 }] },
        outputs:[{ id:'lunarite', count:1 }],
    },
    lunariteT2: {
        destroyable:true,
        build:{ counts:[1], multi:true, next:true, costs:[{ id:'metal', count:1000, coeff:1.1 }, { id:'gem', count:600, coeff:1.1 }, { id:'oil', count:400, coeff:1.1 }] },
        outputs:[{ id:'lunarite', count:10 }],
        inputs:[{ id:'energy', count:20 }],
    },
    lunariteT3: {
        destroyable:true,
        build:{ counts:[1], multi:true, next:true, costs:[{ id:'lunarite', count:8000, coeff:1.1 }, { id:'gem', count:5000, coeff:1.1 }, { id:'silicon', count:3500, coeff:1.1 }] },
        outputs:[{ id:'lunarite', count:53 }],
        inputs:[{ id:'energy', count:70 }],
    },
    lunariteT4: {
        destroyable:true,
        build:{ counts:[1], multi:true, next:true, costs:[{ id:'titanium', count:45000, coeff:1.1 }, { id:'ice', count:37000, coeff:1.1 }, { id:'meteorite', count:500, coeff:1.1 }] },
        outputs:[{ id:'lunarite', count:207 }],
        inputs:[{ id:'energy', count:182 }],
    },
    lunariteT5: {
        destroyable:true,
        build:{ counts:[1], multi:true, next:true, costs:[{ id:'titanium', count:204000, coeff:1.1 }, { id:'gold', count:150000, coeff:1.1 }, { id:'methane', count:195000, coeff:1.1 }] },
        outputs:[{ id:'lunarite', count:2122 }],
        inputs:[{ id:'energy', count:1216 }],
    },
    /*------------------------------------------------------------------------*/
    methane: {
        gain:{ counts:[1] },
        storage:{ max:50, count:50, coeff:2, costs:[{ id:'methane', count:50, coeff:2 }, { id:'lunarite', count:20, coeff:2 }] },
        conversion:{ costs:[{ id:'energy', count:12 }] },
        prod:0,
    },
    methaneT1: {
        destroyable:true,
        build:{ counts:[1], multi:true, next:true, costs:[{ id:'lunarite', count:50, coeff:1.1 }] },
        outputs:[{ id:'methane', count:1 }],
    },
    methaneT2: {
        destroyable:true,
        build:{ counts:[1], multi:true, next:true, costs:[{ id:'lunarite', count:100, coeff:1.1 }, { id:'gem', count:800, coeff:1.1 }, { id:'oil', count:600, coeff:1.1 }] },
        outputs:[{ id:'methane', count:8 }],
        inputs:[{ id:'energy', count:16 }],
    },
    methaneT3: {
        destroyable:true,
        build:{ counts:[1], multi:true, next:true, costs:[{ id:'lunarite', count:10000, coeff:1.1 }, { id:'titanium', count:9000, coeff:1.1 }, { id:'silicon', count:4100, coeff:1.1 }] },
        outputs:[{ id:'methane', count:37 }],
        inputs:[{ id:'energy', count:49 }],
    },
    methaneT4: {
        destroyable:true,
        build:{ counts:[1], multi:true, next:true, costs:[{ id:'lunarite', count:52000, coeff:1.1 }, { id:'helium', count:47000, coeff:1.1 }, { id:'meteorite', count:390, coeff:1.1 }] },
        outputs:[{ id:'methane', count:149 }],
        inputs:[{ id:'energy', count:132 }],
    },
    methaneT5: {
        destroyable:true,
        build:{ counts:[1], multi:true, next:true, costs:[{ id:'lunarite', count:140000, coeff:1.1 }, { id:'gold', count:202000, coeff:1.1 }, { id:'hydrogen', count:158000, coeff:1.1 }] },
        outputs:[{ id:'methane', count:1393 }],
        inputs:[{ id:'energy', count:899 }],
    },
    /*------------------------------------------------------------------------*/
    titanium: {
        gain:{ counts:[1] },
        storage:{ max:50, count:50, coeff:2, costs:[{ id:'titanium', count:50, coeff:2 }, { id:'lunarite', count:20, coeff:2 }] },
        conversion:{ costs:[{ id:'energy', count:17 }] },
        prod:0,
    },
    titaniumT1: {
        destroyable:true,
        build:{ counts:[1], multi:true, next:true, costs:[{ id:'gem', count:1000, coeff:1.1 }] },
        outputs:[{ id:'titanium', count:1 }],
    },
    titaniumT2: {
        destroyable:true,
        build:{ counts:[1], multi:true, next:true, costs:[{ id:'lunarite', count:200, coeff:1.1 }, { id:'gem', count:800, coeff:1.1 }, { id:'oil', count:1000, coeff:1.1 }] },
        outputs:[{ id:'titanium', count:9 }],
        inputs:[{ id:'energy', count:13 }],
    },
    titaniumT3: {
        destroyable:true,
        build:{ counts:[1], multi:true, next:true, costs:[{ id:'lunarite', count:14000, coeff:1.1 }, { id:'gem', count:11000, coeff:1.1 }, { id:'silicon', count:5600, coeff:1.1 }] },
        outputs:[{ id:'titanium', count:49 }],
        inputs:[{ id:'energy', count:46 }],
    },
    titaniumT4: {
        destroyable:true,
        build:{ counts:[1], multi:true, next:true, costs:[{ id:'lunarite', count:63000, coeff:1.1 }, { id:'gold', count:27000, coeff:1.1 }, { id:'meteorite', count:600, coeff:1.1 }] },
        outputs:[{ id:'titanium', count:197 }],
        inputs:[{ id:'energy', count:123 }],
    },
    titaniumT5: {
        destroyable:true,
        build:{ counts:[1], multi:true, next:true, costs:[{ id:'uranium', count:175000, coeff:1.1 }, { id:'wood', count:164000, coeff:1.1 }, { id:'helium', count:156000, coeff:1.1 }] },
        outputs:[{ id:'titanium', count:2106 }],
        inputs:[{ id:'energy', count:690 }],
    },
    /*------------------------------------------------------------------------*/
    gold: {
        gain:{ counts:[1] },
        storage:{ max:50, count:50, coeff:2, costs:[{ id:'gold', count:50, coeff:2 }, { id:'lunarite', count:20, coeff:2 }] },
        conversion:{ costs:[{ id:'energy', count:14 }] },
        prod:0,
    },
    goldT1: {
        destroyable:true,
        build:{ counts:[1], multi:true, next:true, costs:[{ id:'gem', count:200, coeff:1.1 }, { id:'methane', count:50, coeff:1.1 }] },
        outputs:[{ id:'gold', count:1 }],
    },
    goldT2: {
        destroyable:true,
        build:{ counts:[1], multi:true, next:true, costs:[{ id:'lunarite', count:500, coeff:1.1 }, { id:'gem', count:1500, coeff:1.1 }, { id:'oil', count:1000, coeff:1.1 }] },
        outputs:[{ id:'gold', count:8 }],
        inputs:[{ id:'energy', count:19 }],
    },
    goldT3: {
        destroyable:true,
        build:{ counts:[1], multi:true, next:true, costs:[{ id:'lunarite', count:17000, coeff:1.1 }, { id:'silver', count:11500, coeff:1.1 }, { id:'silicon', count:8200, coeff:1.1 }] },
        outputs:[{ id:'gold', count:51 }],
        inputs:[{ id:'energy', count:81 }],
    },
    goldT4: {
        destroyable:true,
        build:{ counts:[1], multi:true, next:true, costs:[{ id:'lunarite', count:61000, coeff:1.1 }, { id:'helium', count:15700, coeff:1.1 }, { id:'meteorite', count:600, coeff:1.1 }] },
        outputs:[{ id:'gold', count:211 }],
        inputs:[{ id:'energy', count:223 }],
    },
    goldT5: {
        destroyable:true,
        build:{ counts:[1], multi:true, next:true, costs:[{ id:'metal', count:208000, coeff:1.1 }, { id:'silver', count:167000, coeff:1.1 }, { id:'meteorite', count:18000, coeff:1.1 }] },
        outputs:[{ id:'gold', count:2422 }],
        inputs:[{ id:'energy', count:1324 }],
    },
    /*------------------------------------------------------------------------*/
    silver: {
        gain:{ counts:[1] },
        storage:{ max:50, count:50, coeff:2, costs:[{ id:'silver', count:50, coeff:2 }, { id:'lunarite', count:20, coeff:2 }] },
        conversion:{ costs:[{ id:'energy', count:16 }] },
        prod:0,
    },
    silverT1: {
        destroyable:true,
        build:{ counts:[1], multi:true, next:true, costs:[{ id:'lunarite', count:100, coeff:1.1 }, { id:'titanium', count:20, coeff:1.1 }] },
        outputs:[{ id:'silver', count:1 }],
    },
    silverT2: {
        destroyable:true,
        build:{ counts:[1], multi:true, next:true, costs:[{ id:'lunarite', count:350, coeff:1.1 }, { id:'gem', count:900, coeff:1.1 }, { id:'oil', count:1200, coeff:1.1 }] },
        outputs:[{ id:'silver', count:13 }],
        inputs:[{ id:'energy', count:24 }],
    },
    silverT3: {
        destroyable:true,
        build:{ counts:[1], multi:true, next:true, costs:[{ id:'lunarite', count:19500, coeff:1.1 }, { id:'silver', count:18200, coeff:1.1 }, { id:'silicon', count:11000, coeff:1.1 }] },
        outputs:[{ id:'silver', count:53 }],
        inputs:[{ id:'energy', count:65 }],
    },
    silverT4: {
        destroyable:true,
        build:{ counts:[1], multi:true, next:true, costs:[{ id:'lunarite', count:85100, coeff:1.1 }, { id:'oil', count:93800, coeff:1.1 }, { id:'meteorite', count:520, coeff:1.1 }] },
        outputs:[{ id:'silver', count:208 }],
        inputs:[{ id:'energy', count:170 }],
    },
    silverT5: {
        destroyable:true,
        build:{ counts:[1], multi:true, next:true, costs:[{ id:'uranium', count:165000, coeff:1.1 }, { id:'gem', count:209000, coeff:1.1 }, { id:'methane', count:170000, coeff:1.1 }] },
        outputs:[{ id:'silver', count:2261 }],
        inputs:[{ id:'energy', count:1008 }],
    },
    /*------------------------------------------------------------------------*/
    hydrogen: {
        gain:{ counts:[1] },
        storage:{ max:50, count:50, coeff:2, costs:[{ id:'hydrogen', count:50, coeff:2 }, { id:'lunarite', count:20, coeff:2 }] },
        conversion:{ costs:[{ id:'energy', count:33 }] },
        prod:0,
    },
    hydrogenT1: {
        destroyable:true,
        build:{ counts:[1], multi:true, next:true, costs:[{ id:'lunarite', count:6000, coeff:1.1 }, { id:'titanium', count:4800, coeff:1.1 }] },
        outputs:[{ id:'hydrogen', count:1 }],
    },
    hydrogenT2: {
        destroyable:true,
        build:{ counts:[1], multi:true, next:true, costs:[{ id:'lunarite', count:10800, coeff:1.1 }, { id:'titanium', count:9600, coeff:1.1 }, { id:'silicon', count:6600, coeff:1.1 }] },
        outputs:[{ id:'hydrogen', count:5 }],
        inputs:[{ id:'energy', count:63 }],
    },
    hydrogenT3: {
        destroyable:true,
        build:{ counts:[1], multi:true, next:true, costs:[{ id:'silver', count:37200, coeff:1.1 }, { id:'gold', count:34200, coeff:1.1 }, { id:'silicon', count:25800, coeff:1.1 }] },
        outputs:[{ id:'hydrogen', count:28 }],
        inputs:[{ id:'energy', count:234 }],
    },
    hydrogenT4: {
        destroyable:true,
        build:{ counts:[1], multi:true, next:true, costs:[{ id:'lunarite', count:172000, coeff:1.1 }, { id:'methane', count:134000, coeff:1.1 }, { id:'meteorite', count:710, coeff:1.1 }] },
        outputs:[{ id:'hydrogen', count:113 }],
        inputs:[{ id:'energy', count:613 }],
    },
    hydrogenT5: {
        destroyable:true,
        build:{ counts:[1], multi:true, next:true, costs:[{ id:'lunarite', count:250000, coeff:1.1 }, { id:'wood', count:184000, coeff:1.1 }, { id:'oil', count:146000, coeff:1.1 }] },
        outputs:[{ id:'hydrogen', count:3562 }],
        inputs:[{ id:'energy', count:4581 }],
    },
    /*------------------------------------------------------------------------*/
    helium: {
        gain:{ counts:[1] },
        storage:{ max:50, count:50, coeff:2, costs:[{ id:'helium', count:50, coeff:2 }, { id:'lunarite', count:20, coeff:2 }] },
        conversion:{ costs:[{ id:'energy', count:39 }] },
        prod:0,
    },
    heliumT1: {
        destroyable:true,
        build:{ counts:[1], multi:true, next:true, costs:[{ id:'lunarite', count:8400, coeff:1.1 }, { id:'titanium', count:6000, coeff:1.1 }] },
        outputs:[{ id:'helium', count:1 }],
    },
    heliumT2: {
        destroyable:true,
        build:{ counts:[1], multi:true, next:true, costs:[{ id:'lunarite', count:12600, coeff:1.1 }, { id:'titanium', count:10200, coeff:1.1 }, { id:'silicon', count:8400, coeff:1.1 }] },
        outputs:[{ id:'helium', count:11 }],
        inputs:[{ id:'energy', count:72 }],
    },
    heliumT3: {
        destroyable:true,
        build:{ counts:[1], multi:true, next:true, costs:[{ id:'lunarite', count:63000, coeff:1.1 }, { id:'titanium', count:43800, coeff:1.1 }, { id:'silicon', count:35400, coeff:1.1 }] },
        outputs:[{ id:'helium', count:57 }],
        inputs:[{ id:'energy', count:248 }],
    },
    heliumT4: {
        destroyable:true,
        build:{ counts:[1], multi:true, next:true, costs:[{ id:'lunarite', count:255000, coeff:1.1 }, { id:'titanium', count:173000, coeff:1.1 }, { id:'meteorite', count:770, coeff:1.1 }] },
        outputs:[{ id:'helium', count:232 }],
        inputs:[{ id:'energy', count:670 }],
    },
    heliumT5: {
        destroyable:true,
        build:{ counts:[1], multi:true, next:true, costs:[{ id:'lunarite', count:171000, coeff:1.1 }, { id:'silicon', count:165000, coeff:1.1 }, { id:'meteorite', count:18600, coeff:1.1 }] },
        outputs:[{ id:'helium', count:2369 }],
        inputs:[{ id:'energy', count:4075 }],
    },
    /*------------------------------------------------------------------------*/
    ice: {
        gain:{ counts:[1] },
        storage:{ max:50, count:50, coeff:2, costs:[{ id:'ice', count:50, coeff:2 }, { id:'lunarite', count:20, coeff:2 }] },
        conversion:{ costs:[{ id:'energy', count:44 }] },
        prod:0,
    },
    iceT1: {
        destroyable:true,
        build:{ counts:[1], multi:true, next:true, costs:[{ id:'lunarite', count:17800, coeff:1.1 }, { id:'gem', count:19300, coeff:1.1 }] },
        outputs:[{ id:'ice', count:1 }],
    },
    iceT2: {
        destroyable:true,
        build:{ counts:[1], multi:true, next:true, costs:[{ id:'lunarite', count:23900, coeff:1.1 }, { id:'titanium', count:21200, coeff:1.1 }, { id:'silicon', count:19600, coeff:1.1 }] },
        outputs:[{ id:'ice', count:9 }],
        inputs:[{ id:'energy', count:83 }],
    },
    iceT3: {
        destroyable:true,
        build:{ counts:[1], multi:true, next:true, costs:[{ id:'lunarite', count:117000, coeff:1.1 }, { id:'titanium', count:86000, coeff:1.1 }, { id:'silicon', count:73000, coeff:1.1 }] },
        outputs:[{ id:'ice', count:65 }],
        inputs:[{ id:'energy', count:397 }],
    },
    iceT4: {
        destroyable:true,
        build:{ counts:[1], multi:true, next:true, costs:[{ id:'wood', count:379000, coeff:1.1 }, { id:'helium', count:14000, coeff:1.1 }, { id:'meteorite', count:1500, coeff:1.1 }] },
        outputs:[{ id:'ice', count:278 }],
        inputs:[{ id:'energy', count:1135 }],
    },
    iceT5: {
        destroyable:true,
        build:{ counts:[1], multi:true, next:true, costs:[{ id:'metal', count:210000, coeff:1.1 }, { id:'silver', count:188000, coeff:1.1 }, { id:'helium', count:205000, coeff:1.1 }] },
        outputs:[{ id:'ice', count:2973 }],
        inputs:[{ id:'energy', count:7397 }],
    },
    /*------------------------------------------------------------------------*/
    science: {
        prod:0,
    },
    scienceT1: {
        destroyable:true,
        build:{ counts:[1], multi:true, next:true, costs:[{ id:'metal', count:20, coeff:1.1 }, { id:'gem', count:15, coeff:1.1 }, { id:'wood', count:10, coeff:1.1 }] },
        outputs:[{ id:'science', count:0.1 }],
    },
    scienceT2: {
        destroyable:true,
        build:{ counts:[1], multi:true, next:true, costs:[{ id:'metal', count:1000, coeff:1.1 }, { id:'gem', count:200, coeff:1.1 }, { id:'wood', count:500, coeff:1.1 }] },
        outputs:[{ id:'science', count:1 }],
    },
    scienceT3: {
        destroyable:true,
        build:{ counts:[1], multi:true, next:true, costs:[{ id:'metal', count:17000, coeff:1.1 }, { id:'gem', count:4700, coeff:1.1 }, { id:'wood', count:9600, coeff:1.1 }] },
        outputs:[{ id:'science', count:10 }]
    },
    scienceT4: {
        destroyable:true,
        build:{ counts:[1], multi:true, next:true, costs:[{ id:'metal', count:610000, coeff:1.1 }, { id:'gem', count:370000, coeff:1.1 }, { id:'wood', count:926000, coeff:1.1 }] },
        outputs:[{ id:'science', count:100 }]
    },
    scienceT5: {
        destroyable:true,
        build:{ counts:[1], multi:true, next:true, costs:[{ id:'metal', count:12400000, coeff:1.1 }, { id:'gem', count:7300000, coeff:1.1 }, { id:'wood', count:15900000, coeff:1.1 }] },
        outputs:[{ id:'science', count:1000 }],
    },
    /*------------------------------------------------------------------------*/
    fuel: {
        storage:{ max:50, count:50, coeff:2, costs:[{ id:'fuel', count:50, coeff:2 }] },
        prod:0,
    },
    fuelT1: {
        destroyable:true,
        build:{ counts:[1], multi:true, next:true, costs:[{ id:'metal', count:1000, coeff:1.1 }, { id:'gem', count:750, coeff:1.1 }, { id:'wood', count:500, coeff:1.1 }] },
        outputs:[{ id:'fuel', count:0.2 }],
        inputs:[{ id:'carbon', count:20 }, { id:'oil', count:20 }],
    },
    fuelT2: {
        destroyable:true,
        build:{ counts:[1], multi:true, next:true, costs:[{ id:'metal', count:12000, coeff:1.1 }, { id:'gem', count:8300, coeff:1.1 }, { id:'wood', count:6800, coeff:1.1 }] },
        outputs:[{ id:'fuel', count:1.5 }],
        inputs:[{ id:'carbon', count:100 }, { id:'oil', count:100 }],
    },
    fuelT3: {
        destroyable:true,
        build:{ counts:[1], multi:true, next:true, costs:[{ id:'titanium', count:140000, coeff:1.1 }, { id:'silicon', count:96300, coeff:1.1 }, { id:'gold', count:78600, coeff:1.1 }] },
        outputs:[{ id:'fuel', count:20 }],
        inputs:[{ id:'methane', count:520 }],
    },
    /*------------------------------------------------------------------------*/
    antimatter: {
        storage:{ count:100000, coeff:1 },
        prod:0,
    },
    antimatterT1: {
        destroyable:true,
        build:{ counts:[1], multi:true, next:true, costs:[{ id:'silver', count:163000000, coeff:1.1 }, { id:'oil', count:712000000, coeff:1.1 }, { id:'meteorite', count:12300000, coeff:1.1 }] },
        outputs:[{ id:'antimatter', count:0.5 }],
        inputs:[{ id:'plasma', count:100 }, { id:'ice', count:12000 }],
    },
    /*------------------------------------------------------------------------*/
    techPlasmaT2: { max:1, maxBuildCount:1, build:{ counts:[1], costs:[{ id:'science', count:1000, coeff:1.0 }] }, unlocks:['plasmaT2', 'achPlasmaT2'], hides:['techPlasmaT2Card'] },
    techMeteoriteT2: { max:1, maxBuildCount:1, build:{ counts:[1], costs:[{ id:'science', count:1000, coeff:1.0 }] }, unlocks:['meteoriteT2', 'achMeteoriteT2'], hides:['techMeteoriteT2Card'] },
    techCarbonT2: { max:1, maxBuildCount:1, build:{ counts:[1], costs:[{ id:'science', count:1000, coeff:1.0 }] }, unlocks:['carbonT2', 'achCarbonT2'], hides:['techCarbonT2Card'] },
    techScienceT2: { max:1, maxBuildCount:1, build:{ counts:[1], costs:[{ id:'science', count:1000, coeff:1.0 }] }, unlocks:['scienceT2', 'achScienceT2'], hides:['techScienceT2Card'] },
    techOilT2: { max:1, maxBuildCount:1, build:{ counts:[1], costs:[{ id:'science', count:1000, coeff:1.0 }] }, unlocks:['oilT2', 'achOilT2'], hides:['techOilT2Card'] },
    techFuelT2: { max:1, maxBuildCount:1, build:{ counts:[1], costs:[{ id:'science', count:1000, coeff:1.0 }] }, unlocks:['fuelT2', 'achFuelT2'], hides:['techFuelT2Card'] },
    techMetalT2: { max:1, maxBuildCount:1, build:{ counts:[1], costs:[{ id:'science', count:1000, coeff:1.0 }] }, unlocks:['metalT2', 'achMetalT2'], hides:['techMetalT2Card'] },
    techGemT2: { max:1, maxBuildCount:1, build:{ counts:[1], costs:[{ id:'science', count:1000, coeff:1.0 }] }, unlocks:['gemT2', 'achGemT2'], hides:['techGemT2Card'] },
    techWoodT2: { max:1, maxBuildCount:1, build:{ counts:[1], costs:[{ id:'science', count:1000, coeff:1.0 }] }, unlocks:['woodT2', 'achWoodT2'], hides:['techWoodT2Card'] },
    techSiliconT2: { max:1, maxBuildCount:1, build:{ counts:[1], costs:[{ id:'science', count:1000, coeff:1.0 }] }, unlocks:['siliconT2', 'achSiliconT2'], hides:['techSiliconT2Card'] },
    techUraniumT2: { max:1, maxBuildCount:1, build:{ counts:[1], costs:[{ id:'science', count:1000, coeff:1.0 }] }, unlocks:['uraniumT2', 'achUraniumT2'], hides:['techUraniumT2Card'] },
    techLavaT2: { max:1, maxBuildCount:1, build:{ counts:[1], costs:[{ id:'science', count:1000, coeff:1.0 }] }, unlocks:['lavaT2', 'achLavaT2'], hides:['techLavaT2Card'] },
    techLunariteT2: { max:1, maxBuildCount:1, build:{ counts:[1], costs:[{ id:'science', count:1000, coeff:1.0 }] }, unlocks:['lunariteT2', 'achLunariteT2'], hides:['techLunariteT2Card'] },
    techMethaneT2: { max:1, maxBuildCount:1, build:{ counts:[1], costs:[{ id:'science', count:1000, coeff:1.0 }] }, unlocks:['methaneT2', 'achMethaneT2'], hides:['techMethaneT2Card'] },
    techTitaniumT2: { max:1, maxBuildCount:1, build:{ counts:[1], costs:[{ id:'science', count:1000, coeff:1.0 }] }, unlocks:['titaniumT2', 'achTitaniumT2'], hides:['techTitaniumT2Card'] },
    techGoldT2: { max:1, maxBuildCount:1, build:{ counts:[1], costs:[{ id:'science', count:1000, coeff:1.0 }] }, unlocks:['goldT2', 'achGoldT2'], hides:['techGoldT2Card'] },
    techSilverT2: { max:1, maxBuildCount:1, build:{ counts:[1], costs:[{ id:'science', count:1000, coeff:1.0 }] }, unlocks:['silverT2', 'achSilverT2'], hides:['techSilverT2Card'] },
    techHydrogenT2: { max:1, maxBuildCount:1, build:{ counts:[1], costs:[{ id:'science', count:1000, coeff:1.0 }] }, unlocks:['hydrogenT2', 'achHydrogenT2'], hides:['techHydrogenT2Card'] },
    techHeliumT2: { max:1, maxBuildCount:1, build:{ counts:[1], costs:[{ id:'science', count:1000, coeff:1.0 }] }, unlocks:['heliumT2', 'achHeliumT2'], hides:['techHeliumT2Card'] },
    techIceT2: { max:1, maxBuildCount:1, build:{ counts:[1], costs:[{ id:'science', count:1000, coeff:1.0 }] }, unlocks:['iceT2', 'achIceT2'], hides:['techIceT2Card'] },
    /*------------------------------------------------------------------------*/
    techPlasmaT3: { max:1, maxBuildCount:1, build:{ counts:[1], costs:[{ id:'science', count:5000, coeff:1.0 }] }, unlocks:['plasmaT3', 'achPlasmaT3'], hides:['techPlasmaT3Card'] },
    techMeteoriteT3: { max:1, maxBuildCount:1, build:{ counts:[1], costs:[{ id:'science', count:5000, coeff:1.0 }] }, unlocks:['meteoriteT3', 'achMeteoriteT3'], hides:['techMeteoriteT3Card'] },
    techCarbonT3: { max:1, maxBuildCount:1, build:{ counts:[1], costs:[{ id:'science', count:5000, coeff:1.0 }] }, unlocks:['carbonT3', 'achCarbonT3'], hides:['techCarbonT3Card'] },
    techScienceT3: { max:1, maxBuildCount:1, build:{ counts:[1], costs:[{ id:'science', count:5000, coeff:1.0 }] }, unlocks:['scienceT3', 'achScienceT3'], hides:['techScienceT3Card'] },
    techOilT3: { max:1, maxBuildCount:1, build:{ counts:[1], costs:[{ id:'science', count:5000, coeff:1.0 }] }, unlocks:['oilT3', 'achOilT3'], hides:['techOilT3Card'] },
    techFuelT3: { max:1, maxBuildCount:1, build:{ counts:[1], costs:[{ id:'science', count:5000, coeff:1.0 }] }, unlocks:['fuelT3', 'achFuelT3'], hides:['techFuelT3Card'] },
    techMetalT3: { max:1, maxBuildCount:1, build:{ counts:[1], costs:[{ id:'science', count:5000, coeff:1.0 }] }, unlocks:['metalT3', 'achMetalT3'], hides:['techMetalT3Card'] },
    techGemT3: { max:1, maxBuildCount:1, build:{ counts:[1], costs:[{ id:'science', count:5000, coeff:1.0 }] }, unlocks:['gemT3', 'achGemT3'], hides:['techGemT3Card'] },
    techWoodT3: { max:1, maxBuildCount:1, build:{ counts:[1], costs:[{ id:'science', count:5000, coeff:1.0 }] }, unlocks:['woodT3', 'achWoodT3'], hides:['techWoodT3Card'] },
    techSiliconT3: { max:1, maxBuildCount:1, build:{ counts:[1], costs:[{ id:'science', count:5000, coeff:1.0 }] }, unlocks:['siliconT3', 'achSiliconT3'], hides:['techSiliconT3Card'] },
    techUraniumT3: { max:1, maxBuildCount:1, build:{ counts:[1], costs:[{ id:'science', count:5000, coeff:1.0 }] }, unlocks:['uraniumT3', 'achUraniumT3'], hides:['techUraniumT3Card'] },
    techLavaT3: { max:1, maxBuildCount:1, build:{ counts:[1], costs:[{ id:'science', count:5000, coeff:1.0 }] }, unlocks:['lavaT3', 'achLavaT3'], hides:['techLavaT3Card'] },
    techLunariteT3: { max:1, maxBuildCount:1, build:{ counts:[1], costs:[{ id:'science', count:5000, coeff:1.0 }] }, unlocks:['lunariteT3', 'achLunariteT3'], hides:['techLunariteT3Card'] },
    techMethaneT3: { max:1, maxBuildCount:1, build:{ counts:[1], costs:[{ id:'science', count:5000, coeff:1.0 }] }, unlocks:['methaneT3', 'achMethaneT3'], hides:['techMethaneT3Card'] },
    techTitaniumT3: { max:1, maxBuildCount:1, build:{ counts:[1], costs:[{ id:'science', count:5000, coeff:1.0 }] }, unlocks:['titaniumT3', 'achTitaniumT3'], hides:['techTitaniumT3Card'] },
    techGoldT3: { max:1, maxBuildCount:1, build:{ counts:[1], costs:[{ id:'science', count:5000, coeff:1.0 }] }, unlocks:['goldT3', 'achGoldT3'], hides:['techGoldT3Card'] },
    techSilverT3: { max:1, maxBuildCount:1, build:{ counts:[1], costs:[{ id:'science', count:5000, coeff:1.0 }] }, unlocks:['silverT3', 'achSilverT3'], hides:['techSilverT3Card'] },
    techHydrogenT3: { max:1, maxBuildCount:1, build:{ counts:[1], costs:[{ id:'science', count:5000, coeff:1.0 }] }, unlocks:['hydrogenT3', 'achHydrogenT3'], hides:['techHydrogenT3Card'] },
    techHeliumT3: { max:1, maxBuildCount:1, build:{ counts:[1], costs:[{ id:'science', count:5000, coeff:1.0 }] }, unlocks:['heliumT3', 'achHeliumT3'], hides:['techHeliumT3Card'] },
    techIceT3: { max:1, maxBuildCount:1, build:{ counts:[1], costs:[{ id:'science', count:5000, coeff:1.0 }] }, unlocks:['iceT3', 'achIceT3'], hides:['techIceT3Card'] },
    /*------------------------------------------------------------------------*/
    techPlasmaT4: { max:1, maxBuildCount:1, build:{ counts:[1], costs:[{ id:'science', count:25000, coeff:1.0 }] }, unlocks:['plasmaT4', 'achPlasmaT4'], hides:['techPlasmaT4Card'] },
    techMeteoriteT4: { max:1, maxBuildCount:1, build:{ counts:[1], costs:[{ id:'science', count:25000, coeff:1.0 }] }, unlocks:['meteoriteT4', 'achMeteoriteT4'], hides:['techMeteoriteT4Card'] },
    techCarbonT4: { max:1, maxBuildCount:1, build:{ counts:[1], costs:[{ id:'science', count:25000, coeff:1.0 }] }, unlocks:['carbonT4', 'achCarbonT4'], hides:['techCarbonT4Card'] },
    techScienceT4: { max:1, maxBuildCount:1, build:{ counts:[1], costs:[{ id:'science', count:25000, coeff:1.0 }] }, unlocks:['scienceT4', 'achScienceT4'], hides:['techScienceT4Card'] },
    techOilT4: { max:1, maxBuildCount:1, build:{ counts:[1], costs:[{ id:'science', count:25000, coeff:1.0 }] }, unlocks:['oilT4', 'achOilT4'], hides:['techOilT4Card'] },
    techMetalT4: { max:1, maxBuildCount:1, build:{ counts:[1], costs:[{ id:'science', count:25000, coeff:1.0 }] }, unlocks:['metalT4', 'achMetalT4'], hides:['techMetalT4Card'] },
    techGemT4: { max:1, maxBuildCount:1, build:{ counts:[1], costs:[{ id:'science', count:25000, coeff:1.0 }] }, unlocks:['gemT4', 'achGemT4'], hides:['techGemT4Card'] },
    techWoodT4: { max:1, maxBuildCount:1, build:{ counts:[1], costs:[{ id:'science', count:25000, coeff:1.0 }] }, unlocks:['woodT4', 'achWoodT4'], hides:['techWoodT4Card'] },
    techSiliconT4: { max:1, maxBuildCount:1, build:{ counts:[1], costs:[{ id:'science', count:25000, coeff:1.0 }] }, unlocks:['siliconT4', 'achSiliconT4'], hides:['techSiliconT4Card'] },
    techUraniumT4: { max:1, maxBuildCount:1, build:{ counts:[1], costs:[{ id:'science', count:25000, coeff:1.0 }] }, unlocks:['uraniumT4', 'achUraniumT4'], hides:['techUraniumT4Card'] },
    techLavaT4: { max:1, maxBuildCount:1, build:{ counts:[1], costs:[{ id:'science', count:25000, coeff:1.0 }] }, unlocks:['lavaT4', 'achLavaT4'], hides:['techLavaT4Card'] },
    techLunariteT4: { max:1, maxBuildCount:1, build:{ counts:[1], costs:[{ id:'science', count:25000, coeff:1.0 }] }, unlocks:['lunariteT4', 'achLunariteT4'], hides:['techLunariteT4Card'] },
    techMethaneT4: { max:1, maxBuildCount:1, build:{ counts:[1], costs:[{ id:'science', count:25000, coeff:1.0 }] }, unlocks:['methaneT4', 'achMethaneT4'], hides:['techMethaneT4Card'] },
    techTitaniumT4: { max:1, maxBuildCount:1, build:{ counts:[1], costs:[{ id:'science', count:25000, coeff:1.0 }] }, unlocks:['titaniumT4', 'achTitaniumT4'], hides:['techTitaniumT4Card'] },
    techGoldT4: { max:1, maxBuildCount:1, build:{ counts:[1], costs:[{ id:'science', count:25000, coeff:1.0 }] }, unlocks:['goldT4', 'achGoldT4'], hides:['techGoldT4Card'] },
    techSilverT4: { max:1, maxBuildCount:1, build:{ counts:[1], costs:[{ id:'science', count:25000, coeff:1.0 }] }, unlocks:['silverT4', 'achSilverT4'], hides:['techSilverT4Card'] },
    techHydrogenT4: { max:1, maxBuildCount:1, build:{ counts:[1], costs:[{ id:'science', count:25000, coeff:1.0 }] }, unlocks:['hydrogenT4', 'achHydrogenT4'], hides:['techHydrogenT4Card'] },
    techHeliumT4: { max:1, maxBuildCount:1, build:{ counts:[1], costs:[{ id:'science', count:25000, coeff:1.0 }] }, unlocks:['heliumT4', 'achHeliumT4'], hides:['techHeliumT4Card'] },
    techIceT4: { max:1, maxBuildCount:1, build:{ counts:[1], costs:[{ id:'science', count:25000, coeff:1.0 }] }, unlocks:['iceT4', 'achIceT4'], hides:['techIceT4Card'] },
    /*------------------------------------------------------------------------*/
    techCarbonT5: { max:1, maxBuildCount:1, build:{ counts:[1], costs:[{ id:'science', count:125000, coeff:1.0 }] }, unlocks:['carbonT5', 'achCarbonT5'], hides:['techCarbonT5Card'] },
    techScienceT5: { max:1, maxBuildCount:1, build:{ counts:[1], costs:[{ id:'science', count:125000, coeff:1.0 }] }, unlocks:['scienceT5', 'achScienceT5'], hides:['techScienceT5Card'] },
    techOilT5: { max:1, maxBuildCount:1, build:{ counts:[1], costs:[{ id:'science', count:125000, coeff:1.0 }] }, unlocks:['oilT5', 'achOilT5'], hides:['techOilT5Card'] },
    techMetalT5: { max:1, maxBuildCount:1, build:{ counts:[1], costs:[{ id:'science', count:125000, coeff:1.0 }] }, unlocks:['metalT5', 'achMetalT5'], hides:['techMetalT5Card'] },
    techGemT5: { max:1, maxBuildCount:1, build:{ counts:[1], costs:[{ id:'science', count:125000, coeff:1.0 }] }, unlocks:['gemT5', 'achGemT5'], hides:['techGemT5Card'] },
    techWoodT5: { max:1, maxBuildCount:1, build:{ counts:[1], costs:[{ id:'science', count:125000, coeff:1.0 }] }, unlocks:['woodT5', 'achWoodT5'], hides:['techWoodT5Card'] },
    techSiliconT5: { max:1, maxBuildCount:1, build:{ counts:[1], costs:[{ id:'science', count:125000, coeff:1.0 }] }, unlocks:['siliconT5', 'achSiliconT5'], hides:['techSiliconT5Card'] },
    techUraniumT5: { max:1, maxBuildCount:1, build:{ counts:[1], costs:[{ id:'science', count:125000, coeff:1.0 }] }, unlocks:['uraniumT5', 'achUraniumT5'], hides:['techUraniumT5Card'] },
    techLavaT5: { max:1, maxBuildCount:1, build:{ counts:[1], costs:[{ id:'science', count:125000, coeff:1.0 }] }, unlocks:['lavaT5', 'achLavaT5'], hides:['techLavaT5Card'] },
    techLunariteT5: { max:1, maxBuildCount:1, build:{ counts:[1], costs:[{ id:'science', count:125000, coeff:1.0 }] }, unlocks:['lunariteT5', 'achLunariteT5'], hides:['techLunariteT5Card'] },
    techMethaneT5: { max:1, maxBuildCount:1, build:{ counts:[1], costs:[{ id:'science', count:125000, coeff:1.0 }] }, unlocks:['methaneT5', 'achMethaneT5'], hides:['techMethaneT5Card'] },
    techTitaniumT5: { max:1, maxBuildCount:1, build:{ counts:[1], costs:[{ id:'science', count:125000, coeff:1.0 }] }, unlocks:['titaniumT5', 'achTitaniumT5'], hides:['techTitaniumT5Card'] },
    techGoldT5: { max:1, maxBuildCount:1, build:{ counts:[1], costs:[{ id:'science', count:125000, coeff:1.0 }] }, unlocks:['goldT5', 'achGoldT5'], hides:['techGoldT5Card'] },
    techSilverT5: { max:1, maxBuildCount:1, build:{ counts:[1], costs:[{ id:'science', count:125000, coeff:1.0 }] }, unlocks:['silverT5', 'achSilverT5'], hides:['techSilverT5Card'] },
    techHydrogenT5: { max:1, maxBuildCount:1, build:{ counts:[1], costs:[{ id:'science', count:125000, coeff:1.0 }] }, unlocks:['hydrogenT5', 'achHydrogenT5'], hides:['techHydrogenT5Card'] },
    techHeliumT5: { max:1, maxBuildCount:1, build:{ counts:[1], costs:[{ id:'science', count:125000, coeff:1.0 }] }, unlocks:['heliumT5', 'achHeliumT5'], hides:['techHeliumT5Card'] },
    techIceT5: { max:1, maxBuildCount:1, build:{ counts:[1], costs:[{ id:'science', count:125000, coeff:1.0 }] }, unlocks:['iceT5', 'achIceT5'], hides:['techIceT5Card'] },
    /*------------------------------------------------------------------------*/
    segment: {
        build:{ counts:[1, 5, 25, 100], multi:true, costs:[{ id:'titanium', count:300000, coeff:1.02 }, { id:'gold', count:100000, coeff:1.02 }, { id:'silicon', count:200000, coeff:1.02 }, { id:'meteorite', count:1000, coeff:1.02 }, { id:'ice', count:100000, coeff:1.02 }] },
        prod:0,
    },
    dysonT1: {
        build:{ counts:[1], costs:[{ id:'segment', count:50, coeff:1.0 }, { id:'fuel', count:50000, coeff:1.0 }] },
        outputs:[{ id:'energy', count:5000 }],
    },
    dysonT2: {
        build:{ counts:[1], costs:[{ id:'segment', count:100, coeff:1.0 }, { id:'fuel', count:250000, coeff:1.0 }] },
        outputs:[{ id:'energy', count:25000 }],
    },
    dysonT3: {
        max:1,
        build:{ counts:[1], costs:[{ id:'segment', count:250, coeff:1.0 }, { id:'fuel', count:1000000, coeff:1.0 }] },
        outputs:[{ id:'energy', count:1000000 }],
    },
    /*------------------------------------------------------------------------*/
    conquest: { prod:0, }, statue: { prod:0, }, darkmatter: { prod:0, }, ultrite: { prod:0, },
    /*------------------------------------------------------------------------*/
    star301: {
        distance:5.94, resources:['hydrogen', 'helium'], stats:{ 'power':52, 'defense':49, 'speed':6 },
        explore:[{ id:'antimatter', count:59400 }],
        statue:[{ id:'hydrogen', count:1000000000000 }, { id:'helium', count:1000000000000 }],
    },
    star163901: {
        distance:10.33, resources:['uranium', 'methane'], stats:{ 'power':273, 'defense':226, 'speed':15 },
        explore:[{ id:'antimatter', count:103300 }],
        statue:[{ id:'uranium', count:1000000000000 }, { id:'methane', count:1000000000000 }],
    },
    star181901: {
        distance:11.41, resources:['gem', 'carbon'], stats:{ 'power':397, 'defense':381, 'speed':5 },
        explore:[{ id:'antimatter', count:114100 }],
        statue:[{ id:'gem', count:1000000000000 }, { id:'carbon', count:1000000000000 }],
    },
    star151801: {
        distance:11.83, resources:['gem', 'oil'], stats:{ 'power':317, 'defense':202, 'speed':8 },
        explore:[{ id:'antimatter', count:118300 }],
        statue:[{ id:'gem', count:1000000000000 }, { id:'oil', count:1000000000000 }],
    },
    star25401: {
        distance:11.94, resources:['uranium', 'gem'], stats:{ 'power':207, 'defense':372, 'speed':11 }, donor:true,
        explore:[{ id:'antimatter', count:119400 }],
        statue:[{ id:'uranium', count:1000000000000 }, { id:'gem', count:1000000000000 }],
    },
    star146301: {
        distance:12.87, resources:['meteorite', 'silver'], stats:{ 'power':311, 'defense':466, 'speed':6 },
        explore:[{ id:'antimatter', count:128700 }],
        statue:[{ id:'meteorite', count:1000000000000 }, { id:'silver', count:1000000000000 }],
    },
    star122601: {
        distance:14.77, resources:['lunarite', 'lunarite'], stats:{ 'power':426, 'defense':317, 'speed':12 },
        explore:[{ id:'antimatter', count:147700 }],
        statue:[{ id:'lunarite', count:1000000000000 }, { id:'lunarite', count:1000000000000 }],
    },
    star79501: {
        distance:15.07, resources:['lunarite', 'silver'], stats:{ 'power':675, 'defense':565, 'speed':8 },
        explore:[{ id:'antimatter', count:150700 }],
        statue:[{ id:'lunarite', count:1000000000000 }, { id:'silver', count:1000000000000 }],
    },
    star1501: {
        distance:15.33, resources:['gold', 'gold'], stats:{ 'power':410, 'defense':321, 'speed':6 },
        explore:[{ id:'antimatter', count:153300 }],
        statue:[{ id:'gold', count:1000000000000 }, { id:'gold', count:1000000000000 }],
    },
    star79901: {
        distance:17.58, resources:['carbon', 'gold'], stats:{ 'power':956, 'defense':615, 'speed':6 },
        explore:[{ id:'antimatter', count:175800 }],
        statue:[{ id:'carbon', count:1000000000000 }, { id:'gold', count:1000000000000 }],
    },
    star37601: {
        distance:18.56, resources:['ice', 'meteorite'], stats:{ 'power':706, 'defense':729, 'speed':14 },
        explore:[{ id:'antimatter', count:185600 }],
        statue:[{ id:'ice', count:1000000000000 }, { id:'meteorite', count:1000000000000 }],
    },
    star123401: {
        distance:18.95, resources:['carbon', 'silicon'], stats:{ 'power':1415, 'defense':525, 'speed':13 },
        explore:[{ id:'antimatter', count:189500 }],
        statue:[{ id:'carbon', count:1000000000000 }, { id:'silicon', count:1000000000000 }],
    },
    star164301: {
        distance:19.47, resources:['gem', 'silver'], stats:{ 'power':497, 'defense':424, 'speed':7 },
        explore:[{ id:'antimatter', count:194700 }],
        statue:[{ id:'gem', count:1000000000000 }, { id:'silver', count:1000000000000 }],
    },
    star219102: {
        distance:20.38, resources:['wood', 'meteorite'], stats:{ 'power':1232, 'defense':921, 'speed':11 },
        explore:[{ id:'antimatter', count:203800 }],
        statue:[{ id:'wood', count:1000000000000 }, { id:'meteorite', count:1000000000000 }],
    },
    star204702: {
        distance:20.62, resources:['ice', 'helium'], stats:{ 'power':550, 'defense':863, 'speed':15 }, donor:true,
        explore:[{ id:'antimatter', count:206200 }],
        statue:[{ id:'ice', count:1000000000000 }, { id:'helium', count:1000000000000 }],
    },
    star116901: {
        distance:21.18, resources:['oil', 'lunarite'], stats:{ 'power':1570, 'defense':577, 'speed':10 },
        explore:[{ id:'antimatter', count:211800 }],
        statue:[{ id:'oil', count:1000000000000 }, { id:'lunarite', count:1000000000000 }],
    },
    star74001: {
        distance:21.61, resources:['hydrogen', 'titanium'], stats:{ 'power':1494, 'defense':1183, 'speed':7 },
        explore:[{ id:'antimatter', count:216100 }],
        statue:[{ id:'hydrogen', count:1000000000000 }, { id:'titanium', count:1000000000000 }],
    },
    star205102: {
        distance:22.74, resources:['silicon', 'silver'], stats:{ 'power':1190, 'defense':810, 'speed':9 },
        explore:[{ id:'antimatter', count:227400 }],
        statue:[{ id:'silicon', count:1000000000000 }, { id:'silver', count:1000000000000 }],
    },
    star144001: {
        distance:22.98, resources:['helium', 'methane'], stats:{ 'power':1488, 'defense':1031, 'speed':12 },
        explore:[{ id:'antimatter', count:229800 }],
        statue:[{ id:'helium', count:1000000000000 }, { id:'methane', count:1000000000000 }],
    },
    star222301: {
        distance:24.32, resources:['hydrogen', 'uranium'], stats:{ 'power':2311, 'defense':1758, 'speed':8 },
        explore:[{ id:'antimatter', count:243200 }],
        statue:[{ id:'hydrogen', count:1000000000000 }, { id:'uranium', count:1000000000000 }],
    },
    star3901: {
        distance:24.56, resources:['lava', 'uranium'], stats:{ 'power':1181, 'defense':671, 'speed':9 },
        explore:[{ id:'antimatter', count:245600 }],
        statue:[{ id:'lava', count:1000000000000 }, { id:'uranium', count:1000000000000 }],
    },
    star168301: {
        distance:24.63, resources:['lunarite', 'lunarite'], stats:{ 'power':1253, 'defense':1759, 'speed':14 },
        explore:[{ id:'antimatter', count:246300 }],
        statue:[{ id:'lunarite', count:1000000000000 }, { id:'lunarite', count:1000000000000 }],
    },
    star120901: {
        distance:25.18, resources:['lava', 'meteorite'], stats:{ 'power':900, 'defense':988, 'speed':11 },
        explore:[{ id:'antimatter', count:251800 }],
        statue:[{ id:'lava', count:1000000000000 }, { id:'meteorite', count:1000000000000 }],
    },
    star125301: {
        distance:25.43, resources:['metal', 'ice'], stats:{ 'power':2583, 'defense':1775, 'speed':11 },
        explore:[{ id:'antimatter', count:254300 }],
        statue:[{ id:'metal', count:1000000000000 }, { id:'ice', count:1000000000000 }],
    },
    star113101: {
        distance:26.23, resources:['gold', 'methane'], stats:{ 'power':2375, 'defense':1583, 'speed':9 },
        explore:[{ id:'antimatter', count:262300 }],
        statue:[{ id:'gold', count:1000000000000 }, { id:'methane', count:1000000000000 }],
    },
    star89101: {
        distance:26.56, resources:['titanium', 'oil'], stats:{ 'power':1939, 'defense':1945, 'speed':14 },
        explore:[{ id:'antimatter', count:265600 }],
        statue:[{ id:'titanium', count:1000000000000 }, { id:'oil', count:1000000000000 }],
    },
    star93901: {
        distance:26.69, resources:['oil', 'ice'], stats:{ 'power':1426, 'defense':1905, 'speed':14 },
        explore:[{ id:'antimatter', count:266900 }],
        statue:[{ id:'oil', count:1000000000000 }, { id:'ice', count:1000000000000 }],
    },
    star79201: {
        distance:27.41, resources:['silver', 'silver'], stats:{ 'power':946, 'defense':1465, 'speed':15 },
        explore:[{ id:'antimatter', count:274100 }],
        statue:[{ id:'silver', count:1000000000000 }, { id:'silver', count:1000000000000 }],
    },
    star80501: {
        distance:27.9, resources:['wood', 'metal'], stats:{ 'power':897, 'defense':2072, 'speed':13 },
        explore:[{ id:'antimatter', count:279000 }],
        statue:[{ id:'wood', count:1000000000000 }, { id:'metal', count:1000000000000 }],
    },
    star77301: {
        distance:28.61, resources:['lunarite', 'carbon'], stats:{ 'power':1216, 'defense':2159, 'speed':11 },
        explore:[{ id:'antimatter', count:286100 }],
        statue:[{ id:'lunarite', count:1000000000000 }, { id:'carbon', count:1000000000000 }],
    },
    star191701: {
        distance:30.14, resources:['gem', 'carbon'], stats:{ 'power':2828, 'defense':1442, 'speed':5 },
        explore:[{ id:'antimatter', count:301400 }],
        statue:[{ id:'gem', count:1000000000000 }, { id:'carbon', count:1000000000000 }],
    },
    star199702: {
        distance:33.34, resources:['methane', 'silver'], stats:{ 'power':4019, 'defense':1982, 'speed':12 },
        explore:[{ id:'antimatter', count:333400 }],
        statue:[{ id:'methane', count:1000000000000 }, { id:'silver', count:1000000000000 }],
    },
    star21001: {
        distance:33.63, resources:['methane', 'meteorite'], stats:{ 'power':2811, 'defense':1846, 'speed':7 },
        explore:[{ id:'antimatter', count:336300 }],
        statue:[{ id:'methane', count:1000000000000 }, { id:'meteorite', count:1000000000000 }],
    },
    star178302: {
        distance:33.73, resources:['methane', 'methane'], stats:{ 'power':3481, 'defense':1638, 'speed':13 },
        explore:[{ id:'antimatter', count:337300 }],
        statue:[{ id:'methane', count:1000000000000 }, { id:'methane', count:1000000000000 }],
    },
    star32201: {
        distance:34.7, resources:['silver', 'silver'], stats:{ 'power':4755, 'defense':2729, 'speed':15 },
        explore:[{ id:'antimatter', count:347000 }],
        statue:[{ id:'silver', count:1000000000000 }, { id:'silver', count:1000000000000 }],
    },
    star74801: {
        distance:34.86, resources:['gem', 'helium'], stats:{ 'power':2973, 'defense':1585, 'speed':9 },
        explore:[{ id:'antimatter', count:348600 }],
        statue:[{ id:'gem', count:1000000000000 }, { id:'helium', count:1000000000000 }],
    },
    /*------------------------------------------------------------------------*/
    star401: {
        distance:7.8, resources:['lunarite', 'gem'], stats:{ 'power':86, 'defense':71, 'speed':8 },
        explore:[{ id:'antimatter', count:78000 }],
        statue:[{ id:'lunarite', count:1000000000000 }, { id:'gem', count:1000000000000 }],
    },
    star25101: {
        distance:10.5, resources:['hydrogen', 'metal'], stats:{ 'power':293, 'defense':112, 'speed':13 },
        explore:[{ id:'antimatter', count:105000 }],
        statue:[{ id:'hydrogen', count:1000000000000 }, { id:'metal', count:1000000000000 }],
    },
    star207601: {
        distance:11.64, resources:['helium', 'lunarite'], stats:{ 'power':203, 'defense':238, 'speed':7 }, donor:true,
        explore:[{ id:'antimatter', count:116400 }],
        statue:[{ id:'helium', count:1000000000000 }, { id:'lunarite', count:1000000000000 }],
    },
    star223901: {
        distance:12.4, resources:['silver', 'meteorite'], stats:{ 'power':530, 'defense':337, 'speed':14 },
        explore:[{ id:'antimatter', count:124000 }],
        statue:[{ id:'silver', count:1000000000000 }, { id:'meteorite', count:1000000000000 }],
    },
    star121101: {
        distance:14.8, resources:['methane', 'hydrogen'], stats:{ 'power':750, 'defense':567, 'speed':14 },
        explore:[{ id:'antimatter', count:148000 }],
        statue:[{ id:'methane', count:1000000000000 }, { id:'hydrogen', count:1000000000000 }],
    },
    star136701: {
        distance:16.77, resources:['methane', 'metal'], stats:{ 'power':559, 'defense':388, 'speed':6 },
        explore:[{ id:'antimatter', count:167700 }],
        statue:[{ id:'methane', count:1000000000000 }, { id:'metal', count:1000000000000 }],
    },
    star166402: {
        distance:17, resources:['helium', 'methane'], stats:{ 'power':539, 'defense':511, 'speed':10 }, donor:true,
        explore:[{ id:'antimatter', count:170000 }],
        statue:[{ id:'helium', count:1000000000000 }, { id:'methane', count:1000000000000 }],
    },
    star95001: {
        distance:17.71, resources:['titanium', 'meteorite'], stats:{ 'power':595, 'defense':664, 'speed':8 },
        explore:[{ id:'antimatter', count:177100 }],
        statue:[{ id:'titanium', count:1000000000000 }, { id:'meteorite', count:1000000000000 }],
    },
    star175902: {
        distance:17.98, resources:['hydrogen', 'wood'], stats:{ 'power':1247, 'defense':589, 'speed':9 }, donor:true,
        explore:[{ id:'antimatter', count:179800 }],
        statue:[{ id:'hydrogen', count:1000000000000 }, { id:'wood', count:1000000000000 }],
    },
    star56501: {
        distance:19.19, resources:['oil', 'gem'], stats:{ 'power':370, 'defense':507, 'speed':14 },
        explore:[{ id:'antimatter', count:191900 }],
        statue:[{ id:'oil', count:1000000000000 }, { id:'gem', count:1000000000000 }],
    },
    star167801: {
        distance:19.42, resources:['oil', 'metal'], stats:{ 'power':762, 'defense':511, 'speed':15 },
        explore:[{ id:'antimatter', count:194200 }],
        statue:[{ id:'oil', count:1000000000000 }, { id:'metal', count:1000000000000 }],
    },
    star103201: {
        distance:20.26, resources:['hydrogen', 'methane'], stats:{ 'power':857, 'defense':927, 'speed':5 },
        explore:[{ id:'antimatter', count:202600 }],
        statue:[{ id:'hydrogen', count:1000000000000 }, { id:'methane', count:1000000000000 }],
    },
    star113301: {
        distance:21.47, resources:['hydrogen', 'metal'], stats:{ 'power':1769, 'defense':631, 'speed':14 },
        explore:[{ id:'antimatter', count:214700 }],
        statue:[{ id:'hydrogen', count:1000000000000 }, { id:'metal', count:1000000000000 }],
    },
    star199602: {
        distance:21.85, resources:['silver', 'titanium'], stats:{ 'power':1518, 'defense':606, 'speed':5 },
        explore:[{ id:'antimatter', count:218500 }],
        statue:[{ id:'silver', count:1000000000000 }, { id:'titanium', count:1000000000000 }],
    },
    star157201: {
        distance:24.91, resources:['oil', 'methane'], stats:{ 'power':1093, 'defense':1746, 'speed':5 },
        explore:[{ id:'antimatter', count:249100 }],
        statue:[{ id:'oil', count:1000000000000 }, { id:'methane', count:1000000000000 }],
    },
    star222201: {
        distance:23.76, resources:['uranium', 'silver'], stats:{ 'power':718, 'defense':863, 'speed':15 },
        explore:[{ id:'antimatter', count:237600 }],
        statue:[{ id:'uranium', count:1000000000000 }, { id:'silver', count:1000000000000 }],
    },
    star6301: {
        distance:24.33, resources:['titanium', 'lava'], stats:{ 'power':1168, 'defense':722, 'speed':11 },
        explore:[{ id:'antimatter', count:243300 }],
        statue:[{ id:'titanium', count:1000000000000 }, { id:'lava', count:1000000000000 }],
    },
    star214301: {
        distance:25.97, resources:['carbon', 'uranium'], stats:{ 'power':1861, 'defense':1698, 'speed':14 },
        explore:[{ id:'antimatter', count:259700 }],
        statue:[{ id:'carbon', count:1000000000000 }, { id:'uranium', count:1000000000000 }],
    },
    star40801: {
        distance:26.07, resources:['methane', 'metal'], stats:{ 'power':1566, 'defense':1944, 'speed':9 },
        explore:[{ id:'antimatter', count:260700 }],
        statue:[{ id:'methane', count:1000000000000 }, { id:'metal', count:1000000000000 }],
    },
    star207301: {
        distance:26.28, resources:['titanium', 'wood'], stats:{ 'power':944, 'defense':1168, 'speed':5 },
        explore:[{ id:'antimatter', count:262800 }],
        statue:[{ id:'titanium', count:1000000000000 }, { id:'wood', count:1000000000000 }],
    },
    star169601: {
        distance:26.57, resources:['gem', 'silicon'], stats:{ 'power':1903, 'defense':1859, 'speed':13 },
        explore:[{ id:'antimatter', count:265700 }],
        statue:[{ id:'gem', count:1000000000000 }, { id:'silicon', count:1000000000000 }],
    },
    star157101: {
        distance:28.11, resources:['oil', 'helium'], stats:{ 'power':1781, 'defense':1088, 'speed':6 },
        explore:[{ id:'antimatter', count:281100 }],
        statue:[{ id:'oil', count:1000000000000 }, { id:'helium', count:1000000000000 }],
    },
    star178501: {
        distance:28.26, resources:['hydrogen', 'uranium'], stats:{ 'power':2207, 'defense':1031, 'speed':6 },
        explore:[{ id:'antimatter', count:282600 }],
        statue:[{ id:'hydrogen', count:1000000000000 }, { id:'uranium', count:1000000000000 }],
    },
    star208601: {
        distance:28.91, resources:['carbon', 'methane'], stats:{ 'power':2312, 'defense':2295, 'speed':13 },
        explore:[{ id:'antimatter', count:289100 }],
        statue:[{ id:'carbon', count:1000000000000 }, { id:'methane', count:1000000000000 }],
    },
    star78101: {
        distance:29.48, resources:['wood', 'hydrogen'], stats:{ 'power':1211, 'defense':2494, 'speed':15 },
        explore:[{ id:'antimatter', count:294800 }],
        statue:[{ id:'wood', count:1000000000000 }, { id:'hydrogen', count:1000000000000 }],
    },
    star123501: {
        distance:30.95, resources:['carbon', 'carbon'], stats:{ 'power':2844, 'defense':1816, 'speed':12 },
        explore:[{ id:'antimatter', count:309500 }],
        statue:[{ id:'carbon', count:1000000000000 }, { id:'carbon', count:1000000000000 }],
    },
    star85901: {
        distance:31.5, resources:['lunarite', 'metal'], stats:{ 'power':1673, 'defense':1609, 'speed':15 },
        explore:[{ id:'antimatter', count:315000 }],
        statue:[{ id:'lunarite', count:1000000000000 }, { id:'metal', count:1000000000000 }],
    },
    star18501: {
        distance:31.85, resources:['wood', 'meteorite'], stats:{ 'power':1368, 'defense':2485, 'speed':6 },
        explore:[{ id:'antimatter', count:318500 }],
        statue:[{ id:'wood', count:1000000000000 }, { id:'meteorite', count:1000000000000 }],
    },
    star199801: {
        distance:32.01, resources:['uranium', 'silver'], stats:{ 'power':3811, 'defense':1989, 'speed':7 },
        explore:[{ id:'antimatter', count:320100 }],
        statue:[{ id:'uranium', count:1000000000000 }, { id:'silver', count:1000000000000 }],
    },
    star141901: {
        distance:32.1, resources:['gem', 'metal'], stats:{ 'power':2373, 'defense':2562, 'speed':8 },
        explore:[{ id:'antimatter', count:321000 }],
        statue:[{ id:'gem', count:1000000000000 }, { id:'metal', count:1000000000000 }],
    },
    star5201: {
        distance:32.36, resources:['methane', 'ice'], stats:{ 'power':2105, 'defense':2952, 'speed':14 },
        explore:[{ id:'antimatter', count:323600 }],
        statue:[{ id:'methane', count:1000000000000 }, { id:'ice', count:1000000000000 }],
    },
    star223701: {
        distance:32.98, resources:['helium', 'gold'], stats:{ 'power':3065, 'defense':2290, 'speed':8 },
        explore:[{ id:'antimatter', count:329800 }],
        statue:[{ id:'helium', count:1000000000000 }, { id:'gold', count:1000000000000 }],
    },
    star166903: {
        distance:33.03, resources:['silicon', 'methane'], stats:{ 'power':3965, 'defense':2348, 'speed':7 },
        explore:[{ id:'antimatter', count:330300 }],
        statue:[{ id:'silicon', count:1000000000000 }, { id:'methane', count:1000000000000 }],
    },
    star32101: {
        distance:33.24, resources:['silver', 'meteorite'], stats:{ 'power':2028, 'defense':2434, 'speed':11 },
        explore:[{ id:'antimatter', count:332400 }],
        statue:[{ id:'silver', count:1000000000000 }, { id:'meteorite', count:1000000000000 }],
    },
    star77801: {
        distance:34.17, resources:['uranium', 'hydrogen'], stats:{ 'power':3402, 'defense':2740, 'speed':14 },
        explore:[{ id:'antimatter', count:341700 }],
        statue:[{ id:'uranium', count:1000000000000 }, { id:'hydrogen', count:1000000000000 }],
    },
    star205201: {
        distance:34.96, resources:['uranium', 'lava'], stats:{ 'power':2987, 'defense':2014, 'speed':13 },
        explore:[{ id:'antimatter', count:349600 }],
        statue:[{ id:'uranium', count:1000000000000 }, { id:'lava', count:1000000000000 }],
    },
    /*------------------------------------------------------------------------*/
    star201: {
        distance:4.3, resources:['ice', 'hydrogen'], stats:{ 'power':30, 'defense':20, 'speed':5 },
        explore:[{ id:'antimatter', count:43000 }],
        statue:[{ id:'ice', count:1000000000000 }, { id:'hydrogen', count:1000000000000 }],
    },
    star217101: {
        distance:11.08, resources:['silver', 'metal'], stats:{ 'power':420, 'defense':143, 'speed':12 },
        explore:[{ id:'antimatter', count:110800 }],
        statue:[{ id:'silver', count:1000000000000 }, { id:'metal', count:1000000000000 }],
    },
    star166701: {
        distance:11.64, resources:['meteorite', 'silver'], stats:{ 'power':331, 'defense':286, 'speed':6 },
        explore:[{ id:'antimatter', count:116400 }],
        statue:[{ id:'meteorite', count:1000000000000 }, { id:'silver', count:1000000000000 }],
    },
    star179501: {
        distance:13.47, resources:['carbon', 'lava'], stats:{ 'power':430, 'defense':411, 'speed':7 },
        explore:[{ id:'antimatter', count:134700 }],
        statue:[{ id:'carbon', count:1000000000000 }, { id:'lava', count:1000000000000 }],
    },
    star6501: {
        distance:14.13, resources:['gold', 'silicon'], stats:{ 'power':588, 'defense':522, 'speed':8 },
        explore:[{ id:'antimatter', count:141300 }],
        statue:[{ id:'gold', count:1000000000000 }, { id:'silicon', count:1000000000000 }],
    },
    star222401: {
        distance:14.65, resources:['lava', 'methane'], stats:{ 'power':527, 'defense':239, 'speed':6 },
        explore:[{ id:'antimatter', count:146500 }],
        statue:[{ id:'lava', count:1000000000000 }, { id:'methane', count:1000000000000 }],
    },
    star200001: {
        distance:19.26, resources:['gold', 'meteorite'], stats:{ 'power':1176, 'defense':612, 'speed':10 }, donor:true,
        explore:[{ id:'antimatter', count:192600 }],
        statue:[{ id:'gold', count:1000000000000 }, { id:'meteorite', count:1000000000000 }],
    },
    star24201: {
        distance:19.77, resources:['gold', 'lunarite'], stats:{ 'power':595, 'defense':956, 'speed':14 },
        explore:[{ id:'antimatter', count:197700 }],
        statue:[{ id:'gold', count:1000000000000 }, { id:'lunarite', count:1000000000000 }],
    },
    star224202: {
        distance:22.37, resources:['titanium', 'hydrogen'], stats:{ 'power':1841, 'defense':1155, 'speed':10 },
        explore:[{ id:'antimatter', count:223700 }],
        statue:[{ id:'titanium', count:1000000000000 }, { id:'hydrogen', count:1000000000000 }],
    },
    star92801: {
        distance:24.88, resources:['methane', 'carbon'], stats:{ 'power':2461, 'defense':1301, 'speed':7 },
        explore:[{ id:'antimatter', count:248800 }],
        statue:[{ id:'methane', count:1000000000000 }, { id:'carbon', count:1000000000000 }],
    },
    star172701: {
        distance:24.9, resources:['methane', 'helium'], stats:{ 'power':2333, 'defense':972, 'speed':6 },
        explore:[{ id:'antimatter', count:249000 }],
        statue:[{ id:'methane', count:1000000000000 }, { id:'helium', count:1000000000000 }],
    },
    star86401: {
        distance:24.99, resources:['titanium', 'lunarite'], stats:{ 'power':1867, 'defense':920, 'speed':8 },
        explore:[{ id:'antimatter', count:249900 }],
        statue:[{ id:'titanium', count:1000000000000 }, { id:'lunarite', count:1000000000000 }],
    },
    star202902: {
        distance:27.63, resources:['gem', 'metal'], stats:{ 'power':1261, 'defense':1135, 'speed':5 },
        explore:[{ id:'antimatter', count:276300 }],
        statue:[{ id:'gem', count:1000000000000 }, { id:'metal', count:1000000000000 }],
    },
    star177001: {
        distance:27.79, resources:['carbon', 'hydrogen'], stats:{ 'power':1184, 'defense':2279, 'speed':12 },
        explore:[{ id:'antimatter', count:277900 }],
        statue:[{ id:'carbon', count:1000000000000 }, { id:'hydrogen', count:1000000000000 }],
    },
    star68301: {
        distance:27.81, resources:['ice', 'uranium'], stats:{ 'power':2065, 'defense':958, 'speed':10 },
        explore:[{ id:'antimatter', count:278100 }],
        statue:[{ id:'ice', count:1000000000000 }, { id:'uranium', count:1000000000000 }],
    },
    star205001: {
        distance:28.66, resources:['uranium', 'silver'], stats:{ 'power':2555, 'defense':1812, 'speed':7 },
        explore:[{ id:'antimatter', count:286600 }],
        statue:[{ id:'uranium', count:1000000000000 }, { id:'silver', count:1000000000000 }],
    },
    star13401: {
        distance:28.66, resources:['silicon', 'metal'], stats:{ 'power':2684, 'defense':902, 'speed':7 },
        explore:[{ id:'antimatter', count:286600 }],
        statue:[{ id:'silicon', count:1000000000000 }, { id:'metal', count:1000000000000 }],
    },
    star34201: {
        distance:28.75, resources:['carbon', 'silver'], stats:{ 'power':3086, 'defense':1715, 'speed':6 },
        explore:[{ id:'antimatter', count:287500 }],
        statue:[{ id:'carbon', count:1000000000000 }, { id:'silver', count:1000000000000 }],
    },
    star182101: {
        distance:29.12, resources:['silicon', 'gold'], stats:{ 'power':1192, 'defense':1832, 'speed':6 },
        explore:[{ id:'antimatter', count:291200 }],
        statue:[{ id:'silicon', count:1000000000000 }, { id:'gold', count:1000000000000 }],
    },
    star178401: {
        distance:29.25, resources:['silver', 'hydrogen'], stats:{ 'power':3295, 'defense':1540, 'speed':13 },
        explore:[{ id:'antimatter', count:292500 }],
        statue:[{ id:'silver', count:1000000000000 }, { id:'hydrogen', count:1000000000000 }],
    },
    star107601: {
        distance:29.38, resources:['helium', 'silicon'], stats:{ 'power':2195, 'defense':1127, 'speed':5 },
        explore:[{ id:'antimatter', count:293800 }],
        statue:[{ id:'helium', count:1000000000000 }, { id:'silicon', count:1000000000000 }],
    },
    star192101: {
        distance:29.87, resources:['wood', 'carbon'], stats:{ 'power':2350, 'defense':2425, 'speed':9 },
        explore:[{ id:'antimatter', count:298700 }],
        statue:[{ id:'wood', count:1000000000000 }, { id:'carbon', count:1000000000000 }],
    },
    star24001: {
        distance:29.87, resources:['lava', 'helium'], stats:{ 'power':1036, 'defense':1460, 'speed':12 },
        explore:[{ id:'antimatter', count:298700 }],
        statue:[{ id:'lava', count:1000000000000 }, { id:'helium', count:1000000000000 }],
    },
    star16601: {
        distance:30.06, resources:['hydrogen', 'gem'], stats:{ 'power':1761, 'defense':1234, 'speed':5 },
        explore:[{ id:'antimatter', count:300600 }],
        statue:[{ id:'hydrogen', count:1000000000000 }, { id:'gem', count:1000000000000 }],
    },
    star27501: {
        distance:31.36, resources:['helium', 'ice'], stats:{ 'power':1490, 'defense':1216, 'speed':15 },
        explore:[{ id:'antimatter', count:313600 }],
        statue:[{ id:'helium', count:1000000000000 }, { id:'ice', count:1000000000000 }],
    },
    star121601: {
        distance:31.88, resources:['metal', 'ice'], stats:{ 'power':1751, 'defense':2344, 'speed':15 },
        explore:[{ id:'antimatter', count:318800 }],
        statue:[{ id:'metal', count:1000000000000 }, { id:'ice', count:1000000000000 }],
    },
    star212102: {
        distance:33.35, resources:['gold', 'ice'], stats:{ 'power':1144, 'defense':1466, 'speed':7 },
        explore:[{ id:'antimatter', count:333500 }],
        statue:[{ id:'gold', count:1000000000000 }, { id:'ice', count:1000000000000 }],
    },
    star117501: {
        distance:33.66, resources:['silver', 'carbon'], stats:{ 'power':2373, 'defense':2370, 'speed':7 },
        explore:[{ id:'antimatter', count:336600 }],
        statue:[{ id:'silver', count:1000000000000 }, { id:'carbon', count:1000000000000 }],
    },
    /*------------------------------------------------------------------------*/                                                                                        
    star501: {
        distance:8.31, resources:['titanium', 'silicon'], stats:{ 'power':132, 'defense':117, 'speed':8 },
        explore:[{ id:'antimatter', count:83100 }],
        statue:[{ id:'titanium', count:1000000000000 }, { id:'silicon', count:1000000000000 }],
    },
    star130601: {
        distance:9.69, resources:['gold', 'lava'], stats:{ 'power':144, 'defense':229, 'speed':12 },
        explore:[{ id:'antimatter', count:96900 }],
        statue:[{ id:'gold', count:1000000000000 }, { id:'lava', count:1000000000000 }],
    },
    star158101: {
        distance:10.73, resources:['oil', 'lava'], stats:{ 'power':443, 'defense':147, 'speed':7 },
        explore:[{ id:'antimatter', count:107300 }],
        statue:[{ id:'oil', count:1000000000000 }, { id:'lava', count:1000000000000 }],
    },
    star224601: {
        distance:11.8, resources:['methane', 'gold'], stats:{ 'power':513, 'defense':164, 'speed':9 },
        explore:[{ id:'antimatter', count:118000 }],
        statue:[{ id:'methane', count:1000000000000 }, { id:'gold', count:1000000000000 }],
    },
    star58601: {
        distance:11.83, resources:['helium', 'methane'], stats:{ 'power':427, 'defense':184, 'speed':11 },
        explore:[{ id:'antimatter', count:118300 }],
        statue:[{ id:'helium', count:1000000000000 }, { id:'methane', count:1000000000000 }],
    },
    star10101: {
        distance:12.2, resources:['gold', 'hydrogen'], stats:{ 'power':506, 'defense':334, 'speed':15 },
        explore:[{ id:'antimatter', count:122000 }],
        statue:[{ id:'gold', count:1000000000000 }, { id:'hydrogen', count:1000000000000 }],
    },
    star194201: {
        distance:14.05, resources:['silver', 'lava'], stats:{ 'power':460, 'defense':465, 'speed':10 }, donor:true,
        explore:[{ id:'antimatter', count:140500 }],
        statue:[{ id:'silver', count:1000000000000 }, { id:'lava', count:1000000000000 }],
    },
    star1101: {
        distance:14.22, resources:['silicon', 'methane'], stats:{ 'power':779, 'defense':410, 'speed':10 },
        explore:[{ id:'antimatter', count:142200 }],
        statue:[{ id:'silicon', count:1000000000000 }, { id:'methane', count:1000000000000 }],
    },
    star72501: {
        distance:14.76, resources:['uranium', 'lava'], stats:{ 'power':620, 'defense':612, 'speed':15 },
        explore:[{ id:'antimatter', count:147600 }],
        statue:[{ id:'uranium', count:1000000000000 }, { id:'lava', count:1000000000000 }],
    },
    star210501: {
        distance:15.39, resources:['meteorite', 'meteorite'], stats:{ 'power':479, 'defense':563, 'speed':14 },
        explore:[{ id:'antimatter', count:153900 }],
        statue:[{ id:'meteorite', count:1000000000000 }, { id:'meteorite', count:1000000000000 }],
    },
    star189701: {
        distance:15.76, resources:['helium', 'gold'], stats:{ 'power':708, 'defense':278, 'speed':10 }, donor:true,
        explore:[{ id:'antimatter', count:157600 }],
        statue:[{ id:'helium', count:1000000000000 }, { id:'gold', count:1000000000000 }],
    },
    star175601: {
        distance:16.45, resources:['wood', 'meteorite'], stats:{ 'power':411, 'defense':544, 'speed':15 },
        explore:[{ id:'antimatter', count:164500 }],
        statue:[{ id:'wood', count:1000000000000 }, { id:'meteorite', count:1000000000000 }],
    },
    star206902: {
        distance:16.59, resources:['hydrogen', 'carbon'], stats:{ 'power':602, 'defense':555, 'speed':11 },
        explore:[{ id:'antimatter', count:165900 }],
        statue:[{ id:'hydrogen', count:1000000000000 }, { id:'carbon', count:1000000000000 }],
    },
    star133601: {
        distance:18.56, resources:['titanium', 'methane'], stats:{ 'power':471, 'defense':749, 'speed':8 },
        explore:[{ id:'antimatter', count:185600 }],
        statue:[{ id:'titanium', count:1000000000000 }, { id:'methane', count:1000000000000 }],
    },
    star135801: {
        distance:18.81, resources:['uranium', 'meteorite'], stats:{ 'power':635, 'defense':664, 'speed':12 },
        explore:[{ id:'antimatter', count:188100 }],
        statue:[{ id:'uranium', count:1000000000000 }, { id:'meteorite', count:1000000000000 }],
    },
    star39101: {
        distance:18.88, resources:['ice', 'lunarite'], stats:{ 'power':1396, 'defense':698, 'speed':14 },
        explore:[{ id:'antimatter', count:188800 }],
        statue:[{ id:'ice', count:1000000000000 }, { id:'lunarite', count:1000000000000 }],
    },
    star107001: {
        distance:19.35, resources:['gold', 'hydrogen'], stats:{ 'power':805, 'defense':587, 'speed':11 },
        explore:[{ id:'antimatter', count:193500 }],
        statue:[{ id:'gold', count:1000000000000 }, { id:'hydrogen', count:1000000000000 }],
    },
    star105801: {
        distance:20.45, resources:['lunarite', 'hydrogen'], stats:{ 'power':1478, 'defense':1182, 'speed':7 },
        explore:[{ id:'antimatter', count:204500 }],
        statue:[{ id:'lunarite', count:1000000000000 }, { id:'hydrogen', count:1000000000000 }],
    },
    star224201: {
        distance:22.37, resources:['silver', 'metal'], stats:{ 'power':1275, 'defense':672, 'speed':11 }, donor:true,
        explore:[{ id:'antimatter', count:223700 }],
        statue:[{ id:'silver', count:1000000000000 }, { id:'metal', count:1000000000000 }],
    },
    star205101: {
        distance:22.74, resources:['helium', 'titanium'], stats:{ 'power':747, 'defense':1117, 'speed':11 }, donor:true,
        explore:[{ id:'antimatter', count:227400 }],
        statue:[{ id:'helium', count:1000000000000 }, { id:'titanium', count:1000000000000 }],
    },
    star162501: {
        distance:23.53, resources:['oil', 'meteorite'], stats:{ 'power':1393, 'defense':773, 'speed':5 },
        explore:[{ id:'antimatter', count:235300 }],
        statue:[{ id:'oil', count:1000000000000 }, { id:'meteorite', count:1000000000000 }],
    },
    star4001: {
        distance:24.38, resources:['ice', 'silicon'], stats:{ 'power':1337, 'defense':775, 'speed':14 },
        explore:[{ id:'antimatter', count:243800 }],
        statue:[{ id:'ice', count:1000000000000 }, { id:'silicon', count:1000000000000 }],
    },
    star141101: {
        distance:25.96, resources:['ice', 'lunarite'], stats:{ 'power':2177, 'defense':1625, 'speed':11 },
        explore:[{ id:'antimatter', count:259600 }],
        statue:[{ id:'ice', count:1000000000000 }, { id:'lunarite', count:1000000000000 }],
    },
    star180502: {
        distance:26.17, resources:['wood', 'metal'], stats:{ 'power':1908, 'defense':980, 'speed':11 },
        explore:[{ id:'antimatter', count:261700 }],
        statue:[{ id:'wood', count:1000000000000 }, { id:'metal', count:1000000000000 }],
    },
    star208702: {
        distance:26.6, resources:['silicon', 'wood'], stats:{ 'power':1034, 'defense':1838, 'speed':10 },
        explore:[{ id:'antimatter', count:266000 }],
        statue:[{ id:'silicon', count:1000000000000 }, { id:'wood', count:1000000000000 }],
    },
    star85501: {
        distance:27.3, resources:['meteorite', 'titanium'], stats:{ 'power':1049, 'defense':1778, 'speed':8 },
        explore:[{ id:'antimatter', count:273000 }],
        statue:[{ id:'meteorite', count:1000000000000 }, { id:'titanium', count:1000000000000 }],
    },
    star217202: {
        distance:28.19, resources:['meteorite', 'uranium'], stats:{ 'power':2289, 'defense':1983, 'speed':15 },
        explore:[{ id:'antimatter', count:281900 }],
        statue:[{ id:'meteorite', count:1000000000000 }, { id:'uranium', count:1000000000000 }],
    },
    star180101: {
        distance:28.38, resources:['methane', 'gem'], stats:{ 'power':1870, 'defense':1624, 'speed':8 },
        explore:[{ id:'antimatter', count:283800 }],
        statue:[{ id:'methane', count:1000000000000 }, { id:'gem', count:1000000000000 }],
    },
    star13801: {
        distance:32.54, resources:['carbon', 'gold'], stats:{ 'power':3103, 'defense':2163, 'speed':12 },
        explore:[{ id:'antimatter', count:325400 }],
        statue:[{ id:'carbon', count:1000000000000 }, { id:'gold', count:1000000000000 }],
    },
    star37101: {
        distance:32.71, resources:['silver', 'silver'], stats:{ 'power':3279, 'defense':2710, 'speed':10 },
        explore:[{ id:'antimatter', count:327100 }],
        statue:[{ id:'silver', count:1000000000000 }, { id:'silver', count:1000000000000 }],
    },
    star42501: {
        distance:33.1, resources:['gold', 'hydrogen'], stats:{ 'power':3316, 'defense':3166, 'speed':11 },
        explore:[{ id:'antimatter', count:331000 }],
        statue:[{ id:'gold', count:1000000000000 }, { id:'hydrogen', count:1000000000000 }],
    },
    star80901: {
        distance:33.23, resources:['methane', 'titanium'], stats:{ 'power':1455, 'defense':3056, 'speed':6 },
        explore:[{ id:'antimatter', count:332300 }],
        statue:[{ id:'methane', count:1000000000000 }, { id:'titanium', count:1000000000000 }],
    },
    star215902: {
        distance:33.25, resources:['uranium', 'titanium'], stats:{ 'power':4146, 'defense':2027, 'speed':8 },
        explore:[{ id:'antimatter', count:332500 }],
        statue:[{ id:'uranium', count:1000000000000 }, { id:'titanium', count:1000000000000 }],
    },
    star190502: {
        distance:33.98, resources:['silver', 'lunarite'], stats:{ 'power':3897, 'defense':1867, 'speed':6 },
        explore:[{ id:'antimatter', count:339800 }],
        statue:[{ id:'silver', count:1000000000000 }, { id:'lunarite', count:1000000000000 }],
    },
    star99701: {
        distance:34.33, resources:['ice', 'ice'], stats:{ 'power':3812, 'defense':2495, 'speed':10 },
        explore:[{ id:'antimatter', count:343300 }],
        statue:[{ id:'ice', count:1000000000000 }, { id:'ice', count:1000000000000 }],
    },
    star176802: {
        distance:34.33, resources:['gem', 'titanium'], stats:{ 'power':4481, 'defense':2620, 'speed':13 },
        explore:[{ id:'antimatter', count:343300 }],
        statue:[{ id:'gem', count:1000000000000 }, { id:'titanium', count:1000000000000 }],
    },
    /*------------------------------------------------------------------------*/                                                                                        
    star701: {
        distance:8.55, resources:['carbon', 'methane'], stats:{ 'power':146, 'defense':131, 'speed':10 },
        explore:[{ id:'antimatter', count:85500 }],
        statue:[{ id:'carbon', count:1000000000000 }, { id:'methane', count:1000000000000 }],
    },
    star601: {
        distance:8.6, resources:['silicon', 'methane'], stats:{ 'power':110, 'defense':129, 'speed':8 },
        explore:[{ id:'antimatter', count:86000 }],
        statue:[{ id:'silicon', count:1000000000000 }, { id:'methane', count:1000000000000 }],
    },
    star80101: {
        distance:10.89, resources:['hydrogen', 'helium'], stats:{ 'power':125, 'defense':198, 'speed':11 },
        explore:[{ id:'antimatter', count:108900 }],
        statue:[{ id:'hydrogen', count:1000000000000 }, { id:'helium', count:1000000000000 }],
    },
    star213301: {
        distance:11.43, resources:['uranium', 'ice'], stats:{ 'power':289, 'defense':177, 'speed':11 },
        explore:[{ id:'antimatter', count:114300 }],
        statue:[{ id:'uranium', count:1000000000000 }, { id:'ice', count:1000000000000 }],
    },
    star13601: {
        distance:11.9, resources:['silicon', 'silicon'], stats:{ 'power':491, 'defense':413, 'speed':6 },
        explore:[{ id:'antimatter', count:119000 }],
        statue:[{ id:'silicon', count:1000000000000 }, { id:'silicon', count:1000000000000 }],
    },
    star51801: {
        distance:12.39, resources:['uranium', 'titanium'], stats:{ 'power':320, 'defense':355, 'speed':7 },
        explore:[{ id:'antimatter', count:123900 }],
        statue:[{ id:'uranium', count:1000000000000 }, { id:'titanium', count:1000000000000 }],
    },
    star35801: {
        distance:12.78, resources:['lava', 'silver'], stats:{ 'power':468, 'defense':285, 'speed':10 },
        explore:[{ id:'antimatter', count:127800 }],
        statue:[{ id:'lava', count:1000000000000 }, { id:'silver', count:1000000000000 }],
    },
    star216801: {
        distance:13.07, resources:['lunarite', 'ice'], stats:{ 'power':526, 'defense':490, 'speed':9 },
        explore:[{ id:'antimatter', count:130700 }],
        statue:[{ id:'lunarite', count:1000000000000 }, { id:'ice', count:1000000000000 }],
    },
    star224101: {
        distance:13.16, resources:['wood', 'metal'], stats:{ 'power':587, 'defense':285, 'speed':12 },
        explore:[{ id:'antimatter', count:131600 }],
        statue:[{ id:'wood', count:1000000000000 }, { id:'metal', count:1000000000000 }],
    },
    star114001: {
        distance:13.91, resources:['metal', 'meteorite'], stats:{ 'power':705, 'defense':479, 'speed':11 },
        explore:[{ id:'antimatter', count:139100 }],
        statue:[{ id:'metal', count:1000000000000 }, { id:'meteorite', count:1000000000000 }],
    },
    star15301: {
        distance:14.57, resources:['metal', 'hydrogen'], stats:{ 'power':568, 'defense':229, 'speed':15 }, donor:true,
        explore:[{ id:'antimatter', count:145700 }],
        statue:[{ id:'metal', count:1000000000000 }, { id:'hydrogen', count:1000000000000 }],
    },
    star69601: {
        distance:16, resources:['gem', 'titanium'], stats:{ 'power':657, 'defense':767, 'speed':10 },
        explore:[{ id:'antimatter', count:160000 }],
        statue:[{ id:'gem', count:1000000000000 }, { id:'titanium', count:1000000000000 }],
    },
    star148501: {
        distance:16.1, resources:['oil', 'methane'], stats:{ 'power':443, 'defense':384, 'speed':15 },
        explore:[{ id:'antimatter', count:161000 }],
        statue:[{ id:'oil', count:1000000000000 }, { id:'methane', count:1000000000000 }],
    },
    star155801: {
        distance:16.47, resources:['ice', 'meteorite'], stats:{ 'power':633, 'defense':589, 'speed':5 },
        explore:[{ id:'antimatter', count:164700 }],
        statue:[{ id:'ice', count:1000000000000 }, { id:'meteorite', count:1000000000000 }],
    },
    star185101: {
        distance:17.05, resources:['gold', 'gold'], stats:{ 'power':802, 'defense':792, 'speed':10 }, donor:true,
        explore:[{ id:'antimatter', count:170500 }],
        statue:[{ id:'gold', count:1000000000000 }, { id:'gold', count:1000000000000 }],
    },
    star175901: {
        distance:17.98, resources:['helium', 'meteorite'], stats:{ 'power':540, 'defense':332, 'speed':12 }, donor:true,
        explore:[{ id:'antimatter', count:179800 }],
        statue:[{ id:'helium', count:1000000000000 }, { id:'meteorite', count:1000000000000 }],
    },
    star203902: {
        distance:18.72, resources:['wood', 'uranium'], stats:{ 'power':873, 'defense':1048, 'speed':11 },
        explore:[{ id:'antimatter', count:187200 }],
        statue:[{ id:'wood', count:1000000000000 }, { id:'uranium', count:1000000000000 }],
    },
    star204801: {
        distance:19.47, resources:['silicon', 'gem'], stats:{ 'power':1496, 'defense':1070, 'speed':13 },
        explore:[{ id:'antimatter', count:194700 }],
        statue:[{ id:'silicon', count:1000000000000 }, { id:'gem', count:1000000000000 }],
    },
    star211202: {
        distance:19.74, resources:['methane', 'silver'], stats:{ 'power':1331, 'defense':554, 'speed':14 },
        explore:[{ id:'antimatter', count:197400 }],
        statue:[{ id:'methane', count:1000000000000 }, { id:'silver', count:1000000000000 }],
    },
    star100801: {
        distance:19.95, resources:['metal', 'titanium'], stats:{ 'power':1095, 'defense':685, 'speed':8 },
        explore:[{ id:'antimatter', count:199500 }],
        statue:[{ id:'metal', count:1000000000000 }, { id:'titanium', count:1000000000000 }],
    },
    star124101: {
        distance:20.03, resources:['hydrogen', 'ice'], stats:{ 'power':863, 'defense':583, 'speed':6 },
        explore:[{ id:'antimatter', count:200300 }],
        statue:[{ id:'hydrogen', count:1000000000000 }, { id:'ice', count:1000000000000 }],
    },
    star139701: {
        distance:20.24, resources:['methane', 'silicon'], stats:{ 'power':1624, 'defense':1208, 'speed':12 },
        explore:[{ id:'antimatter', count:202400 }],
        statue:[{ id:'methane', count:1000000000000 }, { id:'silicon', count:1000000000000 }],
    },
    star50401: {
        distance:20.74, resources:['lava', 'gem'], stats:{ 'power':1439, 'defense':863, 'speed':12 },
        explore:[{ id:'antimatter', count:207400 }],
        statue:[{ id:'lava', count:1000000000000 }, { id:'gem', count:1000000000000 }],
    },
    star159101: {
        distance:21.28, resources:['helium', 'lunarite'], stats:{ 'power':830, 'defense':652, 'speed':6 },
        explore:[{ id:'antimatter', count:212800 }],
        statue:[{ id:'helium', count:1000000000000 }, { id:'lunarite', count:1000000000000 }],
    },
    star148101: {
        distance:21.99, resources:['carbon', 'gem'], stats:{ 'power':1817, 'defense':977, 'speed':5 },
        explore:[{ id:'antimatter', count:219900 }],
        statue:[{ id:'carbon', count:1000000000000 }, { id:'gem', count:1000000000000 }],
    },
    star157301: {
        distance:22.45, resources:['silicon', 'ice'], stats:{ 'power':852, 'defense':606, 'speed':13 },
        explore:[{ id:'antimatter', count:224500 }],
        statue:[{ id:'silicon', count:1000000000000 }, { id:'ice', count:1000000000000 }],
    },
    star72601: {
        distance:22.48, resources:['hydrogen', 'silver'], stats:{ 'power':1244, 'defense':1466, 'speed':15 },
        explore:[{ id:'antimatter', count:224800 }],
        statue:[{ id:'hydrogen', count:1000000000000 }, { id:'silver', count:1000000000000 }],
    },
    star224801: {
        distance:23.5, resources:['silicon', 'titanium'], stats:{ 'power':1608, 'defense':566, 'speed':14 },
        explore:[{ id:'antimatter', count:235000 }],
        statue:[{ id:'silicon', count:1000000000000 }, { id:'titanium', count:1000000000000 }],
    },
    star71001: {
        distance:23.59, resources:['helium', 'silver'], stats:{ 'power':792, 'defense':1615, 'speed':12 },
        explore:[{ id:'antimatter', count:235900 }],
        statue:[{ id:'helium', count:1000000000000 }, { id:'silver', count:1000000000000 }],
    },
    star207501: {
        distance:23.98, resources:['metal', 'carbon'], stats:{ 'power':713, 'defense':1513, 'speed':13 },
        explore:[{ id:'antimatter', count:239800 }],
        statue:[{ id:'metal', count:1000000000000 }, { id:'carbon', count:1000000000000 }],
    },
    star168302: {
        distance:24.63, resources:['ice', 'oil'], stats:{ 'power':2228, 'defense':1446, 'speed':13 },
        explore:[{ id:'antimatter', count:246300 }],
        statue:[{ id:'ice', count:1000000000000 }, { id:'oil', count:1000000000000 }],
    },
    star128901: {
        distance:25.3, resources:['helium', 'methane'], stats:{ 'power':2389, 'defense':1753, 'speed':6 },
        explore:[{ id:'antimatter', count:253000 }],
        statue:[{ id:'helium', count:1000000000000 }, { id:'methane', count:1000000000000 }],
    },
    star68401: {
        distance:25.48, resources:['oil', 'meteorite'], stats:{ 'power':2297, 'defense':1156, 'speed':9 },
        explore:[{ id:'antimatter', count:254800 }],
        statue:[{ id:'oil', count:1000000000000 }, { id:'meteorite', count:1000000000000 }],
    },
    star30701: {
        distance:26.52, resources:['wood', 'carbon'], stats:{ 'power':1231, 'defense':1786, 'speed':11 },
        explore:[{ id:'antimatter', count:265200 }],
        statue:[{ id:'wood', count:1000000000000 }, { id:'carbon', count:1000000000000 }],
    },
    star193402: {
        distance:27.59, resources:['hydrogen', 'carbon'], stats:{ 'power':1250, 'defense':1062, 'speed':11 },
        explore:[{ id:'antimatter', count:275900 }],
        statue:[{ id:'hydrogen', count:1000000000000 }, { id:'carbon', count:1000000000000 }],
    },
    star84201: {
        distance:28.99, resources:['hydrogen', 'methane'], stats:{ 'power':2628, 'defense':1914, 'speed':6 },
        explore:[{ id:'antimatter', count:289900 }],
        statue:[{ id:'hydrogen', count:1000000000000 }, { id:'methane', count:1000000000000 }],
    },
    star76401: {
        distance:29.66, resources:['titanium', 'carbon'], stats:{ 'power':2969, 'defense':1045, 'speed':11 },
        explore:[{ id:'antimatter', count:296600 }],
        statue:[{ id:'titanium', count:1000000000000 }, { id:'carbon', count:1000000000000 }],
    },
    star32301: {
        distance:31.03, resources:['wood', 'wood'], stats:{ 'power':1018, 'defense':1797, 'speed':8 },
        explore:[{ id:'antimatter', count:310300 }],
        statue:[{ id:'wood', count:1000000000000 }, { id:'wood', count:1000000000000 }],
    },
    star191401: {
        distance:31.11, resources:['meteorite', 'uranium'], stats:{ 'power':3584, 'defense':2215, 'speed':15 },
        explore:[{ id:'antimatter', count:311100 }],
        statue:[{ id:'meteorite', count:1000000000000 }, { id:'uranium', count:1000000000000 }],
    },
    star118301: {
        distance:31.18, resources:['gold', 'wood'], stats:{ 'power':3351, 'defense':2096, 'speed':13 },
        explore:[{ id:'antimatter', count:311800 }],
        statue:[{ id:'gold', count:1000000000000 }, { id:'wood', count:1000000000000 }],
    },
    star166901: {
        distance:33.03, resources:['gem', 'silver'], stats:{ 'power':3696, 'defense':1445, 'speed':14 },
        explore:[{ id:'antimatter', count:330300 }],
        statue:[{ id:'gem', count:1000000000000 }, { id:'silver', count:1000000000000 }],
    },
    star62901: {
        distance:33.73, resources:['meteorite', 'hydrogen'], stats:{ 'power':2835, 'defense':3390, 'speed':8 },
        explore:[{ id:'antimatter', count:337300 }],
        statue:[{ id:'meteorite', count:1000000000000 }, { id:'hydrogen', count:1000000000000 }],
    },
    star21601: {
        distance:33.86, resources:['oil', 'hydrogen'], stats:{ 'power':2901, 'defense':2952, 'speed':14 },
        explore:[{ id:'antimatter', count:338600 }],
        statue:[{ id:'oil', count:1000000000000 }, { id:'hydrogen', count:1000000000000 }],
    },
    star63801: {
        distance:34.2, resources:['ice', 'oil'], stats:{ 'power':2548, 'defense':2405, 'speed':15 },
        explore:[{ id:'antimatter', count:342000 }],
        statue:[{ id:'ice', count:1000000000000 }, { id:'oil', count:1000000000000 }],
    },
    star187202: {
        distance:34.35, resources:['silicon', 'gem'], stats:{ 'power':4233, 'defense':2482, 'speed':15 },
        explore:[{ id:'antimatter', count:343500 }],
        statue:[{ id:'silicon', count:1000000000000 }, { id:'gem', count:1000000000000 }],
    },
    /*------------------------------------------------------------------------*/                                                                                        
    missionFirst: {
        max:1, maxBuildCount:1, collapses:['missionFirstCard'],
        build:{ counts:[1], costs:[{ id:'metal', count:10, coeff:1 }, { id:'wood', count:10, coeff:1 }, { id:'gem', count:10, coeff:1 }] },
        unlocks: [
            'science', 'achScience', 'scienceBoostScience',
            'plasmaT1', 'meteoriteT1', 'carbonT1', 'scienceT1', 'oilT1', 'fuelT1', 'metalT1', 'gemT1', 'woodT1', 'siliconT1', 'uraniumT1', 'lavaT1', 'lunariteT1', 'methaneT1', 'titaniumT1', 'goldT1', 'silverT1', 'hydrogenT1', 'heliumT1', 'iceT1', 'antimatterT1',
            'achPlasmaT1', 'achMeteoriteT1', 'achCarbonT1', 'achScienceT1', 'achOilT1', 'achFuelT1', 'achMetalT1', 'achGemT1', 'achWoodT1', 'achSiliconT1', 'achUraniumT1', 'achLavaT1', 'achLunariteT1', 'achMethaneT1', 'achTitaniumT1', 'achGoldT1', 'achSilverT1', 'achHydrogenT1', 'achHeliumT1', 'achIceT1', 'achAntimatterT1',
            'missionStorage',
        ],
        notifs: [
            'sciencePane',
        ],
    },
    missionStorage: {
        max:1, maxBuildCount:1, collapses:['missionStorageCard'],
        build:{ counts:[1], costs:[{ id:'science', count:5, coeff:1 }] },
        unlocks: [
            'missionSolarPanel', 'missionOil',
        ],
        notifs: [
            'sciencePane', 'metalPane', 'gemPane', 'woodPane',
        ],
    },
    missionSolarPanel: {
        max:1, maxBuildCount:1, collapses:['missionSolarPanelCard'],
        build:{ counts:[1], costs:[{ id:'science', count:20, coeff:1 }] },
        unlocks: [
            'energy', 'achEnergy', 'energyT1', 'achEnergyT1', 'scienceBoostEnergy',
            'missionEnergy',
        ],
        notifs: [
            'energyPane',
        ],
    },
    missionEnergy: {
        max:1, maxBuildCount:1, collapses:['missionEnergyCard'],
        build:{ counts:[1], costs:[{ id:'science', count:20, coeff:1 }] },
        unlocks: [
            'carbon', 'achCarbon', 'scienceBoostCarbon',
            'energyT2', 'achEnergyT2',
            'missionTier2',
        ],
        notifs: [
            'energyPane', 'carbonPane',
        ],
    },
    missionOil: {
        max:1, maxBuildCount:1, collapses:['missionOilCard'],
        build:{ counts:[1], costs:[{ id:'science', count:30, coeff:1 }] },
        unlocks: [
            'oil', 'achOil', 'scienceBoostOil',
        ],
        notifs: [
            'oilPane',
        ],
    },
    missionTier2: {
        max:1, maxBuildCount:1, collapses:['missionTier2Card'],
        build:{ counts:[1], costs:[{ id:'science', count:100, coeff:1 }] },
        unlocks: [
            'techPlasmaT2', 'techMeteoriteT2', 'techCarbonT2', 'techScienceT2', 'techOilT2', 'techFuelT2', 'techMetalT2', 'techGemT2', 'techWoodT2', 'techSiliconT2', 'techUraniumT2', 'techLavaT2', 'techLunariteT2', 'techMethaneT2', 'techTitaniumT2', 'techGoldT2', 'techSilverT2', 'techHydrogenT2', 'techHeliumT2', 'techIceT2',
            'missionDestruction', 'missionFuel',
        ],
        notifs: [
            'carbonPane', 'sciencePane', 'oilPane', 'metalPane', 'gemPane', 'woodPane',
        ],
    },
    missionDestruction: {
        max:1, maxBuildCount:1, collapses:['missionDestructionCard'],
        build:{ counts:[1], costs:[{ id:'science', count:500, coeff:1 }] },
        notifs: [
            'carbonPane', 'fuelPane', 'sciencePane', 'oilPane', 'metalPane', 'gemPane', 'woodPane',
        ],
    },
    missionFuel: {
        max:1, maxBuildCount:1, collapses:['missionFuelCard'],
        build:{ counts:[1], costs:[{ id:'science', count:500, coeff:1 }] },
        unlocks: [
            'fuel', 'achFuel', 'scienceBoostFuel',
            'missionRocket1',
        ],
        notifs: [
            'fuelPane',
            'rocketPane',
        ],
    },
    /*------------------------------------------------------------------------*/                                                                                        
    missionRocket1: {
        max:1, maxBuildCount:1, collapses:['missionRocket1Card'],
        build:{ counts:[1], costs:[{ id:'metal', count:1200, coeff:1 }, { id:'gem', count:900, coeff:1 }, { id:'oil', count:1000, coeff:1 }] },
        unlocks: [
            'missionRocket2',
        ],
    },
    missionRocket2: {
        max:1, maxBuildCount:1, collapses:['missionRocket2Card'],
        build:{ counts:[1], costs:[{ id:'fuel', count:20, coeff:1 }] },
        unlocks: [
            'missionMoon', 'missionMercury', 'missionVenus', 'missionMars', 'missionAsteroid',
        ],
        notifs: [
            'innerSolarSystemPane',
        ],
    },
    /*------------------------------------------------------------------------*/
    missionMoon: {
        max:1, maxBuildCount:1, collapses:['missionMoonCard'],
        build:{ counts:[1], costs:[{ id:'fuel', count:25, coeff:1 }] },
        unlocks: [
            'lunarite', 'achLunarite', 'scienceBoostLunarite',
        ],
        notifs: [
            'lunaritePane',
        ],
    },
    missionMercury: {
        max:1, maxBuildCount:1, collapses:['missionMercuryCard'],
        build:{ counts:[1] },
    },
    missionVenus: {
        max:1, maxBuildCount:1, collapses:['missionVenusCard'],
        build:{ counts:[1], costs:[{ id:'fuel', count:100, coeff:1 }] },
        unlocks: [
            'methane', 'achMethane', 'scienceBoostMethane',
            'titanium', 'achTitanium', 'scienceBoostTitanium',
            'energyT3', 'achEnergyT3'
        ],
        notifs: [
            'methanePane', 'titaniumPane',
        ],
    },
    missionMars: {
        max:1, maxBuildCount:1, collapses:['missionMarsCard'],
        build:{ counts:[1], costs:[{ id:'fuel', count:75, coeff:1 }] },
        unlocks: [
            'silicon', 'achSilicon', 'scienceBoostSilicon',
        ],
        notifs: [
            'siliconPane',
        ],
    },
    missionAsteroid: {
        max:1, maxBuildCount:1, collapses:['missionAsteroidCard'],
        build:{ counts:[1], costs:[{ id:'fuel', count:400, coeff:1 }] },
        unlocks: [
            'gold', 'achGold', 'scienceBoostGold',
            'silver', 'achSilver', 'scienceBoostSilver',
            'missionJupiter', 'missionSaturn', 'missionUranus', 'missionNeptune', 'missionPluto', 'missionWonderStation',
        ],
        notifs: [
            'goldPane', 'silverPane',
            'outerSolarSystemPane',
        ],
    },
    missionWonderStation: {
        max:1, maxBuildCount:1, collapses:['missionWonderStationCard'],
        build:{ counts:[1], costs:[{ id:'fuel', count:500, coeff:1 }] },
        unlocks: [
            'missionWonderStation2',
        ],
        notifs: [
            'wonderStation1Pane',
        ],
    },
    /*------------------------------------------------------------------------*/
    missionJupiter: {
        max:1, maxBuildCount:1, collapses:['missionJupiterCard'],
        build:{ counts:[1], costs:[{ id:'fuel', count:1000, coeff:1 }] },
        unlocks: [
            'hydrogen', 'achHydrogen', 'scienceBoostHydrogen',
        ],
        notifs: [
            'hydrogenPane',
        ],
    },
    missionSaturn: {
        max:1, maxBuildCount:1, collapses:['missionSaturnCard'],
        build:{ counts:[1], costs:[{ id:'fuel', count:2000, coeff:1 }] },
        unlocks: [
            'helium', 'achHelium', 'scienceBoostHelium',
            'energyT6', 'achEnergyT6'
        ],
        notifs: [
            'heliumPane', 'energyPane',
        ],
    },
    missionUranus: {
        max:1, maxBuildCount:1, collapses:['missionUranusCard'],
        build:{ counts:[1] },
    },
    missionNeptune: {
        max:1, maxBuildCount:1, collapses:['missionNeptuneCard'],
        build:{ counts:[1] },
    },
    missionPluto: {
        max:1, maxBuildCount:1, collapses:['missionPlutoCard'],
        build:{ counts:[1], costs:[{ id:'fuel', count:4000, coeff:1 }] },
        unlocks: [
            'ice', 'achIce', 'scienceBoostIce',
            'missionKuiper',
        ],
        notifs: [
            'icePane',
        ],
    },
    missionKuiper: {
        max:1, maxBuildCount:1, collapses:['missionKuiperCard'],
        build:{ counts:[1], costs:[{ id:'fuel', count:6000, coeff:1 }] },
        unlocks: [
            'missionSolCenter',
        ],
    },
    missionSolCenter: {
        max:1, maxBuildCount:1, collapses:['missionSolCenterCard'],
        build:{ counts:[1], costs:[{ id:'fuel', count:7000, coeff:1 }] },
        unlocks: [
            'missionPlasma',
        ],
        notifs: [
            'alienTechnologiesPane',
        ],
    },
    /*------------------------------------------------------------------------*/
    missionWonderStation2: {
        max:1, maxBuildCount:1, collapses:['missionWonderStation2Card'],
        build:{ counts:[1] },
        unlocks: [
            'missionWonderPrecious', 'missionWonderTechnological',
        ],
    },
    missionWonderPrecious: {
        max:1, maxBuildCount:1, collapses:['missionWonderPreciousCard'],
        build:{ counts:[1], costs:[{ id:'gem', count:40000, coeff:1 }, { id:'silver', count:27500, coeff:1 }, { id:'gold', count:15000, coeff:1 }] },
        unlocks: [
            'uranium', 'achUranium', 'scienceBoostUranium',
            'energyT4', 'achEnergyT4',
            'missionWonderEnergetic', 
        ],
        notifs: [
            'uraniumPane', 'energyPane',
            'wonderStation1Pane',
        ],
    },
    missionWonderTechnological: {
        max:1, maxBuildCount:1, collapses:['missionWonderTechnologicalCard'],
        build:{ counts:[1], costs:[{ id:'silicon', count:80000, coeff:1 }, { id:'gold', count:48000, coeff:1 }, { id:'gem', count:100000, coeff:1 }] },
        unlocks: [
            'techPlasmaT3', 'techMeteoriteT3', 'techCarbonT3', 'techScienceT3', 'techOilT3', 'techFuelT3', 'techMetalT3', 'techGemT3', 'techWoodT3', 'techSiliconT3', 'techUraniumT3', 'techLavaT3', 'techLunariteT3', 'techMethaneT3', 'techTitaniumT3', 'techGoldT3', 'techSilverT3', 'techHydrogenT3', 'techHeliumT3', 'techIceT3',
        ],
        notifs: [
            'plasmaPane', 'meteoritePane', 'carbonPane', 'sciencePane', 'oilPane', 'fuelPane', 'metalPane', 'gemPane', 'woodPane', 'siliconPane', 'uraniumPane', 'lavaPane', 'lunaritePane', 'methanePane', 'titaniumPane', 'goldPane', 'silverPane', 'hydrogenPane', 'heliumPane', 'icePane',
        ],
    },
    missionWonderEnergetic: {
        max:1, maxBuildCount:1, collapses:['missionWonderEnergeticCard'],
        build:{ counts:[1], costs:[{ id:'wood', count:40000, coeff:1 }, { id:'carbon', count:20000, coeff:1 }, { id:'uranium', count:700, coeff:1 }] },
        unlocks: [
            'lava', 'achLava', 'scienceBoostLava',
            'energyT5', 'achEnergyT5',
        ],
        notifs: [
            'lavaPane', 'energyPane',
        ],
    },
    missionWonderMeteorite: {
        max:1, maxBuildCount:1, collapses:['missionWonderMeteoriteCard'],
        build:{ counts:[1], costs:[{ id:'meteorite', count:10000, coeff:1 }, { id:'ice', count:2000000, coeff:1 }, { id:'silicon', count:4000000, coeff:1 }] },
        unlocks: [
            'techPlasmaT4', 'techMeteoriteT4', 'techCarbonT4', 'techScienceT4', 'techOilT4', 'techMetalT4', 'techGemT4', 'techWoodT4', 'techSiliconT4', 'techUraniumT4', 'techLavaT4', 'techLunariteT4', 'techMethaneT4', 'techTitaniumT4', 'techGoldT4', 'techSilverT4', 'techHydrogenT4', 'techHeliumT4', 'techIceT4',
        ],
        notifs: [
            'plasmaPane', 'meteoritePane', 'carbonPane', 'sciencePane', 'oilPane', 'fuelPane', 'metalPane', 'gemPane', 'woodPane', 'siliconPane', 'uraniumPane', 'lavaPane', 'lunaritePane', 'methanePane', 'titaniumPane', 'goldPane', 'silverPane', 'hydrogenPane', 'heliumPane', 'icePane',
        ],
    },
    /*------------------------------------------------------------------------*/
    missionPlasma: {
        max:1, maxBuildCount:1, collapses:['missionPlasmaCard'],
        build:{ counts:[1], costs:[{ id:'hydrogen', count:1500, coeff:1 }, { id:'oil', count:1500, coeff:1 }, { id:'wood', count:1500, coeff:1 }] },
        unlocks: [
            'plasma', 'achPlasma', 'scienceBoostPlasma',
            'missionEmc', 'missionMeteorite', 'missionDyson',
        ],
        notifs: [
            'plasmaPane',
        ],
    },
    missionEmc: {
        max:1, maxBuildCount:1, collapses:['missionEmcCard'],
        build:{ counts:[1], costs:[{ id:'energy', count:75000, coeff:1  }, { id:'plasma', count:100, coeff:1 }] },
        notifs: [
            'emcPane',
        ],
    },
    missionMeteorite: {
        max:1, maxBuildCount:1, collapses:['missionMeteoriteCard'],
        build:{ counts:[1], costs:[{ id:'energy', count:85000, coeff:1  }, { id:'plasma', count:1000, coeff:1 }] },
        unlocks: [
            'meteorite', 'achMeteorite', 'scienceBoostMeteorite',
            'missionWonderMeteorite',
        ],
        notifs: [
            'meteoritePane',
            'wonderStation1Pane',
        ],
    },
    missionDyson: {
        max:1, maxBuildCount:1, collapses:['missionDysonCard'],
        build:{ counts:[1], costs:[{ id:'energy', count:100000, coeff:1 }, { id:'plasma', count:10000, coeff:1 }] },
        unlocks: [
            'segment', 'dysonT1', 'dysonT2', 'dysonT3',
            'missionRebirth',
        ],
        notifs: [
            'dysonPane',
            'rebirthPane',
        ],
    },
    /*------------------------------------------------------------------------*/
    missionRebirth: {
        max:1, maxBuildCount:1, collapses:['missionRebirthCard'],
        build:{ counts:[1] },
        unlocks: [
            'darkmatter', 'rebirth',
            'dmUpgdMultiGain', 'dmUpgdStartingStorage', 'dmUpgdMultiBuild', 'dmUpgdStorage', 'dmUpgdAutoEmc', 'dmUpgdTier5', 'dmUpgdDimensionRift',
            'missionRebirth2',
        ],
        notifs: [
            'darkmatterPane', 'dmUpgradesPane', 'dmBoostsPane',
        ],
    },
    missionRebirth2: {
        max:1, maxBuildCount:1, collapses:['missionRebirth2Card'],
        build:{ counts:[1], costs:[{ id:'dysonT3', count:1, coeff:1 }, { id:'darkmatter', count:100, coeff:1 }] },
        unlocks: [
            'missionWonderComm', 'missionWonderAntimatter',
        ],
        notifs: [
            'wonderStation2Pane',
        ],
    },
    /*------------------------------------------------------------------------*/
    missionWonderComm: {
        max:1, maxBuildCount:1, collapses:['missionWonderCommCard'],
        build:{ counts:[1], costs:[{ id:'gold', count:6000000, coeff:1 }, { id:'silicon',  count:10000000, coeff:1 }, { id:'ice', count:6000000, coeff:1  }] },
        unlocks: [
            'radarT1', 'radarT2',
        ],
        notifs: [
            'radarPane',
        ],
    },
    missionWonderAntimatter: {
        max:1, maxBuildCount:1, collapses:['missionWonderAntimatterCard'],
        build:{ counts:[1], costs:[{ id:'uranium', count:6000000, coeff:1 }, { id:'lava', count:10000000, coeff:1 }, { id:'oil', count:8000000, coeff:1  }] },
        unlocks: [
            'antimatter', 'achAntimatter', 'scienceBoostAntimatter',
            'missionWonderPortal',
        ],
        notifs: [
            'antimatterPane',
        ],
    },
    missionWonderPortal: {
        max:1, maxBuildCount:1, collapses:['missionWonderPortalCard'],
        build:{ counts:[1], costs:[{ id:'meteorite', count:500000, coeff:1  }, { id:'helium', count:8000000, coeff:1  }, { id:'silicon', count:6000000, coeff:1  }] },
        unlocks: [
            'missionWonderStargate',
        ],
    },
    missionWonderStargate: {
        max:1, maxBuildCount:1, collapses:['missionWonderStargateCard'],
        build:{ counts:[1], costs:[{ id:'plasma', count:500000, coeff:1 }, { id:'silicon', count:920000000, coeff:1 }, { id:'meteorite', count:17000000, coeff:1 }] },
        unlocks: [
            'missionSpaceship', 'missionShield', 'missionEngine', 'missionAero',
        ],
        notifs: [
            'spaceshipPane',
        ],
    },
    /*------------------------------------------------------------------------*/
    shield: { }, engine: { }, aero: { },
    /*------------------------------------------------------------------------*/
    missionSpaceship: {
        max:1, maxBuildCount:1, collapses:['missionSpaceshipCard'],
        build:{ counts:[1], costs:[{ id:'shield', count:50, coeff:1.0 }, { id:'engine', count:25, coeff:1.0 }, { id:'aero', count:15, coeff:1.0 }] },
        unlocks: [
            'shipT1', 'shipT2', 'shipT3', 'shipT4', 'shipT5',
            'missionEnlighten',
        ],
        notifs: [
            'shipsPane', 'carnelianPane', 'prasnianPane', 'hyacinitePane', 'kitrinosPane', 'movitonPane',
        ],
    },
    missionShield: {
        max:50, collapses:['missionShieldCard'],
        build:{ counts:[1, 5, 10], costs:[{ id:'lunarite', count:10000000, coeff:1.1 }, { id:'titanium', count:10000000, coeff:1.1 }, { id:'metal', count:10000000, coeff:1.1 }] },
        onLoad: function(state) { state.items['shield'].count = this.count },
        onBuild: function(state) { state.items['shield'].count += 1 },
    },
    missionEngine: {
        max:25, collapses:['missionEngineCard'],
        build:{ counts:[1, 5, 10], costs:[{ id:'silicon', count:50000000, coeff:1.1 }, { id:'meteorite', count:1000000, coeff:1.1 }, { id:'hydrogen', count:25000000, coeff:1.1 }] },
        onLoad: function(state) { state.items['engine'].count = this.count },
        onBuild: function(state) { state.items['engine'].count += 1 },
    },
    missionAero: {
        max:15, collapses:['missionAeroCard'],
        build:{ counts:[1, 5, 10], costs:[{ id:'silver', count:20000000, coeff:1.1 }, { id:'ice', count:30000000, coeff:1.1 }, { id:'gem', count:25000000, coeff:1.1 }] },
        onLoad: function(state) { state.items['aero'].count = this.count },
        onBuild: function(state) { state.items['aero'].count += 1 },
    },
    /*------------------------------------------------------------------------*/
    missionEnlighten: {
        max:1, maxBuildCount:1, collapses:['missionEnlightenCard'],
        build:{ counts:[1], costs:[{ id:'conquest', count:10, coeff:1 }] },
        unlocks: [
            'ultrite', 'enlighten',
            'ulUpgdStorage', 'ulUpgdSpeed', 'ulUpgdDefense', 'ulUpgdPower', 'ulUpgdAutoStorage',
            'missionOverlord',
        ],
        notifs: [
            'ultritePane', 'ulUpgradesPane', 'titansPane',
        ],
    },
    /*------------------------------------------------------------------------*/
    missionOverlord: {
        max:1, maxBuildCount:1, collapses:['missionOverlordCard'],
        build:{ counts:[1], costs:[{ id:'statue', count:150, coeff:1 }] },
    },
    /*------------------------------------------------------------------------*/
    achEnergy:     { data:'energy',     brackets:[50, 50000, 50000000, 50000000000, 50000000000000], },
    achPlasma:     { data:'plasma',     brackets:[50, 50000, 50000000, 50000000000, 50000000000000], },
    achMeteorite:  { data:'meteorite',  brackets:[50, 50000, 50000000, 50000000000, 50000000000000], },
    achCarbon:     { data:'carbon',     brackets:[50, 50000, 50000000, 50000000000, 50000000000000], },
    achScience:    { data:'science',    brackets:[50, 50000, 50000000, 50000000000, 50000000000000], },
    achOil:        { data:'oil',        brackets:[50, 50000, 50000000, 50000000000, 50000000000000], },
    achFuel:       { data:'fuel',       brackets:[50, 50000, 50000000, 50000000000, 50000000000000], },
    achMetal:      { data:'metal',      brackets:[50, 50000, 50000000, 50000000000, 50000000000000], },
    achGem:        { data:'gem',        brackets:[50, 50000, 50000000, 50000000000, 50000000000000], },
    achWood:       { data:'wood',       brackets:[50, 50000, 50000000, 50000000000, 50000000000000], },
    achSilicon:    { data:'silicon',    brackets:[50, 50000, 50000000, 50000000000, 50000000000000], },
    achUranium:    { data:'uranium',    brackets:[50, 50000, 50000000, 50000000000, 50000000000000], },
    achLava:       { data:'lava',       brackets:[50, 50000, 50000000, 50000000000, 50000000000000], },
    achLunarite:   { data:'lunarite',   brackets:[50, 50000, 50000000, 50000000000, 50000000000000], },
    achMethane:    { data:'methane',    brackets:[50, 50000, 50000000, 50000000000, 50000000000000], },
    achTitanium:   { data:'titanium',   brackets:[50, 50000, 50000000, 50000000000, 50000000000000], },
    achGold:       { data:'gold',       brackets:[50, 50000, 50000000, 50000000000, 50000000000000], },
    achSilver:     { data:'silver',     brackets:[50, 50000, 50000000, 50000000000, 50000000000000], },
    achHydrogen:   { data:'hydrogen',   brackets:[50, 50000, 50000000, 50000000000, 50000000000000], },
    achHelium:     { data:'helium',     brackets:[50, 50000, 50000000, 50000000000, 50000000000000], },
    achIce:        { data:'ice',        brackets:[50, 50000, 50000000, 50000000000, 50000000000000], },
    achAntimatter: { data:'antimatter', brackets:[50, 50000, 50000000, 50000000000, 50000000000000], },
    /*------------------------------------------------------------------------*/
    achEnergyT1:     { data:'energyT1',     brackets:[5, 25, 75, 150, 250], },
    achEnergyT2:     { data:'energyT2',     brackets:[5, 25, 75, 150, 250], },
    achEnergyT3:     { data:'energyT3',     brackets:[5, 25, 75, 150, 250], },
    achEnergyT4:     { data:'energyT4',     brackets:[5, 25, 75, 150, 250], },
    achEnergyT5:     { data:'energyT5',     brackets:[5, 25, 75, 150, 250], },
    achEnergyT6:     { data:'energyT6',     brackets:[5, 25, 75, 150, 250], },
    achPlasmaT1:     { data:'plasmaT1',     brackets:[5, 25, 75, 150, 250], },
    achPlasmaT2:     { data:'plasmaT2',     brackets:[5, 25, 75, 150, 250], },
    achPlasmaT3:     { data:'plasmaT3',     brackets:[5, 25, 75, 150, 250], },
    achPlasmaT4:     { data:'plasmaT4',     brackets:[5, 25, 75, 150, 250], },
    achMeteoriteT1:  { data:'meteoriteT1',  brackets:[5, 25, 75, 150, 250], },
    achMeteoriteT2:  { data:'meteoriteT2',  brackets:[5, 25, 75, 150, 250], },
    achMeteoriteT3:  { data:'meteoriteT3',  brackets:[5, 25, 75, 150, 250], },
    achMeteoriteT4:  { data:'meteoriteT4',  brackets:[5, 25, 75, 150, 250], },
    achCarbonT1:     { data:'carbonT1',     brackets:[5, 25, 75, 150, 250], },
    achCarbonT2:     { data:'carbonT2',     brackets:[5, 25, 75, 150, 250], },
    achCarbonT3:     { data:'carbonT3',     brackets:[5, 25, 75, 150, 250], },
    achCarbonT4:     { data:'carbonT4',     brackets:[5, 25, 75, 150, 250], },
    achCarbonT5:     { data:'carbonT5',     brackets:[5, 25, 75, 150, 250], },
    achScienceT1:    { data:'scienceT1',    brackets:[5, 25, 75, 150, 250], },
    achScienceT2:    { data:'scienceT2',    brackets:[5, 25, 75, 150, 250], },
    achScienceT3:    { data:'scienceT3',    brackets:[5, 25, 75, 150, 250], },
    achScienceT4:    { data:'scienceT4',    brackets:[5, 25, 75, 150, 250], },
    achScienceT5:    { data:'scienceT5',    brackets:[5, 25, 75, 150, 250], },
    achOilT1:        { data:'oilT1',        brackets:[5, 25, 75, 150, 250], },
    achOilT2:        { data:'oilT2',        brackets:[5, 25, 75, 150, 250], },
    achOilT3:        { data:'oilT3',        brackets:[5, 25, 75, 150, 250], },
    achOilT4:        { data:'oilT4',        brackets:[5, 25, 75, 150, 250], },
    achOilT5:        { data:'oilT5',        brackets:[5, 25, 75, 150, 250], },
    achFuelT1:       { data:'fuelT1',       brackets:[5, 25, 75, 150, 250], },
    achFuelT2:       { data:'fuelT2',       brackets:[5, 25, 75, 150, 250], },
    achFuelT3:       { data:'fuelT3',       brackets:[5, 25, 75, 150, 250], },
    achMetalT1:      { data:'metalT1',      brackets:[5, 25, 75, 150, 250], },
    achMetalT2:      { data:'metalT2',      brackets:[5, 25, 75, 150, 250], },
    achMetalT3:      { data:'metalT3',      brackets:[5, 25, 75, 150, 250], },
    achMetalT4:      { data:'metalT4',      brackets:[5, 25, 75, 150, 250], },
    achMetalT5:      { data:'metalT5',      brackets:[5, 25, 75, 150, 250], },
    achGemT1:        { data:'gemT1',        brackets:[5, 25, 75, 150, 250], },
    achGemT2:        { data:'gemT2',        brackets:[5, 25, 75, 150, 250], },
    achGemT3:        { data:'gemT3',        brackets:[5, 25, 75, 150, 250], },
    achGemT4:        { data:'gemT4',        brackets:[5, 25, 75, 150, 250], },
    achGemT5:        { data:'gemT5',        brackets:[5, 25, 75, 150, 250], },
    achWoodT1:       { data:'woodT1',       brackets:[5, 25, 75, 150, 250], },
    achWoodT2:       { data:'woodT2',       brackets:[5, 25, 75, 150, 250], },
    achWoodT3:       { data:'woodT3',       brackets:[5, 25, 75, 150, 250], },
    achWoodT4:       { data:'woodT4',       brackets:[5, 25, 75, 150, 250], },
    achWoodT5:       { data:'woodT5',       brackets:[5, 25, 75, 150, 250], },
    achSiliconT1:    { data:'siliconT1',    brackets:[5, 25, 75, 150, 250], },
    achSiliconT2:    { data:'siliconT2',    brackets:[5, 25, 75, 150, 250], },
    achSiliconT3:    { data:'siliconT3',    brackets:[5, 25, 75, 150, 250], },
    achSiliconT4:    { data:'siliconT4',    brackets:[5, 25, 75, 150, 250], },
    achSiliconT5:    { data:'siliconT5',    brackets:[5, 25, 75, 150, 250], },
    achUraniumT1:    { data:'uraniumT1',    brackets:[5, 25, 75, 150, 250], },
    achUraniumT2:    { data:'uraniumT2',    brackets:[5, 25, 75, 150, 250], },
    achUraniumT3:    { data:'uraniumT3',    brackets:[5, 25, 75, 150, 250], },
    achUraniumT4:    { data:'uraniumT4',    brackets:[5, 25, 75, 150, 250], },
    achUraniumT5:    { data:'uraniumT5',    brackets:[5, 25, 75, 150, 250], },
    achLavaT1:       { data:'lavaT1',       brackets:[5, 25, 75, 150, 250], },
    achLavaT2:       { data:'lavaT2',       brackets:[5, 25, 75, 150, 250], },
    achLavaT3:       { data:'lavaT3',       brackets:[5, 25, 75, 150, 250], },
    achLavaT4:       { data:'lavaT4',       brackets:[5, 25, 75, 150, 250], },
    achLavaT5:       { data:'lavaT5',       brackets:[5, 25, 75, 150, 250], },
    achLunariteT1:   { data:'lunariteT1',   brackets:[5, 25, 75, 150, 250], },
    achLunariteT2:   { data:'lunariteT2',   brackets:[5, 25, 75, 150, 250], },
    achLunariteT3:   { data:'lunariteT3',   brackets:[5, 25, 75, 150, 250], },
    achLunariteT4:   { data:'lunariteT4',   brackets:[5, 25, 75, 150, 250], },
    achLunariteT5:   { data:'lunariteT5',   brackets:[5, 25, 75, 150, 250], },
    achMethaneT1:    { data:'methaneT1',    brackets:[5, 25, 75, 150, 250], },
    achMethaneT2:    { data:'methaneT2',    brackets:[5, 25, 75, 150, 250], },
    achMethaneT3:    { data:'methaneT3',    brackets:[5, 25, 75, 150, 250], },
    achMethaneT4:    { data:'methaneT4',    brackets:[5, 25, 75, 150, 250], },
    achMethaneT5:    { data:'methaneT5',    brackets:[5, 25, 75, 150, 250], },
    achTitaniumT1:   { data:'titaniumT1',   brackets:[5, 25, 75, 150, 250], },
    achTitaniumT2:   { data:'titaniumT2',   brackets:[5, 25, 75, 150, 250], },
    achTitaniumT3:   { data:'titaniumT3',   brackets:[5, 25, 75, 150, 250], },
    achTitaniumT4:   { data:'titaniumT4',   brackets:[5, 25, 75, 150, 250], },
    achTitaniumT5:   { data:'titaniumT5',   brackets:[5, 25, 75, 150, 250], },
    achGoldT1:       { data:'goldT1',       brackets:[5, 25, 75, 150, 250], },
    achGoldT2:       { data:'goldT2',       brackets:[5, 25, 75, 150, 250], },
    achGoldT3:       { data:'goldT3',       brackets:[5, 25, 75, 150, 250], },
    achGoldT4:       { data:'goldT4',       brackets:[5, 25, 75, 150, 250], },
    achGoldT5:       { data:'goldT5',       brackets:[5, 25, 75, 150, 250], },
    achSilverT1:     { data:'silverT1',     brackets:[5, 25, 75, 150, 250], },
    achSilverT2:     { data:'silverT2',     brackets:[5, 25, 75, 150, 250], },
    achSilverT3:     { data:'silverT3',     brackets:[5, 25, 75, 150, 250], },
    achSilverT4:     { data:'silverT4',     brackets:[5, 25, 75, 150, 250], },
    achSilverT5:     { data:'silverT5',     brackets:[5, 25, 75, 150, 250], },
    achHydrogenT1:   { data:'hydrogenT1',   brackets:[5, 25, 75, 150, 250], },
    achHydrogenT2:   { data:'hydrogenT2',   brackets:[5, 25, 75, 150, 250], },
    achHydrogenT3:   { data:'hydrogenT3',   brackets:[5, 25, 75, 150, 250], },
    achHydrogenT4:   { data:'hydrogenT4',   brackets:[5, 25, 75, 150, 250], },
    achHydrogenT5:   { data:'hydrogenT5',   brackets:[5, 25, 75, 150, 250], },
    achHeliumT1:     { data:'heliumT1',     brackets:[5, 25, 75, 150, 250], },
    achHeliumT2:     { data:'heliumT2',     brackets:[5, 25, 75, 150, 250], },
    achHeliumT3:     { data:'heliumT3',     brackets:[5, 25, 75, 150, 250], },
    achHeliumT4:     { data:'heliumT4',     brackets:[5, 25, 75, 150, 250], },
    achHeliumT5:     { data:'heliumT5',     brackets:[5, 25, 75, 150, 250], },
    achIceT1:        { data:'iceT1',        brackets:[5, 25, 75, 150, 250], },
    achIceT2:        { data:'iceT2',        brackets:[5, 25, 75, 150, 250], },
    achIceT3:        { data:'iceT3',        brackets:[5, 25, 75, 150, 250], },
    achIceT4:        { data:'iceT4',        brackets:[5, 25, 75, 150, 250], },
    achIceT5:        { data:'iceT5',        brackets:[5, 25, 75, 150, 250], },
    achAntimatterT1: { data:'antimatterT1', brackets:[5, 25, 75, 150, 250], },
    /*------------------------------------------------------------------------*/
    radarT1: {
        max:250, range:1, build:{ counts:[1], multi:true, costs:[{ id:'metal', count:38600000000, coeff:1.1 }, { id:'ice', count:4320000000, coeff:1.1 }, { id:'meteorite', count:15800000, coeff:1.1 }] },
        onLoad: function(state) {
            if (this.count >= 1) {
                let range = (state.items['radarT1'].count * state.items['radarT1'].range) + (state.items['radarT2'].count * state.items['radarT2'].range)
                for (let i in state.items) {
                    let item = state.items[i]
                    if ('distance' in item && item.distance <= range) item.unlocked = true
                    else if ('distance' in item) item.unlocked = false
                }
            }
        },
        onBuild: function(state) { this.onLoad(state) },
    },
    radarT2: {
        max:250, range:5, build:{ counts:[1], multi:true, costs:[{ id:'metal', count:60000000000, coeff:1.1 }, { id:'ice', count:6000000000, coeff:1.1 }, { id:'meteorite', count:60000000, coeff:1.1 }] },
        onLoad: function(state) {
            if (this.count >= 1) {
                let range = (state.items['radarT1'].count * state.items['radarT1'].range) + (state.items['radarT2'].count * state.items['radarT2'].range)
                for (let i in state.items) {
                    let item = state.items[i]
                    if ('distance' in item && item.distance <= range) item.unlocked = true
                    else if ('distance' in item) item.unlocked = false
                }
            }
        },
        onBuild: function(state) { this.onLoad(state) },
    },
    /*------------------------------------------------------------------------*/
    shipT1: { build:{ counts:[1], multi:true, costs:[{ id:'metal', count:870000000, coeff:1.1 }, { id:'gem', count:420000000, coeff:1.1 }, { id:'silver', count:390000000, coeff:1.1 }] }, stats:{ power:3, defense:2, speed:15 }, },
    shipT2: { build:{ counts:[1], multi:true, costs:[{ id:'gold', count:930000000, coeff:1.1 }, { id:'lunarite', count:6100000000, coeff:1.1 }, { id:'meteorite', count:13000000, coeff:1.1 }] }, stats:{ power:5, defense:6, speed:12 }, },
    shipT3: { build:{ counts:[1], multi:true, costs:[{ id:'titanium', count:1620000000, coeff:1.1 }, { id:'ice', count:1020000000, coeff:1.1 }, { id:'silicon', count:1140000000, coeff:1.1 }] }, stats:{ power:8, defense:4, speed:10 }, },
    shipT4: { build:{ counts:[1], multi:true, costs:[{ id:'metal', count:4900000000, coeff:1.1 }, { id:'uranium', count:2300000000, coeff:1.1 }, { id:'hydrogen', count:3100000000, coeff:1.1 }] }, stats:{ power:15, defense:13, speed:9 }, },
    shipT5: { build:{ counts:[1], multi:true, costs:[{ id:'lunarite', count:5300000000, coeff:1.1 }, { id:'helium', count:4600000000, coeff:1.1 }, { id:'meteorite', count:1700000000, coeff:1.1 }] }, stats:{ power:57, defense:62, speed:5 }, },
    /*------------------------------------------------------------------------*/
    rebirth: {
        build:{ counts:[1], costs:[{ id:'dysonT3', count:1, coeff:1.0 }] },
    },
    enlighten: {
        build:{ counts:[1], costs:[{ id:'conquest', count:10, coeff:1.0 }] },
    },
    /*------------------------------------------------------------------------*/
    dmUpgdMultiGain: { max:1, collapses:['dmUpgdMultiGain'], build:{ counts:[1], costs:[{ id:'darkmatter', count:5, coeff:1.0 }] },
        onLoad: function(state) {
            if (this.count >= 1) {
                for (let i in state.items) {
                    let item = state.items[i]
                    if ('gain' in item) item.gain.counts = [1, 5, 10, 20]
                }
            }
        },
        onBuild: function(state) { if (this.count == 1) { this.onLoad(state) } },
    },
    dmUpgdStartingStorage: { max:1, collapses:['dmUpgdStartingStorage'], build:{ counts:[1], costs:[{ id:'darkmatter', count:8, coeff:1.0 }] },
        onLoad: function(state) {
            if (this.count >= 1) {
                for (let i in state.items) {
                    let item = state.items[i]
                    if ('upgrade' in item && item.upgrade < 7) item.upgrade = 7
                }
            }
        },
        onBuild: function(state) { if (this.count == 1) { this.onLoad(state) } },
    },
    dmUpgdMultiBuild: { max:1, collapses:['dmUpgdMultiBuild'], build:{ counts:[1], costs:[{ id:'darkmatter', count:17, coeff:1.0 }] },
        onLoad: function(state) {
            if (this.count >= 1) {
                for (let i in state.items) {
                    let item = state.items[i]
                    if ('build' in item && item.build.multi) item.build.counts = [1, 5, 25, 100]
                }
            }
        },
        onBuild: function(state) { if (this.count == 1) { this.onLoad(state) } },
    },
    dmUpgdStorage: { max:1, collapses:['dmUpgdStorage'], build:{ counts:[1], costs:[{ id:'darkmatter', count:21, coeff:1.0 }] },
        onLoad: function(state) {
            if (this.count >= 1) {
                for (let i in state.items) {
                    let item = state.items[i]
                    if ('storage' in item && 'costs' in item.storage)
                        item.storage.costs.forEach(cost => { cost.count *= 0.75 })
                }
            }
        },
        onBuild: function(state) { if (this.count == 1) { this.onLoad(state) } },
    },
    dmUpgdAutoEmc: { max:1, collapses:['dmUpgdAutoEmc'], build:{ counts:[1], costs:[{ id:'darkmatter', count:24, coeff:1.0 }] } },
    dmUpgdTier5: { max:1, collapses:['dmUpgdTier5'], build:{ counts:[1], costs:[{ id:'darkmatter', count:35, coeff:1.0 }] },
        unlocks: [
            'techCarbonT5', 'techScienceT5', 'techOilT5', 'techMetalT5', 'techGemT5', 'techWoodT5', 'techSiliconT5', 'techUraniumT5', 'techLavaT5', 'techLunariteT5', 'techMethaneT5', 'techTitaniumT5', 'techGoldT5', 'techSilverT5', 'techHydrogenT5', 'techHeliumT5', 'techIceT5',
        ],
    },
    dmUpgdDimensionRift: { max:1, collapses:['dmUpgdDimensionRift'], build:{ counts:[1], costs:[{ id:'darkmatter', count:37, coeff:1.0 }] },
        onLoad: function(state) {
            if (this.count >= 1) {
                for (let i in state.items) {
                    let item = state.items[i]
                    if ('storage' in item) item.storage.count *= 10
                }
            }
        },
        onBuild: function(state) { if (this.count == 1) { this.onLoad(state) } },
    },
    /*------------------------------------------------------------------------*/
    boostEnergy: { unlocked:true, build:{ counts:[1], costs:[{ id:'darkmatter', count:1, coeff:1.0 }] }, modOutput:{ id:'energy', mod:0.01 }, },
    boostPlasma: { unlocked:true, build:{ counts:[1], costs:[{ id:'darkmatter', count:1, coeff:1.0 }] }, modOutput:{ id:'plasma', mod:0.01 }, },
    boostMeteorite: { unlocked:true, build:{ counts:[1], costs:[{ id:'darkmatter', count:1, coeff:1.0 }] }, modOutput:{ id:'meteorite', mod:0.01 }, },
    boostCarbon: { unlocked:true, build:{ counts:[1], costs:[{ id:'darkmatter', count:1, coeff:1.0 }] }, modOutput:{ id:'carbon', mod:0.01 }, },
    boostScience: { unlocked:true, build:{ counts:[1], costs:[{ id:'darkmatter', count:1, coeff:1.0 }] }, modOutput:{ id:'science', mod:0.01 }, },
    boostOil: { unlocked:true, build:{ counts:[1], costs:[{ id:'darkmatter', count:1, coeff:1.0 }] }, modOutput:{ id:'oil', mod:0.01 }, },
    boostFuel: { unlocked:true, build:{ counts:[1], costs:[{ id:'darkmatter', count:1, coeff:1.0 }] }, modOutput:{ id:'fuel', mod:0.01 }, },
    boostMetal: { unlocked:true, build:{ counts:[1], costs:[{ id:'darkmatter', count:1, coeff:1.0 }] }, modOutput:{ id:'metal', mod:0.01 }, },
    boostGem: { unlocked:true, build:{ counts:[1], costs:[{ id:'darkmatter', count:1, coeff:1.0 }] }, modOutput:{ id:'gem', mod:0.01 }, },
    boostWood: { unlocked:true, build:{ counts:[1], costs:[{ id:'darkmatter', count:1, coeff:1.0 }] }, modOutput:{ id:'wood', mod:0.01 }, },
    boostSilicon: { unlocked:true, build:{ counts:[1], costs:[{ id:'darkmatter', count:1, coeff:1.0 }] }, modOutput:{ id:'silicon', mod:0.01 }, },
    boostUranium: { unlocked:true, build:{ counts:[1], costs:[{ id:'darkmatter', count:1, coeff:1.0 }] }, modOutput:{ id:'uranium', mod:0.01 }, },
    boostLava: { unlocked:true, build:{ counts:[1], costs:[{ id:'darkmatter', count:1, coeff:1.0 }] }, modOutput:{ id:'lava', mod:0.01 }, },
    boostLunarite: { unlocked:true, build:{ counts:[1], costs:[{ id:'darkmatter', count:1, coeff:1.0 }] }, modOutput:{ id:'lunarite', mod:0.01 }, },
    boostMethane: { unlocked:true, build:{ counts:[1], costs:[{ id:'darkmatter', count:1, coeff:1.0 }] }, modOutput:{ id:'methane', mod:0.01 }, },
    boostTitanium: { unlocked:true, build:{ counts:[1], costs:[{ id:'darkmatter', count:1, coeff:1.0 }] }, modOutput:{ id:'titanium', mod:0.01 }, },
    boostGold: { unlocked:true, build:{ counts:[1], costs:[{ id:'darkmatter', count:1, coeff:1.0 }] }, modOutput:{ id:'gold', mod:0.01 }, },
    boostSilver: { unlocked:true, build:{ counts:[1], costs:[{ id:'darkmatter', count:1, coeff:1.0 }] }, modOutput:{ id:'silver', mod:0.01 }, },
    boostHydrogen: { unlocked:true, build:{ counts:[1], costs:[{ id:'darkmatter', count:1, coeff:1.0 }] }, modOutput:{ id:'hydrogen', mod:0.01 }, },
    boostHelium: { unlocked:true, build:{ counts:[1], costs:[{ id:'darkmatter', count:1, coeff:1.0 }] }, modOutput:{ id:'helium', mod:0.01 }, },
    boostIce: { unlocked:true, build:{ counts:[1], costs:[{ id:'darkmatter', count:1, coeff:1.0 }] }, modOutput:{ id:'ice', mod:0.01 }, },
    boostAntimatter: { unlocked:true, build:{ counts:[1], costs:[{ id:'darkmatter', count:1, coeff:1.0 }] }, modOutput:{ id:'antimatter', mod:0.01 }, },
    /*------------------------------------------------------------------------*/
    scienceBoostEnergy:     { unlocked:false, build:{ counts:[1], costs:[{ id:'science', count:10000000, coeff:1.1 }] }, modOutput:{ id:'energy',     mod:0.01 }, },
    scienceBoostPlasma:     { unlocked:false, build:{ counts:[1], costs:[{ id:'science', count:5000,     coeff:1.1 }] }, modOutput:{ id:'plasma',     mod:0.01 }, },
    scienceBoostMeteorite:  { unlocked:false, build:{ counts:[1], costs:[{ id:'science', count:5000,     coeff:1.1 }] }, modOutput:{ id:'meteorite',  mod:0.01 }, },
    scienceBoostCarbon:     { unlocked:false, build:{ counts:[1], costs:[{ id:'science', count:5000,     coeff:1.1 }] }, modOutput:{ id:'carbon',     mod:0.01 }, },
    scienceBoostScience:    { unlocked:false, build:{ counts:[1], costs:[{ id:'science', count:10000000, coeff:1.1 }] }, modOutput:{ id:'science',    mod:0.01 }, },
    scienceBoostOil:        { unlocked:false, build:{ counts:[1], costs:[{ id:'science', count:5000,     coeff:1.1 }] }, modOutput:{ id:'oil',        mod:0.01 }, },
    scienceBoostFuel:       { unlocked:false, build:{ counts:[1], costs:[{ id:'science', count:5000,     coeff:1.1 }] }, modOutput:{ id:'fuel',       mod:0.01 }, },
    scienceBoostMetal:      { unlocked:true,  build:{ counts:[1], costs:[{ id:'science', count:5000,     coeff:1.1 }] }, modOutput:{ id:'metal',      mod:0.01 }, },
    scienceBoostGem:        { unlocked:true,  build:{ counts:[1], costs:[{ id:'science', count:5000,     coeff:1.1 }] }, modOutput:{ id:'gem',        mod:0.01 }, },
    scienceBoostWood:       { unlocked:true,  build:{ counts:[1], costs:[{ id:'science', count:5000,     coeff:1.1 }] }, modOutput:{ id:'wood',       mod:0.01 }, },
    scienceBoostSilicon:    { unlocked:false, build:{ counts:[1], costs:[{ id:'science', count:5000,     coeff:1.1 }] }, modOutput:{ id:'silicon',    mod:0.01 }, },
    scienceBoostUranium:    { unlocked:false, build:{ counts:[1], costs:[{ id:'science', count:5000,     coeff:1.1 }] }, modOutput:{ id:'uranium',    mod:0.01 }, },
    scienceBoostLava:       { unlocked:false, build:{ counts:[1], costs:[{ id:'science', count:5000,     coeff:1.1 }] }, modOutput:{ id:'lava',       mod:0.01 }, },
    scienceBoostLunarite:   { unlocked:false, build:{ counts:[1], costs:[{ id:'science', count:5000,     coeff:1.1 }] }, modOutput:{ id:'lunarite',   mod:0.01 }, },
    scienceBoostMethane:    { unlocked:false, build:{ counts:[1], costs:[{ id:'science', count:5000,     coeff:1.1 }] }, modOutput:{ id:'methane',    mod:0.01 }, },
    scienceBoostTitanium:   { unlocked:false, build:{ counts:[1], costs:[{ id:'science', count:5000,     coeff:1.1 }] }, modOutput:{ id:'titanium',   mod:0.01 }, },
    scienceBoostGold:       { unlocked:false, build:{ counts:[1], costs:[{ id:'science', count:5000,     coeff:1.1 }] }, modOutput:{ id:'gold',       mod:0.01 }, },
    scienceBoostSilver:     { unlocked:false, build:{ counts:[1], costs:[{ id:'science', count:5000,     coeff:1.1 }] }, modOutput:{ id:'silver',     mod:0.01 }, },
    scienceBoostHydrogen:   { unlocked:false, build:{ counts:[1], costs:[{ id:'science', count:5000,     coeff:1.1 }] }, modOutput:{ id:'hydrogen',   mod:0.01 }, },
    scienceBoostHelium:     { unlocked:false, build:{ counts:[1], costs:[{ id:'science', count:5000,     coeff:1.1 }] }, modOutput:{ id:'helium',     mod:0.01 }, },
    scienceBoostIce:        { unlocked:false, build:{ counts:[1], costs:[{ id:'science', count:5000,     coeff:1.1 }] }, modOutput:{ id:'ice',        mod:0.01 }, },
    scienceBoostAntimatter: { unlocked:false, build:{ counts:[1], costs:[{ id:'science', count:10000000, coeff:1.1 }] }, modOutput:{ id:'antimatter', mod:0.01 }, },
    /*------------------------------------------------------------------------*/
    ulUpgdStorage: { max:1, collapses:['ulUpgdStorage'], build:{ counts:[1], costs:[{ id:'ultrite', count:21, coeff:1.0 }] },
        onLoad: function(state) {
            if (this.count >= 1) {
                for (let i in state.items) {
                    let item = state.items[i]
                    if ('storage' in item && 'costs' in item.storage)
                        item.storage.costs.forEach(cost => { cost.count *= 0.75 })
                }
            }
        },
        onBuild: function(state) { if (this.count == 1) { this.onLoad(state) } },
    },
    ulUpgdSpeed: { max:1, collapses:['ulUpgdSpeed'], build:{ counts:[1], costs:[{ id:'ultrite', count:179, coeff:1.0 }] },
        onLoad: function(state) {
            if (this.count >= 1) {
                state.ships.forEach(ship => { ship.stats.speed *= 2 })
            }
        },
        onBuild: function(state) { if (this.count == 1) { this.onLoad(state) } },
    },
    ulUpgdDefense: { max:1, collapses:['ulUpgdDefense'], build:{ counts:[1], costs:[{ id:'ultrite', count:199, coeff:1.0 }] },
        onLoad: function(state) {
            if (this.count >= 1) {
                state.ships.forEach(ship => { ship.stats.defense *= 2 })
            }
        },
        onBuild: function(state) { if (this.count == 1) { this.onLoad(state) } },
    },
    ulUpgdPower: { max:1, collapses:['ulUpgdPower'], build:{ counts:[1], costs:[{ id:'ultrite', count:206, coeff:1.0 }] },
        onLoad: function(state) {
            if (this.count >= 1) {
                state.ships.forEach(ship => { ship.stats.power *= 2 })
            }
        },
        onBuild: function(state) { if (this.count == 1) { this.onLoad(state) } },
    },
    ulUpgdAutoStorage: { max:1, collapses:['ulUpgdAutoStorage'], build:{ counts:[1], costs:[{ id:'ultrite', count:220, coeff:1.0 }] } },
    /*------------------------------------------------------------------------*/
    titanMeteorite: { unlocked:true, max:1, build:{ counts:[1], costs:[{ id:'ultrite', count:10, coeff:1.0 }] }, modCost:{ id:'meteorite', mod:-0.9 }, },
    titanCarbon: { unlocked:true, max:1, build:{ counts:[1], costs:[{ id:'ultrite', count:10, coeff:1.0 }] }, modCost:{ id:'carbon', mod:-0.9 }, },
    titanScience: { unlocked:true, max:1, build:{ counts:[1], costs:[{ id:'ultrite', count:10, coeff:1.0 }] }, modCost:{ id:'science', mod:-0.9 }, },
    titanOil: { unlocked:true, max:1, build:{ counts:[1], costs:[{ id:'ultrite', count:10, coeff:1.0 }] }, modCost:{ id:'oil', mod:-0.9 }, },
    titanFuel: { unlocked:true, max:1, build:{ counts:[1], costs:[{ id:'ultrite', count:10, coeff:1.0 }] }, modCost:{ id:'fuel', mod:-0.9 }, },
    titanMetal: { unlocked:true, max:1, build:{ counts:[1], costs:[{ id:'ultrite', count:10, coeff:1.0 }] }, modCost:{ id:'metal', mod:-0.9 }, },
    titanGem: { unlocked:true, max:1, build:{ counts:[1], costs:[{ id:'ultrite', count:10, coeff:1.0 }] }, modCost:{ id:'gem', mod:-0.9 }, },
    titanWood: { unlocked:true, max:1, build:{ counts:[1], costs:[{ id:'ultrite', count:10, coeff:1.0 }] }, modCost:{ id:'wood', mod:-0.9 }, },
    titanSilicon: { unlocked:true, max:1, build:{ counts:[1], costs:[{ id:'ultrite', count:10, coeff:1.0 }] }, modCost:{ id:'silicon', mod:-0.9 }, },
    titanUranium: { unlocked:true, max:1, build:{ counts:[1], costs:[{ id:'ultrite', count:10, coeff:1.0 }] }, modCost:{ id:'uranium', mod:-0.9 }, },
    titanLava: { unlocked:true, max:1, build:{ counts:[1], costs:[{ id:'ultrite', count:10, coeff:1.0 }] }, modCost:{ id:'lava', mod:-0.9 }, },
    titanLunarite: { unlocked:true, max:1, build:{ counts:[1], costs:[{ id:'ultrite', count:10, coeff:1.0 }] }, modCost:{ id:'lunarite', mod:-0.9 }, },
    titanMethane: { unlocked:true, max:1, build:{ counts:[1], costs:[{ id:'ultrite', count:10, coeff:1.0 }] }, modCost:{ id:'methane', mod:-0.9 }, },
    titanTitanium: { unlocked:true, max:1, build:{ counts:[1], costs:[{ id:'ultrite', count:10, coeff:1.0 }] }, modCost:{ id:'titanium', mod:-0.9 }, },
    titanGold: { unlocked:true, max:1, build:{ counts:[1], costs:[{ id:'ultrite', count:10, coeff:1.0 }] }, modCost:{ id:'gold', mod:-0.9 }, },
    titanSilver: { unlocked:true, max:1, build:{ counts:[1], costs:[{ id:'ultrite', count:10, coeff:1.0 }] }, modCost:{ id:'silver', mod:-0.9 }, },
    titanHydrogen: { unlocked:true, max:1, build:{ counts:[1], costs:[{ id:'ultrite', count:10, coeff:1.0 }] }, modCost:{ id:'hydrogen', mod:-0.9 }, },
    titanHelium: { unlocked:true, max:1, build:{ counts:[1], costs:[{ id:'ultrite', count:10, coeff:1.0 }] }, modCost:{ id:'helium', mod:-0.9 }, },
    titanIce: { unlocked:true, max:1, build:{ counts:[1], costs:[{ id:'ultrite', count:10, coeff:1.0 }] }, modCost:{ id:'ice', mod:-0.9 }, },
    titanAntimatter: { unlocked:true, max:1, build:{ counts:[1], costs:[{ id:'ultrite', count:10, coeff:1.0 }] }, modCost:{ id:'antimatter', mod:-0.9 }, },
}

const moduleConversion = {
    namespaced: true,
    state() {
        return {
            
            ids: [
                'meteorite', 'carbon', 'oil', 'metal', 'gem', 'wood', 'silicon',
                'uranium', 'lava', 'lunarite', 'methane', 'titanium', 'gold', 'silver',
                'hydrogen', 'helium', 'ice'
            ],
            
            costs: {
                meteorite: { id:'plasma', count:3  },
                carbon:    { id:'energy', count:2  },
                oil:       { id:'energy', count:3  },
                metal:     { id:'energy', count:1  },
                gem:       { id:'energy', count:3  },
                wood:      { id:'energy', count:1  },
                silicon:   { id:'energy', count:23 },
                uranium:   { id:'energy', count:37 },
                lava:      { id:'energy', count:42 },
                lunarite:  { id:'energy', count:15 },
                methane:   { id:'energy', count:12 },
                titanium:  { id:'energy', count:17 },
                gold:      { id:'energy', count:14 },
                silver:    { id:'energy', count:16 },
                hydrogen:  { id:'energy', count:33 },
                helium:    { id:'energy', count:39 },
                ice:       { id:'energy', count:44 },
            },
            
            cans: {},
            maxCounts: {},
        }
    },
    getters: {
        
        cost: (state) => (id, count) => {
            
            let ret = JSON.parse(JSON.stringify(state.costs[id]))
            ret.count = Math.floor(ret.count * count)
            
            return ret
        },
        
        can: (state) => (id) => { return state.cans[id] },
        maxCount: (state) => (id) => { return state.maxCounts[id] },
    },
    actions: {
        
        refresh({ state, rootState, rootGetters }) {
            
            state.ids.forEach(id => {
                
                let item = rootState.items[id]
                let storage = rootGetters.getItemStorage(id)
                
                let maxCount = rootState.items[item.conversion.costs[0].id].count / item.conversion.costs[0].count
                maxCount = Math.floor(Math.min(maxCount, storage - item.count))
                
                if (maxCount != state.maxCounts[id]) state.maxCounts[id] = maxCount
                
                let can = 0
                if (item.count >= storage) can = -5
                else if (maxCount <= 0) can = -1
                
                if (can != state.cans[id]) state.cans[id] = can
            })
        },
    },
}

const moduleStatue = {
    namespaced: true,
    state() {
        return {
            
            ids: [
                'star301',    'star163901', 'star181901', 'star151801', 'star25401',  'star146301',
                'star122601', 'star79501',  'star1501',   'star79901',  'star37601',  'star123401',
                'star164301', 'star219102', 'star204702', 'star116901', 'star74001',  'star205102',
                'star144001', 'star222301', 'star3901',   'star168301', 'star120901', 'star125301',
                'star113101', 'star89101',  'star93901',  'star79201',  'star80501',  'star77301',
                'star191701', 'star199702', 'star21001',  'star178302', 'star32201',  'star74801',

                'star401',    'star25101',  'star207601', 'star223901', 'star121101', 'star136701',
                'star166402', 'star95001',  'star175902', 'star56501',  'star167801', 'star103201',
                'star113301', 'star199602', 'star157201', 'star222201', 'star6301',   'star214301',
                'star40801',  'star207301', 'star169601', 'star157101', 'star178501', 'star208601',
                'star78101',  'star123501', 'star85901',  'star18501',  'star199801', 'star141901',
                'star5201',   'star223701', 'star166903', 'star32101',  'star77801',  'star205201',

                'star201',    'star217101', 'star166701', 'star179501', 'star6501',   'star222401',
                'star200001', 'star24201',  'star224202', 'star92801',  'star172701', 'star86401',
                'star202902', 'star177001', 'star68301',  'star205001', 'star13401',  'star34201',
                'star182101', 'star178401', 'star107601', 'star192101', 'star24001',  'star16601',
                'star27501',  'star121601', 'star212102', 'star117501',

                'star501',    'star130601', 'star158101', 'star224601', 'star58601',  'star10101',
                'star194201', 'star1101',   'star72501',  'star210501', 'star189701', 'star175601',
                'star206902', 'star133601', 'star135801', 'star39101',  'star107001', 'star105801',
                'star224201', 'star205101', 'star162501', 'star4001',   'star141101', 'star180502',
                'star208702', 'star85501',  'star217202', 'star180101', 'star13801',  'star37101',
                'star42501',  'star80901',  'star215902', 'star190502', 'star99701',  'star176802',

                'star701',    'star601',    'star80101',  'star213301', 'star13601',  'star51801',
                'star35801',  'star216801', 'star224101', 'star114001', 'star15301',  'star69601',
                'star148501', 'star155801', 'star185101', 'star175901', 'star203902', 'star204801',
                'star211202', 'star100801', 'star124101', 'star139701', 'star50401',  'star159101',
                'star148101', 'star157301', 'star72601',  'star224801', 'star71001',  'star207501',
                'star168302', 'star128901', 'star68401',  'star30701',  'star193402', 'star84201',
                'star76401',  'star32301',  'star191401', 'star118301', 'star166901', 'star62901',
                'star21601',  'star63801',  'star187202',
            ],
            
            cans: {},
            costs: {},
        }
    },
    getters: {
        
        can: (state) => (id) => { return state.cans[id] },
        costs: (state) => (id) => { return state.costs[id] },
    },
    actions: {
        
        refresh({ state, rootState, rootGetters }) {
            
            state.ids.forEach(id => {
                
                let item = rootState.items[id]
                if (item.status == 'conquered') {
                
                    let costs = JSON.parse(JSON.stringify(item.statue))                
                    costs.forEach(cost => {
                        cost.progress = Math.min(100, ((rootState.items[cost.id].count / cost.count) * 100).toFixed())
                        cost.timer = rootGetters.getTimer(cost.id, cost.count)
                    })
                    
                    let compare = costCompare(costs, state.costs[id])
                    if (compare == false) { state.costs[id] = JSON.parse(JSON.stringify(costs)) }
                    
                    let can = 0
                    costs.forEach(cost => {
                        if (rootState.items[cost.id].count - cost.count < 0) {
                            can = -1
                        }
                    })
                    
                    if (can != state.cans[id]) state.cans[id] = can
                }
            })
        },
    },
}

const moduleAchievement = {
    namespaced: true,
    state() {
        return {
            
            ids: [
                'achEnergy', 'achPlasma', 'achMeteorite', 'achCarbon', 'achScience',
                'achOil', 'achFuel', 'achMetal', 'achGem', 'achWood', 'achSilicon',
                'achUranium', 'achLava', 'achLunarite', 'achMethane', 'achTitanium',
                'achGold', 'achSilver', 'achHydrogen', 'achHelium', 'achIce', 'achAntimatter',

                'achEnergyT1', 'achEnergyT2', 'achEnergyT3', 'achEnergyT4', 'achEnergyT5', 'achEnergyT6',
                'achPlasmaT1', 'achPlasmaT2', 'achPlasmaT3', 'achPlasmaT4',
                'achMeteoriteT1', 'achMeteoriteT2', 'achMeteoriteT3', 'achMeteoriteT4',
                'achCarbonT1', 'achCarbonT2', 'achCarbonT3', 'achCarbonT4', 'achCarbonT5',
                'achScienceT1', 'achScienceT2', 'achScienceT3', 'achScienceT4', 'achScienceT5',
                'achOilT1', 'achOilT2', 'achOilT3', 'achOilT4', 'achOilT5',
                'achFuelT1', 'achFuelT2', 'achFuelT3',
                'achMetalT1', 'achMetalT2', 'achMetalT3', 'achMetalT4', 'achMetalT5',
                'achGemT1', 'achGemT2', 'achGemT3', 'achGemT4', 'achGemT5',
                'achWoodT1', 'achWoodT2', 'achWoodT3', 'achWoodT4', 'achWoodT5',
                'achSiliconT1', 'achSiliconT2', 'achSiliconT3', 'achSiliconT4', 'achSiliconT5',
                'achUraniumT1', 'achUraniumT2', 'achUraniumT3', 'achUraniumT4', 'achUraniumT5',
                'achLavaT1', 'achLavaT2', 'achLavaT3', 'achLavaT4', 'achLavaT5',
                'achLunariteT1', 'achLunariteT2', 'achLunariteT3', 'achLunariteT4', 'achLunariteT5',
                'achMethaneT1', 'achMethaneT2', 'achMethaneT3', 'achMethaneT4', 'achMethaneT5',
                'achTitaniumT1', 'achTitaniumT2', 'achTitaniumT3', 'achTitaniumT4', 'achTitaniumT5',
                'achGoldT1', 'achGoldT2', 'achGoldT3', 'achGoldT4', 'achGoldT5',
                'achSilverT1', 'achSilverT2', 'achSilverT3', 'achSilverT4', 'achSilverT5',
                'achHydrogenT1', 'achHydrogenT2', 'achHydrogenT3', 'achHydrogenT4', 'achHydrogenT5',
                'achHeliumT1', 'achHeliumT2', 'achHeliumT3', 'achHeliumT4', 'achHeliumT5',
                'achIceT1', 'achIceT2', 'achIceT3', 'achIceT4', 'achIceT5',
                'achAntimatterT1',
            ],
        }
    },
    actions: {
        
        refresh({ state, rootState }) {
            
            state.ids.forEach(id => {
                
                let item = rootState.items[id]
                if (item.unlocked && item.count < item.brackets.length) {
                
                    let limit = item.brackets[item.count]
                    let progress = 100 * rootState.items[item.data].count / limit
                    
                    if (progress >= 100) {
                        item.count += 1
                        progress -= 100
                    }
                    
                    if (progress != item.progress) item.progress = progress
                }
            })
        },
    },
}

export const store = createStore({
    modules: {
        
        conversion: moduleConversion,
        statue: moduleStatue,
        achievement: moduleAchievement,
    },
    state() {
        return {
            
            maxFps: 30,
            
            lastFrameTimeMs: null,
            lastConversionTimeMs: null,
            lastUpgradeTimeMs: null,
            
            locale: 'en',
            companyName: 'NG Space Company',
            currentVersion: '2.0.0',
            
            activeTab: null,
            activePane: null,
            sidebarOpen: true,
            
            autoSaveDelay: 30000,
            
            items: {},
            stars: {},
            
            resources: [],
            producers: [],
            achievements: [],
            ships: [],
            dmUpgrades: [],
            ulUpgrades: [],
            titans: [],
            
            resetIds: [],
            
            autoConversionId: null,
            autoStorageId: null,
            
            hidden: [],
            collapsed: [],
            notified: [],
            
            statsStartDate: null,
            statsLastRebirth: null,
            statsLastEnlighten: null,
            statsTotalRebirths: 0,
            statsTotalEnlightens: 0,
            statsTotalConquests: 0,
            statsTotalStatues: 0,
            
            dmBoostCount: 1,
        }
    },
    getters: {
        
        isDonor: (state) => (id) => { return state.items[id].donor },
        isHidden: (state) => (id) => { return state.hidden.includes(id) },
        isUnlocked: (state) => (id) => { return state.items[id].unlocked },
        isCollapsed: (state) => (id) => { return state.collapsed.includes(id) },
        isNotified: (state) => (id) => { return state.notified.includes(id) },
        
        isUpgradable: (state) => (id) => {
            if (id == 'antimatter') return false
            return 'storage' in state.items[id]
        },
        
        isStoregable: (state) => (id) => {
            return 'storage' in state.items[id]
        },
        
        getTimeSinceStartDate: (state) => { return (new Date().getTime() - state.statsStartDate) / 1000 },
        getTimeSinceLastRebirth: (state) => { return (new Date().getTime() - state.statsLastRebirth) / 1000 },
        getTimeSinceLastEnlighten: (state) => { return (new Date().getTime() - state.statsLastEnlighten) / 1000 },
        
        getAchievementMax: (state) => {            
            let count = 0
            state.achievements.forEach(item => { if (item.unlocked == true) count += item.brackets.length })
            return count
        },
		
        getAchievementCount: (state) => {
            let count = 0
            state.achievements.forEach(item => { count += item.count })
            return count
        },
        
        getItem: (state) => (id) => { return state.items[id] },
        getItemMax: (state) => (id) => { return state.items[id].max },
        getItemCount: (state) => (id) => { return state.items[id].count },
        getItemUpgrade: (state) => (id) => { return state.items[id].upgrade },
        getItemStatus: (state) => (id) => { return state.items[id].status },
        getItemDistance: (state) => (id) => { return state.items[id].distance },
        getItemEffectiveness: (state) => (id) => { return state.items[id].effectiveness },
        
        getItemRange: (state) => (id) => {
            if (!('range' in state.items[id])) return null
            return state.items[id].range
        },
        
        getItemStats: (state) => (id, count) => {
            if (!('stats' in state.items[id])) return null
            
            let stats = JSON.parse(JSON.stringify(state.items[id].stats))
            stats.power = stats.power * count
            stats.defense = stats.defense * count
            stats.speed = stats.speed * count
            
            return stats
        },
        
        getItemInputs: (state) => (id, count) => {
            if (!('inputs' in state.items[id])) return null
            
            let inputs = JSON.parse(JSON.stringify(state.items[id].inputs))
            inputs.forEach(input => { input.count *= input.mod * count })
            
            return inputs
        },
        
        getItemOutputs: (state) => (id, count) => {
            if (!('outputs' in state.items[id])) return null
            
            let outputs = JSON.parse(JSON.stringify(state.items[id].outputs))
            outputs.forEach(output => { output.count *= output.mod * count })
            
            return outputs
        },

        getItemStorage: (state) => (id) => {
            let item = state.items[id]
            if (!('storage' in item)) return 0
            
            let storage = item.storage.count * Math.pow(item.storage.coeff, item.upgrade)
            return storage
        },
        
        getItemProd: (state) => (id) => {
            let item = state.items[id]
            if (!('prod' in item)) { return 0 }
            
            return item.prod
        },
        
        getRawProduction: (state) => (id) => {
            let rawProduction = 0
            state.producers.forEach(item => {
                item.outputs.forEach(output => {
                    if (output.id == id) rawProduction += output.count * output.mod * item.count
                })
            })
            return rawProduction
        },
        
        getItemProduction: (state) => (id, outputId) => {
            let production = 0
            let item = state.items[id]
            item.outputs.forEach(output => {
                if (output.id == outputId) production += output.count * output.mod * item.count
            })
            return production
        },
        
        getRawConsumption: (state) => (id) => {
            let rawConsumption = 0
            state.producers.forEach(item => {
                if ('inputs' in item) {
                    item.inputs.forEach(input => {
                        if (input.id == id) rawConsumption += input.count * input.mod * item.count
                    })
                }
            })
            return rawConsumption
        },
        
        getItemConsumption: (state) => (id, inputId) => {
            let consumption = 0
            let item = state.items[id]
            if ('inputs' in item) {
                item.inputs.forEach(input => {
                    if (input.id == inputId) consumption += input.count * input.mod * item.count
                })
            }
            return consumption
        },
        
        hasConsumptionIssue: (state, getters) => {
            let result = false
            state.resources.forEach(item => {
                let consumption = getters.getRawConsumption(item.id)
                let production =getters.getRawProduction(item.id)
                if (consumption > production) {
                    result = true
                    return
                }
            })
            return result
        },
        
        getGainCounts: (state) => (id) => { return state.items[id].gain.counts },
        
        getGainCosts: (state) => (id, count) => {
            var ret = null
            
            if (state.items[id].gainCosts == undefined) return null
            
            if (count == 1) ret = state.items[id].gainCosts[0]
            else if (count == 5) ret = state.items[id].gainCosts[1]
            else if (count == 10) ret = state.items[id].gainCosts[2]
            else if (count == 20) ret = state.items[id].gainCosts[3]
            
            if (ret != undefined) return ret
            else return null
        },
        
        canGain: (state) => (id, count) => {
            var ret = null
            
            if (state.items[id].canGain == undefined) return null
            
            if (count == 1) ret = state.items[id].canGain[0]
            else if (count == 5) ret = state.items[id].canGain[1]
            else if (count == 10) ret = state.items[id].canGain[2]
            else if (count == 20) ret = state.items[id].canGain[3]
            
            if (ret != undefined) return ret
            else return null
        },
        
        getUpgradeCoeff: (state) => (id) => { return state.items[id].storage.coeff },
        
        getUpgradeCosts: (state) => (id) => {
            var ret = null
            
            if (state.items[id].upgradeCosts == undefined) return null
            
            ret = state.items[id].upgradeCosts
            
            if (ret != undefined) return ret
            else return null
        },
        
        canUpgrade: (state) => (id) => {
            var ret = null
            
            if (state.items[id].canUpgrade == undefined) return null
            
            ret = state.items[id].canUpgrade
            
            if (ret != undefined) return ret
            else return null
        },
        
        getBuildCounts: (state) => (id) => { return state.items[id].build.counts },
        getBuildMaxCount: (state) => (id) => { return state.items[id].maxBuildCount },
        
        getBuildNextCount: (state) => (id) => {
            
            let item = state.items[id]
            if (!('costs' in item.build)) return -1
            if (!('next' in item.build)) return -1
            
            let count = item.count
            if (count < 5) return (5 - count)
            else if (count >= 5 && count < 25) return (25 - count)
            else if (count >= 25 && count < 75) return (75 - count)
            else if (count >= 75 && count < 150) return (150 - count)
            else if (count >= 150 && count < 250) return (250 - count)
            
            return -1
        },
        
        getBuildCosts: (state, getters) => (id, count) => {
            
            var ret = null
            
            if (state.items[id].costs == undefined) return null
            
            if (count == 1) ret = state.items[id].costs[0]
            else if (count == 5) ret = state.items[id].costs[1]
            else if (count == 25) ret = state.items[id].costs[2]
            else if (count == 100) ret = state.items[id].costs[3]
            else if (count == getters.getBuildMaxCount(id)) ret = state.items[id].costs[4]
            else if (count == getters.getBuildNextCount(id)) ret = state.items[id].costs[5]
            else {
                
                ret = JSON.parse(JSON.stringify(state.items[id].build.costs))
                ret.forEach(cost => {
                    cost.base = cost.count
                    cost.count = Math.floor(cost.base * cost.mod * Math.pow(cost.coeff, state.items[id].count))
                })
                
                for (let n = 1; n < count; n++)
                    ret.forEach(cost => { cost.count += Math.floor(cost.base * cost.mod * Math.pow(cost.coeff, state.items[id].count + n)) })
                
                ret.forEach(cost => {
                    cost.progress = Math.min(100, ((state.items[cost.id].count / cost.count) * 100).toFixed())
                    cost.timer = getters.getTimer(cost.id, cost.count)
                })
            }
            
            if (ret != undefined) return ret
            else return null
        },
        
        canBuild: (state, getters) => (id, count) => {			
            
            var ret = null
            
            if (state.items[id].canBuild == undefined) return null
            
            if (count == 1) ret = state.items[id].canBuild[0]
            else if (count == 5) ret = state.items[id].canBuild[1]
            else if (count == 25) ret = state.items[id].canBuild[2]
            else if (count == 100) ret = state.items[id].canBuild[3]
            else if (count == getters.getBuildMaxCount(id)) ret = state.items[id].canBuild[4]
            else if (count == getters.getBuildNextCount(id)) ret = state.items[id].canBuild[5]
            else if (count <= getters.getBuildMaxCount(id)) ret = 0
            
            if (ret != undefined) return ret
            else return null
        },
        
        isDestroyable: (state) => (id) => {
            
            let item = state.items[id]
            if (!('destroyable' in item)) return false
            if (state.items['missionDestruction'].count < 1) return false
            
            return true
        },
        
        canDestroy: (state) => (id, count) => {
            
            let item = state.items[id]
            if (item.unlocked == false) return false
            if (!('destroyable' in item)) return false
            if (item.count <= 0) return false
            if ((item.count - count) < 0) return false
            
            let can = true
            return can
        },
        
        getTimer: (state, getters) => (id, count) => {
            
            let item = state.items[id]
            
            if (count <= item.count) return 0
            else if ('storage' in item && count > getters.getItemStorage(id)) return -2
            
            let prod = getters.getItemProd(id)
            if (prod <= 0) return -1
            
            let result = (count - item.count) / prod
            return result
        },
        
        getRadarRange: (state) => { return (state.items['radarT1'].count * state.items['radarT1'].range) + (state.items['radarT2'].count * state.items['radarT2'].range) },
        
        getFleetStats: (state) => {
            
            let stats = { power:0, defense:0, speed:0 }
            
            state.ships.forEach(item => {
                stats.power += item.stats.power * item.count
                stats.defense += item.stats.defense * item.count
                stats.speed += item.stats.speed * item.count
            })
            
            return stats
        },
        
        getStarCount: (state) => (faction) => { return state.stars[faction].length },
        
        getUnlockedStarCount: (state) => (faction) => {
            let count = 0
            state.stars[faction].forEach(star => { if (star.unlocked == true) count += 1 })
            return count
        },
        
        getConqueredStarCount: (state) => (faction) => {
            let count = 0
            state.stars[faction].forEach(star => { if (star.status == 'conquered' || star.status == 'statued') count += 1 })
            return count
        },
        
        getStatueStarCount: (state) => (faction) => {
            let count = 0
            state.stars[faction].forEach(star => { if (star.status == 'statued') count += 1 })
            return count
        },
        
        getExploreCosts: (state, getters) => (id) => {
            let item = state.items[id]
            if (!('explore' in item)) return null

            item.explore.forEach(cost => {
                cost.progress = Math.min(100, ((state.items[cost.id].count / cost.count) * 100).toFixed())
                cost.timer = getters.getTimer(cost.id, cost.count)
            })
            
            return item.explore
        },
        
        canExplore: (state, getters) => (id) => {
            let item = state.items[id]
            if (item.unlocked == false) return -2
            if (!('explore' in item)) return -3
            if (item.status != 'new') return -4
            
            let can = 0

            let costs = getters.getExploreCosts(id)
            costs.forEach(cost => {
                if (state.items[cost.id].count - cost.count < 0) {
                    can = -1
                    return
                }
            })
            
            return can
        },
        
        canConquer: (state, getters) => (id) => {
            let item = state.items[id]
            if (item.unlocked == false) return -2
            if (!('explore' in item)) return -3
            if (item.status != 'explored') return -4
            
            let fleet = getters.getFleetStats
            if (fleet.power < item.stats.power) return -1
            if (fleet.defense < item.stats.defense) return -1
            if (fleet.speed < item.stats.speed) return -1
            
            return 0
        },
        
        getStarResources: (state) => (id) => { return state.items[id].resources },
        
        getDMAchievement: (state, getters) => { return getters.getAchievementCount * 1},
        getDMRing: (state) => { return state.items['dysonT1'].count * 1.5 },
        getDMSwarm: (state) => { return state.items['dysonT2'].count * 5 },
        getDMSphere: (state) => { return state.items['dysonT3'].count * 100 },
        
        getDMPotential: (state, getters) => { return getters.getDMAchievement + getters.getDMRing + getters.getDMSwarm + getters.getDMSphere },
        
        getDMUpgradesMax: (state) => { return state.dmUpgrades.length },
        getDMUpgradesCount: (state) => {
            
            let count = 0
            state.dmUpgrades.forEach(item => { count += item.count })
            return count
        },
        
        getULSphere: (state) => { return state.items['dysonT3'].count * 10 },
        getULConquest: (state) => { return state.items['conquest'].count * 1 },
        getULStatue: (state) => { return state.items['statue'].count * 5 },
        
        getULPotential: (state, getters) => { return getters.getULSphere + getters.getULConquest + getters.getULStatue },
        
        getULUpgradesMax: (state) => { return state.ulUpgrades.length },
        getULUpgradesCount: (state) => {
            let count = 0
            state.ulUpgrades.forEach(item => { count += item.count })
            return count
        },
        
        getTitanMax: (state) => { return state.titans.length },
        getTitanCount: (state) => {
            let count = 0
            state.titans.forEach(titan => { count += titan.count })
            return count
        },
    },
    actions: {
        
        /*--------------------------------------------------------------------*/
        setLocale({ state }, payload) { state.locale = payload },
        setCompanyName({ state }, payload) { state.companyName = payload },
        setAutoSaveDelay({ state }, payload) { state.autoSaveDelay = payload },
        
        setActiveTab({ state }, payload) {  state.activeTab = payload },
        setActivePane({ state }, payload) { state.activePane = payload },
        setSidebarOpen({ state }, payload) { state.sidebarOpen = payload },
        
        setAutoConversionId({ state }, payload) { state.autoConversionId = payload },
        setAutoStorageId({ state }, payload) { state.autoStorageId = payload },
        
        setDmBoostCount({ state }, payload) { state.dmBoostCount = payload },
        
        /*--------------------------------------------------------------------*/
        toggleCollapsed({ state }, payload) {
            if (state.collapsed.includes(payload)) state.collapsed.splice(state.collapsed.indexOf(payload), 1)
            else state.collapsed.push(payload)
        },
        
        /*--------------------------------------------------------------------*/
        unNotified({ state }, payload) {
            if (state.notified.includes(payload)) state.notified.splice(state.notified.indexOf(payload), 1)
        },
        
        /*--------------------------------------------------------------------*/
        init({ state }) {
            
            state.activeTab = 'missionsPane'
            state.activePane = 'earthPane'
            state.sidebarOpen = false
            
            state.autoConversionId = null
            state.autoStorageId = null
            
            state.hidden = []
            state.collapsed = []
            state.notified = []
            
            let currentTime = new Date().getTime()
            
            state.statsStartDate = currentTime
            state.statsLastRebirth = currentTime
            state.statsLastEnlighten = currentTime

            state.items = base
            for (let i in state.items) {
                let item = state.items[i]
                
                item.id = i
                if (!('unlocked' in item)) item.unlocked = false
                
                if ('distance' in item) item.status = 'new'
                else {
                    
                    item.count = 0
                    
                    if ('storage' in item || item.id == 'science') {
                        
                        item.upgradeCosts = []
                        item.canUpgrade = []
                        
                        item.upgrade = 0
                        
                        state.resources.push(item)
                    }
                    
                    if ('outputs' in item) {
                        if (item.id != 'dysonT1' && item.id != 'dysonT2' && item.id != 'dysonT3') item.max = 250
                        item.outputs.forEach(output => { output.mod = 1.0 })
                        item.effectiveness = 1.0
                        state.producers.push(item)
                    }
                    
                    if ('inputs' in item) item.inputs.forEach(input => { input.mod = 1.0 })
                    
                    if ('build' in item) {
                        
                        item.costs = [[], [], [], [], []]
                        item.canBuild = []
                        
                        if ('costs' in item.build)
                            item.build.costs.forEach(cost => { cost.mod = 1.0 })
                    }
                    
                    if ('gain' in item) {
                        
                        item.gainCosts = [[], [], [], [], []]
                        item.canGain = []
                        
                        if ('costs' in item.gain)
                            item.gain.costs.forEach(cost => { cost.mod = 1.0 })
                    }
                    
                    if ('brackets' in item) {
                        item.progress = 0
                        state.achievements.push(item)
                    }
                    
                    if ('stats' in item) {
                        item.max = 250
                        state.ships.push(item)
                    }
                }
            }
            
            state.stars = {
                
                carnelian: [
                    state.items['star301'],    state.items['star163901'], state.items['star181901'], state.items['star151801'], state.items['star25401'],  state.items['star146301'],
                    state.items['star122601'], state.items['star79501'],  state.items['star1501'],   state.items['star79901'],  state.items['star37601'],  state.items['star123401'],
                    state.items['star164301'], state.items['star219102'], state.items['star204702'], state.items['star116901'], state.items['star74001'],  state.items['star205102'],
                    state.items['star144001'], state.items['star222301'], state.items['star3901'],   state.items['star168301'], state.items['star120901'], state.items['star125301'],
                    state.items['star113101'], state.items['star89101'],  state.items['star93901'],  state.items['star79201'],  state.items['star80501'],  state.items['star77301'],
                    state.items['star191701'], state.items['star199702'], state.items['star21001'],  state.items['star178302'], state.items['star32201'],  state.items['star74801'],
                ],
                
                prasnian: [
                    state.items['star401'],    state.items['star25101'],  state.items['star207601'], state.items['star223901'], state.items['star121101'], state.items['star136701'],
                    state.items['star166402'], state.items['star95001'],  state.items['star175902'], state.items['star56501'],  state.items['star167801'], state.items['star103201'],
                    state.items['star113301'], state.items['star199602'], state.items['star157201'], state.items['star222201'], state.items['star6301'],   state.items['star214301'],
                    state.items['star40801'],  state.items['star207301'], state.items['star169601'], state.items['star157101'], state.items['star178501'], state.items['star208601'],
                    state.items['star78101'],  state.items['star123501'], state.items['star85901'],  state.items['star18501'],  state.items['star199801'], state.items['star141901'],
                    state.items['star5201'],   state.items['star223701'], state.items['star166903'], state.items['star32101'],  state.items['star77801'],  state.items['star205201'],
                ],
                
                hyacinite: [
                    state.items['star201'],    state.items['star217101'], state.items['star166701'], state.items['star179501'], state.items['star6501'],   state.items['star222401'],
                    state.items['star200001'], state.items['star24201'],  state.items['star224202'], state.items['star92801'],  state.items['star172701'], state.items['star86401'],
                    state.items['star202902'], state.items['star177001'], state.items['star68301'],  state.items['star205001'], state.items['star13401'],  state.items['star34201'],
                    state.items['star182101'], state.items['star178401'], state.items['star107601'], state.items['star192101'], state.items['star24001'],  state.items['star16601'],
                    state.items['star27501'],  state.items['star121601'], state.items['star212102'], state.items['star117501'],
                ],
                
                kitrinos: [
                    state.items['star501'],    state.items['star130601'], state.items['star158101'], state.items['star224601'], state.items['star58601'],  state.items['star10101'],
                    state.items['star194201'], state.items['star1101'],   state.items['star72501'],  state.items['star210501'], state.items['star189701'], state.items['star175601'],
                    state.items['star206902'], state.items['star133601'], state.items['star135801'], state.items['star39101'],  state.items['star107001'], state.items['star105801'],
                    state.items['star224201'], state.items['star205101'], state.items['star162501'], state.items['star4001'],   state.items['star141101'], state.items['star180502'],
                    state.items['star208702'], state.items['star85501'],  state.items['star217202'], state.items['star180101'], state.items['star13801'],  state.items['star37101'],
                    state.items['star42501'],  state.items['star80901'],  state.items['star215902'], state.items['star190502'], state.items['star99701'],  state.items['star176802'],
                ],
                
                moviton: [
                    state.items['star701'],    state.items['star601'],    state.items['star80101'],  state.items['star213301'], state.items['star13601'],  state.items['star51801'],
                    state.items['star35801'],  state.items['star216801'], state.items['star224101'], state.items['star114001'], state.items['star15301'],  state.items['star69601'],
                    state.items['star148501'], state.items['star155801'], state.items['star185101'], state.items['star175901'], state.items['star203902'], state.items['star204801'],
                    state.items['star211202'], state.items['star100801'], state.items['star124101'], state.items['star139701'], state.items['star50401'],  state.items['star159101'],
                    state.items['star148101'], state.items['star157301'], state.items['star72601'],  state.items['star224801'], state.items['star71001'],  state.items['star207501'],
                    state.items['star168302'], state.items['star128901'], state.items['star68401'],  state.items['star30701'],  state.items['star193402'], state.items['star84201'],
                    state.items['star76401'],  state.items['star32301'],  state.items['star191401'], state.items['star118301'], state.items['star166901'], state.items['star62901'],
                    state.items['star21601'],  state.items['star63801'],  state.items['star187202'],
                ],
            }
            
            state.resetIds = [
                
                'energy', 'energyT1', 'energyT2', 'energyT3', 'energyT4', 'energyT5', 'energyT6', 'scienceBoostEnergy',
                'plasma', 'plasmaT1', 'plasmaT2', 'plasmaT3', 'plasmaT4', 'scienceBoostPlasma',
                'meteorite', 'meteoriteT1', 'meteoriteT2', 'meteoriteT3', 'meteoriteT4', 'scienceBoostMeteorite',
                'carbon', 'carbonT1', 'carbonT2', 'carbonT3', 'carbonT4', 'carbonT5', 'scienceBoostCarbon',
                'oil', 'oilT1', 'oilT2', 'oilT3', 'oilT4', 'oilT5', 'scienceBoostOil',
                'metal', 'metalT1', 'metalT2', 'metalT3', 'metalT4', 'metalT5', 'scienceBoostMetal',
                'gem', 'gemT1', 'gemT2', 'gemT3', 'gemT4', 'gemT5', 'scienceBoostGem',
                'wood', 'woodT1', 'woodT2', 'woodT3', 'woodT4', 'woodT5', 'scienceBoostWood',
                'silicon', 'siliconT1', 'siliconT2', 'siliconT3', 'siliconT4', 'siliconT5', 'scienceBoostSilicon',
                'uranium', 'uraniumT1', 'uraniumT2', 'uraniumT3', 'uraniumT4', 'uraniumT5', 'scienceBoostUranium',
                'lava', 'lavaT1', 'lavaT2', 'lavaT3', 'lavaT4', 'lavaT5', 'scienceBoostLava',
                'lunarite', 'lunariteT1', 'lunariteT2', 'lunariteT3', 'lunariteT4', 'lunariteT5', 'scienceBoostLunarite',
                'methane', 'methaneT1', 'methaneT2', 'methaneT3', 'methaneT4', 'methaneT5', 'scienceBoostMethane',
                'titanium', 'titaniumT1', 'titaniumT2', 'titaniumT3', 'titaniumT4', 'titaniumT5', 'scienceBoostTitanium',
                'gold', 'goldT1', 'goldT2', 'goldT3', 'goldT4', 'goldT5', 'scienceBoostGold',
                'silver', 'silverT1', 'silverT2', 'silverT3', 'silverT4', 'silverT5', 'scienceBoostSilver',
                'hydrogen', 'hydrogenT1', 'hydrogenT2', 'hydrogenT3', 'hydrogenT4', 'hydrogenT5', 'scienceBoostHydrogen',
                'helium', 'heliumT1', 'heliumT2', 'heliumT3', 'heliumT4', 'heliumT5', 'scienceBoostHelium',
                'ice', 'iceT1', 'iceT2', 'iceT3', 'iceT4', 'iceT5', 'scienceBoostIce',
                'science', 'scienceT1', 'scienceT2', 'scienceT3', 'scienceT4', 'scienceT5', 'scienceBoostScience',
                'fuel', 'fuelT1', 'fuelT2', 'fuelT3', 'scienceBoostFuel',
                'antimatter', 'antimatterT1', 'scienceBoostAntimatter',
                
                'achEnergy', 'achPlasma', 'achMeteorite', 'achCarbon', 'achScience', 'achOil',
                'achFuel', 'achMetal', 'achGem', 'achWood', 'achSilicon', 'achUranium', 'achLava',
                'achLunarite', 'achMethane', 'achTitanium', 'achGold', 'achSilver', 'achHydrogen',
                'achHelium', 'achIce', 'achAntimatter',

                'achEnergyT1', 'achEnergyT2', 'achEnergyT3', 'achEnergyT4', 'achEnergyT5', 'achEnergyT6',
                'achPlasmaT1', 'achPlasmaT2', 'achPlasmaT3', 'achPlasmaT4',
                'achMeteoriteT1', 'achMeteoriteT3', 'achMeteoriteT4',
                'achCarbonT1', 'achCarbonT2', 'achCarbonT3', 'achCarbonT4', 'achCarbonT5',
                'achScienceT1', 'achScienceT2', 'achScienceT3', 'achScienceT4', 'achScienceT5',
                'achOilT1', 'achOilT2', 'achOilT3', 'achOilT4', 'achOilT5',
                'achFuelT1', 'achFuelT2', 'achFuelT3',
                'achMetalT1', 'achMetalT2', 'achMetalT3', 'achMetalT4', 'achMetalT5',
                'achGemT1', 'achGemT2', 'achGemT3', 'achGemT4', 'achGemT5',
                'achWoodT1', 'achWoodT2', 'achWoodT3', 'achWoodT4', 'achWoodT5',
                'achSiliconT1', 'achSiliconT2', 'achSiliconT3', 'achSiliconT4', 'achSiliconT5',
                'achUraniumT1', 'achUraniumT2', 'achUraniumT3', 'achUraniumT4', 'achUraniumT5',
                'achLavaT1', 'achLavaT2', 'achLavaT3', 'achLavaT4', 'achLavaT5',
                'achLunariteT1', 'achLunariteT2', 'achLunariteT3', 'achLunariteT4', 'achLunariteT5',
                'achMethaneT1', 'achMethaneT2', 'achMethaneT3', 'achMethaneT4', 'achMethaneT5',
                'achTitaniumT1', 'achTitaniumT2', 'achTitaniumT3', 'achTitaniumT4', 'achTitaniumT5',
                'achGoldT1', 'achGoldT2', 'achGoldT3', 'achGoldT4', 'achGoldT5',
                'achSilverT1', 'achSilverT2', 'achSilverT3', 'achSilverT4', 'achSilverT5',
                'achHydrogenT1', 'achHydrogenT2', 'achHydrogenT3', 'achHydrogenT4', 'achHydrogenT5',
                'achHeliumT1', 'achHeliumT2', 'achHeliumT3', 'achHeliumT4', 'achHeliumT5',
                'achIceT1', 'achIceT2', 'achIceT3', 'achIceT4', 'achIceT5',
                'achAntimatterT1',
                
                'radarT1', 'radarT2',
                
                'shipT1', 'shipT2', 'shipT3', 'shipT4', 'shipT5',
                
                'segment', 'dysonT1', 'dysonT2', 'dysonT3',

                'conquest', 'statue',

                'star301',    'star163901', 'star181901', 'star151801', 'star25401',  'star146301',
                'star122601', 'star79501',  'star1501',   'star79901',  'star37601',  'star123401',
                'star164301', 'star219102', 'star204702', 'star116901', 'star74001',  'star205102',
                'star144001', 'star222301', 'star3901',   'star168301', 'star120901', 'star125301',
                'star113101', 'star89101',  'star93901',  'star79201',  'star80501',  'star77301',
                'star191701', 'star199702', 'star21001',  'star178302', 'star32201',  'star74801',

                'star401',    'star25101',  'star207601', 'star223901', 'star121101', 'star136701',
                'star166402', 'star95001',  'star175902', 'star56501',  'star167801', 'star103201',
                'star113301', 'star199602', 'star157201', 'star222201', 'star6301',   'star214301',
                'star40801',  'star207301', 'star169601', 'star157101', 'star178501', 'star208601',
                'star78101',  'star123501', 'star85901',  'star18501',  'star199801', 'star141901',
                'star5201',   'star223701', 'star166903', 'star32101',  'star77801',  'star205201',

                'star201',    'star217101', 'star166701', 'star179501', 'star6501',   'star222401',
                'star200001', 'star24201',  'star224202', 'star92801',  'star172701', 'star86401',
                'star202902', 'star177001', 'star68301',  'star205001', 'star13401',  'star34201',
                'star182101', 'star178401', 'star107601', 'star192101', 'star24001',  'star16601',
                'star27501',  'star121601', 'star212102', 'star117501',

                'star501',    'star130601', 'star158101', 'star224601', 'star58601',  'star10101',
                'star194201', 'star1101',   'star72501',  'star210501', 'star189701', 'star175601',
                'star206902', 'star133601', 'star135801', 'star39101',  'star107001', 'star105801',
                'star224201', 'star205101', 'star162501', 'star4001',   'star141101', 'star180502',
                'star208702', 'star85501',  'star217202', 'star180101', 'star13801',  'star37101',
                'star42501',  'star80901',  'star215902', 'star190502', 'star99701',  'star176802',

                'star701',    'star601',    'star80101',  'star213301', 'star13601',  'star51801',
                'star35801',  'star216801', 'star224101', 'star114001', 'star15301',  'star69601',
                'star148501', 'star155801', 'star185101', 'star175901', 'star203902', 'star204801',
                'star211202', 'star100801', 'star124101', 'star139701', 'star50401',  'star159101',
                'star148101', 'star157301', 'star72601',  'star224801', 'star71001',  'star207501',
                'star168302', 'star128901', 'star68401',  'star30701',  'star193402', 'star84201',
                'star76401',  'star32301',  'star191401', 'star118301', 'star166901', 'star62901',
                'star21601',  'star63801',  'star187202',
            ]
            
            state.dmUpgrades = [
                state.items['dmUpgdMultiGain'], state.items['dmUpgdStartingStorage'], state.items['dmUpgdMultiBuild'],
                state.items['dmUpgdStorage'], state.items['dmUpgdAutoEmc'], state.items['dmUpgdTier5'],
                state.items['dmUpgdDimensionRift'],
            ]
            
            state.ulUpgrades = [
                state.items['ulUpgdStorage'], state.items['ulUpgdSpeed'], state.items['ulUpgdDefense'], 
                state.items['ulUpgdPower'], state.items['ulUpgdAutoStorage'], 
            ]
            
            state.titans = [
                state.items['titanMeteorite'], state.items['titanCarbon'],
                state.items['titanScience'], state.items['titanOil'], state.items['titanFuel'],
                state.items['titanMetal'], state.items['titanGem'], state.items['titanWood'],
                state.items['titanSilicon'], state.items['titanUranium'], state.items['titanLava'],
                state.items['titanLunarite'], state.items['titanMethane'], state.items['titanTitanium'],
                state.items['titanGold'], state.items['titanSilver'], state.items['titanHydrogen'],
                state.items['titanHelium'], state.items['titanIce'], state.items['titanAntimatter'],
            ]
            
            state.items['missionFirst'].unlocked = true
            
            state.items['gem'].unlocked = true
            state.items['wood'].unlocked = true
            state.items['metal'].unlocked = true
            
            state.items['achGem'].unlocked = true
            state.items['achWood'].unlocked = true
            state.items['achMetal'].unlocked = true
            
            state.lastFrameTimeMs = currentTime
            state.lastConversionTimeMs = currentTime
            state.lastUpgradeTimeMs = currentTime
        },
        
        /*--------------------------------------------------------------------*/
        load({ state, getters, dispatch }) {
            
            let currentTime = new Date().getTime()
            
            var loadeddata = localStorage.getItem('ngsc')
            if (loadeddata && loadeddata !== null && loadeddata.length % 4 == 0) {
                
                let text = LZString.decompressFromBase64(loadeddata)
                if (!text) return console.warn('Load failed')
                loadeddata = JSON.parse(text)
                
                if (loadeddata.version || loadeddata.versionNumber) {
                    
                    state.locale = loadeddata.locale || 'en'
                    state.companyName = loadeddata.companyName || 'NG Space Company'
                    state.autoSaveDelay = loadeddata.autoSaveInterval || 30000
                    
                    state.lastFrameTimeMs = loadeddata.lastUpdateTime || currentTime
                    state.lastConversionTimeMs = loadeddata.lastUpdateTime || currentTime
                    state.lastUpgradeTimeMs = loadeddata.lastUpdateTime || currentTime
                    
                    if (loadeddata.autoResource) state.autoConversionId = loadeddata.autoResource.substring(3).toLowerCase()
                    
                    state.collapsed = loadeddata.collapsed || []
                    
                    state.statsStartDate = (loadeddata.stats && loadeddata.stats.startDate) || currentTime
                    state.statsLastRebirth = (loadeddata.stats && loadeddata.stats.lastRebirthDate) || currentTime
                    state.statsLastEnlighten = (loadeddata.stats && loadeddata.stats.lastEnlightenDate) || currentTime
                    state.statsTotalRebirths = (loadeddata.stats && loadeddata.stats.rebirthCount) || 0
                    state.statsTotalEnlightens = (loadeddata.stats && loadeddata.stats.enlightenCount) || 0
                    state.statsTotalConquests = (loadeddata.stats && loadeddata.stats.starOwned.allTime) || 0
                    
                    let ids = [
                        
                        'energy', 'energyT1', 'energyT2', 'energyT3', 'energyT4', 'energyT5', 'energyT6',
                        'plasma', 'plasmaT1', 'plasmaT2', 'plasmaT3', 'plasmaT4',
                        'meteorite', 'meteoriteT1', 'meteoriteT2', 'meteoriteT3', 'meteoriteT4',
                        'carbon', 'carbonT1', 'carbonT2', 'carbonT3', 'carbonT4', 'carbonT5',
                        'oil', 'oilT1', 'oilT2', 'oilT3', 'oilT4', 'oilT5',
                        'metal', 'metalT1', 'metalT2', 'metalT3', 'metalT4', 'metalT5',
                        'gem', 'gemT1', 'gemT2', 'gemT3', 'gemT4', 'gemT5',
                        'wood', 'woodT1', 'woodT2', 'woodT3', 'woodT4', 'woodT5',
                        'silicon', 'siliconT1', 'siliconT2', 'siliconT3', 'siliconT4', 'siliconT5',
                        'uranium', 'uraniumT1', 'uraniumT2', 'uraniumT3', 'uraniumT4', 'uraniumT5',
                        'lava', 'lavaT1', 'lavaT2', 'lavaT3', 'lavaT4', 'lavaT5',
                        'lunarite', 'lunariteT1', 'lunariteT2', 'lunariteT3', 'lunariteT4', 'lunariteT5',
                        'methane', 'methaneT1', 'methaneT2', 'methaneT3', 'methaneT4', 'methaneT5',
                        'titanium', 'titaniumT1', 'titaniumT2', 'titaniumT3', 'titaniumT4', 'titaniumT5',
                        'gold', 'goldT1', 'goldT2', 'goldT3', 'goldT4', 'goldT5',
                        'silver', 'silverT1', 'silverT2', 'silverT3', 'silverT4', 'silverT5',
                        'hydrogen', 'hydrogenT1', 'hydrogenT2', 'hydrogenT3', 'hydrogenT4', 'hydrogenT5',
                        'helium', 'heliumT1', 'heliumT2', 'heliumT3', 'heliumT4', 'heliumT5',
                        'ice', 'iceT1', 'iceT2', 'iceT3', 'iceT4', 'iceT5',
                        'science', 'scienceT1', 'scienceT2', 'scienceT3', 'scienceT4', 'scienceT5',
                        'fuel', 'fuelT1', 'fuelT2', 'fuelT3',
                        'antimatter', 'antimatterT1',
                        
                        'achEnergy', 'achPlasma', 'achMeteorite', 'achCarbon', 'achScience', 'achOil',
                        'achFuel', 'achMetal', 'achGem', 'achWood', 'achSilicon', 'achUranium', 'achLava',
                        'achLunarite', 'achMethane', 'achTitanium', 'achGold', 'achSilver', 'achHydrogen',
                        'achHelium', 'achIce', 'achAntimatter',
        
                        'achEnergyT1', 'achEnergyT2', 'achEnergyT3', 'achEnergyT4', 'achEnergyT5', 'achEnergyT6',
                        'achPlasmaT1', 'achPlasmaT2', 'achPlasmaT3', 'achPlasmaT4',
                        'achMeteoriteT1', 'achMeteoriteT3', 'achMeteoriteT4',
                        'achCarbonT1', 'achCarbonT2', 'achCarbonT3', 'achCarbonT4', 'achCarbonT5',
                        'achScienceT1', 'achScienceT2', 'achScienceT3', 'achScienceT4', 'achScienceT5',
                        'achOilT1', 'achOilT2', 'achOilT3', 'achOilT4', 'achOilT5',
                        'achFuelT1', 'achFuelT2', 'achFuelT3',
                        'achMetalT1', 'achMetalT2', 'achMetalT3', 'achMetalT4', 'achMetalT5',
                        'achGemT1', 'achGemT2', 'achGemT3', 'achGemT4', 'achGemT5',
                        'achWoodT1', 'achWoodT2', 'achWoodT3', 'achWoodT4', 'achWoodT5',
                        'achSiliconT1', 'achSiliconT2', 'achSiliconT3', 'achSiliconT4', 'achSiliconT5',
                        'achUraniumT1', 'achUraniumT2', 'achUraniumT3', 'achUraniumT4', 'achUraniumT5',
                        'achLavaT1', 'achLavaT2', 'achLavaT3', 'achLavaT4', 'achLavaT5',
                        'achLunariteT1', 'achLunariteT2', 'achLunariteT3', 'achLunariteT4', 'achLunariteT5',
                        'achMethaneT1', 'achMethaneT2', 'achMethaneT3', 'achMethaneT4', 'achMethaneT5',
                        'achTitaniumT1', 'achTitaniumT2', 'achTitaniumT3', 'achTitaniumT4', 'achTitaniumT5',
                        'achGoldT1', 'achGoldT2', 'achGoldT3', 'achGoldT4', 'achGoldT5',
                        'achSilverT1', 'achSilverT2', 'achSilverT3', 'achSilverT4', 'achSilverT5',
                        'achHydrogenT1', 'achHydrogenT2', 'achHydrogenT3', 'achHydrogenT4', 'achHydrogenT5',
                        'achHeliumT1', 'achHeliumT2', 'achHeliumT3', 'achHeliumT4', 'achHeliumT5',
                        'achIceT1', 'achIceT2', 'achIceT3', 'achIceT4', 'achIceT5',
                        'achAntimatterT1',

                        'shipT1', 'shipT2', 'shipT3', 'shipT4', 'shipT5',
                        
                        'segment', 'dysonT1', 'dysonT2', 'dysonT3',
                        
                        'star301',    'star163901', 'star181901', 'star151801', 'star25401',  'star146301',
                        'star122601', 'star79501',  'star1501',   'star79901',  'star37601',  'star123401',
                        'star164301', 'star219102', 'star204702', 'star116901', 'star74001',  'star205102',
                        'star144001', 'star222301', 'star3901',   'star168301', 'star120901', 'star125301',
                        'star113101', 'star89101',  'star93901',  'star79201',  'star80501',  'star77301',
                        'star191701', 'star199702', 'star21001',  'star178302', 'star32201',  'star74801',
        
                        'star401',    'star25101',  'star207601', 'star223901', 'star121101', 'star136701',
                        'star166402', 'star95001',  'star175902', 'star56501',  'star167801', 'star103201',
                        'star113301', 'star199602', 'star157201', 'star222201', 'star6301',   'star214301',
                        'star40801',  'star207301', 'star169601', 'star157101', 'star178501', 'star208601',
                        'star78101',  'star123501', 'star85901',  'star18501',  'star199801', 'star141901',
                        'star5201',   'star223701', 'star166903', 'star32101',  'star77801',  'star205201',
        
                        'star201',    'star217101', 'star166701', 'star179501', 'star6501',   'star222401',
                        'star200001', 'star24201',  'star224202', 'star92801',  'star172701', 'star86401',
                        'star202902', 'star177001', 'star68301',  'star205001', 'star13401',  'star34201',
                        'star182101', 'star178401', 'star107601', 'star192101', 'star24001',  'star16601',
                        'star27501',  'star121601', 'star212102', 'star117501',
        
                        'star501',    'star130601', 'star158101', 'star224601', 'star58601',  'star10101',
                        'star194201', 'star1101',   'star72501',  'star210501', 'star189701', 'star175601',
                        'star206902', 'star133601', 'star135801', 'star39101',  'star107001', 'star105801',
                        'star224201', 'star205101', 'star162501', 'star4001',   'star141101', 'star180502',
                        'star208702', 'star85501',  'star217202', 'star180101', 'star13801',  'star37101',
                        'star42501',  'star80901',  'star215902', 'star190502', 'star99701',  'star176802',
        
                        'star701',    'star601',    'star80101',  'star213301', 'star13601',  'star51801',
                        'star35801',  'star216801', 'star224101', 'star114001', 'star15301',  'star69601',
                        'star148501', 'star155801', 'star185101', 'star175901', 'star203902', 'star204801',
                        'star211202', 'star100801', 'star124101', 'star139701', 'star50401',  'star159101',
                        'star148101', 'star157301', 'star72601',  'star224801', 'star71001',  'star207501',
                        'star168302', 'star128901', 'star68401',  'star30701',  'star193402', 'star84201',
                        'star76401',  'star32301',  'star191401', 'star118301', 'star166901', 'star62901',
                        'star21601',  'star63801',  'star187202',
                        
                        'darkmatter',
                    ]
                    
                    ids.forEach(id => { dispatch('loadV1Item', { loadeddata:loadeddata, oldId:id, newId:id }) })
                    
                    dispatch('loadV1Item', { loadeddata:loadeddata, oldId:'radarT1', newId:'radarT2' })
                    dispatch('loadV1Item', { loadeddata:loadeddata, oldId:'radarT2', newId:'radarT1' })
                    
                    ids = [
                        { oldId:'energyS1', newId:'energy' },
                        { oldId:'energyS2', newId:'energy' },
                        { oldId:'energyS3', newId:'energy' },
                        { oldId:'energyS4', newId:'energy' },
                        { oldId:'energyS5', newId:'energy' },
                        { oldId:'energyS6', newId:'energy' },
                        { oldId:'plasmaS1', newId:'plasma' },
                        { oldId:'plasmaS2', newId:'plasma' },
                        { oldId:'plasmaS3', newId:'plasma' },
                        { oldId:'plasmaS4', newId:'plasma' },
                        { oldId:'meteoriteS1', newId:'meteorite' },
                        { oldId:'carbonS1', newId:'carbon' },
                        { oldId:'scienceS1', newId:'science' },
                        { oldId:'oilS1', newId:'oil' },
                        { oldId:'fuelS1', newId:'fuel' },
                        { oldId:'metalS1', newId:'metal' },
                        { oldId:'gemS1', newId:'gem' },
                        { oldId:'woodS1', newId:'wood' },
                        { oldId:'siliconS1', newId:'silicon' },
                        { oldId:'uraniumS1', newId:'uranium' },
                        { oldId:'lavaS1', newId:'lava' },
                        { oldId:'lunariteS1', newId:'lunarite' },
                        { oldId:'methaneS1', newId:'methane' },
                        { oldId:'titaniumS1', newId:'titanium' },
                        { oldId:'goldS1', newId:'gold' },
                        { oldId:'silverS1', newId:'silver' },
                        { oldId:'hydrogenS1', newId:'hydrogen' },
                        { oldId:'heliumS1', newId:'helium' },
                        { oldId:'iceS1', newId:'ice' },
                        { oldId:'antimatterS1', newId:'antimatter' },
                    ]
                    
                    ids.forEach(item => { dispatch('loadV1Upgrade', { loadeddata:loadeddata, oldId:item.oldId, newId:item.newId }) })
                    
                    if (state.items['metal'].upgrade > 0) {
                        
                        dispatch('loadItem', 'missionFirst')
                        dispatch('loadItem', 'missionStorage')
                    }
                    
                    if (state.items['energyT1'].unlocked == true) {
                        dispatch('loadItem', 'missionSolarPanel')
                        state.items['energy'].upgrade = 11
                    }
                    
                    if (state.items['energyT2'].unlocked == true) dispatch('loadItem', 'missionEnergy')
                    
                    if (state.items['oil'].unlocked == true) dispatch('loadItem', 'missionOil')
                    
                    if (state.items['metalT2'].unlocked == true) dispatch('loadItem', 'missionTier2')
                    
                    dispatch('loadV1Item', { loadeddata:loadeddata, oldId:'techDestruction', newId:'missionDestruction' })
                    
                    if (state.items['fuel'].unlocked == true) {
                        dispatch('loadItem', 'missionFuel')
                        state.items['fuel'].upgrade = 11
                    }
                    
                    dispatch('loadV1Item', { loadeddata:loadeddata, oldId:'rocket1', newId:'missionRocket1' })
                    dispatch('loadV1Item', { loadeddata:loadeddata, oldId:'rocket2', newId:'missionRocket2' })
                    
                    if (state.items['lunarite'].unlocked == true) dispatch('loadItem', 'missionMoon')
                    
                    if (state.items['methane'].unlocked == true) {
                        dispatch('loadItem', 'missionVenus')
                        dispatch('loadItem', 'missionMercury')
                    }
                    
                    if (state.items['silicon'].unlocked == true) dispatch('loadItem', 'missionMars')
                    if (state.items['gold'].unlocked == true) dispatch('loadItem', 'missionAsteroid')

                    dispatch('loadV1Item', { loadeddata:loadeddata, oldId:'wonderPrecious0', newId:'missionWonderStation' })

                    if (state.items['hydrogen'].unlocked == true) dispatch('loadItem', 'missionJupiter')
                    if (state.items['helium'].unlocked == true) dispatch('loadItem', 'missionSaturn')
                    
                    dispatch('loadV1Item', { loadeddata:loadeddata, oldId:'uranus', newId:'missionUranus' })
                    dispatch('loadV1Item', { loadeddata:loadeddata, oldId:'neptune', newId:'missionNeptune' })
                    
                    if (state.items['ice'].unlocked == true) dispatch('loadItem', 'missionPluto')

                    dispatch('loadV1Item', { loadeddata:loadeddata, oldId:'solCenter0', newId:'missionKuiper' })
                    dispatch('loadV1Item', { loadeddata:loadeddata, oldId:'solCenter1', newId:'missionSolCenter' })

                    if (state.items['plasma'].unlocked == true) {
                        dispatch('loadItem', 'missionPlasma')
                        state.items['plasma'].upgrade = 11
                    }
                    
                    if (state.items['meteorite'].unlocked == true) dispatch('loadItem', 'missionMeteorite')
                    if (state.items['segment'].unlocked == true) dispatch('loadItem', 'missionDyson')
                    
                    dispatch('loadV1Item', { loadeddata:loadeddata, oldId:'techEmc0', newId:'missionEmc' })
                    
                    dispatch('loadV1Item', { loadeddata:loadeddata, oldId:'wonderPrecious0', newId:'missionWonderStation2' })

                    if (state.items['uranium'].unlocked == true) dispatch('loadItem', 'missionWonderPrecious')
                    if (state.items['metalT3'].unlocked == true) dispatch('loadItem', 'missionWonderTechnological')
                    if (state.items['lava'].unlocked == true) dispatch('loadItem', 'missionWonderEnergetic')
                    if (state.items['metalT4'].unlocked == true) dispatch('loadItem', 'missionWonderMeteorite')
                    
                    if (state.items['darkmatter'].unlocked == true) {
                        
                        dispatch('loadItem', 'missionRebirth')
                        
                        if ('boostProduction' in loadeddata.entries) {
                            ids = [
                                'boostEnergy', 'boostPlasma', 'boostMeteorite', 'boostCarbon', 'boostScience',
                                'boostOil', 'boostFuel', 'boostMetal', 'boostGem', 'boostWood',
                                'boostSilicon', 'boostUranium', 'boostLava', 'boostLunarite', 'boostMethane',
                                'boostTitanium', 'boostGold', 'boostSilver', 'boostHydrogen',
                                'boostHelium', 'boostIce', 'boostAntimatter',
                            ]
                            let boost = loadeddata.entries['boostProduction'].count
                            ids.forEach(id => { state.items[id].count += boost })
                        }
                    }
                    
                    dispatch('loadV1Item', { loadeddata:loadeddata, oldId:'upgradeGain', newId:'dmUpgdMultiGain' })
                    dispatch('loadV1Item', { loadeddata:loadeddata, oldId:'upgradeStorage1', newId:'dmUpgdStartingStorage' })
                    dispatch('loadV1Item', { loadeddata:loadeddata, oldId:'multiBuy', newId:'dmUpgdMultiBuild' })
                    dispatch('loadV1Item', { loadeddata:loadeddata, oldId:'upgradeStorage2', newId:'dmUpgdStorage' })
                    dispatch('loadV1Item', { loadeddata:loadeddata, oldId:'autoEmc', newId:'dmUpgdAutoEmc' })
                    dispatch('loadV1Item', { loadeddata:loadeddata, oldId:'techTier5', newId:'dmUpgdTier5' })
                    dispatch('loadV1Item', { loadeddata:loadeddata, oldId:'upgradeStorage3', newId:'dmUpgdDimensionRift' })
                    
                    if ('boostDarkmatter' in loadeddata.entries) {
                        
                        let boost = state.items['darkmatter'].count
                        if (boost > 0) {
                            ids = [
                                'boostEnergy', 'boostPlasma', 'boostMeteorite', 'boostCarbon', 'boostScience',
                                'boostOil', 'boostFuel', 'boostMetal', 'boostGem', 'boostWood',
                                'boostSilicon', 'boostUranium', 'boostLava', 'boostLunarite', 'boostMethane',
                                'boostTitanium', 'boostGold', 'boostSilver', 'boostHydrogen',
                                'boostHelium', 'boostIce', 'boostAntimatter',
                            ]
                            ids.forEach(id => { state.items[id].count += 1 * boost })
                        }
                        
                        state.items['darkmatter'].count = 0
                    }
                    
                    dispatch('loadV1Item', { loadeddata:loadeddata, oldId:'wonderComm', newId:'missionWonderComm' })
                    if (state.items['missionWonderComm'].unlocked == true) dispatch('loadItem', 'missionRebirth2')
                    if (state.items['antimatter'].unlocked == true) dispatch('loadItem', 'missionWonderAntimatter')
                    dispatch('loadV1Item', { loadeddata:loadeddata, oldId:'wonderStargate', newId:'missionWonderStargate' })
                    if (state.items['missionWonderStargate'].unlocked == true) dispatch('loadItem', 'missionWonderPortal')
                    dispatch('loadV1Item', { loadeddata:loadeddata, oldId:'spaceship', newId:'missionSpaceship' })
                    if (state.items['missionSpaceship'].unlocked == true) dispatch('loadItem', 'missionWonderStargate')

                    dispatch('loadV1Item', { loadeddata:loadeddata, oldId:'shield', newId:'missionShield' })
                    dispatch('loadV1Item', { loadeddata:loadeddata, oldId:'engine', newId:'missionEngine' })
                    dispatch('loadV1Item', { loadeddata:loadeddata, oldId:'aero', newId:'missionAero' })
                    
                    if (state.items['missionSpaceship'].count == 1) {
                        dispatch('loadItem', 'missionSpaceship')
                        dispatch('loadItem', 'missionShield')
                        dispatch('loadItem', 'missionEngine')
                        dispatch('loadItem', 'missionAero')
                    }
                    
                    if (state.statsTotalEnlightens > 0) {
                        dispatch('loadItem', 'missionEnlighten')
                        
                        dispatch('loadV1Item', { loadeddata:loadeddata, oldId:'ultrite', newId:'ultrite' })
                        dispatch('loadV1Item', { loadeddata:loadeddata, oldId:'advUpgradeStorage1', newId:'ulUpgdStorage' })
                        dispatch('loadV1Item', { loadeddata:loadeddata, oldId:'shipSpeedEnhancement', newId:'ulUpgdSpeed' })
                        dispatch('loadV1Item', { loadeddata:loadeddata, oldId:'shipDefenceEnhancement', newId:'ulUpgdDefense' })
                        dispatch('loadV1Item', { loadeddata:loadeddata, oldId:'shipPowerEnhancement', newId:'ulUpgdPower' })
                        dispatch('loadV1Item', { loadeddata:loadeddata, oldId:'techAutoStorageUpgrade', newId:'ulUpgdAutoStorage' })
                        
                        state.resources.forEach(item => {
                            if (item.id != 'energy' && item.id != 'plasma' && item.id in loadeddata.entries && 'titan' in loadeddata.entries[item.id] && loadeddata.entries[item.id].titan)
                                dispatch('loadItem', 'titan' + item.id.charAt(0).toUpperCase() + item.id.slice(1))
                        })
                    }
                    
                    ids = [
                        'plasmaT2', 'plasmaT3', 'plasmaT4',
                        'meteoriteT2', 'meteoriteT3', 'meteoriteT4',
                        'carbonT2', 'carbonT3', 'carbonT4', 'carbonT5',
                        'oilT2', 'oilT3', 'oilT4', 'oilT5',
                        'metalT2', 'metalT3', 'metalT4', 'metalT5',
                        'gemT2', 'gemT3', 'gemT4', 'gemT5',
                        'woodT2', 'woodT3', 'woodT4', 'woodT5',
                        'siliconT2', 'siliconT3', 'siliconT4', 'siliconT5',
                        'uraniumT2', 'uraniumT3', 'uraniumT4', 'uraniumT5',
                        'lavaT2', 'lavaT3', 'lavaT4', 'lavaT5',
                        'lunariteT2', 'lunariteT3', 'lunariteT4', 'lunariteT5',
                        'methaneT2', 'methaneT3', 'methaneT4', 'methaneT5',
                        'titaniumT2', 'titaniumT3', 'titaniumT4', 'titaniumT5',
                        'goldT2', 'goldT3', 'goldT4', 'goldT5',
                        'silverT2', 'silverT3', 'silverT4', 'silverT5',
                        'hydrogenT2', 'hydrogenT3', 'hydrogenT4', 'hydrogenT5',
                        'heliumT2', 'heliumT3', 'heliumT4', 'heliumT5',
                        'iceT2', 'iceT3', 'iceT4', 'iceT5',
                        'scienceT2', 'scienceT3', 'scienceT4', 'scienceT5',
                        'fuelT2', 'fuelT3',
                    ]
                    
                    ids.forEach(id => { if (state.items[id].unlocked == true) dispatch('loadItem', 'tech' + id.charAt(0).toUpperCase() + id.slice(1)) })
                    
                    if ('upgradeTier2' in loadeddata.entries) {
                        
                        let list = ['oilT2', 'metalT2', 'gemT2', 'carbonT2', 'woodT2']
                        list.forEach(id => { state.items[id].outputs.forEach(output => { output.count *= 2 }) })
                    }
                    
                    if ('upgradeEnergy1' in loadeddata.entries) {
                        
                        let list = ['energyT2']
                        list.forEach(id => { state.items[id].outputs.forEach(output => { output.count *= 2 }) })
                    }
                    
                    if ('upgradeEnergy2' in loadeddata.entries) {
                        
                        let list = ['energyT1']
                        list.forEach(id => { state.items[id].outputs.forEach(output => { output.count *= 2 }) })
                    }
                    
                    if ('boostEnergy' in loadeddata.entries) {
                        for (let i in state.items) {
                            let it = state.items[i]
                            if ('inputs' in it)
                                it.inputs.forEach(input => { if (input.id == 'energy') input.mod -= loadeddata.entries['boostEnergy'].count * 0.01 })
                        }
                    }
                    
                    if ('boostCapital' in loadeddata.entries) {
                        
                        let capitalBoost = 0
                        state.resources.forEach(item => {
                            if ('storage' in item && item.count > 0 && item.count >= getters.getItemStorage(item.id))
                                capitalBoost += 1
                        })
                        
                        if (capitalBoost > 0) {
                            ids = [
                                'boostEnergy', 'boostPlasma', 'boostMeteorite', 'boostCarbon', 'boostScience',
                                'boostOil', 'boostFuel', 'boostMetal', 'boostGem', 'boostWood',
                                'boostSilicon', 'boostUranium', 'boostLava', 'boostLunarite', 'boostMethane',
                                'boostTitanium', 'boostGold', 'boostSilver', 'boostHydrogen',
                                'boostHelium', 'boostIce', 'boostAntimatter',
                            ]
                            ids.forEach(id => { state.items[id].count += capitalBoost * 5 })
                        }
                    }
                    
                    localStorage.removeItem('ngsc')
                    
                    dispatch('save')
                    
                    dispatch('onLoad')
                    
                    for (let i in state.items) {
                        let item = state.items[i]
                        if (item.unlocked == true && item.count > 0 && 'collapses' in item && item.count >= item.max) {
                            item.collapses.forEach(id => { if (!state.collapsed.includes(id)) state.collapsed.push(id) })
                        }
                    }
                }
                else {
                    
                    state.locale = loadeddata.locale || 'en'
                    state.companyName = loadeddata.companyName || 'NG Space Company'
                    state.autoSaveDelay = loadeddata.autoSaveDelay || 30000
                    
                    state.activeTab = loadeddata.activeTab || 'missionsPane'
                    state.activePane = loadeddata.activePane || 'earthPane'
					
					if (loadeddata.sidebarOpen) state.sidebarOpen = loadeddata.sidebarOpen
					
                    state.lastFrameTimeMs = loadeddata.lastFrameTimeMs || currentTime
                    state.lastConversionTimeMs = loadeddata.lastConversionTimeMs || currentTime
                    state.lastUpgradeTimeMs = loadeddata.lastUpgradeTimeMs || currentTime
                    
                    if (loadeddata.autoConversionId) state.autoConversionId = loadeddata.autoConversionId
                    if (loadeddata.autoStorageId) state.autoStorageId = loadeddata.autoStorageId
                    
                    state.collapsed = loadeddata.collapsed || []
                    state.notified = loadeddata.notified || []
                    
                    state.statsStartDate = loadeddata.statsStartDate || currentTime
                    state.statsLastRebirth = loadeddata.statsLastRebirth || currentTime
                    state.statsLastEnlighten = loadeddata.statsLastEnlighten || currentTime
                    state.statsTotalRebirths = loadeddata.statsTotalRebirths || 0
                    state.statsTotalEnlightens = loadeddata.statsTotalEnlightens || 0
                    state.statsTotalConquests = loadeddata.statsTotalConquests || 0
                    state.statsTotalStatues = loadeddata.statsTotalStatues || 0
                    
                    loadeddata.items.forEach(item => {
                        if (state.items[item.id]) {
                            
                            if ('count' in item) state.items[item.id].count = item.count
                            if ('unlocked' in item) state.items[item.id].unlocked = item.unlocked
                            if ('upgrade' in item) state.items[item.id].upgrade = item.upgrade
                            if ('status' in item) state.items[item.id].status = item.status
                            if ('progress' in item) state.items[item.id].progress = item.progress
                        }
                    })
                    
                    dispatch('onLoad')
                }
            }            
        },
        
        loadV1Item({ state }, payload) {
            if (payload.oldId in payload.loadeddata.entries) {
                let data = payload.loadeddata.entries[payload.oldId]
                
                state.items[payload.newId].unlocked = true
                
                if ('count' in data) state.items[payload.newId].count = data.count
                
                if ('status' in data) {

                    if (data.status == 'explored') state.items[payload.newId].status = 'explored'

                    if (data.status == 'owned') {
                        state.items[payload.newId].status = 'conquered'
                        state.items['conquest'].count += 1
                    }

                    if (data.subStatus == 'terraformed') {
                        state.items[payload.newId].status = 'statued'
                        state.items['statue'].count += 1
                    }
                }
                
                return true
            }
        
            return false
        },
        
        loadV1Upgrade({ state }, payload) {
            if (payload.oldId in payload.loadeddata.entries)
                state.items[payload.newId].upgrade += payload.loadeddata.entries[payload.oldId].count
        },
        
        loadItem({ state }, id) {
            state.items[id].unlocked = true
            state.items[id].count = state.items[id].max
        },
        
        onLoad({ state, dispatch }) {
            
            for (let i in state.items) {
                let item = state.items[i]
                if (item.unlocked == true && item.count > 0) {
                    
                    if ('hides' in item) item.hides.forEach(id => { state.hidden.push(id) })
                    if ('unlocks' in item) item.unlocks.forEach(id => { state.items[id].unlocked = true })
                    
                    if ('modOutput' in item) {
                        for (let i in state.items) {
                            let it = state.items[i]
                            if ('outputs' in it)
                                it.outputs.forEach(output => { if (output.id == item.modOutput.id) { output.mod += item.count * item.modOutput.mod } })
                        }
                    }
                    
                    if ('modCost' in item) {
                        for (let i in state.items) {
                            let it = state.items[i]
                            if ('build' in it && 'costs' in it.build)
                                it.build.costs.forEach(cost => { if (cost.id == item.modCost.id) cost.mod += item.count * item.modCost.mod })
                        }
                    }
                }
                
                if (item.unlocked == true && (item.status == 'conquered' || item.status == 'statued')) {
                    state.items['dysonT3'].max += 1
                    state.items['antimatter'].storage.count += 100000
                    
                    for (let i in state.items) {
                        let it = state.items[i]
                        if ('outputs' in it)
                            it.outputs.forEach(output => {
                                if (item.resources.includes(output.id)) {
                                    output.mod += 0.25
                                    if (item.donor == true) output.mod += 0.25
                                }
                            })
                    }
                }
                
                if (item.unlocked == true || item.count > 0) { if ('onLoad' in item) item.onLoad(state) }
                
                if ('build' in item) {
                    
                    dispatch('updateBuildingCosts', item.id)
                    dispatch('updateCanBuild', item.id)
                }
            }
            
            for (let i in state.resources) {
                let item = state.resources[i]
                
                dispatch('updateItemProd', item.id)
            }
            
            dispatch('conversion/refresh')
            dispatch('statue/refresh')
            dispatch('achievement/refresh')
        },
        
        save({ state }) {
            
            let saveddata = {
                
                locale: state.locale,
                companyName: state.companyName,
                autoSaveDelay: state.autoSaveDelay,
                
                activeTab: state.activeTab,
                activePane: state.activePane,
                sidebarOpen: state.sidebarOpen,
                
                lastFrameTimeMs: state.lastFrameTimeMs,
                lastConversionTimeMs: state.lastConversionTimeMs,
                lastUpgradeTimeMs: state.lastUpgradeTimeMs,
                
                items: [],
                
                collapsed: state.collapsed,
                notified: state.notified,
                
                statsStartDate: state.statsStartDate,
                statsLastRebirth: state.statsLastRebirth,
                statsLastEnlighten: state.statsLastEnlighten,
                statsTotalRebirths: state.statsTotalRebirths,
                statsTotalEnlightens: state.statsTotalEnlightens,
                statsTotalConquests: state.statsTotalConquests,
                statsTotalStatues: state.statsTotalStatues,
            }
            
            if (state.autoConversionId) saveddata.autoConversionId = state.autoConversionId
            if (state.autoStorageId) saveddata.autoStorageId = state.autoStorageId
            
            for (let i in state.items) {
                let item = state.items[i]
                if (item.unlocked == true || item.count > 0) {
                    
                    let temp = { id:item.id }
                    
                    if ('unlocked' in item) temp.unlocked = item.unlocked
                    if ('count' in item) temp.count = item.count
                    if ('upgrade' in item) temp.upgrade = item.upgrade
                    if ('status' in item) temp.status = item.status
                    if ('progress' in item) temp.progress = item.progress
                    
                    saveddata.items.push(temp)
                }
            }

            let text = JSON.stringify(saveddata)
            let compressed = LZString.compressToBase64(text)
            localStorage.setItem('ngsc', compressed)
        },
    
        /*--------------------------------------------------------------------*/
        computeItemProd({ state }, id) {
            
            var i, j, item, input, output, prod = 0
            
            for (i in state.producers) {
                item = state.producers[i]
                
                if ('inputs' in item) {
                    for (j in item.inputs) {
                        input = item.inputs[j]
                        
                        if (input.id == id) {
                            prod -= (input.count * input.mod * item.count) / item.effectiveness
                        }
                    }
                }
                
                for (j in item.outputs) {
                    output = item.outputs[j]
                    
                    if (output.id == id) {
                        prod += (output.count * output.mod * item.count) / item.effectiveness
                    }
                }
            }
            
            return prod
        },
        updateItemProd({ state, dispatch }, id) {
            
            dispatch('computeItemProd', id).then(prod => {
                if (!state.items[id].prod || state.items[id].prod != prod) {
                    
                    state.items[id].prod = prod
                }
            })
        },        
        /*--------------------------------------------------------------------*/
        mainLoop({ state, getters, dispatch }) {
            
            var currentTimeMs = new Date().getTime()
            
            var stepDuration = 1000 / state.maxFps
            
            var delay = currentTimeMs - state.lastFrameTimeMs
            
            if (delay <= 0) {
                state.lastFrameTimeMs = currentTimeMs
                return 
            }
            
            if (delay < stepDuration) return
            
            delay /= 1000
            state.lastFrameTimeMs = currentTimeMs
            
            /* Resource production */
            
            var temp = {}, i, j, item, can, costs, input
            state.resources.forEach(item => { temp[item.id] = { prod:0, count:item.count, rawProduction:0, rawConsumption:0, coeff:1.0 } })
            
            for (i = 0; i < state.producers.length; i++) {
                item = state.producers[i]
                
                if ('inputs' in item) {
                    item.inputs.forEach(input => {
                        temp[input.id].rawConsumption += input.count * input.mod * item.count
                    })
                }
                
                item.outputs.forEach(output => {
                    temp[output.id].rawProduction += output.count * output.mod * item.count
                })
            }
            
            for (i = 0; i < state.resources.length; i++) {
                item = state.resources[i]
                
                if (temp[item.id].rawConsumption > temp[item.id].rawProduction) temp[item.id].coeff = temp[item.id].rawConsumption / temp[item.id].rawProduction                
            }
            
            for (i = 0; i < state.producers.length; i++) {
                item = state.producers[i]
                
                can = true
                
                let coeff = 1.0
                if (item.count > 0 && 'inputs' in item) {
                    for (j = 0; j < item.inputs.length; j++) {
                        input = item.inputs[j]
                        
                        if (temp[input.id].coeff > coeff) coeff = temp[input.id].coeff
                    }
                }
                
                if (item.effectiveness != coeff) {
                    
                    item.effectiveness = coeff
                    
                    if (item.count > 0 && 'inputs' in item) {
                        for (j = 0; j < item.inputs.length; j++) {
                            input = item.inputs[j]                            
                            dispatch('updateItemProd', input.id)
                        }
                    }
                    
                    if (item.count > 0 && 'outputs' in item) {
                        for (j = 0; j < item.outputs.length; j++) {
                            output = item.outputs[j]                            
                            dispatch('updateItemProd', output.id)
                        }
                    }
                }
                
                if (can) {
                    
                    if ('inputs' in item) {
                        for (j = 0; j < item.inputs.length; j++) {
                            input = item.inputs[j]

                            temp[input.id].prod -= (input.count * input.mod * item.count) / coeff
                        }
                    }
                    
                    for (j = 0; j < item.outputs.length; j++) {
                        var output = item.outputs[j]
                        
                        temp[output.id].prod += (output.count * output.mod * item.count) / coeff
                    }
                }
            }
            
            for (i = 0; i < state.resources.length; i++) {
                item = state.resources[i]
                
                temp[item.id].count = Math.max(temp[item.id].count + temp[item.id].prod * delay, 0)
            }
            
            /* Automatic conversion */
            
            delay = currentTimeMs - state.lastConversionTimeMs
            if (delay > 1000 && state.autoConversionId) {
                
                delay /= 1000
                state.lastConversionTimeMs = currentTimeMs
                
                for (i = 0; i < Math.floor(delay); i++) {
                    
                    var count = getters['conversion/maxCount'](state.autoConversionId)
                    
                    can = true
        
                    let cost = getters['conversion/cost'](state.autoConversionId, count)
                    if (temp[cost.id].count - cost.count < 0) {
                        can = false
                    }
                    
                    if (can && count > 0) {
                        
                        item = state.items[state.autoConversionId]
                        temp[item.id].count += count
                        
                        temp[cost.id].count -= cost.count
                    }
                    else break
                }
            }
            
            /* Automatic storage */
            
            delay = currentTimeMs - state.lastUpgradeTimeMs
            if (delay > 1000 && state.autoStorageId) {
                
                delay /= 1000
                state.lastUpgradeTimeMs = currentTimeMs
                
                item = state.items[state.autoStorageId]
                for (i = 0; i < Math.floor(delay); i++) {
                    
                    can = true
                    
                    if (item.upgrade >= item.storage.max) can = false
                    
                    costs = getters.getUpgradeCosts(state.autoStorageId)
                    costs.forEach(cost => {
                        if (temp[cost.id].count - cost.count < 0) {
                            can = false
                            return
                        }
                    })

                    if (can) {
                        
                        item.upgrade += 1
                        
                        costs = getters.getUpgradeCosts(state.autoStorageId)
                        costs.forEach(cost => { temp[cost.id].count -= cost.count })
                    }
                    else break
                }
            }
            
            /* Resource storage limitation */
            
            for (i = 0; i < state.resources.length; i++) {
                item = state.resources[i]
                
                if ('storage' in item) temp[item.id].count = Math.min(temp[item.id].count, getters.getItemStorage(item.id))
                if (temp[item.id].count != item.count) item.count = temp[item.id].count
            }            
        },
        
        /*--------------------------------------------------------------------*/
        computeMaxBuildCount({ state }, id) {
            
            let item = state.items[id]
            if (!('costs' in item.build)) return 1
            
            let costs = JSON.parse(JSON.stringify(item.build.costs))
            costs.forEach(cost => {
                cost.base = cost.count
                cost.count = cost.base * cost.mod * Math.pow(cost.coeff, item.count)
            })
            
            let result = 1000000
            costs.forEach(cost => {
                
                if (result == 0) return
                
                let max = Math.floor(Math.log(((state.items[cost.id].count * (cost.coeff - 1)) / cost.count) + 1) / Math.log(cost.coeff))
                if (!max) max = 0
                if (max < result) { result = max }
            })
            
            if (item.max && result + item.count > item.max) result = item.max - item.count
            
            return result
        },
        
        computeBuildCosts({ state, getters }, payload) {
            
            let id = payload.id
            let count = payload.count
            
            let item = state.items[id]
            if (!('costs' in item.build)) return 0

            let costs = JSON.parse(JSON.stringify(item.build.costs))
            costs.forEach(cost => {
                cost.base = cost.count
                cost.count = Math.floor(cost.base * cost.mod * Math.pow(cost.coeff, item.count))
            })
            
            for (let n = 1; n < count; n++)
                costs.forEach(cost => { cost.count += Math.floor(cost.base * cost.mod * Math.pow(cost.coeff, item.count + n)) })
            
            costs.forEach(cost => {
                cost.progress = Math.min(100, ((state.items[cost.id].count / cost.count) * 100).toFixed())
                cost.timer = getters.getTimer(cost.id, cost.count)
            })
            
            return costs
        },
        
        computeCanBuild({ state, getters }, payload) {
            
            let id = payload.id
            let count = payload.count
			
            let item = state.items[id]
            if (!('build' in item)) return -4
            if (!('costs' in item.build)) return 0
            if (item.max && item.count >= item.max) return -6
            if (item.count > 1 && item.max && item.count + count > item.max) return -7
			
            let can = 0
			
            let costs = JSON.parse(JSON.stringify(getters.getBuildCosts(id, count)))
            if (costs)
                costs.forEach(cost => {
                    if (state.items[cost.id].count - cost.count < 0) {
                        can = -1
                        return
                    }
                })
            costs = null
            
            return can
        },
        
        computeGainCosts({ state, getters }, payload) {
            
            let id = payload.id
            let count = payload.count
            
            let item = state.items[id]
            if (!('costs' in item.gain)) return null
            
            let costs = JSON.parse(JSON.stringify(item.gain.costs))
            costs.forEach(cost => { cost.count = Math.floor(cost.count * count) })
            
            costs.forEach(cost => {
                cost.progress = Math.min(100, ((state.items[cost.id].count / cost.count) * 100).toFixed())
                cost.timer = getters.getTimer(cost.id, cost.count)
            })

            return costs
        },
        
        computeCanGain({ state, getters }, payload) {
            
            let id = payload.id
            let count = payload.count
            
            let item = state.items[id]
            if (item.unlocked == false) return -2
            if (!('gain' in item)) return -3
            
            let max = getters.getItemStorage(id)
            if (max && item.count >= max) return -6
            if (item.count > 1 && max && item.count + count > max) return -7

            if (!('costs' in item.gain)) return 0
            
            let can = 0

            let costs = getters.getGainCosts(id)
            if (costs) {
                costs.forEach(cost => {
                    if (state.items[cost.id].count - cost.count < 0) {
                        can = -1
                        return
                    }
                })
            }

            return can
        },
        
        computeUpgradeCosts({ state, getters }, payload) {
            
            let id = payload.id
            
            let item = state.items[id]
            if (!('costs' in item.storage)) return null
            
            let costs = JSON.parse(JSON.stringify(item.storage.costs))
            costs.forEach(cost => { cost.count = Math.floor(cost.count * Math.pow(cost.coeff, item.upgrade)) })
            
            costs.forEach(cost => {
                cost.progress = Math.min(100, ((state.items[cost.id].count / cost.count) * 100).toFixed())
                cost.timer = getters.getTimer(cost.id, cost.count)
            })

            return costs
        },
        
        computeCanUpgrade({ state, getters }, payload) {
            
            let id = payload.id
            
            let item = state.items[id]
            if (item.unlocked == false) return -2
            if (!('storage' in item)) return -3
            if (!('costs' in item.storage)) return -4
            
            if (item.upgrade >= item.storage.max) return -6
            
            let can = 0

            let costs = getters.getUpgradeCosts(id)
            costs.forEach(cost => {
                if (state.items[cost.id].count - cost.count < 0) {
                    can = -1
                    return
                }
            })

            return can
        },
        
        updateLoop({ state, dispatch }) {
            
            for (let i in state.items) {
                let item = state.items[i]
                
                if ('build' in item && 'costs' in item.build) {
                    
                    dispatch('updateMaxBuildCount', item.id)
                    dispatch('updateBuildingCosts', item.id)
                    dispatch('updateCanBuild', item.id)
                }
                
                if ('storage' in item && 'costs' in item.storage) {
                    
                    dispatch('updateUpgradeCosts', item.id)
                    dispatch('updateCanUpgrade', item.id)
                }
                
                if ('gain' in item) {
                    
                    dispatch('updateGainCosts', item.id)
                    dispatch('updateCanGain', item.id)
                }
            }
            
            dispatch('conversion/refresh')
            dispatch('statue/refresh')
            dispatch('achievement/refresh')
        },
        
        updateMaxBuildCount({ state, dispatch }, id) {
            
            dispatch('computeMaxBuildCount', id).then(max => {
                if (!state.items[id].maxBuildCount || state.items[id].maxBuildCount != max) {
                    
                    state.items[id].maxBuildCount = max
                }
            })
        },
        
        updateGainCosts({ state, dispatch }, id) {
            
            dispatch('computeGainCosts', { id:id, count:1 }).then(costs => {
                let compare = costCompare(costs, state.items[id].gainCosts[0])
                if (compare == false) { state.items[id].gainCosts[0] = JSON.parse(JSON.stringify(costs)) }
                costs = null
            })
            dispatch('computeGainCosts', { id:id, count:5 }).then(costs => {
                let compare = costCompare(costs, state.items[id].gainCosts[1])
                if (compare == false) { state.items[id].gainCosts[1] = JSON.parse(JSON.stringify(costs)) }
                costs = null
            })
            dispatch('computeGainCosts', { id:id, count:10 }).then(costs => {
                let compare = costCompare(costs, state.items[id].gainCosts[2])
                if (compare == false) { state.items[id].gainCosts[2] = JSON.parse(JSON.stringify(costs)) }
                costs = null
            })
            dispatch('computeGainCosts', { id:id, count:20 }).then(costs => {
                let compare = costCompare(costs, state.items[id].gainCosts[3])
                if (compare == false) { state.items[id].gainCosts[3] = JSON.parse(JSON.stringify(costs)) }
                costs = null
            })
        },
        
        updateCanGain({ state, dispatch }, id) {

            dispatch('computeCanGain', { id:id, count:1 }).then(can => {
                if (can != state.items[id].canGain[0]) state.items[id].canGain[0] = can
            })
            dispatch('computeCanGain', { id:id, count:5 }).then(can => {
                if (can != state.items[id].canGain[1]) state.items[id].canGain[1] = can
            })
            dispatch('computeCanGain', { id:id, count:10 }).then(can => {
                if (can != state.items[id].canGain[2]) state.items[id].canGain[2] = can
            })
            dispatch('computeCanGain', { id:id, count:20 }).then(can => {
                if (can != state.items[id].canGain[3]) state.items[id].canGain[3] = can
            })
        },
        
        updateBuildingCosts({ state, getters, dispatch }, id) {
            
            dispatch('computeBuildCosts', { id:id, count:1 }).then(costs => {
                let compare = costCompare(costs, state.items[id].costs[0])
                if (compare == false) { state.items[id].costs[0] = JSON.parse(JSON.stringify(costs)) }
                costs = null
            })
            dispatch('computeBuildCosts', { id:id, count:5 }).then(costs => {
                let compare = costCompare(costs, state.items[id].costs[1])
                if (compare == false) { state.items[id].costs[1] = JSON.parse(JSON.stringify(costs)) }
                costs = null
            })
            dispatch('computeBuildCosts', { id:id, count:25 }).then(costs => {
                let compare = costCompare(costs, state.items[id].costs[2])
                if (compare == false) { state.items[id].costs[2] = JSON.parse(JSON.stringify(costs)) }
                costs = null
            })
            dispatch('computeBuildCosts', { id:id, count:100 }).then(costs => {
                let compare = costCompare(costs, state.items[id].costs[3])
                if (compare == false) { state.items[id].costs[3] = JSON.parse(JSON.stringify(costs)) }
                costs = null
            })
            dispatch('computeBuildCosts', { id:id, count:state.items[id].maxBuildCount }).then(costs => {
                let compare = costCompare(costs, state.items[id].costs[4])
                if (compare == false) { state.items[id].costs[4] = JSON.parse(JSON.stringify(costs)) }
                costs = null
            })
            
            if ('next' in state.items[id].build) {
                dispatch('computeBuildCosts', { id:id, count:getters.getBuildNextCount(id) }).then(costs => {
                    let compare = costCompare(costs, state.items[id].costs[5])
                    if (compare == false) { state.items[id].costs[5] = JSON.parse(JSON.stringify(costs)) }
                    costs = null
                })
            }
        },
        
        updateCanBuild({ state, getters, dispatch }, id) {

            dispatch('computeCanBuild', { id:id, count:1 }).then(can => {
                if (can != state.items[id].canBuild[0]) state.items[id].canBuild[0] = can
            })
            dispatch('computeCanBuild', { id:id, count:5 }).then(can => {
                if (can != state.items[id].canBuild[1]) state.items[id].canBuild[1] = can
            })
            dispatch('computeCanBuild', { id:id, count:25 }).then(can => {
                if (can != state.items[id].canBuild[2]) state.items[id].canBuild[2] = can
            })
            dispatch('computeCanBuild', { id:id, count:100 }).then(can => {
                if (can != state.items[id].canBuild[3]) state.items[id].canBuild[3] = can
            })
            dispatch('computeCanBuild', { id:id, count:state.items[id].maxBuildCount }).then(can => {
                if (can != state.items[id].canBuild[4]) state.items[id].canBuild[4] = can
            })

            if ('next' in state.items[id].build) {
                dispatch('computeCanBuild', { id:id, count:getters.getBuildNextCount(id) }).then(can => {
                    if (can != state.items[id].canBuild[5]) state.items[id].canBuild[5] = can
                })
            }
        },
        
        updateUpgradeCosts({ state, dispatch }, id) {
            
            dispatch('computeUpgradeCosts', { id:id }).then(costs => {
                let compare = costCompare(costs, state.items[id].upgradeCosts)
                if (compare == false) { state.items[id].upgradeCosts = JSON.parse(JSON.stringify(costs)) }
                costs = null
            })
        },
        
        updateCanUpgrade({ state, dispatch }, id) {

            dispatch('computeCanUpgrade', { id:id }).then(can => {
                if (can != state.items[id].canUpgrade) state.items[id].canUpgrade = can
            })
        },
        
        /*--------------------------------------------------------------------*/
        gain({ state, getters, dispatch }, payload) {
            
            let can = getters.canGain(payload.id, payload.count)
            if (can == 0) {
                
                let item = state.items[payload.id]
                
                if ('costs' in item.gain) {
                    
                    let costs = getters.getGainCosts(payload.id, payload.count)
                    costs.forEach(cost => { state.items[cost.id].count -= cost.count })
                }
                
                item.count += payload.count
                item.count = Math.min(item.count, getters.getItemStorage(payload.id))
                
                dispatch('updateGainCosts', payload.id)
                dispatch('updateCanGain', payload.id)
            }
        },
        
        convert({ state, getters }, payload) {
            
            let can = getters['conversion/can'](payload.id)
            if (can == 0) {
                
                let item = state.items[payload.id]
                
                let cost = getters['conversion/cost'](payload.id, payload.count)
                state.items[cost.id].count -= cost.count
                
                item.count += payload.count
                item.count = Math.min(item.count, getters.getItemStorage(payload.id))
            }
        },
        
        upgrade({ state, getters, dispatch }, payload) {
            
            let can = getters.canUpgrade(payload.id)
            if (can == 0) {
                
                let item = state.items[payload.id]
                
                if ('costs' in item.storage) {
                    
                    let costs = getters.getUpgradeCosts(payload.id)
                    costs.forEach(cost => { state.items[cost.id].count -= cost.count; if (state.items[cost.id].count < 0) console.log(state.items[cost.id]) })
                }
                
                item.upgrade += 1
                
                dispatch('updateUpgradeCosts', payload.id)
                dispatch('updateCanUpgrade', payload.id)
            }
        },

        /*--------------------------------------------------------------------*/
        build({ state, getters, dispatch }, payload) {
            
            let can = getters.canBuild(payload.id, payload.count)
            if (can == 0 || can == -5) {
                
                let item = state.items[payload.id]
                
                let costs = getters.getBuildCosts(payload.id, payload.count)
                if (costs) costs.forEach(cost => { state.items[cost.id].count -= cost.count })
                
                item.count += payload.count
                
                if ('hides' in item && item.count >= item.max) item.hides.forEach(id => { if (!state.hidden.includes(id)) state.hidden.push(id) })
                if ('notifs' in item && item.count >= item.max) item.notifs.forEach(id => { if (!state.notified.includes(id)) state.notified.push(id) })
                if ('collapses' in item && item.count >= item.max) item.collapses.forEach(id => { if (!state.collapsed.includes(id)) state.collapsed.push(id) })
                
                if ('unlocks' in item && item.count >= item.max) item.unlocks.forEach(id => { state.items[id].unlocked = true })
                
                if ('modOutput' in item) {
                    for (let i in state.items) {
                        let it = state.items[i]
                        if ('outputs' in it)
                            it.outputs.forEach(output => { if (output.id == item.modOutput.id) { output.mod += payload.count * item.modOutput.mod } })
                    }
                    dispatch('updateItemProd', item.modOutput.id)
                }
                
                if ('modCost' in item) {
                    console.log('coucou1')
                    for (let i in state.items) {
                        let it = state.items[i]
                        if ('build' in it && 'costs' in it.build)
                            it.build.costs.forEach(cost => { if (cost.id == item.modCost.id) cost.mod += payload.count * item.modCost.mod })
                    }
                }
                
                if ('onBuild' in item) item.onBuild(state)
                
                dispatch('updateMaxBuildCount', payload.id)                
                dispatch('updateBuildingCosts', payload.id)
                dispatch('updateCanBuild', payload.id)
                
                if ('inputs' in item) {
                    for (let j in item.inputs) {
                        let input = item.inputs[j]
                        dispatch('updateItemProd', input.id)
                    }
                }
                
                if ('outputs' in item) {
                    for (let j in item.outputs) {
                        let output = item.outputs[j]
                        dispatch('updateItemProd', output.id)
                    }
                }
            }
        },
        
        destroy({ state, getters, dispatch }, payload) {
            
            let can = getters.canDestroy(payload.id, payload.count)
            if (can) {
                
                let item = state.items[payload.id]
                item.count -= payload.count
                
                dispatch('updateMaxBuildCount', payload.id)                
                dispatch('updateBuildingCosts', payload.id)
                dispatch('updateCanBuild', payload.id)
                
                if ('inputs' in item) {
                    for (let j in item.inputs) {
                        let input = item.inputs[j]
                        dispatch('updateItemProd', input.id)
                    }
                }
                
                if ('outputs' in item) {
                    for (let j in item.outputs) {
                        let output = item.outputs[j]
                        dispatch('updateItemProd', output.id)
                    }
                }
            }
        },
        
        meet({ state }) {
            
            var item = state.items['missionOverlord']
            item.count = 1
        },
        
        boost({ state, dispatch }, payload) {
            
            if (state.items['darkmatter'].count >= payload.count) {
                
                state.items['darkmatter'].count -= payload.count
                
                let item = state.items[payload.id]
                item.count += payload.count
                
                for (let i in state.items) {
                    let it = state.items[i]
                    if ('outputs' in it)
                        it.outputs.forEach(output => { if (output.id == item.modOutput.id) output.mod += payload.count * item.modOutput.mod })
                }
            
                dispatch('updateItemProd', item.modOutput.id)
            }
        },
        
        /*--------------------------------------------------------------------*/
        explore({ state, getters }, payload) {
            
            let can = getters.canExplore(payload)
            if (can == 0) {
                
                let item = state.items[payload]
                item.status = 'explored'
                
                let costs = getters.getExploreCosts(payload)
                costs.forEach(cost => { state.items[cost.id].count -= cost.count })
            }
        },
        
        conquer({ state, getters }, payload) {
            
            let can = getters.canConquer(payload)
            if (can == 0) {
                
                let item = state.items[payload]
                item.status = 'conquered'
                
                state.items['dysonT3'].max += 1
                state.items['antimatter'].storage.count += 100000
                state.items['conquest'].count += 1
                state.statsTotalConquests += 1
                
                for (let i in state.items) {
                    let it = state.items[i]
                    if ('outputs' in it)
                        it.outputs.forEach(output => {
                            if (item.resources.includes(output.id)) {
                                output.mod += 0.25
                                if (item.donor == true) output.mod += 0.25
                            }
                        })
                }
            }
        },
        
        statue({ state, getters }, payload) {
            
            let can = getters['statue/can'](payload)
            if (can == 0) {
                
                let item = state.items[payload]
                item.status = 'statued'
                
                state.items['statue'].count += 1
                state.statsTotalStatues += 1
                
                let costs = getters['statue/costs'](payload)
                costs.forEach(cost => { state.items[cost.id].count -= cost.count })
                
                let cardId = payload + 'Card'
                if (!state.collapsed.includes(cardId)) state.collapsed.push(cardId)
            }
        },
        
        /*--------------------------------------------------------------------*/
        rebirth({ state, getters, dispatch }) {
            
            state.items['darkmatter'].count += getters.getDMPotential
            state.statsLastRebirth = new Date().getTime()
            state.statsTotalRebirths += 1
            
            dispatch('reset')
        },
        
        enlighten({ state, getters, dispatch }) {
            
            state.items['ultrite'].count += getters.getULPotential
            state.statsLastEnlighten = new Date().getTime()
            state.statsTotalEnlightens += 1
            
            dispatch('reset')
        },
        
        reset({ state, dispatch }) {
            
            state.resetIds.forEach(id => {
                
                let item = state.items[id]
                if ('count' in item) item.count = 0
                if ('upgrade' in item) item.upgrade = 0
                if ('status' in item) item.status = 'new'
                if ('progress' in item) item.progress = 0
                if ('prod' in item) item.prod = 0
            })
            
            state.items['dysonT3'].max = 1
            state.items['antimatter'].storage.count = 100000
            
            for (let i in state.items) {
                let item = state.items[i]
                
                if ('status' in item) item.unlocked = false
                if ('outputs' in item) item.outputs.forEach(output => { output.mod = 1.0 })
                if ('build' in item && 'costs' in item.build) item.build.costs.forEach(cost => { cost.mod = 1.0 })
            }
            
            dispatch('onLoad')
        },
    },
})