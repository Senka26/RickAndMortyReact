import axios from "axios";

const baseURL =  import.meta.env.VITE_REACT_APP_API_URL;

const getCharacters = async (
  page: number,
  name?: string | null,
  status?: string | null,
  species?: string | null,
  gender?: string | null,
  type?: string | null
) => {
  try {
    const myParams = {
      page,
      ...(name && { name }),
      ...(status && { status }),
      ...(species && { species }),
      ...(gender && { gender }),
      ...(type && { type }),
    };

    const response = await axios.get(baseURL, { params: myParams });
    return response?.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export { getCharacters };