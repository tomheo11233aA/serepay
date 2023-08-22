/**
 * @format
 */

import {AppRegistry, Text} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import store from '@redux/store/store';
import { Provider } from 'react-redux';

const Root = () => (
    <Provider store={store}>
        <App />
    </Provider>
)

Text.defaultProps = Text.defaultProps || {}
Text.defaultProps.allowFontScaling = false

AppRegistry.registerComponent(appName, () => Root);
