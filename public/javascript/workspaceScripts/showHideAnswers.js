const questions = document.querySelectorAll('.qst');

for(let i=0; i<questions.length; i++) {
    questions[i].addEventListener('click', (event) => {
        if (event.target.parentElement.parentElement.style.border == "1px solid rgba(186, 186, 182, 0.5)") {
            event.target.parentElement.parentElement.style.border = "0 solid rgba(186, 186, 182, 0.5)";
            event.target.parentElement.querySelector('.edit-delete-question').style.display = "none";
            event.target.parentElement.parentElement.querySelector('.answer').style.display = "none";
        }
        else {
            event.target.parentElement.parentElement.style.border = "1px solid rgba(186, 186, 182, 0.5)";
            event.target.parentElement.querySelector('.edit-delete-question').style.display = "block";
            event.target.parentElement.parentElement.querySelector('.answer').style.display = "block";
        }  
    });
}