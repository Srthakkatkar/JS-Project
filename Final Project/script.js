let sessions = JSON.parse(localStorage.getItem("balajiSessions")) || []; //Retrieve stored data 

const logForm = document.getElementById("logForm");
const logBody = document.getElementById("logBody");

const fetchSafetyTip = async () => { //Async function for API
    try {
        const response = await fetch('https://api.adviceslip.com/advice'); //Fetch from public API 
        const data = await response.json(); //Convert JSON to Object
        document.getElementById("apiAdvice").innerText = `"${data.slip.advice}"`; //DOM update 
    } catch (error) {
        document.getElementById("apiAdvice").innerText = "Drive safe and stay alert!";
    }
};

const updateDashboard = () => {
    localStorage.setItem("balajiSessions", JSON.stringify(sessions)); //Save data to storage

    logBody.innerHTML = sessions.map(session => `
        <tr>
            <td>${session.date}</td>
            <td>${session.skill}</td>
            <td>${session.duration} mins</td>
        </tr>
    `).join(""); //Map array to HTML rows

    document.getElementById("totalSessions").innerText = sessions.length; //Array length property

    const totalMinutes = sessions.reduce((sum, s) => sum + Number(s.duration), 0); //Reduce to sum values
    document.getElementById("totalMinutes").innerText = totalMinutes;
};

fetchSafetyTip(); //API call
updateDashboard(); //UI load

logForm.addEventListener("submit", (e) => { //Handle click
    e.preventDefault(); //Stop reload
    
    const newEntry = { //Create object
        date: document.getElementById("logDate").value,
        skill: document.getElementById("logSkill").value,
        duration: document.getElementById("logDuration").value
    };
    
    sessions.push(newEntry); //Add to array
    logForm.reset(); //Clear input
    updateDashboard(); //Refresh UI & storage
});