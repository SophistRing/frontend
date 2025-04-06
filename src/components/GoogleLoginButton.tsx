import { GoogleLogin } from "@react-oauth/google";
import { GoogleOAuthProvider } from "@react-oauth/google";
import axios from "axios";
import styled from "styled-components";

const LoginButtonContainer = styled.button`
  width: 50%;
  padding: 12px;
  background: white;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  cursor: pointer;

  &:hover {
    background: #f1f1f1;
  }
`;

function GoogleLoginButton() {
  return (
    <LoginButtonContainer>
      <GoogleOAuthProvider
        clientId={import.meta.env.VITE_APP_GOOGLE_AUTH_CLIENT_ID}
      >
        <GoogleLogin
          onSuccess={async (res) => {
            console.log("login SUCCESS", res);
            const sr = {
              code: res,
              redirectUrl: "/",
            };
            const data = await axios.post(
              "https://7760-115-91-214-5.ngrok-free.app/login/google/2",
              sr
            );
            console.log(data);
          }}
          onError={() => {
            console.log("Login Failed");
          }}
        />
      </GoogleOAuthProvider>
    </LoginButtonContainer>
  );
}

export default GoogleLoginButton;
