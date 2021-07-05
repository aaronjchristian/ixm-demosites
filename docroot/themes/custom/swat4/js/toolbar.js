/**
 * @file
 * Helper for fixed headers when using admin toolbar..
 */

(function () {

  'use strict';

  // Observe body padding-top from admin toolbar.
  var observer = new MutationObserver(function (mutations) {
    var header = document.getElementsByTagName('header')[0];
    if (header.classList.contains('fixed-top')) {
      var newPadding = mutations[0].target.style.paddingTop || 0;
      header.style.marginTop = newPadding;
      document.getElementById('layout-container').style.marginTop = header.getBoundingClientRect().bottom - parseInt(newPadding, 10) + 'px';
    }
  });

  // Doc Ready.
  document.addEventListener("DOMContentLoaded", function() {
    observer.observe(document.getElementsByTagName("BODY")[0], {attributes: true, attributeFilter: ["style"]});
  });

})();
