import { Switch, Route } from 'react-router-dom'
import Login from '../Login/Login.jsx'
import SignUp from '../SignUp/SignUp.jsx'
import Registration from '../App/App.jsx'

const Main = () => (
    <main>
        <Switch>
            <Route exact path='/login' component={Login} />
            <Route exact path='/signup' component={SignUp} />
            <Route exact path='/registration' component={Registration} />
        </Switch>
    </main>
)