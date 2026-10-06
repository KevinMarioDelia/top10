// ---------- setup ----------

// the empty <div id="list"> from index.html, all the cards get added in here
const list = document.getElementById("list");


// ---------- the AniList request ----------

// the question we send to AniList (GraphQL):
// give me page 1 with 10 anime, sorted by trending, and only the fields we use
const query = `
    query {
        Page(page: 1, perPage: 10) {
            media(type: ANIME, sort: TRENDING_DESC) {
                id
                title {
                    romaji
                    english
                    native
                }
                description
                coverImage {
                    large
                }
                siteUrl
            }
        }
    }
`;

// AniList only takes requests at this address
const url = "https://graphql.anilist.co";

fetch(url, {
    method: "POST",                       // we send something along (the query)
    headers: {
        "Content-Type": "application/json", // what we send is JSON
        "Accept": "application/json"        // we want JSON back
    },
    body: JSON.stringify({ query: query })  // the query turned into text so it can travel
})
    .then(function (response) {
        // the answer arrives as raw text, .json() turns it into objects
        return response.json();
    })
    .then(function (result) {
        // runs once the data has arrived
        // result.data.Page.media is the list of the 10 anime

        // ---------- build one card per anime ----------
        // anime = the current anime, rank = its position in the list (starts at 0)
        result.data.Page.media.forEach(function (anime, rank) {

            // the card is a link, so a click anywhere on it opens the AniList page
            const card = document.createElement("a");
            card.href = anime.siteUrl;
            card.target = "_blank"; // open in a new tab
            card.className = "card";

            // top row of the card: rank on the left, the three titles on the right
            const boxrank = document.createElement("div");
            boxrank.className = "boxrank";

            const boxtitle = document.createElement("div");
            boxtitle.className = "boxtitle";

            // rank: the position starts at 0, so +1 gives 1 to 10
            const prank = document.createElement("p");
            prank.textContent = rank + 1 + ".";
            prank.className = "rankstyle";
            boxrank.appendChild(prank);

            // the three versions of the title
            const penglish = document.createElement("p");
            penglish.textContent = anime.title.english;
            penglish.className = "title";
            boxtitle.appendChild(penglish);

            const promaji = document.createElement("p");
            promaji.textContent = anime.title.romaji;
            promaji.className = "title";
            boxtitle.appendChild(promaji);

            const pnative = document.createElement("p");
            pnative.textContent = anime.title.native;
            pnative.className = "title";
            boxtitle.appendChild(pnative);

            // titles go next to the rank, then the whole row goes into the card
            boxrank.appendChild(boxtitle);
            card.appendChild(boxrank);

            // cover image
            const image = document.createElement("img");
            image.src = anime.coverImage.large;
            card.appendChild(image);

            // description (innerHTML because AniList sends it with HTML tags like <br>)
            const description = document.createElement("p");
            description.innerHTML = anime.description;
            card.appendChild(description);

            // last step: put the finished card on the page
            list.appendChild(card);
        });
    });
