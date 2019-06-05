import axios from 'axios'

export function getProducts(pageSize, pageNum, priceRangeFlag, sortByPrice){
  return axios.get('/products/select', {
    params: {
      pageSize,
      pageNum,
      priceRange: priceRangeFlag,
      sortByPrice
    }
  });
}
