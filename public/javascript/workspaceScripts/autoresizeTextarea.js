function autoresize (event) {
    event.target.style.height = event.target.scrollHeight + 'px';
}
const textarea = document.querySelectorAll('textarea');
for (let i=0; i<textarea.length; i++) {
    textarea[i].addEventListener('input', autoresize);
}
