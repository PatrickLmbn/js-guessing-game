document.addEventListener("DOMContentLoaded", (event) => {
    const displayWord = document.getElementById("wordVal")
    const displayDefinition = document.getElementById("definition")
    

    let points = 0


    async function getRandomWord() {
        const randomWordApi = 'https://random-word-api.vercel.app/api?words=1&type=capitalized';
      
        try {
          const response = await fetch(randomWordApi);
          if (!response.ok) {
            throw new Error('The response has an error');
          }
          const data = await response.json();
          console.log('Random Word Data:', data); 

         
          return data; 
        } catch (error) {
          console.error("Error fetching random word:", error.message);
          return null;
        }
      }
      
      async function getMerriamWord(word) {
        if (!word) {
          console.error('No word provided for Merriam-Webster API');
          return;
        }
      
        const merriamKey = '19160440-9fa3-45f1-8cbd-669f9b057902';
        const merriamApi = `https://dictionaryapi.com/api/v3/references/learners/json/${word}?key=${merriamKey}`;
      
        try {
          const response = await fetch(merriamApi, {
            method: 'GET',
            headers: {
              'Accept': 'application/json'
            }
          });
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const data = await response.json();
          console.log('Merriam-Webster Data:', data); 

          

      
          if (data.length > 0 && data[0].shortdef) {
            const definition = data[0].shortdef.join(', ');
            console.log('Definitions:', definition);
            displayWord.textContent = word;
            displayDefinition.textContent = "Definition: " + definition;
          } else {
            console.log('No definitions found.');
            displayWord.textContent = "Loading..."
            displayDefinition.textContent = "Please wait!"
            getRandomDetails();

          }

        let fetchWord = data[0].meta['app-shortdef'].hw;
        console.log("Merriam fetched word: " + fetchWord);

        const newFetchWord = fetchWord.replace(/[^a-zA-Z]/g, '');

        console.log("Cleaned word: " + newFetchWord);

          let wordArr = newFetchWord.split('')

          console.log(wordArr)
          let elementToRemove = 3 

          for(let i = 0; i < elementToRemove; i++){
            let randomIndex = Math.floor(Math.random() * wordArr.length)
            wordArr.splice(randomIndex, 1)
            wordArr.splice(randomIndex, 0, " _ ")
            console.log(newFetchWord)
          }


          document.getElementById('submitBtn').addEventListener('click', () => {
            const getWordVal = document.getElementById("inputText").value
            const dispScore = document.getElementById('point')
            if(typeof getWordVal === 'string' && getWordVal === newFetchWord) {
                points++;
                dispScore.textContent = "Score: " + points;
                displayWord.textContent = newFetchWord
                displayWord.style.color = "Green"
                document.getElementById("inputText").value = ""
                getRandomDetails();
            }else{
                displayWord.style.color = 'red'
            }
            
          })


          let jointElement = wordArr.join('');
          displayWord.textContent = jointElement
      
        } catch (error) {
          console.error('Error fetching Merriam-Webster data:', error.message);
        }
      }
      


      async function getRandomDetails() {
        const randomWord = await getRandomWord();
        displayWord.style.color = "black"

        console.log('Random Word:', randomWord); 
        if (randomWord) {
          await getMerriamWord(randomWord);
        } else {
          console.log('Failed to get a random word.');
        }
      }

      document.getElementById('playBtn').addEventListener('click', ()=> {
        getRandomDetails();
        displayWord.style.color = "black"

      })
      getRandomDetails();

      
      
      

})