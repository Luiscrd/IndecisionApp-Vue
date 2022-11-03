import { shallowMount } from '@vue/test-utils'
import Indecision from '@/components/Indecision.vue'

describe('Indecision Component', () => {

    let wrapper;

    let getAnswerSpy;

    global.fetch = jest.fn(() => Promise.resolve({
        json: () => Promise.resolve({
            "answer": "yes",
            "forced": false,
            "image": "https://yesno.wtf/assets/yes/10-271c872c91cd72c1e38e72d2f8eda676.gif"
        })
    }))

    beforeEach(() => {

        wrapper = shallowMount(Indecision)

        getAnswerSpy = jest.spyOn(wrapper.vm, 'getAnswer')

        jest.clearAllMocks()

    });

    test('Debe de hacer mach con el snapshot', () => {

        expect(wrapper.html()).toMatchSnapshot()

    })

    test('Debe de existir el elemnto input', () => {

        const input = wrapper.find('input')

        expect(input.exists()).toBeTruthy()

    })

    test('Al escribir en el input no se debe disparar nada', async () => {


        const input = wrapper.find('input')

        await input.setValue('Hola mundo')

        expect(getAnswerSpy).toHaveBeenCalledTimes(0)


    })

    test('Al escribir en el input el simbolo "?" se debe de lanzar el fech', async () => {

        const input = wrapper.find('input')

        await input.setValue('Hola mundo?')

        expect(getAnswerSpy).toHaveBeenCalledTimes(1)


    })

    test('Pruebas en getAswer', async () => {

        await wrapper.vm.getAnswer()

        const img = wrapper.find('img')

        expect(img.exists()).toBeTruthy()

        expect(wrapper.vm.img).toBe('https://yesno.wtf/assets/yes/10-271c872c91cd72c1e38e72d2f8eda676.gif')

        expect(wrapper.vm.answer).toBe('Sii!')


    })

    test('Pruebas en getAswer - Fallo en el API', async () => {

        fetch.mockImplementationOnce(() => Promise.reject('API is down'))

        await wrapper.vm.getAnswer()

        const img = wrapper.find('img')

        expect(img.exists()).toBeFalsy()

        expect(wrapper.vm.answer).toBe('No se pudo cargar del API')

    })

})