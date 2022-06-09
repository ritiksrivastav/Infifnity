
const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');
let photosArray = [];

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
// Unsplash Api
const count = 30;
const API_KEY = 'AuFpBaaxo-zfghJ7RgsAdRXi719w7q3Pr2MAklz-Ano';
const apiUrl = `https://api.unsplash.com/photos/random?client_id=${API_KEY}&count=${count}`;

// Display Photos in webpage

// Helping in Set up a attribute

function setAttributes(element, attributes){
    for (const key in attributes){
        element.setAttribute(key, attributes[key]);
    }
}

// Image loaded or not function

function imageLoaded(){
    imagesLoaded++;
    if(imagesLoaded === totalImages){
        ready = true;
        loader.hidden = true;
    }
}

 function displayPhotos(){
    imagesLoaded = 0;
    totalImages = photosArray.length;
    // Run loop for each element in photosArray
     photosArray.forEach((photo) => {
        // Creating an anchor element to link to unsplash 
        const item = document.createElement('a');
        setAttributes(item,{
            href : photo.links.html,
            target: '_blank',
        });
        // Create <img> for photo
        const img = document.createElement('img');
        setAttributes(img,{
            src : photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
        });

        // Event Listeners, Check when is finished loading

        img.addEventListener('load', imageLoaded);

        // put <img> inside <a> tag and then put both inside image container element;
        item.append(img);
        imageContainer.appendChild(item);
     });
 }

// Get Photos from Unsplash Api

async function getPhotos () {
    try{
        const response = await fetch(apiUrl);
        photosArray  = await response.json();
        displayPhotos();
    }catch(error){
        console.log(error);
    }
}

// On Load

getPhotos();

// check if the scrolling lead to near of a page 
let counter = 0;
window.addEventListener('scroll', ()=>{
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight- 1000 && ready===true){
        ready = false;
        getPhotos();
    }
});