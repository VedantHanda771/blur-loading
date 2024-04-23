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
  fetch('https://source.unsplash.com/featured/1600x900/?landscape')
    .then(response => {
      const imageUrl = response.url;
      const imageElement = document.getElementById('myImage');
      imageElement.src = imageUrl;
    })
    .catch(error => console.error('Error fetching image:', error));
}

window.onload = displayRandomImage();


