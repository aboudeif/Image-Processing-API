<p align="center">
  <a href="" rel="noopener">
 <img width=200px height=200px src="https://i.imgur.com/6wj0hh6.jpg" alt="Project logo"></a>
</p>

<h3 align="center">image-processing-api</h3>

<div align="center">

[![Status](https://img.shields.io/badge/status-active-success.svg)]()
[![GitHub Issues](https://img.shields.io/github/issues/aboudeif/The-Documentation-Compendium.svg)](https://github.com/aboudeif/The-Documentation-Compendium/issues)
[![GitHub Pull Requests](https://img.shields.io/github/issues-pr/aboudeif/The-Documentation-Compendium.svg)](https://github.com/aboudeif/The-Documentation-Compendium/pulls)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](/LICENSE)

</div>

---

<p align="center"> Few lines describing your project.
    <br> 
</p>

## 📝 Table of Contents

- [About](#about)
- [Getting Started](#getting_started)
- [Deployment](#deployment)
- [Usage](#usage)
- [Built Using](#built_using)
- [Authors](#authors)
- [Acknowledgments](#acknowledgement)

## 🧐 About <a name = "about"></a>

An API that can be used as a simple placeholder API, allows to place images into frontend with the size set via URL parameters and additional stylization for rapid prototyping, and as a library to serve properly scaled versions of images to the front end to reduce page load size. Rather than needing to resize and upload multiple copies of the same image to be used throughout a site, the API will handle resizing and serving stored images.

## 🏁 Getting Started <a name = "getting_started"></a>

Go to entry point to application: http://localhost:3000/ 

→ Select an image or upload a new one
→ Enter a width and height for selected image (must be >= 100)
→ Click 'Generate image linke'
→ Click 'Copy' to copy link or click on it
  & Open generated link to find resized image

## 🏁 Deployment <a name = "deployment"></a>

### Prerequisites

node.js 

### Installing

```
npm install
```
## 🔧 Running the tests <a name = "tests"></a>

```
npm test
```
### And coding style tests

```
npm run lint
```
## 🎈 Usage <a name="usage"></a>

```
npm start
```
then open your browser and use entry point to application

```
http://localhost:3000/
```
you can use use view provided in the home page '/' or you can use other urls directly
for example '/images' is where you can resize an image providing filename, width and height

```
http://localhost:3000/images?filename=404.jpg&width=255&height=255
```
where image name = 404.jpg, given width = 255 and given height = 255.
another example is '/api/images' where you can got a list of all images in json form

```
http://localhost:3000/api/images
```

## ⛏️ Built Using <a name = "built_using"></a>

- [Express](https://expressjs.com/) - Server Framework
- [NodeJs](https://nodejs.org/en/) - Server Environment

## ✍️ Authors <a name = "authors"></a>

- [@aboudeif](https://github.com/aboudeif)

## 🎉 Acknowledgements <a name = "acknowledgement"></a>

This project is requierd for Egypt-FWD schollership "Advanced Full-Stack Web Development Nanodegree Program"
