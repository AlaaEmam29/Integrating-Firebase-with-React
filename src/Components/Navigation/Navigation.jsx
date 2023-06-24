import NavigationAuth from './NavigationAuth';
import NavigationNonAuth from './NavigationNonAuth';
import { AuthContext } from '../../Context/Auth/context';
const Navigation = () => (
  <div>
    <ul>
      <AuthContext.Consumer>
      {authUser =>
        authUser ?(
         <NavigationAuth/>
                    ) : (
          <NavigationNonAuth/>
            
        )
      }
    </AuthContext.Consumer>
    </ul>
  </div>
);

export default Navigation;
