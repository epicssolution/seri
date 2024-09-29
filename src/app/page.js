import HomePage from '@/components/Homecomponent/page';
import Engineering from '@/components/engineering/page';

// Lazy load the Courses component


const Page = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      {/* Home Page Section */}
      <div style={{ minHeight: '300px', width: '100%' }}>
        <HomePage />
      </div>
      <div style={{ minHeight: '300px', width: '100%' }}>
        <Engineering />
      </div>


      {/* Lazy-loaded Courses Section */}
      
    </div>
  );
};

export default Page;
