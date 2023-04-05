fetch('http://localhost:3000/flowers')
  .then(response => response.json())
  .then(flowers => {
    // create a card for each bouquet and append to the container
    const flowersContainer = document.getElementById('flowers-container');
    flowers.forEach(flower => {
      const card = createCard(flower);
      flowersContainer.appendChild(card);
    });
  });


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
  });

  //add a delete button
  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Delete';
  deleteButton.id = `delete-button-${flower.id}`;
  deleteButton.addEventListener('click', () => {
    console.log("flower",flower.id);
    deleteFlowerPost(flower.id);
    
  });
  
  const cardContentDiv = document.createElement('div');
  cardContentDiv.classList.add('card-content');
  cardContentDiv.appendChild(name);
  cardContentDiv.appendChild(price);
  cardContentDiv.appendChild(buyButton);
  cardContentDiv.appendChild(likeButton);
  cardContentDiv.appendChild(likeCounter);
  cardContentDiv.appendChild(deleteButton)

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
  
// const deleteButton =document.getElementById("delete-button");
// deleteButton.textContent = 'Delete'
// deleteButton.id =`delete-button-${flowerid}`;
// deleteButton.addEventListener('submit', event => {
//     event.preventDefault();
  
    
  
//     deleteFlowerid(flowerid);
//   });
