(function($) {

  // jQuery document ready
  $(function() {

    // Select All text inside number inputs
    $("input[type=tel]").click(function() {
       $(this).select();
    });

    // this create variables to reduce the number of times needed to fetch
    // these ids from the DOM
    var $swim = $('#swim');
    var $bike = $('#bike');
    var $run = $('#run');

    // Default state to swim in case there is no hash
    // This has to be called outside the hashchange function
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

    // The change function needs to go before the check for state to bind the event
    // Then I can use the state variable because the hashchange has already occurred
    $('.units').change(function() {
      if (state === 'swim') {
        $swim.find('.speedText').text('/100 ' + $swim.find('.units').val());
      } else if (state ===  'bike') {
        if ($bike.find('.units').val() === 'Kilometers') {
          $bike.find('.speedText').text('kph');
        } else {
          $bike.find('.speedText').text('mph');
        }
      } else if (state === 'run') {
        
        if ($run.find('.units').val() === 'Kilometers') {
          $run.find('.speedText').text('Min/Kilometer');
        } else {
          $run.find('.speedText').text('Min/Mile');
        } 

        if ($run.find('.units').val() === '5K') {
          $run.find('.distance').val(3.1);
        } else if ($run.find('.units').val() === '10K') {
          $run.find('.distance').val(6.2);
        } else if ($run.find('.units').val() === 'Half Marathon') {
          $run.find('.distance').val(13.1);
        } else if ($run.find('.units').val() === 'Marathon') {
          $run.find('.distance').val(26.2);
        }   
      }
    });

    // Calculate function
    $('.calculate').click(function() {
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
              if (state === 'swim') {
                paceInSeconds = ((timeInSeconds * 100) / distance);
              } else if (state === 'run') {
                paceInSeconds = timeInSeconds / distance;
              }
              
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
