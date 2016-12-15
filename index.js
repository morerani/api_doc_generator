var editor, editor2;
$(function () {
    editor = CodeMirror.fromTextArea(jsonarea, {
        lineWrapping: false,
        lineNumbers: true,
        styleActiveLine: true,
        // mode: { name: "javascript", json: true },
        mode: "application/json",
        gutters: ["CodeMirror-lint-markers"],
        lint: true,
        theme: 'rubyblue'
    });
    editor.setSize(600, 400);
    editor2 = CodeMirror.fromTextArea(result, {
        lineWrapping: false,
        lineNumbers: true,
        styleActiveLine: true,
        mode: { name: "javascript", json: true },
        theme: 'rubyblue'
    });
    editor2.setSize(600, 400);
    $('#btnSubmit').click(function (e) {
        e.preventDefault();
        // var json = $('#jsonarea').val();
        var json = editor.getValue();

        var objJson = $.parseJSON(json);
        console.log(objJson);
        var param = "\n* @apiParam {";
        var successParam = "\n* @apiSuccess {";

        writeApi(objJson, param);
        editor2.replaceRange("\n", CodeMirror.Pos(editor.lastLine()));
        writeApi(objJson, successParam);

    });


});


function writeApi(objJson, params) {

    for (var key in objJson) {
        if (objJson.hasOwnProperty(key)) {
            var element = objJson[key];
            debugger
            if (typeof element == "object") {
                ParseObject(element, key, params);
                continue;
            }

            var str = params + (typeof element).toString() + "}" + key + " " + titleCase(key) + " of the OBJECT";
            Log(str)
        }

    }
}


function ParseObject(objJson, objectName, paramName) {

    for (var key in objJson) {
        if (objJson.hasOwnProperty(key)) {
            var element = objJson[key];

            if (typeof element == "object") {
                key = objectName + "." + key;
                ParseObject(element, key, paramName);
                continue;
            }
            var str = paramName + (typeof element).toString() + "}" + key + " " + titleCase(key) + " of the " + objectName;
            Log(str)
        }

    }


}


function titleCase(str) {
    var newstr = str.split(" ");
    for (i = 0; i < newstr.length; i++) {
        if (newstr[i] == "") continue;
        var copy = newstr[i].substring(1).toLowerCase();
        newstr[i] = newstr[i][0].toUpperCase() + copy;
    }
    newstr = newstr.join(" ");
    return newstr;
}

function Log(msg) {
    //editor2.append(msg);
    editor2.replaceRange(msg, CodeMirror.Pos(editor.lastLine()));
}