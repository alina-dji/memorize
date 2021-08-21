async function addTitle (event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        const endpoint = event.target.dataset.endpoint;
        const title = event.target.value;
        if (title) {
            try {
                const patchResponse = await fetch(endpoint, { method: 'PATCH', body: JSON.stringify({title}), headers: { 'Content-Type': 'application/json'} });
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
}

const titleTextarea = document.querySelector('textarea.add-title');
if (titleTextarea) {
    titleTextarea.addEventListener('keydown', addTitle);   
}

function updateTitle (event) {
    titleTextarea.style.display = "block";
    titleTextarea.value = event.target.textContent;
    event.target.style.display = "none";
}

const titleH1 = document.querySelector('h1.title');
if (titleH1) {
    titleH1.addEventListener('click', updateTitle);
}