function fetchDefinition(word) {
    return new Promise((resolve, reject) => {
      fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Word not found in dictionary. Please enter a correct word.');
          }
          return response.json();
        })
        .then((data) => {
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
  

  
  function displayDefinition(definition) {
    const definitionContainer = document.getElementById('definitionContainer');
    definitionContainer.innerHTML = `
      <div class="card">
        <div class="card-header">
          <h3>${definition.word}</h3>
        </div>
        <div class="card-body">
          <p>${definition.meanings[0].definitions[0].definition}</p>
        </div>
      </div>
    `;
  }
  
  
  document.getElementById('searchButton').addEventListener('click', () => {
    const wordInput = document.getElementById('wordInput');
    const word = wordInput.value.trim();
  
    if (word !== '') {
      
      fetchDefinition(word)
        .then((data) => {
          displayDefinition(data[0]);
        })
        .catch((error) => {
          const definitionContainer = document.getElementById('definitionContainer');
          definitionContainer.innerHTML = `<p>${error.message}</p>`;
        });
    }
  });