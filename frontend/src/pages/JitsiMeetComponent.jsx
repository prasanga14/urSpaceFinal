// import React from 'react';
// import { JitsiMeeting } from '@jitsi/react-sdk';

// const JitsiMeetComponent = () => {
//   const roomName = 'Shyam Room';
//   const domain = 'meet.jit.si';

//   return (
//     <div style={{ height: '100vh', display: 'grid', flexDirection: 'column' }}>
//       <JitsiMeeting
//         roomName={roomName}
//         displayName="abc"
//         domain={domain}
//         containerStyles={{ display: 'flex', flex: 1 }}
//       />
//     </div>
//   );
// };

// export default JitsiMeetComponent;

import React from 'react';
import Navbar from '../components/Navbar';

const JitsiMeetComponent = () => {
  return (
    <>
      <Navbar />
      <p>Meeting</p>
    </>
  );
};

export default JitsiMeetComponent;
