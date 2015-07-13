$(document).ready(function() {
  var nextURL;
  $('.getVideos').submit(function(event) {
    $('.popular').html('');

    var video = $(this).find("input[name='videos']").val();
    console.log(video)

    $.ajax({
    type:"GET",
    url: "https://api.instagram.com/v1/tags/" + video + "/media/recent?access_token=341290126.e6b92ba.ef366927f98e43e2a9fc5b855da43628&max_tag_id=1026669534125882303" ,
    dataType: 'jsonp',
    limit: 60,
    success: function(response) {
      console.log(response);

      var data = response.data;
      nextURL = response.pagination.next_url

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

      if($('.popular').html() == ''){
        if(response.pagination.next_url){
          $('.popular').html('<li> No Videos on this page of results please hit next above </li>').fadeIn()
        }
        else {
          $('.popular').html('<li> There are no more results for this hashtag </li>').fadeIn()
        }
      }
      //   $.ajax({
      //   type:"GET",
      //   url: nextURL,
      //   dataType: 'jsonp',
      //   limit: 60,
      //   success: function(response) {
      //     $('.popular').html('')
      //     console.log(response);
      //     var data = response.data;
      //     nextURL = response.pagination.next_url
      //
      //     $.each(data, function(i, val){
      //       if (val.type == "video"){
      //         $('.popular').append("<li>" + "<p class='user'> Username: " + "<b>" + val.user.full_name + "</b></p>" + "<a target='_blank' href='" + val.link +
      //       "'><video src='" + val.videos.standard_resolution.url + "' class='vid' controls></video></a></li>");
      //       }
      //     })
      //
      // }
      // })


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
});
})
// END submit

$('#next').click(function() {
  $.ajax({
  type:"GET",
  url: nextURL,
  dataType: 'jsonp',
  limit: 60,
  success: function(response) {
    $('.popular').html('')
    console.log(response);
    var data = response.data;
    nextURL = response.pagination.next_url

    $.each(data, function(i, val){
      if (val.type == "video"){
        $('.popular').append("<li>" + "<p class='user'> Username: " + "<b>" + val.user.full_name + "</b></p>" + "<a target='_blank' href='" + val.link +
      "'><video src='" + val.videos.standard_resolution.url + "' class='vid' controls></video></a></li>");
      }
    })

    if($('.popular').html() == ''){
      if(response.pagination.next_url){
        $('.popular').html('<li> No Videos on this page of results please hit next above </li>').fadeOut("slow").fadeIn("slow")
      }
      else {
        $('.popular').html('<li> There are no more results for this hashtag </li>')
      }
    }

}
})
});
});
