import { motion } from "framer-motion";
import styled from "styled-components";
import TeamMemberCard from "./TeamMember";
import { Link } from "react-router-dom";
import ScrollTopBtn from "../SmoothScroll";
const Section = styled.section`
  padding: 50px 20px;
  max-width: 1280px;
  margin: auto;
`;

const Heading = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 20px;
  text-align: center;
`;

const SubHeading = styled.h3`
  font-size: 2rem;
  margin-bottom: 15px;
`;

const Paragraph = styled.p`
  font-size: 1.125rem;
  margin-bottom: 20px;
  line-height: 1.6;
`;
const AboutUs = () => {
  return (
    <Section>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <Heading>About Us</Heading>
        <Paragraph>
          Welcome to our project, &quot;Career Counselling & Roadmap to Higher
          Education,&quot; a comprehensive online resource designed to empower
          students with valuable information about academic courses,
          scholarships, and career paths.
        </Paragraph>
      </motion.div>

      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <SubHeading>Our Mission</SubHeading>
        <Paragraph>
          Our mission is to empower students by providing a user-friendly
          platform that offers comprehensive information on academic courses,
          scholarships, and career insights, facilitating well-informed
          decision-making.
        </Paragraph>
        <SubHeading>Our Vision</SubHeading>
        <Paragraph>
          We envision a future where every student has access to the necessary
          resources and guidance to make informed decisions about their academic
          and career paths.
        </Paragraph>
      </motion.div>

      <motion.div
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <SubHeading>Our Story</SubHeading>
        <Paragraph>
          Founded by Muhammad Hamza Sajjad and Muhammad Talha Shahid, this
          project is the culmination of our academic journey at the Government
          College University Faisalabad, where we aimed to create a meaningful
          impact on students&apos; lives by providing valuable educational
          resources.
        </Paragraph>
      </motion.div>

      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <SubHeading>Our Values</SubHeading>
        <ul className="d-flex">
          <li
            style={{
              border: "2px solid #777777cf",
              display: "flex",
              flexDirection: "column",
              minWidth: "140px",
              maxWidth: "fit-content",
              maxHeight: "100px",
              minHeight: "fit-content",
              margin: "5px",
              backgroundColor: "#fdfdfd",
              textAlign: "start",
              padding: "8px",
              borderRadius: "8px",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "16px",
              fontWeight: "500",
            }}
          >
            Empowerment
          </li>
          <li
            style={{
              border: "2px solid #777777cf",
              display: "flex",
              flexDirection: "column",
              minWidth: "140px",
              maxWidth: "fit-content",
              maxHeight: "100px",
              minHeight: "fit-content",
              margin: "5px",
              backgroundColor: "#fdfdfd",
              textAlign: "start",
              padding: "8px",
              borderRadius: "8px",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "16px",
              fontWeight: "500",
            }}
          >
            Accessibility
          </li>
          <li
            style={{
              border: "2px solid #777777cf",
              display: "flex",
              flexDirection: "column",
              minWidth: "140px",
              maxWidth: "fit-content",
              maxHeight: "100px",
              minHeight: "fit-content",
              margin: "5px",
              backgroundColor: "#fdfdfd",
              textAlign: "start",
              padding: "8px",
              borderRadius: "8px",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "16px",
              fontWeight: "500",
            }}
          >
            Reliability
          </li>
        </ul>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <SubHeading>Meet the Team</SubHeading>
        <TeamMemberCard
          src="../../../homePageImgs/hamza.JPG"
          alt="Muhammad Hamza Sajjad"
          memberName="Muhammad Hamza Sajjad"
          title="CEO of this Project"
          briefBio="I am an undergraduate student of BSCS at GCUF, nearing the completion of my program. This application is my final year project. I live in Faisalabad, Punjab, and I am a quick learner. I learned to write React in just under 6 months, and I am eager to explore more exciting tools and technologies in the future!"
        />
        <TeamMemberCard
          src="../../../homePageImgs/talha.jpg"
          alt="Muhammad Talha Shahid"
          memberName="Muhammad Talha Shahid"
          title="Co-Founder of this Project"
          briefBio="I am an undergraduate student of BSCS at GCUF. Collaborating on this project has been a significant part of my academic journey. I am passionate about leveraging technology to provide educational support and resources to students."
        />
      </motion.div>

      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <SubHeading>What We Offer</SubHeading>
        <Paragraph>
          Our platform provides a comprehensive database of academic courses,
          detailed information on available scholarships, and career insights
          from professionals across various fields. It aims to support students
          in making well-informed decisions about their academic and
          professional futures.
        </Paragraph>
      </motion.div>

      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <SubHeading>Our Achievements</SubHeading>
        <Paragraph>
          As a testament to our dedication, our project has successfully
          established a significant online presence and has been recognized for
          its contribution to student empowerment and educational support.
        </Paragraph>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <SubHeading>Giving Back</SubHeading>
        <Paragraph>
          We are committed to community involvement and social responsibility,
          continuously striving to enhance our platform&apos;s impact and
          accessibility.
        </Paragraph>
      </motion.div>
      <hr />
      <section id="contact">
        <div className="container">
          <h1>Get In Touch</h1>
          <div className="row">
            <div className="col-md-6">
              <form className="contact-form">
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Your Name"
                    required
                  />
                </div>
                <div className="form-group">
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Phone no."
                    required
                  />
                </div>
                <div className="form-group">
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Email ID"
                    required
                  />
                </div>
                <div className="form-group">
                  <textarea
                    className="form-control"
                    placeholder="Message"
                    rows="4"
                    required
                  ></textarea>
                </div>
              </form>
              <button className="ms-3 btn btn-primary">Send Message</button>
            </div>
            <div className="col-md-6 contact-info">
              <div className="follow">
                <i className="fa fa-map-marker"></i> <b>Address:</b> XYZ Road,
                Faisalabad, Pakistan
              </div>
              <div className="follow">
                <i className="fa fa-phone"></i> <b>Phone:</b> +1 1234567890
              </div>
              <div className="follow">
                <i className="fa fa-envelope-o"></i> <b>Email:</b>{" "}
                example@website.com
              </div>
              <div className="follow">
                <label>
                  <b>Get Social:</b>
                </label>
                <Link to="/">
                  <i className="fa fa-facebook"></i>
                </Link>
                <Link to="/">
                  <i className="fa fa-youtube-play"></i>
                </Link>
                <Link to="/">
                  <i className="fa fa-twitter"></i>
                </Link>
                <Link to="/">
                  <i className="fa fa-linkedin"></i>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      <ScrollTopBtn />
    </Section>
  );
};

export default AboutUs;
