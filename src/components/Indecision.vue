<template>
    <img v-if="img" :src="img" alt="bg">
    <div class="bg-dark">
        <div class="container">
            <div class="indecision-container">
                <div class="input-group mb-3">
                    <span class="input-group-text" id="basic-addon3">Hazme una pregunta</span>
                    <input type="text" class="form-control" placeholder="Preguntame..." v-model="question">
                </div>
                <p>Recuerda terminar con un signo de interrogación (?)</p>
                <div v-if="isValidQuestion">
                    <h2>{{ question }}</h2>
                    <h1>{{ answer }}</h1>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Indecisdion',
    data() {
        return {
            question: null,
            answer: null,
            img: null,
            isValidQuestion: false
        }
    },
    methods: {
        async getAnswer() {
            try {
                this.answer = 'Pensando...'
                const { answer, image } = await fetch('https://yesno.wtf/api').then(resp => resp.json())
                this.answer = answer === 'yes' ? 'Sii!' : 'Noo!'
                this.img = image
            } catch (error) {
                console.log('IndecisionComponent: ', error)
                this.answer = 'No se pudo cargar del API'
                this.img = null
            }
        }
    },
    watch: {
        question(value, oldValue) {
            this.isValidQuestion = false
            this.img = null
            if (!value.includes('?')) return
            this.isValidQuestion = true
            this.getAnswer()
        }
    }
}
</script>

<style scoped>
img {
    height: calc(100% - 160px);
    left: 0px;
    max-height: 100%;
    max-width: 100%;
    position: fixed;
    top: 90px;
    width: 100vw;
}

.bg-dark {
    display: flex;
    align-items: center;
    justify-content: center;
    height: calc(100vh - 160px);
    max-height: 100%;
    max-width: 100%;
    position: relative;
}

.bg-dark {
    background-color: rgba(0, 0, 0, 0.4) !important;
}

.indecision-container {
    position: relative;
    text-align: center;
    z-index: 0;
}


p {
    color: white;
    font-size: 20px;
    margin-top: 0px;
}

h1,
h2 {
    color: white;
}

h2 {
    margin-top: 190px;
}
</style>