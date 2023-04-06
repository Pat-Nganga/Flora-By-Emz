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

    // creating a card for each bouquet and append to the container

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
  const buyButton = document.createElement('button');
  buyButton.textContent = 'Buy Bouquet';
  buyButton.id = `buy-button-${flower.id}`;
  buyButton.addEventListener('click', () => {
    card.style.display = 'none';
  });

  // add a like button
  const likeButton = document.createElement('button');
  let count = 0;
  likeButton.textContent = `Like (${count})`;
  likeButton.id = `like-button-${flower.id}`;
  const likeCounter = document.createElement('h2');
  likeButton.addEventListener('click', () => {
    count++;
    likeButton.textContent = `Like (${count})`;

    patchFlowerCount(flower,count);
  });

  //add a delete button
  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Delete';
  deleteButton.id = `delete-button-${flower.id}`;
  deleteButton.addEventListener('click', () => {
    console.log("flower",flower.id);
    deleteFlowerPost(flower.id);
    
  });

  // add an edit button
const editButton = document.createElement('button');
editButton.textContent = 'Edit';
editButton.id = `edit-button-${flower.id}`;
editButton.addEventListener('click', () => {
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

  
  const cardContentDiv = document.createElement('div');
  cardContentDiv.classList.add('card-content');
  cardContentDiv.appendChild(name);
  cardContentDiv.appendChild(price);
  cardContentDiv.appendChild(buyButton);
  cardContentDiv.appendChild(likeButton);
  cardContentDiv.appendChild(likeCounter);
  cardContentDiv.appendChild(deleteButton);
  cardContentDiv.appendChild(editButton);

  card.appendChild(img);
  card.appendChild(cardContentDiv);

  return card;
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
const searchButton = document.getElementById('search-button');
searchButton.addEventListener('click', search);


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
  
  const likeButton = document.createElement('button');
  let count = 0;
  likeButton.textContent = `Like (${count})`;
  likeButton.id = `like-button-${flower.id}`;
  const likeCounter = document.createElement('h2');
  likeButton.addEventListener('click', () => {
    count++;
    likeButton.textContent = `Like (${count})`;

    patchFlowerCount(flower,count);
  });

  function patchFlowerCount(flower, count) {
    // Make a PATCH request to update the count on the server
    fetch(`/flowers/${flower.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ count })
    })
    .then(response => response.json())
    .then(updatedFlower => {
      // Update the flower object with the updated count
      flower.count = updatedFlower.count;
    })
    .catch(error => console.error(error));
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

