Vue.component('country-detail', {
    props: {
        detail: {}
    },
    data: () => {
        return {
            count: 5,
        }
    },
    template: `
        <div id="detailByCountry">
            <div class="card card-padding" style="text-align: center">
                <p style="font-size: 36px">{{this.live.Country}}</p>
                <div v-on:click="close" id="detail-back-button" style="cursor: pointer;"><< Back</div>
            </div>
            <div class="card-wrapper wrapper-inline">
                <total title="Cas"
                       :date="this.live.Date" 
                       :value="this.live.Confirmed"
                       :progress="this.progression.confirmed"/>
                <total title="Mort"
                       :date="this.live.Date" 
                       :value="this.live.Deaths"
                       :progress="this.progression.deaths"
                       number-class="deaths"/>
                <total title="Soignés"
                       :isGood="true"
                       :date="this.live.Date" 
                       :value="this.live.Recovered"
                       :progress="this.progression.recovered"
                       number-class="recovered"/>
            </div>
            
            <div class="card card-padding chart-container">
                <canvas id="seekChart" width="100" height="100"></canvas>
            </div>
           
        </div>
    `,
    computed: {
        live: function () {
            return this.detail[this.detail.length - 1]
        },

        progression: function () {
            const count = 2;
            const last = this.latest(count);

            return {
                confirmed : last.reduce((accumulator, data) => data.Confirmed - accumulator , 0)/count,
                deaths : last.reduce((accumulator, data) => data.Deaths - accumulator , 0)/count,
                recovered : last.reduce((accumulator, data) => data.Recovered - accumulator , 0)/count,
            };
        }

    },
    methods: {
        close: function () {
            this.$emit('close');
        },

        latest: function (number) {
            return this.detail.slice(Math.max(this.detail.length - number, 1))
        },

        initChart: function () {
            const last = this.latest(this.count);
            const date = last.map(data => new Date(data.Date).toDateString());
            const confirmed = last.map(data => data.Confirmed);

            const ctx = document.getElementById('seekChart');
            new Chart(ctx, {
                type: 'line',
                data: {
                    labels: date,
                    datasets: [{
                        label: 'Les 5 derniers jours',
                        data: confirmed,
                        backgroundColor: [
                            'rgba(153, 102, 255, 0.2)',
                        ],
                        borderColor: [
                            'rgba(153, 102, 255, 1)',
                        ],
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: false
                            }
                        }]
                    }
                }
            });
        }
    },
    mounted() {
        this.initChart()
    }
})
