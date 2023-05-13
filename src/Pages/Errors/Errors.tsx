import React, { FunctionComponent } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Flex,
    Text,
    Button,
    ErrorIcon,
} from '@fluentui/react-northstar';
import './Errors.css';

const errorsMap = new Map<number, string>([
    [
        404,
        "Oops! There is nothing here for you! What you're looking for doesn't exist.",
    ],
]);

interface IErrors {
    errorCode: number;
}

export const Errors: FunctionComponent<IErrors> = (props: IErrors) => {
    const navigate = useNavigate();

    const buttonOnClickHandler = () => {
        navigate('/');
    };

    return (
        <Card size='largest' className='error-card'>
            <Flex column gap='gap.large'>
                <CardHeader>
                    <Flex space='evenly'>
                        <Text size='large' weight='bold'>
                            ERROR {props.errorCode}!
                        </Text>
                    </Flex>
                </CardHeader>
                <CardBody>
                    <Flex space='evenly'>{errorsMap.get(props.errorCode)}</Flex>
                </CardBody>
                <CardFooter>
                    <Flex column gap='gap.large' hAlign='center'>
                        <Flex space='evenly' gap='gap.large'>
                            <Button
                                content='Return to Login Page'
                                primary
                                onClick={() => buttonOnClickHandler()}
                            />
                        </Flex>
                        <ErrorIcon size='largest' color='brand' />
                    </Flex>
                </CardFooter>
            </Flex>
        </Card>
    );
};
