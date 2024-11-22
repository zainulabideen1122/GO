import { jwtDecode } from "jwt-decode";
import "./index.css"
import { useEffect, useState } from "react";
import { Grid, Input, Button } from "@mantine/core";
import { RiEdit2Fill } from "react-icons/ri";
import DriverProfileRegistration from "../../component/driverProfile_registration";
import axios from "axios";


function DriverProfile() {
    const token = localStorage.getItem('token')
    const [userDetails, setUserDetails] = useState(jwtDecode(token))
    const [formDetails, setFormDetails] = useState();
    const [user, setUser] = useState()
    const [isSaveDisabled, setIsSaveDisabled] = useState(true);

    useEffect(() => {
        const fetchDriverData = async () => {
            try {
                const res = await axios.get(`http://localhost:3001/user/getDriver/${userDetails.id}`);
                setUser(res.data);
                setFormDetails(res.data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchDriverData();
    }, []);



    
    // useEffect(() => {
    //     const isDataChanged =
    //       JSON.stringify(formDetails) !== JSON.stringify(dummyDetail);
    //     setIsSaveDisabled(!isDataChanged);
    //   }, [formDetails]);

      const handleChange = (field, value) => {
        setFormDetails((prev) => ({
          ...prev,
          [field]: value,
        }));
      };

      const savePersonalDetails = ()=>{
        console.log(formDetails)
      }

      return ( 
        <>
            <div className="driverProfile_container">
                <div className="personalInfo_container">
                    <div className="infoHead">
                        <img src="/profilePic.png" />
                        <p>{userDetails.name}</p>
                    </div>
                    { userDetails?.isInfoCompleted && <div className="infoContent">
                        <Grid className="infoContent_blocks" overflow="hidden" >
                            <Grid.Col className="infoContent_block" span={12}>
                                <Input.Wrapper label="Full Name">
                                    <Input 
                                        placeholder="Name" 
                                        value={formDetails?.name} 
                                        rightSection={<RiEdit2Fill size={20} />} 
                                        onChange={(e) => handleChange("name", e.target.value)}    
                                    />
                                </Input.Wrapper>
                            </Grid.Col>
                            <Grid.Col className="infoContent_block" span={6}>
                                <Input.Wrapper label="Email">
                                    <Input 
                                        placeholder="Your email" 
                                        value={formDetails?.email} 
                                        disabled
                                    />
                                </Input.Wrapper>
                            </Grid.Col>
                            <Grid.Col className="infoContent_block" span={6}>
                                <Input.Wrapper label="Licence Status">
                                    <Input 
                                    placeholder="Status" 
                                    value={formDetails?.advancedInfo?.driverLicenceVerified ? "Verified": "Not Verified"} 
                                    disabled     
                                />
                                </Input.Wrapper>
                            </Grid.Col>
                            <Grid.Col className="infoContent_block" span={12}>
                                <Input.Wrapper label="Address">
                                    <Input 
                                        placeholder="adress" 
                                        value={formDetails?.advancedInfo?.address} 
                                        rightSection={<RiEdit2Fill size={20} />} 
                                        onChange={(e) => handleChange("address", e.target.value)} 
                                    />
                                </Input.Wrapper>
                            </Grid.Col>
                            <Grid.Col className="infoContent_block" span={6}>
                                <Input.Wrapper label="Rating">
                                    <Input 
                                        placeholder="Rating" 
                                        value={formDetails?.advancedInfo?.rating?.value}
                                        disabled
                                    />
                                </Input.Wrapper>
                            </Grid.Col>
                            <Grid.Col className="infoContent_block" span={6}>
                                <Input.Wrapper label="Total Rides">
                                <Input 
                                    placeholder="Rides" 
                                    value={formDetails?.advancedInfo?.rides?.completed} 
                                    disabled
                                />
                                </Input.Wrapper>
                            </Grid.Col>
                            
                        </Grid>
                        <center>
                            <Button 
                                className="saveProfileBtn" 
                                size="md" 
                                color="#76ABAE" 
                                disabled={isSaveDisabled}
                                onClick={savePersonalDetails}
                            >
                                Save
                            </Button>
                        </center>
                    </div>}

                    {!userDetails?.isInfoCompleted && <DriverProfileRegistration user={user} formDetails={formDetails} setFormDetails={setFormDetails} handleChange={handleChange}/>}

                </div>
            </div>
        </>
     );
}

export default DriverProfile;