const list = document.getElementById("list");
  
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

            const url = 'https://graphql.anilist.co';

            // Make a POST request to the AniList GraphQL API endpoint.
            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify({
                    query: query
                })
            })
            .then(function (response) {
                return response.json();
            })
            .then(function (result) {
                result.data.Page.media.forEach(function (anime, rank) {

                const card = document.createElement("a");
                card.href = anime.siteUrl;
                card.target = "_blank";
                card.className = "card";

                const boxrank = document.createElement("div");
                boxrank.className = "boxrank";

                const boxtitle = document.createElement("div");
                boxtitle.className = "boxtitle";

                const prank = document.createElement("p");
                prank.textContent = rank+1+".";
                boxrank.appendChild(prank);
                prank.className = "rankstyle";

                const penglish = document.createElement("p");
                penglish.textContent = anime.title.english;
                boxtitle.appendChild(penglish);
                penglish.className = "title"; //css styling

                const promaji = document.createElement("p");
                promaji.textContent = anime.title.romaji;
                boxtitle.appendChild(promaji);
                promaji.className = "title"; //css styling

                const pnative = document.createElement("p");
                pnative.textContent = anime.title.native;
                boxtitle.appendChild(pnative);
                pnative.className = "title"; //css styling

                boxrank.appendChild(boxtitle);
                card.appendChild(boxrank);

                const image = document.createElement("img");
                image.src = anime.coverImage.large;
                card.appendChild(image);
                
                const description = document.createElement("p");
                description.innerHTML = anime.description;
                card.appendChild(description);
                
                list.appendChild(card);
});
            });
            
            
            
            
