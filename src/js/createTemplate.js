export default function createTemplate({
  largeImageURL,
  webformatURL,
  tags,
  likes,
  views,
  comments,
  downloads,
}) {
  return `
<a class="card-link" href="${largeImageURL}">   
    <div class="photo-card" >
    <img class="photo" src="${webformatURL}" alt="${tags}" loading="lazy" />
    <div class="info">
        <p class="info-item">
        <b>Likes</b>
    ${likes}   
        </p>
        <p class="info-item">
        <b>Views</b>
    ${views} 
        </p>
        <p class="info-item">
        <b>Comments</b>
    ${comments}
        </p>
        <p class="info-item">
        <b>Downloads</b>
    ${downloads}
        </p>
    </div>
    </div>
</a> `;
}






// export default createTemplate;

// function createTemplate({
//   largeImageURL,
//   webformatURL,
//   tags,
//   likes,
//   views,
//   comments,
//   downloads,
// }) {
//   return `
// <a class="card-link" href="${largeImageURL}">   
//     <div class="photo-card" >
//     <img class="photo" src="${webformatURL}" alt="${tags}" loading="lazy" />
//     <div class="info">
//         <p class="info-item">
//         <b>Likes</b>
//     ${likes}   
//         </p>
//         <p class="info-item">
//         <b>Views</b>
//     ${views} 
//         </p>
//         <p class="info-item">
//         <b>Comments</b>
//     ${comments}
//         </p>
//         <p class="info-item">
//         <b>Downloads</b>
//     ${downloads}
//         </p>
//     </div>
//     </div>
// </a> `
// }


// function renderTemplate(markUp) {
//     galleryDiv.innerHTML = markUp; 
// }




