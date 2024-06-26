import React from "react";
import Hall from "../../Assets/Images/Hall.png";

import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
const ProjectCard = ({
    projectId,
    projTitle,
    custNo,
    custEmail,
    onClick,
    totalBudget,
    totalTasks,
    totalRooms,
    noOfRooms,
    noOfTasks,
    img,
    percentage,
}) => {
    const imgURL = "https://www.arch2o.com/wp-content/uploads/2022/02/Arch2O-7-benefits-of-3d-home-floor-plans-1-scaled.jpeg";

    const navigate = useNavigate();
    const p = {
        projectId,
        projTitle,
        custNo,
        custEmail,
        totalBudget,
        totalTasks,
        totalRooms,
        noOfRooms,
        noOfTasks,
        img,
        percentage,
    }
    const {currentPrj, setCurrentPrj} = useAuth();
    return (
        <div
            
            className="antialiased font-sans "
        >
            <div className="">
                <div className="flex items-center justify-center">
                    <div className="py-6 px-3 w-80">
                        <div className="bg-white shadow-xl rounded-lg overflow-hidden">
                            <div
                                className="bg-cover bg-center h-56 p-4"
                                style={{ backgroundImage: `url(${imgURL})` }}
                            >
                                <div className="flex justify-end"></div>
                            </div>
                            <div className="p-4">
                                <p className="uppercase tracking-wide text-sm font-bold text-gray-700">
                                    {projTitle} - ₹{totalBudget}
                                </p>
                                <p className="text-gray-700">{custNo}</p>
                                <p> {projectId}</p>
                                <p className="text-gray-700">{custEmail}</p>
                            </div>
                            <div className="flex mb-2 items-center justify-between">
                                <div>
                                    <span className="text-xs font-semibold inline-block py-1 px-2 ml-2 uppercase rounded-full text-white bg-green-500">
                                        Progress
                                    </span>
                                </div>
                                <div className="text-right">
                                    <span className="text-xs mr-2 font-semibold inline-block text-green-600">
                                        {percentage || 10}%
                                    </span>
                                </div>
                            </div>

                            <div
                                className={`inline-block h-1 ${percentage && percentage < 30 ? "bg-red-600" : "bg-green-600"
                                    }`}
                                style={{ width: `${percentage || 10}%` }}
                            > </div>

                            <div className="flex p-4 border-t border-gray-300 text-gray-700">
                                <div className="flex-1 inline-flex items-center">
                                    <svg
                                        className="h-6 w-6 text-gray-600 fill-current mr-3"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M0 16L3 5V1a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v4l3 11v5a1 1 0 0 1-1 1v2h-1v-2H2v2H1v-2a1 1 0 0 1-1-1v-5zM19 5h1V1H4v4h1V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v1h2V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v1zm0 1v2a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1V6h-2v2a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V6H3.76L1.04 16h21.92L20.24 6H19zM1 17v4h22v-4H1zM6 4v4h4V4H6zm8 0v4h4V4h-4z" />
                                    </svg>
                                    <p>
                                        <span className="text-gray-900 font-bold">
                                            {noOfRooms}
                                        </span>{" "}
                                        Rooms 
                                    </p>
                                </div>
                                <div className="flex-1 inline-flex items-center">
                                    <svg
                                        className="h-6 w-6 text-gray-600 fill-current mr-3"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M17.03 21H7.97a4 4 0 0 1-1.3-.22l-1.22 2.44-.9-.44 1.22-2.44a4 4 0 0 1-1.38-1.55L.5 11h7.56a4 4 0 0 1 1.78.42l2.32 1.16a4 4 0 0 0 1.78.42h9.56l-2.9 5.79a4 4 0 0 1-1.37 1.55l1.22 2.44-.9.44-1.22-2.44a4 4 0 0 1-1.3.22zM21 11h2.5a.5.5 0 1 1 0 1h-9.06a4.5 4.5 0 0 1-2-.48l-2.32-1.15A3.5 3.5 0 0 0 8.56 10H.5a.5.5 0 0 1 0-1h8.06c.7 0 1.38.16 2 .48l2.32 1.15a3.5 3.5 0 0 0 1.56.37H20V2a1 1 0 0 0-1.74-.67c.64.97.53 2.29-.32 3.14l-.35.36-3.54-3.54.35-.35a2.5 2.5 0 0 1 3.15-.32A2 2 0 0 1 21 2v9zm-5.48-9.65l2 2a1.5 1.5 0 0 0-2-2zm-10.23 17A3 3 0 0 0 7.97 20h9.06a3 3 0 0 0 2.68-1.66L21.88 14h-7.94a5 5 0 0 1-2.23-.53L9.4 12.32A3 3 0 0 0 8.06 12H2.12l3.17 6.34z"
                                        />
                                    </svg>
                                    <p>
                                        <span className="text-gray-900 font-bold">
                                            {noOfTasks}
                                        </span>{" "}
                                        Tasks
                                    </p>
                                </div>
                                <button className="btn bg-green-500 rounded p-2" onClick={() => navigate(`/chat/${projectId}`)}>Chat</button>
                                <button className="btn bg-blue-500 rounded mx-2 p-2" onClick={() => {
                                    setCurrentPrj(p);
                                    navigate(`/project/${projectId}`);
                                }}>View</button>
                            </div>
                            {/* <div className="px-4 pt-3 pb-4 border-t border-gray-300 bg-gray-100">
                <div className="text-xs uppercase font-bold text-gray-600 tracking-wide">Realtor</div>
                <div className="flex items-center pt-2">
                  <div className="bg-cover bg-center w-10 h-10 rounded-full mr-3" style={{backgroundImage: 'url(https://images.unsplash.com/photo-1500522144261-ea64433bbe27?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=751&q=80)'}}>
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">Tiffany Heffner</p>
                    <p className="text-sm text-gray-700">(555) 555-4321</p>
                  </div>
                </div>
              </div> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectCard;