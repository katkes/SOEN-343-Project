import { useParams } from 'react-router-dom';
export const Event: React.FC = () => {
  const { id } = useParams();
  const userId = "<something>";
  return (
    <div>
      <h1>Event id: {id}</h1>
      <h1>User id: {userId}</h1>
    </div>
  );
};
