import React, { useCallback, useEffect, useState, } from 'react'
import { MapContainer, TileLayer } from 'react-leaflet';
import { LatLngTuple } from 'leaflet';

import { AsyncStatus } from '../../common/types';
import { getCities } from './api/CityWeatherInformation';
import { ICityWeatherInformation } from './api/ICityWeatherInformation';

import './Home.css';

import { CityMarker } from './components/CityMarker';

const Home: React.FC = () => {
    const position: LatLngTuple = [52.18, 19.35]

    const [cities, setCities] = useState<ICityWeatherInformation[]>([]);
    const [loadingStatus, setLoadingStatus] = useState<AsyncStatus>(AsyncStatus.Idle);

    const updateCities = useCallback(async () => {
        setLoadingStatus(AsyncStatus.Loading);

        try {
            const _cities = await getCities();
            setLoadingStatus(AsyncStatus.Success);
            setCities(_cities);
        }
        catch (error) {
            console.log(`Error: ${error}`);
            setLoadingStatus(AsyncStatus.Error);
        }
    }, []);

    useEffect(() => {
        updateCities();
    }, [updateCities]);

    const renderCities = () => {
        return cities.map(city => (
            <CityMarker
                key={city.id_stacji}
                city={city}
            ></CityMarker>
        ))
    }

    return (
        <>
        { (loadingStatus === AsyncStatus.Loading || !cities.length) ? 
        (<p>Loading...</p>) :
        (
            <MapContainer id='mapId' center={position} zoom={7}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                />
                { cities && renderCities() }
            </MapContainer>
        )}
        </>
    )
}

export default Home;