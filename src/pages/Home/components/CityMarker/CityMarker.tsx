import React, { useCallback, useEffect, useState } from 'react'
import { Marker, Popup } from 'react-leaflet';

import { AsyncStatus } from '../../../../common/types';
import { getLatAndLng } from './api/LatitudeAndLongitude';
import { ICityMarker } from './CityMarker.types';

const CityMarker: React.FC<ICityMarker> = ({ city }) => {
    const [loadingStatus, setLoadingStatus] = useState<AsyncStatus>(AsyncStatus.Idle);
    const [latitude, setLatitude] = useState(0);
    const [longitude, setLongitude] = useState(0);

    const geocode = useCallback(async () => {
        setLoadingStatus(AsyncStatus.Loading);

        try {
            const geocode: any = await getLatAndLng(city.stacja);
            const result = geocode.results[0].geometry.location;

            if(result.lat !== 0 && result.lng !== 0) {
                setLatitude(result.lat)
                setLongitude(result.lng)
                setLoadingStatus(AsyncStatus.Success);
            }     
            console.log(city.stacja)
            console.log(geocode.results[0].geometry.location.lat);
        }
        catch (error) {
            console.log(`Error: ${error}`);
            setLoadingStatus(AsyncStatus.Error);
        }

    }, [city.stacja]);

    useEffect(() => {
        geocode();
    }, [geocode])

    return (
        <>
        { loadingStatus !== AsyncStatus.Loading && latitude !== 0 && longitude !== 0 && (
        <Marker position={[latitude, longitude]}>
            <Popup>
                <strong>Miasto: </strong> {city.stacja}
                <br />
                <strong>Miasto: </strong> {city.temperatura}
            </Popup>
        </Marker>
        )}
        </>
    )
}

export default CityMarker;