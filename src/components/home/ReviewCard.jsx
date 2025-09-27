
import { motion } from 'framer-motion';
import { FaStar, FaQuoteLeft, FaUserAlt } from 'react-icons/fa';
import { format } from 'date-fns';

const ReviewCard = ({ review }) => {
  const { member, rating, comment, created_at } = review;
  const fullName = `${member.first_name} ${member.last_name}`;
  const formattedDate = format(new Date(created_at), 'MMMM d, yyyy');
  
  // Generate star rating display
  const renderStars = () => {
    return Array(5).fill(0).map((_, i) => (
      <FaStar 
        key={i} 
        className={`${i < rating ? 'text-yellow-400' : 'text-gray-600'} inline-block`} 
      />
    ));
  };

  return (
    <motion.div 
      className="bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 h-full flex flex-col border border-gray-700 hover:border-brand/30"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center mb-4">
        <div className="w-12 h-12 rounded-full bg-gray-700 flex items-center justify-center mr-4 overflow-hidden ring-2 ring-brand/30">
          {member.profile_picture_url ? (
            <img 
              src={member.profile_picture_url} 
              alt={fullName} 
              className="w-full h-full object-cover"
            />
          ) : (
            <FaUserAlt className="text-gray-400 text-xl" />
          )}
        </div>
        <div>
          <h4 className="font-semibold text-white">{fullName}</h4>
          <div className="flex items-center">
            <div className="mr-2">{renderStars()}</div>
            <span className="text-sm text-gray-400">{rating}.0</span>
          </div>
        </div>
      </div>
      
      <div className="mb-4 flex-grow">
        <FaQuoteLeft className="text-brand/40 text-xl mb-3" />
        <p className="text-gray-300 italic pl-2 border-l-2 border-brand/30">
          {comment}
        </p>
      </div>
      
      <div className="text-sm text-gray-400 mt-auto pt-3 border-t border-gray-700">
        {formattedDate}
      </div>
    </motion.div>
  );
};

export default ReviewCard;