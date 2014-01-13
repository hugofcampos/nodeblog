$(document).ready(function(){
  $('#search').on('click', function(){    
    if($('#searchtext').val()!=''){
      window.location = '/'+$('#searchtext').val();
    }
  });
});