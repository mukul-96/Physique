import React from 'react';

interface Manager {
  id: number;
  name: string;
  email: string;
  branchId: number;
}

interface BranchManagerCardProps {
  manager: Manager;
}

const BranchManagerCard: React.FC<BranchManagerCardProps> = ({ manager }) => {
  const handleContactClick = () => {
    window.location.href = `mailto:${manager.email}`;
  };

  return (
    <div className="card ml-28">
            <div className="card__img">
                <svg xmlns="http://www.w3.org/2000/svg" width="100%">
                    <rect fill="#ffffff" width="540" height="450"></rect>
                    <defs>
                        <linearGradient id="a" gradientUnits="userSpaceOnUse" x1="0" x2="0" y1="0" y2="100%" gradientTransform="rotate(222,648,379)">
                            <stop offset="0" stopColor="#ffffff"></stop>
                            <stop offset="1" stopColor="#FC726E"></stop>
                        </linearGradient>
                        <pattern patternUnits="userSpaceOnUse" id="b" width="300" height="250" x="0" y="0" viewBox="0 0 1080 900">
                            <g fillOpacity="0.5">
                                <polygon fill="#444" points="90 150 0 300 180 300"></polygon>
                                <polygon points="90 150 180 0 0 0"></polygon>
                                <polygon fill="#AAA" points="270 150 360 0 180 0"></polygon>
                                <polygon fill="#DDD" points="450 150 360 300 540 300"></polygon>
                                <polygon fill="#999" points="450 150 540 0 360 0"></polygon>
                                <polygon points="630 150 540 300 720 300"></polygon>
                                <polygon fill="#DDD" points="630 150 720 0 540 0"></polygon>
                                <polygon fill="#444" points="810 150 720 300 900 300"></polygon>
                                <polygon fill="#FFF" points="810 150 900 0 720 0"></polygon>
                                <polygon fill="#DDD" points="990 150 900 300 1080 300"></polygon>
                                <polygon fill="#444" points="990 150 1080 0 900 0"></polygon>
                                <polygon fill="#DDD" points="90 450 0 600 180 600"></polygon>
                                <polygon points="90 450 180 300 0 300"></polygon>
                                <polygon fill="#666" points="270 450 180 600 360 600"></polygon>
                                <polygon fill="#AAA" points="270 450 360 300 180 300"></polygon>
                                <polygon fill="#DDD" points="450 450 360 600 540 600"></polygon>
                                <polygon fill="#999" points="450 450 540 300 360 300"></polygon>
                                <polygon fill="#999" points="630 450 540 600 720 600"></polygon>
                                <polygon fill="#FFF" points="630 450 720 300 540 300"></polygon>
                                <polygon points="810 450 720 600 900 600"></polygon>
                                <polygon fill="#DDD" points="810 450 900 300 720 300"></polygon>
                                <polygon fill="#AAA" points="990 450 900 600 1080 600"></polygon>
                                <polygon fill="#444" points="990 450 1080 300 900 300"></polygon>
                                <polygon fill="#222" points="90 750 0 900 180 900"></polygon>
                                <polygon points="270 750 180 900 360 900"></polygon>
                                <polygon fill="#DDD" points="270 750 360 600 180 600"></polygon>
                                <polygon fill="#444" points="450 750 540 600 360 600"></polygon>
                                <polygon fill="#666" points="630 750 540 900 720 900"></polygon>
                                <polygon fill="#444" points="630 750 720 600 540 600"></polygon>
                                <polygon fill="#AAA" points="810 750 720 900 900 900"></polygon>
                                <polygon fill="#666" points="810 750 900 600 720 600"></polygon>
                                <polygon fill="#999" points="990 750 900 900 1080 900"></polygon>
                                <polygon fill="#999" points="180 0 90 150 270 150"></polygon>
                                <polygon fill="#444" points="360 0 270 150 450 150"></polygon>
                                <polygon fill="#FFF" points="540 0 450 150 630 150"></polygon>
                                <polygon points="900 0 810 150 990 150"></polygon>
                                <polygon fill="#222" points="0 300 -90 450 90 450"></polygon>
                                <polygon points="0 300 90 150 -90 150"></polygon>
                                <polygon fill="#FFF" points="180 300 90 450 270 450"></polygon>
                                <polygon fill="#666" points="180 300 270 150 90 150"></polygon>
                                <polygon fill="#222" points="360 300 270 450 450 450"></polygon>
                                <polygon fill="#FFF" points="360 300 450 150 270 150"></polygon>
                                <polygon fill="#444" points="540 300 450 450 630 450"></polygon>
                                <polygon fill="#222" points="540 300 630 150 450 150"></polygon>
                                <polygon fill="#AAA" points="720 300 630 450 810 450"></polygon>
                                <polygon fill="#666" points="720 300 810 150 630 150"></polygon>
                                <polygon fill="#FFF" points="900 300 810 450 990 450"></polygon>
                                <polygon fill="#999" points="900 300 990 150 810 150"></polygon>
                                <polygon points="0 600 -90 750 90 750"></polygon>
                                <polygon fill="#666" points="0 600 90 450 -90 450"></polygon>
                                <polygon fill="#AAA" points="180 600 90 750 270 750"></polygon>
                                <polygon fill="#444" points="180 600 270 450 90 450"></polygon>
                                <polygon fill="#444" points="360 600 270 750 450 750"></polygon>
                                <polygon fill="#999" points="360 600 450 450 270 450"></polygon>
                                <polygon fill="#666" points="540 600 630 450 450 450"></polygon>
                                <polygon fill="#222" points="720 600 630 750 810 750"></polygon>
                                <polygon fill="#FFF" points="900 600 810 750 990 750"></polygon>
                                <polygon fill="#222" points="900 600 990 450 810 450"></polygon>
                                <polygon fill="#DDD" points="0 900 90 750 -90 750"></polygon>
                                <polygon fill="#444" points="180 900 270 750 90 750"></polygon>
                                <polygon fill="#FFF" points="360 900 450 750 270 750"></polygon>
                                <polygon fill="#AAA" points="540 900 630 750 450 750"></polygon>
                                <polygon fill="#FFF" points="720 900 810 750 630 750"></polygon>
                                <polygon fill="#222" points="900 900 990 750 810 750"></polygon>
                                <polygon fill="#222" points="1080 300 990 450 1170 450"></polygon>
                                <polygon fill="#FFF" points="1080 300 1170 150 990 150"></polygon>
                                <polygon points="1080 600 990 750 1170 750"></polygon>
                                <polygon fill="#666" points="1080 600 1170 450 990 450"></polygon>
                                <polygon fill="#DDD" points="1080 900 1170 750 990 750"></polygon>
                            </g>
                        </pattern>
                    </defs>
                    <rect x="0" y="0" fill="url(#a)" width="100%" height="100%"></rect>
                    <rect x="0" y="0" fill="url(#b)" width="100%" height="100%"></rect>
                </svg>
            </div>
            <div className="card__avatar">
                <svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="64" cy="64" fill="#ff8475" r="60"></circle>
                    <circle cx="64" cy="64" fill="#f85565" opacity=".4" r="48"></circle>
                    <path d="m64 14a32 32 0 0 1 32 32v41a6 6 0 0 1 -6 6h-52a6 6 0 0 1 -6-6v-41a32 32 0 0 1 32-32z" fill="#7f3838"></path>
                    <path d="m62.07 96.4c-2.18 0-4.21-1.32-5.1-3.34-.45-1.14-.39-2.4.16-3.5.36-.7.91-1.3 1.63-1.71a6.0204 6.0204 0 0 1 7.97 1.26c.56.83.66 1.87.35 2.83-.4 1.19-1.45 2.16-2.92 2.16zM65.79 96.4c2.18 0 4.21-1.32 5.1-3.34.45-1.14.39-2.4-.16-3.5-.36-.7-.91-1.3-1.63-1.71a6.0204 6.0204 0 0 0 -7.97 1.26c-.56.83-.66 1.87-.35 2.83.4 1.19 1.45 2.16 2.92 2.16z" fill="#fff"></path>
                </svg>
            </div>
            <div className="card__title">{manager.name}</div>
            <div className="card__subtitle mb-2">Branch Manager</div>
            <div className="card__wrapper ">
            <button className="button" onClick={handleContactClick}>
<div className="outline"></div>

<div className="state state--default">
  <div className="icon">
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g style={{ filter: "url(#shadow)" }}>
        <path
          d="M14.2199 21.63C13.0399 21.63 11.3699 20.8 10.0499 16.83L9.32988 14.67L7.16988 13.95C3.20988 12.63 2.37988 10.96 2.37988 9.78001C2.37988 8.61001 3.20988 6.93001 7.16988 5.60001L15.6599 2.77001C17.7799 2.06001 19.5499 2.27001 20.6399 3.35001C21.7299 4.43001 21.9399 6.21001 21.2299 8.33001L18.3999 16.82C17.0699 20.8 15.3999 21.63 14.2199 21.63ZM7.63988 7.03001C4.85988 7.96001 3.86988 9.06001 3.86988 9.78001C3.86988 10.5 4.85988 11.6 7.63988 12.52L10.1599 13.36C10.3799 13.43 10.5599 13.61 10.6299 13.83L11.4699 16.35C12.3899 19.13 13.4999 20.12 14.2199 20.12C14.9399 20.12 16.0399 19.13 16.9699 16.35L19.7999 7.86001C20.3099 6.32001 20.2199 5.06001 19.5699 4.41001C18.9199 3.76001 17.6599 3.68001 16.1299 4.19001L7.63988 7.03001Z"
          fill="currentColor"
        />
        <path
          d="M10.11 14.4C9.92005 14.4 9.73005 14.33 9.58005 14.18C9.29005 13.89 9.29005 13.41 9.58005 13.12L13.16 9.53C13.45 9.24 13.93 9.24 14.22 9.53C14.51 9.82 14.51 10.3 14.22 10.59L10.64 14.18C10.5 14.33 10.3 14.4 10.11 14.4Z"
          fill="currentColor"
        />
      </g>
      <defs>
        <filter id="shadow">
          <feDropShadow dx="0" dy="1" stdDeviation="0.6" floodOpacity="0.5" />
        </filter>
      </defs>
    </svg>
  </div>
  <p>
    <span style={{ "--i": 0 }}>S</span>
    <span style={{ "--i": 1 }}>e</span>
    <span style={{ "--i": 2 }}>n</span>
    <span style={{ "--i": 3 }}>d</span>
    <span style={{ "--i": 4 }}>M</span>
    <span style={{ "--i": 5 }}>e</span>
    <span style={{ "--i": 6 }}>s</span>
    <span style={{ "--i": 7 }}>s</span>
    <span style={{ "--i": 8 }}>a</span>
    <span style={{ "--i": 9 }}>g</span>
    <span style={{ "--i": 10 }}>e</span>
  </p>
</div>

<div className="state state--sent">
  <div className="icon">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      height="1em"
      width="1em"
      strokeWidth="0.5px"
      stroke="black"
    >
      <g style={{ filter: "url(#shadow)" }}>
        <path
          fill="currentColor"
          d="M12 22.75C6.07 22.75 1.25 17.93 1.25 12C1.25 6.07 6.07 1.25 12 1.25C17.93 1.25 22.75 6.07 22.75 12C22.75 17.93 17.93 22.75 12 22.75ZM12 2.75C6.9 2.75 2.75 6.9 2.75 12C2.75 17.1 6.9 21.25 12 21.25C17.1 21.25 21.25 17.1 21.25 12C21.25 6.9 17.1 2.75 12 2.75Z"
        />
        <path
          fill="currentColor"
          d="M10.5795 15.5801C10.3795 15.5801 10.1895 15.5001 10.0495 15.3601L7.21945 12.5301C6.92945 12.2401 6.92945 11.7601 7.21945 11.4701C7.50945 11.1801 7.98945 11.1801 8.27945 11.4701L10.5795 13.7701L15.7195 8.6301C16.0095 8.3401 16.4895 8.3401 16.7795 8.6301C17.0695 8.9201 17.0695 9.4001 16.7795 9.6901L11.1095 15.3601C10.9695 15.5001 10.7795 15.5801 10.5795 15.5801Z"
        />
      </g>
    </svg>
  </div>
  <p>
    <span style={{ "--i": 5 }}>S</span>
    <span style={{ "--i": 6 }}>e</span>
    <span style={{ "--i": 7 }}>n</span>
    <span style={{ "--i": 8 }}>t</span>
  </p>
</div>
</button>
            </div>
        </div>
  );
};

export default BranchManagerCard;
