import './Final.css';

function Final({totalQuestions, correctAnswers})
{
    return(
        <div className='question'>
            <h2 style={{display:"flex", justifyContent:"space-between"}}><div>Всего вопросов: </div>    <div>{totalQuestions}</div></h2>
            <h2 style={{display:"flex", justifyContent:"space-between"}}><div>Правильных ответов:</div> <div>{correctAnswers}</div></h2>
        </div>
    )
}
export default Final;