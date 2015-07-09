
$(document).ready(function () {
    //getTokens();
    getStylesheets();
})
//
//  BUILD COLOR SELECTOR INTERFACE
//
buildInterface = function (tokens) {
    $ui = $("<div>");
    $ui.css({
        position: "fixed",
        width: "40vw",
        height: "70vh",
        top: '15vh',
        right: '5vw',
        overflow  : 'auto',
        'padding' : '1em',
        'box-model': 'border-box',
        'box-shadow' : '0 0 15px rgba(0,0,0,0.5)'
    })
    // content
    $ui.append("<h1>LookingComposed</h1>")
    $ul = $("<ul>");

    for (t in tokens) {
        $li = $("<li>").html(" "+t + " ");
        $input = $("<input>").attr('type', 'color').attr('value', tokens[t])
        
        
        $li.prepend($input);
        $ul.append($li);
    }
    $ui.append($ul);
    $('body').append($ui)

    //
    $("input[type=color").spectrum({ color: this.value });
}


getStylesheets = function(){
    var $my_stylesheet_url = $('head').find('link:first').attr('href');

    var content;
    $.get($my_stylesheet_url, function(data) {
        content = data;
        // do your staff here
        var comments = getComments(content);
        var tokens = getTokens(comments);
        
        buildInterface(tokens);
       
    });
}
//
// GET COMMENTS
//
getComments = function(stylesheet){
    
    var comments = stylesheet.match(/\/\*.*\*\/.*;/g);
    if (comments != null) {
        var uComments = uniqArray(comments);
        
        return uComments;
    }
    return false;
};

//
//  
//

getTokens = function (comments) {
    var uTokens = [];

    for (i = 0; i < comments.length; i++) {
        comment = comments[i];
        //console.log(comment)

        var myRegexp = /ReplaceColor\(themeColor\:\"([^"]*)\"\).*\#([^"]*);/gm;
        var token = myRegexp.exec(comment);

        if (token) {
            tokenName = token[1].trim();
            tokenValue = token[2].replace(" !important", "").trim();
            uTokens[tokenName] = "#" + tokenValue;

        }

    }
    return uTokens;
}

//
//  HELPERS
//
uniqArray = function (array) {
    var uniq = array.reduce(function (a, b) {
        if (a.indexOf(b) < 0) a.push(b);
        return a;
    }, []);
    return uniq;
}

