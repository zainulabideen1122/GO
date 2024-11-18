import { jwtDecode } from "jwt-decode";
import "./index.css"
import { useEffect, useState } from "react";
import { Grid, Input, Button } from "@mantine/core";
import { RiEdit2Fill } from "react-icons/ri";


function DriverProfile() {
    const token = localStorage.getItem('token')
    const [userDetails, setUserDetails] = useState(jwtDecode(token))
    const dummyDetail = {
        name: 'Zain',
        email : 'zain@gmail.com',
        licence: 'verified',
        address : 'Rawalpindi, Pakistan',
        rating: "4.5/5",
        rides : "10"
    }

    const [formDetails, setFormDetails] = useState({ ...dummyDetail });
    const [isSaveDisabled, setIsSaveDisabled] = useState(true);
    
    useEffect(() => {
        const isDataChanged =
          JSON.stringify(formDetails) !== JSON.stringify(dummyDetail);
        setIsSaveDisabled(!isDataChanged);
      }, [formDetails]);

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
                    <div className="infoContent">
                        <Grid className="infoContent_blocks" overflow="hidden" >
                            <Grid.Col className="infoContent_block" span={12}>
                                <Input.Wrapper label="Full Name">
                                    <Input 
                                        placeholder="Name" 
                                        value={formDetails.name} 
                                        rightSection={<RiEdit2Fill size={20} />} 
                                        onChange={(e) => handleChange("name", e.target.value)}    
                                    />
                                </Input.Wrapper>
                            </Grid.Col>
                            <Grid.Col className="infoContent_block" span={6}>
                                <Input.Wrapper label="Email">
                                    <Input 
                                        placeholder="Your email" 
                                        value={formDetails.email} 
                                        disabled
                                    />
                                </Input.Wrapper>
                            </Grid.Col>
                            <Grid.Col className="infoContent_block" span={6}>
                                <Input.Wrapper label="Licence Status">
                                    <Input 
                                    placeholder="Status" 
                                    value={formDetails.licence} 
                                    disabled     
                                />
                                </Input.Wrapper>
                            </Grid.Col>
                            <Grid.Col className="infoContent_block" span={12}>
                                <Input.Wrapper label="Address">
                                    <Input 
                                        placeholder="adress" 
                                        value={formDetails.address} 
                                        rightSection={<RiEdit2Fill size={20} />} 
                                        onChange={(e) => handleChange("address", e.target.value)} 
                                    />
                                </Input.Wrapper>
                            </Grid.Col>
                            <Grid.Col className="infoContent_block" span={6}>
                                <Input.Wrapper label="Rating">
                                    <Input 
                                        placeholder="Rating" 
                                        value={formDetails.rating}
                                        disabled
                                    />
                                </Input.Wrapper>
                            </Grid.Col>
                            <Grid.Col className="infoContent_block" span={6}>
                                <Input.Wrapper label="Total Rides">
                                <Input 
                                    placeholder="Rides" 
                                    value={formDetails.rides} 
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
                    </div>
                </div>
            </div>
        </>
     );
}

export default DriverProfile;