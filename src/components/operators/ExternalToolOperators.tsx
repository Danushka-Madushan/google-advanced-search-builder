import React from 'react';
import { HardDrive, Mail } from "lucide-react";
import { Section } from '../Section';
import { G } from '../../styles/g-color';
import { css } from '../../styles/cssHelpers';

interface ExternalToolOperatorsProps {
  isMobile: boolean;
}

const ExternalToolOperators: React.FC<ExternalToolOperatorsProps> = ({ isMobile }) => {
  const driveOps = [
    { badge: "type:", examples: "spreadsheet, document, presentation, folder, pdf, form, drawing, script", desc: "Filter by file type" },
    { badge: "owner:", examples: "me, someone@gmail.com", desc: "Filter by file owner" },
    { badge: "to:", examples: "colleague@company.com", desc: "Files shared with a person" },
    { badge: "is:", examples: "starred, trashed", desc: "Filter by file status" },
  ];

  const gmailOps = [
    { badge: "from: / to: / cc: / bcc:", desc: "Filter by sender or recipient" },
    { badge: "subject:", desc: "Search keywords in email subject" },
    { badge: "has:attachment", desc: "Emails with file attachments" },
    { badge: "has:drive / has:document / has:youtube", desc: "Filter by attachment source" },
    { badge: "larger: / smaller: / size:", desc: "Filter by size — e.g. larger:10m" },
    { badge: "is:unread / is:read / is:important / is:snoozed", desc: "Filter by read / importance status" },
    { badge: "category:", desc: "primary, social, promotions, updates, forums" },
    { badge: "label:", desc: "Filter by Gmail label" },
    { badge: "deliveredto: / list:", desc: "Filter by delivery address or mailing list" },
    { badge: "older: / newer:", desc: "Filter by date — e.g. older:2022/06/01" },
  ];

  return (
    <>
      {/* Google Drive */}
      <Section title="Google Drive Operators" icon={HardDrive} theme="green" isMobile={isMobile}>
        <div style={{
          gridColumn: "1 / -1",
          fontSize: 13,
          color: G.textSecondary,
          background: "#F8F9FA",
          border: `1px solid ${G.border}`,
          borderRadius: 8,
          padding: "10px 14px",
          fontFamily: "'Roboto Mono', monospace"
        }}>
          Use these operators in the <strong>Google Drive</strong> search bar directly
        </div>
        {driveOps.map(item => (
          <div key={item.badge} style={{ display: "flex", flexDirection: "column", gap: 5 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
              <span style={css.badge(G.greenLight, "#137333", "#CEEAD6")}>{item.badge}</span>
              <span style={{ fontSize: 13, color: G.textSecondary, fontFamily: "'Google Sans', Roboto, Arial, sans-serif" }}>{item.desc}</span>
            </div>
            <p style={{ fontSize: 12, color: G.grey, margin: 0, fontFamily: "'Roboto Mono', monospace" }}>{item.examples}</p>
          </div>
        ))}
      </Section>

      {/* Gmail */}
      <Section title="Gmail Operators" icon={Mail} theme="red" isMobile={isMobile}>
        <div style={{
          gridColumn: "1 / -1",
          fontSize: 13,
          color: G.textSecondary,
          background: "#F8F9FA",
          border: `1px solid ${G.border}`,
          borderRadius: 8,
          padding: "10px 14px",
          fontFamily: "'Roboto Mono', monospace"
        }}>
          Use these operators in the <strong>Gmail</strong> search bar directly
        </div>
        {gmailOps.map(item => (
          <div key={item.badge} style={{ display: "flex", flexDirection: "column", gap: 5 }}>
            <span style={{ ...css.badge(G.redLight, "#C5221F", "#F5C6C4"), alignSelf: "flex-start" }}>{item.badge}</span>
            <p style={{ fontSize: 13, color: G.textSecondary, margin: 0, fontFamily: "'Google Sans', Roboto, Arial, sans-serif" }}>{item.desc}</p>
          </div>
        ))}
      </Section>
    </>
  );
};

export default ExternalToolOperators;
