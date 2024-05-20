document.addEventListener("DOMContentLoaded", () => {




    //Fetch variables
    const url = "https://picsum.photos";
    const arrayUrl = "https://picsum.photos/v2/list?limit=12";
    const dbUrl = "http://localhost:3000/photos";
    let grayscale = false;
    let blur = 0;
    let photoId = Math.floor(Math.random() * 700);
    let photoWidth = 1600;
    let photoHeight = 1000;
  
  
  
  
  
    //DOM Elements
    const randomPhoto = document.querySelector("#display-photo");
    const photoMessage = document.querySelector("#photo-message");
    const blackAndWhite = document.querySelector("#toggle");
    const createPhotoButton = document.getElementById("generate-button");
    const photoPreviewBar = document.querySelector("#photo-preview-bar");
    const newImagesButton = document.querySelector("#new-images-button");
    const blurInput = document.getElementById("blur-input");
    const widthScale = document.getElementById("photo-width");
    const heightScale = document.getElementById("photo-height");
    const photoStorageContainer = document.querySelector("#photo-storage-container");
    const saveButton = document.querySelector("#save-button");
    const editModal = document.querySelector("#editModal");
    const modalExitButton = document.querySelector("#modal-exit-button");
    const editModalForm = document.querySelector("#edit-photo-form");
    const photoNameInput = document.querySelector("#photo-name-input");
  
  
  
  
  
    //Event Listeners
    blurInput.addEventListener("input", (event) => {
      let inputValue = event.target.value;
      blur = parseInt(inputValue);
    });
  
    blackAndWhite.addEventListener("change", (event) => {
      const btn = event.target.checked;
      if (btn) {
        grayscale = true;
      } else {
        grayscale = false;
      }
    });
  
    createPhotoButton.addEventListener("click", (e) => {
      e.preventDefault();
  
      fetchPhoto();
    });
  
    heightScale.addEventListener("input", (event) => {
      const newHeight = parseInt(event.target.value);
  
      if (newHeight > 1000) {
        alert("Please Input a height below 1000px");
      } else {
        photoHeight = newHeight;
      }
    });
  
    widthScale.addEventListener("input", (event) => {
      const newWidth = parseInt(event.target.value);
  
      if (newWidth > 1600) {
        alert("Please Input a width below 1600px");
      } else {
        photoWidth = newWidth;
      }
    });
  
    newImagesButton.addEventListener("click", () => {
      fetchPhotoArray();
    });
  
    saveButton.addEventListener("click", () => savePhoto());
  
    modalExitButton.addEventListener("click", () => hideModal());
  
    editModalForm.addEventListener("submit", (e) => patchPhoto(e));
  
  
  
  
  
    //FUNCTION DECLARATIONS
    //
    //
    //Fetch Requests
    //
    //Fetch Photo Preview Bar and display
    const fetchPhotoArray = () => {
      photoPreviewBar.innerHTML = "";
  
      const randomPage = Math.floor(Math.random() * 100);
  
      fetch(`${arrayUrl}&page=${randomPage}`)
        .then((resp) => resp.json())
        .then((photos) => {
          photos.map((photo) => {
            const previewImg = document.createElement("img");
            const newImgUrl = `${photo.download_url.slice(0, 25)}${photo.id}/200`;
  
            previewImg.name = photo.id;
            previewImg.src = newImgUrl;
            previewImg.classList.add("photo-bar-img");
  
            previewImg.addEventListener("click", (e) => {
              grayscale = false;
              blur = 0;
              photoWidth = 1600;
              photoHeight = 1000;
              photoId = e.target.name;
              fetchPhoto();
            });
            photoPreviewBar.appendChild(previewImg);
          });
        });
    };
    //Fetch and render photo for image editing
    const fetchPhoto = () => {
      randomPhoto.src = "";
      displayLoading();
  
      fetch(
        `${url}/id/${photoId}/${photoWidth}/${photoHeight}/?${
          grayscale ? "grayscale&" : ""
        }${blur ? "blur=" + blur : ""}`
      )
        .then((resp) => {
          const imgUrl = resp["url"];
  
          hideLoading();
          randomPhoto.src = imgUrl;
        })
        .catch((err) => console.log(err));
    };
    //Fetch photos from local database and display in 'My Photos'
    const renderSavedPhotos = () => {
      fetch(dbUrl)
        .then((resp) => resp.json())
        .then((savedPhotos) => {
          savedPhotos.map((photo) => {
            //Declare new elements
            const newPhotoCard = document.createElement("div");
            const newButtonContainer = document.createElement("div");
            const newPhotoName = document.createElement("h3");
            const newPhotoSize = document.createElement("h5");
            const newBlurPreview = document.createElement("h5");
            const newGrayscale = document.createElement("h5");
            const newEditButton = document.createElement("button");
            const newDeleteButton = document.createElement("button");
            const newImgPreview = document.createElement("img");
  
            //Input Data into new elements
            newPhotoCard.id = photo.id;
            newPhotoName.innerHTML = photo.name;
            newPhotoSize.innerHTML = `Width: ${photo.width}px <> Height: ${photo.height}px`;
            newGrayscale.innerHTML = `B&W: ${photo.bAndW ? "Yes" : "No"}`;
            newBlurPreview.innerHTML = `Blur: ${photo.blur}`;
            newImgPreview.classList.add("photo-card-img");
            newImgPreview.id = photo.unsplashId;
            newImgPreview.src = `${url}/id/${photo.unsplashId}/600`;
            newImgPreview.addEventListener("click", () => {
              photoId = photo.unsplashId;
              photoWidth = photo.width;
              photoHeight = photo.height;
              grayscale = photo.bAndW;
              blur = photo.blur;
              fetchPhoto();
            });
            newDeleteButton.classList.add("photo-card-button");
            newDeleteButton.innerHTML = "X";
            newDeleteButton.name = photo.id;
            newDeleteButton.addEventListener("click", (e) => deletePhoto(e));
            newEditButton.classList.add("photo-card-button");
            newEditButton.name = photo.id;
            newEditButton.innerHTML = "Edit";
            newEditButton.name = photo.id;
            newEditButton.addEventListener("click", (e) => editPhoto(e));
            newButtonContainer.classList.add("saved-photo-buttons");
            newEditButton.name = photo.id;
            newEditButton.addEventListener("click", (e) => editPhoto(e));
            newButtonContainer.classList.add("saved-photo-buttons");
  
            //Add Elements to new Div
            newPhotoCard.classList.add("photo-card");
            newButtonContainer.append(newEditButton, newDeleteButton);
            newPhotoCard.append(
              newButtonContainer,
              newPhotoName,
              newPhotoSize,
              newBlurPreview,
              newGrayscale,
              newImgPreview
            );
  
            //Add new Photo Card to Saved Photos
            photoStorageContainer.append(newPhotoCard);
          });
        });
    };
    //
    //
    //HTTP Requests
    //
    //Post Request to local database
    const savePhoto = () => {
      const dbData = [];
  
      const getDbData = () => {
        fetch(dbUrl)
          .then((resp) => resp.json())
          .then((photos) => {
            photos.map((photo) => dbData.push(photo));
          });
      };
  
      getDbData();
      console.log(dbData);
  
      const generateUniqueId = () => {
        return Math.random().toString(36).substring(2);
      };
  
      const idExists = (id) => {
        return dbData.some((item) => item.id === id);
      };
  
      const rerouteGeneratedId = () => {
        let id;
        do {
          id = generateUniqueId();
        } while (idExists(id));
        return id;
      };
  
      const uniqueID = rerouteGeneratedId();
      console.log("Unique ID:", uniqueID);
  
      const photoData = {
        id: uniqueID, //unique id that does not exist in db.json
        unsplashId: photoId,
        name: photoNameInput.value, //Add an HTML element where user can input name
        height: photoHeight,
        width: photoWidth,
        blur: blur,
        bAndW: grayscale,
      };
  
      function postName() {
        fetch(dbUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(photoData),
        })
          .then((resp) => resp.json())
          .then((savedPhoto) => {
            const newPhotoCard = document.createElement("div");
            const newButtonContainer = document.createElement("div");
            const newPhotoName = document.createElement("h3");
            const newPhotoSize = document.createElement("h5");
            const newBlurPreview = document.createElement("h5");
            const newGrayscale = document.createElement("h5");
            const newEditButton = document.createElement("button");
            const newDeleteButton = document.createElement("button");
            const newImgPreview = document.createElement("img");
  
            //Input Data into new elements
            newPhotoName.innerHTML = savedPhoto.name;
            newPhotoSize.innerHTML = `Width: ${savedPhoto.width}px <> Height: ${savedPhoto.height}px`;
            newGrayscale.innerHTML = `B&W: ${savedPhoto.bAndW ? "Yes" : "No"}`;
            newBlurPreview.innerHTML = `Blur: ${savedPhoto.blur}`;
            newImgPreview.classList.add("photo-card-img");
            newImgPreview.src = `${url}/id/${savedPhoto.unsplashId}/600`;
            newImgPreview.addEventListener("click", () => {
              photoId = savedPhoto.unsplashId;
              photoWidth = savedPhoto.width;
              photoHeight = savedPhoto.height;
              grayscale = savedPhoto.bAndW;
              blur = savedPhoto.blur;
              fetchPhoto();
            });
            newDeleteButton.classList.add("photo-card-button");
            newDeleteButton.innerHTML = "X";
            newDeleteButton.name = savedPhoto.id;
            newDeleteButton.addEventListener("click", (e) => deletePhoto(e));
            newEditButton.classList.add("photo-card-button");
            newEditButton.name = savedPhoto.id;
            newEditButton.innerHTML = "Edit";
            newEditButton.name = savedPhoto.id;
            newEditButton.addEventListener("click", (e) => editPhoto(e));
            newButtonContainer.classList.add("saved-photo-buttons");
            newEditButton.name = savedPhoto.id;
            newEditButton.addEventListener("click", (e) => editPhoto(e));
            newButtonContainer.classList.add("saved-photo-buttons");
  
            newPhotoCard.classList.add("photo-card");
            newButtonContainer.append(newEditButton, newDeleteButton);
            newPhotoCard.append(
              newButtonContainer,
              newPhotoName,
              newPhotoSize,
              newBlurPreview,
              newGrayscale,
              newImgPreview
            );
  
            photoStorageContainer.append(newPhotoCard);
          });
      }
      postName();
    };
    //Open Edit Modal and prep PATCH request
    const editPhoto = (e) => {
      displayModal();
      editModalForm.name = e.target.name;
    };
    //Patch Request to local database
    const patchPhoto = (e) => {
      e.preventDefault();
  
      const editedPhotoCard = document.getElementById(e.target.name);
  
      const unsplashIdForImg = editedPhotoCard.querySelector("img");
      console.log();
  
      if (
        e.target.editName.value === "" ||
        e.target.editHeight.value === "" ||
        e.target.editWidth.value === "" ||
        e.target.editBlur.value === "" ||
        e.target.editBAndW.checked === ""
      ) {
        alert("Please fill out all fields!");
      } else {
        const editObject = {
          name: e.target.editName.value,
          height: Number(e.target.editHeight.value),
          width: Number(e.target.editWidth.value),
          blur: Number(e.target.editBlur.value),
          bAndW: e.target.editBAndW.checked,
        };
  
        const editUrl = `http://localhost:3000/photos/${editModalForm.name}`;
  
        fetch(editUrl, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editObject),
        })
          .then((resp) => {
            if (!resp.ok) {
              console.log("did not work");
            }
            console.log("EDIT SUCCESSFUL");
  
            editedPhotoCard.innerHTML = `
                  <div class='saved-photo-buttons'>
                      <button class='photo-card-button' name='4'>
                      Edit
                      </button>
                      <button class='photo-card-button' name='4'>
                      X
                      </button>
                  </div>
  
                  <h3> ${editObject.name} </h3>
                  <h5> Width: ${editObject.width}px <> Height: ${
              editObject.height
            }px</h5>
                  <h5>Blur: ${editObject.blur} </h5>
                  <h5>B&W: ${editObject.bAndW ? "Yes" : "No"}</h5>
                  <img class='photo-card-img' src='https://picsum.photos/id/${
                    unsplashIdForImg.id
                  }/600'>
                  `;
            hideModal();
          })
          .catch((err) => {
            console.error("Error:", err);
          });
  
        // Define the data to be updated
      }
    };
    //Delete Request to local database
    const deletePhoto = (e) => {
      console.log(e.target.parentNode.parentNode);
  
      const deleteUrl = `http://localhost:3000/photos/${e.target.name}`;
  
      fetch(deleteUrl, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((resp) => {
          if (!resp.ok) {
            throw new Error("ERROR");
          }
          console.log("DELETE SUCCESSFUL");
          e.target.parentNode.parentNode.remove();
        })
        .catch((err) => {
          console.error("Error:", err);
        });
    };
    //Display loading message while image renders
    const displayLoading = () => {
      photoMessage.classList.add("display");
    };
    //Hide loading message while image renders
    const hideLoading = () => {
        photoMessage.classList.remove("display");
    };
    //Display Modal for editing
    const displayModal = () => {
      editModal.classList.remove("modalOff");
      editModal.classList.add("modal");
    };
    //Hide editing modal
    const hideModal = () => {
        editModal.classList.remove("modal");
        editModal.classList.add("modalOff");
    };
    
    
    
    
    //Initial Execution Order
    const main = () => {
      //Get the photo from lorem picsum
      fetchPhotoArray();
      fetchPhoto();
      renderSavedPhotos();
    };
    //Invoke Initial Execution Order
    main();
  });