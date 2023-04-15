import React from "react";
import DeliveryDiningIcon from "@mui/icons-material/DeliveryDining";
import TakeoutDiningIcon from "@mui/icons-material/TakeoutDining";
import EventNoteIcon from "@mui/icons-material/EventNote";
import { snakeCaseToTitle } from "../utils/caseConverter";

const classes = {
  transactionItem: {
    display: "flex",
    alignItems: "center",
    columnGap: "0.25rem",
  },
};
// Returns an icon reflecting the transaction type
export default function TransactionItem({ transaction, style }) {
  const IconGenerator = {
    delivery: () => <DeliveryDiningIcon style={style} />,
    pickup: () => <TakeoutDiningIcon style={style} />,
    restaurant_reservation: () => <EventNoteIcon style={style} />,
  };

  const AssociatedIcon = IconGenerator[transaction];

  return (
    <div style={classes.transactionItem}>
      <AssociatedIcon style={style} />
      {snakeCaseToTitle(transaction)}
    </div>
  );
}
