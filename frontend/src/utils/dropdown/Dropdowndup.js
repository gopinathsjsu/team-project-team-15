







// --------------------------------------------------------------------
// import { useEffect, useState } from "react";

// import Box from "@mui/material/Box";
// import FormControl from "@mui/material/FormControl";
// import InputLabel from "@mui/material/InputLabel";
// import MenuItem from "@mui/material/MenuItem";
// import Select from "@mui/material/Select";
// import DashboardHeader from '../../components/DashboardHeader';

// import '../../pages/styles.css';

// const DropdownList = ({content}) => {
//   const [terminalNumber, setTerminalNumber] = useState("123432");

//   const [gateNumber, setGateNumber] = useState("");

//   const handleChange = (event) => {
//     setTerminalNumber(event.target.value);
//     // props.onSelectedCourse(event.target.value);
//   };


//   const gateDropDownHandleChange = (event) => {
//     setGateNumber(event.target.value);
//   }

//   return (
    
//     <div className='dashboard-content'>
//             <DashboardHeader
//                 btnText="Home" />
                    
//       <Box sx={{ minWidth: 120 }}>
//         <FormControl fullWidth>
//         <div className='dashboard-content-dropdown'>
//           <div className = 'dropdown'>
//             <label>Select Terminal :</label>
//             {/* <InputLabel className = 'dropdown' id="inputId">Select Terminal</InputLabel> */}
//             <Select
//               id="terminal-select"
//               labelId="terminalId"
//               value={terminalNumber}
//               label="Select Terminal No"
//               onChange={handleChange}
//             >
//               {content?.map((terminal) => {
//                 return <MenuItem key={terminal.id} value={terminal.TERMINAL_NUMBER}>{terminal.TERMINAL_NUMBER}</MenuItem>;
//               })}
//             </Select>
//           </div>
//           <div className = 'dropdown'>
//           <label>Select gates to be enabled :</label>
//           {/* <InputLabel className = 'dashboard-content-dropdown' id="inputId">Select Gate</InputLabel> */}
//             <Select
//               id="gate-select"
//               labelId="gateId"
//               value={gateNumber}
//               label="Select Gate No"
//               onChange={gateDropDownHandleChange}
//             >
//               {content?.map((gate) => {
//                 return <MenuItem key={gate.id} value={gate.GATE_NUMBER}>{gate.GATE_NUMBER}</MenuItem>;
//               })}
//             </Select>
//           </div>
//           <div>
//             <button className='dashbord-btn' > Enable </button>
//             <button className='dashbord-btn' > Cancel </button>
//           </div>
//         </div>
//         </FormControl>

            
//       </Box>
//     </div>
//   );
// };

// export default DropdownList;
