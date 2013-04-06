(function() {

  // jQuery document ready
  $(function() {
    
    // Select All text inside number inputs
    $("input[type=tel]").click(function() {
       $(this).select();
    });

    // Default state to swim in case there is no hash
    var state = 'swim';

    // Tabs UI
    $(window).hashchange(function(){
      var hash = location.hash;

      // Creating state variable based on hash 
      if (hash === '#swim') {
        state = 'swim';
      } else if (hash === '#bike') {
        state = 'bike';
      } else if (hash === '#run') {
        state = 'run';
      }

      // Adds Selected class to proper icon
      // Searching id, then using find is faster
      $('#tabs').find('a').each(function(){
      
        // Removes selected class from loop items
        $(this).removeClass('selected');

        // Adds selected to current tab
        $('a' + '#' + state + 'Tab').addClass('selected');
      }); // END navigation link loop

      $('section.tab').addClass('hide');
      // Removes hide class on selected tab to show form
      $('section' + '#' + state).removeClass('hide');
    }); // END hashchange function
    $(window).hashchange();

    // Change pace text based on distance selection
    if (state === 'swim') {
      $('#' + state).find('.units').change(function() {
        $('#' + state).find('.speedText').text('/100 ' + $('#' + state).find('.units').val());
      });
    } else if (state ===  'bike') {
      $('#' + state).find('.units').change(function() {
        if($('#' + state).find('.units').val() === 'Kilometers') {
          $('#' + state).find('.speedText').text('kph');
        } else {
          $('#' + state).find('.speedText').text('mph');
        }
      });
    } else if(state === 'run') {
      $('#' + state).find('.units').change(function() {
        if($('#' + state).find('.units').val() === 'Kilometers') {
          $('#' + state).find('.speedText').text('Min/Kilometer');
        } else {
          $('#' + state).find('.speedText').text('Min/Mile');
        }
      });
    }

    // Calculate function
    $('#' + state).find('.calculate').click(function() {
      var hours = $('#' + state).find('.hours').val();
      var minutes = $('#' + state).find('.minutes').val();
      var seconds = $('#' + state).find('.seconds').val();
      // if then shorthand (if) ? (then this) : (else this)
      var distance = parseFloat(($('#' + state).find('.distance').val() === "") ? (0) : ($('#' + state).find('.distance').val()));

      if (state === 'swim' || state === 'run') {
        var paceMinutes = parseInt(($('#' + state).find('.paceMinutes').val() === "") ? (0) : ($('#' + state).find('.paceMinutes').val()));
        var paceSeconds = parseInt(($('#' + state).find('.paceSeconds').val() === "") ? (0) : ($('#' + state).find('.paceSeconds').val()));
        var paceInSeconds = (paceMinutes * 60) + paceSeconds;
      } else if (state === 'bike') {
        // Pace = mph for biking (single value)
        var pace = parseInt(($('#' + state).find('.pace').val() === "") ? (0) : ($('#' + state).find('.pace').val()));
      }

      // Check to see if Time is empty
      if (hours === '' && minutes === '' && seconds === '') {
        // Check to see if distance and pace are greater than 0
        if(distance > 0 && pace > 0 || paceInSeconds > 0) {
          // If distance and pace > 0 calculates time
          if (state === 'swim' || state === 'run') {
            timeInSeconds = ((paceInSeconds * distance) / 100);
          } else if (state === 'bike') {
            timeInSeconds = (distance / pace) * 3600;
          }

          hours = Math.floor(timeInSeconds / 3600);
          minutes = Math.floor((timeInSeconds - hours * 3600) / 60);
          seconds = Math.floor(timeInSeconds - (hours * 3600) - (minutes * 60));

          // Prints values for hours, minutes, and seconds
          $('#' + state).find('.hours').val(hours);
          $('#' + state).find('.minutes').val(minutes);
          $('#' + state).find('.seconds').val(seconds);
        }

      // Check to see if distance is empty
      } else if(!distance) {
          hours = parseInt((hours === "") ? (0) : (hours));
          minutes = parseInt((minutes === "") ? (0) : (minutes));
          seconds = parseInt((seconds === "") ? (0) : (seconds));

          // Converts hours, minuts, and seconds to seconds
          timeInSeconds = (hours * 3600) + (minutes * 60) + seconds;

          // Check if time and pace > 0
          if(timeInSeconds > 0 && (pace > 0 || paceInSeconds > 0)) {

            // Calculates distance
            if (state === 'swim' || state === 'run') {
              
              paceInSeconds = (paceMinutes * 60) + paceSeconds;
              timeInSeconds = (hours * 3600) + (minutes * 60) + seconds;
              if (state === 'swim') {
                distance = (timeInSeconds * 100 / paceInSeconds).toFixed(2);
              } 

            } else if (state === 'bike') {
              distance = pace * (timeInSeconds / 3600).toFixed(2);
            }
            // Displays caluclated distance in distance field
            $('#' + state).find('.distance').val(distance);
          }

        } else if(!pace) {
          hours = parseInt((hours === "") ? (0) : (hours));
          minutes = parseInt((minutes === "") ? (0) : (minutes));
          seconds = parseInt((seconds === "") ? (0) : (seconds));
          timeInSeconds = (hours * 3600) + (minutes * 60) + seconds;
          if(timeInSeconds > 0 && distance > 0) {
            if (state === 'swim' || state === 'run') {
              paceInSeconds = ((timeInSeconds * 100) / distance);
              paceMinutes = Math.floor(paceInSeconds / 60);
              paceSeconds = Math.round(paceInSeconds % 60);
              $('#' + state).find('.paceMinutes').val(paceMinutes);
              $('#' + state).find('.paceSeconds').val(paceSeconds);

            } else if (state === 'bike') {
              pace = (distance / (timeInSeconds / 3600)).toFixed(2);
              $('#' + state).find('.pace').val(pace);
            }
          }
        }
    });
    
  });
})(jQuery);
