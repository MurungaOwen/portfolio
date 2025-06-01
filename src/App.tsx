import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SidebarProvider } from './components/ui/Sidebar';
import Layout from './components/layout';
import About from './pages/About';
import Home from './pages/Home';
import Projects from './pages/Projects';
import SkillsPage from './pages/Skills';
import Experience from './pages/Experience';
import ContactPage from './pages/Contact';

function App() {
  return (
    <SidebarProvider>
      <Router basename="/portfolio">
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="skills" element={<SkillsPage />} />
            <Route path="projects" element={<Projects />} />
            <Route path="experience" element={<Experience />} />
            <Route path="contact" element={<ContactPage/>} />
          </Route>
        </Routes>
      </Router>
    </SidebarProvider>
  );
}

export default App;
