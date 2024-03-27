import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../../components/Header/Header';
import './Question.css';
import Sidebar from '../../components/Sidebar/Sidebar';
import { GoTriangleDown, GoTriangleUp } from 'react-icons/go';

const Question = () => {
  const { id } = useParams();
  const [question, setQuestion] = useState(null);
  const handleUpVote = async () => {
    const userId = localStorage.getItem('userId');
    try {
      const voteRes =  await sendVote(id, userId, 'up');
    } catch (error) {
      console.error('Failed to upvote:', error);
    }
  };

  const handleDownVote = async () => {
    const userId = localStorage.getItem('userId');
    try {
      const voteRes = await sendVote(id, userId, 'down');

    } catch (error) {
      console.error('Failed to downvote:', error);
    }
  };

  const sendVote = async (questionId, userId, action) => {
    try {
      await fetch(`http://localhost:3005/api/question/votequestion`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ questionId, userId, action })
      });
    } catch (error) {
      throw new Error('Failed to send vote');
    }
  };

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
              <h2 className='question-title'>{question.title}</h2>
              <div className='question-main'>
                <div className='question-main-vote'>
                  <GoTriangleUp className='question-vote' onClick={handleUpVote}/>
                  <p className='question-votes'>{question.votes}</p>
                  <GoTriangleDown className='question-vote' onClick={handleDownVote}/>
                </div>
                <div className='question-main-content'>
                  <p className='question-main-content'>{question.problemDetails}</p>
                  <p className='question-main-content'>{question.triedDetails}</p>
                  <p className='question-main-tag'>{question.tags}</p>
                </div>
              </div>
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