var hardcoded_data = [{
                  mapping_entity:"Piyush",
                  score: 0.78,
                  type:"Person"
                },
                {
                  mapping_entity:"Piyush",
                  score: 0.56,
                  type:"Person"
                },{
                  mapping_entity:"Amazon",
                  score: 1,
                  type:"Organization"
                }, {
                  mapping_entity:"Television",
                  score: 1,
                  type:"Appliance"
                }
              ];

$(function() {
    $('#search').click(function() {
        event.preventDefault();
        $("#search_results").html('');
        var searchString = $("#searchString").val();
        if( searchString ==='' || !searchString){
          showAlertMessage('Please enter a string to Search');
        } else {

          showResults(searchString, hardcoded_data);//Comment this when using ajax call, only for demo purpose

          // //*******UNCOMMENT THIS PART******
          // $.ajax({
          //     type: 'GET',
          //     url: 'http://172.16.0.155:5000/v0/full',//modify the URL
          //     // headers: {"Access-Control-Allow-Origin": "*"},
          //     data: {"value":searchString},
          //     // contentType: "application/JSON",
          //     // cache: false,
          //     success: function(data){
          //       showResults(searchString, data)
          //     },
          //     error: function(err){
          //       // $("#search_text_display").html("<span>Showing results for : "+searchString);
          //       console.log(err);
          //       showAlertMessage('Couldn\'t find any results for the selected text');
          //     }
          // });
        }
    });
});
function closeAlertBox(){
  window.setTimeout(function () {
    $("#notification").fadeOut(300)
  }, 1500);
}
function showResults(searchString, data){
  $("#search_text_display").addClass("well");
  $("#search_text_display").html("<span>Showing results for : "+searchString + "</span>");
  // data.response[0][Object.keys(test.response[0])[0]]
  // for (var i = 0; i < data.response.length; i++) {
          var temp = data;
  //     var temp = data.response[i][Object.keys(data.response[i])[0]]
          for (var i = 0; i < data.length; i++) {
            var path='',
                heading = "<h4>"+temp[i].mapping_entity+"</h4>",
                image = "<img src='"+path+"' alt='' class=''>",
                tag = "<div class='tag'>"+temp[i].type+"</div>",
                wikilink = "<div class='link'><span>Confidence : "+temp[i].score+"</span><a href='https://en.wikipedia.org/wiki/"+temp[i].mapped_entity+"'><i class='fa fa-wikipedia-w fa-1'></i></a></div>";
            var cardTemplate = "<div class='card row'><div class='col-md-4 col-sm-5 col-xs-5'>"+image+"</div><div class='col-md-8 col-sm-7 col-xs-7 no-right-pad'>"+heading+tag+wikilink+"</div></div>"
            $("#search_results").append(cardTemplate);
          }
  // }
}

function showAlertMessage(message){
  // Function for generating alert messages
  $("#notification").fadeIn();
  closeAlertBox();
  $('#notification-message').html(message);
}
