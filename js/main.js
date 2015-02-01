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
            dungeonContentHtml += '<div class="caption post-image"> <h3>' + value.title + '</h3>';
            dungeonContentHtml += '<div class="checkbox">';
            $.each(value.paths, function (pathindex, content) {
                dungeonContentHtml += '<label class="checkbox-inline"><input type="checkbox" id="' + value.title + content.name + '">' + content.name + '</label>'
            });
            dungeonContentHtml += '</div></div></div></div>';
            $(".row:last").append(dungeonContentHtml);
            });
        $("div.thumbnail").each(function () {
            $(this).children("div.caption").css(
                "width", $(this).width() - 20 + "px");
        });
        addChangeToCheckbox();
        loadCheckboxState();
        });
}

function addChangeToCheckbox() {
    $("input:checkbox").change(function () {
        localStorage[$(this).attr('id')] = this.checked;
        localStorage['lastSave'] = new Date();
    });
}

function loadCheckboxState() {
    if (localStorage['lastSave'] != undefined)
        var saveDate = new Date(localStorage['lastSave']);
    var ResetDate = new Date();
    ResetDate.setHours(1);
    ResetDate.setMinutes(0);
    if (saveDate < ResetDate) {
        localStorage.clear();
        $("#alert-container").html('<div class="alert alert-info alert-dismissable in">' +
        '<button type="button" class="close" ' +
        'data-dismiss="alert" aria-hidden="true">' +
        '&times;' +
        '</button>' +
        'Daily Reset, all cleared!' +
        '</div>');
        window.setTimeout(function () {
            $(".alert").fadeTo(1500, 0).slideUp(500, function () {
                $(this).remove();
            });
        }, 1800);
    }
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