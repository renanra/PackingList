// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//

//= require jquery
//= require jquery_ujs
//= require mustache
//= require twitter/bootstrap
//= require jquery.turbolinks
//= require turbolinks
//= require_tree .


/////////////////////////////////// RENDERING DEFAULT ITEMS ON A TRIP PAGE////////////////////
  $(function() {

        $.ajax({url: "/api/default_items", success: function(default_items){
        var template = $('.item-template').html();
        var info = Mustache.render(template, {default_items: default_items});
        $('#checkbox').append(info);

        }});
   

/////////////////////////////////// PLACES AUTOCOMPLETE ////////////////////

    // function log( message ) {
    //   $( "<div>" ).text( message ).prependTo( "#log" );
    //   $( "#log" ).scrollTop( 0 );
    // }
 
    $( ".location" ).autocomplete({
      source: function( request, response ) {
        $.ajax({
          url: "http://gd.geobytes.com/AutoCompleteCity",
          dataType: "jsonp",
          data: {
            q: request.term
          },
          success: function( data ) {
            response( data );
          }
        });
      },
      minLength: 3,
      // select: function( event, ui ) {
      //   log( ui.item ?
      //     "Selected: " + ui.item.label :
      //     "Nothing selected, input was " + this.value);
      // },
      // open: function() {
      //   $( this ).removeClass( "ui-corner-all" ).addClass( "ui-corner-top" );
      // },
      // close: function() {
      //   $( this ).removeClass( "ui-corner-top" ).addClass( "ui-corner-all" );
      // }
    });
///////////////////////////////   END OF PLACES AUTOCOMPLETE ////////////////

//////////////////////////////////////// To PACK ////////////////////////////

// countTodos();

// all packed btn
$("#checkAll").click(function(){
    AllDone();
});

//create an item
$('.add-toPack').on('keypress',function (e) {
      e.preventDefault;
      if (e.which == 13) {
           if($(this).val() != ''){
           var todo = $(this).val();
            createTodo(todo); 
            countTodos();
           }else{
               // some validation
           }
      }
});
// mark item as packed
$('.toPacklist').on('change','#sortable li input[type="checkbox"]',function(){
    if($(this).prop('checked')){
        var doneItem = $(this).parent().parent().find('label').text();
        $(this).parent().parent().parent().addClass('remove');
        done(doneItem);
        countTodos();
    }
});

//delete item from "already packed"
$('.toPacklist').on('click','.remove-item',function(){
    removeItem(this);
});

// count how many items left to pack
function countTodos(){
    var count = $("#sortable li").length;
    $('.count-todos').html(count);
}

//create your own item
function createTodo(text){
    var markup = '<li class="ui-state-default"><div class="checkbox"><label><input type="checkbox" value="" id="item" />'+ text +'</label><button class="remove-item btn btn-default btn-xs pull-right"><span class="glyphicon glyphicon-remove"></span></button><button class="check-item btn btn-default btn-xs pull-right"><span class="glyphicon glyphicon-ok"></span></button></div></li>';
    $('#sortable').prepend(markup);
    $('.add-toPack').val('');
}

//mark item as packed
function done(doneItem){
    var done = doneItem;
    var markup = '<li>'+ done +'<button class="btn btn-default btn-xs pull-right  remove-item"><span class="glyphicon glyphicon-remove"></span></button></li>';
    $('#done-items').prepend(markup);
    $('.remove').remove();
}

//mark all tasks as done
function AllDone(){
    var myArray = [];

    $('#sortable li').each( function() {
         myArray.push($(this).text());   
    });
    
    // add to done
    for (i = 0; i < myArray.length; i++) {
        $('#done-items').append('<li>' + myArray[i] + '<button class="btn btn-default btn-xs pull-right  remove-item"><span class="glyphicon glyphicon-remove"></span></button></li>');
    }
    
    // myArray
    $('#sortable li').remove();
    countTodos();
}

//remove done task from list
function removeItem(element){
    $(element).parent().remove();
}


////////////////////END OF TO PACK /////////////////



  }); //end of ready function 
