import axios from "axios";

export const fetchContentData = async () => {
  const res = await axios.get(
    "https://closet-recruiting-api.azurewebsites.net/api/data"
  );
  return res.data;
};
