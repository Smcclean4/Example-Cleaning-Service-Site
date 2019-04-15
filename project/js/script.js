$(document).ready(function() {
  window.onload = function() {
    const target = document.getElementById('bg');
    $(target).fadeIn('slow', function() {
      $(target).css('display', ' ');
    });
  }
});
