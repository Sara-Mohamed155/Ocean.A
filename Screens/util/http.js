import axios from "axios";

const BackEndURL  = 'https://gr433-5068f-default-rtdb.firebaseio.com'


 export async function fetchData () {
    const response = await axios.get(BackEndURL + '/Sensor.json');

    const data =[]
    console.log(response.data)
    for  (const key in response.data){
        const dataObj ={
            id:key,
            waterLev : response.data[key].waterLvl
        };
        data.p ush(dataObj);
    }
    return data;
}