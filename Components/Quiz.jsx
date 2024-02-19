import React from 'react'
import { useNavigate } from 'react-router-dom'
import { decode } from 'html-entities'
import { nanoid } from 'nanoid'
import { Hourglass } from 'react-loader-spinner' 

export default function Quiz() {
    
    const [currentData, setCurrentData] = React.useState([])
    const [userAnswers, setUserAnswers] = React.useState([])
    const [completed, setCompleted] = React.useState(false)
    const [loading, setLoading] = React.useState(false)
    
    const navigate = useNavigate()
    
    React.useEffect(() => {
        setLoading(true)
        fetch('https://opentdb.com/api.php?amount=5')
            .then(res => res.json())
            .then(data => {
							  const questionArray = data.results.map(element => {
									let incorrectAnswers = []
									element.incorrect_answers.map(answer => {
										incorrectAnswers.push(decode(answer))
									})
									return {
											question: decode(element.question.toString()),
											correct_answer: decode(element.correct_answer.toString()),
											incorrect_answers: incorrectAnswers,
											answers: (shuffle([decode(element.correct_answer)].concat((incorrectAnswers)))),
											id: nanoid()
									}                       
							})
							setCurrentData(questionArray)
              setLoading(false) 
            })
            .catch(err => console.log(err))
    }, [])
    
    const shuffle = array => {
        for (let i = array.length - 1; i > 0; i--) { 
            const j = Math.floor(Math.random() * (i + 1)); 
            [array[i], array[j]] = [array[j], array[i]]; 
        } 
        return array
    }
    
    const handleChange = (answer, questionId) => {
        console.log(answer, questionId)
        const userAnswer = [...userAnswers]
        const isCorrect = answer === currentData[questionId].correct_answer
        userAnswer[questionId] = {
            question: currentData[questionId].question,
            isCorrect,
            answer: answer,
            correctAnswer: currentData[questionId].correct_answer
        }
        setUserAnswers(userAnswer)
    }
    
    const calcCorrectAnswers = () => {
        return userAnswers.filter(el => el.isCorrect).length    
    }
    
    const checkAnswers = () => {
        setCompleted(prevCompleted => !prevCompleted)
        calcCorrectAnswers()
    }
    
    const playAgain = () => {
        navigate('/')
    }
    
    return (
        <div className='quiz'>
            <div className='hourglass'>
                {loading && <Hourglass />}
            </div>
            {currentData ? currentData.map((question, questionIndex) => (
                <div key={questionIndex} className='question-container'>
                    <p className='question'>{question.question}</p>
                    <form className='answer-container'>
                        {question.answers.map(answer => (
                            <div>
                                <input 
                                    className='answer-btn'
                                    type='radio'
                                    name='answer'
                                    question={question.question}
                                    value={answer}
                                    id={answer}
                                    onChange={() => handleChange(answer, questionIndex)}
                                />
                                <label 
                                    className={`answer-label ${
                                        completed && userAnswers[questionIndex].correctAnswer === answer 
                                        ? `correct` 
                                        : ``}`} 
                                    htmlFor={answer}>{answer}
                                </label>
                            </div>    
                        ))}
                    </form>
                </div>
            )) : <div>Loading...</div>}
            <div className='final-section'>
                {
                    completed && 
                    <div className='final-score'>You scored {calcCorrectAnswers()}/5 correct answers</div>
                }
                {
                    !completed && !loading ? 
                    <button 
                        className='btn'
                        onClick={checkAnswers}
                        >Check Answers
                    </button> 
                    : ''
                }
                {
                    completed && 
                    <button
                        className='btn'
                        onClick={playAgain}
                        >Play again!
                    </button>
                }
            </div>   
        </div>
    )
  
}

