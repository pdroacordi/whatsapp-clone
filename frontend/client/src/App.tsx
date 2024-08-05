import { Route, Routes } from 'react-router-dom';
import HomePage from './Components/HomePage/HomePage';
import SignIn from './Components/Registration/SignIn';
import SignUp from './Components/Registration/SignUp';

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<HomePage/>}></Route>
        <Route path='/signin' element={<SignIn/>}></Route>
        <Route path='/signup' element={<SignUp/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
