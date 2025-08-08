import React, { useEffect, useState } from 'react'
import API from '../api'
import QuestionCard from '../components/QuestionCard'

export default function Home(){
  const [questions, setQuestions] = useState([])
  const [q, setQ] = useState('')

  useEffect(()=>{ fetchQuestions(); }, [])

  async function fetchQuestions(){
    const res = await API.get('/questions');
    setQuestions(res.data);
  }

  async function handleSearch(e){
    e.preventDefault();
    const res = await API.get('/questions', { params: { q } });
    setQuestions(res.data);
  }

  return (
    <div>
      <form onSubmit={handleSearch} className="mb-4">
        <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search questions..." />
        <button type="submit">Search</button>
      </form>
      {questions.map(q => <QuestionCard key={q._id} q={q} />)}
    </div>
  )
}