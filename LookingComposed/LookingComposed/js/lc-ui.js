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