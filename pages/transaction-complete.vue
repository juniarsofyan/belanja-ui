<template>

    <div>
        <hr />
        <!--wrap main content-->
        <div class="main-content main-content-checkout">
            <div class="container">
                <!--checkout input form-->
                <div class="checkout-wrapp">
                    <!--last process-->
                    <div class="end-checkout-wrapp">
                        <div class="end-checkout checkout-form">
                            <div class="icon"></div>
                            <h3 class="title-checkend">Congratulation! Your order has been processed.</h3>
                            <div class="sub-title">
                                If you don't make a payment in 24 hours, the transaction will automatically canceled.
                            </div>
                            <nuxt-link :to="`/order-history`" tag="a" class="button btn-return">View your orders</nuxt-link>
                        </div>
                    </div>

                </div>

            </div>

        </div>
    </div>
</template>

<script>
export default {
    middleware: ['affiliation', 'authorization']
}
</script>