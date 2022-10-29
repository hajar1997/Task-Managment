import {Route , Routes} from 'react-router-dom'
import Tasks from '../Pages/Tasks';
import Users from '../Pages/Users';
import UserSettings from '../Pages/UserSettings';
import Register from './Register';

const Routing = (props) => {
    return (
        <>
            <Routes>
                <Route path='/' element={<Tasks/>} />
                <Route path='/tasks' element={<Tasks/>} />
                <Route path='/users' element={<Users/>} />
                <Route path='/user-settings' element={<UserSettings/>} />
                <Route path='*' element={<div>404 not found</div>} />
            </Routes>
        </>
    );
}
  
export default Routing;
