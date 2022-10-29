import {BrowserRouter, Route, Routes, useLocation} from 'react-router-dom'
import { useEffect } from 'react';
import { connect } from 'react-redux';
import MyLayout from './Components/Layout/Layout';
import Routing from "./Components/Layout/Routing";
import {LoginUser , LogOutUser , getUser, getCompany} from './redux/actions'
import Login from './Components/Layout/Login';
import Loader from './Components/Elements/Loader';
import Register from './Components/Layout/Register';

function App(props) {
  const {LogOutUser , LoginUser , loggedIn , user , loading , getUser, registered, getCompany} = props
  let token = localStorage.getItem('access_token') || sessionStorage.getItem('access_token') 
          
  useEffect(()=>{

    if(token){
      getUser(token)
    }
    else{
      LogOutUser()
    }
  } , [])


  return (
   <>
    {loading ?
      <Loader/> : null
    }
     <BrowserRouter>
      <>  
        {(loggedIn || registered ) ?
            <MyLayout>
            <div className="App">
                <Routing/>
            </div>
           </MyLayout> :
            <Routes>
              <Route path='/' element={<Login/>}/>
              <Route path='/register' element={<Register/>}/>
            </Routes>
        } 
        
      </>
    </BrowserRouter>
   </>

  );
}



const mapStateToProps = ({user , loading}) => {
  return {
    user: user.data,
    loggedIn : user.isLoggedIn,
    registered: user.isRegistered,
    loading
  }
}


export default connect(mapStateToProps , {LoginUser , LogOutUser , getUser, getCompany})(App)

