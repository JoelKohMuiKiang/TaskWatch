function fillProfile() {
    console.log("Test 1")
    if (sessionStorage.getItem("email") != null) {
        console.log("Test 2")
        var jsonData = JSON.parse(sessionStorage.getItem("user"));
        var birthday = new Date(jsonData.birthday);
        var formattedDate = birthday.toLocaleDateString();
        document.getElementById("email").innerHTML = jsonData.email;
        document.getElementById("first_name").innerHTML = jsonData.first_name;
        document.getElementById("last_name").innerHTML = jsonData.last_name;
        document.getElementById("mobile_no").innerHTML = jsonData.mobile_no;
        document.getElementById("birthday").innerHTML = formattedDate;
        document.getElementById("gender").innerHTML = jsonData.gender;
    }
}