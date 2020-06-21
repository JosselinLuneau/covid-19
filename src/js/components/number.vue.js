Vue.component('number', {
    props: {
        value: {
            type: Number,
            required: true,
        },
        class : ""
    },
    template: `        
        <span class="number" :class="this.class" >
            {{ this.formatNumber(this.value) }}
        </span>
    `,
    methods: {
        formatNumber: function (value) {
            value = Math.ceil(value)
            if (value) {
                return value.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
            }

            return value
        }
    }
})
