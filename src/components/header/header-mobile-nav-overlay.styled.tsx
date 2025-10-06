import styled from "styled-components";
import Button from "../ui/button";
import { Link } from "react-router-dom";

export const MobileNavOverlayContainer = styled.div<{ 
    bgColor: string ,
$primaryColor:string,
$tertiaryColor:string,
$isOpen:boolean
}>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: ${({ bgColor }) => bgColor};
  z-index: 1000;
  height: 100vh;
  width: 100vw;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap:${({ theme }) => theme.spacing["16"]};
  color: ${({$primaryColor})=> $primaryColor};
  transform: ${({$isOpen})=> $isOpen ? 'translateX(0)' : 'translateX(-100%)'};
  transition: transform ease-in 0.2s;
  @media (min-width: ${({ theme }) =>`${theme.layout.container.tablet.maxWidth}`}) {
    display: none;
  }
  & h4 {
    ${({ theme }) => theme.typography.paragraph["12/400"]};
    text-transform: uppercase;
     color: ${({$tertiaryColor})=> $tertiaryColor};
  }
  & .nav-links {
    display: flex;
    flex-direction: column;
    list-style:none;
    & li > a{
        display:inline-block;
        color:inherit;
        text-decoration:none;
        padding:${({ theme }) => `${theme.spacing["16"]} ${theme.spacing["12"]}`}
    }
  }
`;
export const OverlayHeader =styled.div`
display: flex;
align-items: center;
justify-content: space-between;

& button{
   display: flex;
}
`
export const LogoutButton = styled(Button)<{ $color: string }>`
display: inline-block;
  width: 100%;
  color: ${({ $color }) => $color};
  text-align: left;
  background: none;
  border:none;
 ${({ theme }) => theme.typography.paragraph['20/400']}
`;
export const LoginButton = styled(Link)<{ $color: string }>`
  display: inline-block;
  color: ${({ $color }) => $color};
  padding: ${({ theme }) => `${theme.spacing["16"]} ${theme.spacing["16"]}`};
  border: 1px solid ${({ $color }) => $color};
  width: 100%;
  text-align: center;
  text-decoration:none;
`;

export const NavAvatarWrapper=styled.div<{
    $tertiaryColor:string
}>`
display: flex;
align-items: center;
gap: ${({ theme }) => theme.spacing["08"]};
padding: 0 ${({theme})=> theme.spacing["16"]};
& h3{
    ${({theme:{typography}})=> typography.paragraph["20/400"]}
}

& p{
      ${({theme:{typography}})=> typography.paragraph["12/400"]}
      color: ${({$tertiaryColor})=> $tertiaryColor};
}

& img{
    height: ${({theme})=> theme.spacing["48"]};
    width: ${({theme})=> theme.spacing["48"]};
    border-radius: ${({theme})=> theme.spacing["24"]};
}
`

export const AppearanceWrapper = styled.div<{$isAuthenticated:boolean}>`
display: flex;
flex-direction: column;
gap: ${({theme})=> theme.spacing["08"]};

& .theme-actions{
    display: flex;
    flex-direction: ${({$isAuthenticated})=> $isAuthenticated ? 'row' : 'column'};
    gap: ${({theme})=> theme.spacing["24"]};

    & button{
        flex: 1 0;
        border:none;
        display: flex ;
        align-items: center;
        gap: ${({theme})=> theme.spacing["08"]} ;
        justify-content: flex-start;
        color: inherit;
         ${({theme:{typography}})=> typography.paragraph["20/400"]}
    }
}
`