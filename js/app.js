/**
 * @author Chuong N.
 * REMINDER: Replace ["../references.json"] with provided link from Sitefinity when going online.
 */

$(document).ready(function () {
    // Variables   
    let $results = $('#results');
    let $sector = $('#sector');
    let $application = $('#application');
    let $scope = $('#scope');
    let $geolocation = $('#geolocation');

    // Start program.
    program();

    function program() {
        rsAll();
        rsSearch();
        rsFilter();
    }

    /**
     * Appending all the results from JSON to HTML with no conditions.
     */
    function rsAll() {
        $.getJSON("../references.json", function(data) {
            $.each(data, function(i, reference) {
                appendJSON(reference);
            });
            rsCounter();
        });
    }

    /**
     * Function with a live search filter that matches either name or year in JSON.
     */
    function rsSearch() {
        let $search = $('#search');

        $.getJSON("../references.json", function(data) {
            $search.keyup(function() {
                $results.empty();
                let expression = new RegExp($search.val(), 'i');
                $.each(data, function(i, reference) {
                    if((reference.name.search(expression) !== -1) || (reference.year.search(expression) !== -1)) {
                        let output = (`
                        <a href=${reference.link}>
                            <div class="col-3 col-3--md">
                                <div class="container__image">
                                    <img src=${reference.image} class="img--resize">
                                </div>
                                <div class="container__text">
                                    <span class="container__text--h">${reference.name}</span>
                                    <p>${reference.description}</p>
                                </div>
                            </div>
                        </a>
                    `);
                    $(output).hide().appendTo($results).fadeIn(600);
                    }
                });
                rsCounter();
            });
        });
    }

    /**
     * Helper function to filter the right matching value from dropdown menus.
     */
    function rsFilter() {
        let all = "All";

        $.getJSON("../references.json", function(data) {
            $('#sector, #application, #scope, #geolocation').change(function() {
                // Empty the #results div on change.
                $results.empty();

                // Running through JSON data.
                $.each(data, function(i, reference) {
                    // Assign the values to give true when selected is "All".
                    let sector_value = $sector.val() == all;
                    let application_value = $application.val() == all; 
                    let scope_value = $scope.val() == false;
                    let location_value = $geolocation.val() == all;

                    // If the assigned value is not true.. 
                    if(!sector_value) sector_value = $sector.val() === reference.sector;
                    if(!application_value) application_value = $application.val() === reference.application;
                    if(!scope_value) scope_value = $scope.val().map(scope => reference.scope.includes(scope)).includes(true);
                    if(!location_value) location_value = $geolocation.val() === reference.location[0] || $geolocation.val() === reference.location[1];

                    // Append to HTML whenever the conditions matches.
                    if(sector_value && application_value && scope_value && location_value) appendJSON(reference); 
                });
                rsCounter();
            });
        });
    }

    /**
     * Helper function to count the number of ".result"-divs.
     */
    function rsCounter() {
        let $count = $('.result-count');
        let div_length = $('.col-3').length;

        $count.empty();

        if(!div_length) $count.hide().append(`<h2>The search criteria provided no results</h2>`).fadeIn(600);
        else $count.hide().append(`<h2>There are ${div_length} results listed below</h2>`).fadeIn(600);
    }

    /**
     * This function helps with appending JSON objects to HTML. 
     */
    function appendJSON(data) {
        let output = (`
            <a href=${data.link}>
                <div class="col-3 col-3--md">
                    <div class="container__image">
                        <img src=${data.image} class="img--resize">
                    </div>
                    <div class="container__text">
                        <span class="container__text--h">${data.name}</span>
                        <p>${data.description}</p>
                    </div>
                </div>
            </a>
        `);
        // For some slightly fancy animation
        $(output).hide().appendTo($results).fadeIn(600);
    }

    //=============================================================================//
    //                               STYLING4PRETTY                                //
    //=============================================================================//
    $sector.select2({
        minimumResultsForSearch: -1
    });

    $application.select2({
        minimumResultsForSearch: -1
    }); 

    $scope.select2({
        placeholder: "All scopes",
        minimumResultsForSearch: -1
    });

    $geolocation.select2({
        minimumResultsForSearch: -1,
        templateResult: function(data) {    
            if (!data.element) {
              return data.text;
            }
        
            let $element = $(data.element);
            let $wrapper = $('<span></span>');
            $wrapper.addClass($element[0].className);
            $wrapper.text(data.text);
        
            return $wrapper;
          }
    }); 


}); // END DOCUMENT
