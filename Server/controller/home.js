const axios = require("axios")

const GetPlaceDetails = async(req, res)=>{
    const {placeID} = req.params
    console.log(placeID)
    try {
        const response = await axios.get(`https://maps.googleapis.com/maps/api/place/details/json`, {
          params: {
            place_id: placeID,
            key: process.env.GOOGLE_API
          }
        });
        res.json(response.data);
      } catch (error) {
        res.status(500).send('Error fetching place details');
      }
}


module.exports = {GetPlaceDetails}