import React from "react";
import { FacebookShareButton, TwitterShareButton, WhatsappShareButton } from "react-share";
import { FacebookIcon, TwitterIcon, WhatsappIcon } from "react-share";

const CaseShareWithSocial = ({ caseData }) => {
  const shareUrl = `${window.location.origin}/missing-person/${caseData?._id}`;
  const title = `Help find ${caseData?.firstName}! Last seen at ${caseData?.location}.`;
     console.log(caseData)
  return (
    caseData &&
    <div className="case-details">
      <h2>{caseData?.firstName}</h2>
      <p><strong>Last Seen:</strong> {caseData?.location}</p>
      <img src={caseData?.images[0]?.secure_url} alt={caseData.name} width={24} height={24} />

      {/* Social Media Share Buttons */}
      <div className="social-share">
        <FacebookShareButton url={shareUrl} quote={title}>
          <FacebookIcon size={32} round />
        </FacebookShareButton>

        <TwitterShareButton url={shareUrl} title={title}>
          <TwitterIcon size={32} round />
        </TwitterShareButton>

        <WhatsappShareButton url={shareUrl} title={title} separator=" - ">
          <WhatsappIcon size={32} round />
        </WhatsappShareButton>
      </div>
    </div>
  );
};

export default CaseShareWithSocial;
