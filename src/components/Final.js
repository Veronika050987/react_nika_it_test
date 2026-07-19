import './Final.css';

function Final({ totalQuestions, correctAnswers, onRestart }) {
    return (
        <div className='question' style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <h2 style={{ display: "flex", justifyContent: "space-between" }}>
                <div>Всего вопросов: </div>    
                <div>{totalQuestions}</div>
            </h2>
            <h2 style={{ display: "flex", justifyContent: "space-between" }}>
                <div>Правильных ответов:</div> 
                <div>{correctAnswers}</div>
            </h2>

            {/* 2. Добавляем кнопку возврата в меню */}
            <button className="restart-btn"
                onClick={onRestart}    
            >
                Вернуться к выбору тестов
            </button>
        </div>
    )
}
export default Final;