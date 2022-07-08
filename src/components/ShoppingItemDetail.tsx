import { useParams } from 'react-router-dom';

const ShoppingItemDetail = () =>{
  const { name } = useParams()
  return (
    <div>{name}</div>
  )
};

export default ShoppingItemDetail