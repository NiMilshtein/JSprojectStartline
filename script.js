nextPage = 2;
const fetchPixabayData = async (q, page) => {
  try {
    const response = await fetch(
      `http://localhost:3000/api/pixabay?q=${encodeURIComponent(
        q
      )}&page=${page}`
    );
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
  const searchBox = document.getElementById("searchBox");
  const searchValue = searchBox.value.trim();

  if (searchValue !== "") {
    try {
      const data = await fetchPixabayData(searchValue, nextPage);
      const imageContainer = document.getElementById("imageContainer");

      data.hits.forEach((image) => {
        const boxElement = document.createElement("div");
        boxElement.classList.add("box");

        const imgElementDiv = document.createElement("div");
        imgElementDiv.classList.add("image");

        const imgElement = document.createElement("img");
        imgElement.src = image.webformatURL;
        imgElement.alt = image.tags;

        const headingElement = document.createElement("h3");
        headingElement.innerHTML = `<i class="fas fa-map-marker-alt"></i> ${image.user}`;

        imgElementDiv.appendChild(imgElement);
        imgElementDiv.appendChild(headingElement);
        boxElement.appendChild(imgElementDiv);

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
  const searchBox = document.getElementById("searchBox");
  const searchValue = searchBox.value.trim();

  if (searchValue !== "") {
    try {
      const data = await fetchPixabayData(searchValue);
      const imageContainer = document.getElementById("imageContainer");
      imageContainer.innerHTML = "";
      showMoreBtn.style.display = "block";
      imageContainer.classList.add("box-container");
      console.log(imageContainer);
      data.hits.forEach((image) => {
        const boxElement = document.createElement("div");
        boxElement.classList.add("box");
        const imgElementDiv = document.createElement("div");
        imgElementDiv.classList.add("image");
        const imgElement = document.createElement("img");
        imgElement.src = image.webformatURL;
        imgElement.alt = image.tags;

        const headingElement = document.createElement("h3");
        headingElement.innerHTML = `<i class="fas fa-map-marker-alt"></i> ${image.user}`;
        const contentDiv = document.createElement("div");
        contentDiv.classList.add("content");
        const priceDiv = document.createElement("div");
        priceDiv.classList.add("price");
        const pElement = document.createElement("p");
        pElement.textContent = `Explore captivating images of ${searchValue} and embark on a visual journey like never before. From enchanting landscapes to urban wonders, our collection offers a glimpse into the beauty of diverse destinations. Whether you're an adventurer or an art enthusiast, these images will spark your imagination and inspire your wanderlust. Join us in celebrating the world's wonders.`;
        const priceAElement = document.createElement("button");
        priceAElement.innerHTML = "Open Modal";
        priceAElement.classList.add("btn");
        priceAElement.addEventListener("click", function () {
          modal.style.display = "block";
        });
        priceAElement.addEventListener("click", function () {
          modal.style.display = "block";
          updateModalContent(image); // Update modal content with image details
        });
        boxElement.appendChild(imgElementDiv);
        boxElement.appendChild(contentDiv);
        contentDiv.appendChild(priceDiv);
        priceDiv.appendChild(pElement);
        priceDiv.appendChild(priceAElement);
        imgElementDiv.appendChild(imgElement);
        imgElementDiv.appendChild(headingElement);
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

let btn = document.getElementsByClassName("btn")[0];

let span = document.getElementsByClassName("close")[0];

btn.onclick = function () {
  console.log("modal open");
  modal.style.display = "block";
};

span.onclick = function () {
  modal.style.display = "none";
};

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};
const searchButton = document.getElementById("search-btn");
searchButton.addEventListener("click", handleSearchClick);
const showMoreBtn = document.getElementById("showMoreBtn");
showMoreBtn.addEventListener("click", handleShowMoreClick);
