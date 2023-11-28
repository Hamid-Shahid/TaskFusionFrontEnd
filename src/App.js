import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Users from "./Users/Users";
import CreateTask from "./Tasks/CreateTask";
import UpdateTask from "./Tasks/UpdateTask";
import Tasks from "./Tasks/Tasks";
import Register from "./Users/Register";
import Login from "./Users/Login";
import UpdateUser from "./Users/Update";
import Sprints from "./Sprints/Sprints";
import CreateSprint from "./Sprints/CreateSprint";
import CreateTeam from "./Teams/CreateTeam";
import Teams from "./Teams/Teams";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>}></Route>
        <Route path="/updateUser/:id" element={<UpdateUser/>}></Route>
        <Route path="/register" element={<Register/>}></Route>
        <Route path="/users" element={<Users/>}></Route>
        <Route path="/tasks" element={<Tasks/>}></Route>
        <Route path="/createTask" element={<CreateTask/>}></Route>
        <Route path="/updateTasks/:id" element={<UpdateTask/>}></Route>
        {/* <Route path="/sprints" element={<Sprints />}></Route> */}
        <Route path="/createSprint" element={<CreateSprint />}></Route>
        <Route path="/sprints/:sprintId/tasks/:taskId" element={<Sprints />}></Route>
        <Route path="/createTeam" element={<CreateTeam />}></Route>
        <Route path="/teams" element={<Teams />}></Route>
        <Route path="/sprints/:id" element={<Sprints />}></Route>


      </Routes>

      </BrowserRouter>
    </div>
  );
}

export default App;
