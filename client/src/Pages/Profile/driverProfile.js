import { jwtDecode } from "jwt-decode";
import "./index.css"
import { useEffect, useState } from "react";
import { Grid, Input, Button, Accordion } from "@mantine/core";
import { RiEdit2Fill } from "react-icons/ri";
import DriverProfileRegistration from "../../component/driverProfile_registration";
import axios from "axios";
import { FaUser, FaCar } from "react-icons/fa";
import Swal from "sweetalert2";
import {notifications} from "@mantine/notifications"



function DriverProfile() {
    const token = localStorage.getItem('token')
    const [userDetails, setUserDetails] = useState(jwtDecode(token))
    const [formDetails, setFormDetails] = useState();
    const [user, setUser] = useState()
    const [isSaveDisabled, setIsSaveDisabled] = useState(true);
    const [vehicleInfo, setVehicleInfo] = useState()

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

        const fetchDriverVehicle = async()=>{
            try {
                await axios.get(`http://localhost:3001/user/getVehicle/${userDetails.id}`)
                .then(res=>{
                    setVehicleInfo(res.data)
                })
            } catch (error) {
                console.log(error)
            }
        }
        fetchDriverData();
        fetchDriverVehicle()
    }, []);



    
    useEffect(() => {
        const isDataChanged =
          JSON.stringify(formDetails) !== JSON.stringify(user);
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

      const showVehicleDataChange_alert = async()=>{
        const { value: email } = await Swal.fire({
            title: "Enter email address",
            input: "email",
            inputLabel: "Your email address",
            inputPlaceholder: "Enter your email address"
          });

          console.log(email)

          if(email){
            notifications.show({
                title:'Attention Required!',
                message:"We will shorlty email you with the link having instructions!",
                color:'#76ABAE',
                position:'top-center',
                autoClose:5000,
                background: '#76ABAE'
              })
          }
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
                        <Accordion defaultValue="userInfo" variant="contained" style={{marginLeft:'2rem', marginRight:'1.5rem'}}>
                            <Accordion.Item value="userInfo">
                                <Accordion.Control
                                style={{}}
                                icon={<FaUser />}>
                                    User Information
                                </Accordion.Control>
                                <Accordion.Panel style={{background:'white'}}>
                                    <Grid className="infoContent_blocks" overflow="hidden" >
                                        <Grid.Col className="infoContent_block" span={6}>
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
                                            <Input.Wrapper label="Phone Number">
                                                <Input 
                                                    placeholder="Phone#" 
                                                    value={formDetails?.advancedInfo?.phone}
                                                    rightSection={<RiEdit2Fill size={20} />} 
                                                    onChange={(e) => {setFormDetails({...formDetails, advancedInfo:{...formDetails.advancedInfo, phone:e.target.value}})}}    
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
                                                    onChange={(e) => {setFormDetails({...formDetails, advancedInfo:{...formDetails.advancedInfo, address:e.target.value}})}}    
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
                                </Accordion.Panel>
                            </Accordion.Item>
                            <Accordion.Item value="vehicleInfo">
                                <Accordion.Control
                                icon={<FaCar/>}>
                                    Vehicle Information
                                </Accordion.Control>
                                <Accordion.Panel style={{background:'white'}}>
                                    { vehicleInfo && <div>
                                    <Grid className="infoContent_blocks" overflow="hidden" >
                                        <Grid.Col className="infoContent_block" span={6}>
                                            <Input.Wrapper label="Type">
                                                <Input 
                                                    placeholder="Car, Bike etc" 
                                                    value={vehicleInfo?.type} 
                                                    disabled
                                                />
                                            </Input.Wrapper>
                                        </Grid.Col>
                                        <Grid.Col className="infoContent_block" span={6}>
                                            <Input.Wrapper label="Make">
                                                <Input 
                                                    placeholder="Honda ..." 
                                                    value={vehicleInfo?.make} 
                                                    disabled   
                                                />
                                            </Input.Wrapper>
                                        </Grid.Col>
                                        <Grid.Col className="infoContent_block" span={12}>
                                            <Input.Wrapper label="Model">
                                                <Input 
                                                    placeholder="Civic, City etc" 
                                                    value={vehicleInfo?.model} 
                                                    disabled
                                                />
                                            </Input.Wrapper>
                                        </Grid.Col>
                                        <Grid.Col className="infoContent_block" span={6}>
                                            <Input.Wrapper label="Year">
                                                <Input 
                                                    placeholder="2018, 2019 etc" 
                                                    value={vehicleInfo?.year} 
                                                    disabled  
                                                />
                                            </Input.Wrapper>
                                        </Grid.Col>
                                        <Grid.Col className="infoContent_block" span={6}>
                                            <Input.Wrapper label="Vehicle Color">
                                                <Input 
                                                    placeholder="White, Silver etc" 
                                                    value={vehicleInfo?.color} 
                                                    disabled    
                                                />
                                            </Input.Wrapper>
                                        </Grid.Col>
                                        <Grid.Col className="infoContent_block" span={12}>
                                            <Input.Wrapper label="Registration Number">
                                                <Input 
                                                    placeholder="ITC-2080" 
                                                    value={vehicleInfo?.registrationNumber} 
                                                    disabled
                                                />
                                            </Input.Wrapper>
                                        </Grid.Col>
                                        
                                    </Grid>
                                        <center>
                                            <div onClick={showVehicleDataChange_alert} className="updateVehicleInfoTag">
                                                Want to update vehicle data?
                                            </div>
                                        </center>
                                    </div>
                                }
                                    {!vehicleInfo && "No vehicle data exists!"}
                                </Accordion.Panel>
                            </Accordion.Item>
                        </Accordion>
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