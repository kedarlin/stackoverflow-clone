import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';
import Askquestion from './pages/Askquestion/Askquestion';
import Question from './pages/Question/Question';

function App() {
  return (
    <Router>
        <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
          <Route path='/home' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/askquestion' element={<Askquestion />} />
          <Route path='/question/:id' element={<Question />} />
        </Routes>
    </Router>
      
  );
}

export default App;
