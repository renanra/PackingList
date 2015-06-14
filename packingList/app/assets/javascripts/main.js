$(function() {

  ////////////////////////// DRAG A TRIP TO TRASH CAN /////////////////////////

  $(".stack").draggable();
  $('#trash').droppable({
    drop: function(event, ui) {
      if (ui.draggable.parent('.sortable').length) {
        ui.draggable
          .clone()
          .appendTo('#trash')
          .addClass("sort-drop")
          .css(ui.position)
          .hide(500);

        ui.draggable.hide();
        //console.log(ui, event);
      } else {
        ui.draggable.hide(500);

        setTimeout(function() {
          ui.draggable.remove();
          countTrips();
        }, 500)
      }

    }
  });
  ////////////////////////////// COUNT TRIPS /////////////////////////////////////
  function countTrips() {
    var tripCount = $(".container-fluid div#tripLi").length;
    $('#count-trips').empty();
    $('#count-trips').append(tripCount);
  }
  countTrips();
  ///////////////// TOGGLE BUTTON TO SHOW AND HIDE DEFAULT ITEMS////////////////

  $("#showAll").click(function() {
    $("#toggled").toggle("slow");
  });
    $("#custom").click(function() {
    $("#toggledCustom").toggle("slow");
  });

      function createCustomToPack(text) {
    var markup = '<li class="ui-state-default"><div class="checkbox"><label><input type="checkbox" value="" id="item" />' + text + '</label><button class="remove-item btn btn-default btn-xs pull-right"><span class="glyphicon glyphicon-remove"></span></button></div></li>';
    $('#customSortable').prepend(markup);
    $('.add-toPack').val('');
  }
  /////////////////////////////////// RENDERING DEFAULT ITEMS ON A TRIP PAGE////////////////////
  //  $('#checkbox').empty();
  $.ajax({
    url: "/api/default_items",
    success: function(all_items) {
      var template = $('.item-template').html();
      var info = Mustache.render(template, {
        default_items: all_items
      });
      //console.log(info);
      $('#checkbox').append(info);
    }
  });
  /////////////////////////////// WEATHER //////////////////////////////////////
  // jQuery(document).ready(function($) {
  $('#weather').click(function() {
     $('#loader').html('<img id="loader-img" alt="" src="http://i.imgur.com/IUwNLXT.gif" width="30" height="30" align="center" class="displayed"/>').hide().fadeIn("slow");
    var query = $("#query").text().split(', ');
    //console.log(query);
    var city = query.shift();
    var state = query.shift();
    var country = query.shift();
    $.ajax({
      url: "http://api.wunderground.com/api/c391db3a2a98fb5a/geolookup/conditions/q/" + state + "/" + city + ".json",
      dataType: "jsonp",
      success: function(parsed_json) {
        console.log(parsed_json.location)
        //  if (parsed_json.location == "undefined") {
        //  console.log("error")
        // $('#loader').empty();
        // $("#results").append("<h5 id = 'weatherResult'> City Not Found. </h5><h5> Please check the spelling of the Destination and try again.  </h5>");
        // $("#weatherResult").hide().show("slow");
        // } else {
        var location = parsed_json['location']['city'];
        var weather = parsed_json['current_observation']['weather'];
        var temp = parsed_json['current_observation']['temperature_string'];
        var feelsLike = parsed_json['current_observation']['feelslike_string'];
        var result = "It is " + weather + " in " + location + "." + "<br />" + "Current temperature is: " + temp + "<br />" + "Feels like: " + feelsLike;
        var icon = parsed_json['current_observation']['icon_url'];
        console.log(result);
        console.log("clicked");
        console.log(location)
        $('#loader').empty();
        // $('#loader').fadeOut( 1600 );
        $("#icon").append("<img src=" + icon + ">");
        $("#icon").hide().show("slow");
        // $("#icon").effect( "shake" );
        $("#results").append("<h5 id = 'weatherResult'>" + result + "</h5>");
        $("#weatherResult").hide().show("slow");
         //$("#weatherResult").effect( "shake" );
       // }
      },
      error: function(a, b, error){
        console.log(error)
        if (state == undefined) {
         console.log("error")
        $('#loader').empty();
        $("#results").append("<h5 id = 'weatherResult'> City Not Found. </h5><h5> Please check the spelling of the Destination and try again.  </h5>");
        $("#weatherResult").hide().show("slow");
        } 
      }
    });
  });
  // });
  /////////////////////////////////// PLACES AUTOCOMPLETE ////////////////////

  $(".location").autocomplete({
    source: function(request, response) {
      $.ajax({
        url: "http://gd.geobytes.com/AutoCompleteCity",
        dataType: "jsonp",
        data: {
          q: request.term
        },
        success: function(data) {
          response(data);
        }
      });
    },
    minLength: 3
  });
  ///////////////////////////////   END OF PLACES AUTOCOMPLETE ////////////////

  //////////////////////////////////////// To PACK ////////////////////////////
  // countTodos();
  // all packed btn
  $("#checkAll").click(function() {
    AllDone();
  });
  //create an item
  $('.add-toPack').on('keypress', function(e) {
    e.preventDefault;
    if (e.which == 13) {
      if ($(this).val() != '') {
        var todo = $(this).val();
        createCustomToPack(todo);
        countTodos();
      } else {
        // some validation
      }
    }
  });
  // mark item as packed

  $('.toPacklist').on('change', '#sortable li input[type="checkbox"]', '#checkIcon', function() {
    if ($(this).prop('checked')) {
      var doneItem = $(this).parent().parent().find('label').text();
      $(this).parent().parent().parent().addClass('remove');
      done(doneItem);
      countTodos();
    }
  });
  //delete item from "already packed"
  $('.toPacklist').on('click', '.remove-item', function() {
    removeItem(this);
  });
  // count how many items left to pack
  function countTodos() {
    var count = $("#sortable li").length;
    $('.count-todos').html(count);
  }
  //create your own item
  function createTodo(text) {
    var markup = '<li class="ui-state-default"><div class="checkbox"><label><input type="checkbox" value="" id="item" />' + text + '</label><button class="remove-item btn btn-default btn-xs pull-right"><span class="glyphicon glyphicon-remove"></span></button></div></li>';
    $('#sortable').prepend(markup);
    $('.add-toPack').val('');
  }
  //mark item as packed
  function done(doneItem) {
    var done = doneItem;
    var markup = '<li>' + done + '<button class="btn btn-default btn-xs pull-right  remove-item"><span class="glyphicon glyphicon-remove"></span></button></li>';
    $('#done-items').prepend(markup);
    $('.remove').remove();
  }
  //mark all tasks as done
  function AllDone() {
    var myArray = [];
    $('#sortable li').each(function() {
      myArray.push($(this).text());
    });
    // mark all as packed
    for (i = 0; i < myArray.length; i++) {
      $('#done-items').append('<li>' + myArray[i] + '<button class="btn btn-default btn-xs pull-right  remove-item"><span class="glyphicon glyphicon-remove"></span></button></li>');
    }
    // myArray
    $('#sortable li').remove();
    countTodos();
  }
  //remove packed item from list
  function removeItem(element) {
    $(element).parent().remove();
  }
  ////////////////////END OF TO PACK /////////////////
}); //end of ready function