import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Products from './screens/Products';
import { useState } from 'react';

function App() {
  const [search, setSearch] = useState('');
  
  return (
    <div>
      <Header setSearch={setSearch} />
      <Products search={search} />
      <Footer />
    </div>
  );
}

export default App;
