function fillEditFootage() {
    var response = ""
    var request = new XMLHttpRequest();
    var footageInfo = JSON.parse(sessionStorage.getItem("footage_id"));
    request.open("GET", "https://f3ubzawawh.execute-api.us-east-1.amazonaws.com/footage/" + footageInfo, true);
    request.onload = function () {
        response = JSON.parse(request.responseText);
        if (sessionStorage.getItem("email") != null) {
            document.getElementById("name").value = response[0].name;
        }
    };
    request.send();
}

function logOutFootageId() {
    window.location.href = "footage.html";
    sessionStorage.removeItem("footage_id");
}

function updateFootage() {
    var response = ""
    var footageInfo = JSON.parse(sessionStorage.getItem("footage_id"));
    var jsonData = {};

    var request = new XMLHttpRequest();

    jsonData.name = document.getElementById("name").value;
    request.open("PUT", "https://f3ubzawawh.execute-api.us-east-1.amazonaws.com/footage/" + footageInfo, true);

    request.onload = function () {
        response = JSON.parse(request.responseText);
        console.log(response)
        console.log(response.length)
        if (response.affectedRows == 1) {
            logOutFootageId()
        } else {
            alert('Error. Unable to update footage.');
        }
    };
    request.send(JSON.stringify(jsonData));
}

function deleteFootage() {
    var response = ""
    var footageInfo = JSON.parse(sessionStorage.getItem("footage_id"));

    var request = new XMLHttpRequest();
    request.open("DELETE", "https://f3ubzawawh.execute-api.us-east-1.amazonaws.com/footage/" + footageInfo, true);

    request.onload = function () {
        response = JSON.parse(request.responseText);
        console.log(response)
        console.log(response.length)
        if (response.affectedRows == 1) {
            logOutFootageId();
        } else {
            alert('Error. Unable to delete footage.');
        }
    };
    request.send();
}