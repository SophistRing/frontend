import styled from "styled-components";

const FooterSection = styled.footer`
  height: 80px;
  text-align: center;
  border-top: 1px solid gray;
  font-size: 1rem;
  color: white;
  background-color: black;
  width: 100%;
  padding-top: 20px;
`;

function Footer() {
  return <FooterSection>© 2024 토론방. All rights reserved. </FooterSection>;
}
export default Footer;
