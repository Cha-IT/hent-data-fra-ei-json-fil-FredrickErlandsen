fetch("./sanger.json")
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(sanger => {
        const sangliste = document.querySelector("#sangliste");
        const spotifyPlayer = document.querySelector("#spotifyPlayer");

        // Legg til hver sang i listen med nummerering
        sanger.forEach((sang, index) => {
            const li = document.createElement("li");
            li.innerHTML = `<span>${index + 1}. ${sang.navn} - ${sang.artist}</span>`;
            li.addEventListener("click", () => {
                visSangInfo(sang, index + 1);
                visSpotifyPlayer(sang.sanglink); // Vis Spotify-spilleren når sangen blir klikket
            });
            sangliste.appendChild(li);
        });

        // Funksjon for å vise info om valgt sang
        function visSangInfo(sang, nummer) {
            sangInfo.innerHTML = `
                <h2>${nummer}. ${sang.navn}</h2>
                <p><strong>Artist:</strong> ${sang.artist}</p>
                <p><strong>Sjanger:</strong> ${sang.sjanger || "Ikke spesifisert"}</p>
                <p><strong>Varighet:</strong> ${sang.varighet}</p>
                <p><strong>Avspillinger:</strong> ${sang.avspillinger}</p>
            `;
            sangInfo.classList.remove("hidden");
        }

        // Funksjon for å vise Spotify-spilleren
        function visSpotifyPlayer(url) {
            if (url) {
                spotifyPlayer.innerHTML = `<iframe src="${url}" width="300" height="80" frameborder="0" allow="encrypted-media" allowtransparency="true"></iframe>`;
            }
        }
    })
    .catch(error => console.error("Feil ved henting av JSON:", error));
