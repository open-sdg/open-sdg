var accessibilitySwitcher = function() {

  var contrastIdentifiers = ['default', 'high'];

  function setActiveContrast(contrast) {
    var contrastType = "{{ site.contrast_type }}"
    _.each(contrastIdentifiers, function(id) {
      $('body').removeClass('contrast-' + id);
    });
    if(contrastType === "long"){
	    $("body").addClass("long");
    }
    $('body').addClass('contrast-' + contrast);

    createCookie("contrast", contrast, 365);
  }

  function getActiveContrast() {
    var contrast = _.filter(contrastIdentifiers, function(id) {
      return $('body').hasClass('contrast-' + id);
    });

    return contrast ? contrast : contrastIdentifiers[0];
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

  _.each(contrastIdentifiers, function(contrast) {
    var gaAttributes = opensdg.autotrack('switch_contrast', 'Accessibility', 'Change contrast setting', contrast);
    var contrastTitle = getContrastToggleTitle(contrast);
    $('.contrast-switcher').append($('<li />').attr({
      'class': 'nav-link contrast contrast-' + contrast
    }).html($('<a />').attr(gaAttributes).attr({
      'href': 'javascript:void(0)',
      'title': contrastTitle,
      'aria-label': contrastTitle,
      'data-contrast': contrast,
    }).html(getContrastToggleLabel(contrast).replace(" ", "<br/>")).click(function() {
      setActiveContrast($(this).data('contrast'));
      imageFix(contrast);
      broadcastContrastChange(contrast, this);
    })));
  });

  function broadcastContrastChange(contrast, elem) {
    var event = new CustomEvent('contrastChange', {
      bubbles: true,
      detail: contrast
    });
    elem.dispatchEvent(event);
  }

  function getContrastToggleLabel(identifier){
    var contrastType = "{{ site.contrast_type }}"
    if(contrastType === "long") {
      if(identifier === "default"){
        return translations.header.default_contrast;
      }
      else if(identifier === "high"){
        return translations.header.high_contrast;
      }
    }
    else {
      return 'A'
    }
  }

  function getContrastToggleTitle(identifier){
    if(identifier === "default"){
      return translations.header.disable_high_contrast;
    }
    else if(identifier === "high"){
      return translations.header.enable_high_contrast;
    }
  }


  function imageFix(contrast) {
    if (contrast == 'high')  {
      _.each($('img:not([src*=high-contrast])'), function(goalImage){
        if ($(goalImage).attr('src').slice(0, 35) != "https://platform-cdn.sharethis.com/") {
        $(goalImage).attr('src', $(goalImage).attr('src').replace('img/', 'img/high-contrast/'));
        }})
    } else {
      // Remove high-contrast
      _.each($('img[src*=high-contrast]'), function(goalImage){
        $(goalImage).attr('src', $(goalImage).attr('src').replace('high-contrast/', ''));
      })
    }
  };

};
