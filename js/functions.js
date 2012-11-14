(function() {

  function calculate(form, id) {
    
  }

  // jQuery document ready
  $(function() {
    
    // Select All text inside number inputs
    $("input[type=number]").click(function() {
       $(this).select();
    });

    // Tabs UI
    $(window).hashchange( function(){

      var hash = location.hash;
      // Iterate over all nav links, setting the "selected" class as-appropriate.
      $('nav#tabs a').each(function(){
        var $this = $(this);
        $this[ $this.attr('href') === hash ? 'addClass' : 'removeClass' ]( 'selected' );
      
        $('section.tab').hide();

      if(hash === '#bike') {
        $('section#bike').show();
      } else if(hash === '#run') {
        $('section#run').show();
      } else {
        $('section#swim').show();
      }

      });
    })
    $(window).hashchange();



    var flag = 0;

    // Calculate Pace
    $('.calculate').click(function() {
      calculate("form", "id");
      var hours = $('.hours').val();
      var minutes = $('.minutes').val();
      var seconds = $('.seconds').val();
      var distance = parseFloat(($('.distance').val() == "") ? (0) : ($('.distance').val()));
      var pace = parseInt(($('.pace').val() == "") ? (0) : ($('.pace').val()));


      switch(flag) {
        case 0:
          if(hours == '' && minutes == '' && seconds == '') {
            if(distance > 0 && pace > 0) {
              seconds = (distance / (pace / 3600));
              var tm = new Date(seconds * 1000);
              hours = tm.getUTCHours();
              minutes = tm.getUTCMinutes();
              seconds = tm.getUTCSeconds();

              $('.hours').val(hours);
              $('.minutes').val(minutes);
              $('.seconds').val(seconds);
              flag = 1;
            }
          } else if(!distance) {
              hours = parseInt((hours == "") ? (0) : (hours));
              minutes = parseInt((minutes == "") ? (0) : (minutes));
              seconds = parseInt((seconds == "") ? (0) : (seconds));

              seconds += (hours * 3600) + (minutes * 60);
              
              if(seconds > 0 && pace > 0) {
                distance = pace * (seconds / 3600).toFixed(2);
                $('.distance').val(distance);
                flag = 2;
              }

            } else if(!pace) {
              hours = parseInt((hours == "") ? (0) : (hours));
              minutes = parseInt((minutes == "") ? (0) : (minutes));
              seconds = parseInt((seconds == "") ? (0) : (seconds));

              seconds += (hours * 3600) + (minutes * 60);
              if(seconds > 0 && distance > 0) {
                pace = (distance / (seconds / 3600)).toFixed(2);
                $('.pace').val(pace);
                flag = 3;
              }
            }
          break;

        case 1:
          if(distance > 0 && pace > 0) {
            seconds = (distance / (pace / 3600));
            var tm = new Date(seconds * 1000);
            hours = tm.getUTCHours();
            minutes = tm.getUTCMinutes();
            seconds = tm.getUTCSeconds();

            $('.hours').val(hours);
            $('.minutes').val(minutes);
            $('.seconds').val(seconds); 
          } else {
            flag = 0;
          }
          break;

        case 2:
          hours = parseInt((hours == "") ? (0) : (hours));
          minutes = parseInt((minutes == "") ? (0) : (minutes));
          seconds = parseInt((seconds == "") ? (0) : (seconds));

          seconds += (hours * 3600) + (minutes * 60);
          
          if(seconds > 0 && pace > 0) {
            distance = pace * (seconds / 3600).toFixed(2);
            $('.distance').val(distance);
          } else {
            flag = 0;
          }
          break;

        case 3:
          hours = parseInt((hours == "") ? (0) : (hours));
          minutes = parseInt((minutes == "") ? (0) : (minutes));
          seconds = parseInt((seconds == "") ? (0) : (seconds));

          seconds += (hours * 3600) + (minutes * 60);
          if(seconds > 0 && distance > 0) {
            pace = (distance / (seconds / 3600)).toFixed(2);
            $('.pace').val(pace);
          } else {
            flag = 0;
          }
          break;
      }
  
      return false;
    });
    
  });
})(jQuery);
