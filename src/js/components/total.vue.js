Vue.component('total', {
    props: {
        title: "",
        value: {
            type: Number,
            required: true,
        },
        date: {
            type: Date,
            required: true,
        },
        isGood: false,
        progress: 0,
        numberClass: "",
    },
    template: `
        <div class="total card card-padding">
            <div>
                <p class="total-title">{{this.title}}</p>
                <number :value="this.value" :class="this.numberClass"/>
            </div>
            <p class="date">
                {{ this.date}}
            </p>
            <div class="progress card card-padding number"
                 :class="this.state"
                 v-if="this.progress">
                <img class="indicator"
                     :class="this.stateIcon"
                     :src="this.progression.icon"
                     v-if="this.progress !== 0"
                     alt="">
                <number :value="this.progression.value"
                        :class="this.state"/>
            </div>
        </div>
    `,
    computed: {
        progression: function () {
            return {
                value: this.progress,
                icon: (this.progress <= 0 || this.isGood ? "/static/arrow-positive.svg" : "/static/arrow-negative.svg")
            }
        },

        stateIcon: function () {
            return {
                positive: this.progress < 0,
                negative: this.progress > 0,
            }
        },

        state: function () {
            return {
                positive: this.progress < 0 || this.isGood,
                negative: this.progress > 0
            }
        }
    },
    mounted() {
        this.date = new Date(this.date).toDateString()
    }
})
