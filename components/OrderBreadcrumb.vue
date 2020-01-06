<template>
    <div class="col-md-3">
        <section class="root">
            <div class="order-track">
                <div 
                    class="order-track-step" 
                    :class="!isDone('PLACE ORDER') ? 'disabled' : ''"
                    :title="isDone('PLACE ORDER') ? getDate('PLACE ORDER') : ''"
                >
                    <div class="order-track-status">
                        <span class="order-track-status-dot"></span>
                        <span class="order-track-status-line"></span>
                    </div>
                    <div class="order-track-text">
                        <span class="order-track-text-stat">Place Order</span>
                    </div>
                </div>
                <div 
                    class="order-track-step"
                    :class="!isDone('TRANSFERRED') ? 'disabled' : ''"
                    :title="isDone('TRANSFERRED') ? getDate('TRANSFERRED') : ''"
                >
                    <div class="order-track-status">
                        <span class="order-track-status-dot"></span>
                        <span class="order-track-status-line"></span>
                    </div>
                    <div class="order-track-text">
                        <span class="order-track-text-stat">Transfered</span>
                    </div>
                </div>
                <div 
                    class="order-track-step"
                    :class="!isDone('PAYMENT CONFIRMED') ? 'disabled' : ''"
                    :title="isDone('PAYMENT CONFIRMED') ? getDate('PAYMENT CONFIRMED') : ''"
                >
                    <div class="order-track-status">
                        <span class="order-track-status-dot"></span>
                        <span class="order-track-status-line"></span>
                    </div>
                    <div class="order-track-text">
                        <span class="order-track-text-stat">Payment Confirmed</span>
                    </div>
                </div>
                <template v-if="shipping_method == 'EXPEDITION'">
                    <div 
                        class="order-track-step"
                        :class="!isDone('PACKED') ? 'disabled' : ''"
                        :title="isDone('PACKED') ? getDate('PACKED') : ''"
                    >
                        <div class="order-track-status">
                            <span class="order-track-status-dot"></span>
                            <span class="order-track-status-line"></span>
                        </div>
                        <div class="order-track-text">
                            <span class="order-track-text-stat">Packed</span>
                        </div>
                    </div>
                    <div 
                        class="order-track-step"
                        :class="!isDone('SHIPPED') ? 'disabled' : ''"
                        :title="isDone('SHIPPED') ? getDate('SHIPPED') : ''"
                    >
                        <div class="order-track-status">
                            <span class="order-track-status-dot"></span>
                            <span class="order-track-status-line"></span>
                        </div>
                        <div class="order-track-text">
                            <span class="order-track-text-stat">Shipped</span>
                            <span class="order-track-text-sub" v-if="receipt_number">
                                No. resi
                                <b> {{ receipt_number }} </b>
                            </span>
                        </div>
                    </div>
                </template>
                <div 
                    class="order-track-step"
                    :class="!isDone('RECEIVED') ? 'disabled' : ''"
                    :title="isDone('RECEIVED') ? getDate('RECEIVED') : ''"
                >
                    <div class="order-track-status">
                        <span class="order-track-status-dot"></span>
                        <span class="order-track-status-line"></span>
                    </div>
                    <div class="order-track-text">
                        <span class="order-track-text-stat">Received</span>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
export default {
    props: ['progresses', 'receipt_number', 'shipping_method'],
    methods: {
        isDone(progress_name) {
            return this.progresses.find((element) => element.keterangan == progress_name)
        },
        getDate(progress_name) {
            const progress = this.progresses.find((element) => { 
                if (element.keterangan == progress_name) {
                    return element.tanggal
                }
            })

            return progress.tanggal
        }
    },
}
</script>