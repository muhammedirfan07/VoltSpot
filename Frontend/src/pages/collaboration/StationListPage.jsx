import React, { useContext, useEffect, useState } from 'react'
import SERVER_URL from '../../Server/serverURL'
import { deleteStaionAPI, viewOurStationsAPI } from '../../Server/allAPI'
import UpdateStation from './UpdateStation'
import { addStaionResponseContext, updateStaionResponseContext } from '../../context/ContextAPI'
import { toast } from 'react-toastify'

const StationListPage = () => {
  const [viewStationDetails, setViewStationDetails] = useState([])

  const {addStaionResponse,setAddStaionResponse}=useContext(addStaionResponseContext)
  const {updateStaionResponse,setUpdateStaionResponse}=useContext(updateStaionResponseContext)



  useEffect(()=>{
    getViewStationDetails()
  },[addStaionResponse,updateStaionResponse])

  const getViewStationDetails = async() => {
    console.log("View Station Details")
    const  token =sessionStorage.getItem('token')
    console.log(token);
    
    if(token){
      const reqHeader= {
        "Authorization":`Bearer ${token}`
       }
       try {
           const result = await viewOurStationsAPI(reqHeader)
           console.log(result);
           
           if(result.status === 200){
               setViewStationDetails(result.data)
               console.log("result.data",result.data); 
           }

       } catch (error) {
        console.log("error",error);
        
        
       }
    }
  }
  const delectStaions = async(id)=>{
    console.log(".......inside the delect .......");
    console.log("id",id);
    
    const token=sessionStorage.getItem('token')
    if(token){
       const reqHeader= {
        "Authorization":`Bearer ${token}`
       }
       try {
        const removeStation =await deleteStaionAPI(id,reqHeader)
        console.log("removeStation: ",removeStation);
        
        if(removeStation.status===200){
          toast.success(removeStation.data.message,{position:"top-right" ,theme:"dark"})
          getViewStationDetails()
        }
        
       } catch (error) {
           console.log("error",error);
           
       }
      }
    
  }



  return (
    <div className="overflow-x-auto  w-full">
      <table className="w-full font-[DM_Sans] min-w-[700px]">
        <thead>
          <tr className="text-left border-t border-gray-600 text-gray-200 text-sm md:text-lg">
            <th className="p-2 md:p-4">#</th>
            <th className="p-2 md:p-4">Image</th>
            <th className="p-2 md:p-4">Station Name</th>
            <th className="p-2 md:p-4">Location</th>
            <th className="p-2 md:p-4">Charging Type</th>
            <th className="p-2 md:p-4">Vechile Type</th>
            <th className="p-2 md:p-4">Map</th>
            <th className="p-2 md:p-4">Rate/hr</th>
            <th className="p-2 md:p-4">Actions</th>
          </tr>
        </thead>
        <tbody>
           {
            viewStationDetails?.length>0?
            viewStationDetails?.map((station, index) => (
              (
                <tr key={station?._id} className="border-t border-gray-700">
                <td className="p-2 md:p-4 text-gray-300">{index+1}</td>
                <td className="p-2 md:p-4 text-gray-300"><img className='w-10 h-10' src={`${SERVER_URL}/${station?.image}`} alt="" /></td>
                <td className="p-2 md:p-4 text-gray-300">{station?.stationName}</td>
                <td className="p-2 md:p-4 text-gray-300">{`${station?.city},${station?.state}`}</td>
                <td className="p-2 md:p-4 text-gray-300">{station?.chargingType}</td>
                <td className="p-2 md:p-4 text-gray-300">{station?.vehicleType}</td>
                <td className="p-2 md:p-4 text-purple-400">{station?.mapUrl}</td>
                <td className="p-2 md:p-4 text-gray-300">{station?.pricePerHour}</td>
                <td className="p-2 md:p-4">
                  <div className="flex flex-col sm:flex-row gap-2">
                    <UpdateStation station={station}/>
                    <button onClick={() => delectStaions(station._id)} className="px-2 py-1 bg-red-500/10 text-red-500 rounded-full text-xs md:text-sm whitespace-nowrap">
                      Delete
                    </button>
                  </div>
                </td>
                </tr>
              )
            ))
            :
            <tr>
              <td>
                <div className='text-red-700 text-nowrap ps-2'> staion not yet..! </div>
              </td>
            </tr>
           }
        </tbody>
      </table>
    </div>
  )
}

export default StationListPage


