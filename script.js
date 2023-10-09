let nextPage;
let currentSearchTerm = '';
const fetchPixabayData = async (q, page) => {
  try {
    const response = await fetch(`http://localhost:3000/api/pixabay?q=${encodeURIComponent(q)}&page=${page}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data from Pixabay:", error);
    throw error;
  }
};
function updateModalContent(image) {
  const modalHeader = document.querySelector(".modal-header h2");
  modalHeader.textContent = `Image Details - ${image.user}`;

  const modalBody = document.querySelector(".modal-body");
  modalBody.innerHTML = `
      <p>Likes: ${image.likes}</p>
      <p>Views: ${image.views}</p>
      <p>Tags: ${image.tags}</p>
    `;
  const modalFooter = document.querySelector(".modal-footer");
  modalFooter.innerHTML = `<h3>Downloads: ${image.downloads}</h3>`;
}

const handleShowMoreClick = async () => {
  const searchValue = currentSearchTerm;

  if (searchValue !== "") {
    try {
      nextPage++;
      const data = await fetchPixabayData(searchValue, nextPage);
      const imageContainer = document.getElementById("imageContainer");

      data.hits.forEach((image) => {
        const boxElement = createImageBox(image, searchValue);
        imageContainer.appendChild(boxElement);
      });

      if (nextPage > data.totalPages) {
        const showMoreBtn = document.getElementById("showMoreBtn");
        showMoreBtn.style.display = "none";
      }
    } catch (error) {
      console.error("Error fetching and processing data:", error);
    }
  } else {
    alert("Please enter a search term.");
  }
};

const handleSearchClick = async () => {
  nextPage = 1;
  const searchBox = document.getElementById("searchBox");
  const searchValue = searchBox.value.trim();

  if (searchValue !== "") {
    currentSearchTerm = searchValue;
    try {
      const data = await fetchPixabayData(searchValue, nextPage);
      console.log(nextPage);
      const imageContainer = document.getElementById("imageContainer");
      imageContainer.innerHTML = "";
      showMoreBtn.style.display = 'initial';
      imageContainer.classList.add("box-container");
      console.log(imageContainer);
      data.hits.forEach((image) => {
        const boxElement = createImageBox(image, searchValue);
        imageContainer.appendChild(boxElement);
      });
      console.log("Fetched data:", data);
    } catch (error) {
      console.error("Error fetching and processing data:", error);
    }
  } else {
    alert("Please enter a search term.");
  }
};


let modal = document.getElementById("myModal");
let span = document.getElementsByClassName("close")[0];


span.onclick = function () {
  modal.style.display = "none";
};

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

const submitSearch = async (e) => {
  e.preventDefault();
  await handleSearchClick();
};

const showMoreBtn = document.getElementById("showMoreBtn");
showMoreBtn.addEventListener("click", handleShowMoreClick);

function createImageBox(image, searchValue) {
  const imageBoxTemplate = document.querySelector('#image-box');
  const newImageBox = imageBoxTemplate.content.cloneNode(true);
  const imageElement = newImageBox.querySelector('.image img');
  const openModalButton = newImageBox.querySelector('.open-modal-button');
  const favoriteStarButton = newImageBox.querySelector('.favorite-star-button');

  const favoriteImageIcon = favoriteStarButton.querySelector('.favorite-button-icon');
  let isFavoriteImage = localStorage.getItem(`isFavoriteImage:${image.id}`) || false;
  favoriteImageIcon.classList.add(isFavoriteImage ? 'fa-solid' : 'fa-regular')

  favoriteStarButton.addEventListener('click', () => {
    if (isFavoriteImage) {
      favoriteImageIcon.classList.remove('fa-solid');
      favoriteImageIcon.classList.add('fa-regular');
      localStorage.removeItem(`isFavoriteImage:${image.id}`);
      isFavoriteImage = !isFavoriteImage;
    } else {
      favoriteImageIcon.classList.remove('fa-regular');
      favoriteImageIcon.classList.add('fa-solid');
      localStorage.setItem(`isFavoriteImage:${image.id}`, 'true');
      isFavoriteImage = !isFavoriteImage;
    }
  });

  openModalButton.addEventListener('click', () => {
    updateModalContent(image)
    modal.style.display = "block";
  });
  imageElement.src = image.webformatURL;
  return newImageBox;
  
  // const boxElement = document.createElement("div");
  // boxElement.classList.add("box");
  // const imgElementDiv = document.createElement("div");
  // imgElementDiv.classList.add("image");
  // const imgElement = document.createElement("img");
  // imgElement.src = image.webformatURL;
  // imgElement.alt = image.tags;

  // const headingElement = document.createElement("h3");
  // headingElement.innerHTML = `<i class="fas fa-map-marker-alt"></i> ${image.user}`;
  // const contentDiv = document.createElement("div");
  // contentDiv.classList.add("content");
  // const priceDiv = document.createElement("div");
  // priceDiv.classList.add("price");
  // const pElement = document.createElement("p");
  // pElement.textContent = `Explore captivating images of ${searchValue} and embark on a visual journey like never before. From enchanting landscapes to urban wonders, our collection offers a glimpse into the beauty of diverse destinations. Whether you're an adventurer or an art enthusiast, these images will spark your imagination and inspire your wanderlust. Join us in celebrating the world's wonders.`;
  // const priceAElement = document.createElement("button");
  // priceAElement.innerHTML = "Open Modal";
  // priceAElement.classList.add("btn");
  // priceAElement.addEventListener("click", function () {
  //   modal.style.display = "block";
  // });
  // priceAElement.addEventListener("click", function () {
  //   modal.style.display = "block";
  //   updateModalContent(image); // Update modal content with image details
  // });
  // boxElement.appendChild(imgElementDiv);
  // boxElement.appendChild(contentDiv);
  // contentDiv.appendChild(priceDiv);
  // priceDiv.appendChild(pElement);
  // priceDiv.appendChild(priceAElement);
  // imgElementDiv.appendChild(imgElement);
  // imgElementDiv.appendChild(headingElement);
  // return boxElement;
}

