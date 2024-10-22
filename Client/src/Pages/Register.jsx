import { useContext } from "react";
import {Alert, Button, Form, Row, Col, Stack} from "react-bootstrap"
import { AuthContext } from "../Context/AuthContext";


const Register = () =>{
         const {registerInfo, updateRegisterInfo, registerUser, registerError, isRegisterLoading} = useContext(AuthContext);
          return <>
          <Form onSubmit={registerUser}>
               <Row style={{
                  height: "100vh",
                  justifyContent: "center",
                  paddingTop: "10%"
               }
               }>
                    <Col xs={6}>
                         <Stack gap={3}>
                              <h3>Register To Chat</h3>

                               <Form.Control 
                               type="text" 
                               placeholder="Enter your Name"
                               onChange={(e)=> 
                                   updateRegisterInfo({...registerInfo, name: e.target.value})
                              }
                               />
                               <Form.Control 
                               type="email" 
                               placeholder="Enter your Email"
                               onChange={(e)=> 
                                   updateRegisterInfo({...registerInfo, email: e.target.value})
                              }
                               />
                               <Form.Control 
                               type="Password" 
                               placeholder="Enter your Password"
                               onChange={(e)=> 
                                   updateRegisterInfo({...registerInfo, password: e.target.value})
                              }
                               />
                               <Button variant="primary" type="submit">
                                        {isRegisterLoading ? 'Creating your Account...': "Register"}
                               </Button>
                                   {
                                        registerError?.error && (<Alert variant="danger">
                                        <p>{registerError?.message}</p>
                               </Alert>) 
                                   }
                                    <h5>Already a User?  <a style={{textDecoration: "none", color: "sky"}} href="https://chat-in-my-way-repo.vercel.app/login"><b>Log In</b></a></h5>
                         </Stack>
                    </Col>
               </Row>
          </Form>
          </>;
};

export default Register;