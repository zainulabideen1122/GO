import { Modal, Select } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { GoogleLogin, useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Google() {
    const navigate = useNavigate();
    const [roleModal, { open, close }] = useDisclosure(false);
    const [userData, setUserData] = useState(null); // Store user data temporarily

    const googleAuth = async (data) => {
        console.log(data);
        axios.post('http://localhost:3001/auth/googleAuth', data)
            .then((res) => {
                console.log(res.data);
                if (res.data) {
                    localStorage.setItem('token', res.data);
                    navigate('/');
                }
            });
    };

    const getDataFromGoogle = (access_token) => {
        axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${access_token}`, {
            headers: {
                Authorization: `Bearer ${access_token}`,
                Accept: 'application/json',
            },
        })
            .then((res) => {
                console.log(res);
                const data = {
                    email: res.data.email,
                    name: res.data.name,
                };

                
                setUserData(data); // Store user data temporarily
                open(); // Open the modal
                
            })
            .catch((e) => {
                console.log(e);
            });
    };

    const handleRoleSelect = (role) => {
        if (userData) {
            const dataWithRole = { ...userData, role };
            googleAuth(dataWithRole); // Call the authentication with the selected role
            close(); // Close the modal
        }
    };

    const googleLog = useGoogleLogin({
        onSuccess: (codeResponse) => {
            console.log(codeResponse);
            getDataFromGoogle(codeResponse.access_token);
        },
    });

    return (
        <>
            <button onClick={() => googleLog()}>Sign in with Google 🚀</button>
            <Modal opened={roleModal} onClose={close} title="User Role">
                <Select
                    label="Select your role:"
                    placeholder="Pick Role"
                    data={['Rider', 'Driver']}
                    onChange={handleRoleSelect} // Handle role selection
                />
            </Modal>
        </>
    );
}

export default Google;
