import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import headerImg from "./img1.png";
import aboutImg from "./aboutImg.jpg";
import { ArrowRightCircle } from 'react-bootstrap-icons';
import "./Banner.css";
import TrackVisibility from 'react-on-screen';

const Banner = () => {
  const [loopNum, setLoopNum] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [text, setText] = useState('');
  const [delta, setDelta] = useState(300 - Math.random() * 100);
  const toRotate = ["Employment", "Opportunities", "Empowerment", "Door-Step Service"];
  const period = 2000;

  useEffect(() => {
    let ticker = setInterval(() => {
      tick();
    }, delta);

    return () => { clearInterval(ticker) };
  }, [text]);

  const tick = () => {
    let i = loopNum % toRotate.length;
    let fullText = toRotate[i];
    let updatedText = isDeleting ? fullText.substring(0, text.length - 1) : fullText.substring(0, text.length + 1);

    setText(updatedText);

    if (isDeleting) {
      setDelta(prevDelta => prevDelta / 2);
    }

    if (!isDeleting && updatedText === fullText) {
      setIsDeleting(true);
      setDelta(period);
    } else if (isDeleting && updatedText === '') {
      setIsDeleting(false);
      setLoopNum(loopNum + 1);
      setDelta(500);
    }
  };

  return (
    <>
      <section className="banner" id="home">
        <Container>
          <Row className="align-items-center">
            <Col xs={12} md={6} xl={7}>
              <TrackVisibility>
                {({ isVisible }) =>
                  <div className={isVisible ? "animate__animated animate__fadeIn" : ""}>
                    <span className="tagline">Welcome to JobLink</span>
                    <h1> <span className="txt-rotate" data-period="2000" data-rotate='["Empowerment", "Employment", "Door-Step Service"]'><span className="wrap">{text}</span></span></h1>
                    <p>Connecting Opportunities, Empowering Lives </p>
                    <button onClick={() => console.log('about')}>Get Started <ArrowRightCircle size={25} /></button>
                  </div>}
              </TrackVisibility>
            </Col>
            <Col xs={12} md={6} xl={5}>
              <TrackVisibility>
                {({ isVisible }) =>
                  <div className={isVisible ? "animate__animated animate__zoomIn" : ""}>
                    <img src={headerImg} alt="Header Img" />
                  </div>}
              </TrackVisibility>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="about">
        <Container>
          <Row className="align-items-center">
            <Col xs={12} md={6}>
              <div className="about-img">
                <img src={aboutImg} alt="About Img" />
              </div>
            </Col>
            <Col xs={12} md={6}>
              <div className="about-content">
                <h2>About Us</h2>
                <p>
                  At JobLink, we address the pressing global challenge of rising unemployment rates, particularly among youth, exacerbated by inaccessible opportunities and entrenched recommendation systems. Our solution eliminates barriers imposed by recommendation systems and middlemen agencies, empowering direct and transparent connections between job seekers and employers. With a focus on promoting sustainable economic growth and reducing inequalities, JobLink aligns with the United Nations Sustainable Development Goals 1, 4, and 8, driving meaningful change toward a more equitable future.
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="contact">
        <Container>
          <h2>Contact Us</h2>
          <Row>
            <Col xs={12} md={6}>
              <div className="contact-info">
                <h3>Social Media</h3>
                <ul>
                  <li>Facebook: <a href="#">JobLink</a></li>
                  <li>Twitter: <a href="#">@JobLink</a></li>
                  <li>Instagram: <a href="#">@JobLink</a></li>
                </ul>
              </div>
            </Col>
            <Col xs={12} md={6}>
              <form className="contact-form">
                <input type="text" placeholder="Your Name" />
                <input type="email" placeholder="Your Email" />
                <textarea placeholder="Your Message"></textarea>
                <button type="submit">Send Message</button>
              </form>
            </Col>
          </Row>
        </Container>
      </section>

      <footer className="footer">
        <Container>
          <p>&copy; JobLink 2024</p>
        </Container>
      </footer>
    </>
  )
}

export default Banner;
