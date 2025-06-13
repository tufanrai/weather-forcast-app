import { ISearch } from "@/interface/SearchInterface";
import { geoInstance } from "./apiInstance";

export const cityGeo = async (data: ISearch) => {
  try {
    const response = await geoInstance.get("/direct", {
      params: { q: data.city },
    });
    return response;
  } catch (err: any) {
    return err;
  }
};
