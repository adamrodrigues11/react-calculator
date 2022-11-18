import '../styles/App.css';
import Header from './Header';
import Display from './Display';
import ButtonArea from './ButtonArea';
import Button from './Button';
import Footer from './Footer';

function App() {
  return (
    <div className="App">
      <Header title={"Calculator App"}/>
      <Display />
      <ButtonArea>
        <Button />
      </ButtonArea>
      <Footer />
    </div>
  );
}

export default App;
