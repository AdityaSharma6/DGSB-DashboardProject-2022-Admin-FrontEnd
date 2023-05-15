import React, { FunctionComponent, useContext, useState } from 'react';
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Flex,
    Text,
    Input,
    Button,
    Loader,
} from '@fluentui/react-northstar';
import {
    UserFriendsIcon,
    PersonIcon,
    LockIcon,
} from '@fluentui/react-icons-northstar';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthenticationLevels, UserModel } from '../../Models/User';
import { UserContext } from '../../context';

export const Login: FunctionComponent = () => {
    const { setUser } = useContext(UserContext);

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [correctLoginCredential, setCorrectLoginCredential] = useState<
        boolean | undefined
    >(undefined);
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    const usernameOnChangeHandler = (
        event: React.SyntheticEvent<HTMLElement, Event>
    ) => {
        const e = event as React.ChangeEvent<HTMLInputElement>;
        setUsername(e.target.value);
    };

    const passwordOnChangeHandler = (
        event: React.SyntheticEvent<HTMLElement, Event>
    ) => {
        const e = event as React.ChangeEvent<HTMLInputElement>;
        setPassword(e.target.value);
    };

    const loginHandler = async () => {
        try {
            setIsLoading(true);
            const response = await axios.get(
                `${process.env.REACT_APP_API_ENDPOINT}/users?username=${username}`
            );
            const responseData = response.data;
            const userData: UserModel = responseData.data;

            if (password !== userData.password) {
                throw new Error('Incorrect password. User not authorized.');
            } else {
                setUser({
                    ...userData,
                    isAuthenticated: true,
                    authLevel: AuthenticationLevels.Admin,
                });

                navigate('/admin');
            }
        } catch (error) {
            console.log(error);
            setIsLoading(false);
            setCorrectLoginCredential(false);
        }
    };

    const inputErrorStateHandler = () => {
        // If login credential is wrong, then showcase error
        if (correctLoginCredential === false) {
            return true;
        } else {
            return false;
        }
    };

    return (
        <div className='login-card'>
            <Card size='largest' styles={{ width: '100%' }}>
                <Flex column gap='gap.large'>
                    <CardHeader>
                        <Flex
                            space='evenly'
                            styles={({ theme: { siteVariables } }) => ({
                                color: siteVariables.colorScheme.brand
                                    .foreground,
                            })}>
                            <UserFriendsIcon size='largest' color='brand' />
                        </Flex>
                    </CardHeader>
                    <CardBody>
                        <Flex column gap='gap.medium'>
                            <Input
                                iconPosition='start'
                                icon={<PersonIcon />}
                                placeholder={'Username'}
                                value={username}
                                error={inputErrorStateHandler()}
                                onClick={() =>
                                    setCorrectLoginCredential(undefined)
                                }
                                onChange={usernameOnChangeHandler}
                                fluid
                            />

                            <Input
                                iconPosition='start'
                                icon={<LockIcon />}
                                placeholder={'Password'}
                                value={password}
                                error={inputErrorStateHandler()}
                                onClick={() =>
                                    setCorrectLoginCredential(undefined)
                                }
                                onChange={passwordOnChangeHandler}
                                fluid
                            />
                            {isLoading === true && (
                                <Loader size='medium' color='brand' />
                            )}
                            {correctLoginCredential === false && (
                                <Text
                                    error
                                    content='If you have forgotten your Admin Credentials, please refer to the off-boarding documentation.'
                                />
                            )}
                        </Flex>
                    </CardBody>
                    <CardFooter>
                        <Flex gap='gap.medium'>
                            <Button
                                content='Login'
                                primary
                                onClick={loginHandler}
                            />
                        </Flex>
                    </CardFooter>
                </Flex>
            </Card>
        </div>
    );
};
