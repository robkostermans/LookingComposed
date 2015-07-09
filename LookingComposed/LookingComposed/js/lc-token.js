

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
