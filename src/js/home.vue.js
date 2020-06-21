Vue.component('home-page', {
    props: {
        displayed: false
    },
    data: () => {
        return {
            rightGestures: [
                {
                    img: '/static/hand-wash.svg',
                    text: 'Se laver régulièrement les mains',
                },
                {
                    img: '/static/face.svg',
                    crossed: true,
                    text: 'Éviter de se toucher le visage',
                },
                {
                    img: '/static/cough.svg',
                    text: 'Tousser ou éternuer dans son coude ou dans son mouchoir',
                },
                {
                    img: '/static/social-distancing.svg',
                    text: 'Respecter une distance d’au moins un mètre avec les autres',
                },
                {
                    img: '/static/handkerchief.svg',
                    text: 'Se moucher dans un mouchoir à usage unique puis le jeter',
                },
                {
                    img: '/static/hand-shakes.svg',
                    crossed: true,
                    text: 'Saluer sans serrer la main et arrêter les embrassades',
                },
            ]
        }
    },
    template: `
        <div id="home-about">
            <div id="stay-informed" class="card card-padding">
                <div>
                    <img class="icon icon-big" src="/static/images/mask.svg" alt="mask">
                </div>
                <p class="paragraph">
                    Grâce à l’engagement et la responsabilité de chacun, aussi bien pendant le confinement que dans le
                    déconfinement, la crise sanitaire du COVID-19 qui touche la France depuis le mois de mars 2020
                    marque le
                    pas.

                    La vigilance reste nécessaire et l’État se tient plus que jamais aux côtés des Français fragilisés
                    par
                    la crise.
                </p>
                <p class="paragraph">
                    En l’absence de traitement, la meilleure des protections pour vous et pour vos proches est, en
                    permanence, le respect des mesures barrières et de la distanciation physique. En complément, portez
                    un
                    masque quand la distance d’un mètre ne peut pas être respectée.
                </p>
            </div>
            
            <div id="right-gestures" class="card-wrapper wrapper-inline">
                <div v-for="gesture in rightGestures"
                     class="right-gesture card card-padding">
                    <div class="image-wrapper">
                        <div v-if="gesture.crossed" class="crossed">
                            
                        </div>
                        <img :src="gesture.img" :class="gesture.class" alt="gesture">
                    </div>
                    <p class="paragraph">
                        {{ gesture.text }}
                    </p>
                </div>
            </div>

        </div>
    `,
    watch: {
        displayed: function (current) {

        }
    },
    methods: {
        setDisplayed: function (displayed) {
            this.displayed = displayed;
        },
    },
})
