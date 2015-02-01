/**
 * Created by frenos on 01.02.2015.
 */
var dungeondata = null
$.getJSON("./data/dungeon_data_de.json", function(data){
        dungeondata = data;
        dungeonscounter = 0;
        $.each(dungeondata.dungeons, function(index, value){
            if(index % 3 == 0)
                $("#dungeontable").append('<div class="row"></div>');

            var dungeonContentHtml = "";
            dungeonContentHtml += '<div class="col-md-4"> <div class="thumbnail"> <img src="'+value.image+'">';
            dungeonContentHtml += '<div class="caption"> <h3>'+value.title+'</h3>';
            $.each(value.paths, function(pathindex, content){
                dungeonContentHtml += '<label><input type="checkbox">'+content.name+'</label>'
            });
            dungeonContentHtml += '</div></div></div>';
            $(".row:last").append(dungeonContentHtml);
        });
    });


