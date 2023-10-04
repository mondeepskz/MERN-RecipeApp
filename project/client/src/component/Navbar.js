import { Link} from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { useNavigate } from "react-router-dom";

export const Navbar = () => {
    
    const[cookies, setCookies] = useCookies(["access_token"]);
    const navigate = useNavigate();
    
    const logout = () => {
        setCookies("access_token", "");
        window.localStorage.removeItem("userId");
        navigate("/auth");
    }
    return (
    <div className="navbar">
        <Link to="/">Home</Link>
        
        
        {!cookies.access_token 
        ? (<Link to="/auth">Login/Register</Link> )
        : (
            <>
            <Link to="/create-recipes">Create Recipes</Link>
        <Link to="/saved-recipes">Saved Recipes</Link>
         (<button onClick={logout}>Logout</button>)  
         </>
        )
        }  
    </div>
    );
}