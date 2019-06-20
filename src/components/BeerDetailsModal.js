import React from "react";
import Modal from "./Modal";
import BeerDetails from "./BeerDetails";

export default function BeerDetailsModal(props) {
  return (
    <Modal>
      <BeerDetails {...props} />
    </Modal>
  );
}
