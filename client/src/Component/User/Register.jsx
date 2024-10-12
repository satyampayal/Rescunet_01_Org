import { useState } from "react"
import Input from "../../Common/Input"
import Button from "../../Common/Button"
import axios from 'axios'
function Register() {
    // const [firstName,setFirstName]=useState('')
    // const [lastName,setLastName]=useState('')
    const [signupDetails,setSignUpDetails]=useState({
        firstName:'',
        lastName:'',
        email:'',
        password:'',
        // avatar:''
    })
    const onChange=(e)=>{
        const {name,value}=e.target
        // setFirstName(e.target.value)
        setSignUpDetails({
            ...signupDetails,
            [name]:value
        })
        console.log(value)
    }

    const onSubmit= async ( )=>{
        console.log(signupDetails)
       const response =    await   axios.post('http://localhost:3000/register ',signupDetails)
       alert(await JSON.stringify(response.data))

    }
  return (
    <div style={
        {display:'flex',
        flexDirection:'column',
        placeItems:'center',
        justifyItems:'center',
        gap:20
        }
    }>
        {/* <input type="text"  placeholder='enter your First Name'  onChange={setFirstName()}  /> */}
        <Input type='text' placeholder='enter your First Name' name='firstName' value={signupDetails.firstName} onChange={(e)=>onChange(e)} />
        <Input type='text' placeholder='enter your Last Name'  name='lastName'   value={signupDetails.lastName} onChange={(e)=>onChange(e)}/>
        <Input type='email' placeholder='enter your Email '  name='email'   value={signupDetails.email} onChange={(e)=>onChange(e)}/>
        <Input type='password' placeholder='enter your password'  name='password'   value={signupDetails.password} onChange={(e)=>onChange(e)}/>
       <Button type='submit' value="Register" onSubmit={onSubmit} />
    </div>
  )
}

export default Register