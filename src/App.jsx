import Container from "./container/Container";
import { LocalProvider } from './context/LocalContext';
import './assets/style.css'
import { AdminProvider } from "./context/AdminContext";
import { BlogProvider } from "./context/BlogContext";
import { HelmetProvider } from "react-helmet-async";
import { MessageProvider } from "./context/MessageContext";

function App() {
  return (
    <div className="App">
      <LocalProvider >
        
        <AdminProvider >
        <MessageProvider >
          <BlogProvider >
        <HelmetProvider>
      <Container />
      </HelmetProvider>
      </BlogProvider>
      </MessageProvider>
      </AdminProvider>
      </LocalProvider>
    </div>
  );
}

export default App;
