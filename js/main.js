import gallery from './gallery-items.js'


const refs = {
    galleryListRef: document.querySelector(".gallery"),
    lightboxRef: document.querySelector(".lightbox"),
    lightboxImgRef: document.querySelector(".lightbox__image"),
};

//  const galleryItemString = ({ original, preview, description}) => {
//     return `<li class = "gallery__item"><a class = "gallery__link" href = "${original}"><img class = "gallery__image" src = "${preview}" data-source = "${original}" alt = "${description}></a></li>`
// };

// const galleryItem = gallery.map(galleryItemString).join(" ");

// galleryListRef.insertAdjacentHTML("afterbegin", galleryItem);       //ПОЧЕМУ ДОБАВЛЯЕТ ЭЛЕМЕНТЫ ТЕГИ a и img ВНУТРЬ ОДНОГО li?

refs.galleryListRef.addEventListener("click", onGalleryListRefClick);

console.log(refs.galleryListRef)


const galleryItems = gallery.map(galleryItem => {
    const itemEl = document.createElement("li");
    itemEl.classList.add("gallery__item")
    const refEl = document.createElement("a");
    refEl.classList.add("gallery__link");
    refEl.href = galleryItem.original;
    const imgEl = document.createElement('img');
    imgEl.classList.add("gallery__image");
    imgEl.src = galleryItem.preview;
    imgEl.dataset.source = galleryItem.original;
    imgEl.alt = galleryItem.description;
    refEl.appendChild(imgEl);
    itemEl.appendChild(refEl);
    return itemEl;
});
refs.galleryListRef.append(...galleryItems); 


function onGalleryListRefClick(event) {
    //event.stopPropagation()
    //const tagImg = event.target;
    console.dir(event.target);
    // refs.lightboxRef.classList.add(".lightbox.is-open");
    // refs.lightboxImgRef.src = event.target.dataset.source;
    // return console.log(event.target);
}