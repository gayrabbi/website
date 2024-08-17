function filterItems(topic, itemSelector, buttonSelector) {
    let items = document.querySelectorAll(itemSelector);
    let buttons = document.querySelectorAll(buttonSelector);
    
    // Reset all buttons
    buttons.forEach(button => {
        button.classList.remove('active');
    });

    // Highlight the selected button
    event.target.classList.add('active');

    // Filter items
    if (topic === 'all') {
        items.forEach(item => {
            item.style.display = 'block';
        });
    } else {
        items.forEach(item => {
            if (item.classList.contains(topic)) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    }
}
