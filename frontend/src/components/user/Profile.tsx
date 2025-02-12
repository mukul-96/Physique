import { useState, useEffect } from "react";
import Navbar from "./Navbar";
import { jwtDecode } from "jwt-decode";
import { useFetchUser } from "../../hooks";
import { useNavigate } from "react-router-dom";

interface MyJwtPayload {
  id: string;
}





export default function Profile() {
  const [userId, setUserId] = useState<number>(0);
  const [showLimit, setShowLimit] = useState<number>(3); 
  const navigate = useNavigate();

  useEffect(() => {
    const userToken = localStorage.getItem("token") || localStorage.getItem("authorization");
    if (userToken) {
      
      try {
        const decoded = jwtDecode<MyJwtPayload>(userToken);
        setUserId(parseInt(decoded.id));
      } catch (error) {
        console.error("Invalid token", error);
      }
    }
  }, []);

  const { user, loading, error } = useFetchUser(userId);

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (error) return <div className="text-center text-red-500 mt-10">{error}</div>;

  const loadMore = () => {
    setShowLimit(prevLimit => prevLimit + 3); 
  };
  const logoutHandler=()=>{
    localStorage.removeItem("authorization");
    navigate('/signin')
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className=" mx-auto p-6 bg-white shadow-md mt-28 rounded-lg">
        {user && (
          <section id="profile_overview" className="p-6 bg-neutral-100">
          <div className=" mx-auto" id="el-9oxa6blw">
            <div className="bg-white rounded-xl border border-neutral-200 p-6 mb-6" id="el-3hxvoccx">
              <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6" id="el-jpl1drfv">
                <div className="w-24 h-24 rounded-full bg-neutral-200 flex-shrink-0" id="el-i701nfjk"></div>
                <div className="flex-grow" id="el-9fo5d8gz">
                  <h1 className="text-2xl font-bold mb-2" id="el-id7zrzyq">{user.name.toUpperCase()}</h1>
                  <p className="text-neutral-600 mb-4" id="el-rj09l2pm">Fitness Enthusiast • Member since 2023</p>
                  <div className="flex flex-wrap gap-4" id="el-g8god5za">
                    <div className="flex items-center gap-2" id="el-06jxpvph">
                      <span className="w-3 h-3 rounded-full bg-green-500" id="el-23eg43hk"></span>
                      <span className="text-sm" id="el-2syfsk5y">Active</span>
                    </div>
                    <div className="text-sm text-neutral-600" id="el-6r72q0eq">|</div>
                    <div className="text-sm text-neutral-600" id="el-idk0qovl">Age: {user.age}</div>
                    <div className="text-sm text-neutral-600" id="el-t82b4x7f">|</div>
                    <div className="text-sm text-neutral-600" id="el-y51rafjk">Height: 5'10"</div>
                    <div className="text-sm text-neutral-600" id="el-qe5pdn0l">|</div>
                    <div className="text-sm text-neutral-600" id="el-cb4qrg2r">Weight: {user.weight} kgs</div>
                  </div>
                </div>
                <button onClick={logoutHandler} className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors" id="el-sp50e6oz">
                  Logout
                </button>
              </div>
            </div>
        
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6" id="el-hn1s90iq">

            <div className="bg-white rounded-xl border border-neutral-200 p-6" id="el-9w9uvbuh">
                <h3 className="text-sm text-neutral-600 mb-2" id="el-zo57y0l7">Remaining Balance</h3>
                <p className="text-2xl font-semibold" id="el-dm8bk0is">₹ {user.balance}</p>
                <div className="mt-2 text-sm text-neutral-600" id="el-5pa5lx1e">4 pending</div>
              </div>

              <div className="bg-white rounded-xl border border-neutral-200 p-6" id="el-75m79nv3">
                <h3 className="text-sm text-neutral-600 mb-2" id="el-4o6z51jt">Workouts Completed</h3>
                <p className="text-2xl font-bold" id="el-cewybt1s">248</p>
                <div className="mt-2 text-sm text-green-600" id="el-z8ui7oec">↑ 12% this month</div>
              </div>
              
              <div className="bg-white rounded-xl border border-neutral-200 p-6" id="el-stn6u8k1">
                <h3 className="text-sm text-neutral-600 mb-2" id="el-5bi4jhlv">Current Streak</h3>
                <p className="text-2xl font-bold" id="el-aqbkfc6t">14 days</p>
                <div className="mt-2 text-sm text-green-600" id="el-2fjnnv5w">Personal Best: 21 days</div>
              </div>
              
              <div className="bg-white rounded-xl border border-neutral-200 p-6" id="el-3my52bva">
                <h3 className="text-sm text-neutral-600 mb-2" id="el-98fzllxe">Total Time</h3>
                <p className="text-2xl font-bold" id="el-uru0urdr">186 hrs</p>
                <div className="mt-2 text-sm text-green-600" id="el-w9vsgfv6">↑ 8% this month</div>
              </div>
              
              
            </div>
        
            {/* <!-- Recent Activity --> */}
            <div className="bg-white rounded-xl border border-neutral-200 p-6" id="el-und0j15j">
              <div className="flex justify-between items-center mb-6" id="el-y5l44h5y">
                <h2 className="text-lg font-bold" id="el-0os82c68">Recent Activity</h2>
                <button className="text-sm text-red-600 hover:text-red-700" id="el-avb2qchl">View All</button>
              </div>
              
              <div className="space-y-4" id="el-tk8nr2tv">
                <div className="flex items-center gap-4 p-4 rounded-lg hover:bg-neutral-50" id="el-1x9y6enm">
                  <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center" id="el-ydbq9o6w">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-600" viewBox="0 0 20 20" fill="currentColor" id="el-jdso9ydl">
                      <path fill-rule="evenodd" d="M10 3a1 1 0 00-1 1v4H5a1 1 0 100 2h4v4a1 1 0 102 0v-4h4a1 1 0 100-2h-4V4a1 1 0 00-1-1z" clip-rule="evenodd" id="el-t2a94gvc"></path>
                    </svg>
                  </div>
                  <div className="flex-grow" id="el-pjekicmi">
                    <h3 className="font-medium" id="el-k8furu7b">Completed Upper Body Workout</h3>
                    <p className="text-sm text-neutral-600" id="el-3gqjrccu">45 minutes • 6 exercises</p>
                  </div>
                  <span className="text-sm text-neutral-600" id="el-fy8x69q9">2h ago</span>
                </div>
        
                <div className="flex items-center gap-4 p-4 rounded-lg hover:bg-neutral-50" id="el-vvse9io4">
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center" id="el-o7fc1dae">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" viewBox="0 0 20 20" fill="currentColor" id="el-tnrxiqlb">
                      <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" id="el-9ignmvhv"></path>
                      <path fill-rule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clip-rule="evenodd" id="el-kxwmerzi"></path>
                    </svg>
                  </div>
                  <div className="flex-grow" id="el-uqcqll3l">
                    <h3 className="font-medium" id="el-sa74u1z1">Updated Nutrition Plan</h3>
                    <p className="text-sm text-neutral-600" id="el-prcr9ob8">Added new meal plans</p>
                  </div>
                  <span className="text-sm text-neutral-600" id="el-drjjknyi">5h ago</span>
                </div>
        
                <div className="flex items-center gap-4 p-4 rounded-lg hover:bg-neutral-50" id="el-qa3vmxn6">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center" id="el-fz000z5i">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" viewBox="0 0 20 20" fill="currentColor" id="el-allavt29">
                      <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd" id="el-82ccelbu"></path>
                    </svg>
                  </div>
                  <div className="flex-grow" id="el-g8nttfzo">
                    <h3 className="font-medium" id="el-15eo6ex5">Scheduled Training Session</h3>
                    <p className="text-sm text-neutral-600" id="el-yg25xykf">Tomorrow at 10:00 AM</p>
                  </div>
                  <span className="text-sm text-neutral-600" id="el-6tje2jbc">8h ago</span>
                </div>
              </div>
            </div>
          </div>
          <div>
          <section id="nutrition_planner" className="p-6 bg-neutral-100">
  <div className=" mx-auto" id="el-o81mu1r9">
    <div className="flex justify-between items-center mb-6" id="el-si2pxjf0">
      <h1 className="text-2xl font-bold" id="el-9y7o19o4">Nutrition Planner</h1>
      <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors" id="el-oiolo4gb">
        Log Meal
      </button>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6" id="el-qzhxxnz2">
      <div className="bg-white rounded-xl border border-neutral-200 p-6" id="el-96j1en24">
        <div className="flex items-center justify-between mb-4" id="el-66uhb0gb">
          <h3 className="font-medium" id="el-ou4rcnuu">Calories</h3>
          <span className="text-sm text-neutral-600" id="el-2fiznhav">Goal: 2400</span>
        </div>
        <div className="relative pt-1" id="el-n6fdpk2b">
          <div className="flex mb-2 items-center justify-between" id="el-luavsovb">
            <div id="el-l0aun2g1">
              <span className="text-xs font-semibold inline-block text-red-600" id="el-gkbuyv95">1840 / 2400</span>
            </div>
            <div id="el-43v8c91y">
              <span className="text-xs font-semibold inline-block text-neutral-600" id="el-oun5w7i7">77%</span>
            </div>
          </div>
          <div className="overflow-hidden h-2 text-xs flex rounded bg-neutral-200" id="el-f72d7nor">
            <div style={{width: "77%"}} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-red-600" id="el-0q792hxt"></div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-neutral-200 p-6" id="el-fnr4gjgz">
        <div className="flex items-center justify-between mb-4" id="el-4jl4dky0">
          <h3 className="font-medium" id="el-yo2p3ajw">Protein</h3>
          <span className="text-sm text-neutral-600" id="el-3ypwz57h">Goal: 180g</span>
        </div>
        <div className="relative pt-1" id="el-jl7baifz">
          <div className="flex mb-2 items-center justify-between" id="el-tqvre55g">
            <div id="el-2a5gqnw1">
              <span className="text-xs font-semibold inline-block text-blue-600" id="el-1y5owvpx">145 / 180g</span>
            </div>
            <div id="el-mw5f8exk">
              <span className="text-xs font-semibold inline-block text-neutral-600" id="el-7cur9lbh">80%</span>
            </div>
          </div>
          <div className="overflow-hidden h-2 text-xs flex rounded bg-neutral-200" id="el-f8r5q4wm">
            <div style={{width: "80%"}} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-600" id="el-jlaqpwx0"></div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-neutral-200 p-6" id="el-zo4voexq">
        <div className="flex items-center justify-between mb-4" id="el-wlu5y1iz">
          <h3 className="font-medium" id="el-xam08j11">Carbs</h3>
          <span className="text-sm text-neutral-600" id="el-y7uitjzj">Goal: 300g</span>
        </div>
        <div className="relative pt-1" id="el-4v7ejttz">
          <div className="flex mb-2 items-center justify-between" id="el-nsl1zlo4">
            <div id="el-nys3ks1k">
              <span className="text-xs font-semibold inline-block text-green-600" id="el-8e68qmyc">220 / 300g</span>
            </div>
            <div id="el-vk6na5or" className="">
              <span className="text-xs font-semibold inline-block text-neutral-600" id="el-znt57l87">73%</span>
            </div>
          </div>
          <div className="overflow-hidden h-2 text-xs flex rounded bg-neutral-200" id="el-vbhl18ob">
            <div style={{width: "73%"}} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-600" id="el-cp8hul84"></div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-neutral-200 p-6" id="el-zhd69896">
        <div className="flex items-center justify-between mb-4" id="el-g41ifh6y">
          <h3 className="font-medium" id="el-ixy3878r">Fats</h3>
          <span className="text-sm text-neutral-600" id="el-zgd1vv1d">Goal: 65g</span>
        </div>
        <div className="relative pt-1" id="el-m9kjksvs">
          <div className="flex mb-2 items-center justify-between" id="el-csjvg2e5">
            <div id="el-cqlxoows">
              <span className="text-xs font-semibold inline-block text-yellow-600" id="el-dtzmlomx">45 / 65g</span>
            </div>
            <div id="el-vmvuibmx">
              <span className="text-xs font-semibold inline-block text-neutral-600" id="el-b4mqdhy8">69%</span>
            </div>
          </div>
          <div className="overflow-hidden h-2 text-xs flex rounded bg-neutral-200" id="el-pf2wf4uw">
            <div style={{width: "69%"}} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-yellow-600" id="el-mgcmv8up"></div>
          </div>
        </div>
      </div>
    </div>

    <div className="bg-white rounded-xl border border-neutral-200 p-6 mb-6" id="el-0z4d68q9">
      <h2 className="text-lg font-bold mb-6" id="el-wxf8uv6g">Today's Meals</h2>
      
      <div className="space-y-4" id="el-1fwq99de">
        <div className="flex items-center gap-4 p-4 border border-neutral-200 rounded-lg" id="el-si9yyz9n">
          <div className="w-12 h-12 rounded-lg bg-amber-100 flex items-center justify-center" id="el-3ycau5d7">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" id="el-m42qi7ql">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="{2}" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707" id="el-7mu29zpi"></path>
            </svg>
          </div>
          <div className="flex-grow" id="el-d8l1ffk1">
            <div className="flex justify-between" id="el-owngtxi1">
              <h3 className="font-medium" id="el-zwrdh6os">Breakfast</h3>
              <span className="text-sm text-neutral-600" id="el-5he80poe">8:00 AM</span>
            </div>
            <p className="text-sm text-neutral-600" id="el-p5kulek3">Oatmeal with Banana and Protein Shake</p>
            <div className="text-sm text-neutral-600 mt-1" id="el-pvsaup3z">520 cal • 45g protein • 68g carbs • 12g fat</div>
          </div>
        </div>

        <div className="flex items-center gap-4 p-4 border border-neutral-200 rounded-lg" id="el-rsisgbhe">
          <div className="w-12 h-12 rounded-lg bg-orange-100 flex items-center justify-center" id="el-gfazqgr5">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" id="el-dxh2l05x">
              <path strokeLinecap="round" strokeWidth="{2}" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707" id="el-zj0pyp3d"></path>
            </svg>
          </div>
          <div className="flex-grow" id="el-fw7p09rn">
            <div className="flex justify-between" id="el-jouryd7e">
              <h3 className="font-medium" id="el-epx8iqy1">Lunch</h3>
              <span className="text-sm text-neutral-600" id="el-etp289ju">12:30 PM</span>
            </div>
            <p className="text-sm text-neutral-600" id="el-4a7o8qa0">Grilled Chicken Salad </p>
            <div className="text-sm text-neutral-600 mt-1" id="el-381jweha">650 cal • 52g protein • 45g carbs • 18g fat</div>
          </div>
        </div>

        <div className="flex items-center gap-4 p-4 border border-neutral-200 rounded-lg" id="el-go7mn8bd">
          <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center" id="el-arfok6or">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" id="el-c31jlo6f">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="{2}" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707" id="el-7d94d370"></path>
            </svg>
          </div>
          <div className="flex-grow" id="el-lddt0stw">
            <div className="flex justify-between" id="el-aypfjfnp">
              <h3 className="font-medium" id="el-hjpeb8j3">Dinner</h3>
              <span className="text-sm text-neutral-600" id="el-mtz4mc5s">7:00 PM</span>
            </div>
            <p className="text-sm text-neutral-600" id="el-mxc243aq">Chicken with Sweet Potato and Vegetables</p>
            <div className="text-sm text-neutral-600 mt-1" id="el-jghou4fr">670 cal • 48g protein • 52g carbs • 15g fat</div>
          </div>
        </div>
      </div>
    </div>
    <div className="bg-white rounded-xl border border-neutral-200 p-6" id="el-6vpvimv4">
      <div className="flex justify-between items-center mb-6" id="el-t6u04hg5">
        <h2 className="text-lg font-bold" id="el-6kokbuls">Meal Recommendations</h2>
        <button className="text-sm text-red-600 hover:text-red-700" id="el-4nfcvrmc">View All</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6" id="el-drbyxe3d">
        <div className="border border-neutral-200 rounded-lg overflow-hidden" id="el-dodr5kxg">
          <div className="h-48 bg-neutral-100" id="el-91osx3kd"></div>
          <div className="p-4" id="el-8ro690k8">
            <h3 className="font-medium mb-2" id="el-us8a25ui">High-Protein Breakfast Bowl</h3>
            <p className="text-sm text-neutral-600" id="el-wya1fg6g">Perfect for post-workout recovery</p>
            <div className="flex items-center gap-4 mt-4" id="el-2bandqf4">
              <span className="text-sm text-neutral-600" id="el-kuiqccox">480 cal</span>
              <span className="text-sm text-neutral-600" id="el-54ad3qwn">42g protein</span>
            </div>
          </div>
        </div>

        <div className="border border-neutral-200 rounded-lg overflow-hidden" id="el-9pryo4j4">
          <div className="h-48 bg-neutral-100" id="el-aucvfj6q"></div>
          <div className="p-4" id="el-7i5f4uih">
            <h3 className="font-medium mb-2" id="el-1m1ujmp9">Lean Chicken Wrap</h3>
            <p className="text-sm text-neutral-600" id="el-lw0peeb4">Quick and nutritious lunch option</p>
            <div className="flex items-center gap-4 mt-4" id="el-1aevkaq9">
              <span className="text-sm text-neutral-600" id="el-6rtw52ix">420 cal</span>
              <span className="text-sm text-neutral-600" id="el-qjkzb1vz">35g protein</span>
            </div>
          </div>
        </div>

        <div className="border border-neutral-200 rounded-lg overflow-hidden" id="el-x47ts1kk">
          <div className="h-48 bg-neutral-100" id="el-yx1mkl4w"></div>
          <div className="p-4" id="el-60xbrxc7">
            <h3 className="font-medium mb-2" id="el-0wwo9mxb">Brown Rice Power Bowl</h3>
            <p className="text-sm text-neutral-600" id="el-b97m7fhv">Balanced dinner with complete proteins</p>
            <div className="flex items-center gap-4 mt-4" id="el-3qzu6pdr">
              <span className="text-sm text-neutral-600" id="el-mhp74lyd">550 cal</span>
              <span className="text-sm text-neutral-600" id="el-fb6w9wcz">28g protein</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
          </div>
          <div>
          <section>
           <h3 className="text-xl font-bold mb-4">Payment History</h3>
           {user.memberships && user.memberships.length > 0 ? (
             <div className="space-y-4">
               {user.memberships
                 .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                 .slice(0, showLimit)
                 .map((membership) => (
                   <div key={membership.id} className="p-4 bg-gray-50 rounded-lg shadow-sm">
                     <p className="text-gray-600">
                     </p>
                     <p className="text-gray-600">
                       <span className="font-semibold">Date:</span> {new Date(membership.date).toLocaleDateString()}
                     </p>
                     <p className="text-gray-600">
                       <span className="font-semibold">Subscription:</span> {membership.subscription}
                     </p>
                     <p className="text-gray-600">
                       <span className="font-semibold">Branch ID:</span> {membership.branchId}
                     </p>
                   </div>
                 ))}
               
               {showLimit < user.memberships.length && (
                 <p
                   onClick={loadMore}
                   className="mt-4 text-blue-500 cursor-pointer hover:underline"
                 >
                   Load More
                 </p>
               )}
             </div>
           ) : (
             <p className="text-gray-500">No payment history found.</p>
           )}
         </section>
          </div>
          
        </section>
          
        )}
        
      </div>
    </div>
  );
}
