function login() {
    var response = "";

    var jsonData = new Object();
    jsonData.email = document.getElementById("loginEmail").value;
    jsonData.password = document.getElementById("loginPassword").value;

    if (jsonData.email == "" || jsonData.password == "") {
        alert("All fields must be filled");
        return;
    }

    var request = new XMLHttpRequest();

    request.open("POST", "https://f3ubzawawh.execute-api.us-east-1.amazonaws.com/login", true);

    request.onload = function () {
        response = JSON.parse(request.responseText);
        console.log(response);

        if (response.length == 1) {
            sessionStorage.setItem("email", jsonData.email);
            sessionStorage.setItem("user", JSON.stringify(response[0]));
            window.location.href = "index.html";
        }
        else {
            alert('Error. Unable to login.');
        }
    };

    request.send(JSON.stringify(jsonData));
}