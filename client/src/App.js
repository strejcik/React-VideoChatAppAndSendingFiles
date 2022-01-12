import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route} from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import Routes from './routes';
import configureStore from './store';

// import Join from './components/Join/Join';
// import Chat from './components/Chat/Chat';

const asyncCall = () => {
    return new Promise((resolve) => setTimeout(() => resolve(), 25000));
}

const App = () => {
    {/* <Router>
        <Route path="/" exact component={Join} />
        <Route path="/chat" exact component ={Chat}/>
    </Router> */}
    const [rehydrated, setRehydrated] = useState(false);
    useEffect(() => {
        // asyncCall().then(() => {
            
        // });
        const store = configureStore();
            persistStore(store, {}, () => {
                setRehydrated(true);
            });
    }, []);

    if(!rehydrated) {
        return null;
    }

    const persistor = persistStore(configureStore());

    return (
        <Provider store={configureStore()}>
            <PersistGate loading={null} persistor={persistor}>
                <Routes/>
            </PersistGate>        
        </Provider>
    );
}



export default App;