import { useState } from 'react';
import './index.css';
import Form from './Components/Form';

function App() {
  const [count, setCount] = useState(0)


  return (
    <>
  <Form/>
    </>
  )
}

export default App
