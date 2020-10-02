opensdg.annotationPresets = {
    common: {
        // This "common" preset is applied to all annotations automatically.
        label: {
            backgroundColor: 'black',
            fontColor: 'white',
        },
        // This "highContrast" overrides colors when in high-contrast mode.
        highContrast: {
            label: {
                backgroundColor: 'white',
                fontColor: 'black'
            }
        },
        // This callback is used to generate a generic description for screenreaders.
        // This can be overridden to be a more specific string, eg:
        //
        //     description: 'Chart annotation showing a 2030 target of 15%'
        //
        description: function() {
            var descriptionParts = ['Chart annotation'];
            if (this.label && this.label.enabled && this.label.content) {
                descriptionParts.push(translations.t(this.label.content));
            }
            if (typeof this.value !== 'undefined') {
                descriptionParts.push(this.value);
            }
            return descriptionParts.join(': ');
        },
    },
    target_line: {
        type: 'line',
        mode: 'horizontal',
        borderColor: '#505a5f',
        borderDash: [5, 5],
        label: {
            position: 'right',
            content: '2030 Target',
        },
    },
};
