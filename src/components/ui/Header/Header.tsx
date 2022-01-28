import React, { memo } from "react";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";

interface HeaderProps {
  title: string;
}

/**
 * Renders a header (h5) with the specified title and adds a divider a the bottom.
 */
const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <header>
      <Typography variant="h5" component="h1" gutterBottom>
        {title}
      </Typography>
      <Divider />
    </header>
  );
};

export default memo(Header);
