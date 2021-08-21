const newQuestion = document.querySelector('.new-question');
newQuestion.addEventListener('click', () => {
    const form = document.querySelector('form.write-question-answer');
    form.style.display = "flex";
    // const title = document.querySelector('.title');
    // title.style.margin = "0 0 0.5% 0";
});

async function deleteQuestion (event) {
    const endpoint = event.target.dataset.endpoint;
    event.stopPropagation();
    try {
        const deleteResponse = await fetch(endpoint, { method: 'DELETE' });
        const data = await deleteResponse.json();
        const path = '/workspace/' + data.userId + '/' + data.pageId;
        const getResponse = await fetch(path);
        location.assign(getResponse.url);
    }
    catch (err) {
        console.log(err);
    }
}

async function addQuestion (event) {
    const endpoint = event.target.dataset.endpoint;
    const form = document.querySelector('form.write-question-answer');
    const question = form.question.value;
    const answer = form.answer.value;
    if (question && answer) {
        try {
            const patchResponse = await fetch(endpoint, { method: 'PATCH', body: JSON.stringify({question, answer}), headers: { 'Content-Type': 'application/json'} });
            const data = await patchResponse.json();
            const path = '/workspace/' + data.userId + '/' + data.pageId;
            const getResponse = await fetch(path);
            location.assign(getResponse.url);
        }
        catch (err) {
            console.log(err);
        }
    }
}

async function editQuestion (event) {
    console.log('clicked');
    console.log(event.target);
    console.log(event.target.parentElement.parentElement.parentElement);
    const endpoint = event.target.dataset.endpoint;
    console.log(endpoint);
    const card = event.target.parentElement.parentElement.parentElement;
    let qst = card.querySelector('.qst').innerText;
    qst = qst.split('');
    qst.shift();
    qst.shift();
    qst = qst.join('');
    console.log(qst);
    let ans = card.querySelector('.answer').innerText;
    console.log(ans);
    const txtarea = document.querySelector('.write-question-answer');
    txtarea.style.display = "flex";
    txtarea.querySelector('.write-question').value = qst;
    txtarea.querySelector('.write-answer').value = ans;
    try {
        const deleteResponse = await fetch(endpoint, { method: 'DELETE' });
    }
    catch (err) {
        console.log(err);
    }
}

var trash = document.querySelectorAll('.delete-question');
for (let i=0; i < trash.length; i++) {
    trash[i].addEventListener('click', deleteQuestion);
} 

const add = document.querySelector('.fa-check-square');
add.addEventListener('click', addQuestion);

const edit = document.querySelectorAll('.edit-question');
for (let i=0; i < edit.length; i++) {
    edit[i].addEventListener('click', editQuestion);
}