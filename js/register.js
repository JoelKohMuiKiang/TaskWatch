function register() {
    var response = "";

    var jsonData = new Object();
    jsonData.first_name = document.getElementById("first_name").value;
    jsonData.last_name = document.getElementById("last_name").value;
    jsonData.email = document.getElementById("email").value;
    jsonData.password = document.getElementById("password").value;
    jsonData.mobile_no = document.getElementById("mobile_no").value;
    jsonData.birthday = document.getElementById("birthday").value;
    jsonData.gender = document.getElementById("gender").value;

    if (jsonData.first_name == "" || jsonData.last_name == "" || jsonData.email == "" || jsonData.password == "" || jsonData.mobile_no == "" || jsonData.birthday == "" || jsonData.gender == "") {
        alert('All fields are required!');
        return;
    }

    var request = new XMLHttpRequest();

    request.open("POST", "https://f3ubzawawh.execute-api.us-east-1.amazonaws.com/users", true);

    request.onload = function () {
        response = JSON.parse(request.responseText);
        if (response.affectedRows == 1) {
            window.location.href = "login.html";
        }
        else {
            alert("Error. Unable to register user.");
        }
    };
    request.send(JSON.stringify(jsonData));
}