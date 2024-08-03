document.addEventListener('DOMContentLoaded', function() {
    const toggleBtn = document.getElementById('toggleBtn');
    const sidebar = document.getElementById('sidebar');
    const tree = document.getElementById('tree');
    const contentFrame = document.getElementById('contentFrame');

    toggleBtn.addEventListener('click', toggleSidebar);
    contentFrame.src = 'pages/welcome.html';

    function toggleSidebar() {
        sidebar.classList.toggle('collapsed');
    }

    // Load the last viewed page or default to empty
    const lastPage = sessionStorage.getItem('lastPage') || '';
    if (lastPage) {
        contentFrame.src = lastPage;
    }

    // Add a timestamp to prevent caching
    const timestamp = new Date().getTime();
    fetch(`directory-structure.json?t=${timestamp}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('Received data:', data);
            populateSidebar(data, tree);
        })
        .catch(error => {
            console.error('Error:', error);
            tree.innerHTML = `<p>Error loading directory structure: ${error.message}</p>`;
        });
});

function populateSidebar(data, parentElement) {
    for (const item of data) {
        const itemElement = document.createElement('div');
        itemElement.classList.add('tree-item');

        if (item.type === 'category') {
            const toggleElement = document.createElement('span');
            toggleElement.classList.add('toggle');
            toggleElement.textContent = '▶';
            itemElement.appendChild(toggleElement);

            const nameElement = document.createElement('span');
            nameElement.classList.add('category-name');
            nameElement.textContent = item.name;
            itemElement.appendChild(nameElement);

            const childrenElement = document.createElement('div');
            childrenElement.classList.add('tree-children');
            childrenElement.style.display = 'none';
            itemElement.appendChild(childrenElement);

            populateSidebar(item.children, childrenElement);

            toggleElement.addEventListener('click', function() {
                childrenElement.style.display = childrenElement.style.display === 'none' ? 'block' : 'none';
                toggleElement.textContent = childrenElement.style.display === 'none' ? '▶' : '▼';
            });
        } else if (item.type === 'file') {
            const linkElement = document.createElement('a');
            linkElement.textContent = item.name;
            linkElement.href = item.path;
            linkElement.target = 'contentFrame';
            linkElement.addEventListener('click', function(e) {
                e.preventDefault();
                document.getElementById('contentFrame').src = item.path;
                sessionStorage.setItem('lastPage', item.path);
            });
            itemElement.appendChild(linkElement);
        }

        parentElement.appendChild(itemElement);
    }
}

// Listen for changes in the iframe src
document.getElementById('contentFrame').addEventListener('load', function() {
    sessionStorage.setItem('lastPage', this.contentWindow.location.href);
});
