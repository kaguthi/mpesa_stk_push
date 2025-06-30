/* eslint-disable no-undef */
const title =document.querySelector('#title');
const description = document.querySelector('#description');
const submitBtn = document.querySelector('#submit');
const form = document.querySelector('#form');

submitBtn.addEventListener('click', async (e) => {
    e.preventDefault();
    const titleValue = title.value;
    const descriptionValue = description.value;
    const data = { title: titleValue, description: descriptionValue };
    
    const response = await fetch('http://localhost:5000/api/todo', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    const res = await response.json();
    if (res.status === 'success') {
        alert('Todo created successfully');
        form.reset();
    } else {
        alert("An Error occurred due to " + JSON.stringify(res.message));
    }
});