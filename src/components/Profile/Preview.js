import { Divider, Row, Col } from 'antd';
import './Preview.css'
function Preview({firstName, lastName, pronouns, birthday, description, competencyAreas, profileImage}) {
  return (
    <Row className="Preview">
      {
        profileImage &&
          <Col flex="auto">
            <img src={profileImage} alt="Profile Picture"/>
          </Col>
      }

      <Col flex="auto">
        <h2 className="profile-name">{firstName} {lastName}</h2>
        {pronouns &&
          pronouns.map((pronoun, index) => (
            <div key={index} className="pronoun">{pronoun}</div>
          ))
        }
        {birthday}

        {description &&
          <>
            <Divider orientation="left" plain> Description </Divider>
            <p>{description}</p>
          </>
        }

        {competencyAreas &&
          <>
            <Divider orientation="left" plain> Desired Competency Areas </Divider>
            {competencyAreas.map((area, index) => (
              <div key={index}>Looking for {area} Competency</div>
            ))}
          </>
        }
      </Col>
    </Row>
  )
}

export default Preview;
