// Import Firebase functions
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import { getDatabase, ref, set, onValue } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-database.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyA83RbCPfhfpHBtD3xTgg55s8LQuc63XIM",
    authDomain: "elezioni-2024.firebaseapp.com",
    databaseURL: "https://elezioni-2024-default-rtdb.firebaseio.com/",
    projectId: "elezioni-2024",
    storageBucket: "elezioni-2024.appspot.com",
    messagingSenderId: "498674638658",
    appId: "1:498674638658:web:e21f992146c3c1e483b2db",
    measurementId: "G-HFNRH9Z04C"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Get a reference to the votanti list in the database
const votantiRef = ref(database, 'votanti');

// Function to update 'ha_votato' field in the database
function updateVotanteStatus(votante, status) {
    set(ref(database, `votanti/${votante}`), {
        ha_votato: status
    });
}

// Get the list of votanti and display them
onValue(votantiRef, (snapshot) => {
    const votantiList = document.getElementById('votanti-list');
    votantiList.innerHTML = '';

    const votanti = snapshot.val();
    for (const votante in votanti) {
        const li = document.createElement('li');
        li.textContent = votante;

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = votanti[votante].ha_votato;
        checkbox.addEventListener('change', () => {
            updateVotanteStatus(votante, checkbox.checked);
        });

        li.appendChild(checkbox);
        votantiList.appendChild(li);
    }
});
