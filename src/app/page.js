import dynamic from 'next/dynamic';
import HomePage from '@/components/Homecomponent/page';

// Lazy load the Courses component


const Page = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      {/* Home Page Section */}
      <div style={{ minHeight: '300px', width: '100%' }}>
        <HomePage />
      </div>

      {/* Lazy-loaded Courses Section */}
      
    </div>
  );
};

export default Page;
