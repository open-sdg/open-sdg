klaroConfig.lang = '{{ page.language }}';
klaroConfig.translations = {
    {{ page.language }}: {
        acceptAll: {{ page.t.cookies.acceptAll | jsonify }},
        acceptSelected: {{ page.t.cookies.acceptSelected | jsonify }},
        close: {{ page.t.cookies.close | jsonify }},
        consentModal: {
            description: {{ page.t.cookies.consentModal_description | jsonify }},
            title: {{ page.t.cookies.consentModal_title | jsonify }},
        },
        consentNotice: {
            changeDescription: {{ page.t.cookies.consentNotice_changeDescription | jsonify }},
            description: {{ page.t.cookies.consentNotice_description | jsonify }},
            learnMore: {{ page.t.cookies.consentNotice_learnMore | jsonify }},
            testing: {{ page.t.cookies.consentNotice_testing | jsonify }},
        },
        contextualConsent: {
            acceptAlways: {{ page.t.cookies.contextualConsent_acceptAlways | jsonify }},
            acceptOnce: {{ page.t.cookies.contextualConsent_acceptOnce | jsonify }},
            description: {{ page.t.cookies.contextualConsent_description | jsonify }},
        },
        decline: {{ page.t.cookies.decline | jsonify }},
        ok: {{ page.t.cookies.ok | jsonify }},
        poweredBy: {{ page.t.cookies.poweredBy | jsonify }},
        privacyPolicy: {
            name: {{ page.t.cookies.privacyPolicy_name | jsonify }},
            text: {{ page.t.cookies.privacyPolicy_text | jsonify }},
        },
        purposeItem: {
            service: {{ page.t.cookies.purposeItem_service | jsonify }},
            services: {{ page.t.cookies.purposeItem_services | jsonify }},
        },
        purposes: {
            functional: {
                description: {{ page.t.cookies.purposes_functional_description | jsonify }},
                title: {{ page.t.cookies.purposes_functional_title | jsonify }},
            },
            analytics: {
                description: {{ page.t.cookies.purposes_analytics_description | jsonify }},
                title: {{ page.t.cookies.purposes_analytics_title | jsonify }},
            },
        },
        save: {{ page.t.cookies.save | jsonify }},
        service: {
            disableAll: {
                description: {{ page.t.cookies.service_disableAll_description | jsonify }},
                title: {{ page.t.cookies.service_disableAll_title | jsonify }},
            },
            optOut: {
                description: {{ page.t.cookies.service_optOut_description | jsonify }},
                title: {{ page.t.cookies.service_optOut_title | jsonify }},
            },
            purpose: {{ page.t.cookies.service_purpose | jsonify }},
            purposes: {{ page.t.cookies.service_purposes | jsonify }},
            required: {
                description: {{ page.t.cookies.service_required_description | jsonify }},
                title: {{ page.t.cookies.service_required_title | jsonify }},
            },
        },
    },
};
var allRequired = true;
klaroConfig.services.forEach(function(service) {
    if (!service.required) {
        allRequired = false;
    }
    if (service.name === 'contrast') {
        service.translations = {
            {{ page.language }}: {
                description: {{ page.t.cookies.contrast_description | jsonify }},
                title: {{ page.t.cookies.contrast_title | jsonify }},
            },
        }
    }
    else if (service.name === 'cookie_settings') {
        service.translations = {
            {{ page.language }}: {
                description: {{ page.t.cookies.cookie_settings_description | jsonify }},
                title: {{ page.t.cookies.cookie_settings | jsonify }},
            },
        }
    }
    else if (service.name === 'google-analytics') {
        service.translations = {
            {{ page.language }}: {
                description: {{ page.t.cookies.google_analytics_description | jsonify }},
                title: {{ page.t.cookies.google_analytics_title | jsonify }},
            },
        }
    }
});

if (allRequired) {
    klaroConfig.translations['{{ page.language }}'].consentNotice.description = {{ page.t.cookies.all_required_notice | jsonify }};
    klaroConfig.translations['{{ page.language }}'].ok = {{ page.t.cookies.all_required_ok | jsonify }};
    klaroConfig.hideDeclineAll = true;
    klaroConfig.hideLearnMore = true;
}
