Vue.component('home-page', {
    props : {
        displayed : false
    },
    template: `
        <div id="home-about" class="card card-padding">
            <div>
                <img class="icon icon-big" src="/static/images/mask.svg" alt="mask">
            </div>
            <p class="paragraph">
                Grâce à l’engagement et la responsabilité de chacun, aussi bien pendant le confinement que dans le
                déconfinement, la crise sanitaire du COVID-19 qui touche la France depuis le mois de mars 2020 marque le
                pas.

                La vigilance reste nécessaire et l’État se tient plus que jamais aux côtés des Français fragilisés par
                la crise.
            </p>
            <p class="paragraph">
                En l’absence de traitement, la meilleure des protections pour vous et pour vos proches est, en
                permanence, le respect des mesures barrières et de la distanciation physique. En complément, portez un
                masque quand la distance d’un mètre ne peut pas être respectée.
            </p>
        </div>
    `,
    watch: {
        displayed: function (current) {

        }
    },
    methods: {
        setDisplayed: function(displayed) {
            this.displayed = displayed;
        },
    },
})
