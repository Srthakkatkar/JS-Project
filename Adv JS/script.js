let total = 0;

function addStudent() {

    let name = document.getElementById("name").value;

    if (name === "") {
        alert("Enter student name");
        return;
    }

    let row = document.createElement("tr");

    row.innerHTML =
        "<td>" + name + "</td>" +
        "<td><button onclick='deleteStudent(this)'>Delete</button></td>";

    document.getElementById("studentList").appendChild(row);

    total++;
    document.getElementById("total").innerText = total;

    document.getElementById("name").value = "";
}

function deleteStudent(btn) {

    btn.parentElement.parentElement.remove();

    total--;
    document.getElementById("total").innerText = total;
}