const violetBouquet = {
    constants: {
        TITLE: 'Para ti, mi amor',
        TEXT: 'Un ramo que nunca se marchita 💜',
        COVER_TITLE: 'Tengo algo para ti',
        COVER_HINT: 'Pulsa para descubrirlo',
        COVER_BUTTON: 'Abrir',
        COVER_LEAVE_ANIMATION: 'cover-leave',
        STAR_COUNT: 45,
        RAIN_COUNT: 22,
        RAIN_START_S: 3.8,
        LAVENDER_BUDS: 9,
        PETALS_BY_TYPE: {
            daisy: 12,
            anemone: 6,
            violet: 5,
        },
        // El orden es el de pintado: las primeras quedan detrás.
        FLOWERS: [
            { type: 'lavender', rot: -27, h: 25, delay: 0.95 },
            { type: 'lavender', rot: 26, h: 26, delay: 1 },
            { type: 'lavender', rot: 15, h: 31, delay: 0.9 },
            { type: 'daisy', color: 'lila', rot: -19, h: 26, delay: 0.75 },
            { type: 'daisy', color: 'lavanda', rot: 21, h: 23, delay: 0.8 },
            { type: 'anemone', color: 'orquidea', rot: 9, h: 28, delay: 0.65 },
            { type: 'violet', color: 'violeta', rot: -2, h: 32, delay: 0.55 },
            { type: 'anemone', color: 'morado', rot: -10, h: 27, delay: 0.6 },
            { type: 'violet', color: 'lila', rot: -16, h: 20, delay: 0.85 },
            { type: 'daisy', color: 'violeta', rot: 4, h: 22, delay: 0.7 },
        ],
    },

    globals: {
        isOpen: false,
    },

    elements: {
        app: '#app',
        cover: '.cover',
        btnOpen: '.cover__button',
        messageTitle: '.message__title',
    },

    /**
     * Pinta el cielo y la portada y engancha los eventos.
     */
    init() {
        const self = violetBouquet;

        self.renderStars();
        self.renderCover();
        self.listeners();
    },

    /**
     * Registra los eventos delegados en el contenedor de la página.
     */
    listeners() {
        const self = violetBouquet;
        const { elements, constants } = self;
        const app = document.querySelector(elements.app);

        app.addEventListener('click', function (event) {
            if (event.target.closest(elements.btnOpen)) {
                self.open();
            }
        });

        app.addEventListener('animationend', function (event) {
            if (event.animationName === constants.COVER_LEAVE_ANIMATION) {
                self.showBouquet(event.target);
            }
        });
    },

    /**
     * Arranca la salida de la portada; el ramo aparece cuando termina.
     */
    open() {
        const self = violetBouquet;
        const { elements, globals } = self;

        if (globals.isOpen) {
            return;
        }

        globals.isOpen = true;
        document.querySelector(elements.btnOpen).disabled = true;
        document.querySelector(elements.cover).classList.add('cover--leaving');
    },

    /**
     * Quita la portada y pinta el ramo, que se anima solo con CSS.
     *
     * @param {HTMLElement} cover
     */
    showBouquet(cover) {
        const self = violetBouquet;
        const { elements } = self;

        cover.remove();
        document.querySelector(elements.app).insertAdjacentHTML('beforeend', self.buildScene());
        document.querySelector(elements.messageTitle).focus({ preventScroll: true });
    },

    /**
     * Pinta las estrellas del fondo.
     */
    renderStars() {
        const self = violetBouquet;
        const { elements, constants } = self;
        const stars = Array.from({ length: constants.STAR_COUNT }, function () {
            return `<span class="star" style="--x: ${self.randomBetween(0, 100)}%; --y: ${self.randomBetween(0, 100)}%; --s: ${self.randomBetween(1, 3)}px; --t: ${self.randomBetween(1.5, 4)}s; --d: ${self.randomBetween(0, 3)}s;"></span>`;
        }).join('');

        document.querySelector(elements.app).insertAdjacentHTML('afterbegin', `<div class="stars" aria-hidden="true">${stars}</div>`);
    },

    /**
     * Pinta la portada con el botón de abrir.
     */
    renderCover() {
        const self = violetBouquet;
        const { elements, constants } = self;

        document.querySelector(elements.app).insertAdjacentHTML('beforeend', `<section class="cover">
            <div class="cover__card">
                <div class="cover__heart" aria-hidden="true"></div>
                <h1 class="cover__title">${constants.COVER_TITLE}</h1>
                <p class="cover__hint">${constants.COVER_HINT}</p>
                <button type="button" class="cover__button">${constants.COVER_BUTTON}</button>
            </div>
        </section>`);
    },

    /**
     * Construye la escena completa: mensaje, ramo y lluvia de pétalos.
     *
     * @returns {string}
     */
    buildScene() {
        const self = violetBouquet;
        const { constants } = self;
        const stems = constants.FLOWERS.map(function (flower, index) {
            return self.buildStem(flower, index);
        }).join('');

        return `<section class="scene">
            <header class="message">
                <h1 class="message__title" tabindex="-1">${constants.TITLE}</h1>
                <p class="message__text">${constants.TEXT}</p>
            </header>
            <div class="bouquet" role="img" aria-label="Ramo de flores violetas">
                <div class="wrap wrap--back"></div>
                ${stems}
                <div class="wrap wrap--front"></div>
                <div class="bow">
                    <span class="bow__tail bow__tail--left"></span>
                    <span class="bow__tail bow__tail--right"></span>
                    <span class="bow__loop bow__loop--left"></span>
                    <span class="bow__loop bow__loop--right"></span>
                    <span class="bow__knot"></span>
                </div>
            </div>
        </section>
        <div class="petal-rain" aria-hidden="true">${self.buildRain()}</div>`;
    },

    /**
     * Construye un tallo con su hoja y su flor o espiga.
     *
     * @param {{type: string, color?: string, rot: number, h: number, delay: number}} flower Ángulo en grados, altura en em y retardo en segundos.
     * @param {number} index Alterna el lado y la altura de la hoja.
     * @returns {string}
     */
    buildStem(flower, index) {
        const self = violetBouquet;
        const leafAngle = index % 2 ? -150 : -30;
        const leafHeight = 30 + (index % 3) * 7;
        const head = flower.type === 'lavender' ? self.buildSpike() : self.buildFlower(flower.type, flower.color);

        return `<div class="stem" style="--rot: ${flower.rot}deg; --h: ${flower.h}em; --delay: ${flower.delay}s;">
            <span class="leaf" style="--y: ${leafHeight}%; --ang: ${leafAngle}deg;"></span>
            ${head}
        </div>`;
    },

    /**
     * Construye una flor con sus pétalos en círculo.
     *
     * @param {string} type daisy, anemone o violet.
     * @param {string} color Paleta de bouquet.css (lila, violeta, morado, orquidea, lavanda).
     * @returns {string}
     */
    buildFlower(type, color) {
        const self = violetBouquet;
        const count = self.constants.PETALS_BY_TYPE[type];
        const petals = Array.from({ length: count }, function (item, index) {
            return `<span class="petal" style="--i: ${index}; --a: ${(360 / count) * index}deg;"></span>`;
        }).join('');

        return `<div class="flower flower--${type} flower--${color}">${petals}<span class="flower__center"></span></div>`;
    },

    /**
     * Construye una espiga de lavanda con las yemas alternando de lado.
     *
     * @returns {string}
     */
    buildSpike() {
        const self = violetBouquet;
        const last = self.constants.LAVENDER_BUDS - 1;
        const buds = Array.from({ length: last + 1 }, function (item, index) {
            const tilt = index === last ? 0 : (index % 2 ? 28 : -28);

            return `<span class="bud" style="--i: ${index}; --tilt: ${tilt}deg;"></span>`;
        }).join('');

        return `<div class="spike">${buds}</div>`;
    },

    /**
     * Construye los pétalos que caen cuando el ramo ya está abierto.
     *
     * @returns {string}
     */
    buildRain() {
        const self = violetBouquet;
        const { constants } = self;

        return Array.from({ length: constants.RAIN_COUNT }, function () {
            const delay = constants.RAIN_START_S + self.randomBetween(0, 8);

            return `<span class="falling-petal" style="--x: ${self.randomBetween(0, 100)}%; --s: ${self.randomBetween(0.6, 1.1)}rem; --dur: ${self.randomBetween(7, 13)}s; --delay: ${delay}s; --drift: ${self.randomBetween(-20, 20)}vw; --spin: ${self.randomBetween(180, 720)}deg;"></span>`;
        }).join('');
    },

    /**
     * Devuelve un número aleatorio con dos decimales.
     *
     * @param {number} min
     * @param {number} max
     * @returns {number}
     */
    randomBetween(min, max) {
        return Math.round((min + Math.random() * (max - min)) * 100) / 100;
    },
};

violetBouquet.init();
