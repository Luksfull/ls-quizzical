import React from 'react'
import { Link } from 'react-router-dom'

export default function StartPage() {
    return (
        <div className='start-page'>
            <div className='start-container'>
                <h2 className='start-quizzical'>Quizzical</h2>
                <h4 className='start-bio'>How many questions can you answer correctly?</h4>
                <Link to='/quiz' className='btn start-button'>Start quiz</Link>      
            </div>
        </div>
    )
}