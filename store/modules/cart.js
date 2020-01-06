let items = window.localStorage.getItem('items')

const cart = {
    namespaced: true,
    state: {
        items: items ? JSON.parse(items) : []
    },
    mutations: {
        addItem(state, item) {
            let item_exists = state.items.find((product) => product.product_code == item.kode_barang)

            if (item_exists) {
                item_exists.qty = parseInt(item_exists.qty) + parseInt(item.qty)
                item_exists.subtotal = parseInt(item_exists.qty) * parseInt(item_exists.price)
                item_exists.grand_total = parseInt(item_exists.grand_total) + parseInt(item_exists.price_discount) * parseInt(item.qty)
                item_exists.total_weight = item_exists.qty * item_exists.weight
                item_exists.total_poin = item_exists.qty * item_exists.poin
            } else {
                let product = {
                    product_code: item.kode_barang,
                    product_name: item.nama,
                    weight: item.berat,
                    poin: parseInt(item.poin),
                    price: parseInt(item.harga),
                    price_bonus_calculation: parseInt(item.h_hpb),
                    discount: item.diskon,
                    price_discount: item.harga_diskon ? parseInt(item.harga_diskon) : 0,
                    qty: parseInt(item.qty),
                    subtotal: parseInt(item.harga) * parseInt(item.qty),
                    grand_total: item.harga_diskon ? parseInt(item.harga_diskon) * parseInt(item.qty) : parseInt(item.harga) * parseInt(item.qty),
                    total_weight: parseInt(item.qty) * item.berat,
                    total_poin: parseInt(item.qty) * item.poin,
                    image: item.pic,
                    unit: item.unit,
                    category: item.jenis,
                    picture: item.pic ? item.pic : '',
                    note: item.note ? item.note : ''
                }

                state.items.push(product)
            }

            window.localStorage.setItem('items', JSON.stringify(state.items))
        },
        updateQty(state, item) { // state.items.push(item)

            let item_exists = state.items.find((product) => product.product_code == item.product_code)

            if (item_exists) {
                item_exists.qty = parseInt(item.qty)
                item_exists.subtotal = parseInt(item.qty) * parseInt(item_exists.price)
                item_exists.grand_total = parseInt(item_exists.price_discount) ? parseInt(item_exists.price_discount) * parseInt(item.qty) : parseInt(item_exists.price) * parseInt(item.qty)
                item_exists.total_weight = parseInt(item.qty) * item_exists.weight
                item_exists.total_poin = parseInt(item.qty) * item_exists.poin
            } else {
                let product = {
                    product_code: item.kode_barang,
                    product_name: item.nama,
                    weight: item.berat,
                    poin: parseInt(item.poin),
                    price: parseInt(item.harga),
                    price_bonus_calculation: parseInt(item.h_hpb),
                    discount: item.diskon,
                    price_discount: item.harga_diskon ? parseInt(item.harga_diskon) : 0,
                    qty: parseInt(item.qty),
                    subtotal: parseInt(item.harga) * parseInt(item.qty),
                    grand_total: item.harga_diskon ? parseInt(item.harga_diskon) * parseInt(item.qty) : parseInt(item.harga) * parseInt(item.qty),
                    total_weight: parseInt(item.qty) * item.berat,
                    total_poin: parseInt(item.qty) * item.poin,
                    image: item.pic,
                    unit: item.unit,
                    category: item.jenis,
                    picture: item.pic ? item.pic : '',
                    note: item.note ? item.note : ''
                }

                state.items.push(product)
            }

            window.localStorage.setItem('items', JSON.stringify(state.items))
        },
        removeItem(state, product_code) {
            let item = state.items.find((product) => product.product_code == product_code)

            if (item) {
                let index = state.items.indexOf(item)
                state.items.splice(index, 1)
            }

            window.localStorage.setItem('items', JSON.stringify(state.items))
        },
        reset(state) {
            state.items = []
            window.localStorage.removeItem('items')
        }
    },
    getters: {
        items(state) {
            return state.items
        },
        count(state) {
            return state.items.reduce((accumulator, item) => accumulator + parseInt(item.qty), 0)
        },
        subtotal(state) {
            return state.items.reduce((accumulator, item) => accumulator + parseInt(item.subtotal), 0)
        },
        grand_total(state) {
            return state.items.reduce((accumulator, item) => accumulator + parseInt(item.grand_total), 0)
        },
        total_weight(state) {
            const weight = state.items.reduce((accumulator, item) => accumulator + parseInt(item.weight), 0)
            return(weight / 1000).toFixed(2)
        },
        unique_code(state) {
            return Math.floor(100 + Math.random() * 900)
        },
        total_payment(state, getters) {
            let totalpay = parseInt(getters.grand_total) + parseInt(getters.unique_code)
            totalpay = totalpay.toString().slice(0, -3)
            totalpay = parseInt(totalpay) + "" + parseInt(getters.unique_code)
            totalpay = parseInt(totalpay)
            return totalpay
        },
        itemsSummary(state) {
            let products = []

            state.items.map(item => {
                let product = {
                    product_code: item["product_code"],
                    qty: item["qty"],
                    unit: item["unit"]
                }
                products.push(product)
            })

            return products
        }
    },
    actions: {
        addItem( {state, commit}, payload) {
            commit('addItem', payload)
        },
        removeItem( {state, commit}, payload) {
            commit('removeItem', payload)
        },
        updateQty({ state, commit }, payload) {
            commit('updateQty', payload)
        },
        reset({ state, commit }) {
            commit('reset')
        }
    }
}

export default cart
