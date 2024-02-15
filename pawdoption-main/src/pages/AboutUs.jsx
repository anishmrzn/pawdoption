import PageNav from "../components/PageNav";

function AboutUs() {
  return (
    <div>
      <PageNav />
      <section className="text-center mt-10">
        <h1 className="text-3xl font-bold mb-5">About Us</h1>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-bold mb-3">Our Location</h2>

        <div className="mt-5">
          <iframe
            title="Our Location Map"
            src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d1766.6494992605492!2d85.31719333438105!3d27.677152231952658!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2snp!4v1707987136734!5m2!1sen!2snp"
            width="600"
            height="450"
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
