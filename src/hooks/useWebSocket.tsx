import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { HubConnectionBuilder } from "@microsoft/signalr";

export function useWebSocket(listenerMethod:string, callback:any) {
  const jwt = useSelector((state: any) => state.authReducer.jwt);
  const [connection, setConnection]: any = useState(null);
  const url: any = process.env.REACT_APP_BROADCAST_HUB;
  const options = {
    accessTokenFactory: () => jwt
  };

  useEffect(() => {
    const newConnection = new HubConnectionBuilder()
      .withUrl(url, options)
      .withAutomaticReconnect()
      .build();

    setConnection(newConnection);
  }, []);

  useEffect(() => {
    if (connection) {
      connection
        .start()
        .then((result:any) => {
          console.log("Connected!");
          connection.on(listenerMethod,()=>callback());
        })
        .catch((e:any) => console.log("Connection failed: ", e));
    }
  }, [connection]);
}
