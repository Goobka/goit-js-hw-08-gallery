import gallery from './gallery-items.js'


const refs = {
    galleryList: document.querySelector(".gallery"),
    galleryLink: document.querySelector(".gallery__link"),
    lightbox: document.querySelector(".lightbox"),
    lightboxImg: document.querySelector(".lightbox__image"),
    lightboxContent: document.querySelector(".lightbox__content"),
    modalCloseBtn: document.querySelector(".lightbox__button"),
    lightboxOverlay: document.querySelector(".lightbox__overlay"),
};

//  const galleryItemString = ({ original, preview, description}) => {
//     return `<li class = "gallery__item"><a class = "gallery__link" href = "${original}"><img class = "gallery__image" src = "${preview}" data-source = "${original}" alt = "${description}></a></li>`
// };

// const galleryItem = gallery.map(galleryItemString).join(" ");

// galleryListRef.insertAdjacentHTML("afterbegin", galleryItem);       //ПОЧЕМУ ДОБАВЛЯЕТ ЭЛЕМЕНТЫ (ТЕГИ a и img) ВНУТРЬ ОДНОГО li??????

refs.galleryList.addEventListener("click", onOpenModal);
refs.modalCloseBtn.addEventListener("click", onCloseModal);
refs.lightboxOverlay.addEventListener("click", onBackdropClick);
console.log(refs.galleryList)


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
    imgEl.dataset.index = gallery.indexOf(galleryItem);
    imgEl.alt = galleryItem.description;
    refEl.appendChild(imgEl);
    itemEl.appendChild(refEl);
    return itemEl;
});
refs.galleryList.append(...galleryItems); 

let activeImgIndex;

function onOpenModal(event) {
    event.preventDefault();
    window.addEventListener("keydown", onPressKey);

    if (event.target.nodeName !== "IMG") {
    return
};
    refs.lightbox.classList.add("is-open");
    refs.lightboxImg.src = event.target.dataset.source;

    activeImgIndex = Number(event.target.dataset.index);
};


function onCloseModal(event) {
    window.removeEventListener("keydown", onPressKey);
    refs.lightbox.classList.remove("is-open");
    refs.lightboxImg.src = "";
    refs.lightboxImg.alt = "";
}; 

function onBackdropClick(event) {
    if (event.target === event.currentTarget) {
        onCloseModal();
    };

};

function onPressKey(event) {
  if (event.code === "Escape") {
    onCloseModal();
  };

  if (event.code === "ArrowRight") {
    if (activeImgIndex < gallery.length - 1) {
      refs.lightboxImg.src = gallery[(activeImgIndex += 1)].original;
    };
    return
  };

  if (event.code === "ArrowLeft") {
    if (activeImgIndex) {
      refs.lightboxImg.src = gallery[(activeImgIndex -= 1)].original;
    };
    return
  };
};

 