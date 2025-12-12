const input = document.getElementById("search-input");
const displayArea = document.getElementById("character-result");

input.addEventListener("keydown", async (e) => {
    if (e.key === "Enter") {
        const name = input.value.trim();

        if (!name) {
            displayArea.innerHTML = "<p class='error'>Digite um nome válido.</p>";
            return;
        }

        fetchCharacter(name);
    }
});

async function fetchCharacter(name) {
   
    try {
        const res = await fetch(
            `https://www.anapioficeandfire.com/api/characters?name=${name}`
        );

        if (!res.ok) {
            throw new Error("Erro na requisição da API");
        }

        const data = await res.json();

        if (data.length === 0) {
            displayArea.innerHTML = `<p class="error">Nenhum personagem encontrado.</p>`;
            return;
        }

        const char = data[0];

        displayCharacter(char);

    } catch (error) {
        console.log("Erro ao buscar personagem:", error);
        displayArea.innerHTML = `<p class="error">Erro ao buscar dados.</p>`;
    }
}

function displayCharacter(char) {
    displayArea.innerHTML = `
        <div class="char-card">
            <h2>${char.name}</h2>

            <p><strong>Títulos:</strong> ${char.titles.join(", ") || "Nenhum"}</p>
            <p><strong>Apelidos:</strong> ${char.aliases.join(", ") || "Nenhum"}</p>
            <p><strong>Nascido:</strong> ${char.born || "Desconhecido"}</p>
            <p><strong>Cultura:</strong> ${char.culture || "Nenhuma"}</p>
            <p><strong>Temporadas:</strong> ${char.tvSeries.join(", ") || "Nenhuma"}</p>
            <p><strong>Ator(es):</strong> ${char.playedBy.join(", ") || "Nenhum"}</p>
        </div>
    `;
}
