import axios from "axios";
import React, { useState, useRef, useEffect } from "react";
import "./App.css";
import FlashCardList from "./FlashcardList";
import FormList from "./FormList";

function App() {
  const [flashCards, setFlashCards] = useState([]);
  const [categories, setCategories] = useState([]);

  const categoryEl = useRef();
  const amountEl = useRef();

  useEffect(() => {
    axios.get("https://opentdb.com/api_category.php").then((res) => {
      setCategories(res.data.trivia_categories);
    });
  }, []);

  useEffect(() => {}, []);

  function decode(str) {
    const textArea = document.createElement("textarea");
    textArea.innerHTML = str;
    return textArea.value;
  }

  function handelSubmit(e) {
    e.preventDefault();
    axios
      .get("https://opentdb.com/api.php", {
        params: {
          amount: amountEl.current.value,
          category: categoryEl.current.value,
        },
      })
      .then((res) => {
        setFlashCards(
          res.data.results.map((questionsItem, index) => {
            const answer = decode(questionsItem.correct_answer);
            const options = [
              ...questionsItem.incorrect_answers.map((a) => decode(a)),
              answer,
            ];
            return {
              id: `${index}-${Date.now()}`,
              question: decode(questionsItem.question),
              answer: answer,
              options: options.sort(() => Math.random() - 0.5),
            };
          })
        );
      });
  }

  return (
    <>
      <FormList
        handelSubmit={handelSubmit}
        categoryEl={categoryEl}
        categories={categories}
        amountEl={amountEl}
      />
      <div className="container">
        <FlashCardList Cards={flashCards} />
      </div>
    </>
  );
}

export default App;
