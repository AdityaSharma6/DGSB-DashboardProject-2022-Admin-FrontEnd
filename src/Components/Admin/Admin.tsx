import {
    Attachment,
    Avatar,
    Button,
    Card,
    Dialog,
    DownloadIcon,
    ErrorIcon,
    ExcelIcon,
    Flex,
    Text,
    TrashCanIcon,
} from '@fluentui/react-northstar';
import axios from 'axios';
import { FunctionComponent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const Admin: FunctionComponent = () => {
    const [isDownloadingData, setIsDownloadingData] = useState<boolean>(false);
    const [isDownloadFinished, setIsDownloadFinished] =
        useState<boolean>(false);
    const [excelData, setExcelData] = useState(null);

    const navigate = useNavigate();

    const getExcelData = async () => {
        const response = await axios.get(
            `http://localhost:5000/misc/download`,
            { responseType: 'blob' }
        );
        setExcelData(response.data);
    };

    const deleteExcelData = async () => {
        await axios.get(`http://localhost:5000/misc/clean`);
    };

    useEffect(() => {
        setIsDownloadingData(true);
        setIsDownloadFinished(false);
        // Download Data

        getExcelData();
        // Finished Download
        setIsDownloadFinished(true);
        setIsDownloadingData(false);
    }, [isDownloadingData, isDownloadFinished]);

    const showAttachment =
        isDownloadFinished === true && isDownloadingData === false
            ? true
            : false;

    const deletionDialogHeader = (
        <Flex
            gap='gap.medium'
            vAlign='center'
            styles={{ padding: '10px 0px 10px 0px' }}>
            <Text content='Deletion Confirmation' weight='bold' size='larger' />
            <ErrorIcon size='larger' />
        </Flex>
    );

    const deleteDataHandler = () => {
        console.log('Deleting All Data');
        deleteExcelData();
    };

    const downloadDataOnClickHandler = () => {
        if (excelData === null) {
            getExcelData();
        } else {
            const url = window.URL.createObjectURL(new Blob([excelData]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'data.xlsx');
            document.body.appendChild(link);
            link.click();
            console.log('Downloading All Data');
        }
    };

    return (
        <Flex
            column
            gap='gap.large'
            className='admin-container'
            hAlign='center'>
            <Card fluid>
                <Card.Header>
                    <Flex gap='gap.small'>
                        <Avatar name='Admin' status='success' />
                        <Flex column>
                            <Text content='Administrator' weight='bold' />
                            <Text content='Command Bar' size='small' />
                        </Flex>
                    </Flex>
                </Card.Header>
                <Card.Body>
                    <Flex>
                        <Text content='Additional features or modifications can be requested by contacting the developer at aditya_sharma_@hotmail.com or shara24@mcmaster.ca' />
                    </Flex>
                </Card.Body>
                <Card.Footer>
                    <Flex vAlign='end' gap='gap.large' space='evenly'>
                        {showAttachment && (
                            <Attachment
                                actionable
                                icon={<ExcelIcon />}
                                header='data.xlsx'
                                progress={showAttachment ? 100 : 50}
                                action={{
                                    icon: <DownloadIcon />,
                                    onClick: downloadDataOnClickHandler,
                                }}
                            />
                        )}
                        <Flex gap='gap.large'>
                            <Dialog
                                cancelButton='Cancel Deletion'
                                confirmButton='Delete All Data'
                                onConfirm={deleteDataHandler}
                                content='This action is irreversible and will delete all User Data from the Database collected till this moment. Please confirm if you would like to proceed with this action.'
                                header={deletionDialogHeader}
                                trigger={
                                    <Button
                                        primary
                                        icon={<TrashCanIcon />}
                                        content='Delete Data'
                                    />
                                }
                            />
                        </Flex>
                    </Flex>
                </Card.Footer>
            </Card>
            <Button
                primary
                content='Return to Login'
                onClick={() => navigate('/')}
            />
        </Flex>
    );
};
