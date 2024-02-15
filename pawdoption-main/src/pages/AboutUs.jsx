import React from "react";
import PageNav from "../components/PageNav";

function AboutUs() {
  return (
    <div className="bg-gray-100">
      <PageNav />
      <section className="text-center mt-16">
        <h1 className="text-5xl font-extrabold mb-5 text-[#c9a687]">
          Welcome to Pawdoption
        </h1>
        <p className="text-lg text-gray-700">
          Connecting pets with loving families for a lifetime of joy and
          companionship.
        </p>
      </section>

      <section className="mt-16 p-8 md:p-16 bg-white rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold mb-8 text-[#c9a687]">Our Mission</h2>
        <p className="text-lg text-gray-700">
          At Pawdoption, our mission is to create a world where every pet finds
          a loving home. We believe in the power of the human-animal bond and
          strive to make the adoption process a joyful and fulfilling experience
          for both pets and their new families.
        </p>
      </section>

      <section className="mt-16">
        <h2 className="text-3xl font-bold mb-8 text-[#c9a687]">Our Location</h2>

        <div className="rounded-lg overflow-hidden shadow-lg">
          <iframe
            title="Our Location Map"
            src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d1766.6494992605492!2d85.31719333438105!3d27.677152231952658!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2snp!4v1707987136734!5m2!1sen!2snp"
            width="100%"
            height="400"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
      </section>
    </div>
  );
}

export default AboutUs;
