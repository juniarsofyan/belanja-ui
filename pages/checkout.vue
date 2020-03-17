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
                        <li class="trail-item trail-end">
                            <span>Payment</span>
                        </li>
                    </ul>
                </div>
                <!--page title-->
                <!-- <h3 class="custom_blog_title">#Checkout</h3> -->
                <!--checkout input form-->
                <div class="checkout-wrapp">
                    <!--shipping address-->
                    <div class="shipping-address-form-wrapp">
                        <div class="shipping-address-form checkout-form">
                            <div class="row-col-1 row-col">
                                <div class="shipping-address">
                                    <h3 class="title-form">Checkout</h3>
                                    <p class="form-row form-row-first">
                                        <label class="text" for="branches">Select SPB (Sales Point Branch)</label>
                                        <!-- class="chosen-select" -->
                                        <select style="width:100%;" data-placeholder="-- Choose SPB --" id="branches"
                                            ref="branches" v-model="branch">
                                            <option v-for="sales_branch in sales_branches" :key="sales_branch.code"
                                                :value="sales_branch" :disabled="sales_branch.disabled"
                                                :selected="branch.code ? branch.code == sales_branch.code : ''">
                                            {{ sales_branch.city_name }} - {{ sales_branch.subdistrict_name }}</option>
                                        </select>
                                    </p>
                                </div>
                                <div class="shipping-address">
                                    <p class="form-row form-row-first">
                                        <span class="text">Shipping Method</span>
                                        <input
                                            type="radio"
                                            name="shipping_method"
                                            id="expedition"
                                            style="margin-right:5px;"
                                            value="EXPEDITION"
                                            v-model="shipping_method"
                                        />
                                        <label style="margin-right:10px;" for="expedition">Courier</label>
                                        <input
                                            type="radio"
                                            name="shipping_method"
                                            id="immediate"
                                            style="margin-right:5px;"
                                            value="IMMEDIATE"
                                            v-model="shipping_method"
                                        />
                                        <label style="margin-right:10px;" for="immediate">Immediate</label>
                                    </p>
                                </div>
                                <span v-if="shipping_method == 'EXPEDITION'">
                                    <span v-if="default_shipping_address">
                                        <div class="shipping-address">
                                            <div class="form-row form-row-first">
                                                <label class="text">Select Courier</label>
                                                <!-- class="chosen-select" -->
                                                <select style="width:100%;" data-placeholder="-- Choose One --" v-model="courier">
                                                    <option value="jne">JNE</option>
                                                    <option value="jnt">JNT</option>
                                                </select>
                                                <br />
                                                <br>
                                                <!-- <div v-if="shipment.fee">
                                                    <p>  Fee : {{ shipment.fee }} </p>
                                                    <p>  Etd : {{ shipment.etd }} </p>
                                                </div> -->
                                            </div>
                                        </div>
                                        <div class="shipping-address">
                                            <p class="form-row form-row-first">
                                                <span>Deliver to:</span>
                                                <label class="text">
                                                    <p>
                                                        <b>{{ default_shipping_address.nama }}</b> <br />
                                                        {{ default_shipping_address.alamat }} <br />
                                                        {{ default_shipping_address.kecamatan_nama }} <br />
                                                        {{ default_shipping_address.kota_nama }} <br />
                                                        {{ default_shipping_address.provinsi_nama }} <br />
                                                        {{ default_shipping_address.kode_pos }}
                                                        <!-- <br /> <br /> {{ default_shipping_address.telepon }} -->
                                                    </p>
                                                </label>
                                                <nuxt-link :to="`/profile/addresses`">Change address</nuxt-link>
                                            </p>
                                        </div>
                                    </span>
                                    <div class="shipping-address" v-else>
                                        <p class="form-row form-row-first" style="font-style:italic;font-weight:bold;">
                                            <span style="color:red;"> NOTE: </span> <br/>
                                            You haven't set a default shipping address. <br/>
                                            Please set a default shipping address <nuxt-link to="/profile/addresses" style="text-decoration:underline;"> <b>here</b> </nuxt-link>.
                                            <!-- <button class="btn-sm" @click="showModal=true">Add shipping address</button> -->
                                        </p>
                                    </div>
                                </span>
                                <span v-if="shipping_method == 'IMMEDIATE'">
                                    <div class="shipping-address">
                                        <p class="form-row form-row-first">
                                            <label class="text" for="note">Note</label>
                                            <textarea name="note" id="note" rows="5" v-model="note"></textarea>
                                        </p>
                                    </div>
                                </span>
                            </div>
                            <!-- Branch : {{ branch }} -->
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
                            <nuxt-link :to="`/cart`" tag="button" class="button btn-continue-shopping">
                                <i class="fa fa-arrow-left" aria-hidden="true"></i>
                                    BACK TO MY CART
                            </nuxt-link>

                            <button class="button button-payment" v-if="!checkoutDataValidated" @click="warnCheckoutDataCompletion()">PAYMENT</button>
                            <nuxt-link :to="`payment`" class="button button-payment" v-else>PAYMENT</nuxt-link>
                            
                            <transition name="modal" v-if="showModal">
                                <div class="modal-mask">
                                    <div class="modal-wrapper">
                                        <div class="modal-container">
                                            <div class="modal-header">
                                                <slot name="header"> <b> ADD SHIPPING ADDRESS </b> </slot>
                                            </div>
                                            <div class="modal-body">
                                                <slot name="body">
                                                    <input type="text" name="name" v-model="address_form.name" placeholder="Name"/> &nbsp;
                                                    <input type="text" name="phone" v-model="address_form.phone" placeholder="Phone"/>
                                                    <br /> <br />
                                                    <select v-model="address_form.province">
                                                        <option value="" selected>-- Province --</option>
                                                        <option
                                                            v-for="province in provinces"
                                                            :key="province.province_id"
                                                            :value="province"
                                                            :selected="province.province_id === address_form.provinsi_id"
                                                        >{{ province.province }}
                                                        </option>
                                                    </select>
                                                    &nbsp;
                                                    <select v-model="address_form.city">
                                                        <option value="" selected>-- City --</option>
                                                        <option
                                                            v-for="city in cities"
                                                            :key="city.city_id"
                                                            :value="city"
                                                            :selected="city.city_id === address_form.city_id"
                                                        >{{ city.city_name }}
                                                        </option>
                                                    </select>
                                                    &nbsp;
                                                    <select v-model="address_form.subdistrict">
                                                        <option value="" selected>-- Subdistrict --</option>
                                                        <option
                                                            v-for="subdistrict in subdistricts"
                                                            :key="subdistrict.subdistrict_id"
                                                            :value="subdistrict"
                                                            :selected="subdistrict.subdistrict_id === address_form.subdistrict_id"
                                                        >{{ subdistrict.subdistrict_name }}
                                                        </option>
                                                    </select>
                                                    <br /> <br />
                                                    <textarea id="address" v-model="address_form.address" placeholder="address"></textarea>
                                                    <br /> <br />
                                                    <input type="text" name="postcode" v-model="address_form.postcode" placeholder="postcode"/>
                                                    &nbsp;&nbsp;
                                                    <input class="form-check-input" type="checkbox" id="is-default-address" value="1" v-model="address_form.is_default">
                                                    <label for="is-default-address">Set as default</label>
                                                </slot>
                                            </div>
                                            <div class="modal-footer">
                                                <slot name="footer">
                                                    <button class="modal-default-button btn-sm" @click="showModal=false">Cancel</button> &nbsp;&nbsp;&nbsp;&nbsp;
                                                    <button class="modal-default-button btn-sm" @click="addNewAddress()">Save</button> &nbsp;&nbsp;&nbsp;&nbsp;
                                                </slot>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </transition>
                        </div>
                    </div>
                    <!--payment method-->
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {
        mapGetters,
        mapActions
    } from 'vuex'
    import axios from 'axios'
    import ongkir from '~/plugins/ongkir'

    export default {
        middleware: ['affiliation', 'authorization', 'cartvalidation'],
        layout: 'products',
        data() {
            return {
                address_form: {
                    name: "",
                    phone: "",
                    province: "",
                    city: "",
                    subdistrict: "",
                    address: "",
                    postcode: "",
                    is_default: ""
                },
                provinces: [],
                cities: [],
                subdistricts: [],
                showModal: false,
                delivery_address: false,
                default_shipping_address: "",
                shipping_addresses: [],
                sales_branches: [
                    {
                        code: '00000',
                        province_id: 9,
                        city_id: 23,
                        city_name: 'BANDUNG',
                        subdistrict_id: 359,
                        subdistrict_name: 'Lengkong',
                        phone: '+6282119163629',
                        disabled: true
                    },
                    {
                        code: '14',
                        province_id: 9,
                        city_id: 23,
                        city_name: 'BANDUNG',
                        subdistrict_id: 361,
                        subdistrict_name: 'Panyileukan',
                        phone: '-',
                        disabled: true
                    },
                    {
                        code: '13722',
                        province_id: 9,
                        city_id: 54,
                        city_name: 'BEKASI',
                        subdistrict_id: 733,
                        subdistrict_name: 'Cikarang Selatan',
                        phone: '-',
                        disabled: true
                    },
                    {
                        code: '00217',
                        province_id: 9,
                        city_id: 55,
                        city_name: 'BEKASI',
                        subdistrict_id: 757,
                        subdistrict_name: 'Mustika Jaya',
                        phone: '+6281360360688',
                        disabled: true
                    },
                    {
                        code: '00553',
                        province_id: 9,
                        city_id: 79,
                        city_name: 'BOGOR',
                        subdistrict_id: 1067,
                        subdistrict_name: 'Tanah Sereal',
                        phone: '+6289513313909',
                        disabled: true
                    },
                    {
                        code: '05624',
                        province_id: 9,
                        city_id: 104,
                        city_name: 'CIANJUR',
                        subdistrict_id: 1415,
                        subdistrict_name: 'Cikalong',
                        phone: '-',
                        disabled: true
                    },
                    {
                        code: '15658',
                        province_id: 9,
                        city_id: 115,
                        city_name: 'DEPOK',
                        subdistrict_id: 1585,
                        subdistrict_name: 'Sawangan',
                        phone: '-',
                        disabled: true
                    },
                    {
                        code: '00985',
                        province_id: 3,
                        city_id: 232,
                        city_name: 'LEBAK',
                        subdistrict_id: 3308,
                        subdistrict_name: 'Cilograng',
                        phone: '-',
                        disabled: true
                    },
                    {
                        code: '00539',
                        province_id: 34,
                        city_id: 278,
                        city_name: 'MEDAN',
                        subdistrict_id: 3918,
                        subdistrict_name: 'Medan Marelan',
                        phone: '+6287868981767',
                        disabled: true
                    },
                    {
                        code: '00042',
                        province_id: 9,
                        city_id: 430,
                        city_name: 'PELABUHAN RATU',
                        subdistrict_id: 5954,
                        subdistrict_name: 'Pelabuhan/Palabuhan Ratu',
                        phone: '+6281337479174',
                        disabled: true
                    },
                    {
                        code: '01835',
                        province_id: 9,
                        city_id: 376,
                        city_name: 'PURWAKARTA',
                        subdistrict_old_id: 5954,
                        subdistrict_id: 5218,
                        subdistrict_name: 'Bojong',
                        phone: '-',
                        disabled: true
                    },
                    {
                        code: '01838',
                        province_id: 10,
                        city_id: 41,
                        city_name: 'PURWOKERTO',
                        subdistrict_id: 591,
                        subdistrict_name: 'Purwokerto Timur',
                        phone: '+6283818235538',
                        disabled: true
                    },
                    {
                        code: '00005',
                        province_id: 9,
                        city_id: 431,
                        city_name: 'SUKABUMI',
                        subdistrict_id: 5936,
                        subdistrict_name: 'Cisaat',
                        phone: '+6281563205235',
                        disabled: true
                    },
                    {
                        code: '01340',
                        province_id: 9,
                        city_id: 430,
                        city_name: 'SUKABUMI',
                        subdistrict_id: 5951,
                        subdistrict_name: 'Pabuaran',
                        phone: '+6285798847881',
                        disabled: true
                    },
                    {
                        code: '00004',
                        province_id: 3,
                        city_id: 457,
                        city_name: 'TANGERANG SELATAN',
                        subdistrict_id: 6313,
                        subdistrict_name: 'Pondok Aren',
                        phone: '-',
                        disabled: true
                    }
                ]
            }
        },
        computed: {
            ...mapGetters(
                'cart', [
                    'items',
                    'itemsSummary',
                    'subtotal',
                    'grand_total',
                    'count',
                    'total_weight'
                ]),
            ...mapGetters(
                'checkout', [
                    'branch',
                    'shipping_method',
                    'note',
                    'courier',
                    'shipping_address',
                    'unique_code',
                    'shipment',
                    'total_payment'
                ]),
            courier: {
                get() {
                    return this.$store.getters['checkout/courier']
                },
                set(value) {
                    this.$store.dispatch('checkout/setCourier', value)
                }
            },
            branch: {
                get() {
                    return this.$store.getters['checkout/branch']
                },
                set(value) {
                    this.$store.dispatch('checkout/setBranch', value)
                }
            },
            shipping_method: {
                get() {
                    return this.$store.getters['checkout/shipping_method']
                },
                set(value) {
                    this.$store.dispatch('checkout/setShippingMethod', value)
                }
            },
            note: {
                get() {
                    return this.$store.getters['checkout/note']
                },
                set(value) {
                    this.$store.dispatch('checkout/setNote', value)
                }
            },
            checkoutDataValidated() {
                if (!this.branch || !this.shipping_method) {
                    return false
                }

                if (this.shipping_method == "EXPEDITION" && (!this.courier || !this.shipment.fee)) {
                    return false
                }

                if (this.shipping_method == "EXPEDITION" && this.default_shipping_address == "") {
                    return false
                }

                return true
            }
        },
        watch: {
            courier: function () {
                this.checkOngkir()
            },
            shipping_method: function () {
                if (this.shipping_method == 'IMMEDIATE') {
                    this.$store.dispatch('checkout/setShipment', {
                        etd: "",
                        fee: 0
                    })
                    this.$store.dispatch('checkout/setCourier', false)
                    this.$store.dispatch('checkout/setDeliveryAddress', false)
                    this.setTotalPayment()
                } else {
                    this.$store.dispatch('checkout/setNote', "")
                    this.getDefaultShippingAddresses()
                }
            },
            items: function() {
                this.checkAvailableBranches()
            },
            'address_form.province': {
                handler(val) {
                    if (val) {
                        this.getCities(val.province_id)
                    }
                },
                deep: true
            },
            'address_form.city': {
                handler(val) {
                    if (val) {
                        this.getSubdistricts(val.city_id)
                    }
                },
                deep: true
            },
            branch: function() {
                this.shipping_method = ""
                this.$store.dispatch('checkout/setCourier', false)
                this.$store.dispatch('checkout/setShipment', {
                    etd: "",
                    fee: 0
                })
                this.setTotalPayment()
            },
            default_shipping_address: function() {
                this.$store.dispatch('checkout/setCourier', false)
                this.$store.dispatch('checkout/setShipment', {
                    etd: "",
                    fee: 0
                })
                this.setTotalPayment()
            }
        },
        methods: {
            generateUniqueCode() {
                const random_number = Math.floor(100 + Math.random() * 900)
                this.$store.dispatch('checkout/setUniqueCode', random_number)
                this.setTotalPayment()
            },
            async checkOngkir(event) {

                let shipment = {
                    destination_city_id: this.default_shipping_address.kota_id,
                    destination_subdistrict_id: this.default_shipping_address.kecamatan_id,
                    origin_city_id: this.branch.city_id,
                    origin_subdistrict_id: this.branch.subdistrict_id,
                    weight: this.total_weight,
                    courier: this.courier
                }

                const shipment_result = await ongkir.estimate(shipment)
                this.$store.dispatch('checkout/setShipment', shipment_result)
                this.setTotalPayment()
            },
            checkAvailableBranches() {
                this.$axios
                    .post(`transaction/check-sales-branches-stock`, {
                        products: this.itemsSummary
                    })
                    .then((response) => {
                        if (response.data.data != 0) {
                            let result = response.data.data

                            result.forEach((item) => {
                                let found = this.sales_branches.find(
                                    (product) => product.code == item.code
                                )
                                if (found) {
                                    found.disabled = item.disabled
                                }
                            })
                        }
                    })
            },
            getShippingAddresses() {
                this.$axios.post(`shipping-address/current`, {
                    email: window.localStorage.getItem('email')
                })
                .then((response) => {
                    this.shipping_addresses = response.data.data
                })
            },
            setTotalPayment() {

                let fee = 0

                if (this.shipment && this.shipment.fee) {
                    fee = this.shipment.fee
                }
                
                const total_payment = parseInt(this.grand_total) + parseInt(this.unique_code) + parseInt(fee)
                this.$store.dispatch('checkout/setTotalPayment', total_payment)
            },
            getDefaultShippingAddresses: function() {
                const email = localStorage.getItem('email')

                this.$axios.post(`shipping-address/current`, {
                    email: localStorage.getItem('email')
                }).then(response => {
                        if (response.data.data != 0) {
                            this.default_shipping_address = response.data.data
                            this.$store.dispatch('checkout/setDeliveryAddress', this.default_shipping_address.id)
                        } else {
                            this.$store.dispatch('checkout/setDeliveryAddress', false)
                            this.$store.dispatch('checkout/setCourier', false)
                            this.$store.dispatch('checkout/setShipment', {
                                etd: "",
                                fee: 0
                            })
                            this.setTotalPayment()
                        }
                    })
                    .catch(e => {
                        console.log(e)
                    })
            },
            getProvinces() {
                this.provinces = this.$axios.get(`ongkir/provinces`)
                    .then(response => {
                        if (response.data.data != 0) {
                            this.provinces = response.data.data
                        } else {
                            this.provinces = []
                        }
                    })
                    .catch(e => {
                        console.log(e)
                    })
            },
            getCities: function(province_id) {
                this.$axios.get(`ongkir/province/` + province_id + `/cities` )
                    .then(response => {
                        if (response.data.data != 0) {
                            var cities = response.data.data
                            var data = []

                            for (var city in cities) {
                                data.push({
                                    city_id: cities[city].city_id,
                                    city_name: cities[city].type + " " + cities[city].city_name,
                                })
                            }
                            this.cities = data
                        } else {
                            this.cities = []
                        }
                    })
                    .catch(e => {
                        console.log(e)
                    })

                    this.subdistricts = []
            },
            getSubdistricts: function(city_id) {
                this.$axios.get(`ongkir/city/` + city_id + `/subdistricts` )
                    .then(response => {
                        if (response.data.data != 0) {
                            var subdistricts = response.data.data
                            var data = []
                            for (var subdistrict in subdistricts) {
                                data.push({
                                    subdistrict_id: subdistricts[subdistrict].subdistrict_id,
                                    subdistrict_name: subdistricts[subdistrict].subdistrict_name
                                })
                            }
                            this.subdistricts = data
                        } else {
                            this.subdistricts = []
                        }
                    })
                    .catch(e => {
                        console.log(e)
                    })
            },
            addNewAddress() {
                // this.address_form = address

                if (this.validateAddress()) {

                    this.showModal = false

                    this.$swal({
                        // title: "",
                        text: "Saving address",
                        allowEscapeKey: false,
                        allowOutsideClick: false,
                        onOpen: () => {
                            this.$swal.showLoading()
                        },
                    })

                    this.$axios.post(`shipping-address/add`, {
                        email : window.localStorage.getItem('email'),
                        name : this.address_form.name,
                        phone : this.address_form.phone,
                        province_id : this.address_form.province.province_id,
                        province_name : this.address_form.province.province,
                        city_id : this.address_form.city.city_id,
                        city_name : this.address_form.city.city_name,
                        subdistrict_id : this.address_form.subdistrict.subdistrict_id,
                        subdistrict_name : this.address_form.subdistrict.subdistrict_name,
                        address : this.address_form.address,
                        postcode : this.address_form.postcode,
                        is_default : this.address_form.is_default
                    }).then(response => {
                            if (response.data.data == 1) {
                                
                                this.address_form = []

                                this.$swal({
                                    // title: "",
                                    text: "Shipping address added!",
                                    type: "success",
                                }).then(response => {

                                    // this.$router.push('/profile')
                                    // window.location.reload()

                                })
                            }
                        })
                        .catch(e => {
                            console.log(e)
                        })
                } else {
                    
                }
            },
            validateAddress() {
                if (!this.address_form.hasOwnProperty('name') || this.address_form.name == "") {
                    return false
                }

                if (!this.address_form.hasOwnProperty('phone') || this.address_form.phone == "") {
                    return false
                }

                if (!this.address_form.hasOwnProperty('province') || this.address_form.province == "") {
                    return false
                }

                if (!this.address_form.hasOwnProperty('city') || this.address_form.city == "") {
                    return false
                }

                if (!this.address_form.hasOwnProperty('subdistrict') || this.address_form.subdistrict == "") {
                    return false
                }

                if (!this.address_form.hasOwnProperty('address') || this.address_form.address == "") {
                    return false
                }

                if (!this.address_form.hasOwnProperty('postcode') || this.address_form.postcode == "") {
                    return false
                }

                return true
            },
            warnCheckoutDataCompletion() {
                this.$swal({
                    title: 'Oops!',
                    text: 'Please complete checkout data to continue',
                    type: 'warning'
                })
            }
        },
        created() {
            this.checkAvailableBranches()
            this.getShippingAddresses()
            this.getProvinces()
            this.generateUniqueCode()
            this.setTotalPayment()
            this.getDefaultShippingAddresses()
        }
    }
</script>

<style>
.modal-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .5);
    display: table;
    transition: opacity .3s ease;
}

.modal-wrapper {
    display: table-cell;
    vertical-align: middle;
}

.modal-container {
    width: 50%;
    margin: 0px auto;
    padding: 20px 30px;
    background-color: #fff;
    border-radius: 2px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
    transition: all .3s ease;
    font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
    margin-top: 0;
    color: #42b983;
}

.modal-body {
    margin: 20px 0;
}

.modal-default-button {
    float: right;
}

/*
* The following styles are auto-applied to elements with
* transition="modal" when their visibility is toggled
* by Vue.js.
*
* You can easily play with the modal transition by editing
* these styles.
*/
.modal-enter {
    opacity: 0;
}

.modal-leave-active {
    opacity: 0;
}

.modal-enter .modal-container, .modal-leave-active .modal-container {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
}
</style>