function toggleLogin() {
    document.getElementById('login-form').classList.add('active');
    document.getElementById('signup-form').classList.remove('active');
}

function toggleSignup() {
    document.getElementById('signup-form').classList.add('active');
    document.getElementById('login-form').classList.remove('active');
}

// Initially show the login form
toggleLogin();

function login(event) {
    event.preventDefault(); // Prevent default form submission
    
    // Retrieve input values
    let email = document.getElementById('login-email').value;
    let password = document.getElementById('login-password').value;

    // Authenticate user with Firebase
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in successfully
            const user = userCredential.user;
            const dt = new Date();
            update(ref(database, 'users/' + user.uid), {
                last_login: dt,
            });
            alert('User logged in');
            window.location.href = 'home.html'; // Redirect to home page
        })
        .catch((error) => {
            const errorMessage = error.message;
            alert('Error: ' + errorMessage);
        });
}

// Function to handle signup form submission
function signup(event) {
    event.preventDefault(); // Prevent default form submission
    
    // Retrieve input values
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    let username = document.getElementById('username').value;

    // Create user with Firebase authentication
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed up successfully
            const user = userCredential.user;
            alert('User created: ' + username);
            // Save username to the database
            set(ref(database, 'users/' + user.uid), {
                username: username,
                email: email
            });
            window.location.href = 'home.html'; // Redirect to home page
        })
        .catch((error) => {
            const errorMessage = error.message;
            alert('Error: ' + errorMessage);
        });
}