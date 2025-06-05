const CallToAction = () => {
  return (
    <>
      {/* Call to Action Section */}
      <section className='py-20 text-center bg-gradient-to-r from-purple-700 to-indigo-800'>
        <div className='container mx-auto px-4'>
          <h2 className='text-4xl font-bold mb-4'>Pour Your First Cup</h2>
          <p className='mb-6 text-lg max-w-xl mx-auto'>
            Thousands are connecting daily over ChayerCup. Ready to join the
            conversation?
          </p>
          <button className='btn btn-warning btn-lg shadow-md'>
            Start Chatting
          </button>
        </div>
      </section>
    </>
  );
};

export default CallToAction;
