import type { ILegalSection } from "../../components/legal/LegalDocument";

/**
 * Terms of Service content sourced from the published HYPush page at
 * https://hypush.co/terms (as of October 26, 2022). Edited only for
 * structure/links inside this site — not for legal meaning.
 */
export const TERMS_UPDATED_LABEL = "Effective October 26, 2022";

export const TERMS_SECTIONS: ReadonlyArray<ILegalSection> = [
  {
    id: "general",
    heading: "General",
    blocks: [
      {
        type: "list",
        items: [
          "This is the most recent Terms of Service (the “terms”) agreement as of October 26th, 2022.",
          "These terms apply to your use of our website at hypush.co, backstage.hypush.co, send.hypush.co & app.hypush.co (referred to collectively as the “Websites.”). Please read these terms carefully and ensure that you understand them before you start to use the website.",
          "By accessing and using the website, you confirm that you accept these terms and that you agree to remain by them and any changes made to them from time to time.",
          "If there are any contradictions with anything that has something to do with our website, and/or our Terms Of Service, the Terms Of Service rules are always right and applicable.",
          "You are liable for everything you upload onto HYPush Technologies Co. Ltd.",
        ],
      },
      {
        type: "emphasis",
        text: "IN NO EVENT SHALL HYPush Technologies Co. Ltd or any of its affiliates BE LIABLE TO YOU OR ANY THIRD PARTY FOR ANY INDIRECT, CONSEQUENTIAL, EXEMPLARY, INCIDENTAL, SPECIAL OR PUNITIVE DAMAGES, INCLUDING LOST PROFIT DAMAGES ARISING FROM YOUR SUBMISSION OF WORKS, EVEN IF HYPush HAS BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.",
      },
      {
        type: "emphasis",
        text: "Notwithstanding anything to the contrary herein, HYPush’s liability to you for any cause whatsoever and regardless of the form of the action, will at all times be LIMITED TO AMOUNT PAID, if any, by you to HYPush Technologies Co. Ltd for the service.",
      },
    ],
  },
  {
    id: "changes",
    heading: "Changes to the Terms of Service",
    blocks: [
      {
        type: "paragraph",
        text: (
          <>
            HYPush reserves the right to change these Terms of Use at any time by posting new Terms
            of Use at this location. You can contact HYPush with any questions relating to these
            Terms of Use at our <a href="/contact">contact page</a>.
          </>
        ),
      },
    ],
  },
  {
    id: "contributions",
    heading: "Contributions to the Web Site",
    blocks: [
      {
        type: "paragraph",
        text: "If you are invited to submit any contribution to the Web Site (including any text, photographs, graphics, video or audio) you agree, by submitting your contribution, to grant HYPush Technologies Co. Ltd a perpetual, royalty-free, non-exclusive, sub-licensable right and license to use, reproduce, modify, adapt, publish, translate, create derivative works from, distribute, perform, play, make available to the public, and exercise all copyright and publicity rights with respect to your contribution worldwide and/or to incorporate your contribution in other works in any media now known or later developed for the full term of any rights that may exist in your contribution.",
      },
      {
        type: "paragraph",
        text: "If you do not want to grant to HYPush Technologies Co. Ltd the rights set out above, please do not submit your contribution.",
      },
    ],
  },
  {
    id: "copyright",
    heading: "Copyright",
    blocks: [
      {
        type: "list",
        items: [
          "You must either own or have a license to use any copyrighted material that you upload to us for use for promotion of your work(s).",
          "You must have written permission to use the content you are uploading or you must OWN the content you are uploading on our website.",
          "You are solely responsible for complying with copyright laws domestic and internationally.",
          "We reserve the right to delete any uploaded material that, in our opinion, infringes on the copyrights of others. Misuse will result in the termination of your use of our service without a refund.",
        ],
      },
    ],
  },
  {
    id: "service",
    heading: "Service",
    blocks: [
      {
        type: "list",
        items: [
          "This service will only be used for promotional purposes.",
          "The materials we collect about you shall be used only for commercial propositions from our website. We do not sell or distribute personal information for any third party.",
          "You will not upload anything into this service that includes nudity or any material that is not allowed or suitable.",
          "You shall not intentionally use the system for your purpose.",
          "The service seldom might deliver later than the planned date stated on the order page. Please contact our support team if your order didn't provide in time, they most likely will find a proper solution. Late delivery does not mean you will get a refund.",
        ],
      },
    ],
  },
  {
    id: "payment",
    heading: "Payment",
    blocks: [
      {
        type: "paragraph",
        text: "Accepted Payment Methods:",
      },
      {
        type: "list",
        items: [
          "PayPal",
          "Mobile Money",
          "Wire Transfer (larger projects)",
          "Certified Checks (larger projects)",
          "Credit Card (Visa, MasterCard, American Express & Discover)",
        ],
      },
      {
        type: "paragraph",
        text: "You agree that in the purchase of any of our services that you understand and agree on what you are buying and will not list a fraudulent dispute via PayPal, Creditcard, or Bank.",
      },
      {
        type: "paragraph",
        text: "In the event of a fraudulent attempt to file a dispute, claim, unauthorized transaction or chargeback, we admit the right, if needed, to ban your IP address from the website and you allow us to take legal actions against you.",
      },
      {
        type: "paragraph",
        text: "No partial or full refunds will be issued for service interruption, or failure other than saves your order does not get delivered at all.",
      },
      {
        type: "paragraph",
        text: "You agree to (PayPal, Cellulant & DPO)'s Terms of Service and state to not break any of their rules, by purchasing anything from the website.",
      },
    ],
  },
  {
    id: "refunds",
    heading: "Refund, Cancellation and Return Policy",
    blocks: [
      {
        type: "paragraph",
        text: "All our sales are final and no refunds will be provided. This also applies to campaigns ordered on the website without returning a service agreement.",
      },
    ],
  },
  {
    id: "suspension",
    heading: "Campaign Suspension",
    blocks: [
      {
        type: "paragraph",
        text: "We reserve the right to refuse or cancel any order at any time for certain reasons including but not limited to: product or service availability, unprofessional or harmful client conduct, unrealistic client expectations, errors in the description or price of the product or service, error in your order or other reasons.",
      },
    ],
  },
  {
    id: "names-logos",
    heading: "Names & Logos",
    blocks: [
      {
        type: "paragraph",
        text: "All names, logos, and brands of third parties (e.g., TikTok, Spotify, Instagram, TV stations, and their respective logos) displayed on our site are trademarks of their respective owners. HYPush and its products and services are not endorsed by, sponsored by, or affiliated with these third parties. Our use of the names and brands is for identification purposes only and doesn't imply any endorsement, sponsorship, or affiliation.",
      },
    ],
  },
  {
    id: "privacy",
    heading: "Privacy Policy",
    blocks: [
      {
        type: "paragraph",
        text: (
          <>
            Visit our <a href="/privacy">Privacy Policy</a> page.
          </>
        ),
      },
    ],
  },
];
