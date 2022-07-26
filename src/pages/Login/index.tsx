import React, { useState, useContext } from 'react'
import service from '../../service';
import { Form, Button, Message } from 'rsuite';
// import { useNavigate } from 'react-router-dom';
import { DemoContext } from '../../context/index.tsx';
import './style.css';

export default function Login() {
  const [usename, setUsename] = useState('');
  const [password, setPassword] = useState('');
  const { changeStatus, status } = useContext(DemoContext);

  const usenameChange = (value) => {
    setUsename(value);
  }
  const passwordChange = (value) => {
    setPassword(value);
  }

  const handleSubmit = async () => {
    console.log(usename, password);
    const res = await service.instance.post(`/login/cellphone?phone=${usename}&password=${password}`)
    console.log(res);
    // 路由跳转
    changeStatus(res.data);
  }

  // 游客登录
  const handleGuest = async () => {
    const res = await service.instance.get(`/register/anonimous`)
    console.log(res);
    // 路由跳转
    changeStatus(res.data);
  }

  return (
    <>
      <div>
        {
          status?.code === 400 ? (
            <>
              <Message showIcon type="error">
                账号或密码错误
              </Message>
            </>
          ) : null
        }
      </div>
      <div id='form_box'>
        <Form layout="inline">
          <Form.Group controlId="username-7">
            <Form.ControlLabel>Username</Form.ControlLabel>
            <Form.Control name="username" style={{ width: 160 }} onChange={usenameChange} />
          </Form.Group>

          <Form.Group controlId="password-7">
            <Form.ControlLabel>Password</Form.ControlLabel>
            <Form.Control name="password" type="password" autoComplete="off" style={{ width: 160 }} onChange={passwordChange} />
          </Form.Group>
          <br />
          <Button onClick={handleSubmit}>Login</Button>
        </Form>
        <Button onClick={handleGuest}>游客登入</Button>
      </div>
    </>
  )
}
