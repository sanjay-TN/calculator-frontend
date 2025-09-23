import { useState } from 'react';
import { API } from './api'; // ✅ correct import

function App() {
  const [num1, setNum1] = useState('');
  const [num2, setNum2] = useState('');
  const [operator, setOperator] = useState('+');
  const [result, setResult] = useState('');

  const handleCalculate = async () => {
    try {
      const response = await fetch(`${API}/calculate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          num1: Number(num1),
          num2: Number(num2),
          operator,
        }),
      });

      if (!response.ok) throw new Error('Failed to calculate');

      const data = await response.json();
      setResult(data.result);
    } catch (error) {
      console.error(error);
      setResult('Error');
    }
  };

  return (
    <div className="card">
      <h1>Calculator</h1>
      <input
        type="number"
        value={num1}
        onChange={(e) => setNum1(e.target.value)}
        placeholder="First number"
      />
      <select value={operator} onChange={(e) => setOperator(e.target.value)}>
        <option value="+">+</option>
        <option value="-">-</option>
        <option value="*">×</option>
        <option value="/">÷</option>
      </select>
      <input
        type="number"
        value={num2}
        onChange={(e) => setNum2(e.target.value)}
        placeholder="Second number"
      />
      <button onClick={handleCalculate}>Calculate</button>
      <h2>Result: {result}</h2>
    </div>
  );
}

export default App;
