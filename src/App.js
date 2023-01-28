
import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About'
import {
  BrowserRouter, Routes, Route
} from "react-router-dom";
import NoteState from './context/notes/NoteState';
import Signup from './components/Signup';
import Signin from './components/Signin';
// import Alert from './components/Alert';

function App() {
  return (
   <>
      <NoteState>
     <BrowserRouter >
       <Navbar/>
     
      <Routes>
      <Route exact path="/" element={<Home/>}/>
      <Route exact path="/about" element={<About/>}/>
      <Route exact path="/signin" element={<Signin/>}/>
      <Route exact path="/signup" element={<Signup/>}/>
      </Routes>

    </BrowserRouter>
    </NoteState>
  </>
   
  );
}

export default App;
