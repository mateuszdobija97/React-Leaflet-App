import { httpGet } from "../../../common/http/httpService"
import { ICityWeatherInformation } from "./ICityWeatherInformation";

export const getCities = (): Promise<ICityWeatherInformation[]> => {
    return httpGet("https://danepubliczne.imgw.pl/api/data/synop");
};