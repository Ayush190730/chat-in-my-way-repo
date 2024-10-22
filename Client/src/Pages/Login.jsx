import { useContext } from "react";
import {Alert, Button, Form, Row, Col, Stack} from "react-bootstrap"
import { AuthContext } from "../Context/AuthContext";
const Login = () =>{

     const {loginUser,
          loginError,
          loginInfo,
          updateLoginInfo,
          isLoginLoading} = useContext(AuthContext);
          return <>
          <Form onSubmit={loginUser}>
               <Row style={{
                  height: "100vh",
                  justifyContent: "center",
                  paddingTop: "10%"
               }
               }>
                    <Col xs={6}>
                         <Stack gap={3}>
                              <h3>Log In To Chat</h3>

                               <Form.Control type="email" 
                               placeholder="Enter your Email"
                               onChange={(e)=> 
                                   updateLoginInfo({...loginInfo, email: e.target.value})
                              }/>
                               <Form.Control type="Password" placeholder="Enter your Password"
                               onChange={(e)=> 
                                   updateLoginInfo({...loginInfo, password: e.target.value})
                              }/>
                               <Button variant="primary" type="submit">
                                        {isLoginLoading? "Getting you in...": "Login"}
                               </Button>

                               {
                                   loginError?.error && (<Alert variant="danger">
                                        <p>{loginError?.message}</p>
                               </Alert>)
                               }
                                <h5>New User?  <a style={{textDecoration: "none", color: "sky"}} href="https://chat-in-my-way-repo.vercel.app/register"><b>Sign Up</b></a></h5>
                                
                               
                         </Stack>
                    </Col>
               </Row>
          </Form>
          
          </>;
};

export default Login;