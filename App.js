import { Toast } from "react-native-toast-message/lib/src/Toast";
import { Moeda } from "./src/main/moeda";
import { StatusBar } from "expo-status-bar";

export default function App() {
  return (
    <>
      <StatusBar
        backgroundColor='#000'
        style="light"
        translucent={false}
      />
      <Moeda />
      <Toast />
    </>
  );
}

