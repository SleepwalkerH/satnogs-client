function AnimateRotate(from, to) {
    // caching the object for performance reasons
    var $elem = $('#current-pass-arrow');

    // we use a pseudo object for the animation
    // (starts from `0` to `angle`), you can name it as you want
    $({deg: from}).animate({deg: to}, {
        duration: 2000,
        step: function(now) {
            $elem.css({
                transform: 'rotate(' + now + 'deg)'
            });
        }
    });
}

var counter = 45;
setInterval(function(){
    AnimateRotate(counter,counter+45);
    counter = counter + 45;
    if (counter == 405) {
    	counter = 45;
    }
}, 1000);

$(function(){
  $('#config-save-button').on('click', function(e){
    var table = document.getElementById("config-table");
    var array = {};
	array.configuration = {};
	for (var i = 1, row; row = table.rows[i]; i++) {
	    array.configuration[row.cells[0].innerText] = row.cells[1].innerText;	    
	}
	var json = JSON.stringify(array);
	postJSONData(json, "POST", "/config_update");
  })
});

function postJSONData(JSONData, localMode, url) {
        var localJSONData = JSONData;
        var postMode = localMode;

         $.ajax({
                type: postMode,
                url: url,
                contentType:"application/json; charset=utf-8",
                dataType:"json",
                data:  JSONData,
                success: function(data){
					console.log("POST success");
                }   // Success Function
		}); // AJAX Call

}