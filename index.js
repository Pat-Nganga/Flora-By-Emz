fetch('http://localhost:3000/flowers')
    .then(response => response.json())
    .then(flowers => {
        const flowersContainer = document.getElementById('flowers-container');
        flowers.forEach(flower => {
            const card = createCard(flower);
            flowersContainer.appendChild(card);
        });
    });

//creating a search function
function search(e) {
    e.preventDefault();
    const query = document.getElementById('search-bar').value;
    const url = `http://localhost:3000/flowers?name_like=${query}`;
    fetch(url)
        .then(response => response.json())
        .then(flowers => {
            const flowersContainer = document.getElementById('flowers-container');
            flowersContainer.innerHTML = '';
            if (flowers.length > 0) {
                flowers.forEach(flower => {
                    const card = createCard(flower);
                    flowersContainer.appendChild(card);
                });
            } else {
                const noResults = document.createElement('p');
                noResults.textContent = 'No results found';
                flowersContainer.appendChild(noResults);
            }
        });
}

// creaating a card for each bouquet and append to the container

function createCard(flower) {
    const card = document.createElement('div');
    card.classList.add('card');

    const img = document.createElement('img');
    img.src = flower.image;
    img.alt = flower.name;

    const name = document.createElement('h2');
    name.textContent = flower.name;

    const price = document.createElement('p');
    price.textContent = `KES ${flower.price}`;

    // add a buy button
    const flowerId = flower.id
    const buyButton = cardButtons('Buy', flowerId, 'buy btn')
    buyButton.addEventListener('click', (e) => {
        e.preventDefault(e);
        count++;
        card.style.display = 'none';
    });
    // add a like button
    let count = flower.likes || 0;
    const likeButton = cardButtons(`Like (${count})`, flowerId, 'like btn')
    likeButton.addEventListener('click', (e) => {
        e.preventDefault();
        count++;
        likeButton.textContent = `Like (${count})`;
        updateLikes(flower.id, count);
    });

    // Flower post with the new count of likes
    function updateLikes(id, count) {
        return fetch(`http://localhost:3000/flowers/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ likes: count })
        })
            .then(response => response.json())
            .then(data => {
                console.log('Likes updated successfully:', data);
            })
            .catch(error => {
                console.error('Error updating likes:', error);
            });
    }

    //add a delete button
    const deleteButton = cardButtons('Delete', flowerId, 'delete btn')
    deleteButton.addEventListener('click', (e) => {
        e.preventDefault();
        count++;
        console.log("flower", flower.id);
        deleteFlowerPost(flower.id);

    });

    // add an edit button
    const editButton = cardButtons('Edit', flowerId, 'edit btn')
    editButton.addEventListener('click', (e) => {
        e.preventDefault();
        count++;
        const newName = prompt('Enter new name:', flower.name);
        const newPrice = prompt('Enter new price:', flower.price);
        const newImage = prompt('Enter new image URL:', flower.image);
        const updates = {
            name: newName,
            price: parseFloat(newPrice),
            image: newImage
        };
        updateFlowerPost(flower.id, updates);

    });

    const btnDivContainer = document.createElement('div');
    btnDivContainer.classList.add("btn-container");
    btnDivContainer.appendChild(buyButton);
    btnDivContainer.appendChild(likeButton);
    btnDivContainer.appendChild(deleteButton);
    btnDivContainer.appendChild(editButton);

    const cardContentDiv = document.createElement('div');
    cardContentDiv.classList.add('card-content');
    cardContentDiv.appendChild(name);
    cardContentDiv.appendChild(price);


    card.appendChild(img);
    card.appendChild(cardContentDiv);
    card.appendChild(btnDivContainer);

    return card;
}

function cardButtons(buttonName, flowerId, class_name){
    const button = document.createElement('button');
    button.textContent = buttonName;
    button.id = `${buttonName}-${flowerId}`;
    button.className = class_name;
    return button;
}

function createNewFlowerPost(flowerPost) {
    return fetch('http://localhost:3000/flowers', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(flowerPost)
    })
        .then(response => response.json())
        .then(data => {
            console.log('Flower post created successfully:', data);
        })
        .catch(error => {
            console.error('Error creating flower post:', error);
        });
}

const form = document.getElementById('flower-form');
form.addEventListener('submit', event => {
    event.preventDefault();

    const flowerName = document.getElementById('flower-name').value;
    const flowerPrice = parseFloat(document.getElementById('price').value);
    const flowerImage = document.getElementById('image').value;


    const flowerPost = {
        name: flowerName,
        price: flowerPrice,
        image: flowerImage,

    };

    createNewFlowerPost(flowerPost);
});

function updateFlowerPost(id, updates) {
    return fetch(`http://localhost:3000/flowers/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updates)
    })
        .then(response => response.json())
        .then(data => {
            console.log('Flower post updated successfully:', data);
        })
        .catch(error => {
            console.error('Error updating flower post:', error);
        });
}
//to delete flower post
function deleteFlowerPost(flowerId) {
    return fetch(`http://localhost:3000/flowers/${flowerId}`, {
        method: 'DELETE',

    })
        .then(response => response.json())
        .then(data => {
            console.log('Flower post deleted successfully:', data);
        })
        .catch(error => {
            console.error('Error deleting flower post:', error);
        });
}

