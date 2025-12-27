import { Routes, Route } from 'react-router-dom'
import Home from './component/home'
import Contact from './component/pages/Contact'
import Photography from './component/pages/Photography'
import Archives from './component/pages/Archives'
import ProjetAtItif from './component/pages/ProjetAt-Itif'
import ProjetEcocycle from './component/pages/ProjetEcocycle'
import YoutubeLike from './component/pages/YoutubeLike'
import PortfolioProject from './component/pages/PortfolioProject'
import { LanguageProvider } from './context/LanguageContext'

function App() {
  return (
    <LanguageProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/photography" element={<Photography />} />
        <Route path="/archives" element={<Archives />} />
        <Route path="/project/at-itif" element={<ProjetAtItif />} />
        <Route path="/project/ecocycle" element={<ProjetEcocycle />} />
        <Route path="/project/youtube-design" element={<YoutubeLike />} />
        <Route path="/project/portfolio" element={<PortfolioProject />} />
      </Routes>
    </LanguageProvider>
  )
}

export default App
