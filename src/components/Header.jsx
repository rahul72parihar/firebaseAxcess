import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/authSlice";

import musicImg from "../assets/musicicon.png";
import {
  TbShieldLock,
  TbUser,
  TbLogout,
  TbChevronDown,
  TbLayoutDashboard,
  TbVideo,
  TbFileText,
  TbShieldCheck,
  TbHelp,
  TbHeadset,
} from "react-icons/tb";
import { MdSecurity } from "react-icons/md";

import "./Header.css";

function AxcessLogo() {
  return (
    <div className="ax-header-logo">
      <img src={musicImg} alt="Axcess" className="ax-header-logo-icon" />
      <span className="ax-header-logo-text">Axcess</span>
    </div>
  );
}

const USER_MENU_ITEMS = [
  { icon: TbUser, label: "Profile", href: "/profile" },
  { icon: TbFileText, label: "Terms & Conditions", href: "/terms" },
  { icon: TbShieldLock, label: "Privacy Policy", href: "/privacy" },
  { icon: TbHelp, label: "Community Guidelines", href: "/guidelines" },
];

const HOST_MENU_ITEMS = [
  { icon: TbLayoutDashboard, label: "Dashboard", href: "/host/session" },
  { icon: TbVideo, label: "Go Live", href: "/host/live" },
  { icon: TbFileText, label: "Host Terms", href: "/host/terms" },
  { icon: TbHelp, label: "Host Guidelines", href: "/host/guidelines" },
  { icon: TbShieldCheck, label: "Privacy Policy", href: "/privacy" },
  { icon: TbHeadset, label: "Host Support", href: "/host/support" },
];

function UserMenu({ userName, avatarUrl, role, onProfile, onLogout }) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    function handleEscape(event) {
      if (event.key === "Escape") setOpen(false);
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const menuItems = role === "host" ? HOST_MENU_ITEMS : USER_MENU_ITEMS;

  return (
    <div className="ax-user-menu" ref={menuRef}>
      <button
        type="button"
        className="ax-header-user-box ax-user-menu-trigger"
        onClick={() => setOpen((prev) => !prev)}
        aria-haspopup="true"
        aria-expanded={open}
      >
        <img src={avatarUrl} alt={userName} />
        <span>{userName}</span>
        <TbChevronDown
          size={16}
          className={`ax-user-menu-chevron ${open ? "ax-user-menu-chevron--open" : ""}`}
        />
      </button>

      {open && (
        <div className="ax-user-menu-dropdown" role="menu">
          {role && (
            <div className="ax-user-menu-role-badge">
              {role === "host" ? "Host Account" : "User Account"}
            </div>
          )}

          {menuItems.map(({ icon: Icon, label, href }) => (
            <button
              key={label}
              type="button"
              role="menuitem"
              className="ax-user-menu-item"
              onClick={() => {
                setOpen(false);
                if (label === "Profile") onProfile();
                else navigate(href);
              }}
            >
              <Icon size={16} />
              {label}
            </button>
          ))}

          <div className="ax-user-menu-divider" />

          <button
            type="button"
            role="menuitem"
            className="ax-user-menu-item ax-user-menu-item--danger"
            onClick={() => {
              setOpen(false);
              onLogout();
            }}
          >
            <TbLogout size={16} />
            Logout
          </button>
        </div>
      )}
    </div>
  );
}

export default function Header({
  mode = "default", // 'default' | 'call' | 'queue' | 'create'
  userName = "Rohan",
  userAvatar = "https://i.pravatar.cc/100?img=12",
  showAuthButtons = false,
  onLogin,
  onProfile,
  setShowEndCallModal,
}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loggedIn = useSelector((state) => state.auth.loggedIn);
  const role = useSelector((state) => state.auth.role);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };
  const handleLogin = () =>
    typeof onLogin === "function" ? onLogin() : navigate("/session");
  const handleProfile = () =>
    typeof onProfile === "function" ? onProfile() : navigate("/profile");

  if (mode === "call") {
    return (
      <header className="ax-header ax-header--call">
        <AxcessLogo />

        <button
          className="ax-header-end-call"
          onClick={() => setShowEndCallModal(true)}
          type="button"
        >
          End Call
        </button>
      </header>
    );
  }

  if (mode === "queue") {
    return (
      <header className="ax-header ax-header--queue">
        <AxcessLogo />

        <div className="ax-header-queue-right">
          <div className="ax-header-secure">
            <MdSecurity size={16} />
            Secure Payment
          </div>

          <UserMenu
            userName={userName}
            avatarUrl={userAvatar}
            role={role}
            onProfile={handleProfile}
            onLogout={handleLogout}
          />
        </div>
      </header>
    );
  }

  if (mode === "create") {
    return (
      <header className="ax-header ax-header--default">
        <div className="ax-header-left">
          <AxcessLogo />
        </div>

        <div className="ax-header-right">
          <UserMenu
            userName={userName}
            avatarUrl={userAvatar}
            role={role}
            onProfile={handleProfile}
            onLogout={handleLogout}
          />
        </div>
      </header>
    );
  }

  return (
    <header className="ax-header ax-header--default">
      <div className="ax-header-left">
        <AxcessLogo />
      </div>

      <div className="ax-header-right">
        <div className="ax-header-secure">
          <TbShieldLock size={18} />
          Secure Payment
        </div>

        {showAuthButtons &&
          (loggedIn ? (
            <UserMenu
              userName={userName}
              avatarUrl={userAvatar}
              onProfile={handleProfile}
              onLogout={handleLogout}
            />
          ) : (
            <button
              className="ax-header-auth-btn"
              onClick={handleLogin}
              type="button"
            >
              <TbUser size={18} />
              Login / Signup
            </button>
          ))}
      </div>
    </header>
  );
}

