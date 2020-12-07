const { words } = require('../data/words');

// write your handlers here...
const handleTest = (req, res) => {
    const wordId = req.params.id;
    const findWord = words.find((word) => {
        return word.id === wordId;
    })
    
    if (findWord) {
        res.status(200).json(findWord);
    }
    else {
        res.status(404).json( { status: '404', message: 'Page not found'});
    }
}

const handleWord = (req, res) => {
    const random = Math.floor(Math.random() * 16);
    const randomWord = words[random];
    const IdAndLetterCount = {id: randomWord.id, letterCount: randomWord.letterCount};
    res.status(200).json(IdAndLetterCount);
}

const handleGuess = (req, res) => {
    const wordId = req.params.id;
    const letterGuessed = req.params.letter;
    
    const findWord = words.find((word) => {
        return word.id === wordId;
    })

    const word = findWord.word;
    let newArr = [];
    for (let i = 0; i < word.length; i++) {
        newArr.push(false);
    }

    const wordArr = word.split('');
    for (let i = 0; i < wordArr.length; i++) {
        if (wordArr[i] === letterGuessed) {
            newArr[i] = true;
        }
    }

    if (word.indexOf(letterGuessed) > -1) {
        res.status(200).json( { status: 200, isPresent: newArr });
    }
    else {
        res.status(404).json({ status: 404, message: 'The letter does not exist in the word.'});
    }
}

module.exports = { handleTest, handleWord, handleGuess };
