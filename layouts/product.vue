<template>
    <div>
        <!-- <Topbar /> -->
        <Header />
        <HeaderMobile />
        <MenuDrawer />
        <div class="main-content main-content-details single no-sidebar">
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
    }
}
</script>
