import CarImageProps from "./CarImageProps";

interface CarsProps {
    id: string,
    name: string;
    year: string;
    model?: string;
    uid: string;
    price: string | number;
    city: string;
    km: string;
    description?: string;
    created?: string;
    owner?: string;
    whatsapp?: string;
    images: CarImageProps[]
  
  }
  
 export default CarsProps;