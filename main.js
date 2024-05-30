const form = document.getElementById('form');
const nameU = document.getElementById('name');
const email = document.getElementById('email');
const password = document.getElementById('password');
const userName = document.getElementById('username');

form.addEventListener('submit', e => {
    e.preventDefault();
    validateInputs();
});

const setError = (e, message) => {
    const inputControl = e.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = message;
    inputControl.classList.add('error');
    inputControl.classList.remove('success');
}
const setSuccess = e => {
    const inputControl = e.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = '';
    inputControl.classList.add('success');
    inputControl.classList.remove('error');
};

const isValidEmail = email => {
    const cha = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return cha.test(String(email).toLowerCase());
}

const validateInputs = () => {
    const usernameValue = nameU.value.trim();
    const emailValue = email.value.trim();
    const passwordValue = password.value.trim();
    let isValid = true;

    if (usernameValue === '') {
        setError(nameU, 'Name is required');
        isValid = false;
    } else if (usernameValue.length < 5) {
        setError(nameU, 'The Name must be at least 5 characters');
        isValid = false;
    } else {
        setSuccess(nameU);
    }
    if (emailValue === '') {
        setError(email, 'Email is required');
        isValid = false;
    } else if (!isValidEmail(emailValue)) {
        setError(email, 'Provide a valid email address');
        isValid = false;
    } else {
        setSuccess(email);
    }
    if (passwordValue === '') {
        setError(password, 'Password is required');
        isValid = false;
    } else if (passwordValue.length < 8) {
        setError(password, 'Password must be at least 8 characters');
        isValid = false;
    } else {
        setSuccess(password);
    }
    if (isValid) {
        registerUser(usernameValue, emailValue, passwordValue);
    }
};

let registerUser = (name, email, password) => {
    fetch('https://6657c50c5c3617052645d05d.mockapi.io/SignUp', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
            name,
            email,
            password
     })
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        localStorage.setItem('loggedInUser', data.name);
        window.location.href = 'login.html';
    })
    .catch(error => {
        console.error('Error:', error);
        setError(email, 'An error occurred during registration');
    });
};
