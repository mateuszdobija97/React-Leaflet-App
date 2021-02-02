import { httpGet } from "../../../../../common/http/httpService";

const KEY = 'AIzaSyAv31pYUDrd8SqWbzBiBOCp6OrxCWSsNkM';

export const getLatAndLng = ( address: string ): Promise<any[]> => {
    console.log(address);
    return httpGet(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${KEY}`);
};