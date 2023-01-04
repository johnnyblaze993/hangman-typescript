import React, { useState } from "react";
import wordList from "../../src/wordList.json";

type Props = {};

const Hangman = (props: Props) => {
  const [word, setWord] = useState<string>(
    wordList[Math.floor(Math.random() * wordList.length)]
  );
  const [guesseWords, setGuesseWords] = useState<string[]>([]);
  const [wrongGuesses, setWrongGuesses] = useState<string[]>([]);
  const [guessNumber, setGuessNumber] = useState<number>(0);
  const [input, setInput] = useState<string>("");

  const submitGuess = () => {
    if (input.length === 1) {
      if (word.includes(input)) {
        setGuesseWords([...guesseWords, input]);
      } else {
        setWrongGuesses([...wrongGuesses, input]);
      }
      setGuessNumber(guessNumber + 1);
      setInput("");
    }
  };

  const YouPass = () => {
    return (
      <>
        <p>Congrats! You guessed the word!</p>
        <button onClick={() => window.location.reload()}>Play again</button>
      </>
    );
  };

  const GameOver = () => {
    return (
      <>
        <p>Game over! The word was: {word}</p>
        <button onClick={() => window.location.reload()}>Play again</button>
      </>
    );
  };

  const GuessWord = () => {
    return (
      <p>
        Word:
        {word.split("").map((letter, index) => {
          return (
            <span key={index}>
              {
                //if there is more than one occurrence of the letter, when the correct letter is guessed, show the letter and all the other occurrences of the letter else show dash
                word.split(letter).length - 1 > 1
                  ? guesseWords.includes(letter)
                    ? letter
                    : "-"
                  : guesseWords.includes(letter)
                  ? letter
                  : "-"
              }
            </span>
          );
        })}
      </p>
    );
  };

  return (
    <div>
      <h1>Hangman</h1>
      <GuessWord />

      {wrongGuesses.length === 6 && <GameOver />}

      {word.split("").every((letter) => guesseWords.includes(letter)) ? (
        <YouPass />
      ) : (
        <>
          <p>Guesses left: {6 - wrongGuesses.length}</p>
        </>
      )}

      <p>
        Correct guesses:{" "}
        {guesseWords.map((letter, index) => {
          return (
            <span key={index}>
              {guesseWords.indexOf(letter) === index ? letter : ""}
            </span>
          );
        })}
      </p>
      <p>
        Wrong guesses:{" "}
        {
          //if the wrong guess is the same as the previous wrong guess, don't show it
          wrongGuesses.map((letter, index) => {
            return (
              <span key={index}>
                {wrongGuesses.indexOf(letter) === index ? letter : ""}
              </span>
            );
          })
        }
      </p>

      {
        //only show the input field if the game is not over yet
        wrongGuesses.length === 6 || guesseWords === word.split("") ? null : (
          <div>
            <p>Guess a letter: </p>
            <input
              type="text"
              placeholder="Guess letter"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              maxLength={1}
              disabled={
                wrongGuesses.length === 6 || guesseWords === word.split("")
              }
            />
            <button onClick={submitGuess}>Guess</button>
          </div>
        )
      }
    </div>
  );
};

export default Hangman;
