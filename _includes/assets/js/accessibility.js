var accessibilitySwitcher = function() {

  var contrastIdentifiers = ['default', 'high'],
      contrastType = "{{ site.contrast_type }}" || "default",
      singleToggle = (contrastType === 'long' || contrastType === 'single');

  if (contrastType === 'long') {
    $('body').addClass('long');
  }
  function setActiveContrast(newContrast) {
    var oldContrast = getActiveContrast();
    if (oldContrast !== newContrast) {
      _.each(contrastIdentifiers, function(id) {
        $('body').removeClass('contrast-' + id);
      });
      $('body').addClass('contrast-' + newContrast);

      createCookie("contrast", newContrast, 365);

      if (singleToggle) {
        flipAllContrastLinks(oldContrast, newContrast);
      }
    }
  }

  function flipAllContrastLinks(newContrast, oldContrast) {
    var title = getContrastToggleTitle(newContrast),
        label = getContrastToggleLabel(newContrast);
        gaAttributes = opensdg.autotrack('switch_contrast', 'Accessibility', 'Change contrast setting', newContrast);
    $('[data-contrast-switch-to]')
      .data('contrast-switch-to', newContrast)
      .attr('title', title)
      .attr('aria-label', title)
      .attr(gaAttributes)
      .html(label)
      .parent()
        .addClass('contrast-' + newContrast)
        .removeClass('contrast-' + oldContrast);
  }

  function getActiveContrast() {
    var contrast = _.filter(contrastIdentifiers, function(id) {
      return $('body').hasClass('contrast-' + id);
    });

    return contrast.length > 0 ? contrast[0] : contrastIdentifiers[0];
  }

  function createCookie(name,value,days) {
    if (days) {
      var date = new Date();
      date.setTime(date.getTime()+(days*24*60*60*1000));
      var expires = "; expires="+date.toGMTString();
    }
    else expires = "";
    document.cookie = name+"="+value+expires+"; path=/";
  }

  function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
      var c = ca[i];
      while (c.charAt(0)==' ') c = c.substring(1,c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
  }

  window.onunload = function(e) {
    var contrast = getActiveContrast();
    createCookie("contrast", contrast, 365);
  }

  var cookie = readCookie("contrast");
  var contrast = cookie ? cookie : contrastIdentifiers[0];
  setActiveContrast(contrast);
  imageFix(contrast);

  ////////////////////////////////////////////////////////////////////////////////////

  $('[data-contrast-switch-to]').click(function() {

    var oldContrast = getActiveContrast();
    var newContrast = $(this).data('contrast-switch-to');

    if (oldContrast !== newContrast) {
      setActiveContrast(newContrast);
      imageFix(newContrast);
      broadcastContrastChange(newContrast, this);
    }
  });

  function broadcastContrastChange(contrast, elem) {
    var event = new CustomEvent('contrastChange', {
      bubbles: true,
      detail: contrast
    });
    elem.dispatchEvent(event);
  }

  function getContrastToggleLabel(identifier){
    if (contrastType === "long") {
      if (identifier === "default") {
        return translations.header.default_contrast.replace(' ', '<br>');
      }
      else if (identifier === "high") {
        return translations.header.high_contrast.replace(' ', '<br>');
      }
    }
    else {
      return 'A'
    }
  }

  function getContrastToggleTitle(identifier){
    if (identifier === "default") {
      return translations.header.disable_high_contrast;
    }
    else if (identifier === "high") {
      return translations.header.enable_high_contrast;
    }
  }


  function imageFix(contrast) {
    var doNotSwitchTheseSuffixes = ['.svg'];
    if (contrast == 'high')  {
      _.each($('img:not([src*=high-contrast])'), function(image) {
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
      _.each($('img[src*=high-contrast]'), function(goalImage){
        $(goalImage).attr('src', $(goalImage).attr('src').replace('high-contrast/', ''));
      })
    }
  };

};
