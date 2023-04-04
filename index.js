function renderFlowerList(flowers) {
    
    const flowerListContainer =document.getElementById('flower-list');
    const flowerList =document.createElement('ul');
    flowerList.classList.add('flower-list');


    flowers.forEach(flower =>{
        const listItem = document.createElement('li');
        listItem.classList.add('flower-item');
        listItem.textContent = flower.name;
        listItem.addEventListener('click',() => {
           showFlowerDetails(flower);

        });
        flowerListContainer.appendChild(flowerList);

    })
  }
  
 fetch('http://localhost:3000/flowers')
.then(response => response.json())
.then(flowers => {
    renderFlowerList(flowers);
    //create a card for each  movie and append to the container
    const flowersContainer = document.getElementById('flowers-container');
    flowers.forEach(flower => {
        const card = document.createElement('div');
        card.classList.add('card');
        const img =document.createElement('img');
        img.src=flower.image;
        img.alt =flower.name;


        const name =document.createElement('h2');
        name.textContent=flower.name;
        const price=document.createElement('p');
        price.textContent=`KES ${flower.price}`;

        // add a button
        const buyButton = document.createElement ('button');
        buyButton.textContent= 'Buy Bouquet';
        buyButton.id =`Buy-button-${flower.id}`;
        buyButton.addEventListener('click',() => {
            buyBouquet(flower.id);
        });
        const cardContentDiv =document.createElement('div');
        cardContentDiv.classList.add('card-content')
        cardContentDiv.appendChild(name);
        cardContentDiv.appendChild(price);
        cardContentDiv.appendChild(buyButton);

        card.appendChild(img);
        card.appendChild(cardContentDiv);


        flowersContainer.appendChild(card);
        
    });
});
 