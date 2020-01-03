export default function ({ store, redirect }) { 
    const branch = store.getters['checkout/branch']
    const shipping_method = store.getters['checkout/shipping_method']
    const courier = store.getters['checkout/courier']
    const shipment = store.getters['checkout/shipment']
       
    if (!branch || !shipping_method) {
        redirect("/checkout")
    }

    if (shipping_method == "EXPEDITION" && (!courier || !shipment.fee)) {
        redirect("/checkout")
    }
}