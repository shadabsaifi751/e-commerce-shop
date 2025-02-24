import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'; // Import the default styles

const SkeletonLoading = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
      {Array.from({ length: 6 }).map((_, index) => (
        <div key={index} className="border p-4 rounded shadow">
          <Skeleton height={256} className="mb-2" /> 
          <Skeleton width="75%" className="mb-2" />
          <Skeleton width="50%" className="mb-2" />
          <Skeleton width="25%" />
        </div>
      ))}
    </div>
  );
};

export default SkeletonLoading;