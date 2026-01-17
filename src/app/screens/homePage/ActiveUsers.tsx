import { Box, Container, Stack } from "@mui/material";
import Card from "@mui/joy/Card";
import { CssVarsProvider, Typography } from "@mui/joy";
import CardOverflow from "@mui/joy/CardOverflow";
import AspectRatio from "@mui/joy/AspectRatio";


import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { retrieveTopUsers } from "./selector";
import { serverApi } from "../../../lib/config";
import { Member } from "../../../lib/types/member";


const topUsersRetriever = createSelector(
  retrieveTopUsers,
  (topUsers) => ({topUsers})
);



export default function ActiveUsers() {
  const {topUsers} = useSelector(topUsersRetriever);
  return (
    <div className="active-users">
      <Container>
        <Stack className="active-users__main">
          <Box className="active-users__title">Active Users</Box>
          <Stack className="active-users__cards">
            <CssVarsProvider>
              {topUsers.length !== 0 ? (
                topUsers.map((member: Member) => {
                  const imagePath = `${serverApi}/${member.memberImage}`;
                    return (

                      <Card key={member._id} variant="outlined" className="active-users__card">
                    <CardOverflow>
  <AspectRatio ratio="1">
    <img src={imagePath} alt="" style={{ borderRadius: '10px' }} />
  </AspectRatio>
</CardOverflow>

<CardOverflow variant="soft" className="active-users__info" sx={{background: "green"}}>
  <Stack className="active-users__text" alignItems="center">
    <Typography className="active-users__name">
      {member.memberNick}
    </Typography>
   
  </Stack>
</CardOverflow>

                  </Card>

                );

                })
              ) : (
                <Box className="active-users__no-data">
                 No Active Users!
                </Box>
              )}
            </CssVarsProvider>
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}
