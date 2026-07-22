import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';
import Question from './components/Question.js';
import Final from './components/Final.js';

function shuffleArray(array) {
  let currentIndex = array.length, randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }
  return array;
}

const shuffleVariants = (variants, correctIndex) => {
  const indexedVariants = variants.map((text, index) => ({ text, originalIndex: index }));
  const shuffledIndexedVariants = shuffleArray([...indexedVariants]);
  
  const newVariants = shuffledIndexedVariants.map(item => item.text);
  const newCorrectIndex = shuffledIndexedVariants.findIndex(item => item.originalIndex === correctIndex);
  
  return { newVariants, newCorrectIndex };
};

// 1. ИЗМЕНЕНИЕ: Теперь здесь объект с двумя тестами (PHP и JS)
const allTests = {
  php: [
    {
      title: "Слонёнка выбираем - ... мы запускаем",
      variants: ["SQL", "PHP", "MVC", "JavaScript", "React"],
      correct: 1
    },
    {
      title: "На сервер данные пошлёт и скроет в URL их метод ...",
      variants: ["$_MOST", "$_GET", "$_POST", "$_HEAD"],
      correct: 2
    },
    {
      title: "Аргументы принимает, но значения не возвращает.",
      variants: ["echo", "$response", "include"],
      correct: 0
    },
    {
      title: "Ошибки в коде не нужны при многократном подключении: для классов, функций и констант защиты используй лучше...",
      variants: ["post_once", "response_once", "include_once"],
      correct: 2
    },
    {
      title: "При компиляции они всегда PHP разрешены.",
      variants: ["массивы", "магические константы", "функции"],
      correct: 1
    },
  ],
  FreeBSD: [
    {
      title: "Открыть для измененья файл поможет текстовый...",
      variants: ["cry", "why", "VI"],
      correct: 2
    },
    {
      title: "Демонов ты разбуди – запускай...",
      variants: ["DPD", "FreeBSD", "GPT"],
      correct: 1
    },
     {
      title: "Решить HTTP задачи поможет сервер нам...",
      variants: ["match", "touch", "apache"],
      correct: 2
    },
     {
      title: "Чтобы пользователя создать, какую команду нам нужно набрать?",
      variants: ["userget", "useradd", "usershow"],
      correct: 1
    },
     {
      title: "Чтобы выключить систему, ... вводи ты смело.",
      variants: ["init 0", "init 2", "init 4"],
      correct: 0
    },
  ],
  React_and_ASP: [
    {
      title: "Он память компоненту дал, чтоб помнить всё подряд: что кликнул ты, что записал - вернёт всё без преград.",
      variants: ["useEffect", "use", "useState"],
      correct: 2
    },
    {
      title: "При криптографии нужна верификация. Авторизация важна и аутентификация. Защита данных – важный путь. Здесь бдительность нельзя спугнуть. Для безопасности нужны всегда...",
      variants: ["home AI", "API-ключи", "GPT"],
      correct: 1
    },
     {
      title: "Сравнить с граблями его можно, но вернуть нам компонент поможет.",
      variants: ["@page", "@code", "@rendermode"],
      correct: 2
    },
     {
      title: "Без неё, как без души, ASP проект не может быть.",
      variants: ["модель", "страница", "форма"],
      correct: 0
    },
     {
      title: "Создать проект нам новый нужно, без базы данных нам никак. Чтоб рос каркас архитектуры дружно, ... поможет нам.",
      variants: ["модификация", "миграция", "ротация"],
      correct: 1
    },
  ]
};

function App() {
  // 2. ИЗМЕНЕНИЕ: Новое состояние для выбранного теста (null — значит открыто меню выбора)
  const [activeTest, setActiveTest] = useState(null);

  // Динамически определяем количество вопросов в зависимости от выбранного теста
  const totalQuestions = activeTest ? allTests[activeTest].length : 0;

  const [step, setStep] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [shuffledOriginalQuestions, setShuffledOriginalQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(null);

  // 3. ИЗМЕНЕНИЕ: Перемешиваем вопросы только тогда, когда выбран тест (activeTest)
  useEffect(() => {
    if (activeTest) {
      setShuffledOriginalQuestions(shuffleArray([...allTests[activeTest]]));
    }
  }, [activeTest]);

  useEffect(() => {
    if (activeTest && step < totalQuestions && shuffledOriginalQuestions.length > 0) {
      const original = shuffledOriginalQuestions[step];
      const { newVariants, newCorrectIndex } = shuffleVariants(original.variants, original.correct);
      
      setCurrentQuestion({
        ...original,
        variants: newVariants,
        correct: newCorrectIndex
      });
    }
  }, [step, shuffledOriginalQuestions, totalQuestions, activeTest]);

  // Функция для сброса стейта и возврата в меню
  const handleReset = () => {
    setActiveTest(null);
    setStep(0);
    setCorrect(0);
    setSelectedVariant(null);
    setIsAnswered(false);
    setShuffledOriginalQuestions([]);
    setCurrentQuestion(null);
  };

  const handleAnswer = (clickedIndex, isCorrect) => {
    if (isAnswered) return;
    
    setIsAnswered(true);
    setSelectedVariant(clickedIndex);

    if (isCorrect) {
      setCorrect(prev => prev + 1);
    }

    setTimeout(() => {
      setStep(prevStep => prevStep + 1);
      setIsAnswered(false);
      setSelectedVariant(null);
    }, 3500);
  };

  // 4. ИЗМЕНЕНИЕ: Если тест не выбран, показываем меню выбора тестов
  if (!activeTest) {
    return (
      <div className="main menu-container" style={{ textAlign: 'center', padding: '20px' }}>
        <h2>Выберите тест для прохождения:</h2>
        <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', marginTop: '20px' }}>
          <button className="menu-btn" onClick={() => setActiveTest('php')}>PHP</button>
          <button className="menu-btn" onClick={() => setActiveTest('FreeBSD')}>FreeBSD</button>
          <button className="menu-btn" onClick={() => setActiveTest('React_and_ASP')}>React_and_ASP</button>
        </div>
      </div>
    );
  }

  if (shuffledOriginalQuestions.length === 0 && step < totalQuestions) {
    return <div className="main">Загрузка вопросов...</div>;
  }
  
  if (step < totalQuestions && !currentQuestion) {
    return <div className="main">Подготовка вопроса...</div>;
  }

  return (
    <div className="main">
      {step < totalQuestions ? (
        <Question 
          question={currentQuestion} 
          onAnswer={handleAnswer} 
          step={step} 
          totalQuestions={totalQuestions}
          selectedVariant={selectedVariant} 
          isAnswered={isAnswered} 
        />
      ) : (
        // 5. ИЗМЕНЕНИЕ: В Final можно передать handleReset, чтобы кнопка «Попробовать снова» возвращала в меню
        <Final totalQuestions={totalQuestions} correctAnswers={correct} onRestart={handleReset} />
      )}
    </div>
  );
}

export default App;