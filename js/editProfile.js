function fillEditProfile() {
    if (sessionStorage.getItem("email") != null) {
        var jsonData = JSON.parse(sessionStorage.getItem("user"));
        var birthday = new Date(jsonData.birthday);
        var formattedDate = birthday.toISOString().substring(0, 10);
        document.getElementById("email").value = jsonData.email;
        document.getElementById("first_name").value = jsonData.first_name;
        document.getElementById("last_name").value = jsonData.last_name;
        document.getElementById("mobile_no").value = jsonData.mobile_no;
        document.getElementById("birthday").value = formattedDate;
        document.getElementById("gender").value = jsonData.gender;
        document.getElementById("password").value = jsonData.password;
    }
}

function logOut() {
    sessionStorage.removeItem("email")
    sessionStorage.removeItem("user")
    window.location.href = "login.html";
}

function updateProfile(idusers) {
    var response = "";

    var jsonData = JSON.parse(sessionStorage.getItem("user"));
    var idusers = jsonData.idusers;

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

    
    request.open("PUT", "https://f3ubzawawh.execute-api.us-east-1.amazonaws.com/taskwatch_users/" + idusers, true);
    request.onload = function () {
        response = JSON.parse(request.responseText);
        console.log(response)
        console.log(response.length)
        if (response.affectedRows == 1) {
            logOut();
        } else {
            alert('Error. Unable to update profile.');
        }
    };
    request.send(JSON.stringify(jsonData));
}