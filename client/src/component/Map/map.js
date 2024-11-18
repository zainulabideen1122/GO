
import React, { useEffect, useState } from 'react';
import { DirectionsRenderer, GoogleMap, Marker, OverlayView, useJsApiLoader } from '@react-google-maps/api';
import sourceIcon from "../../media/go_dropOff_img.png"

function GoogleMapSection({ mapHeight, setPickUp, pickUp, dropOff }) {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [directionRoutePoints, setDirectionRoutePoints] = useState([])

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const location = { lat: latitude, lng: longitude };
        setCurrentLocation(location);
        setPickUp({
          ...pickUp,
          location: location,
        });
        console.log("User location:", location);
      },
      (error) => {
        console.error("Error fetching location:", error);
        const defaultLocation = { lat: 22.54992, lng: 0 };
        setCurrentLocation(defaultLocation);
        setPickUp({
          ...pickUp,
          location: defaultLocation,
        });
      }
    );
  }, [setPickUp]);

  const containerStyle = {
    width: '100vw',
    height: mapHeight,
  };

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API,
  });

  const [map, setMap] = useState(null);

  useEffect(() => {
    console.log("dropOff @@", dropOff);
  }, [dropOff]);

  const onLoad = React.useCallback((map) => {
    console.log("Map loaded:", map);
    setMap(map);
    if (pickUp && pickUp.location) {
      console.log("Only pickUp location is available:", pickUp.location);
      map.setCenter(pickUp.location);
    }
  }, [pickUp, dropOff]);

  const onUnmount = React.useCallback((map) => {
    setMap(null);
  }, []);

  useEffect(() => {
    if (map && pickUp.location && dropOff && dropOff.location) {
      const bounds = new window.google.maps.LatLngBounds();
      bounds.extend(pickUp.location);
      bounds.extend(dropOff.location);
      map.fitBounds(bounds);

    const zoomLevel = map.getZoom();
    map.setZoom(zoomLevel + 0.2);
    directionRoute()
    }
  }, [map, pickUp, dropOff]);

  const directionRoute = () => {
    const directionService = new window.google.maps.DirectionsService();
    if (pickUp.location && dropOff && dropOff.location) {
      directionService.route(
        {
          origin: {
            lat: pickUp.location.lat,
            lng: pickUp.location.lng,
          },
          destination: {
            lat: dropOff.location.lat,
            lng: dropOff.location.lng,
          },
          travelMode: window.google.maps.TravelMode.DRIVING,
        },
        (result, status) => {
          if (status === window.google.maps.DirectionsStatus.OK) {
            setDirectionRoutePoints(result)
          } else {
            console.error('Directions request failed due to ' + status);
          }
        }
      );
    }
  };
  

  return isLoaded && currentLocation ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={pickUp.location || currentLocation}  // Fallback to currentLocation
      zoom={17}
      options={{
        disableDefaultUI: true,
        zoomControl: true,
      }}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      <Marker 
        position={pickUp.location || currentLocation}
        icon={{
            url:'/go_pickUp_img.png',
            scaledSize:{
                width:20,
                height:20
            }
          }}
      >
        {pickUp && (
  <OverlayView
    position={pickUp.location || currentLocation}
    mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
  >
    <div
      style={{
        padding: '2px',
        background: 'white',
        fontWeight: 'bold',
        display: 'inline-block',
      }}
    >
      <p
        style={{
          color: 'black',
          fontSize: '10px',
          margin: 0, 
          whiteSpace: 'nowrap',
          overflow: 'hidden', 
          textOverflow: 'ellipsis', 
        }}
      >
        {pickUp?.name?.label || pickUp?.value?.name?.label
          ? (pickUp?.name?.label || pickUp?.value?.name?.label).slice(0, 20).replace(/\n/g, ' ')
          : 'Unknown Location'}
      </p>
    </div>
  </OverlayView>
)}

      </Marker>
      {/* DropOff marker if location is available */}
      {dropOff && dropOff.location && (
        <Marker
          position={dropOff.location}
          icon={{
            url:'/go_dropOff_img.png',
            scaledSize:{
                width:20,
                height:20
            }
          }}
        >
            {console.log("<-- ",dropOff)}
            {dropOff && <OverlayView 
                        position={dropOff.location}
                        mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
                    >
                    <div style={{ padding: '2px', background: 'white', fontWeight: 'bold', display: 'inline-block' }}>
                    <p
                        style={{
                        color: 'black',
                        fontSize: '10px',
                        margin: 0,
                        whiteSpace: 'nowrap', 
                        overflow: 'hidden', 
                        textOverflow: 'ellipsis',
                        }}
                    >
                        {dropOff.name.label.slice(0, 20).replace(/\n/g, ' ')} {/* Replace newlines with spaces */}
                    </p>
                    </div>
        </OverlayView>}
        </Marker>
      )}

      <DirectionsRenderer
        directions={directionRoutePoints}
        options={{
            polylineOptions:{
                strokeColor: '#000',
                strokeWeight: 5
            },
            suppressMarkers:true
        }}
      />

    </GoogleMap>
  ) : (
    <></>
  );
}

export default GoogleMapSection;
