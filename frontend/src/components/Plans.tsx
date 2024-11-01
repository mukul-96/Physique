import { FaCheckCircle } from 'react-icons/fa';

interface Plan {
    name: string;
    description: string;
    price: number;
    days: number;
    active: boolean;
}

interface PlansProps {
    plans: Plan[];
}

export default function Plans({ plans }: PlansProps) {
    return (
        <div className=" p-8 ">
            <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Our Plans</h2>
            <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {plans.map((plan, index) => (
                    <li 
                        key={index} 
                        className="relative bg-white border rounded-lg p-6 hover:shadow-xl transition-shadow duration-300 "
                    >
                        <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-sm font-semibold  ${
                            plan.active ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                        }`}>
                            {plan.active ? 'Active' : 'Inactive'}
                        </div>

                        <h3 className="mt-10 text-2xl font-bold text-custom-brown">{plan.name}</h3>

                        <p className="text-3xl font-semibold text-custom-brown mt-2">
                            ${plan.price} 
                        </p>
                        <p className="text-gray-500 mb-4">for {plan.days} days</p>

                        <hr className="my-4 border-gray-300" />

                        <ul className="space-y-2">
                            <li className="flex items-center">
                                <FaCheckCircle className="text-pink-500 text-lg mr-2" />
                                <span className="text-gray-600">Diet Plan</span>
                            </li>
                            <li className="flex items-center">
                                <FaCheckCircle className="text-pink-500 text-lg mr-2" />
                                <span className="text-gray-600">Personal Training</span>
                            </li>
                            <li className="flex items-center">
                                <FaCheckCircle className="text-pink-500 text-lg mr-2" />
                                <span className="text-gray-600">Equipment Access</span>
                            </li>
                            <li className="flex items-center">
                                <FaCheckCircle className="text-pink-500 text-lg mr-2" />
                                <span className="text-gray-600">24/7 Gym Access</span>
                            </li>
                            <li className="flex items-center">
                                <FaCheckCircle className="text-pink-500 text-lg mr-2" />
                                <span className="text-gray-600">Group Classes</span>
                            </li>
                            <li className="flex items-center">
                                <FaCheckCircle className="text-pink-500 text-lg mr-2" />
                                <span className="text-gray-600">Sauna & Spa Access</span>
                            </li>
                            <li className="flex items-center">
                                <FaCheckCircle className="text-pink-500 text-lg mr-2" />
                                <span className="text-gray-600">Locker Room</span>
                            </li>
                            <li className="flex items-center">
                                <FaCheckCircle className="text-pink-500 text-lg mr-2" />
                                <span className="text-gray-600">Free Parking</span>
                            </li>
                        </ul>

                        
                    </li>
                ))}
            </ul>
        </div>
    );
}
