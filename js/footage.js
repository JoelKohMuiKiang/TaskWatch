function addFootage() {
    var response = "";

    var jsonData = new Object();
    var userInfo = JSON.parse(sessionStorage.getItem("user"));
    var idusers = userInfo.idusers;
    jsonData.user_id = idusers;
    jsonData.name = document.getElementById("name").value;
    jsonData.date_of_footage = document.getElementById("date_of_footage").value;
    jsonData.duration = document.getElementById("link").value;

    if (jsonData.name == "" || jsonData.date_of_footage == "" || jsonData.duration == "") {
        alert("Please fill up all the fields");
        return;
    }

    var request = new XMLHttpRequest();

    request.open("POST", "https://f3ubzawawh.execute-api.us-east-1.amazonaws.com/footage", true);

    request.onload = function () {
        response = JSON.parse(request.responseText);
        if (response.affectedRows == 1) {
            alert("Footage added!")
            document.getElementById('addFootageForm').reset();
            location.reload();
        } else {
            alert("Error")
        }
    };
    request.send(JSON.stringify(jsonData));
}

function displayFootageId(idusers) {
    var response = ""
    var request = new XMLHttpRequest();

    var userInfo = JSON.parse(sessionStorage.getItem("user"));
    var idusers = userInfo.idusers;

    request.open("GET", "https://f3ubzawawh.execute-api.us-east-1.amazonaws.com/footage-user/" + idusers, true);

    request.onload = function () {
        response = JSON.parse(request.responseText);

        var html = "";
        var max = idusers;

        if (response.length < max) max = response.length;

        for (var i = 0; i < max; i++) {
            var date = new Date(response[i].date_of_footage);
            var dateString = date.toLocaleDateString();
            var timeString = date.toLocaleTimeString();
            html += '<a onclick="getSelected('+ response[i].idfootage +')" href="editFootage.html" class="list-group-item list-group-item-action" aria-current="true" style="background-color: #f1f1f1; padding: 20px;">' +
            '<div class="d-flex w-100 justify-content-between">' + 
              '<h5 class="mb-1">' + response[i].name + '</h5>' +
              '<small>' + dateString + ', ' + timeString + '</small>' + 
            '</div>' + 
            '<p class="mb-1">' + response[i].duration + '</p>' +
          '</a>'
            // html += response[i].name + " " + dateString + " " + timeString + " " + response[i].duration
        }
        document.getElementById('displayFootage').innerHTML = html;
    }
    request.send();
}

function getSelected(response) {
    sessionStorage.setItem("footage_id", response);
}

function backToIndex() {
    window.location.href = "index.html"
}