function loadContent(url, container) {
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(html => {
            container.innerHTML = html;
        })
        .catch(error => {
            console.error('Error loading the content: ', error);
            container.innerHTML = '<p>Error loading content.</p>';
        });
}
