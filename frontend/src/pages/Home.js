import { useState, useEffect } from 'react';
import { useAuthContext } from '../hooks/useAuthContext'; 
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'; 
import 'react-circular-progressbar/dist/styles.css'; 
import { API_BASE_URL } from "../config";

const Home = () => {
    const { user } = useAuthContext();  
    const [currentDate, setCurrentDate] = useState('');
    const [inventoryData, setInventoryData] = useState([]);

    // Define the max quantity per room
    const roomMaxQuantities = {
        "Infant": 100,  
        "Cleaning": 80,  
        "Washroom": 60,  
        "Preschool 1": 60,
        "Preschool 2": 60,
        "Toddler 1": 60,
        "Toddler 2": 60,
        "Office": 60,
        "Kitchen": 60
    };

    // Get the current date when the component is mounted
    useEffect(() => {
        const date = new Date();
        const formattedDate = date.toLocaleDateString('en-US', {
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric', 
        });
        setCurrentDate(formattedDate); 
    }, []);

    // Fetch inventory data and process it
    useEffect(() => {
        const fetchInventoryData = async () => {
            if (!user) return;

            const response = await fetch(`${API_BASE_URL}/api/inventory/`, {
                headers: {
                    'Authorization': `Bearer ${user.token}`, 
                },
            });

            if (response.ok) {
                const data = await response.json();
                setInventoryData(data); 
            }
        };

        fetchInventoryData();
    }, [user]);

    // Process the inventory data into a format suitable for the progress circles
    const processRoomStock = () => {
        const roomStock = {};

        inventoryData.forEach(item => {
            if (roomStock[item.room]) {
                roomStock[item.room] += item.quantity;
            } else {
                roomStock[item.room] = item.quantity;
            }
        });

        // Calculate progress as a percentage based on the total stock for each room
        return Object.keys(roomStock).map(room => ({
            room,
            progress: Math.min((roomStock[room] / roomMaxQuantities[room]) * 100, 100), 
        }));
    };

    let roomStockData = processRoomStock();
    roomStockData = roomStockData.sort((a, b) => a.room.localeCompare(b.room));

    // Function to determine color based on progress
    const getProgressColor = (progress) => {
        if (progress < 25) {
            return '#FF0000'; 
        } else if (progress < 50) {
            return '#FFCC00'; 
        } else {
            return '#00C49F'; 
        }
    };

    return (
        <div className="dashboard">
            <h1>Welcome {user ? user.name : 'Guest'}!</h1>
            <p>Today's Date: {currentDate}</p>

            {user ? (
                <>
                    <h2>Current Stock by Room</h2>

                    {/* Display progress circles for each room */}
                    <div className="progress-circles">
                        {roomStockData.map((data, index) => (
                            <div className="progress-circle" key={index}>
                                <h3>{data.room}</h3>
                                <CircularProgressbar
                                    value={data.progress} 
                                    text={`${data.progress.toFixed(0)}%`} 
                                    styles={buildStyles({
                                        pathColor: getProgressColor(data.progress), 
                                        textColor: '#000', 
                                        trailColor: '#D3D3D3', 
                                    })}
                                />
                            </div>
                        ))}
                    </div>
                </>
            ) : (
                <p>Please log in to manage your inventory.</p> 
            )}
        </div>
    );
};

export default Home;


