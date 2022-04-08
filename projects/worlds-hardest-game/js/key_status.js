$(function() {
    window.keydown = {};
    
    function keyName(event) {
        event.preventDefault();
      return jQuery.hotkeys.specialKeys[event.which] ||
        String.fromCharCode(event.which).toLowerCase();
    }
    
    $(document).bind("keydown", function(event) {
        event.preventDefault();
      keydown[keyName(event)] = true;
    });
    
    $(document).bind("keyup", function(event) {
        event.preventDefault();
      keydown[keyName(event)] = false;
    });
  });