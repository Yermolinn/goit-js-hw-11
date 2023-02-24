import { Notify } from 'notiflix/build/notiflix-notify-aio';
import ImgApiService from './js/PixabayAPI.js';
import createTemplate from './js/createTemplate.js';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import debounce from 'lodash.debounce';


import LoadMoreBtn from './js/components/loadMoreBtn.js';


const formEl = document.getElementById('search-form');
const galleryDiv = document.querySelector('.gallery');
const lightbox = new SimpleLightbox('.gallery a', { captionsData: "alt", captionDelay: 250, });

// const loadMoreBtn = document.querySelector('.load-more');

const imgApiService = new ImgApiService();
const loadMoreBtn = new LoadMoreBtn({
    selector: ".load-more",
    isHidden: true
});


formEl.addEventListener('submit', onSubmit);
loadMoreBtn.button.addEventListener('click', fetchImgs);





function onSubmit(e) {
  e.preventDefault();

  const formEl = e.currentTarget;
  const value = formEl.elements.searchQuery.value.trim();

  imgApiService.query = value;
  imgApiService.resetPage();

  clearTemplate();
    // loadMoreBtn.show();
  fetchImgs().finally(() => formEl.reset());
}




// ==============      ASYNC FN      ==============

async function fetchImgs() {
  // loadMoreBtn.disable();
  try {
    const hits = await imgApiService.getImages();
    if (hits.length === 0) {
      Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
      )
    };
    const template = hits.reduce((markUp, hit) => createTemplate(hit) + markUp, '');
    appendTemplate(template);
    // loadMoreBtn.enable();
  }
  catch (err) {
    console.error(err)
  }
  lightbox.refresh();
}


function appendTemplate(markUp) {
  galleryDiv.insertAdjacentHTML('beforeend', markUp);
  
}


function clearTemplate() {
  galleryDiv.innerHTML = '';
}


function onError(err) {
  console.error(err);
    loadMoreBtn.hide();
  
  appendTemplate(
    Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    )
  );
}




  //  ++++++++++      INFINITY SCROLL     ++++++++++

window.addEventListener('scroll', debounce(() => {
  const documentRect = document.documentElement.getBoundingClientRect();
  if (documentRect.bottom < document.documentElement.clientHeight + 200) {
    fetchImgs().finally(() => formEl.reset());;
  }
}, 300));








  //  ++++++++++      PROMISES FN      ++++++++++


// function fetchImgs() {
//     loadMoreBtn.disable();

//   return imgApiService
//     .getImages(imgApiService.query)
//     .then(hits => {
//       if (hits.length === 0) throw new Error('No data');
//       return hits.reduce((markUp, hit) => createTemplate(hit) + markUp, '');
//     })
//       .then((markUp) => {
//         appendTemplate(markUp);
//         loadMoreBtn.enable();
//     })
//     .catch(onError);
// }



// function upDateTemplate(markUp) {
//     galleryDiv.innerHTML = markUp;
// }


