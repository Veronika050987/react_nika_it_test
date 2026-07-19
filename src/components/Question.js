import './Question.css';

import ProgressBar from './ProgressBar';
import { FaCheck, FaTimes } from 'react-icons/fa';//npm install react-icons

function Question({question, onAnswer, step, totalQuestions, selectedVariant, isAnswered})
{
    const percentage = Math.round(step/totalQuestions*100);
    const getVariantStyle = (index) => {
        if (!isAnswered) {
            // Если ответ еще не дан, возвращаем обычный стиль
            return {};
        }

        // Если ответ уже дан:
        if (index === selectedVariant){
            if (index === question.correct) {
                // Правильный ответ (зеленый фон, галочка)
                return { backgroundColor: '#d4edda', color: '#155724', cursor: 'default' };
            } else {
                // Неправильный выбранный ответ (красный фон, крестик)
                return { backgroundColor: '#f8d7da', color: '#721c24', cursor: 'default' };
            }    
        }
        
        // Остальные варианты (светло-серый или стандартный, чтобы показать, что они не были выбраны)
        return { cursor: 'default', opacity: 0.7 };
    };

    const handleVariantClick = (index) => {
        if (isAnswered) return;

        const isCorrect = index === question.correct;
        
        // Передаем индекс и результат проверки родителю
        onAnswer(index, isCorrect); 
    };

    return(
        <div className='question'>
            <ProgressBar percentage={percentage} />
            <h3>{question.title}</h3>
            <ul>
                {
                    question.variants.map
                    (
                        (text, index) =>
                            <li 
                            key={index} 
                            onClick={()=>handleVariantClick(index)}
                            style={getVariantStyle(index)}
                            >
                                {text}
                                {isAnswered && (
                                    index === selectedVariant ? (
                                        index === question.correct ? 
                                            <FaCheck style={{ marginLeft: '30px', color: 'green' }} /> : 
                                            <FaTimes style={{ marginLeft: '30px', color: 'red' }} />
                                    ) : null
                                )}
                            </li>
                    )
                }
            </ul>
        </div>
    )
}
export default Question;