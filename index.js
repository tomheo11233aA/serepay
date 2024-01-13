/**
 * @format
 */

import {AppRegistry, Text, LogBox} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import store from '@redux/store/store';
import { Provider } from 'react-redux';
import i18n from './src/language/i18n'
LogBox.ignoreLogs(['Warning: Failed prop type: Invalid prop `value` of type `number` supplied to `TextInput`, expected `string`.'])
const Root = () => (
    <Provider store={store}>
        <App />
    </Provider>
)

Text.defaultProps = Text.defaultProps || {}
Text.defaultProps.allowFontScaling = false

AppRegistry.registerComponent(appName, () => Root);
