import { Container } from "@mui/material";

export const MainContainer = ({ children, ...props }: any) => {

  return (
    <Container
      component="main"
      maxWidth="xs"
      {...props}
    >
      {children}
    </Container>
  );
};
