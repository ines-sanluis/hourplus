import './styles.css'
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }) {
    return <LocalizationProvider dateAdapter={AdapterDayjs}>
        <link href='https://fonts.googleapis.com/css?family=Montserrat' rel='stylesheet'></link>
        <Component {...pageProps} />
    </LocalizationProvider>
}
