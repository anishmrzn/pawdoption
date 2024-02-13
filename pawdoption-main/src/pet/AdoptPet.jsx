import PageNav from "../components/PageNav";
import PetContainer from "../components/PetContainer";
import { usePetContext } from "../context/petContext";
function AdoptPet() {
  const { pets } = usePetContext();
  console.log(pets);
  return (
    <div>
      <PageNav />
      <div>
        {pets.map((pets) => {
          return <PetContainer pets={pets} />;
        })}
      </div>
    </div>
  );
}

export default AdoptPet;
