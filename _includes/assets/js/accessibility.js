var accessibilitySwitcher = function () {

    function getActiveContrast() {
        return $('body').hasClass('contrast-high') ? 'high' : 'default';
    }

    function setHighContrast() {
        $('body')
            .removeClass('contrast-default')
            .addClass('contrast-high');
        var title = translations.header.disable_high_contrast;
        var gaAttributes = opensdg.autotrack('switch_contrast', 'Accessibility', 'Change contrast setting', 'default');
        $('[data-contrast-switch-to]')
            .attr('data-contrast-switch-to', 'default')
            .attr('title', title)
            .attr('aria-label', title)
            .attr(gaAttributes);

        imageFix('high');
        createCookie('contrast', 'high', 365);
    }

    function setDefaultContrast() {
        $('body')
            .removeClass('contrast-high')
            .addClass('contrast-default');
        var title = translations.header.enable_high_contrast;
        var gaAttributes = opensdg.autotrack('switch_contrast', 'Accessibility', 'Change contrast setting', 'high');
        $('[data-contrast-switch-to]')
            .attr('data-contrast-switch-to', 'high')
            .attr('title', title)
            .attr('aria-label', title)
            .attr(gaAttributes);

        imageFix('default');
        createCookie('contrast', 'default', 365);

    }

    $('[data-contrast-switch-to]').click(function () {
        var newContrast = $(this).attr('data-contrast-switch-to');
        var oldContrast = getActiveContrast();
        if (newContrast === oldContrast) {
            return;
        }
        if (newContrast === 'high') {
            setHighContrast();
            broadcastContrastChange('high', this);
        }
        else {
            setDefaultContrast();
            broadcastContrastChange('default', this);
        }

    });

    function createCookie(name, value, days) {
        if (days) {
            var date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            var expires = "; expires=" + date.toGMTString();
        }
        else expires = "";
        document.cookie = name + "=" + value + expires + "; path=/";
    }

    function readCookie(name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }

    function imageFix(contrast) {
        var doNotSwitchTheseSuffixes = ['.svg'];
        if (contrast == 'high') {
            _.each($('img:not([src*=high-contrast])'), function (image) {
                var src = $(image).attr('src').toLowerCase();
                var switchThisImage = true;
                for (var i = 0; i < doNotSwitchTheseSuffixes.length; i++) {
                    var suffix = doNotSwitchTheseSuffixes[i];
                    if (src.slice(0 - suffix.length) === suffix) {
                        switchThisImage = false;
                    }
                }
                if (switchThisImage) {
                    $(image).attr('src', $(image).attr('src').replace('img/', 'img/high-contrast/'));
                }
            });
        } else {
            // Remove high-contrast
            _.each($('img[src*=high-contrast]'), function (goalImage) {
                $(goalImage).attr('src', $(goalImage).attr('src').replace('high-contrast/', ''));
            })
        }
    };

    function broadcastContrastChange(contrast, elem) {
        var event = new CustomEvent('contrastChange', {
            bubbles: true,
            detail: contrast
        });
        elem.dispatchEvent(event);
    }

    window.onunload = function (e) {
        var contrast = getActiveContrast();
        createCookie('contrast', contrast, 365);
    }

    var cookie = readCookie('contrast');
    var contrast = cookie ? cookie : 'default';
    if (contrast === 'high') {
        setHighContrast();
    }
    else {
        setDefaultContrast();
    }

};
