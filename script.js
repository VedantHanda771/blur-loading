const scale = (num, in_min, in_max, out_min, out_max) => {
  return ((num - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min;
}

function blurring() {
  const loadText = document.querySelector('.loading-text, .progress-bar');
  const bg = document.querySelector('.imageBox');
  const holder = document.querySelector('.holder');

  let load = 0;
  let int = setInterval(() => {
    load++;
    if (load > 99) {
      clearInterval(int);
    }
   
    if (load === 100) {
      setTimeout(() => {
      triggerBackOutDownAnimation(holder); // Call the function to trigger backOutDown animation when load is 100
      }, 300);
    }
    
    bg.style.filter = `blur(${scale(load, 0, 100, 30, 0)}px)`;
    updateProgressBar(load);
  }, 30);

  

  function triggerBackOutDownAnimation(element) {
    element.classList.add("animate__animated", "animate__zoomOutUp");
  }

}


const button = document.getElementById("blurButton");


button.addEventListener("click", blurring);



const progressBar = document.querySelector('.progress-bar');


function updateProgressBar(load) {
  progressBar.style.width = `${load}%`;
  progressBar.innerText = `${load}%`;
}

button.addEventListener("click", updateProgressBar);


function displayRandomImage() {
  const accessKey = 'UzuKj-rE_tg8o8CX9jEm0hOp2aQwjZZwJq84uoPdz70'; // Replace with your actual access key
  fetch(`https://api.unsplash.com/photos/random?query=landscape&client_id=${accessKey}`)
    .then(response => response.json())
    .then(data => {
      const imageUrl = data.urls.regular; // Get the URL of the image
      const imageElement = document.getElementById('myImage');
      imageElement.src = imageUrl; // Set the image source to the fetched URL
    })
    .catch(error => console.error('Error fetching image:', error));
}


window.onload = displayRandomImage();


