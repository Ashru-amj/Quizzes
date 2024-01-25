import React, { useState, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FRONTEND_URL } from "../config";
import "../../src/App.css";

const QuizPublish = ({ isOpen, onClose, onDelete, quizId }) => {
 
    const [linkCopied, setLinkCopied] = useState(false);
    const linkInputRef = useRef(null);
  
    if (!isOpen) {
      return null;
    }
    const notify = () => {
      toast.success("Link copied to Clipboard");
      setLinkCopied(true);
    };
     

    const handleCopyLink = () => {
        const linkInput = linkInputRef.current;
    
        if (linkInput) {
          linkInput.select();
          document.execCommand("copy");
          notify();
        }
      };


      return (
        <div className="q-modal-container">
          <div className="q-modal">
            <div className="q-modal-content">
              <p>Congrats your Quiz is Published!</p>
    
              <>
                <input
                  type="text"
                  value={`${FRONTEND_URL}/quiz/${quizId}`}
                  className="q-publish-link"
                  ref={linkInputRef}
                  readOnly
                />
              </>
              <div className="q-modal-button-wrap1">
                <button className="q-modal-button2" onClick={onClose}>
                  close
                </button>
                <button
                  className="q-quiz-continue-btn"
                  onClick={handleCopyLink}
                  disabled={linkCopied}
                >
                  {linkCopied ? "share" : "share"}
                </button>
                <ToastContainer />
              </div>
            </div>
          </div>
        </div>
      );
};

export default QuizPublish;
