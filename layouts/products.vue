<template>
    <div>
        <!-- <Topbar /> -->
        <Header :key="componentKey" />
        <HeaderMobile />
        <MenuDrawer />
        <div class="main-content main-content-product no-sidebar">
            <div class="container">
                <nuxt />
            </div>
        </div>
        <Footer />
        <FooterMobile />
        <a href="#" class="backtotop">
            <i class="pe-7s-angle-up"></i>
        </a>
    </div>
</template>

<script>
export default {
    components: {
        // Topbar: () => import('~/components/Topbar'),
        Header: () => import('~/components/Header'),
        HeaderMobile: () => import('~/components/HeaderMobile'),
        MenuDrawer: () => import('~/components/MenuDrawer'),
        Footer: () => import('~/components/Footer'),
        FooterMobile: () => import('~/components/FooterMobile')
    },
    data() {
        return {
            componentKey: 0
        }
    },
    methods: {
        forceRerender() {
            this.componentKey += 1
        }
    },
}
</script>
