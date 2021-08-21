const form = document.querySelector('form');
const nameError = document.querySelector('.name.error');
const emailError = document.querySelector('.email.error');
const passwordError = document.querySelector('.password.error');
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    nameError.textContent = '';
    emailError.textContent = '';
    passwordError.textContent = '';
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    try {
        const res = await fetch('/signup', { method: 'POST', body: JSON.stringify({name, email, password}), headers: { 'Content-Type': 'application/json'}});
        const data = await res.json();
        if (data.errors) {
            nameError.textContent = data.errors.name;
            emailError.textContent = data.errors.email;
            passwordError.textContent = data.errors.password;
        }
        if (data.user) {
            location.assign('/login');
        }
    }
    catch (err) {
        console.log(err);
    }
});