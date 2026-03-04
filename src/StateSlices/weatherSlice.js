import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchWeatherApi = createAsyncThunk("weatherApi", async ({ lang, lat, lon }) => {
    try {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${import.meta.env.VITE_API_KEY}&units=metric&lang=${lang}`);
        const cityName = response.data.name;
        const temp = response.data.main.temp;
        const tempMax = response.data.main.temp_max;
        const tempMin = response.data.main.temp_min;
        const description = response.data.weather[0].description;
        const icon = response.data.weather[0].icon;
        return { cityName, temp, tempMax, tempMin, description, icon };
    } catch (error) {
        console.error("Error fetching weather data:", error);
        throw error; 
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
        state.load = true;
      })
      .addCase(fetchWeatherApi.fulfilled, (state, action) => {
        state.load = false;
        state.weatherData = action.payload;
      });
  },
});
export default weatherSlice.reducer;
