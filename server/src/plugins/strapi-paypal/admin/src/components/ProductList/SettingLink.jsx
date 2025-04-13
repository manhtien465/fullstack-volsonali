import React from "react";
import { Link,Typography,Box } from "@strapi/design-system";
import {ArrowRight} from "@strapi/icons";


const SettingLink = () => {
  return (
  <Box paddingTop={6}>
   <Link to="/settings/strapi-paypal" endIcon={<ArrowRight />}>
                Manage Your PayPal Configuration
              </Link>
              <Typography variant="pi">
                Need help? Contact us at : support@asyncweb.io
              </Typography>
  </Box>
  );
};

export { SettingLink } ;
