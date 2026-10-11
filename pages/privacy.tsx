import { LegalDocument } from "../components/legal/LegalDocument";
import METADATA from "../constants/metadata";
import { PRIVACY_SECTIONS, PRIVACY_UPDATED_LABEL } from "../data/legal/privacy";
import React from "react";

export default function PrivacyPage() {
  return (
    <LegalDocument
      title="Privacy Policy"
      lead="This policy explains what information HYPush Technologies Co. Ltd collects and how it is used."
      updatedLabel={PRIVACY_UPDATED_LABEL}
      metadata={METADATA.PRIVACY_PAGE}
      sections={PRIVACY_SECTIONS}
    />
  );
}
