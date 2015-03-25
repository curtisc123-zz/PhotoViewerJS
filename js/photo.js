var PhotoViewerPlugin = (function( document, pv ) {

  // Public Properties
  ////////////////////////////////////////

  // Private Members
  ////////////////////////////////////////

  var images = [];
  var imageLinks = [];

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

  pv.Initialize = function () {

    Init();
    SetLinkListeners();
  }

  // Private Methods 
  ////////////////////////////////////////

  var Init = function () {
    PhotoGallery = document.getElementById("PhotoGallery");
    PhotoViewer = document.getElementById("PhotoViewer");

    PhotoViewerTitle = document.getElementById("PhotoViewerTitle");
    PhotoViewerClose = document.getElementById("PhotoViewerClose");

    PhotoViewerCurrentImage = document.getElementById("PhotoViewerCurrentImage");

    PhotoViewerPreviousImage = document.getElementById("PhotoViewerPreviousImage");
    PhotoViewerNextImage = document.getElementById("PhotoViewerNextImage");
    PhotoViewerCount = document.getElementById("PhotoViewerCount");
  }

  var GetPhotos = function () {
    var imageTags;
    imageTags = PhotoGallery.getElementsByTagName("img");

    for(var i = 0; i < imageTags.length; i++) {
      var image = {
        imageSrc: imageTags[i].src,
        imageTitle: imageTags[i].title
      }

      images.push(image);
    }

    console.log(images);
  }

  var SetLinkListeners = function () {
    imageLinks = PhotoGallery.getElementsByTagName("a");
    for(i = 0; i < imageLinks.length; i++) {
      imageLinks[i].addEventListener("click", ImageOpen);
    }
  }

  var ImageOpen = function (e) {
    e.preventDefault();

    InitializePhotoViewer();
  }

  var InitializePhotoViewer = function () {
    GetPhotos();

    PhotoViewer.className += PHOTO_VIEWER_VISIBLE;
    SetPhotoViewerPhoto();
  }

  var SetPhotoViewerPhoto = function () {
    // you were doing stuff here
  }

  var ToggleLoading = function (display) {
    if (display) {
      console.log("Loading images...");
    }
    else {
      console.log("Loading complete!");
    }
  }

  // CONSTANTS
  ////////////////////////////////////////

  var DEFINE_BY_CLASS_NAME = "class";
  var DEFINE_BY_GALLERY = "gallery";

  var PHOTO_VIEWER_VISIBLE = " photo-viewer--visible";

  return pv;

}(document, PhotoViewerPlugin || {}));



document.addEventListener("DOMContentLoaded", function(event) {
  
  // Launch the Photo Viewer Plugin
  PhotoViewerPlugin.Initialize();

});