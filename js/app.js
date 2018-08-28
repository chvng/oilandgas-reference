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
        htmlJSON(data);

    });

    function selectedSegment(data) {
        let $segment = $('#segment');
        $.each(data, function (i, ref) {
            $segment.change(function () {
                if ($(this).val() === ref.segment) {
                    console.log(ref.name);
                    htmlJSON(data, ref.segment);
                }
            });
        });
    }

    /**
     * Passing the JSON data to HTML page.
     */
    function htmlJSON(data, category) {
        let output = [];

        // Running through the data and push.
        for(let i = 0; i < data.length; i++) {
            output.push(`
            <a href=${data[i].link}>
                <div class="col-3 col-3--md"
                    <div class="placeholder">
                        <div class="container__image">
                            <img src=${data[i].image} class="img--resize">
                        </div>
                        <div class="container__text">
                            <span class="container__text--header">${data[i].name}</span>
                            <p>${data[i].description}</p>
                        </div>
                    </div>
                </div>
            </a>
            `);
        }
        // Showing the output in HTML.
        $results.html(output);
    }

    function ihtmlJSON(data, category) {
        let newHTML = [];

        for (let i = 0; i < data.length; i++) {
            if(data[i].segment === category)
            newHTML.push(`
            <div class="placeholder">
            <h3>${data[i].name}</h3>
            <br />
            Segment: ${data[i].segment}
            <br />
            Scope: ${data[i].scope}
            </div>
            `);
        }
        // console.log(newHTML);
        $results.html(newHTML);
    }

    /**
     * Appending JSON data to HTML page.
     * Currently not in use.
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
