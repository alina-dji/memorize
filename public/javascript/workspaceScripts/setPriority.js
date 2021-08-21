const prioritySelect = document.querySelector('#priority');
if (prioritySelect) {
    prioritySelect.addEventListener('change', async (event) => {
        const endpoint = prioritySelect.dataset.endpoint; 
        const priority = event.target.value;
        try {
            const patchResponse = await fetch(endpoint, { method: 'PATCH', body: JSON.stringify({priority}), headers: { 'Content-Type': 'application/json'} });
            const data = await patchResponse.json();
            const path = '/workspace/' + data.userId + '/' + data.pageId;
            const getResponse = await fetch(path);
            location.assign(getResponse.url);
        }
        catch (err) {
            console.log(err);
        }
    });
}

const selectedPriority = document.querySelector('.selected-priority');
if (selectedPriority) {
    selectedPriority.addEventListener('click', async (event) => {
        const slct = document.querySelector('#priority');
        event.target.style.display = "none";
        slct.style.display = "block"; // TODO: change this!!!
        const endpoint = slct.dataset.endpoint;
        const priority = "unset";
        try {
            const patchResponse = await fetch(endpoint, { method: 'PATCH', body: JSON.stringify({priority}), headers: { 'Content-Type': 'application/json'} });
            const data = await patchResponse.json();
            const path = '/workspace/' + data.userId + '/' + data.pageId;
            const getResponse = await fetch(path);
            location.assign(getResponse.url);
        }
        catch (err) {
            console.log(err);
        }
    });
}