let e = {
    avatar
        :
        "https://firebasestorage.googleapis.com/v0/b/eventcrafter-82e46.appspot.com/o/avatar%2Favatar1.png?alt=media&token=c9a92381-c142-41a4-98e8-eb9a1ad455c5",
    carCapacity
        :
        "20",
    category
        :
        "birthday party",
    city
        :
        "surat",
    country
        :
        "india",
    description
        :
        "abc",
    economy
        :
        "30",
    economy_price
        :
        "15",
    endDate
        :
        "Thu Aug 29 2024 17:00:00 GMT-0700 (Pacific Daylight Time)",
    endTime
        :
        "13:00",
    likedBy
        :
        1,
    name
        :
        "antra",
    offers
        :
        ['food'],
    participants
        :
        0,
    pdfFile
        :
        [],
    photos
        :
        [
            {
                url
                    :
                    "https://firebasestorage.googleapis.com/v0/b/eventcrafter-82e46.appspot.com/o/img%2Fd23efe43-4629-494d-bca8-6ef5f927e80a?alt=media&token=c1538e9a-10a1-466c-b175-90c813b66f59",
                _id
                    :
                    "66c87da83c2e7bb657c929bb"
            }
        ],
    startDate
        :
        "Fri Aug 23 2024 17:00:00 GMT-0700 (Pacific Daylight Time)",
    startTime
        :
        "05:00",
    status
        :
        "draft",
    street
        :
        "abc",
    subscriber
        :
        0,
    subtitle1
        :
        "",
    subtitle2
        :
        "",
    surname
        :
        "talaviya",
    title
        :
        "birthday party",
    type
        :
        "public",
    userId
        :
        "6658cd787b713f50f0ba1439",
    videoFile
        :
        "",
    vip
        :
        "20",
    vip_price
        :
        "10",
    _id
        :
        "66c87da83c2e7bb657c929ba"
}

let upev = Object.keys(e).reduce((acc, key) => {
    if (key !== "_id") {
        acc[key] = e[key]
    }
    return acc
}, {})
let upev1 = Object.fromEntries(
    Object.entries(e).filter(([key, val]) => key !== "_id")
)
console.log(upev1)
const intent = {
    id: 'cs_test_a1LZGnIKfkaE1eDv50sFkWKt5vbyA7ENUFgTHC07mpJdTyfyYHDjnLStXT',
    object: 'checkout.session',
    adaptive_pricing: { enabled: false },
    after_expiration: null,
    allow_promotion_codes: null,
    amount_subtotal: 994,
    amount_total: 994,
    automatic_tax: { enabled: false, liability: null, status: null },
    billing_address_collection: null,
    cancel_url: null,
    client_reference_id: null,
    client_secret: 'cs_test_a1LZGnIKfkaE1eDv50sFkWKt5vbyA7ENUFgTHC07mpJdTyfyYHDjnLStXT_secret_fidwbEhqYWAnPydgaGdgYWFgYScpJ2lkfGpwcVF8dWAnPyd2bGtiaWBabHFgaCcpJ3dgYWx3YGZxSmtGamh1aWBxbGprJz8nZGlyZHx2J3gl',
    consent: null,
    consent_collection: null,
    created: 1731482596,
    currency: 'usd',
    currency_conversion: null,
    custom_fields: [],
    custom_text: {
        after_submit: null,
        shipping_address: null,
        submit: null,
        terms_of_service_acceptance: null
    },
    customer: null,
    customer_creation: 'if_required',
    customer_details: null,
    customer_email: null,
    expires_at: 1731568995,
    invoice: null,
    invoice_creation: {
        enabled: false,
        invoice_data: {
            account_tax_ids: null,
            custom_fields: null,
            description: null,
            footer: null,
            issuer: null,
            metadata: {},
            rendering_options: null
        }
    },
    livemode: false,
    locale: null,
    metadata: {},
    mode: 'payment',
    payment_intent: null,
    payment_link: null,
    payment_method_collection: 'if_required',
    payment_method_configuration_details: { id: 'pmc_1PEsFTSGO3pe3b4NeJFemF91', parent: null },
    payment_method_options: { card: { request_three_d_secure: 'automatic' } },
    payment_method_types: ['card'],
    payment_status: 'unpaid',
    phone_number_collection: { enabled: false },
    recovered_from: null,
    redirect_on_completion: 'always',
    return_url: 'http://localhost:3000/return?session_id={CHECKOUT_SESSION_ID}',
    saved_payment_method_options: null,
    setup_intent: null,
    shipping_address_collection: null,
    shipping_cost: null,
    shipping_details: null,
    shipping_options: [],
    status: 'open',
    submit_type: null,
    subscription: null,
    success_url: null,
    total_details: { amount_discount: 0, amount_shipping: 0, amount_tax: 0 },
    ui_mode: 'embedded',
    url: null
}



const success = {
    id: 'cs_test_a1RTzQgHuPeVlrujFeG9BnH7PWSnl4cLvSWYhwHsX3tk3mFLDZj8fStdGl',
    object: 'checkout.session',
    adaptive_pricing: { enabled: false },
    after_expiration: null,
    allow_promotion_codes: null,
    amount_subtotal: 994,
    amount_total: 994,
    automatic_tax: { enabled: false, liability: null, status: null },
    billing_address_collection: null,
    cancel_url: null,
    client_reference_id: null,
    client_secret: null,
    consent: null,
    consent_collection: null,
    created: 1731484848,
    currency: 'usd',
    currency_conversion: null,
    custom_fields: [],
    custom_text: {
        after_submit: null,
        shipping_address: null,
        submit: null,
        terms_of_service_acceptance: null
    },
    customer: null,
    customer_creation: 'if_required',
    customer_details: {
        address: {
            city: 'surat',
            country: 'IN',
            line1: 'Pasodara',
            line2: 'cheharmata',
            postal_code: '394326',
            state: 'GJ'
        },
        email: 'antratalaviya@gmail.com',
        name: 'Antra',
        phone: null,
        tax_exempt: 'none',
        tax_ids: []
    },
    customer_email: null,
    expires_at: 1731571248,
    invoice: null,
    invoice_creation: {
        enabled: false,
        invoice_data: {
            account_tax_ids: null,
            custom_fields: null,
            description: null,
            footer: null,
            issuer: null,
            metadata: {},
            rendering_options: null
        }
    },
    livemode: false,
    locale: null,
    metadata: {},
    mode: 'payment',
    payment_intent: 'pi_3QKbVlSGO3pe3b4N0nsQyPme',
    payment_link: null,
    payment_method_collection: 'if_required',
    payment_method_configuration_details: { id: 'pmc_1PEsFTSGO3pe3b4NeJFemF91', parent: null },
    payment_method_options: { card: { request_three_d_secure: 'automatic' } },
    payment_method_types: ['card'],
    payment_status: 'paid',
    phone_number_collection: { enabled: false },
    recovered_from: null,
    redirect_on_completion: 'always',
    return_url: 'http://localhost:3000/return?session_id={CHECKOUT_SESSION_ID}',
    saved_payment_method_options: null,
    setup_intent: null,
    shipping_address_collection: null,
    shipping_cost: null,
    shipping_details: null,
    shipping_options: [],
    status: 'complete',
    submit_type: null,
    subscription: null,
    success_url: null,
    total_details: { amount_discount: 0, amount_shipping: 0, amount_tax: 0 },
    ui_mode: 'embedded',
    url: null
}