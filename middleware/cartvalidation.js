export default function ({ store, redirect }) { 
    const items = store.getters['cart/items']
       
    if (items.length < 1) {
        redirect("/cart")
    }
}