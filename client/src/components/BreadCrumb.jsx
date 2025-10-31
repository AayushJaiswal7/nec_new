import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// usage example
//     const items = [
//         { label: 'Admin', href: '/admin' },
//         { label: 'User Master', href: '/admin/user-master' },
//         { label: 'Add User', href: '/admin/user-master/add' }
//     ];
//     const handleBackRoute = () => {
//         console.log('Going back...');
//         alert('Back button clicked!');
//     };
//     return (
//         <Breadcrumb
//             items={items}
//             onBackRoute={handleBackRoute}
//         />
//     );


const Breadcrumb = ({ items, onBackRoute }) => {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center space-x-2 my-2">
      {/* Back Button */}
      {onBackRoute && (
        <button
          onClick={onBackRoute}
          className="flex bg-secondaryColor ml-2 p-2 rounded-md items-center text-gray-600 hover:text-white hover:bg-primaryColor transition-colors"
          aria-label="Go back"
        >
          <ChevronLeft size={14} strokeWidth={2} />
        </button>
      )}

      {/* Breadcrumb Items */}
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        
        return (
          <React.Fragment key={index}>
            {isLast ? (
              <span className="text-gray-900 font-medium text-base">
                {item.label}
              </span>
            ) : (
              <>
                <a
                  href={item.href}
                  onClick={(e) => {
                    if (item.onClick) {
                      e.preventDefault();
                      item.onClick();
                    }
                  }}
                  className="text-gray-600 hover:text-primaryColor transition-colors text-base"
                >
                  {item.label}
                </a>
                <ChevronRight size={14} strokeWidth={2} className="text-gray-400" />
              </>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
};

export default Breadcrumb;