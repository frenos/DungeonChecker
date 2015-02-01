/**
 * Created by frenos on 01.02.2015.
 */

function buildDungeonTable() {
    $.getJSON("./data/dungeon_data_de.json", function (dungeondata) {
        dungeonscounter = 0;
        $.each(dungeondata.dungeons, function (index, value) {
            if (index % 3 == 0)
                $("#dungeontable").append('<div class="row"></div>');

            var dungeonContentHtml = "";
            dungeonContentHtml += '<div class="col-md-4"> <div class="thumbnail"> <img src="' + value.image + '">';
            dungeonContentHtml += '<div class="caption"> <h3>' + value.title + '</h3>';
            $.each(value.paths, function (pathindex, content) {
                dungeonContentHtml += '<label><input type="checkbox" id="' + value.title + content.name + '">' + content.name + '</label>'
            });
            dungeonContentHtml += '</div></div></div>';
            $(".row:last").append(dungeonContentHtml);
            });
        addChangeToCheckbox();
        loadCheckboxState();
        });
}

function addChangeToCheckbox() {
    $("input:checkbox").change(function () {
        localStorage[$(this).attr('id')] = this.checked;
    });
}

function loadCheckboxState() {
    $("input:checkbox").each(function () {
        var state = localStorage[$(this).attr('id')];
        if (state == undefined)
            state = false;
        $(this).prop('checked', $.parseJSON(state));
    })
}

function clearAllData() {
    localStorage.clear();
    location.reload();
}

$(document).ready(function () {
    buildDungeonTable();
});