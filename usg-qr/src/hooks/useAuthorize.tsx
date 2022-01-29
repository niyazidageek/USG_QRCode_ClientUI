import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

export function useAuthorize(validRoles: any) {
  const [isAuthorized, setIsAuthorized] = useState(true);

  let roles = useSelector((state: any) => state.authReducer.roles);

  useEffect(() => {
    if (roles != null) {
      if (validRoles != undefined) {
        let authorized = roles.some((role: any) => {
          let check = validRoles.some((vr: any) => {
            return vr == role;
          });
          return check;
        });

        setIsAuthorized(authorized);
      }
    }
  });
  return isAuthorized;
}
