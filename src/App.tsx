import React, { useContext } from "react";
import FooterPlayer from "./components/FooterPlayer/index.tsx";
import { DemoContext } from "./context/index.tsx";
import Route from "./router/index.jsx";
import { CustomProvider } from 'rsuite';

function App() {
  const { player_lists, theme } = useContext(DemoContext);
  
  return (
    <CustomProvider theme={theme}>
      {
        // 判断player_lists是否有值
        player_lists.length > 0 ? <FooterPlayer /> : null
      }
      <Route />
    </CustomProvider>
  );
}

export default App;
