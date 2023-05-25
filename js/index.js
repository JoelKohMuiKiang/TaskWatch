const addTaskModal = document.getElementById("addTaskModal");
const closeBtn = document.getElementById("close");
const displayTaskModal = document.getElementById("taskModal");
const closeUpdateForm = document.getElementById("closeUpdateTaskBtn");
var taskName;

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    setTimeout(function () {
        document.getElementById("calendar").style.visibility = "visible";
    }, 400);
}

function logOut() {
    sessionStorage.removeItem("email")
    sessionStorage.removeItem("user")
    window.location.href = "login.html";
}

closeBtn.addEventListener("click", function () {
    addTaskModal.style.display = "none";
    document.querySelector('body').style.overflow = "";
});

window.addEventListener("click", function (event) {
    if (event.target == addTaskModal) {
        addTaskModal.style.display = "none";
        document.querySelector('body').style.overflow = "";
    }
});

function addTask() {
    var response = ""

    var jsonData = new Object();
    jsonData.task = document.getElementById("task-name").value;
    jsonData.start_date_of_task = document.getElementById("task-start-date").value;
    jsonData.start_time = document.getElementById("task-start-time").value;
    jsonData.end_date_of_task = document.getElementById("task-end-date").value;
    jsonData.end_time = document.getElementById("task-end-time").value;
    jsonData.location = document.getElementById("task-location").value;
    jsonData.alert = document.getElementById("task-alert").value;
    jsonData.description = document.getElementById("task-description").value;

    var userInfo = JSON.parse(sessionStorage.getItem("user"));
    var user = userInfo.last_name;
    var idusers = userInfo.idusers;
    jsonData.user_name = user;
    jsonData.user_id = idusers;
    console.log(idusers);

    if (jsonData.task == "" || jsonData.start_date_of_task == "" || jsonData.start_time == "" || jsonData.end_date_of_task == "" || jsonData.end_time == "" || jsonData.location == "" || jsonData.alert == "" || jsonData.description == "") {
        alert("Please fill up all the fields");
        return;
    }

    var request = new XMLHttpRequest();

    request.open("POST", "https://f3ubzawawh.execute-api.us-east-1.amazonaws.com/task", true);

    request.onload = function () {
        response = JSON.parse(request.responseText);
        if (response.message == "Task added") {
            addTaskModal.style.display = "none";
            location.reload();
        } else {
            alert("Error. Unable to add task");
        }
    };
    request.send(JSON.stringify(jsonData));
}

function formatTimeWithAMPM(time) {
    var timeArray = time.split(':');
    var hours = timeArray[0];
    var minutes = parseInt(timeArray[1], 10);
    var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var formattedTime = hours + ':' + minutes + ' ' + ampm;
    return formattedTime;
  }

document.addEventListener('DOMContentLoaded', function () {
    var calendarEl = document.getElementById('calendar');
    var userInfo = JSON.parse(sessionStorage.getItem("user"));
    var last_name = userInfo.last_name;
    var calendar = new FullCalendar.Calendar(calendarEl, {
        themeSystem: "bootstrap5",
        selectable: true,
        headerToolbar: {
            left: 'sidebar prev next today',
            center: 'title',
            right: 'addFootage addTask dayGridMonth timeGridWeek timeGridDay'
        },
        customButtons: {
            sidebar: {
                text: '☰',
                click: function () {
                    document.getElementById("mySidenav").style.width = "100%",
                        document.getElementById("calendar").style.visibility = "hidden"
                }
            },
            addTask: {
                text: 'Add Task',
                click: function () {
                    document.getElementById('addTaskModal').style.display = "block";
                    document.querySelector('body').style.overflow = "hidden";
                }
            },
            addFootage: {
                text: "Add Footage",
                click: function () {
                    window.location.href = "footage.html"
                }
            }
        },
        dateClick: function (info) {
            console.log(info.dateStr);
        },
        events: function (info, successCallback, failureCallback) {
            var xhr = new XMLHttpRequest();
            xhr.open("GET", "https://f3ubzawawh.execute-api.us-east-1.amazonaws.com/task-user/" + last_name);
            xhr.onload = function () {
                var response = JSON.parse(xhr.responseText);
                var events = response.Items.map(function (item) {
                    return {
                        title: item.task,
                        start: item.start_date_of_task + 'T' + item.start_time,
                        end: item.end_date_of_task + 'T' + item.end_time
                    };
                });
                var filteredEvents = events.filter(function (event) {
                    return event.user_name === last_name;
                });
                successCallback(filteredEvents);
                calendar.addEventSource(events);
            };
            xhr.send();
        },
        eventColor: '#378006',
        eventClick: function (info) {
            taskName = info.event.title;
            console.log(taskName)
            var xhr = new XMLHttpRequest();
            xhr.open("GET", "https://f3ubzawawh.execute-api.us-east-1.amazonaws.com/task-user/" + last_name + "/" + taskName, true);
            xhr.onload = function () {
                var taskDetails = JSON.parse(xhr.responseText);
                console.log(taskDetails);
                var modal = document.getElementById("taskModal");
                var task = document.getElementById("task");
                var start_date_of_taskEl = document.getElementById("start_date_of_task");
                var end_date_of_taskEl = document.getElementById("end_date_of_task");
                var start_timeEl = document.getElementById("start_time");
                var end_timeEl = document.getElementById("end_time");
                var locationEl = document.getElementById("location");
                var descriptionEl = document.getElementById("description");
                var alertEl = document.getElementById("alert");
                var start_task_date_timeEl = document.getElementById("start_task_date_time");
                var end_task_date_timeEl = document.getElementById("end_task_date_time");

                task.innerHTML = taskDetails.Items[0].task;
                // start_date_of_taskEl.innerHTML = taskDetails.Items[0].start_date_of_task;
                // end_date_of_taskEl.innerHTML = taskDetails.Items[0].end_date_of_task;
                // start_timeEl.innerHTML = formatTimeWithAMPM(taskDetails.Items[0].start_time);
                // end_timeEl.innerHTML = formatTimeWithAMPM(taskDetails.Items[0].end_time);
                locationEl.innerHTML = taskDetails.Items[0].location;
                descriptionEl.innerHTML = taskDetails.Items[0].description;
                alertEl.innerHTML = taskDetails.Items[0].alert;
                start_task_date_timeEl.innerHTML = taskDetails.Items[0].start_date_of_task + " " + formatTimeWithAMPM(taskDetails.Items[0].start_time);
                end_task_date_timeEl.innerHTML = taskDetails.Items[0].end_date_of_task + " " + formatTimeWithAMPM(taskDetails.Items[0].end_time);

                document.getElementById('taskModal').style.display = "block";

                // When the user clicks on <span> (x), close the modal
                document.getElementsByClassName("closeBtn")[0].onclick = function () {
                    document.getElementById('taskModal').style.display = "none";
                };

                // When the user clicks anywhere outside of the modal, close it
                window.onclick = function (event) {
                    if (event.target === modal) {
                        document.getElementById('taskModal').style.display = "none";
                    }
                };
            };
            xhr.send();
        }
    });
    calendar.render();
});

function deleteTask() {
    var response = "";
    var userInfo = JSON.parse(sessionStorage.getItem("user"));
    var last_name = userInfo.last_name;

    var request = new XMLHttpRequest();
    request.open("DELETE", "https://f3ubzawawh.execute-api.us-east-1.amazonaws.com/task/" + last_name + "/" + taskName, true);

    request.onload = function () {
        response = JSON.parse(request.responseText);
        if (response.message == "Task deleted") {
            console.log('test');
            location.reload();
        } else {
            alert('Error. Unable to delete task.');
        }
    };
    request.send();
}