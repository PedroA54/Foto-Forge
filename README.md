
![foto forge](./readmeImg/fotoForgeTitle.png)
### Create and Save beautiful images

## Table of Contents 
1. Introduction
2. Features
4. Installation
5. How to Use
6. API
7. License
8. Acknowledgements

##  Introduction

Whether you're seeking inspiration or simply enjoying the creative process, Foto Forge provides a user-friendly platform for exploring, interacting, and tailoring images to your unique vision. Unleash your creativity and enhance the aesthetic appeal of your photos with just a few clicks.

Get ready to embark on a journey of visual exploration and customization, turning ordinary photos into personalized works of art. Let your imagination run wild on the Photo Customizer Website!


## Features

- Generate 10 random photos for selection
- Adjust height and width of the photos
- Apply blur effect for visual aesthetics
- Convert photos to black and white for a classic look
- Save your favorite photos under 'My Photos'
- Edit saved photos to dial in your aesthetic
- Delete unwanted saved photos

## Installation
FotoForge must be downloaded and ran on your local device. Instructions to do so are included below...

### Open FotoForge

Navigate to the main repo of FotoForge. Navigate to the upper righthand side and click on Fork. Choose your preferred settings and confirm by clicking 'Create Fork'. Within your own forked repo click on 'Code' > 'Local' > 'SSH' > Copy the SSH link to your clipboard. 

Next, open up your terminal. Navigate to a folder where you would like to store FotoForge and run the following while replacing the values wrapped in <> with your own values 
<br><br>
`git clone <SSH Link>`
<br><br>
`cd <Repo Name>`
<br><br>
Feel free to open up your code in your preferred code editor at this time. If you already have node.js downloaded continue to the next step. Otherwise, download Node here (https://nodejs.org/en/download). 
<br><br>
Start a live server on your device
<br><br>
`npm install -g live-server`
<br><br>
`live-server .`
<br><br>
You are now able to use FotoForge. You will be able to view and edit photos at this time. In order to save your photos please continue with the instructions below.

### Setting up your local server

In order to store your beautiful creations you will need to open up your own JSON server on your device. Follow the instructions below...
<br><br>
 `npm install json-server`
 <br><br>
`json-server --watch ./src/db.json`
 <br><br>
 You can now save your edited photos to view later. Enjoy!!!


## How to Use

### Choose a photo
On the top of the application, right below the title. You will see a selection of 10 randomly generated photos for you to choose from. You can scroll left and right to view all of the photos. If none of the photos are to your liking. Hit 'New Images' and 10 brand new photos will be provided for you. Once you find one you like. Click it with your mouse. 
![choosePhoto](./readmeImg/choosePhoto.png)

### Creating a photo
Once you click on a photo it will appear in preview area below the photo you selected. This is a full preview of your photo with a default size of 1000px by 1600px. The photo previewed will be the same size you specify on the left hand side. To the left of the preview is the editing bar. The first field is for what you want to name your image. You can also specify the width and height. This field takes in pixels as a measurement to size your images. Below these you have the option to make your image black and white. By default, the images will be color. However, please be aware that some photos are originally black and white. If the black and white selector is turned off but the photo is still in black and white then you are looking at the original photo. The next input is blur. Blur is measured on a scale from 0 to 10 with 0 being no blur and 10 being extremely blurry. This will default to zero. 
<br><br>
Once you have specified how you want your image to look. Hit the 'Update Photo' button on the lower left side. This will apply your changes and you can view your photo. If you do not like how it looks, adjust the options and hit update again. Repeat until you have your desired image.

### Saving a photo
After specifying how you want your image to look. Please hit the 'Save Photo' button on the left side. This will save your current photo with its name and details in the 'My Photos' section below. 

### Editing a photo
If you would like to edit a saved photo then scroll down to 'My Photos', find which photo you would like to edit, and hit the 'Edit' button. After doing this a menu will appear asking you what you would like to edit. You can edit the name, height, width, b&w, and blur. Once you are done hit the 'Edit Photo' button and check your changes on the app. 
![editPhoto](./readmeImg/editPhoto.png)

### Deleting a photo
If you no longer wish to store your photo, then please navigate back down to 'My Photos'. Find the photo you would like to delete and hit the 'X' button. This will delete the photo from the applications memory and you will no longer be able to access it.
![editPhoto](./readmeImg/deletePhoto.png)

## API
FotoForge uses the Lorem Picsum API to access, render, and edit photos. All of Lorem Picsum's photos are provided by Unsplash. Unsplash is a platform that stores freely usable images for anyone to access and use. 
<br><br>
API endpoint information can be found on (https://picsum.photos/)

## License 
This project is licensed under the MIT License

## Acknowledgments
-  Thanks to Unsplash for providing the random photos.
- Special thanks to our contributors for their valuable input and contributions.


