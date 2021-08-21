var trash = document.querySelector('.delete-page');
const endpoint = trash.dataset.endpoint;
if (endpoint) {
    trash.addEventListener('click', async (e) => {
        try {
            const deleteResponse = await fetch(endpoint, { method: 'DELETE' });
            const user = await deleteResponse.json();
            const length = user.pages.length - 1;
            const path = '/workspace/' + user._id + '/' + user.pages[length]._id;
            const getResponse = await fetch(path);
            location.assign(getResponse.url);
        }
        catch (err) {
            console.log(err);
        }
    });
}
else {
    trash.style.cursor = "not-allowed";
};