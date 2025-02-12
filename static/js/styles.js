"use strict";

// I've made this function because I'm using ajax to load content on the search page
// and therefor i need to initialize the newly created tooltips on the newly created html again,
// by calling this function.
function applyTooltipinItialization() {
    $("[data-toggle='tooltip']").tooltip({
        container: "body",
        delay: {show: 20, hide: 200},
        html: true
    });
    $("[data-toggle='tooltip']").on('show.bs.tooltip', function (event) {
        let tooltipTriggerEl = $(event.target);
        if (!tooltipTriggerEl.parents('.modal').length) {
            // Change the z-index so tooltips that are not part of a modal doesn't overlap the modal!
            $('.tooltip').css('z-index', 1049);
        }
    });
}

$(function () {
    $(" form[enctype='multipart/form-data']").on("submit", function () {
        $("#picture-selection-group").css("display", "none");
    });

    function applyWaitStylingOnAction() {
        let $searchInput = $("#search-input");
        $("a#action").addClass("disabled").html("Please wait...");
        $("button#action").attr("disabled", true).html("Please wait...");
        $("#search-button").attr('disabled', true);
        $searchInput.autocomplete().disable();
        $searchInput.trigger("blur");
    }

    /* For some odd reason i need to select "a#get" instead of just "#get" before the home button works on the home page */
    $("a#get").on("click", function () {
        $(this).addClass("disabled").html("Please wait...");
    });
    $(" form").on("submit", function () {
        applyWaitStylingOnAction();
    });
    $("#action[type!='submit']").on("click", function () {
        applyWaitStylingOnAction();
    });
    $("a#action").on("click", function () {
        applyWaitStylingOnAction();
    });
    $("input:checkbox").on("keypress", function (e) {
        e.preventDefault();
        if (e.key === "Enter") {
            $(this).trigger("click");
        }
    });
    applyTooltipinItialization();
    $("[data-toggle='dropdown']").dropdown({
        boundary: "window"
    });
});

function insertFlashMessage(message, category = "Warning") {
    $.notify({
        icon: getIconByCategory(category),
        title: `<strong>${category}:</strong>`,
        message: message
    }, {
        newest_on_top: true,
        showProgressbar: true,
        type: category.toLowerCase(),
        placement: {
            from: "top",
            align: "center"
        },
        offset: Cookies.get("spoilerconsent_status") ? 85 : 300,
        spacing: 20,
        mouse_over: "pause",
        animate: {
            enter: "animated bounceIn",
            exit: "animated bounceOut"
        },
        template: `<div data-notify="container" class="col-sm-9 col-11 col-md-7 alert alert-{0}" role="alert">
            <button type="button" aria-hidden="true" class="close" data-notify="dismiss">×</button>
            <span data-notify="icon"></span>&nbsp;<span data-notify="title">{1}</span>&nbsp;<span data-notify="message">{2}</span>
            <div class="progress" data-notify="progressbar">
            <div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0;"></div>
            </div></div>`
    });
}

function insertStaticAlert(message, category = "Warning") {
    return `<div id="static-alert" class="alert alert-${category.toLowerCase()} alert-dismissible shadow-sm fade show animated shake mt-3 mb-4" role="alert">
                <i class="${getIconByCategory(category)}"></i>&nbsp;<strong>${category}:</strong>&nbsp;${message}
                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>`;
}