import ContextPage from './pages/ContextPage/ContextPage';
import styles from './App.module.scss';
import HocPage from './pages/HocPage/HocPage';

function App() {
  return (
    <div className={styles.app}>
      <ContextPage />

      <div>
        <HocPage />
      </div>
    </div>
  );
}

export default App;
