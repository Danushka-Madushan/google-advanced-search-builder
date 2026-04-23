import GoogleLogo from '../icons/GoogleLogo';
import { G } from '../styles/g-color';

interface HeaderProps {
  isMobile: boolean;
}

const Header: React.FC<HeaderProps> = ({ isMobile }) => {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, paddingBottom: isMobile ? 2 : 8 }}>
      <GoogleLogo />
      <div style={{
        display: "flex",
        alignItems: "center",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: isMobile ? 6 : 10,
        marginTop: isMobile ? 2 : 6,
      }}>
        <span style={{
          fontSize: isMobile ? 20 : 28,
          fontWeight: 400,
          color: G.black,
          letterSpacing: "-0.5px",
          fontFamily: "'Google Sans', Roboto, Arial, sans-serif",
          textAlign: "center",
        }}>
          Advanced Search Builder
        </span>
        <span style={{
          fontSize: 11, fontWeight: 600,
          background: G.blueLight, color: "#1967D2",
          border: "1px solid #C5D9F9",
          padding: "3px 10px", borderRadius: 9999,
          fontFamily: "'Google Sans', Roboto, Arial, sans-serif",
          letterSpacing: "0.02em",
          whiteSpace: "nowrap",
        }}>
          Query Builder
        </span>
      </div>
      <p style={{
        fontSize: isMobile ? 13 : 14,
        color: G.grey,
        margin: 0,
        textAlign: "center",
        fontFamily: "'Google Sans', Roboto, Arial, sans-serif",
        paddingInline: isMobile ? 4 : 0,
        lineHeight: 1.5,
      }}>
        Visual builder for all Google search operators — generates a live search URL
      </p>
    </div>
  )
}

export default Header
