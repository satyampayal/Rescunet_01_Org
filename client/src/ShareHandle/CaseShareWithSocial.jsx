import React from "react";
import { useDispatch } from "react-redux";
import {
    FacebookShareButton,
    TwitterShareButton,
    WhatsappShareButton,
    LinkedinShareButton,
    FacebookIcon,
    TwitterIcon,
    WhatsappIcon,
    LinkedinIcon,
} from "react-share";
import { shareComplain } from "../redux/slices/shareSlice";


const CaseShareWithSocial = ({ caseData }) => {
    const dispatch = useDispatch();
    const shareUrl = `${window.location.origin}/missing-person/${caseData?._id}`;
    const title = `Help find ${caseData?.firstName}! Last seen at ${caseData?.location}.`;

    // Function to log share event
    const logShareEvent = async (platform) => {
        console.log(`Shared on ${platform}: Case ID - ${caseData?._id}`);
        dispatch(shareComplain({
            caseId: caseData?._id,
            platform,
            timestamp: new Date().toISOString(),
        }))
        console.log(`Shared on ${platform}: Case ID - ${caseData?._id}`);
    };

    return (
        <div className="case-details">
            <h2>{caseData?.firstName}</h2>
            <p>
                <strong>Last Seen:</strong> {caseData?.location}
            </p>
            <img
                src={caseData?.images[0]?.secure_url}
                alt={caseData?.firstName}
                width={100}
                height={100}
            />

            {/* Social Media Share Buttons */}
            <div className="social-share">
                <FacebookShareButton
                    url={shareUrl}
                    quote={title}
                    onClick={() => logShareEvent("Facebook")}
                >
                    <FacebookIcon size={32} round />
                </FacebookShareButton>

                <TwitterShareButton
                    url={shareUrl}
                    title={title}
                    onClick={() => logShareEvent("Twitter")}
                >
                    <TwitterIcon size={32} round />
                </TwitterShareButton>

                <WhatsappShareButton
                    url={shareUrl}
                    title={title}
                    separator=" - "
                    onClick={() => logShareEvent("WhatsApp")}
                >
                    <WhatsappIcon size={32} round />
                </WhatsappShareButton>

                <LinkedinShareButton
                    url={shareUrl}
                    title={title}
                    separator=" - "
                    onClick={() => logShareEvent("LinkedIn")}
                >
                    <LinkedinIcon size={32} round />
                </LinkedinShareButton>
            </div>
        </div>
    );
};

export default CaseShareWithSocial;
