Vue.component('dashboard-page', {
    props: {
        displayed: false
    },
    data: () => {
        return {
            total: {},
            countries: [],
            displayedCountries: [],
            detailedCountry: {},
        }
    },
    template: `
        <div id="dashboard" @reloadPage="reload()">
            <div v-if="!this.isCountryDetail">
                <div class="card-wrapper wrapper-inline">
                    <total title="Cas"
                           :value=this.total.TotalConfirmed
                           :date="this.total.lastUpdate"
                           :progress="this.total.NewConfirmed"/>
                    <total title="Mort"
                           :value=this.total.TotalDeaths
                           :date="this.total.lastUpdate"
                           :progress="this.total.NewDeaths"
                           number-class="deaths"/>
                    <total title="Soignés"
                           :value=this.total.TotalRecovered
                           :date="this.total.lastUpdate"
                           :progress="this.total.NewRecovered"
                           is-good="true"
                           number-class="recovered"/>
                </div>


                <div id="countries"
                     class="card card-padding">
                    <div id="dashboard-filter">
                        <input type="text" class="search-bar" @change="search" placeholder="Rechercher un pays"/>
                        <div class="reload" @click="reload">
                            <img src="/static/refresh.svg" alt="reload">
                        </div>
                    </div>

                    <page-table :header="['Pays', 'Cas', 'Morts', 'Soignés']"
                                :data="this.displayedCountries"
                                :number-per-page="14">
                        <template v-slot:default="props">
                            <tr v-for="country in props.data" v-on:click="showDetail(country.Slug)">
                                <td>{{ country.Country }}</td>
                                <td>
                                    <number :value="country.TotalConfirmed"/>
                                </td>
                                <td>
                                    <number :value="country.TotalDeaths" class="deaths"/>
                                </td>
                                <td>
                                    <number :value="country.TotalRecovered" class="recovered"/>
                                </td>
                            </tr>
                        </template>

                    </page-table>
                </div>
            </div>

            <component :detail="this.detailedCountry"
                       @close="hideDetail"
                       is="country-detail"
                       v-if="this.isCountryDetail"></component>
        </div>
    `,
    watch: {
        displayed: function (current) {
            if (current) {
                this.getData();
            } else {
                this.hideDetail()
            }
        },
    },
    computed: {
        isCountryDetail: function () {
            return this.detailedCountry.length > 0
        }
    },
    methods: {
        reload: function() {
            this.displayedCountries = this.countries;
        },

        // ALl COUNTRIES DATA
        search: function (event) {
            this.displayedCountries = this.countries.filter(country => {
                return country.Country
                    .toLowerCase()
                    .includes(event.target.value.toLowerCase())
            })
        },

        getData: function () {
            this.getSummary()
        },

        getSummary: function () {
            axios.get(`https://api.covid19api.com/summary`)
                .then(function (res) {
                    this.total = res.data.Global;
                    this.total.lastUpdate = new Date().toDateString()
                    this.countries = this.displayedCountries = res.data.Countries
                }.bind(this))
        },


        // DETAIL SECTION

        hideDetail: function () {
            this.detailedCountry = {}
            this.reload()
        },

        showDetail: function (slug) {
            this.getDetail(slug)
        },

        getDetail: function (slug) {
            axios.get(`https://api.covid19api.com/country/${slug}`)
                .then(function (res) {
                    this.detailedCountry = res.data
                }.bind(this))
        },
    }
})
