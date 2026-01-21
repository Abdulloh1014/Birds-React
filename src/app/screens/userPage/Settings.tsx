import React, { useState } from "react";
import { 
  Box, Container, Stack, Typography, Button, TextField, 
  Avatar, Paper, IconButton, Grid 
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import SaveIcon from "@mui/icons-material/Save";
import { useGlobals } from "../../hooks/useGlobals";
import { MemberUpdateInput } from "../../../lib/types/member";
import { sweetErrorHandling, sweetTopSmallSuccessAlert } from "../../../lib/sweetAlert";
import { Messages, serverApi } from "../../../lib/config";
import MemberService from "../../services/MemberService";

export function Settings() {
  const { authMember, setAuthMember } = useGlobals();
  
  const [memberImage, setMemberImage] = useState<string>(
    authMember?.memberImage
      ? `${serverApi}/${authMember.memberImage}`
      : "/icons/default-user.svg"
  );

  const [memberUpdateInput, setMemberUpdateInput] = useState<MemberUpdateInput>({
    memberNick: authMember?.memberNick || "",
    memberPhone: authMember?.memberPhone || "",
    memberAddress: authMember?.memberAddress || "",
    memberDesc: authMember?.memberDesc || "",
    memberImage: authMember?.memberImage,
  });

  /** HANDLERS **/

  const changeInputHandler = (e: any) => {
    const { name, value } = e.target;
    setMemberUpdateInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageViewer = (e: any) => {
    const file = e.target.files[0];
    const validateImageTypes = ["image/jpg", "image/jpeg", "image/png"];
    
    if (file && !validateImageTypes.includes(file.type)) {
      sweetErrorHandling(Messages.error5).then();
    } else if (file) {
      // MUHIM: State-ni yangi obyekt sifatida yangilash
      setMemberUpdateInput((prev) => ({
        ...prev,
        memberImage: file,
      }));
      setMemberImage(URL.createObjectURL(file));
    }
  };

  const handleSubmitButton = async () => {
    try {
      if (!authMember) throw new Error(Messages.error2);
      
      // Validatsiya: Address va Phone bo'sh emasligini tekshirish
      if (
        !memberUpdateInput.memberNick || 
        !memberUpdateInput.memberPhone || 
        !memberUpdateInput.memberAddress
      ) {
        throw new Error(Messages.error3);
      }

      const member = new MemberService();
      // Serverga yuborilayotgan obyektni tekshirish
      const result = await member.updateMember(memberUpdateInput);
      
      setAuthMember(result);
      await sweetTopSmallSuccessAlert("Modified successfully!", 700);
    } catch (err) {
      console.log("Error on updateMember:", err);
      sweetErrorHandling(err).then();
    }
  };

  return (
    <Box sx={{ py: 4, backgroundColor: "#f8f9fa" }}>
      <Paper elevation={0} sx={{ p: 4, borderRadius: 4, border: "1px solid #e2e8f0" }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Stack alignItems="center" spacing={2}>
              <Box sx={{ position: "relative" }}>
                <Avatar src={memberImage} sx={{ width: 140, height: 140 }} />
                <IconButton
                  component="label"
                  sx={{ position: "absolute", bottom: 5, right: 5, backgroundColor: "#3b82f6", color: "#fff" }}
                >
                  <CloudUploadIcon fontSize="small" />
                  <input type="file" hidden onChange={handleImageViewer} />
                </IconButton>
              </Box>
            </Stack>
          </Grid>

          <Grid item xs={12} md={8}>
            <Stack spacing={3}>
              <TextField
                fullWidth
                label="Username"
                name="memberNick"
                value={memberUpdateInput.memberNick}
                onChange={changeInputHandler}
              />
              <TextField
                fullWidth
                label="Phone Number"
                name="memberPhone"
                value={memberUpdateInput.memberPhone}
                onChange={changeInputHandler}
              />
              <TextField
                fullWidth
                label="Address"
                name="memberAddress" // BU ISMLAR memberUpdateInput BILAN BIR XIL BO'LISHI SHART
                value={memberUpdateInput.memberAddress}
                onChange={changeInputHandler}
              />
              <TextField
                fullWidth
                multiline
                rows={4}
                label="Description"
                name="memberDesc" // BU ISMLAR memberUpdateInput BILAN BIR XIL BO'LISHI SHART
                value={memberUpdateInput.memberDesc}
                onChange={changeInputHandler}
              />
              <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                <Button variant="contained" startIcon={<SaveIcon />} onClick={handleSubmitButton}>
                  Save Changes
                </Button>
              </Box>
            </Stack>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}