import ac from '../utilities/images/air_conditioner.svg'; 
import group from '../utilities/images/group.svg';
import dumbell from '../utilities/images/dumbell.svg';
import cycle2 from '../utilities/images/cycle2.svg';
import locker from '../utilities/images/locker.svg';
import meditation from '../utilities/images/meditation.svg';
import bicepflex from '../utilities/images/bicepflex.svg';
import parking from '../utilities/images/parking.svg';
import childcare from '../utilities/images/childcare.svg';
import sauna from '../utilities/images/sauna.svg';
import bag from '../utilities/images/bag.svg';
import cafe from '../utilities/images/cafe.svg';
import wifi from '../utilities/images/wifi.svg';

const amenities = [
  'Cardio Machines',
  'Free Weights',
  'Strength Training Machines',
  'Functional Training Area',
  'Group Fitness Studios',
  'Personal Training Services',
  'Locker Rooms',
  'Sauna/Steam Room',
  'Childcare Services',
  'Juice Bar/Café',
  'Meditation Area',
  'Wi-Fi Access',
  'Parking',
  'Advanced Air Filtration',
  'CrossFit Area'
];

const amenitiesIcons = {
  'Cardio Machines': cycle2,
  'Free Weights': dumbell,
  'Strength Training Machines': bicepflex,
  'Functional Training Area': bag,
  'Group Fitness Studios': group,
  'Personal Training Services': bag,
  'Locker Rooms': locker,
  'Sauna/Steam Room': sauna,
  'Childcare Services': childcare,
  'Juice Bar/Café': cafe,
  'Meditation Area': meditation,
  'Wi-Fi Access': wifi,
  'Parking': parking,
  'Advanced Air Filtration': ac,
  'CrossFit Area': bag
};

export default function FeaturesCard() {
  return (
    <div className="p-8 bg-white rounded-2xl  max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
        What This Place Offers
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {amenities.map((amenity, index) => (
          <div
            key={index}
            className="flex items-center space-x-4 p-4  rounded-lg shadow-sm 
             hover:scale-125 transform transition duration-200 ease-in-out"
          >
            {amenitiesIcons[amenity] && (
              <img
                src={amenitiesIcons[amenity]}
                alt={`${amenity} icon`}
                className="w-10 h-10 opacity-90 hover:opacity-100 transition-opacity duration-300"
              />
            )}
            <span className="text-lg font-medium text-gray-700">
              {amenity}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
