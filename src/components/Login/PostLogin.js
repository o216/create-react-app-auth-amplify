import { Redirect } from 'react-router-dom';

function PostLogin ({messages, hasPassedValidation, hasSignedUp}){
  const visibleMessages = messages.filter(message => message.isVisible);
  if (visibleMessages.length === 0 && !hasPassedValidation) {
    return null;
  }

  if (visibleMessages.length === 0 && hasPassedValidation && !hasSignedUp) {
    return <Redirect to="/profile"/>;
  }

  if (visibleMessages.length === 0 && hasPassedValidation && hasSignedUp) {
    return <Redirect to="/search"/>;
  }

  return (
    <div>
    {
      visibleMessages
      .map((message) => (
        <p key={message.id}>{message.text}</p>
      ))
    }
    </div>
  );
}

export default PostLogin;
