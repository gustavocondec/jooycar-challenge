import axios from "axios";

export class OpenStreetMapService {
  static async getNameByCoordinates(latitude: number, longitude: number): Promise<string> {
    const apiUrl = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`;
    const { data } = await axios.get(apiUrl);
    return data?.display_name ?? "No se hallo nombre de ubicacion.";
  }
}
