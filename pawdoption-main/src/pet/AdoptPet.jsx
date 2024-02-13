import PageNav from "../components/PageNav";
import PetContainer from "../components/PetContainer";
import { usePetContext } from "../context/petContext";
function AdoptPet() {
  const { pets } = usePetContext();

  return (
    <div>
      <PageNav />
      <h1 className="text-center mt-10">Select the pet you want to adopt</h1>
      <div className="flex gap-10">
        {pets.map((pets) => {
          return <PetContainer pets={pets} />;
        })}
      </div>
    </div>
  );
}

export default AdoptPet;
