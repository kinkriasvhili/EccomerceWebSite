const barElement = document.getElementById('bar');
const navElement = document.getElementById('navbar');
const closeElement = document.getElementById('close');

if (barElement) {
  barElement.addEventListener('click', ()=> {
    navElement.classList.add('active')
  })
}
if (closeElement) {
  closeElement.addEventListener('click', ()=> {
    navElement.classList.remove('active');
  })
}


// single product

let mainImgElement = document.getElementById("mainImg");
let smalImgElements = document.getElementsByClassName("small-img");

// Convert HTMLCollection to an array using Array.from
let smalImgArray = Array.from(smalImgElements);

// Now you can use forEach on the array
smalImgArray.forEach(value => {
  value.addEventListener('click', ()=> {
    mainImgElement.src = value.src;
  })
});

// filter
const filterButtons = document.querySelectorAll('.filterButton');

filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    const target = button.getAttribute('data-target');
    const targetFilter = document.querySelector(`.${target}Filter`);

    // Toggle the 'show' class to trigger the transition
    targetFilter.classList.toggle('show');
  });
});




let filterActive = document.querySelector('.filter');
let filterClose = document.querySelector('.filterCloseBtn');
let filterBarElement = document.querySelector('.filterBar');
if(filterActive) {

    filterClose.addEventListener('click', ()=> {
      filterActive.classList.add('filterClose');
    })
    filterBarElement.addEventListener('click', ()=> {
      filterActive.classList.toggle('show-filter');
      filterActive.classList.remove('filterClose');
    })
    
    
}






