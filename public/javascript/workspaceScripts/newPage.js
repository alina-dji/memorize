const plus = document.querySelector('.new-page');
plus.addEventListener('click', async (e) => {
    const endpoint = plus.dataset.doc;
    try {
        const patchResponse = await fetch(endpoint, { method: 'PATCH' });
        const user = await patchResponse.json();
        const length = user.pages.length - 1;
        const path = '/workspace/' + user._id + '/' + user.pages[length]._id;
        const getResponse = await fetch(path);
        location.assign(getResponse.url);
    }
    catch (err) {
        console.log(err);
    }
});