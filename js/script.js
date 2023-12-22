let malus = 0;
const letterAloneArray = [];
let randomWord = [];
//  const letters = document.getElementsByClassName("letters");

const emptyLetter = document.getElementById("section-empty-letter");
const containerLetter = document.getElementById("container-letter");
const draw = document.getElementById("draw");
const containerRandomLetter = document.getElementById("container-random-letter");



//fonction qui genere mes cases lettres avec une lettre unique
function generateLetter() {
    for (i = 0; i < 26; i++) {
        const letters = document.createElement("div");
        letters.classList = "letters";
        const letter = String.fromCharCode(97 + i);
        letters.innerText = letter;
        containerLetter.appendChild(letters);
        letters.addEventListener('click', function(){
            letterAloneArray.push(letter);
        })
    }
 }
 

 

//function pour mettre un mot aleatoire dans mon tableau randomWord
function randomWordFunction () {
    randomWord.forEach((element) => {
        const letterRandomWord = document.createElement("div");
        letterRandomWord.classList ="letter-random-word";
        containerRandomLetter.appendChild(letterRandomWord);
        console.log(element)
    })
}
        
    
 console.log(letterAloneArray);












 //fonction pour avoir un mot aléatoire :
async function getRandomWord () { // Async pour faire une fonction asynchrone, ça permet de réaliser des Promesses.
    let word = [];
    try { // try => Essaye, si une erreur est detecté alors on passe dans le catch
          const response = await fetch('https://trouve-mot.fr/api/random'); // Promesse pour récuperer l'ensemble des informations de l'URL.

        if (!response.ok) {
            throw new Error(`Erreur HTTP! Statut : ${response.status}`); // Si une erreur est detecté, on utilise throw pour l envoyer dans le catch.
        }
        
        const data = await response.json(); // Promesse pour récuperer les données dans la réponse des informations récupérées de l'URL.

        const element = data.shift(); // shift() permet d extraire le premier element d'un tableau. Attention l element extrait retire totalement l element du tableau ciblé.
        word = element.name.replace(/[^\w\s]/gi, '').split(''); // Expression régulire dans le replace afin de remplacer les caractere speciaux d'une String.

    } catch (error) { // catch => erreur "attrapé", on gere l erreur ici.
          console.error('Erreur lors de la récupération des données:', error);
    } finally { // finally, qu'il y ai une erreur ou pas, on passe toujours dans le finally à la fin de l execution de la fonction.
        return word; // Si le try fonction, alors word aura la valeur de ce qui a été récuperé dans la Promesse, autrement, si un erreur est detecté, alors word sera un tableau vide.
    }
}
  
(async () => { // Pour appeler un fonction qui a un attribut async et qui renvoie une promesse (async function getRandomWord), on doit se trouver dans un contexte async autrement, la valeur ne sera jamais lu.
     randomWord = await getRandomWord();
     generateLetter();
     randomWordFunction ()
    console.log(randomWord);
})();
