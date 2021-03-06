import styled from "styled-components";
import LinkHolder from "./LinkHolder";
import SubHeader from "../navigate/SubHeader";
import { baseFontSize, accent } from "../../rootStyledComponents";
import { UilPlus, UilBars } from "@iconscout/react-unicons";
import { useRef, useState, useEffect } from "react";
import { NavLinkHolder } from "../navigate/FeaturedList";

const MainNavLinkHolder = styled(LinkHolder)`
  font-size: ${baseFontSize};
  color: ${accent};
  padding: 0.1rem 1.25rem;
  margin: 0rem 0.15rem;
  :hover {
    color: ${accent};
    opacity: 1 !important;
  }
  @media (max-width: 768px) {
    padding: 1rem 0.5rem;
  }
`;

const MainNavLinkHolders = styled.div`
  display: flex;
  height: 100%;
  align-items: center;
  :hover ${MainNavLinkHolder} {
    opacity: 0.6;
    transition: opacity 1s;
  }
  @media (max-width: 768px) {
    position: fixed;
    display: flex;
    flex-direction: column;
    align-items: unset;
    padding: 16px;
    top: 0;
    left: 0;
    width: calc(100vw - 5rem);
    height: 100vh;
    background-color: white;
    display: ${({ display }) => (display ? "flex" : "none")};
  }
`;

const SubHeaderStyled = styled(SubHeader)`
  @media (min-width: 769px) {
    ${MainNavLinkHolder}:first-of-type:hover ~ & {
      opacity: 1;
      transform: translateX(0%) translateY(0%);
      transition: opacity 0.8s, transform 0.4s;
      pointer-events: all;
    }
  }
`;
const Icon = styled(UilPlus)`
  width: 16px;
  @media (min-width: 769px) {
    display: none;
  }
`;
const Wrapper = styled.div`
  width: 100%;
  @media (max-width: 768px) {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  @media (min-width: 769px) {
    :hover ~ ${SubHeaderStyled} {
      opacity: 1;
      transform: translateX(0%) translateY(0%);
      transition: opacity 0.8s, transform 0.4s;
      pointer-events: all;
    }
  }
`;
const CollapseIcon = styled(UilBars)`
  display: none;
  width: 48px;
  cursor: pointer;

  @media (max-width: 768px) {
    display: flex;
    align-self: center;
  }
`;
// const PlusIcon = styled(UilPlus)`
//   display: none;
//   @media (max-width: 768px) {
//     display: inline-block;
//   }
// `;
const Title = styled(LinkHolder)`
  display: block;
  font-family: "geometrix";
  padding: 0.1rem 1.25rem;
  margin: 0rem 0.15rem;
  font-size: 1.15em;
  font-weight: 200;
  margin-bottom: 1em;
  pointer-events: none;
  opacity: 0;
  :hover {
    opacity: 1 !important;
  }
  @media (max-width: 768px) {
    opacity: 0.6 !important;
    pointer-events: all;
    margin-bottom: 0.2em;
  }
`;
const List = styled.ul`
  padding: 0 28px;
  margin: 0;
  pointer-events: none;
  opacity: 0;
  height: 0;
  padding-bottom: 12px;

  &.active {
    height: 50px !important;
    opacity: 1;
    pointer-events: all;
    transition: opacity 0.5s, height 0.4s !important;
  }
`;
const Item = styled.li`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const WrapperDropD = styled.div`
  display: flex;
  justify-content: space-between;
  &,
  & + ${List} {
    @media (min-width: 769px) {
      display: none;
    }
  }
`;

export default () => {
  const [display, setDisplay] = useState(false);
  const [displayDropdowns, setDisplayDropdowns] = useState(false);
  const activeRef = useRef(null);
  const toggleDisplay = () => setDisplay(!display);
  const toggleDropdowns = () => setDisplayDropdowns(!displayDropdowns);
  const ref = useRef();
  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (display && ref.current && !ref.current.contains(e.target)) {
        setDisplay(false);
      }
    };
    document.addEventListener("mousedown", checkIfClickedOutside);
    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [display]);
  const toggle = () => {
    const element = activeRef?.current.classList;
    element.toggle("active");
    console.log(element);
  };
  return (
    <>
      <CollapseIcon onClick={toggleDisplay} />
      <MainNavLinkHolders ref={ref} display={display}>
        <Wrapper>
          <MainNavLinkHolder to={"shop"} name="Shop" />
          {display && <Icon onClick={toggleDropdowns} />}
        </Wrapper>
        {displayDropdowns && (
          <>
            <WrapperDropD>
              <Title name={"Featured"} />
              <Icon onClick={toggle} />
            </WrapperDropD>
            <List ref={activeRef}>
              <Item>
                <NavLinkHolder name={"Best Seller"} />
              </Item>
              <Item>
                <NavLinkHolder name={"New In"} />
              </Item>
              <Item>
                <NavLinkHolder name={"Back In Stock"} />
              </Item>
            </List>
          </>
        )}
        <MainNavLinkHolder name="Values" />
        <SubHeaderStyled />
      </MainNavLinkHolders>
    </>
  );
};
