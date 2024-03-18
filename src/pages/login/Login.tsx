import { useState, useEffect, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import { Card, Form, Button, message, FormInstance } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import styles from "./Login.module.scss";
import CustomInput from "../../components/CustomInput/CustomInput";
import { useTranslation } from "react-i18next";
import { User } from "../../types";

const Login = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [confirmPassword, setConfirmPassword] = useState<string | null>(null);
  const [isRegistering, setIsRegistering] = useState<boolean>(false);

  const initialUser: User = {
    username: null,
    password: null,
    name: null,
    surname: null,
    phone: null
  };
  
  const [users, setUsers] = useState<User[]>([initialUser]);

  useEffect(() => {
    if (error) {
      message.error(error);
    }
  }, [error]);

  useEffect(() => {
    if (success) {
      message.success(success);
    }
  }, [success]);

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("users") || "[]");
    setUsers(storedUsers);
  }, []);

  const onFinish = (values: User) => {
    if (isRegistering) {

      const existingUser = users?.find(
        (user) => user?.username === values?.username
      );
      if (existingUser) {
        setError(t('usernameExists'));
        return;
      }

      if (values?.password === confirmPassword) {
        const newUser = {
          username: values?.username,
          password: values?.password,
          name: values?.name,
          surname: values?.surname,
          phone: values?.phone
        };      

        users?.push(newUser);
        localStorage.setItem("users", JSON.stringify(users));
        setSuccess(t('registrationSuccess'));
        setIsRegistering(false);
      } else {
        setError(t('passwordsDoNotMatch'));
      }
    } else {
      const foundUser = users?.find(
        (user) =>
          user?.username === values?.username && user?.password === values?.password
      );
      if (foundUser) { 
        localStorage.setItem("currentUser", JSON.stringify(foundUser));
        setSuccess(t('loggedInSuccessfully'));
        navigate('/character');
      } else {
        setError(t('wrongCredentials'));
      }
    }
  };

  const onRegisterClick = () => {
    setIsRegistering(true);
    formRef.current?.resetFields();
  };

  const backToLogin = () => {
    setIsRegistering(false);
    setError(null);
    formRef.current?.resetFields(); 
  };

  const formRef = useRef<FormInstance>(null);

  return (
    <Card className={styles.cardContainer}>
      <Form name="login" onFinish={onFinish} ref={formRef}>
        <CustomInput
          name="username"
          rules={[{ required: true, message: `${t('pleaseInput')} ${t('usernameLabel')}!` }]}
          prefix={<UserOutlined />}
          placeholder={t('usernamePlaceholder')}
        />
        <CustomInput
          name="password"
          rules={[{ required: true, message: `${t('pleaseInput')} ${t('passwordLabel')}!` }]}
          prefix={<LockOutlined />}
          type="password"
          placeholder={t('passwordPlaceholder')}
        />
        {isRegistering && (
          <>
            <CustomInput
              name="confirmPassword"
              rules={[{ required: true, message: `${t('pleaseConfirm')} ${t('passwordLabel')}!` }]}
              type="password"
              placeholder={t('confirmPasswordPlaceholder')}
              value={confirmPassword}
              onChange={setConfirmPassword}
            />
            <CustomInput
              name="name"
              rules={[{ required: true, message: `${t('pleaseInput')} ${t('nameLabel')}!` }]}
              placeholder={t('namePlaceholder')}
            />
            <CustomInput
              name="surname"
              rules={[{ required: true, message: `${t('pleaseInput')} ${t('surnameLabel')}!` }]}
              placeholder={t('surnamePlaceholder')}
            />
            <CustomInput
              name="phone"
              rules={[
                { required: true, message: `${t('pleaseInput')} ${t('phoneLabel')}!` },
                {
                  pattern: /^[0-9]+$/,
                  message: `${t('pleaseEnterValidPhone')}`,
                },
              ]}
              placeholder={t('phonePlaceholder')}
            />
          </>
        )}
        <Form.Item>
          {isRegistering && (
              <Button 
                type="link"
                onClick={backToLogin}
                className={styles.loginButton}
              >
                {t('back')}
              </Button>
          )}
          <Button
            type="primary"
            htmlType="submit"
            className={styles.loginButton}
          >
            {isRegistering ? t('submit') : t('login')}
          </Button>
          {!isRegistering && (
            <Button type="link" onClick={onRegisterClick}>
              {t('register')}
            </Button>
          )}
        </Form.Item>
      </Form>
    </Card>
  );
};

export default Login;
