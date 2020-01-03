<template>

    <div>
        <hr />
        <!--wrap main content-->
        <div class="main-content main-content-checkout">
            <div class="container">
                <!-- breadcrumb -->
                <div class="breadcrumb-trail breadcrumbs">
                    <ul class="trail-items breadcrumb">
                        <li class="trail-item trail-begin active">
                            <span>My Cart</span>
                        </li>
                        <li class="trail-item trail-end active">
                            <span>Checkout</span>
                        </li>
                        <li class="trail-item trail-end active">
                            <span>Payment</span>
                        </li>
                    </ul>
                </div>
                <!--page title-->
                <!-- <h3 class="custom_blog_title">#Payment</h3> -->

                <!--checkout input form-->
                <div class="checkout-wrapp">
                    <!--payment method-->
                    <div class="payment-method-wrapp">
                        <div class="payment-method-form checkout-form">
                            <div class="row-col-1 row-col">
                                <div class="payment-method">
                                    <p>Payment</p>
                                    <label class="text">Select Bank Account</label><br/>
                                        <!-- class="chosen-select" -->
                                        <select style="width:40%;" data-placeholder="-- Choose SPB --" id="branches"
                                            ref="branches" v-model="bank">
                                            <option 
                                                v-for="bank_account in bank_accounts" 
                                                :key="bank_account.bank_name"
                                                :value="bank_account"
                                            >
                                                {{ bank_account.bank_name }}
                                            </option>
                                        </select>
                                        <br/><br/>
                                        <span v-if="bank">
                                            Account : {{ bank.bank_name }} <br/>
                                            Owner Name : {{ bank.owner_name }} <br/>
                                            Account Number : {{ bank.account_number }} <br/><br/>
                                        </span>
                                </div>
                            </div>
                            <div class="row-col-2 row-col checkout-form" style="padding-left: 27px;padding-bottom: 0px; padding-top:20px;">
                                <div class="your-order">
                                    <h3 class="title-form text-center" style="margin-bottom:20px;">Order Summary</h3>
                                    <hr style="margin-top: 10px;margin-bottom: 10px;" />

                                    <table style="border:none !important;">
                                        <tr style="border:none !important;">
                                            <td style="border:none !important;padding-bottom:0px"> Total items :</td>
                                            <td style="border:none !important;padding-bottom:0px" class="text-right"> <b> {{ count }}pcs </b> </td>
                                        </tr>
                                        <tr style="border:none !important;">
                                            <td style="border:none !important;padding-bottom:0px">
                                                Total weight :
                                            </td>
                                            <td style="border:none !important;padding-bottom:0px" class="text-right">
                                                <b> {{ total_weight }}Kg </b>
                                            </td>
                                        </tr>
                                    </table>

                                    <hr style="margin-top: 10px;margin-bottom: 10px;" />

                                    <table style="border:none !important;">
                                        <tr style="border:none !important;">
                                            <td style="border:none !important;padding-bottom:0px">
                                                Grand total
                                            </td>
                                            <td style="border:none !important;padding-bottom:0px" class="text-right">
                                                <b> {{ grand_total | rupiah }} </b>
                                            </td>
                                        </tr>
                                        <tr v-if="shipment.fee" style="border:none !important;">
                                            <td style="border:none !important;padding-bottom:0px;color:green;">
                                                Shipping Fee
                                            </td>
                                            <td style="border:none !important;text-align:right;padding-bottom:0px;color:green;" class="text-right" >
                                                <b> {{ shipment.fee | rupiah }} </b>
                                            </td>
                                        </tr>
                                        <tr style="border:none !important;">
                                            <td style="border:none !important;padding-bottom:0px">
                                                Unique Code
                                            </td>
                                            <td style="border:none !important;padding-bottom:0px"  class="text-right">
                                                <b> {{ unique_code }} </b>
                                            </td>
                                        </tr>
                                    </table>

                                    <hr style="margin-top: 10px;margin-bottom: 10px;" />

                                    <table style="border:none !important;">
                                        <tr style="border:none !important;">
                                            <td style="border:none !important;">
                                                <span class="title">Total Payment:</span>
                                            </td>
                                            <td style="border:none !important;">
                                                <div class="order-total text-right" >
                                                    <span class="total-price" style="color:red;">
                                                        <b> {{ total_payment | rupiah }} </b>
                                                    </span>
                                                </div>
                                            </td>
                                        </tr>
                                    </table>
                                </div>
                            </div>
                        </div>

                        <div class="button-control">
                            <nuxt-link :to="`checkout`" class="button btn-back-to-shipping">BACK TO CHECKOUT</nuxt-link>
                            <button class="button btn-pay-now" @click="completeCheckout()">COMPLETE CHECKOUT</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
	
export default {
    layout: 'products',
    middleware: ['affiliation', 'authorization', 'cartvalidation', 'checkoutvalidation'],
	data() {
		return {
			bank: false,
			bank_accounts: [
                {
                    bank_name: "BCA",
                    owner_name: "Rian Setiawan",
                    account_number: "346.277.2308",
                },
                {
                    bank_name: "BNI",
                    owner_name: "Rian Setiawan",
                    account_number: "30.000.11.238",
                },
                {
                    bank_name: "BRI",
                    owner_name: "Rian Setiawan",
                    account_number: "0389.01.025423.50.0",
                },
                {
                    bank_name: "MANDIRI",
                    owner_name: "Rian Setiawan",
                    account_number: "130.05.52.888.888",
                },
            ]
		}
	},
	computed: {
		...mapGetters("checkout", ['total_payment', 'shipping_method', 'courier', 'delivery_address', 'branch', 'shipment', 'unique_code']),
        ...mapGetters("cart", ['items', 'subtotal', 'total_weight', 'grand_total', 'count']),
		transaction_number: function() {
			let today = new Date()
            let alphabet = [
                "A",
                "B",
                "C",
                "D",
                "E",
                "F",
                "G",
                "H",
                "I",
                "J",
                "K",
                "L",
            ]
            let year_digit = today
                .getFullYear()
                .toString()
                .substr(-2)
            let month_alphabet = alphabet[today.getMonth()]
            let current_date = ("0" + today.getDate()).slice(-2)
            let trans_no = "TRX" + year_digit + month_alphabet + current_date + Math.floor(1000 + Math.random() * 9000).toString()

            return trans_no
		},
		current_date: function() {
			var today = new Date()
			var dd = today.getDate()
			var mm = today.getMonth() + 1 //January is 0!
			var yyyy = today.getFullYear()

			if (dd < 10) {
				dd = "0" + dd
			}

			if (mm < 10) {
				mm = "0" + mm
			}

			today = dd + "-" + mm + "-" + yyyy

			return today
		}
	},
	created() {
		// alert(this.courier)
	},
	methods: {
		completeCheckout: function() {
            if (!this.bank) {
                this.$swal({
                    title: "Oops!",
                    text: "Please select a bank account",
                    type: "warning",
                })
            } else {

                this.$swal({
                    title: "Processing...",
                    // text: "Processing",
                    allowEscapeKey: false,
                    allowOutsideClick: false,
                    onOpen: () => {
                        this.$swal.showLoading()
                    },
                })
                
                const user_data = JSON.parse(localStorage.getItem('user_data'))
                const affiliation = JSON.parse(localStorage.getItem('affiliation'))

                let transaction_master = {
                    transaction_date: this.current_date,
                    transaction_number: this.transaction_number,
                    member_id: affiliation.no_member,
                    customer_id: user_data.user_id,
                    customer_name: user_data.name,
                    shipping_method: this.shipping_method,
                    courier: this.courier ? this.courier : "",
                    shipping_address_id: this.delivery_address ? this.delivery_address : "",
                    subtotal: this.subtotal,
                    shipping_fee: this.shipment.fee,
                    grand_total: this.total_payment,
                    total_weight: parseFloat(this.total_weight) * 1000,
                    cart: this.items,
                    sales_branch_code: this.branch.code,
                    bank: this.bank.bank_name,
                    shopping_platform: "BSHOP",
                    note: "",
                    affiliation_code: affiliation.no_member // KODE AFFILIASI SENGAJA DIISI DENGAN MEMBER_ID
				}
				
                this.$axios.post(`transaction/add`, {
                    transaction: transaction_master,
                })
                .then(response => {
                    if (response.data.data == 1) {
                        this.$swal({
                            // title: "",
                            text: "Transaction saved!",
                            type: "success",
                        }).then(() => {

                            this.$store.dispatch('cart/reset')
                            this.$store.dispatch('checkout/reset')

                            this.$router.push({
                                name: "transaction-complete",
                            })
                        })
                    }
                })
                .catch(e => {
                    console.log(e)
                })
            }
        }
	},
}
</script>