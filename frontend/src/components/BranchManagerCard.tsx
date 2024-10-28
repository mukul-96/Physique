import React from 'react';

interface Manager {
  id: number;
  name: string;
  email: string;
  branchId: number | null;
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
            <linearGradient id="a" gradientUnits="userSpaceOnUse" x1="0" x2="0" y1="0" y2="100%">
              <stop offset="0" stopColor="#ffffff"></stop>
              <stop offset="1" stopColor="#FC726E"></stop>
            </linearGradient>
            <pattern patternUnits="userSpaceOnUse" id="b" width="300" height="250">
              <g fillOpacity="0.5">
                {/* Pattern polygons omitted for brevity */}
                {/* Add your polygons here */}
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
      <div className="card__wrapper">
        <button className="button" onClick={handleContactClick}>
          <div className="outline"></div>
          <div className="state state--default">
            <div className="icon">
              <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g style={{ filter: "url(#shadow)" }}>
                  <path
                    d="M14.2199 21.63C13.0399 21.63 11.3699 20.8 10.0499 16.83L9.32988 14.67L7.16988 13.95C3.20988 12.63 2.37988 10.96 2.37988 9.78001C2.37988 8.61001 3.20988 6.93001 7.16988 5.60001L15.6599 2.77001C17.7799 2.06001 19.5499 2.27001 20.6399 3.35001C21.7299 4.43001 21.9399 6.21001 21.2299 8.33001L18.3999 16.82C17.0699 20.8 15.3999 21.63 14.2199 21.63ZM7.63988 7.03001C4.85988 7.96001 3.86988 9.06001 3.86988 9.78001C3.86988 10.5 4.85988 11.6 7.63988 12.52L10.1599 13.36C10.3799 13.54 10.6099 13.67 10.8499 13.67C11.0799 13.67 11.3099 13.54 11.5299 13.36L13.6799 12.34C14.3899 12.01 14.8999 11.7 15.2999 11.3C15.6999 10.9 15.9999 10.49 16.2199 10.09C16.4399 9.68999 16.6199 9.23999 16.6799 8.83001C16.7399 8.42001 16.6799 8.05999 16.5299 7.71999C16.3799 7.37999 16.0599 7.11999 15.6399 7.11999C15.2499 7.11999 14.8799 7.30999 14.6099 7.57999C14.3399 7.85999 14.0699 8.14999 13.6399 8.14999C13.2199 8.14999 12.8599 8.34999 12.5199 8.67999C12.1899 9.00999 11.8599 9.32999 11.3599 9.62999L9.77988 10.7399C9.56988 10.9599 9.32988 11.09 9.07988 11.19C8.82988 11.29 8.58988 11.29 8.33988 11.19C8.08988 11.09 7.84988 10.9599 7.63988 10.7399L7.63988 7.03001Z"
                    fill="#fff"
                  ></path>
                </g>
              </svg>
            </div>
            <span>Contact</span>
          </div>
        </button>
      </div>
    </div>
  );
};

export default BranchManagerCard;
