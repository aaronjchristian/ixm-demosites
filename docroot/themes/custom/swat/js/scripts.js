/**
 * @file
 * Simple helpers for the swat theme.
 */

(function ($, Drupal, drupalSettings) {

  'use strict';

  // Observe body padding-top from admin toolbar.
  var observer = new MutationObserver(function (mutations) {
    var header = $('header');
    var newPadding = mutations[0].target.style.paddingTop || 0;

    if(!$(header).closest(".bs-responsive-preview").length) {
      header.css('margin-top', newPadding);
      document.getElementById('layout-container').style.marginTop = header.get(0).getBoundingClientRect().bottom - parseInt(newPadding, 10) + 'px';
    }
  });

  // Doc Ready.
  document.addEventListener("DOMContentLoaded", function() {
    observer.observe(document.getElementsByTagName("BODY")[0], {attributes: true, attributeFilter: ["style"]});
  });

  // Set main container for fixed header + admin toolbar.
  var debounceHeader = Drupal.debounce(function () {
    var header = $('header');
    var bodyPadding = $('body').css('padding-top') || '0';

    if(!$(header).closest(".bs-responsive-preview").length) {
      header.css('margin-top', bodyPadding);
      document.getElementById('layout-container').style.marginTop = header.get(0).getBoundingClientRect().bottom - parseInt(bodyPadding, 10) + 'px';
    }
  }, 250);

  // No need for behaviors on window events.
  window.addEventListener('resize', debounceHeader);
  window.addEventListener('load', debounceHeader);

  /**
   * Core/Misc behaviours.
   */
  Drupal.behaviors.swatMisc = {
    attach: function (context, settings) {
    }
  };

})(jQuery, Drupal, drupalSettings);
