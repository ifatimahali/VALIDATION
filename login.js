const form = document.getElementById('form');
const email = document.getElementById('email');
const password = document.getElementById('password');

form.addEventListener('submit', e => {
    e.preventDefault();
    login();
});

const setError = (field, message) => {
    const inputControl = field.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = message;
    inputControl.classList.add('error');
    inputControl.classList.remove('success');
}

const setSuccess = field => {
    const inputControl = field.parentElement;
    const errorDisplay = inputControl.querySelector('.error');
    errorDisplay.innerText = '';
    inputControl.classList.add('success');
    inputControl.classList.remove('error');
};

const isValidEmail = email => {
    const cha = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return cha.test(String(email).toLowerCase());
}

const login = () => {
    const emailValue = email.value.trim();
    const passwordValue = password.value.trim();

    fetch('https://6657c50c5c3617052645d05d.mockapi.io/SignUp')
    .then(response => response.json())
    .then(data => {
        const user = data.find(user => user.email === emailValue && user.password === passwordValue);
        if (user) {
            console.log('Login successful:', user);
            localStorage.setItem('loggedInUser', user.name);
            window.location.href = 'index.html';
        } else {
            setError(password, 'Invalid email or password');

        }
    })
};
