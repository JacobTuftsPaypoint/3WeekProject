/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';
import { Provider as PaperProvider } from 'react-native-paper';

export default function Main() {
    return(
        <PaperProvider>
            <App />
        </PaperProvider>
    )
}

// gh

AppRegistry.registerComponent(appName, () => Main);
