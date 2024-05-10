const imageContainer = document.getElementById('imageContainer');
const loader = document.getElementById('loader');
const countOfPhoto = 30;
const apiKey = '7nuOu70CFLAK5W_1TtcovZjjG4QbQa6mZeaDNhjjFgw';
const apiURL = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${countOfPhoto}`;

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

function imageLoaded() {
    imagesLoaded++;
    if(imagesLoaded === totalImages){
        ready = true;
        loader.hidden = true;
    }
}
function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}

function displayPhotos() {
    imagesLoaded = 0;
    totalImages = photosArray.length;
    photosArray.forEach((photo)=>{
       const item =  document.createElement('a');
    setAttributes(item, {
        href: photo.links.html,
        target: '_blank'
    });
       const imageItem = document.createElement('img');
       setAttributes(imageItem, {
        src: photo.urls.regular,
        alt: photo.alt_description,
        title: photo.alt_description
    });
    imageItem.addEventListener('load', imageLoaded);
       item.appendChild(imageItem);
       imageContainer.appendChild(item);


    });
}
async function getPhotos() {
    try {
        const response = await fetch(apiURL);
        photosArray = await response.json();
        displayPhotos();
    } catch (error) {
        //Catch error here
    }
}


window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready){
        ready = false;
        getPhotos();
    }
})
getPhotos();