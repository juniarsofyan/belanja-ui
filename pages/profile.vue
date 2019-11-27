<template>
    <!--wrap main content-->
    <div class="main-content main-content-checkout">
        <div class="container">
            <div class="row">
                <div class="col-lg-12">
                    <hr />
                    <div class="tab-details-product" style="margin-bottom:30px;margin-top:0px;">
                        <!-- <ul class="tab-link">
                            <li class="active">
                                <a data-toggle="tab" aria-expanded="true" href="#profil"><i class="fa fa-user"></i>&nbsp;My Profile</a>
                            </li>
                            <li>
                                <a
                                    data-toggle="tab"
                                    aria-expanded="true"
                                    href="#semua "
                                ><i class="fa fa-book"></i>&nbsp;Address Book</a>
                            </li>
                        </ul> -->

                        <!-- {{ address }} -->

                        <div class="tab-container">
                            <div id="profil" class="tab-panel active">
                                <div class="col-md-10 col-md-offset-1">
                                    <div class="shipping-address-form-wrapp">
                                        <div
                                            class="shipping-address-form checkout-form"
                                            style="padding: 35px 27px 20px 27px !important; border:0px;"
                                        >
                                            <div class="col-12">
                                                <div class="shipping-address">
                                                    <p class="col-12">
                                                        <label class="text">Nama</label>
                                                        <input
                                                            type="text"
                                                            style="width:100%"
                                                            class="input-text"
                                                            v-model="profile.name"
                                                            id="name"
                                                            ref="name"
                                                        />
                                                    </p>
                                                    <p class="col-12">
                                                        <label class="text">Tanggal Lahir</label>
                                                        <input
                                                            type="date"
                                                            style="width:100%"
                                                            class="form-control"
                                                            v-model="profile.birthdate"
                                                            id="birthdate"
                                                            ref="birthdate"
                                                        />
                                                    </p>
                                                    <p class="col-12">
                                                        <label class="text">Telepon</label>
                                                        <input
                                                            type="text"
                                                            style="width:100%"
                                                            class="input-text"
                                                            v-model="profile.phone"
                                                            id="phone"
                                                            ref="phone"
                                                        />
                                                    </p>
                                                    <p class="col-12">
                                                        <label class="text">Email</label>
                                                        <input
                                                            type="email"
                                                            style="width:100%"
                                                            class="input-text"
                                                            v-model="profile.email"
                                                            id="email"
                                                            ref="email"
                                                            readonly
                                                        />
                                                    </p>

                                                    <template>
                                                        <br />
                                                        <hr />
                                                        <br />
                                                        <p class="col-12">
                                                            <label class="text">Province</label>
                                                            <br />
                                                            <select
                                                                style="width:100%;"
                                                                data-placeholder="London"
                                                                class="input-text"
                                                                tabindex="1"
                                                                @change="setProvinceToModel($event)"
                                                            >
                                                                <option disabled selected>- Choose Province -</option>
                                                                <option
                                                                    v-for="prov in provinces"
                                                                    :key="prov.province_id"
                                                                    :value="prov"
                                                                    :selected="(province ? province.province_id == prov.province_id : false)"
                                                                    :data-province-id="prov.province_id"
                                                                    :data-province-name="prov.province"
                                                                >{{ prov.province }}
                                                                </option>
                                                            </select>
                                                        </p>

                                                        <p class="col-12">
                                                            <label class="text">City</label>
                                                            <br />
                                                            <select
                                                                style="width:100%;"
                                                                data-placeholder="London"
                                                                class="input-text"
                                                                tabindex="1"
                                                                @change="setCityToModel($event)"
                                                            >
                                                                <option disabled selected>- Choose City -</option>
                                                                <option
                                                                    v-for="cty in cities"
                                                                    :key="cty.city_id"
                                                                    :value="cty"
                                                                    :selected="(city ? city.city_id == cty.city_id : false)"
                                                                    :data-city-id="cty.city_id"
                                                                    :data-city-name="cty.city_name"
                                                                >{{ cty.city_name }}
                                                                </option>
                                                            </select>
                                                        </p>

                                                        <p class="col-12">
                                                            <label class="text">Subdistrict</label>
                                                            <br />
                                                            <select
                                                                style="width:100%;"
                                                                data-placeholder="London"
                                                                class="input-text"
                                                                tabindex="1"
                                                                @change="setSubdistrictToModel($event)"
                                                            >
                                                                <option disabled selected>- Choose City -</option>
                                                                <option
                                                                    v-for="subdist in subdistricts"
                                                                    :key="subdist.subdistrict_id"
                                                                    :value="subdist"
                                                                    :selected="(subdistrict ? subdistrict.subdistrict_id == subdist.subdistrict_id : false)"
                                                                    :data-subdistrict-id="subdist.subdistrict_id"
                                                                    :data-subdistrict-name="subdist.subdistrict_name"
                                                                >{{ subdist.subdistrict_name }}
                                                                </option>
                                                            </select>
                                                        </p>

                                                        <p class="col-12">
                                                            <label class="text">Address</label>
                                                            <textarea
                                                                class="input-text"
                                                                id="exampleFormControlTextarea1"
                                                                rows="3"
                                                                v-model="address"
                                                            ></textarea>
                                                        </p>
                                                        <p class="col-12">
                                                            <label class="text">Post Code</label>
                                                            <input
                                                                type="text"
                                                                style="width:100%"
                                                                class="input-text"
                                                                v-model="postcode"
                                                            />
                                                        </p>
                                                    </template>
                                                    
                                                    <button
                                                        class="button"
                                                        @click="updateProfile"
                                                    >Save</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    layout: 'products',
    middleware: ['authentication', 'affiliation', 'authorization'],
    data() {
        return {
            profile: [],
            shipping_addresses: [],
            address : {},
            provinces: [],
            cities: [],
            subdistricts: [],
            // province: [],
            // city: [],
            // subdistrict: [],
            default_shipping_address: [],

            // new vars

            province: {},
            city: {},
            subdistrict: {},
            address: "",
            postcode: ""
        }
    },
    watch: {
        'province': {
            handler(val) {
                if (val) {
                    this.getCities(val.province_id)
                }
            },
            deep: true
        },
        'city': {
            handler(val) {
                if (val) {
                    this.getSubdistricts(val.city_id)
                }
            },
            deep: true
        },
        'email': {
            handler(val) {
                if (val) {
                    this.getProfile()
                }
            }
        }
    },
    computed: {
        ...mapGetters("authentication", ['email'])
    },
    methods: {
        async updateProfile() {
            this.$swal({
                title: "Processing...",
                // text: "Processing",
                allowEscapeKey: false,
                allowOutsideClick: false,
                onOpen: () => {
                    this.$swal.showLoading()
                },
            })

            await this.$axios.post(`profile/update`, {
                name: this.profile.name,
                birthdate: this.profile.birthdate,
                phone: this.profile.phone,
                email: this.profile.email
            }).then(response => {
                this.$swal({
                    // title: "",
                    text: "Profile saved!",
                    type: "success",
                })

                if (this.no_address_available) {
                    this.addNewAddress()
                } else {
                    this.updateAddress()
                }

                this.getProfile()

            }).catch(e => {
                console.log(e)
                this.$swal({
                    // title: "",
                    text:
                        "Tidak dapat terhubung ke server, Silahkan coba lagi nanti",
                    type: "error",
                    onOpen: () => {
                        this.$swal.hideLoading()
                    },
                })
            })
        },
        getProfile() {
            this.$axios.post(`profile/get`, {
                email: this.email
            })
            .then((response) => {
                
                this.profile =  {
                    // nik: response.data.data.nik,
                    name: response.data.data.nama,
                    birthdate: response.data.data.tgl_lahir,
                    phone: response.data.data.telepon,
                    email: response.data.data.email
                }

                this.getDefaultShippingAddresses()
            })
        },
        getDefaultShippingAddresses() {
            this.$axios.post(`shipping-address/current`, {
                email: localStorage.getItem('email')
            }).then(response => {
                if (response.data.data != 0) {
                    
                    const result = response.data.data

                    this.shipping_address_id = result.id

                    this.province = {
                        province_id : parseInt(result.provinsi_id),
                        province_name: result.provinsi_nama
                    }

                    this.city = {
                        city_id : parseInt(result.kota_id),
                        city_name: result.kota_nama
                    }

                    this.subdistrict = {
                        subdistrict_id : parseInt(result.kecamatan_id),
                        subdistrict_name: result.kecamatan_nama
                    }

                    this.address = result.alamat

                    this.postcode = result.kode_pos

                    this.no_address_available = false

                    this.$store.dispatch('checkout/setDeliveryAddress', result.id)
                } else {
                    this.shipping_address_Zid = false
                    
                    this.province = {
                        province_id : false,
                        province_name: false
                    }

                    this.city = {
                        city_id : false,
                        city_name: false
                    }

                    this.subdistrict = {
                        subdistrict_id : false,
                        subdistrict_name: false
                    }

                    this.address = ""

                    this.postcode = ""
                
                    this.no_address_available = true

                    this.$store.dispatch('checkout/setDeliveryAddress', false)
                }
            })
            .catch(e => {
                console.log(e)
            })
        },
        setProvinceToModel(event) {
            this.province.province_id = parseInt(event.target.options[event.target.options.selectedIndex].dataset.provinceId)
            this.province.province_name = event.target.options[event.target.options.selectedIndex].dataset.provinceName
        },
        setCityToModel(event) {
            this.city.city_id = parseInt(event.target.options[event.target.options.selectedIndex].dataset.cityId)
            this.city.city_name = event.target.options[event.target.options.selectedIndex].dataset.cityName
        },
        setSubdistrictToModel(event) {
            this.subdistrict.subdistrict_id = parseInt(event.target.options[event.target.options.selectedIndex].dataset.subdistrictId)
            this.subdistrict.subdistrict_name = event.target.options[event.target.options.selectedIndex].dataset.subdistrictName
        },
        addNewAddress() {
            // if (this.validateAddress()) {

                this.$axios.post(`shipping-address/add`, {
                    email: window.localStorage.getItem('email'),
                    name: this.profile.name,
                    phone: this.profile.phone,
                    province_id: this.province.province_id,
                    province_name: this.province.province_name,
                    city_id: this.city.city_id,
                    city_name: this.city.city_name,
                    subdistrict_id: this.subdistrict.subdistrict_id,
                    subdistrict_name: this.subdistrict.subdistrict_name,
                    address: this.address,
                    postcode: this.postcode
                }).then(response => {
                    if (response.data.data == 1) {
                        this.getDefaultShippingAddresses()
                    }
                })
                .catch(e => {
                    console.log(e)
                })
            // } else {
                
            // }
        },
        updateAddress() {
            this.$axios.post(`shipping-address/${this.shipping_address_id}/update`, {
                name: this.profile.name,
                phone: this.profile.phone,
                province_id: this.province.province_id,
                province_name: this.province.province_name,
                city_id: this.city.city_id,
                city_name: this.city.city_name,
                subdistrict_id: this.subdistrict.subdistrict_id,
                subdistrict_name: this.subdistrict.subdistrict_name,
                address: this.address,
                postcode: this.postcode
            })
            .then(response => {
                if (response.data.data == 1) {
                    
                }
            })
            .catch(e => {
                console.log(e)
            })
        },
        validateAddress() {
            if (this.name == "") {
                return false
            }

            if (this.phone == "") {
                return false
            }

            if (this.province == "" || this.province.length < 1) {
                return false
            }

            if (this.city == "" || this.city.length < 1) {
                return false
            }

            if (this.subdistrict == "" || this.subdistrict.length < 1) {
                return false
            }

            if (this.address == "") {
                return false
            }

            if (this.postcode == "") {
                return false
            }

            return true
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
        getCities(province_id) {
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
        getSubdistricts(city_id) {
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
    },
    created() {
        this.getProfile()
        this.getProvinces()
    }
}
</script>