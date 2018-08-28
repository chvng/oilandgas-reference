/**
 * @author Chuong N.
 */

$(document).ready(function () {
    // Variables
    let $results = $('#results');

    /**
     * Fetching JSON from the file..
     * REMINDER: Replace ["../references.json"] with provided link from Sitefinity when going online.
     */
    $.getJSON("../references.json", function (data) {

            selectedSegment(data);

    });

    function selectedSegment(data) {
        let $segment = $('#segment');
        $.each(data, function (i, ref) {
            $segment.change(function () {
                if ($(this).val() === ref.segment) {
                    console.log(ref.name);
                    htmlJSON(data);
                }
            });
        });
    }

    function htmlJSON(data) {
        var newHTML = [];
        for(let i = 0; i < data.length; i++) {
            newHTML.push('<div class="placeholder">' + data[i].name + '</div>');
        }
        $results.html(newHTML.join(""));
    }

    /**
     * Appending JSON data to HTML page.
     */
    function appendJSON(data) {
        $results.append(`
                    <div class="placeholder">
                        <h3>${data.name}</h3>
                        <br />
                        Segment: ${data.segment}
                        <br />
                        Scope: ${data.scope}
                    </div>
                `
        );
    }
}); // END DOCUMENT
