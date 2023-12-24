let malus = 0;
let letterAloneArray = [];
let randomWord = []; //mot aleatoire
let letterRandomWord = document.getElementsByClassName("letter-random-word");
//  const letters = document.getElementsByClassName("letters");
const statutFault = document.getElementById("statut-fault");
const emptyLetter = document.getElementById("section-empty-letter");
let containerLetter = document.getElementById("container-letter");
const draw = document.getElementById("draw");
let containerRandomLetter = document.getElementById("container-random-letter");
const restart = document.getElementById("restart");
let imagePendu = document.getElementById("div-img");
let letter ="";
let winArray = [];
let gaugWin = 0;
const gaugWinScoring = document.getElementById("gaug-win-scoring");
// let gameOver = false
//fonction qui genere mes cases lettres avec une lettre unique
function generateLetter() {
    for (i = 0; i < 26; i++) {
        const letters = document.createElement("button");
        letters.classList = "letters";
        const letter = String.fromCharCode(97 + i);
        letters.innerText = letter;
        containerLetter.appendChild(letters);
        letters.addEventListener('click', function(){
            letterAloneArray.push(letter);
            let correctLetter = false;
            for (let y = 0; y < randomWord.length; y++) {
                if (randomWord[y] === letter) {
                    console.log(randomWord[y]=== letter)
                    winArray.push(randomWord[y]);
                    console.log(winArray)
                    letterRandomWord[y].innerText = randomWord[y];
                    // letterRandomWord[y].style.color = "black"
                    letters.style.visibility = "hidden";
                    correctLetter = true;
                    if (winArray.length === letterRandomWord.length) {
                        statutFault.innerText = "Tu gagnes"
                        restart.innerText = "Recommencer"
                        gaugWin ++;
                        gaugWinScoring.innerText = "Victoire : " + gaugWin;
                        console.log(gaugWin);
                        // gameOver = true;
                    }
                }
            }
            if (correctLetter === false) {
                letters.style.visibility = "hidden";
                malus ++;
                if (malus < 9) {
                    
                    statutFault.innerText = "Il te reste " + (9 - malus) + " essai(s)";
                }
                else if (malus === 9){
                    statutFault.innerText = "Perdu !"
                    restart.innerHTML = "Recommencer"
                    // gameOver = true;
                }
                imagePendu.style.backgroundImage = `url(images/pendu_${malus}.jpg`;
            
            }
        })
    }
 }
 
 
 
 console.log(letterAloneArray)
 console.log(malus)
 console.log(letter)

//function pour mettre un mot aleatoire dans mon tableau randomWord
function randomWordFunction () {
    randomWord.forEach((element) => {
        const letterRandomWord = document.createElement("div");
        letterRandomWord.classList = "letter-random-word";
        letterRandomWord.innerText = "_";
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
     randomWordFunction ();
    console.log(randomWord);
})();


async function restartGame() {
    statutFault.innerText = "Il te reste 9 essais";
    imagePendu.style.backgroundImage = "url(images/pendu_0.jpg"
    malus = 0;
    containerLetter.innerHTML = "";
    containerRandomLetter.innerHTML = "";
    letterAloneArray = [];
    winArray = [];
    word = [];
    randomWord = await getRandomWord();
    generateLetter();
    randomWordFunction();
    
 }
restart.addEventListener("click", restartGame)




// for (let y = 0; y < letterRandomWord.length; y ++)
            // if (letters === letterRandomWord[y].innerText) {
            //     letterRandomWord.style.color = "red";
            // }
            // for (let y = 0; y < letterAloneArray.length; y ++) {
            //     var letterSearched = letterAloneArray[y];
            //     // console.log(letterAloneArray[y])
            // }
            
            // if (randomWord.includes(letterSearched)){
            //     letterRandomWord.style.color = "green";
            //     console.log("ok")
            // }else {
            //     malus ++;
            // }


             // if (malus === 1) {
                //     imagePendu.style.backgroundImage = "url(images/pendu_1.jpg"
                // }else if (malus === 2) {
                //     imagePendu.style.backgroundImage = "url(images/pendu_2.jpg"
                // }else if (malus === 3) {
                //     imagePendu.style.backgroundImage = "url(images/pendu_3.jpg"
                // }else if (malus === 4) {
                //     imagePendu.style.backgroundImage = "url(images/pendu_4.jpg"
                // }else if (malus === 5) {
                //     imagePendu.style.backgroundImage = "url(images/pendu_5.jpg"
                // }else if (malus === 6) {
                //     imagePendu.style.backgroundImage = "url(images/pendu_6.jpg"
                // }else if (malus === 7) {
                //     imagePendu.style.backgroundImage = "url(images/pendu_7.jpg"
                // }else if (malus === 8) {
                //     imagePendu.style.backgroundImage = "url(images/pendu_8.jpg"
                // }else if (malus === 9) {
                //     imagePendu.style.backgroundImage = "url(images/pendu_9.jpg"
                // }
                // drawMalus();