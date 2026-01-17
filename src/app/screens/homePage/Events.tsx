import { Box, Container, Stack } from "@mui/joy";
import React from "react";

export default function Events() {
  return (


    <div className="info-address-container">
      <div>
                  <Box className={"info-title"}>
         <h3 style={{ textAlign: 'center' }}>Information</h3>
               </Box>
      </div>

      <Stack className="abaut">
         <div className="info-frame">


        <Stack 
  spacing={3} 
  sx={{ 
    maxWidth: 420, 
    mx: 'auto', 
    py: 3,
    pl: 4,                // chapdan biroz joy
    borderLeft: '4px solid #006e0d',  // faqat chap tomonda chiroyli chiziq
    borderRadius: '0 8px 8px 0',
  }}
>
  <Box sx={{ textAlign: 'left' }}>
    <Box sx={{ 
      fontSize: '28px', 
      fontWeight: 700, 
      color: '#006e0d', 
      mb: 1 
    }}>
      Working Hours
    </Box>
    <Box sx={{ fontSize: '20px', color: '#444', fontWeight: 500 }}>
      8:00 AM – 6:00 PM
    </Box>
  </Box>

  <Box sx={{ textAlign: 'left' }}>
    <Box sx={{ fontSize: '22px', fontWeight: 600, mb: 0.5 }}>Weekdays</Box>
    <Box sx={{ fontSize: '17px', color: '#555' }}>Monday to Friday</Box>
  </Box>

  <Box sx={{ textAlign: 'left', mb: 1 }}>
    <Box sx={{ fontSize: '22px', fontWeight: 600, mb: 0.5 }}>Weekends & Holidays</Box>
    <Box sx={{ fontSize: '17px', color: '#555' }}>Saturday, Sunday and Public Holidays</Box>
  </Box>

  <Box sx={{ textAlign: 'left' }}>
    <Box sx={{ 
      fontSize: '22px', 
      fontWeight: 600, 
      color: '#333' 
    }}>
      Contact: +998930001122
    </Box>
  </Box>
</Stack>
      </div>

      
      <div className="address">
        <Stack className="address-area">
          
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4304.009129507858!2d72.35687446020327!3d40.76280806409186!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38bcedb3adddd9f3%3A0xa6dbbc6cd1305025!2sLazeez!5e0!3m2!1sru!2skr!4v1763290728575!5m2!1sru!2skr"
            title="Google Map"
          />
        </Stack>
      </div>
      </Stack>
     
    </div>
  );
}
