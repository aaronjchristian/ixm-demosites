/**
 * @file
 * Header helpers for the swat4 theme.
 */

(function ($, Drupal) {

  'use strict';

  /**
   * Header behaviours.
   */
  Drupal.behaviors.swat4Header = {
    attach: function (context, settings) {

      // Search toggle on desktop.
      $('.search-toggle', context).click(function(e){
        e.preventDefault();
        $('#search-overlay').addClass('open');
        $('body').addClass('search-overlay');
        return false;
      });

      // Escape key for a11y.
      $(document).once('search-esc-trigger', context).keyup(function (e) {
        if (e.keyCode === 27) {
          if ($('body.search-overlay').length) {
            $('body').removeClass('search-overlay');
            $('#search-overlay').removeClass('open');
          }
        }
      });

      // Close overlay.
      $('.search-exit', context).click(function () {
        $('body').removeClass('search-overlay');
        $('#search-overlay').removeClass('open');
      });

      // Support for nested BS dropdowns.
      $('.dropdown-menu a[data-toggle="dropdown"]', context).on('click', function (e) {
        var $this = $(this);
        if (!$this.next().hasClass('show')) {
          $this.parents('.dropdown-menu').first().find('.show').removeClass('show');
        }
        var $subMenu = $this.next('.dropdown-menu');
        $subMenu.toggleClass('show');

        $this.toggleClass('show');
        return false;
      });

    }
  };

  // Remove if header is not fixed.
  var debounceHeader = Drupal.debounce(function () {
    var body = document.getElementsByTagName('body')[0];
    var header = document.getElementsByTagName('header')[0];
    var bodyPadding = body.style.paddingTop || '0';

    // Set main container for fixed header + admin toolbar.
    if (header.classList.contains('fixed-top')) {
      header.style.marginTop = bodyPadding;
      document.getElementById('layout-container').style.marginTop = header.getBoundingClientRect().bottom - parseInt(bodyPadding, 10) + 'px';
    }
  }, 250);

  // No need for behaviors on window events.
  window.addEventListener('resize', debounceHeader);
  window.addEventListener('load', debounceHeader);
  window.addEventListener('visibilitychange', debounceHeader);

})(jQuery, Drupal);
