import React from "react";

export function useCurrentUser() {
  const [response, setResponse] = React.useState<{
    userName: string;
    pin: string;
  }>();
  return { setResponse, response };
}
