import './App.css';
import { TMTVScreen } from './components/TMTVScreen/TMTVScreen';
import Background from './components/Background/Background';
import { TimerProvider } from './context/TimerContext';

function App() {
  return (
    <TimerProvider>
      <div className="App">
        <Background />
        <TMTVScreen />
      </div>
    </TimerProvider>
  );
}

export default App;
