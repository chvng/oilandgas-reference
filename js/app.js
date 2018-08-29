/**
 * @author Chuong N.
 */

$(document).ready(function () {
    // Variables
    let $results = $('#results');
    let $segment = $('#segment');
    let $scope = $('#scope');

    /**
     * Fetching JSON from the file..
     * REMINDER: Replace ["../references.json"] with provided link from Sitefinity when going online.
     */
    $.getJSON("../references.json", function (data) {
        showAll(data);
        selectedSegment(data);
        selectedScope(data);
    });

    function selectedScope(data) {
        $scope.change(function() {
            $results.empty();
            $.each(data, function(i, ref) {
                $.each(ref.scope, function(j, scope) {
                    if($scope.val() === scope) {
                        console.log(ref.name+" -- "+ref.scope); // Test
                        appendJSON(ref);
                    }
                }); 
            });
        });
    }

    function selectedSegment(data) {
        $segment.change(function() {
            $results.empty();
            $.each(data, function(i, ref) {
                if($segment.val() === ref.segment) {
                    console.log(ref.name+" -- "+ref.segment); // Test
                    appendJSON(ref);
                }
            });
        });
    }

    function showAll(data) {
        $.each(data, function(i, ref) {
            appendJSON(ref);
        });
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
                    <span class="container__text--header">${data.name}</span>
                    <p>${data.description}</p>
                </div>
            </div>
            </a>
        `);
        // For some slightly fancy animation
        $(output).hide().appendTo($results).fadeIn(500);
    }

    /**
     * Passing the JSON data to HTML page.
     * Not sure if this will be needed anymore - keeping it anyways.
    function htmlJSON(data) {
        let output = [];

        // Going through for-loop to get the individual objects.
        for(let i = 0; i < data.length; i++) {
            output.push(`
            <a href=${data[i].link}>
                <div class="col-3 col-3--md">
                    <div class="container__image">
                        <img src=${data[i].image} class="img--resize">
                    </div>
                    <div class="container__text">
                        <span class="container__text--header">${data[i].name}</span>
                        <p>${data[i].description}</p>
                    </div>
                </div>
            </a>
            `);
        }
        // Output to HTML.
        $results.html(output.join(''));
    }
    */

}); // END DOCUMENT
