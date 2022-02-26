import React, {Component} from 'react';
import { Form, Input, Button, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { login } from "../utils";

class LoginForm extends Component {

    state = {
        loading: false
    }

    onFinish = (values) => {
        //step1: set loading as true;
        //step2: send login request (call login api) to the server;
        //step3: deal with login status -> logged in or not;
        this.setState({loading: true})

        console.log('Received values of form: ', values);
        login(values)
            .then( () => {
                //show logged in;
                message.success('Login Successful');
                this.props.onSuccess();
            })
            .catch( err => {
                //show error;
                message.error(err.message);
            })
            .finally( () => {
                this.setState( {loading: false} )
            })
    };

    render() {
        return (
            <Form
                name="normal_login"
                className="login-form"
                initialValues={{
                    remember: true,
                }}
                onFinish={this.onFinish}
            >
                <Form.Item
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your Username!',
                        },
                    ]}
                >
                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your Password!',
                        },
                    ]}
                >
                    <Input.Password
                        prefix={<LockOutlined />}
                        placeholder="Password"
                    />
                </Form.Item>

                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        loading={ this.state.loading }>
                        Log in
                    </Button>
                </Form.Item>
            </Form>
        );
    }
}

export default LoginForm;