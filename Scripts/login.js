// Login dashboard

import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword  } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";
import { firebaseConfig } from './register.js';

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

document.addEventListener("DOMContentLoaded", function(e) {
    
    // Get refrence to submit button
    const loginBtn = document.getElementById("login-submit");

    // Add event listener to login button
    loginBtn.addEventListener("click", function () {

        // Prevent page from refreshing after submit
        e.preventDefault();

        // Get user details
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        // User type
        const userType = document.getElementById("user-type").value;

        // Send staff login data from inputs (front-end) to firebase (back-end)
        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            console.log(user);
            alert("Logging in Account...");

            if (userType == "admin"){
                alert("Logging as Admin...");
                window.location.href="./Admin.html";
            } else {
                alert("Logging as Employee...");
                window.location.href="./Employee.html";
            }
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
          });
    });
});