import { Button, FileInput, Grid, Group, Input, Stepper } from "@mantine/core";
import { useViewportSize } from "@mantine/hooks";
import axios from "axios";
import { useEffect, useState } from "react";
import { RiEdit2Fill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

function DriverProfileRegistration({formDetails, setFormDetails, handleChange, user}) {

    console.log('form: ',formDetails)
    const [active, setActive] = useState(1)
    const {height, width} = useViewportSize()
    const navigate = useNavigate()
    const nextStep = ()=> setActive((current)=>(current < 3 ? current + 1: current))
    const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));

    const vehicle ={
        type: '',
        make : '',
        model: '',
        year:'',
        registrationNumber:'',
        color:''
    }
    
    const [vehicleData, setVehicleData] = useState({...vehicle})

    const handleVehicle_change = (field, value)=>{
        setVehicleData((prev)=>({
            ...prev, 
            [field]: value
        }))
    }

   

    useEffect(()=>{
        console.log('form: ',formDetails)
        const vehicleID = formDetails?.advancedInfo?.vehicleId
        if(vehicleID?.length > 2)
        {
            axios.get(`http://localhost:3001/vehicle/getVehicle/${vehicleID}`)
            .then(res=>{
                console.log(res.data)
                setVehicleData(res.data)
            })
        }

    }, [formDetails])


    const submitHandle = async()=>{
        if(active < 3)
            nextStep()
        else
        {
            const combined = {
                formDetails,
                vehicleData
            }
            await axios.post(`http://localhost:3001/user/updateDriver/${formDetails._id}`, combined)
            .then(res=>{
                console.log(res)
                localStorage.setItem('token', res.data.newToken)
                navigate('/')
            })
            .catch(err=>{
                console.log(err)
            })
        }
    }

    return ( 
        <>
        <Stepper 
            color="#76ABAE"
            active={active} 
            onStepClick={setActive} 
            breakpoint="sm"
            orientation={width < 510 ? "vertical": "horizontal"}
            styles={{
                root: {
                  marginLeft: "1rem",
                  marginRight: "1rem",
                  marginTop: "1rem"
                },
              }}
        >
            <Stepper.Step label="First Step" description="Personal Information">
                <Grid className="infoContent_blocks" overflow="hidden" >
                            <Grid.Col className="infoContent_block" span={12}>
                                <Input.Wrapper label="Full Name">
                                    <Input 
                                        placeholder="Name" 
                                        value={formDetails?.name} 
                                        rightSection={<RiEdit2Fill size={20} />}
                                        onChange={(e) => {setFormDetails({...formDetails, name: e.target.value})}}    
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
                                    value={formDetails?.advancedInfo?.driverLicenceVerified ? "Verified" :"Not Verified"} 
                                    disabled     
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
            </Stepper.Step>
            <Stepper.Step label="Second Step" description="Advanced Information">
                <Grid className="infoContent_blocks" overflow="hidden" >
                    <Grid.Col className="infoContent_block" span={12}>
                        <Input.Wrapper label="Address">
                            <Input 
                                placeholder="Address" 
                                value={formDetails?.advancedInfo?.address} 
                                rightSection={<RiEdit2Fill size={20} />} 
                                onChange={(e) => {setFormDetails({...formDetails, advancedInfo:{...formDetails.advancedInfo, address:e.target.value}})}}    
                            />
                        </Input.Wrapper>
                    </Grid.Col>
                    <Grid.Col className="infoContent_block" span={6}>
                        <Input.Wrapper label="Phone Number">
                            <Input 
                                placeholder="Phone number"
                                rightSection={<RiEdit2Fill size={20} />}  
                                value={formDetails?.advancedInfo.phone}
                                onChange={(e) => {setFormDetails({...formDetails, advancedInfo:{...formDetails.advancedInfo, phone:e.target.value}})}}    
                            />
                        </Input.Wrapper>
                    </Grid.Col>
                    <Grid.Col className="infoContent_block" span={6}>
                        <FileInput 
                            clearable 
                            label="Upload Driving Licence" 
                            placeholder={`${formDetails?.advancedInfo?.driverLicenceVerified ?'Verified':'Upload files'}`}
                            onChange={(e) => {setFormDetails({...formDetails, advancedInfo:{...formDetails.advancedInfo, driverLicenceVerified:true}})}} 
                            disabled={formDetails?.advancedInfo?.driverLicenceVerified}
                        />
                    </Grid.Col>
                </Grid>
            </Stepper.Step>
            <Stepper.Step label="Third Step" description="Vehicle Information">
            <Grid className="infoContent_blocks" overflow="hidden" >
                    <Grid.Col className="infoContent_block" span={6}>
                        <Input.Wrapper label="Type">
                            <Input 
                                placeholder="Car, Bike etc" 
                                value={vehicleData.type} 
                                onChange={(e) => handleVehicle_change('type',e.target.value)}   
                            />
                        </Input.Wrapper>
                    </Grid.Col>
                    <Grid.Col className="infoContent_block" span={6}>
                        <Input.Wrapper label="Make">
                            <Input 
                                placeholder="Honda ..." 
                                value={vehicleData.make} 
                                onChange={(e) => handleVehicle_change('make',e.target.value)}    
                            />
                        </Input.Wrapper>
                    </Grid.Col>
                    <Grid.Col className="infoContent_block" span={12}>
                        <Input.Wrapper label="Model">
                            <Input 
                                placeholder="Civic, City etc" 
                                value={vehicleData.model} 
                                onChange={(e) => handleVehicle_change('model',e.target.value)}    
                            />
                        </Input.Wrapper>
                    </Grid.Col>
                    <Grid.Col className="infoContent_block" span={6}>
                        <Input.Wrapper label="Year">
                            <Input 
                                placeholder="2018, 2019 etc" 
                                value={vehicleData.year} 
                                onChange={(e) => handleVehicle_change('year',e.target.value)}    
                            />
                        </Input.Wrapper>
                    </Grid.Col>
                    <Grid.Col className="infoContent_block" span={6}>
                        <Input.Wrapper label="Vehicle Color">
                            <Input 
                                placeholder="White, Silver etc" 
                                value={vehicleData.color} 
                                onChange={(e) => handleVehicle_change('color',e.target.value)}    
                            />
                        </Input.Wrapper>
                    </Grid.Col>
                    <Grid.Col className="infoContent_block" span={12}>
                        <Input.Wrapper label="Registration Number">
                            <Input 
                                placeholder="ITC-2080" 
                                value={vehicleData.registrationNumber} 
                                onChange={(e) => handleVehicle_change('registrationNumber',e.target.value)}
                            />
                        </Input.Wrapper>
                    </Grid.Col>
                    
                    
                </Grid>
            </Stepper.Step>

        </Stepper>
        
        <Group justify="center" mt="xl">
            <Button variant="default" onClick={prevStep}>Back</Button>
            <Button onClick={submitHandle} color="#76ABAE">{active === 3 ? "Submit" :"Next"}{console.log(active)}</Button>
        </Group>

        </>
     );
}

export default DriverProfileRegistration;