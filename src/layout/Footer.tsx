import styled from "styled-components";

const FooterSection = styled.footer`
  height: 80px;
  text-align: center;
  border-top: 1px solid gray;
  font-size: 0.7rem;
  color: white;
  background-color: black;
  width: 100%;
`;

function Footer() {
  return <FooterSection>© 2024 토론방. All rights reserved. </FooterSection>;
}
export default Footer;
