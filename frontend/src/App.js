

import './App.css';

import MenuCarousel from './components/Carousel';
import Logo from './components/Logo'; 
import CategoryButton from './components/CategoryButton'; 
import MenuSection from './components/MenuSection'; 


function App() {
  return (
    <> 
      <Logo />
      <MenuCarousel />
      <CategoryButton/>
      <MenuSection />
    </>
  );
}

export default App;
