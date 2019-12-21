<template>
    <div class="cart-item">
        <div class="item-wrap">
            <div class="cart-thumbnail">
                <img
                    :src="`${$axios.defaults.baseURL}assets/img/thumbnails/${item.picture}.jpg`"
                    :alt="item.product_name"
                    class="img-thumbnail"
                />
            </div>
            <div class="cart-product-info">
                <nuxt-link
                    :to="`/products/${item.product_code}/detail`"
                    tag="a"
                    class="title"
                >{{ item.product_name }}</nuxt-link>
                <div class="cart-info-wrap">
                    <div class="flex-cart-item">
                        <div v-if="item.price_discount > 0 && item.price > item.price_discount">
                            <div class="cart-product-price-disc">{{ item.price | rupiah }}</div>
                            <div class="cart-product-price">{{ item.price_discount | rupiah }}</div>
                        </div>
                        <div v-else>
                            <div class="cart-product-price">{{ item.price | rupiah }}</div>
                        </div>
                        <div class="quantity">
                            <div class="control">
                                <div class="btn-number qtyminus quantity-minus" @click="minQty">-</div>
                                <input
                                    type="text"
                                    data-step="1"
                                    min="1"
                                    v-model="qty"
                                    title="Qty"
                                    class="input-qty qty"
                                    size="4"
                                    @input="updateQty"
                                />
                                <div class="btn-number qtyplus quantity-plus" @click="addQty">+</div>
                            </div>
                        </div>
                    </div>
                    <div class="product-remove">
                        <a class="remove" @click="removeItem"></a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['item'],
    data() {
        return {
            qty: this.item.qty
        }
    },
    methods: {
        updateQty: function() {
            this.$store.dispatch('cart/updateQty', {
                product_code: this.item.product_code,
                qty: this.qty
            })
        },
        addQty: function() {
            this.qty++
            this.updateQty()
        },
        minQty: function() {
            if (this.qty > 1) {
                this.qty--
                this.updateQty()
            }
        },
        addItem: function() {
            // this.item.qty = this.qty
            // this.$store.dispatch('cart/addItem', this.item)
            // this.qty = 1
        },
        removeItem: function() {
            this.$store.dispatch('cart/removeItem', this.item.product_code)
        }
    }
}
</script>

<style scoped>
.cart-form .shop_table .product-price {
    width: 18%;
    font-size: 20px;
    color: #111;
    font-weight: 700;
}
.cart-form .shop_table .product-quantity {
    width: 15%;
}
.cart-form .shop_table .product-name {
    font-weight: 600;
    color: #333333;
    width: 25%;
    font-size: 16px;
}
</style>