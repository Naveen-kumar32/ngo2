import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './styles.css';
import './theme-overrides.css';

class ErrorBoundary extends React.Component {
  constructor(props) { super(props); this.state = { error: null }; }
  static getDerivedStateFromError(error) { return { error }; }
  render() {
    if (this.state.error) {
      return <div style={{minHeight:'100vh',display:'grid',placeItems:'center',padding:40,fontFamily:'system-ui',background:'#faf8f1',color:'#102b34'}}>
        <div style={{maxWidth:760,width:'100%',background:'#fff',padding:32,borderRadius:20,boxShadow:'0 20px 60px rgba(0,0,0,.08)'}}>
          <div style={{fontSize:12,fontWeight:800,color:'#075c45',letterSpacing:'.12em',textTransform:'uppercase'}}>Template runtime error</div>
          <h1 style={{margin:'10px 0'}}>The page could not render.</h1>
          <p style={{color:'#65736f'}}>Open DevTools → Console and copy the error below if it appears.</p>
          <pre style={{whiteSpace:'pre-wrap',background:'#f4f5f1',padding:16,borderRadius:12,overflow:'auto'}}>{this.state.error?.stack || String(this.state.error)}</pre>
        </div>
      </div>;
    }
    return this.props.children;
  }
}

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ErrorBoundary>
  </React.StrictMode>
);
