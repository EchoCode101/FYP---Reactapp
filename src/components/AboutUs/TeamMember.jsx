import styled from "styled-components";
import PropTypes from "prop-types";

const TeamMember = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  background-color: #f8f8f8;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Bio = styled.div`
  margin-left: 20px;
`;

const Name = styled.h4`
  font-size: 1.5rem;
  margin-bottom: 5px;
`;

const Position = styled.p`
  font-weight: bold;
  color: #555;
  margin-bottom: 10px;
`;

const Description = styled.p`
  color: #333;
  line-height: 1.5;
`;

const TeamMemberCard = ({ src, alt, memberName, title, briefBio }) => {
  return (
    <TeamMember>
      <img
        src={src}
        alt={alt}
        style={{
          borderRadius: "50%",
          objectFit: "cover",
          height: "180px",
          width: "180px",
        }}
      />
      <Bio>
        <Name>{memberName}</Name>
        <Position>{title}</Position>
        <Description>{briefBio}</Description>
      </Bio>
    </TeamMember>
  );
};
TeamMemberCard.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
  memberName: PropTypes.string,
  title: PropTypes.string,
  briefBio: PropTypes.string,
};
export default TeamMemberCard;
