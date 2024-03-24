import React, { useState } from 'react';
import Header from '../../components/Header/Header';
import './Askquestion.css';
import { useNavigate } from 'react-router-dom';


const Askquestion = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: '',
        problemDetails: '',
        triedDetails: '',
        tags: ''
    });
    const [error, setError] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async () => {
        const userId = localStorage.getItem('userId');

        if (!userId) {
            setError('User not authenticated');
            return;
        }

        if (!formData.title || !formData.problemDetails || !formData.triedDetails || !formData.tags) {
            setError('All fields are required');
            return;
        }

        if (formData.title.length < 15) {
            setError('Title must be at least 15 characters long');
            return;
        }

        const tagsArray = formData.tags.split(' ');
        if (tagsArray.length > 5 || tagsArray.length === 0) {
            setError('Please enter 1 to 5 tags separated by spaces');
            return;
        }
        formData.userId = userId;
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        };

        const requestOptions = {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(formData),
        };
        console.log(requestOptions);
        try {
            const response = await fetch('http://localhost:3005/api/questions/create', requestOptions);
            if (!response.ok) {
                throw new Error('Failed to create question');
            }
            navigate('/home');
        } catch (error) {
            console.error('Error:', error);
            setError('Failed to create question');
        }
    };

    return (
        <div className='askquestion-container'>
            <Header />
            <div className='askquestion-body-container'>
                <div className='askquestion-content'>
                    <div className='askquestion-head'>Ask a Public Question</div>
                    <div className='askquestion-title'>
                        <h4 className='askquestion-title-head'>Title</h4>
                        <p className='askquestion-title-desc'>
                            Be specific and imagine you&apos;re asking a question to another person.
                        </p>
                        <input
                            className='askquestion-title-input'
                            name='title'
                            value={formData.title}
                            onChange={handleInputChange}
                            placeholder='e.g. Is there an R function for finding the index of an element in a vector?'
                            required
                        />
                    </div>
                    <div className='askquestion-title'>
                        <h4 className='askquestion-title-head'>What are the details of your problem?</h4>
                        <p className='askquestion-title-desc'>
                            Introduce the problem and expand on what you put in the title. Minimum 20 characters.
                        </p>
                        <textarea
                            className='askquestion-title-inputarea'
                            name='problemDetails'
                            value={formData.problemDetails}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className='askquestion-title'>
                        <h4 className='askquestion-title-head'>What did you try and what were you expecting?</h4>
                        <p className='askquestion-title-desc'>
                            Describe what you tried, what you expected to happen, and what actually resulted. Minimum 20 characters.
                        </p>
                        <textarea
                            className='askquestion-title-inputarea'
                            name='triedDetails'
                            value={formData.triedDetails}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className='askquestion-title'>
                        <h4 className='askquestion-title-head'>Tags</h4>
                        <p className='askquestion-title-desc'>
                            Add up to 5 tags to describe what your question is about. Start typing to see suggestions.
                        </p>
                        <input
                            className='askquestion-title-input'
                            name='tags'
                            value={formData.tags}
                            onChange={handleInputChange}
                            placeholder='e.g. laravel c php'
                            required
                        />
                    </div>
                    <div className='askquestion-submit' onClick={handleSubmit}>
                        Post Your Question
                    </div>
                    {
                        error
                        &&
                        <div className='askquestion-error'>
                            {error}
                        </div>
                    }
                </div>
            </div>
        </div>
    );
};

export default Askquestion;