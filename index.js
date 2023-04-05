// fetch('http://localhost:3000/flowers')
//     .then(response => response.json())
//     .then(flowers => {

//         //create a card for each  bouquet and append to the container
//         const flowersContainer = document.getElementById('flowers-container');
//         flowers.forEach(flower => {
//             const card = document.createElement('div');
//             card.classList.add('card');
//             const img = document.createElement('img');
//             img.src = flower.image;
//             img.alt = flower.name;


//             const name = document.createElement('h2');
//             name.textContent = flower.name;
//             const price = document.createElement('p');
//             price.textContent = `KES ${flower.price}`;

//             // add a buy button
//             const buyButton = document.createElement('button');
//             buyButton.textContent = 'Buy Bouquet';
//             buyButton.id = `Buy-button-${flower.id}`;
//             buyButton.addEventListener('click', () => {
//                 buyButton.textContent = "out of stock"
//                 // card.style.display = "none"
//             });


//             //add a like button
//             const likeButton = document.createElement('button');
//             likeButton.textContent = 'like';
//             likeButton.id = `like-button-${flower.id}`;
//             let count = 0;
//             const likeCounter = document.createElement('h2');
//             likeButton.addEventListener('click', () => {
//                 count++;
//                 likeCounter.textContent = count
//                 console.log("count", count);

//             })



//             const cardContentDiv = document.createElement('div');
//             cardContentDiv.classList.add('card-content')
//             cardContentDiv.appendChild(name);
//             cardContentDiv.appendChild(price);
//             cardContentDiv.appendChild(buyButton);
//             cardContentDiv.appendChild(likeButton);
//             cardContentDiv.appendChild(likeCounter);
            


//             card.appendChild(img);
//             card.appendChild(cardContentDiv);


//             flowersContainer.appendChild(card);

//         });
//     });

      




// function search(e, query) {
//     e.preventDefault();
//     console.log("hhhjhj");
//     const url = 'http://localhost:3000/flowers';
//     fetch(url)
//         .then(response => response.json())
//         .then(result => {
//             console.log("results", result);
//             const query = document.getElementById('search-bar').value;
//             console.log("query", query);
//             const searchResults = result.filter(item => item.name.includes(query));
//             console.log(searchResults);
//             const queryResults = document.getElementById('flowers-container');

//             if (searchResults.length !== 0) {
//                 queryResults.innerHTML = ''; // clear previous results
//                 searchResults.forEach(item => {
//                     // const p = document.createElement('p');
//                     // p.textContent = item.name;
//                     // queryResults.textContent = item;
//                     // queryResults.appendChild(p);
//                     const card = document.createElement('div');
//                     card.classList.add('card');
//                     const img = document.createElement('img');
//                     img.src = item.image;
//                     img.alt = item.name;
                    
//                     queryResults.appendChild(card);
//                     queryResults.appendChild(img);



//                 });
//                 queryResults.style.display = 'block';
//             } else {
//                 queryResults.innerHTML = 'No results found!';
//                 queryResults.style.display = 'block';
//             }
//         });
// }

  
  // Add event listener to search button
//   const searchButton = document.getElementById('search-button');
//   searchButton.addEventListener('click', search);
// const answer = document.getElementById("search-button").addEventListener('click', search);







// update a flower
// async function createNewFlower(flower) {
//     const flowerData = new formData();
//     flowerData.append('name', flower.name);
//     flowerData.append('img', flower.img);
//     flowerData.append('price',flower.price);


//     const response = await fetch('http://localhost:3000/flowers', {
//         method: 'POST',
//         body: flowerData
//     });
//     return await response.json();
// }

// createNewFlower(flower)
//    .then((json) => {
//        // handle success
//     })
//    .catch(error => error);




fetch('http://localhost:3000/flowers')
  .then(response => response.json())
  .then(flowers => {

    //create a card for each bouquet and append to the container
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
    buyButton.textContent = 'Out of stock';
    // card.style.display = "none"
    
  });

  //add a like button
  const likeButton = document.createElement('button');
  likeButton.textContent = 'like';
  likeButton.id = `like-button-${flower.id}`;
  let count = 0;
  const likeCounter = document.createElement('h2');
  likeButton.addEventListener('click', () => {
    count++;
    likeCounter.textContent = count;
  });

  const cardContentDiv = document.createElement('div');
  cardContentDiv.classList.add('card-content');
  cardContentDiv.appendChild(name);
  cardContentDiv.appendChild(price);
  cardContentDiv.appendChild(buyButton);
  cardContentDiv.appendChild(likeButton);
  cardContentDiv.appendChild(likeCounter);

  card.appendChild(img);
  card.appendChild(cardContentDiv);

  return card;
}

const searchButton = document.getElementById('search-button');
searchButton.addEventListener('click', search);
