import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../../components/Header/Header';
import './Home.css';
import Sidebar from '../../components/Sidebar/Sidebar';

const Home = () => {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch('https://stackoverflow-clone-nine-phi.vercel.app/api/questions/getquestions');
        if (!response.ok) {
          throw new Error('Failed to fetch questions');
        }
        const data = await response.json();
        setQuestions(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchQuestions();
  }, []);

  const handleAskQuestion = () => {
    navigate('/askquestion');
  };

  return (
    <div className='home-container'>
      <Header />
      <div className='home-body-container'>
        <Sidebar />
        <div className='home-content'>
          <div className='home-header'>
            <h2 className='home-title'>Top Questions</h2>
            <div className='home-button' onClick={handleAskQuestion}>
              Ask Question
            </div>
          </div>
          {questions.map((question, index) => (
            <div key={index} className='home-questions-link'>
              <div className='home-questions'>
                <div className='home-question-activity'>
                  <div className='home-question-acti'>{question.votes.length} votes</div>
                  <div className='home-question-acti'>{question.answers ? question.answers.length : 0} answers</div>
                  <div className='home-question-acti'>{question.viewsCount} views</div>
                </div>
                <div className='home-question-content'>
                  <div className='home-question'>
                    <Link to={`/question/${question._id}`} style={{ textDecoration: 'none', cursor: 'pointer' }}>
                      {question.title}
                    </Link>
                  </div>
                  <div className='home-question-tags'>{question.tags.join(', ')}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;