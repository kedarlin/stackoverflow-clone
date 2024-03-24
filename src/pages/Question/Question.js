import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../../components/Header/Header';
import './Question.css';
import Sidebar from '../../components/Sidebar/Sidebar';

const Question = () => {
  const { id } = useParams();
  const [question, setQuestion] = useState(null);

  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const response = await fetch(`http://localhost:3005/api/questions/getquestion/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch question');
        }
        const data = await response.json();
        setQuestion(data);
        console.log(question);
      } catch (error) {
        console.error(error);
      }
    };
    const updateViewCount = async () => {
      const questionId = id;
      const userId = localStorage.getItem('userId');
      try {
        await fetch(`http://localhost:3005/api/questions/viewquestion/${questionId}`, {
          method: 'POST',
          headers: {
            'authorization': `Bearer ${localStorage.getItem('token')}`
          },
          body: JSON.stringify({ userId })
        });
      } catch (error) {
        console.error('Failed to update view count:', error);
      }
    };
    updateViewCount();
    fetchQuestion();
  }, [id]);



  return (
    <div className='question-container'>
      <Header />
      <div className='question-body-container'>
        <Sidebar />
        <div className='question-content'>
          {question ? (
            <>
              <h2>{question.title}</h2>
              <p>{question.problemDetails}</p>
              <p>{question.triedDetails}</p>
              <p>{question.tags}</p>
              <p>Views {question.viewsCount}</p>
              <p>Votes {question.votes}</p>
            </>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Question;