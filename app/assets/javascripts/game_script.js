$(document).ready(function(){

})

$(document).on('click','.save_score',function(e){
	e.preventDefault();
	frame = $('#frame_count').val();
	var t1 = $('#game_try1').val()
	var t2 = $('#game_try2').val()
	t1 = isNaN(t1) ? 0 : parseInt(t1)
	t2 = isNaN(t2) ? 0 : parseInt(t2)	
	var g_id = $('#game_game_id').val()
	if(t1 > 10 || t2 > 10 || t1 < 0 || t2 < 0 ){
		alert('The two try value should be between 0 to 10')
		return false;
	}
	if((t1 + t2) > 10){
		alert('The two try value should be less than or equal to 10 ')
		return false;
	}
	$.ajax({
	  type: "POST",
	  url: '/games',
	  dataType: 'json',
	  data: {try: [t1,t2],frame_id: frame,game_id: g_id ,user_id: $('#user_id').val()},
	  success: function(data){
	  		alert(data.message)
	  		add_frame(data.data)
	  }
	})
});

$(document).on('click','.edit_score',function(e){
	tr = $('#frame_count').val();
	var score_row_id = $('.row'+ tr + ' .score_row_id').val()
	$.ajax({
	  type: "GET",
	  url: '/games/'+score_row_id +'/edit',
	  dataType: 'json',
	  data: {try: [t1,t2],spare: [s1,s2],frame_id: tr ,score_id: score_row_id},
	  success: function(data){
	  		alert(data.message)
	  		add_frame(data.data)
	  }
	})
})

function add_frame(data){
	var row_count = data.frame_id
	if(row_count <= 9){
		var html = $('.frame-score').html();
		var old_frame_seq_score = data.old_frame_seq_score
		$('.score_details .panel-body tbody').append(html);
		$('.score_details .score_id:last').val(data.id)
		$('#frame_count').val(parseInt(row_count))
		$('seq_'+parseInt(row_count)-1).val(data.old_frame_seq_score)
		$.each($('.score_details .row:last div'),function(i,e){ 
			attr = e.getAttribute('name')
			if(attr == 'frame')
				e.innerHTML = data.frame_id
			else if(attr == 'try1')
				e.innerHTML = data.try_score[0]
			else if(attr == 'try2')
				e.innerHTML = data.try_score[1]
			else if(attr == 'total')
				e.innerHTML = data.score
			else if(attr == 'sequence'){
				e.innerHTML = data.subsequent_score
				e.setAttribute('class','seq_'+parseInt(row_count))
			}
		})
	}
	else{
		alert('Only Ten Frame per Game')
	}
};



$(document).on('click','.new_game',function(e){
	e.preventDefault();
	$('.show_game').show();
	$('#user_id').prop('disabled', true);
	$.ajax({
	  type: "GET",
	  url: '/games/create',
	  data: {user_id: $('#user_id').val(),game_id: $('#game_game_id').val(),type: 'create'},
	  success: function(data){
	  		alert(data.message)
	  		$('.new_game').attr('disabled', true);
	  		
	  }
	})
})

$(document).on('click','.end_game',function(e){
	e.preventDefault();
	$.ajax({
	  type: "GET",
	  url: '/games/end',
	  dataType: 'json',
	  data: {user_id: $('#user_id').val(),game_id: $('#game_game_id').val()},
	  success: function(data){
	  		alert(data.message)
	  		location.reload();
	 
	  }
	})
})
if($('.score_details').length > 0){
	jQuery(function($) {

	  $(window).bind("beforeunload", function(event) {
	    return "This is the message you're allowed to provide";
	  });

	});
}
function openCity(evt, cityName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    //document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " active";
}
$(document).on('click','.show_score',function(e){
	var game_id = $(this).attr('attr-game-id')
	var user_id = $(this).attr('attr-user-id')
	 $.get("/games/"+game_id+"?user_id="+user_id+"&type=show",function(data){
	 	
        $('#scoreboard_split').html(data)
        $('.letspop').trigger('click')
        //$(".show_score_data").trigger('click')
      });
})


