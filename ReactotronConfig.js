import Reactotron from "reactotron-react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { reactotronRedux } from "reactotron-redux";

export default Reactotron.setAsyncStorageHandler(AsyncStorage)
    .configure({
        name: "React Native Debugging Mode",
    })
    .useReactNative({
        asyncStorage: true,
        networking: {
            ignoreUrls: /symbolicate/,
        },
        editor: false,
        errors: { veto: (stackFrame) => false },
        overlay: false,
    })
    .use(reactotronRedux())
    .connect();

