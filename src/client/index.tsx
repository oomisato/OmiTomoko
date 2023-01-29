
import { createRoot } from 'react-dom/client'
import React, { Suspense } from 'react'
import  './styles.css'
import { BrowserRouter as Router} from 'react-router-dom';
import App from './App'






const container = document.getElementById('root')as HTMLElement;
const root = createRoot(container);
root.render(
    // インジケーターなし

    <Router>
        <React.Fragment>

                <App />

        </React.Fragment>
            </Router>

);



