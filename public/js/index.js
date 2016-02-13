// obtenemos el width y el color segun el data-attribute
$(document).ready(function() {
  $('.barras').each(function() {
     var dataWidth = $(this).data('value');
     $(this).css("width", dataWidth + "%");
    if (dataWidth <=5) { $(this).css("background-color", "green"); }
		else if (dataWidth >5 && dataWidth <=10){ $(this).css("background-color", "orange"); }
		else if (dataWidth >10 && dataWidth<=25) { $(this).css("background-color", "yellow"); }
		else if (dataWidth >25 && dataWidth<=50) { $(this).css("background-color", "blue"); }	
  });
});