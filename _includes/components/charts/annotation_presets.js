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
        }
    },
    target_line: {
        type: 'line',
        mode: 'horizontal',
        borderColor: '#505a5f',
        borderDash: [5, 5],
        label: {
            position: 'right',
            enabled: true,
            content: '2030 Target',
        },
    },
};
