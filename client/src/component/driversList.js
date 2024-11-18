import './index.css'


function RideSelector({selectedUsers,setSelectedUsers}) {
    
    const carsDummyData = [
        {
            id:1,
            driverName : "Zain",
            fair: "1.5",
            distance:"5 min",
            carCategory: "Comfort"
            
        },{
            id:1,
            driverName : "Zain",
            fair: "1.5",
            distance:"5 min",
            carCategory: "Comfort"
            
        },{
            id:1,
            driverName : "Zain",
            fair: "1.5",
            distance:"5 min",
            carCategory: "Comfort"
            
        },{
            id:1,
            driverName : "Zain",
            fair: "1.5",
            distance:"5 min",
            carCategory: "Comfort"
            
        },
        {
            id:1,
            driverName : "Zain",
            fair: "1.5",
            distance:"5 min",
            carCategory: "Comfort"
            
        },
        {
            id:2,
            driverName : "Ali",
            fair: "2.0",
            distance:"6 min",
            carCategory: "Uber Go"
            
        },
        {
            id:3,
            driverName : "Moaz",
            fair: "1",
            distance:"3 min",
            carCategory: "Uber Mini"
            
        },
        {
            id:4,
            driverName : "Moaz",
            fair: "1",
            distance:"3 min",
            carCategory: "Uber Mini"
            
        },
        {
            id:5,
            driverName : "Moaz",
            fair: "1",
            distance:"3 min",
            carCategory: "Uber Mini"
            
        },
    ]
    
    return (
        <>
            <div className="driversList customNavbar">
                {carsDummyData.map((data) => {
                    // Safely check if selectedUsers and selectedUsers.driver exist
                    const isSelected =
                        selectedUsers?.driver?.id === data.id;

                    return (
                        <div
                            className={`driverContainer ${isSelected ? "selected" : ""}`}
                            key={data.id}
                            onClick={() =>
                                setSelectedUsers((prev) => ({
                                    ...prev,
                                    driver: data,
                                }))
                            }
                            style={{
                                backgroundColor: isSelected ? "#76ABAE" : "",
                                cursor: "pointer",
                            }}
                        >
                            <img src="/carIcon.png" alt="Car Icon" />
                            <div className="driverData">
                                <h3>{data.carCategory}</h3>
                                <p>{data.driverName}</p>
                                <p style={{ color: "blue" }}>{data.distance}s away</p>
                            </div>
                            <div className="rideFair">${data.fair}</div>
                        </div>
                    );
                })}
            </div>
        </>
    );
}

export default RideSelector;