import { LegalDocument } from "../components/legal/LegalDocument";
import METADATA from "../constants/metadata";
import { TERMS_SECTIONS, TERMS_UPDATED_LABEL } from "../data/legal/terms";
import React from "react";

export default function TermsPage() {
  return (
    <LegalDocument
      title="Terms of Service"
      lead="Please read these terms carefully before using hypush.co or related HYPush websites."
      updatedLabel={TERMS_UPDATED_LABEL}
      metadata={METADATA.TERMS_OF_SERVICE}
      sections={TERMS_SECTIONS}
    />
  );
}
