const indexClone = document.querySelector("#main__template")
const mainList = document.querySelector(".index__Main")

myFetch.init({
  address: "https://api.spotify.com/v1/",
  key: "Bearer BQDFd7prtc1WLO04tcPApYZr-UfgMMKXcK25Z-0djtVexdTDemqX6x5nBj0XwjHWepaqeiuhz5BQPLmRaZqTgGanOsqDpXj06CJ08szSdBx4cdPdtEnfwQO-RiXQqg0eEe-K3IXl"
});

myFetch.get("browse/featured-playlists").then(result => {


  let featured = result.playlists.items

  console.log(featured)
  console.log(featured[0].images[0].url)
  featured.forEach(item => {
    let productClone = indexClone.content.cloneNode(true);
    productClone.querySelector(".main__img img").setAttribute("data-lazy", item.images[0].url)
    mainList.appendChild(productClone);
  })
});







// response.forEach(product => {
//   let productClone = productTemplate.content.cloneNode(true);
//   productClone.querySelector(".productName").innerText = product.model
//   productClone.querySelector("img").src = product.images
//   productClone.querySelector(".productPriceTag").innerText = product.price + " $ "
//   productClone.querySelector("a").href = `/product-template?sku=${product.sku}`
//   productList.appendChild(productClone);
//   productCounter++
//   shownItems.innerText = productCounter
// });