

// Define the component props
interface CountryMapProps {
  mapColor?: string;
}

const CountryMap: React.FC<CountryMapProps> = ({ mapColor }) => {
  return (
  <>this is map {mapColor}</>
  );
};

export default CountryMap;
