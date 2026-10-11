import { BRAND } from "../../constants/brand";
import { Logo } from "../logo/Logo";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

type NavLink = { type: "link"; label: string; href: string };
type NavMenu = {
  type: "menu";
  label: string;
  items: ReadonlyArray<{ label: string; href: string }>;
};
type NavItem = NavLink | NavMenu;

const NAV: ReadonlyArray<NavItem> = [
  { type: "link", label: "About", href: "/about" },
  { type: "link", label: "Talents", href: "/talents" },
  { type: "link", label: "Services", href: "/services" },
  {
    type: "menu",
    label: "Resources",
    items: [
      { label: "Case Study", href: "/case-study" },
      { label: "Blog", href: "https://hypush.co/blog" },
      { label: "FAQ", href: "/faq" },
    ],
  },
  { type: "link", label: "Contact", href: "/contact" },
];

const Bar = styled.header`
  position: sticky;
  top: 0;
  z-index: 50;
  width: 100%;
  border-bottom: 1px solid #1f2937;
  background: #000000;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1);
`;

const Nav = styled.nav`
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 16px;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 80px;
`;

const Desktop = styled.div`
  display: none;
  flex-shrink: 0;
  align-items: center;
  gap: 40px;

  @media (min-width: 768px) {
    display: flex;
  }
`;

const Links = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const linkStyles = `
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 4px 12px;
  border-radius: 6px;
  color: #ffffff;
  font-size: 14px;
  font-weight: 600;
  line-height: 1.5;
  transition: background-color 0.15s ease, color 0.15s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.05);
  }
`;

const NavAnchor = styled.a`
  ${linkStyles}
`;

const Menu = styled.div`
  position: relative;
`;

const MenuTrigger = styled.button`
  ${linkStyles}
  border: none;
  background: transparent;
  cursor: pointer;
  font: inherit;
`;

const MenuPanel = styled.div<{ $open: boolean }>`
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  min-width: 160px;
  padding: 8px;
  border: 1px solid #1f2937;
  border-radius: 12px;
  background: #0a0a0a;
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.45);
  opacity: ${(props) => (props.$open ? 1 : 0)};
  visibility: ${(props) => (props.$open ? "visible" : "hidden")};
  transform: translateY(${(props) => (props.$open ? "0" : "4px")});
  transition: opacity 0.15s ease, transform 0.15s ease, visibility 0.15s ease;
`;

const MenuLink = styled.a`
  display: block;
  padding: 10px 12px;
  border-radius: 8px;
  color: #ffffff;
  font-size: 14px;
  font-weight: 500;
  transition: background-color 0.15s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.06);
  }
`;

const Divider = styled.div`
  width: 1px;
  height: 20px;
  background: #374151;
  flex-shrink: 0;
`;

const Quote = styled(Link)`
  display: inline-flex;
  flex-shrink: 0;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  border: 1px solid rgba(255, 255, 255, 0.6);
  border-radius: 6px;
  color: #ffffff;
  font-size: 12px;
  font-weight: 500;
  white-space: nowrap;
  transition: background-color 0.2s ease, color 0.2s ease, border-color 0.2s ease;

  &:hover {
    background: #ffffff;
    color: #000000;
    border-color: #ffffff;
  }
`;

const MenuButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
  border: none;
  border-radius: 8px;
  background: transparent;
  color: #d1d5db;
  cursor: pointer;

  &:hover {
    background: #1f2937;
  }

  @media (min-width: 768px) {
    display: none;
  }

  svg {
    display: block;
    width: 24px;
    height: 24px;
  }
`;

const Overlay = styled.div<{ $open: boolean }>`
  position: fixed;
  inset: 0;
  z-index: 40;
  display: flex;
  flex-direction: column;
  background: #000000;
  opacity: ${(props) => (props.$open ? 1 : 0)};
  visibility: ${(props) => (props.$open ? "visible" : "hidden")};
  transition: opacity 0.2s ease, visibility 0.2s ease;

  @media (min-width: 768px) {
    display: none;
  }
`;

const OverlayTop = styled.div`
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: space-between;
  height: 80px;
  padding: 0 24px;
`;

const OverlayClose = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
  border: none;
  border-radius: 8px;
  background: transparent;
  color: #d1d5db;
  cursor: pointer;

  &:hover {
    background: #1f2937;
  }

  svg {
    width: 24px;
    height: 24px;
  }
`;

const OverlayBody = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 0 24px 16px;
`;

const OverlayNav = styled.nav`
  display: flex;
  flex-direction: column;
`;

const OverlayLink = styled.a`
  display: flex;
  min-height: 44px;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom: 1px solid rgba(17, 24, 39, 0.8);
  color: #ffffff;
  font-size: 16px;
  font-weight: 600;
  letter-spacing: -0.01em;
  transition: color 0.15s ease;

  &:hover {
    color: #d1d5db;
  }
`;

const OverlayGroup = styled.div`
  border-bottom: 1px solid rgba(17, 24, 39, 0.8);
  padding: 10px 0 6px;
`;

const OverlayGroupLabel = styled.p`
  margin: 0 0 4px;
  color: #9ca3af;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
`;

const OverlaySubLink = styled.a`
  display: block;
  padding: 10px 0 10px 4px;
  color: #ffffff;
  font-size: 15px;
  font-weight: 500;

  &:hover {
    color: #d1d5db;
  }
`;

const OverlayFooter = styled.div`
  flex-shrink: 0;
  padding: 16px 24px max(20px, env(safe-area-inset-bottom));
  border-top: 1px solid #111827;
  background: #000000;
`;

const OverlayCta = styled(Link)`
  display: inline-flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  padding: 14px 20px;
  border-radius: 8px;
  background: #ffffff;
  color: #000000;
  font-size: 14px;
  font-weight: 600;
  letter-spacing: -0.01em;
  transition: background-color 0.15s ease;

  &:hover {
    background: #f3f4f6;
  }
`;

const Chevron = () => (
  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true" width="16" height="16">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
  </svg>
);

const Caret = () => (
  <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" width="16" height="16">
    <path
      fillRule="evenodd"
      d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
      clipRule="evenodd"
    />
  </svg>
);

const renderHref = (href: string, label: string, onClick?: () => void) =>
  href.startsWith("/") ? (
    <NavAnchor as={Link} href={href} onClick={onClick}>
      {label}
    </NavAnchor>
  ) : (
    <NavAnchor
      href={href}
      onClick={onClick}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
    >
      {label}
    </NavAnchor>
  );

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };
    const scrollY = window.scrollY;
    document.body.style.top = `-${scrollY}px`;
    document.body.style.position = "fixed";
    document.body.style.width = "100%";
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      window.scrollTo(0, scrollY);
    };
  }, [isOpen]);

  useEffect(() => {
    if (!openMenu) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpenMenu(null);
    };
    const onPointerDown = (event: MouseEvent) => {
      const target = event.target as Element | null;
      if (!target?.closest?.("[data-nav-menu]")) {
        setOpenMenu(null);
      }
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onPointerDown);
    };
  }, [openMenu]);

  return (
    <>
      <Bar>
        <Nav aria-label="Main navigation">
          <Row>
            <Logo onDark height={40} />

            <Desktop>
              <Links>
                {NAV.map((item) => {
                  if (item.type === "link") {
                    return (
                      <React.Fragment key={item.label}>
                        {renderHref(item.href, item.label)}
                      </React.Fragment>
                    );
                  }

                  const menuId = `nav-menu-${item.label.toLowerCase()}`;
                  const isMenuOpen = openMenu === item.label;

                  return (
                    <Menu
                      key={item.label}
                      data-nav-menu
                      onMouseEnter={() => setOpenMenu(item.label)}
                      onMouseLeave={() => setOpenMenu(null)}
                    >
                      <MenuTrigger
                        type="button"
                        aria-haspopup="menu"
                        aria-expanded={isMenuOpen}
                        aria-controls={menuId}
                        onClick={() => setOpenMenu(isMenuOpen ? null : item.label)}
                      >
                        {item.label}
                        <Caret />
                      </MenuTrigger>
                      <MenuPanel id={menuId} role="menu" aria-label={item.label} $open={isMenuOpen}>
                        {item.items.map((sub) =>
                          sub.href.startsWith("/") ? (
                            <MenuLink
                              as={Link}
                              key={sub.label}
                              href={sub.href}
                              role="menuitem"
                              onClick={() => setOpenMenu(null)}
                            >
                              {sub.label}
                            </MenuLink>
                          ) : (
                            <MenuLink
                              key={sub.label}
                              href={sub.href}
                              role="menuitem"
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={() => setOpenMenu(null)}
                            >
                              {sub.label}
                            </MenuLink>
                          )
                        )}
                      </MenuPanel>
                    </Menu>
                  );
                })}
              </Links>
              <Divider aria-hidden="true" />
              <Quote href={BRAND.CONTACT_URL}>Get a Quote</Quote>
            </Desktop>

            <MenuButton
              type="button"
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
              onClick={() => setIsOpen((open) => !open)}
            >
              {isOpen ? (
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </MenuButton>
          </Row>
        </Nav>
      </Bar>

      <Overlay id="mobile-menu" $open={isOpen} aria-hidden={!isOpen}>
        <OverlayTop>
          <Logo onDark height={36} onClick={() => setIsOpen(false)} />
          <OverlayClose type="button" aria-label="Close menu" onClick={() => setIsOpen(false)}>
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </OverlayClose>
        </OverlayTop>
        <OverlayBody>
          <OverlayNav aria-label="Mobile navigation">
            {NAV.map((item) => {
              if (item.type === "link") {
                return item.href.startsWith("/") ? (
                  <OverlayLink as={Link} key={item.label} href={item.href} onClick={() => setIsOpen(false)}>
                    <span>{item.label}</span>
                    <Chevron />
                  </OverlayLink>
                ) : (
                  <OverlayLink key={item.label} href={item.href} onClick={() => setIsOpen(false)}>
                    <span>{item.label}</span>
                    <Chevron />
                  </OverlayLink>
                );
              }

              return (
                <OverlayGroup key={item.label}>
                  <OverlayGroupLabel>{item.label}</OverlayGroupLabel>
                  {item.items.map((sub) =>
                    sub.href.startsWith("/") ? (
                      <OverlaySubLink
                        as={Link}
                        key={sub.label}
                        href={sub.href}
                        onClick={() => setIsOpen(false)}
                      >
                        {sub.label}
                      </OverlaySubLink>
                    ) : (
                      <OverlaySubLink
                        key={sub.label}
                        href={sub.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => setIsOpen(false)}
                      >
                        {sub.label}
                      </OverlaySubLink>
                    )
                  )}
                </OverlayGroup>
              );
            })}
          </OverlayNav>
        </OverlayBody>
        <OverlayFooter>
          <OverlayCta href={BRAND.CONTACT_URL} onClick={() => setIsOpen(false)}>
            Get a Quote
          </OverlayCta>
        </OverlayFooter>
      </Overlay>
    </>
  );
};
