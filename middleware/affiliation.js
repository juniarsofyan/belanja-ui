export default function ({ app, store, query, redirect }) { 
    const affiliation = store.getters['authentication/affiliation']

    if (!affiliation) {
        const aff = query.aff
        if (aff) {
            app.$axios.post(`affiliation/check`, {
                aff: aff
            })
            .then(response => {
                if (response.data.data != 0) {
                    store.dispatch('authentication/setAffiliation', response.data.data)
                } else {
                    redirect("https://bellezkin.com/")
                }
            })
        } else {
            redirect("https://bellezkin.com/")
        }
    }
}