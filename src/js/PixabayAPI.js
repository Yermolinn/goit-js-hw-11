const axios = require('axios').default;

const BASE_URL = 'https://pixabay.com/api';
const KEY = '5326395-fa286140056880ef12df4a9f7';
const imageType = 'photo';
const orientation = 'horizontal';
const safesearch = 'true';

export default class ImgApiService {
  constructor() {
    this.page = 1;
    this.perPage = 40;
    this.query = '';
    this.totalPages = 0;
  }

  async getImages() {
    const URL = `${BASE_URL}/?key=${KEY}&q=${this.query}&image_type=${imageType}&orientation=${orientation}&safesearch=${safesearch}&per_page=${this.perPage}&page=${this.page}`;

    const response = await axios.get(URL);
    this.nextPage();
    return response.data.hits;

    // return fetch(URL)
    //   .then(response => response.json())
    //   .then(({ hits }) => {
    //     this.nextPage();
    //     return hits;
    //   });
  }

  nextPage() {
    this.page += 1;
  }
  resetPage() {
    this.page = 1;
  }
    
    setTotal(total) {
    this.totalPages = total;
}

  hasMorePhotos() {
    return this.page < Math.ceil(this.totalPages / this.perPage);
  }
}

// const BASE_URL = "https://pixabay.com/api";
// const KEY = "5326395-fa286140056880ef12df4a9f7";
// const imageType = "photo";
// const orientation = "horizontal";
// const safesearch = "true";
// const perPage = "40";

// function getImages(query) {
//     const URL = `${BASE_URL}/?key=${KEY}&q=${query}&image_type=${imageType}&orientation=${orientation}&safesearch=${safesearch}&per_page=${perPage}`;

//     return fetch(URL)
//         .then((response) => {
//          return response.json()
//         })
// }

// export default getImages;
