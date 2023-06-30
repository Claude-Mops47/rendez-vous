import {Routes, Route, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import LoginPage from './LoginPage'
// import {UserAdd} from './UserAdd'

export const AuthLayout = () =>{
    const auth = useSelector(state => state.auth.value);

    if(auth){
        return <Navigate to='/'/>
    }
    return (
        <div className='col-sm-8 offset-sm-2 mt-5'>
            <Routes>
                <Route path='/login' element={<LoginPage/>}/>
                {/* <Route path='add-user' element={<UserAdd/>}/> */}
            </Routes>
        </div>
    )
}