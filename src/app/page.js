import dynamic from 'next/dynamic';

// Lazy load components
const HomePage = dynamic(() => import('@/components/Homecomponent/page'), {
  loading: () => <p>Loading Home Page...</p>, // Optional loading fallback
  ssr: false, // Disable SSR for this component to load only on the client
});

const Engineering = dynamic(() => import('@/components/engineering/page'), {
  loading: () => <p>Loading Engineering Section...</p>, // Optional loading fallback
  ssr: false, // Disable SSR to enable client-side loading
});

const Page = () => {
  return (
    <main className="flex flex-col items-center justify-center w-full">
      {/* Home Page Section */}
      <section
        className="min-h-[300px] w-full flex items-center justify-center bg-gray-100"
        aria-label="Home Page Section"
      >
        <HomePage />
        
      </section>

      {/* Engineering Section */}
      <div className="mt-6">
        {/* Second component */}
        <div className="flex justify-center align-middle font-semibold text-2xl border-[1px] border-solid border-dark dark:border-light text-black dark:text-light rounded-lg p-4 sticky top-6 max-h-[80vh]" >
       Engineering Blogs & Courses 

        </div>
       <div className=" mt-6 "> <article  style={{ minHeight: '300px', width: '100%' }}>
          <Engineering />
        </article></div>
      </div>
    </main>
  );
};

export default Page;
