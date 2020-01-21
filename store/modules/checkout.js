let branch = window.localStorage.getItem('branch')
let shipping_method = window.localStorage.getItem('shipping_method')
let note = window.localStorage.getItem('note')
let shipping_address = window.localStorage.getItem('shipping_address')
let courier = window.localStorage.getItem('courier')
let shipment = window.localStorage.getItem('shipment')
let unique_code = window.localStorage.getItem('unique_code')
let total_payment = window.localStorage.getItem('total_payment')
let delivery_address = window.localStorage.getItem('delivery_address')

const checkout = {
    namespaced: true,
    state: {
        branch: branch ? JSON.parse(branch) : [],
        shipping_method: shipping_method ? shipping_method : false,
        note: note ? note : false,
        shipping_address: shipping_address ? shipping_address : false,
        courier: courier ? courier : false,
        shipment: shipment ? JSON.parse(shipment) : false,
        unique_code: unique_code ? unique_code : false,
        total_payment: total_payment ? total_payment : false,
        delivery_address: delivery_address ? delivery_address : false
    },
    mutations: {
        setBranch(state, branch) {
            state.branch = branch
            window.localStorage.setItem('branch', JSON.stringify(branch))
        },
        setShippingMethod(state, shipping_method) {
            state.shipping_method = shipping_method
            window.localStorage.setItem('shipping_method', shipping_method)
        },
        setNote(state, note) {
            state.note = note
            window.localStorage.setItem('note', note)
        },
        setShippingAddress(state, shipping_address) {
            state.shipping_address = shipping_address
            window.localStorage.setItem('shipping_address', shipping_address)
        },
        setCourier(state, courier) {
            state.courier = courier

            if (courier == false) {
                localStorage.removeItem('courier');
            } else {
                window.localStorage.setItem('courier', courier)
            }
        },
        setShipment(state, shipment) {
            state.shipment = shipment
            window.localStorage.setItem('shipment', JSON.stringify(shipment))
        },
        setUniqueCode(state, unique_code) {
            state.unique_code = unique_code
            window.localStorage.setItem('unique_code', unique_code)
        },
        setTotalPayment(state, total_payment) {
            state.total_payment = total_payment
            window.localStorage.setItem('total_payment', total_payment)
        },
        setDeliveryAddress(state, delivery_address) {
            state.delivery_address = delivery_address
            window.localStorage.setItem('delivery_address', delivery_address)
        },
        reset(state) {

            state.branch = []
            state.shipping_method = false
            state.note = false
            state.shipping_address = false
            state.courier = false
            state.shipment = false,
            state.unique_code = false,
            state.total_payment = false,
            state.delivery_address = false

            window.localStorage.removeItem('branch')
            window.localStorage.removeItem('shipping_method')
            window.localStorage.removeItem('note')
            window.localStorage.removeItem('shipping_address')
            window.localStorage.removeItem('courier')
            window.localStorage.removeItem('shipment')
            window.localStorage.removeItem('unique_code')
            window.localStorage.removeItem('total_payment')
            window.localStorage.removeItem('delivery_address')
        }
    },
    getters: {
        branch(state) {
            return state.branch
        },
        shipping_method(state) {
            return state.shipping_method
        },
        note(state) {
            return state.note
        },
        shipping_address(state) {
            return state.shipping_address
        },
        courier(state) {
            return state.courier
        },
        shipment(state) {
            return state.shipment
        },
        unique_code(state) {
            return state.unique_code
        },
        total_payment(state) {
            return state.total_payment
        },
        delivery_address(state) {
            return state.delivery_address
        }
    },
    actions: {
        setBranch({ state, commit}, payload) {
            commit('setBranch', payload)
        },
        setShippingMethod({ state, commit}, payload) {
            commit('setShippingMethod', payload)
        },
        setNote({ state, commit}, payload) {
            commit('setNote', payload)
        },
        setShippingAddress({ state, commit}, payload) {
            commit('setShippingAddress', payload)
        },
        setCourier({ state, commit}, payload) {
            commit('setCourier', payload)
        },
        setShipment({ state, commit}, payload) {
            commit('setShipment', payload)
        },
        setUniqueCode({ state, commit}, payload) {
            commit('setUniqueCode', payload)
        },
        setTotalPayment({ state, commit}, payload) {
            commit('setTotalPayment', payload)
        },
        setDeliveryAddress({ state, commit}, payload) {
            commit('setDeliveryAddress', payload)
        },
        reset({ state, commit}) {
            commit('reset')
        }
    }
}

export default checkout
