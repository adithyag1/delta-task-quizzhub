import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext.js';

function CreatedQuizzes(props) {
  const [quizList, setQuizList] = useState([]);
  const [quizResultList, setQuizResultList] = useState([]);
  const {activeUsername, activeUserId}= useContext(AuthContext);
  const isActiveUser= activeUsername===props.username;
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
    fetchTakenData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.post("http://localhost:3001/quizz/getquizlist", {
        username: props.username,
      });

      const { quiz, message, creatorName } = response.data;
      if (quiz && quiz.length > 0) {
        //console.log('Creator name: ', creatorName);
        setQuizList(quiz);
      } else {
        console.log("message: ", message);
      }
    } catch (error) {
      console.log("error: ", error);
    }
  };

  const fetchTakenData= async()=>{
    try {
      const response = await axios.post("http://localhost:3001/quizusers/gettakenquizlist", {
        userId: activeUserId,
      });

      const { quizResult, message } = response.data;
      if (quizResult && quizResult.length > 0) {
        setQuizResultList(quizResult);
      } else {
        console.log("message: ", message);
      }
    } catch (error) {
      console.log("error: ", error);
    }
  }

  const handleQuizClick = (quizId) => {
    const isQuizTaken = quizResultList.some((quizResult) => quizResult.quizId === quizId);
  
    if (isQuizTaken) {
      alert("Quiz already taken!");
    } else {
      if (!isActiveUser) {
        navigate(`/takequiz/${quizId}`);
      } else {
        navigate(`/viewquiz/${quizId}`);
      }
    }
  };
  

  return (
    <div className='created-quizzes-container'>
      {quizList.length > 0 ? (
        <ul>
          {quizList.map((quiz) => (
            <div
              className='quiz-list-box'
              key={quiz._id}
              onClick={() => handleQuizClick(quiz._id)}
            >
              <div className='quiz-list-box-header'>
                <h3>{quiz.quizName}</h3>
                <p>Creator: {props.username}</p>
              </div>
              <p>No. of Questions: {quiz.noOfQuestions}</p>
            </div>
          ))}
        </ul>
      ) : (
        <p>No quizzes available.</p>
      )}
    </div>
  );
}

export default CreatedQuizzes;
