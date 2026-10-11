import type { ILegalSection } from "../../components/legal/LegalDocument";

/**
 * Privacy Policy content sourced from the published HYPush page at
 * https://hypush.co/privacy. Edited only for structure/links inside this
 * site — not for legal meaning.
 */
export const PRIVACY_UPDATED_LABEL = "Last reviewed for this site relaunch";

export const PRIVACY_SECTIONS: ReadonlyArray<ILegalSection> = [
  {
    id: "overview",
    heading: "Overview",
    blocks: [
      {
        type: "paragraph",
        text: "We are committed to protecting your privacy at HYPush Technologies Co. Ltd. We will not collect any personal information from you that you do not volunteer, and we are the sole owner of all information collected on this site. We do not sell, share, or rent this information to others in any way that we have not mentioned in this statement.",
      },
    ],
  },
  {
    id: "cookies",
    heading: "Cookies",
    blocks: [
      {
        type: "paragraph",
        text: "Like many other Web sites, HYPush Technologies Co. Ltd uses cookies to identify members so they don't have to re-enter a user id and password when they, for example, wish to post to a discussion. Cookies also help us improve your experience and display more prominently goods and services that might interest you.",
      },
      {
        type: "paragraph",
        text: "This marketing site keeps preferences such as color mode in local storage where possible. Third-party product surfaces (for example client portals on other HYPush domains) may set their own cookies under their own policies.",
      },
    ],
  },
  {
    id: "third-parties",
    heading: "Third Parties",
    blocks: [
      {
        type: "paragraph",
        text: "HYPush Technologies Co. Ltd may provide third parties with aggregate statistics about our customers, traffic patterns, and related site information. This data reflects site usage patterns gathered during customer visits to our Web site but does not contain behavioral or identifying information about any individual member, unless that member has given us permission to share that information. We may also provide log files and other databases of user information to third parties for analysis, so we can get a better understanding of traffic through our site and thus improve our content offerings.",
      },
      {
        type: "paragraph",
        text: "HYPush Technologies Co. Ltd also may use third party companies to provide delivery of e-mail newsletters and other messages over e-mail. HYPush Technologies Co. Ltd may use a third-party advertising company to serve ads when you visit our sites. This company may use information about your visits to our and other web sites in order to provide advertisements about goods and services of interest to you. In addition, we may share web site usage information about visitors to our sites with this company for the purpose of managing and targeting advertisements on our sites. Also be aware that we may buy and sell business assets and/or divisions; customer information is generally part of such a sale.",
      },
    ],
  },
  {
    id: "security",
    heading: "Security",
    blocks: [
      {
        type: "paragraph",
        text: "We use reasonable precautions to keep the personal information you disclose both in your browsing and your purchases and to only release this information to third parties we believe share our commitment to privacy. However, we are not responsible for any breach of security or for the actions of these parties.",
      },
    ],
  },
  {
    id: "consent",
    heading: "Obtaining your consent",
    blocks: [
      {
        type: "paragraph",
        text: "By using our Web site, you give HYPush Technologies Co. Ltd permission to collect information about the pages served to you as an anonymous user for the purpose of calculating aggregate site statistics. If you register at HYPush Technologies Co. Ltd, you authorize HYPush Technologies Co. Ltd to use information you provide to personalize the information we deliver to you and to use your demographic information when calculating aggregate customer data. HYPush Technologies Co. Ltd may occasionally amend this policy. We suggest that you bookmark this page and check to see if it has changed from time to time.",
      },
    ],
  },
  {
    id: "quote-form",
    heading: "Quote and contact forms on this site",
    blocks: [
      {
        type: "paragraph",
        text: (
          <>
            When you submit a quote or contact request on hypush.co, we process the details you
            provide (such as name, email, phone, and project information) to respond to your enquiry
            and prepare a proposal. Submissions are stored securely for follow-up and may trigger
            transactional email to you and to HYPush. See also our{" "}
            <a href="/terms">Terms of Service</a>.
          </>
        ),
      },
    ],
  },
];
