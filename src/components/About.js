import React from "react";
import styled from "styled-components";
import tim_profile from "../images/tim_profile.jpg";
import pattern from "../images/pattern.jpg";

export default function About() {
  return (
    <StyledAboutSection>
      <StyledHeader>
        <div>
          <h1>Tim Borg</h1>
          <h3>Spotify Clone</h3>
        </div>
        <img
          src={tim_profile}
          alt=""
          style={{ height: "400px", width: "400px", borderRadius: "50%" }}
        />
      </StyledHeader>
      <StyledMain>
        <section>
          <p>
            This is my final project for <span>React Web Development</span>{" "}
            course.
          </p>
          <p>Minimum requirements for this course were:</p>
          <ul>
            <li> ES6 Syntax</li>
            <li> Nested Components</li>
            <li> Using React Router</li>
          </ul>
          <p> There were some other bonus achievements such as</p>
          <ul>
            <li>Type checking</li>
            <li>Styled components</li>
            <li>Animations</li>
          </ul>

          <p>
            I found this project very challenging as working with the spotify
            API required authentication. I was able to achieve all the minimum
            requirements and make use of styled components.
          </p>
        </section>
        <div></div>
      </StyledMain>
    </StyledAboutSection>
  );
}

const StyledAboutSection = styled.div`
  width: 100vw;
  color: black;
`;

const StyledHeader = styled.header`
  color: white;
  display: flex;
  justify-content: space-between;
  padding: 8em;
  background-repeat: no-repeat;
  height: 29vh;
`;

const StyledMain = styled.main`
  color: white;
  display: grid;
  grid-template-columns: 1fr 1fr;
  font-size: 1.5em;
`;
