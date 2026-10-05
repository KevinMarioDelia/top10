const list = document.getElementById("list");
const animetitle = [
    { title: "One Piece", description: "Pirates search for a legendary treasure."},
    { title: "Naruto", description: "Naruto being silly."},
    { title: "Bleach", description: "Some dude stunting on yall asses."}
];

animetitle.forEach(function (anime) {
    const p = document.createElement("p");
    p.textContent = anime.title;
    list.appendChild(p);

    const description = document.createElement("p");
    description.textContent = anime.description;
    list.appendChild(description);

});