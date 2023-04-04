fetch('http://localhost:3000/flowers')
    .then(response => response.json())
    .then(flowers => {
        
        //create a card for each  bouquet and append to the container
        const flowersContainer = document.getElementById('flowers-container');
        flowers.forEach(flower => {
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
            buyButton.id = `Buy-button-${flower.id}`;
            buyButton.addEventListener('click', () => {
            buyButton.textContent ="out of stock"
            // card.style.display = "none"
        });  
        

            //add a like button
            const likeButton =document.createElement('button');
            likeButton.textContent = 'like';
            likeButton.id = `like-button-${flower.id}`;
            let count = 0;
            const likeCounter = document.createElement('h2');        
            likeButton.addEventListener('click',() => {
              count ++;
            likeCounter.textContent = count
              console.log("count",count);
           
              })               
            

    

            const cardContentDiv = document.createElement('div');
            cardContentDiv.classList.add('card-content')
            cardContentDiv.appendChild(name);
            cardContentDiv.appendChild(price);
            cardContentDiv.appendChild(buyButton);
            cardContentDiv.appendChild(likeButton);
            cardContentDiv.appendChild(likeCounter);

            
           
            card.appendChild(img);
            card.appendChild(cardContentDiv);


            flowersContainer.appendChild(card);

        });
    });

















