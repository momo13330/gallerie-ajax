/*
1) fonction constructeur pour créer des Item
Item de gallery a
- un titre
- une url d'image
 */

function Item(title, url) {
    this.title = title;
    this.url = url;
}

/*
2) manuellement appeler la fonction pour créer un tableau d'Item
Ressources importées
*/


//
// let items = [
//     new Item("look into the end of the earth", "https://farm1.staticflickr.com/744/23499298192_1fe6b05a0e_z_d.jpg"),
//     new Item("untitled", "https://farm6.staticflickr.com/5599/15241862020_d90cdef7ef_z_d.jpg"),
//     new Item("Iceland Landscape", "https://farm2.staticflickr.com/1688/24435474119_e3eb892220_z_d.jpg"),
//     new Item("Lumpy Landscape", "https://farm4.staticflickr.com/3815/10437767843_6d07525a25_z_d.jpg"),
//     new Item("White landscape", "https://farm5.staticflickr.com/4069/4500406315_5a726ae601_z_d.jpg"),
//     new Item("Iceland", "https://farm8.staticflickr.com/7412/16328391906_5645a821d2_z_d.jpg"),
//     new Item("AAA013", "https://farm6.staticflickr.com/5507/12630176853_eb183bb445_z_d.jpg"),
//     new Item("Small cabin", "https://farm6.staticflickr.com/5651/23893623086_545fa74245_z_d.jpg"),
//     new Item("abiqua", "https://farm9.staticflickr.com/8237/8571324282_3cc0dcfdcb_z_d.jpg")
// ];


function buildGalleryItemHTML(item) {
    return `
    
    <a href="" class="gallery__item">
        <img src="${item.url}" alt="${item.name}" class="gallery__item__image">
        <p class="gallery__item__title">${item.name}</p>
    </a>
    
    `;
}


/*
3) écrire une fonction qui insère la gallery d'item dans
l'élement DOM de notre choix, précisé par le selecteur

@param items: Array<Item>
@param containerCSSSelector: String
@return nothing

exemple d'utilisation
function buildGallery(items, ".gallery")

*/

function buildGallery(items, containerCSSSelector) {
    let container = document.querySelector(containerCSSSelector);

    // let itemsHTML = '';
    // for(let i = 0; i < items.length; i++)
    // for(let i in p)
    //
    // {
    //     itemsHTML += buildGalleryItemHTML(items[i]);
    // }

    container.innerHTML = `
        <div class="gallery">
        ${ items.reduce((html, item) => html + buildGalleryItemHTML(item), '') }
        </div>
    `;
}
//----------------------------------------------------------------------------------------------------------------------
//                                                      AJAX
//----------------------------------------------------------------------------------------------------------------------
let xhr = new XMLHttpRequest();
// définir la ressource a atteindre et la manière de l'atteindre
xhr.open('GET', 'https://api.imgflip.com/get_memes');

// accrocher un listener pour réagir aux changements d'états de l'objet
xhr.onreadystatechange = function () {
    console.log(xhr.readyState);
    if (xhr.readyState == 4) {
        console.log(xhr.status);
        // console.log(xhr.responseText);
        let o = JSON.parse(xhr.responseText);
        // console.log(o.data.memes[0].url);
        // let divRandom = document.querySelector('.gallery-section');
        //  divRandom.innerHTML = `
        //  <h1>Titre : ${o.data.memes[49].name}</h1>
        //  <img src="${o.data.memes[49].url}" >`;
        let items = o.data.memes;
        console.log(items)
        buildGallery(items, '.gallery-section');
    }
};

// la requête HTTP est envoyé
xhr.send();

// AJAX

