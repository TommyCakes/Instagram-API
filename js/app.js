// + "<img class='picture' src =" 
//         + data[i].images.standard_resolution.url + ">" ).show();



$(document).ready(function() {
  var nextURL;


  $('.getVideos').submit(function(event) {
    $('.popular').html('');
    var video = $(this).find("input[name='videos']").val();
    $.trim(video.replace(/\s+/g, ''));
        console.log(video);
        console.log($.trim(video.replace(/\s+/g, ''))); 

$.ajax({
    type:"GET",
    url: "https://api.instagram.com/v1/tags/" + video + "/media/recent?access_token=341290126.e6b92ba.ef366927f98e43e2a9fc5b855da43628&max_tag_id=1026669534125882303" , 
    dataType: 'jsonp',
    success: function(response) {
      console.log(response);


      var data = response.data;
      nextURL = response.pagination.next_url


      
  $.each(data, function(i, val) {
    if (val.type == "video"){
   
      $('.popular').append("<li>" + "<p class='user'> Username: " + "<b>" + val.user.full_name + "</b></p>" + "<a target='_blank' href='" + val.link +
       "'><video src='" + val.videos.standard_resolution.url + "' class='vid' controls></video></a></li>");

    }
  })


    if($('.popular').html() == ''){
      if(response.pagination.next_url) {


    $('.popular').html('<h2> No Videos can be displayed, please hit next </h2>')
    }
    else  {
        $('.popular').html('<h2 id="none"> There are no more video matching this hastag!</h2>')
        }
      }
    }
  });
})

$('#next').click(function() {
  $.ajax({
    type:"GET",
    url: nextURL,
    dataType: 'jsonp',
    
    success: function(response) {
      $('.popular').html('')
      console.log(response);

      var data = response.data;
      nextURL = response.pagination.next_url

    $.each(data, function(i, val) {
      if (val.type == "video"){
        var user = val.user.full_name;

       $('.popular').append("<li>" + "<p class='user'> Username: " + "<b>" + user + "</b></p>" + "<a target='_blank' href='" + val.link +
      "'><video src='" + val.videos.standard_resolution.url + "' class='vid' controls></video></a></li>");

    }
  })

  if($('.popular').html() == ''){
    if(response.pagination.next_url){
      $('.popular').html('<h2> No Videos can be displayed, please hit next</h2>')
    }
    else {
      $('.popular').html('<h2 id="none"> There are no more video matching this hastag!</h2>')
  }
}

}
})
});
 });

    

