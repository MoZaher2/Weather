import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// export const fetchWeatherApi = createAsyncThunk("weatherApi", async () => {
//     console.log("gggggggggggggg")
//   const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=28.078324&lon=30.7903248&appid=${import.meta.env.VITE_API_KEY}&units=metric&lang=en`);
// console.log(response)
//   //   const cityName = response.data.name;
// //   const temp = response.data.main.temp;
// //   const tempMax = response.data.main.temp_max;
// //   const tempMin = response.data.main.temp_min;
// //   const description = response.data.weather[0].description;
// //   const icon = response.data.weather[0].icon;
// //   console.log({ cityName, temp, tempMax, tempMin, description, icon });
// //   return { cityName, temp, tempMax, tempMin, description, icon };
// });

export const fetchWeatherApi = createAsyncThunk("weatherApi", async (lang) => {
    console.log("=============================")
    console.log(lang)
    try {
        console.log("Starting API call...");
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=28.078324&lon=30.7903248&appid=${import.meta.env.VITE_API_KEY}&units=metric&lang=${lang}`);
        const cityName = response.data.name;
        const temp = response.data.main.temp;
        const tempMax = response.data.main.temp_max;
        const tempMin = response.data.main.temp_min;
        const description = response.data.weather[0].description;
        const icon = response.data.weather[0].icon;
        console.log({ cityName, temp, tempMax, tempMin, description, icon });
        return { cityName, temp, tempMax, tempMin, description, icon };
    } catch (error) {
        console.error("Error fetching weather data:", error);
        throw error;  // سيؤدي هذا إلى إرجاع الحالة "rejected"
    }
});

export const weatherSlice = createSlice({
  name: "weather",
  initialState: {
    weatherData: {},
    load: false,
  },
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeatherApi.pending, (state) => {
        console.log(state.load)
        state.load = true;
      })
      .addCase(fetchWeatherApi.fulfilled, (state, action) => {
        state.load = false;
        state.weatherData = action.payload;
      });
  },
});
export default weatherSlice.reducer;
