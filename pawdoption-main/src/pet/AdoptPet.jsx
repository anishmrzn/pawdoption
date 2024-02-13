import PageNav from "../components/PageNav";
import { usePetContext } from "../context/petContext";
function AdoptPet() {
  const { pets } = usePetContext();
  console.log(pets);
  return (
    <div>
      <PageNav />
      AdoptPet
    </div>
  );
}

export default AdoptPet;
