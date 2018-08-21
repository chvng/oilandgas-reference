/**
 * @author Chuong N.
 */

$(document).ready(function() {
    let $results = $('#results');  
    let $category = $(".category");

    $.getJSON('../js/reference.json', function(data) {
        console.log(data); // testing if this works
        
        $(data).each(function (i, reference) {
            $results.append(showResults(reference))
        });
    });


    /**
     * This function shows the output to HTML with the data from
     * JSON file {reference.json}.
     */
    function showResults(result) {
        return `
        <div class="col-3">
            ${result.name}
        </div>
        `
    }

});
