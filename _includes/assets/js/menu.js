$(function() {

  // @deprecated start
  if (typeof translations.search === 'undefined') {
    translations.search = { search: 'Search' };
  }
  if (typeof translations.general === 'undefined') {
    translations.general = { hide: 'Hide' };
  }
  if (typeof translations.cookies === 'undefined') {
    translations.cookies = { cookie_settings: 'Cookie settings' };
  }
  // @deprecated end

  var topLevelSearchLink = $('.top-level span:eq(1), .top-level button:eq(1)');

  var resetForSmallerViewport = function() {
    topLevelSearchLink.text('Search');
    $('.top-level li').removeClass('active');
    $('.top-level span').removeClass('open');
  };

  var topLevelMenuToggle = document.querySelector("#menuToggle");

  topLevelMenuToggle.addEventListener("click", function(){
    setTopLevelMenuAccessibilityActions();
  });
  function setTopLevelMenuAccessibilityActions(){
    if(topLevelMenuIsOpen()){
      setAriaExpandedStatus(true);
      focusOnFirstMenuElement();
    }
    else{
      setAriaExpandedStatus(false);
    }
    function topLevelMenuIsOpen(){
      return topLevelMenuToggle.classList.contains("active");
    }
    function setAriaExpandedStatus(expandedStatus){
      topLevelMenuToggle.setAttribute("aria-expanded", expandedStatus.toString());
    }
    function focusOnFirstMenuElement(){
      var firstMenuElement = getFirstMenuElement();
      firstMenuElement.focus();
    }
    function getFirstMenuElement(){
      return document.querySelector("#menu .nav-link:first-child a");
    }
  }

  $('.top-level span, .top-level button').click(function() {
    var target = $(this).data('target');

    $('.top-level li').removeClass('active');
    topLevelSearchLink.text('Search');

    var targetEl = $('#' + target);
    var wasVisible = targetEl.is(':visible');

    // hide everything:
    $('.menu-target').hide();
    $(".top-level li button[data-target='" + target + "']").attr("aria-expanded", "false");

    if(target === 'search') {
      // TODO: This is never used and needs to be revisited.
      $(this).toggleClass('open');

      if($(this).hasClass('open') || !wasVisible) {
        $(this).text(translations.general.hide);
      } else {
        $(this).text(translations.search.search);
      }
    } else if (target === 'search-mobile') {
      topLevelMenuToggle.setAttribute('aria-expanded', false);
      $(topLevelMenuToggle).find('> button').attr('aria-expanded', false);
    } else {
      // menu click, always hide search:
      topLevelSearchLink.removeClass('open');
      topLevelSearchLink.text(translations.search.search);
    }

    if(!wasVisible) {
      targetEl.show();
      $(".top-level li button[data-target='" + target + "']").attr("aria-expanded", "true");
      $(this).parent().addClass('active');
      $('#indicator_search').focus();
    }
  });

  $(window).on('resize', function(e) {
    var viewportWidth = window.innerWidth,
        previousWidth = $('body').data('vwidth'),
        breakpointWidth = 768;

    if(viewportWidth > breakpointWidth && previousWidth <= breakpointWidth) {
      // switched to larger viewport:
      $('.menu-target').show();
    } else if(previousWidth >= breakpointWidth && viewportWidth < breakpointWidth) {
      // switched to smaller viewport:
      $('.menu-target').hide();
      resetForSmallerViewport();
    }

    // update the viewport width:
    $('body').data('vwidth', viewportWidth);
  });

  // Add the cookie settings link in the footer.
  {% if site.cookie_consent_form.enabled %}
  if (klaroConfig && klaroConfig.noAutoLoad !== true) {
    var cookieLink = $('<li class="cookie-settings"><a>' + translations.cookies.cookie_settings + '</a></li>');
    $(cookieLink).click(function() {
        klaro.show();
    });
    $('#footerLinks ul').append(cookieLink);
  }
  {% endif %}
});
