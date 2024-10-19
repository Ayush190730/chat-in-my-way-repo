import { Container, Nav, Navbar, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext} from "../Context/AuthContext";
import Notifications from "./chat/Notifications";
import app_logo from '../assets/app_logo.png';
import logoutimg from '../assets/logoutimg.png';

const NavBar = () => {
          const {user, logoutUser} = useContext(AuthContext);
          return (<Navbar bg="dark" className="mb-4" style={{ height: "3.75 rem" }}>
                    <Container>
                              <h2>
                                        <Link to="/" className="link-light text-decoration-none" ><img src={app_logo} height={73} width={73}/></Link>
                                        <a href="" style={{color : "white", margin: "17px 11px 0px 27px", fontFamily: "sans-serif", paddingBottom: "20px", fontSize: "20px"}} className="text-decoration-none">Home</a>
                              </h2>
                              {user && (<span style={{ marginRight: "80px" ,fontWeight: "bold", color: "#00ffad", fontFamily: "Nunito", fontSize: "25px"}} >{user?.name}</span>)}
                              <Nav>
                                      
                                        <Stack direction="horizontal" gap={4}>
                                        {
                                                  user && (<>
                                                  <Notifications/>
                                                       <Link onClick={()=> logoutUser()} to="/login" className="link-light text-decoration-none">Logout<img style={{marginLeft:"15px", color: "blue"}} src={logoutimg} height={20} width={20}/></Link>  
                                                  </>
                                                  )
                                        }
                                        {!user && (<>
                                        <Link to="/login" className="link-light text-decoration-none">Log In</Link>    
                                        <Link to="/register" className="link-light text-decoration-none">Sign Up </Link>
                                        </>)}
                                            
                                        </Stack>
                              </Nav>
                    </Container> 
          </Navbar>);
}

export default NavBar;