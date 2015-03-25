var PhotoViewerPlugin = (function( document, pv ) {

  // Public Properties
  ////////////////////////////////////////
  

  // Private Members
  ////////////////////////////////////////
  var ClassName = "photo";

  var images = [];
  var currentLoadedImage;

  var PhotoGallery;
  var PhotoViewer;

  var PhotoViewerTitle;
  var PhotoViewerClose;

  var PhotoViewerCurrentImage;

  var PhotoViewerCurrentImage;
  var PhotoViewerNextImage;
  var PhotoViewerCount;

  // Public Methods
  ////////////////////////////////////////
  pv.Initialize = function (className) {
    if (className === "undefined" || className === "" || className === null) {
      ClassName = "photo";
    }
    else {
      ClassName = className;
    }

    Init();
    SetImageLinkListeners();

    PhotoViewerClose.addEventListener('click', ClosePhotoViewer);
    PhotoViewerNextImage.addEventListener('click', LoadNextImage);
    PhotoViewerPreviousImage.addEventListener('click', LoadPreviousImage);
  }

  // Private Methods 
  ////////////////////////////////////////
  var Init = function () {
    images = [];

    PhotoGallery = document.getElementsByClassName(ClassName);
    PhotoViewer = document.getElementById("PhotoViewer");

    PhotoViewerTitle = document.getElementById("PhotoViewerTitle");
    PhotoViewerClose = document.getElementById("PhotoViewerClose");

    PhotoViewerCurrentImage = document.getElementById("PhotoViewerCurrentImage");

    PhotoViewerPreviousImage = document.getElementById("PhotoViewerPreviousImage");
    PhotoViewerNextImage = document.getElementById("PhotoViewerNextImage");
    PhotoViewerCount = document.getElementById("PhotoViewerCount");
  }

  var GetPhotos = function () {
    if(images.length > 0) {
      return;
    } 
    else {
      for(var i = 0; i < PhotoGallery.length; i++) {
        var image = {
          imageIndex: i,
          imageSrc: PhotoGallery[i].href,
          imageTitle: PhotoGallery[i].title
        }
        images.push(image);
      }
      
    }
  }

  var SetImageLinkListeners = function () {
    for(i = 0; i < PhotoGallery.length; i++) {
      PhotoGallery[i].addEventListener("click", ImageOpen);
    }
  }

  var ImageOpen = function (e) {
    e.preventDefault();
    InitializePhotoViewer(this.href);
  }

  var InitializePhotoViewer = function (clickedImage) {
    GetPhotos();
    for(var i = 0; i < images.length; i++) {
      if(images[i].hasOwnProperty('imageSrc')) {
        if(images[i].imageSrc === clickedImage) {
          OpenPhotoViewer(images[i]);   
        }
      }
    }
  }

  var SetPhotoViewerPhoto = function (currentImage) {
    PhotoViewerCurrentImage.setAttribute('src', currentImage.imageSrc);
    PhotoViewerTitle.innerHTML = currentImage.imageTitle;
    PhotoViewerCount.innerHTML = currentImage.imageIndex + 1 + '/' + images.length;
    currentLoadedImage = currentImage.imageIndex;
  }

  var ToggleLoading = function (display) {
    if (display) {
      console.log("Loading images...");
    }
    else {
      console.log("Loading complete!");
    }
  }

  var OpenPhotoViewer = function(clickedImage) {
    PhotoViewer.className += PHOTO_VIEWER_VISIBLE;
    SetPhotoViewerPhoto(clickedImage);
  }

  var ClosePhotoViewer = function(e) {
    e.preventDefault();
    PhotoViewer.className = PHOTO_VIEWER;
  }

  var LoadNextImage = function(e) {
    e.preventDefault();
    if (currentLoadedImage >= images.length - 1 ) {
      return;
    }

    SetPhotoViewerPhoto(images[currentLoadedImage + 1]);
  }

  var LoadPreviousImage = function(e) {
    e.preventDefault();
    if (currentLoadedImage <= 0) {
      return;
    }

    SetPhotoViewerPhoto(images[currentLoadedImage - 1]);
  }

  // CONSTANTS
  ////////////////////////////////////////

  var DEFINE_BY_CLASS_NAME = "class";
  var DEFINE_BY_GALLERY = "gallery";

  var PHOTO_VIEWER_VISIBLE = " photo-viewer--visible";
  var PHOTO_VIEWER = "photo-viewer";

  return pv;

}(document, PhotoViewerPlugin || {}));

document.addEventListener("DOMContentLoaded", function(event) {
  
  // Launch the Photo Viewer Plugin
  PhotoViewerPlugin.Initialize("test");

});