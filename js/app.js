// + "<img class='picture' src =" 
//         + data[i].images.standard_resolution.url + ">" ).show();



$(document).ready(function() {

  $('.getVideos').submit(function(event) {
    $('#searchResults').html('');

    var video = $(this).find("input[name='videos']").val();
    console.log(video)
    
    $.ajax({
    type:"GET",
    url: "https://api.instagram.com/v1/tags/" + video + "/media/recent?access_token=341290126.e6b92ba.ef366927f98e43e2a9fc5b855da43628&max_tag_id=1026669534125882303 " , 
    dataType: 'jsonp',
    limit: 60,
    success: function(data) {
      console.log(data);

      var data = data.data;

      // for(var i = 0; i < 30; i++) {
      //   $('.popular').append("<li>" + "<p class='user'> Username: " + "<b>" + data[i].user.full_name + "</b></p>" + "<a target='_blank' href='" + data[i].link +
      //   "'><img src='" + data[i].images.low_resolution.url + "'></img></a></li>");
      // }
      $.each(data, function(i, val){
        if (val.type == "video"){
          $('.popular').append("<li>" + "<p class='user'> Username: " + "<b>" + val.user.full_name + "</b></p>" + "<a target='_blank' href='" + val.link +
        "'><video src='" + val.videos.standard_resolution.url + "' class='vid' controls></video></a></li>");
        }
      })


   //      $('#submit').click(function() {
   //      $.each(data, function(i, item) {

   //      var picture = data[i].images.standard_resolution.url;
       
   //      $('.searchResults').append('<div id="results">' + "<h2 id='user'>" + '<p>Username:</p>' 
   //      + data[i].user.full_name + "</h2>" + "<img src =" 
   //      + data[i].user.profile_picture + ">"
   //      + "<img class='picture' src =" 
   //      + picture + ">" ).show();
   //     console.log(picture.length);
   //      if (picture.length < 20)
   //        picture ++
   // })  
   //    });
  // });
}
})
  });


  
 });
