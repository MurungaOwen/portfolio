import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SidebarProvider } from './components/ui/Sidebar';
import Layout from './components/layout';
import About from './pages/About';
import Home from './pages/Home';

function App() {
  return (
    <SidebarProvider>
      <Router basename="/portfolio">
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            {/* <Route path="projects" element={<Projects />} />
            <Route path="skills" element={<Skills />} />
            <Route path="experience" element={<Experience />} />
            <Route path="contact" element={<Contact />} /> */}
          </Route>
        </Routes>
      </Router>
    </SidebarProvider>
  );
}

export default App;
