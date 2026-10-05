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
                result.data.Page.media.forEach(function (anime) {
                const penglish = document.createElement("p");
                penglish.textContent = anime.title.english;
                list.appendChild(penglish);

                const promaji = document.createElement("p");
                promaji.textContent = anime.title.romaji;
                list.appendChild(promaji);

                const pnative = document.createElement("p");
                pnative.textContent = anime.title.native;
                list.appendChild(pnative);

                const image = document.createElement("img");
                image.src = anime.coverImage.large;
                list.appendChild(image);
                
                const description = document.createElement("p");
                description.textContent = anime.description;
                list.appendChild(description);

});
            });
            
            
            
            
