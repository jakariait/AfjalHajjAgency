import React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import RequirePermission from "./RequirePermission.jsx";

const AccordionMenuItem = ({ icon, title, permission, children }) => {
  return (
    <RequirePermission permission={permission} fallback={true}>
      <li className="space-x-2 px-2 rounded-md cursor-pointer">
        <Accordion
          style={{
            background: "transparent",
            boxShadow: "none",
            width: "100%",
          }}
          sx={{
            color: "white", // Ensures text color is white
            "& .MuiAccordionSummary-root": {
              backgroundColor: "transparent",
              minHeight: "auto", // Removes unnecessary padding
              padding: "0", // Removes default padding
            },
            "& .MuiAccordionDetails-root": {
              backgroundColor: "transparent",
              paddingLeft: "0", // Ensures no extra left padding
            },
            "& .MuiSvgIcon-root": {
              color: "white", // Ensures the dropdown icon is white
            },
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`panel-${title.replace(/\s/g, "")}-content`}
            id={`panel-${title.replace(/\s/g, "")}-header`}
            className="p-2 flex items-center"
          >
            <Typography component="span">
              <div className="flex items-center gap-2">
                {icon} <span>{title}</span>
              </div>
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <ul className={"space-y-2 pl-4"}>{children}</ul>
          </AccordionDetails>
        </Accordion>
      </li>
    </RequirePermission>
  );
};

export default AccordionMenuItem;
