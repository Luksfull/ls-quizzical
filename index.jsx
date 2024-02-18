import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import StartPage from './Components/StartPage'
import Quiz from './Components/Quiz'
import Test from './Components/Test'

 
function App() {
    return (
        // <Test />
        <Router>
            <Routes>
                <Route path='/' element={<StartPage />} />
                <Route path='/quiz' element={<Quiz />} />
            </Routes>
        </Router>
    )
}

ReactDOM.render(<App />, document.getElementById("root"))