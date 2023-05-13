import React, { useState } from 'react';
import './App.css';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { Login } from './Components/Login/Login';
import { ProtectedRoutes } from './Components/ProtectedRoutes/ProtectedRoutes';
import { Admin } from './Components/Admin/Admin';
import { Errors } from './Pages/Errors/Errors';
import { AuthenticationLevels, UserContextModel } from './Models/User';
import { UserContext } from './context';

function App() {
    const [user, setUser] = useState<UserContextModel | null>(null);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            <BrowserRouter>
                <Routes>
                    <Route path='/' index element={<Login />} />
                    <Route
                        element={
                            <ProtectedRoutes
                                authLevel={AuthenticationLevels.Admin}
                            />
                        }>
                        <Route path='/admin' element={<Admin />} />
                    </Route>
                    <Route path='*' element={<Errors errorCode={404} />} />
                </Routes>
            </BrowserRouter>
        </UserContext.Provider>
    );
}

export default App;
