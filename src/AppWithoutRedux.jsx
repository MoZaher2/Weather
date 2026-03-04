import './App.css'
import Container from '@mui/material/Container';
import { Typography, Button } from '@mui/material';
import CloudIcon from '@mui/icons-material/Cloud';
import axios from 'axios';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import moment from 'moment';
import "moment/dist/locale/ar";
import { useTranslation } from 'react-i18next';
moment.locale("en");

const theme = createTheme({
  typography: {
    fontFamily: 'IBM'
  },
});
let cancelAxios = null
function App() {

  const { t, i18n } = useTranslation();
  const [load, setLoad] = useState(false)
  const [lang, setLang] = useState("en")
  const [time, setTime] = useState("")
  const [data, setData] = useState({ cityName: "", temp: null, tempMax: null, tempMin: null, description: "", icon: "" })
  useEffect(() => {
    setLoad(true)
    setTime(moment().format('dddd Do MMMM YYYY'))
    axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=28.078324&lon=30.7903248&appid=${import.meta.env.VITE_API_KEY}&units=metric&lang=${lang}`, {
      cancelToken: new axios.CancelToken((c) => {
        cancelAxios = c
      })
    })
      .then((res) => {
        setData({
          cityName: res.data.name
          , temp: res.data.main.temp
          , tempMax: res.data.main.temp_max
          , tempMin: res.data.main.temp_min
          , description: res.data.weather[0].description
          , icon: res.data.weather[0].icon
        })
        setLoad(false)
      })
      .catch((error) => {
        console.log(error);
      })

    return () => {
      cancelAxios()
    }
  }, [lang])


  const handleLanguageChange = () => {
    if (lang == "ar") {
      moment.locale("en");
      setLang("en")
      i18n.changeLanguage("en")
    }
    else {
      moment.locale("ar");
      setLang("ar")
      i18n.changeLanguage("ar")
    }
    setTime(moment().format('dddd Do MMMM YYYY'))
  }
  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="sm" style={{ color: 'white', height: "100vh", display: 'flex', justifyContent: 'center', alignItems: 'center' }}
        dir={lang == 'ar' ? 'rtl' : 'ltr'}>
        <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
          <div style={{ background: 'rgb(28 52 91 / 36%)', padding: '0px 10px', borderRadius: '15px', boxShadow: '0px 11px 1px rgba(0,0,0,0.5)' }}>
            {/* City && Date */}
            <div style={{ display: 'flex', alignItems: 'end', gap: '20px', padding: '10px 15px' }}>
              <Typography variant="h2">
                {load ? "loading" : data.cityName}
              </Typography>
              <Typography variant="h6">
                {time}
              </Typography>
              {/*== City && Date ==*/}
            </div>
            <hr />
            {/* Card Content */}
            <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
              {/* Temp && Description */}
              <div>
                <div style={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
                  <Typography variant='h1'>{Math.round(data.temp)}</Typography>
                  {/* Image From API */}
                  <img src={`https://openweathermap.org/img/wn/${data.icon}@2x.png`} alt="img" />
                  {/*== Image From API ==*/}
                </div>
                <Typography variant='h6'>{load ? "loading" : data.description}</Typography>
                {/* MAX && MIN */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h5>{t("min")}: {load ? "loading" : data.tempMin}</h5>
                  <Typography variant='h5' style={{ margin: '0px 5px' }}>|</Typography>
                  <h5>{t("max")}: {load ? "loading" : data.tempMax}</h5>
                </div>
                {/*== MAX && MIN ==*/}
              </div>
              {/*== Temp && Description ==*/}
              {/* Cloud Icon */}
              <CloudIcon className='cloudIcon' />
              {/*== Cloud Icon ==*/}
            </div>
            {/*== Card Content ==*/}
          </div>
          <div style={{ display: 'flex', justifyContent: 'end', marginTop: '20px' }}>
            <Button variant="text" style={{ color: "white" }} onClick={handleLanguageChange}>
              {lang == "ar" ? "انجليزى" : "Arabic"}
            </Button>
          </div>
        </div>
      </Container>

    </ThemeProvider>
  )
}

export default App
