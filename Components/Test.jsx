import React from 'react'

import { decode, decodeEntity } from 'html-entities'

export default function Test() {
    
    // function shuffle(arr) {
    //     for (let i = arr.lenth - 1; i > 0; i--)  {
    //         const j = Math.floor(Math.random() * (i + 1))
    //         [arr[i], arr[j]] = [arr[j], arr[i]]
    //     }        
    //     return arr
    // }
    
    const shuffle = array => {
        for (let i = array.length - 1; i > 0; i--) { 
            const j = Math.floor(Math.random() * (i + 1)); 
            [array[i], array[j]] = [array[j], array[i]]; 
        } 
        return array
    }
    
    const myArray = [1, 2, 3, 4, 6, 5, 7, 8]
    const shuffled = shuffle(myArray)
    
    return <h2>{shuffled}</h2>
}