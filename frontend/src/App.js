import { Routes, Route } from 'react-router';
import { Home } from './pages/Home';
import { Signup } from './pages/auth/Signup';
import { Signin } from './pages/auth/Signin';
import { Dashboard } from './pages/Dashboard';
import { ProblemPage } from './pages/Problem';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './App.css';

function App() {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path='/signup' element={<Signup />} />
      <Route path='/signin' element={<Signin />} />
      <Route path='/dashboard' element={<Dashboard />} />
      <Route path='/problem' element={<ProblemPage />} />
    </Routes>
  );
}

export default App;
