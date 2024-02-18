import { useEffect } from "react";
import Footer from "../components/Footer";
import PageNav from "../components/PageNav";

function Blog() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <PageNav />
      <div className="bg-gray-100 min-h-screen flex items-center justify-center my-10">
        <div className="bg-white p-8 rounded shadow-lg w-full">
          <h1 className="text-3xl font-semibold mb-6 text-center">
            Pawfect Care Tips
          </h1>

          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">
              1. Nutrition Nuggets: A Balanced Diet for Optimal Health
            </h2>
            <p className="text-gray-700">
              Ensure your pet gets a well-balanced diet tailored to their breed,
              size, and age. Consult your veterinarian for advice on the best
              food options and remember, treats are great in moderation!
            </p>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">
              2. Exercise Essentials: Keep Those Tails Wagging
            </h2>
            <p className="text-gray-700">
              Regular exercise is key for your pet's physical and mental
              well-being. Daily walks, playtime, and interactive toys are
              excellent ways to keep them active and healthy.
            </p>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">
              3. Grooming Galore: Pamper Your Pet with Love
            </h2>
            <p className="text-gray-700">
              Regular grooming not only keeps your pet looking adorable but also
              contributes to their overall health. Brush their coat, trim their
              nails, and clean their ears to keep them happy and healthy.
            </p>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">
              4. Vet Visits: Preventive Healthcare for a Happy Life
            </h2>
            <p className="text-gray-700">
              Routine vet check-ups are essential to catch any potential health
              issues before they become serious. Vaccinations, parasite
              prevention, and dental care are integral parts of your pet's
              preventive healthcare plan.
            </p>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">
              5. Safe Havens: Creating a Pet-Friendly Environment
            </h2>
            <p className="text-gray-700">
              Make your home safe and comfortable for your pet. Secure toxic
              substances, remove hazards, and create a designated space with
              their bed and toys. A happy and stress-free environment
              contributes to their overall well-being.
            </p>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">
              6. Mental Stimulation: Enriching Your Pet's Life
            </h2>
            <p className="text-gray-700">
              Pets need mental stimulation too. Interactive toys, puzzle
              feeders, and playtime not only keep them entertained but also
              stimulate their cognitive abilities. A happy and engaged pet is a
              healthy pet.
            </p>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">
              7. Love and Affection: The Best Medicine
            </h2>
            <p className="text-gray-700">
              Remember, shower your pet with love and affection. Spend quality
              time together, engage in bonding activities, and create a strong
              emotional connection. The love you give is reciprocated tenfold.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Blog;
