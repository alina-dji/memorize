const form = document.querySelector('form');
const emailError = document.querySelector('.email.error');
const passwordError = document.querySelector('.password.error');
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    emailError.textContent = '';
    passwordError.textContent = '';
    const email = form.email.value;
    const password = form.password.value;
    try {
        const res = await fetch('/login', { method: 'POST', body: JSON.stringify({email, password}), headers: { 'Content-Type': 'application/json'}});
        const data = await res.json();
        if (data.errors) {
            console.log(data);
            emailError.textContent = data.errors.email;
            passwordError.textContent = data.errors.password;
        }
        if (data.user) {
            let path = '/workspace/' + data.user._id + '/' + data.user.pages[0]._id;
            location.assign(path);
        }
    }
    catch (err) {
        console.log(err);
    }
});