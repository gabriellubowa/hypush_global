import React, { useEffect, useState } from "react";
import styled from "styled-components";

// Open state: every item while server-rendered (so answers are in the HTML),
// then only the first item once the page is interactive.
const ALL_OPEN = -1;
const ALL_CLOSED = -2;

const List = styled.ul`
  width: 100%;
  margin: var(--margins-md) 0;
  padding: 0;
  list-style: none;
  border-left: 1px solid var(--color-border-accordion);
  border-right: 1px solid var(--color-border-accordion);

  > li:first-child {
    border-top: 1px solid var(--color-border-accordion);
  }
`;

const Item = styled.li<{ $isOpen: boolean }>`
  display: flex;
  flex-direction: column;
  width: 100%;
  border-bottom: ${(props) => (props.$isOpen ? "1px" : "0")} solid var(--color-border-accordion);
`;

const Trigger = styled.button`
  display: flex;
  align-items: center;
  width: 100%;
  padding: var(--margins-md);
  border: none;
  border-bottom: 1px solid var(--color-border-accordion);
  background: none;
  color: var(--color-text);
  font-size: 16px;
  font-weight: 600;
  letter-spacing: 0.01em;
  text-align: left;
  cursor: pointer;
  transition: background-color var(--duration-fast) linear;

  &:hover {
    background-color: var(--color-surface);
  }

  svg {
    flex-shrink: 0;
    width: 20px;
    margin: 0 var(--margins-lg) 0 var(--margins-sm);
  }

  &[aria-expanded="true"] svg {
    color: var(--color-accent);
  }
`;

const Panel = styled.div<{ $isOpen: boolean }>`
  max-width: 72ch;
  height: ${(props) => (props.$isOpen ? "auto" : "0")};
  padding: ${(props) => (props.$isOpen ? "var(--margins-lg)" : "0")} var(--margins-xl);
  padding-left: calc(var(--margins-xl) + 20px);
  overflow: hidden;
  visibility: ${(props) => (props.$isOpen ? "visible" : "hidden")};
  color: var(--color-secondary);

  p {
    margin: 0 0 var(--margins-md);
    text-align: left;
  }
`;

const ToggleIcon = ({ isOpen }: { isOpen: boolean }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round" aria-hidden="true">
    {isOpen ? <path d="M6 12h12" /> : <path d="M12 6v12M6 12h12" />}
  </svg>
);

export interface IAccordionItem {
  id: string;
  title: string;
  content: React.ReactNode;
}

export function Accordion({ items }: { items: ReadonlyArray<IAccordionItem> }) {
  const [openIndex, setOpenIndex] = useState(ALL_OPEN);

  useEffect(() => setOpenIndex(0), []);

  return (
    <List>
      {items.map((item, index) => {
        const isOpen = openIndex === ALL_OPEN || openIndex === index;
        const panelId = `${item.id}-panel`;
        return (
          <Item
            key={item.id}
            id={item.id}
            $isOpen={isOpen}
            data-aos="fade-up"
            data-aos-delay={String(Math.min(index, 6) * 40)}
          >
            <Trigger
              type="button"
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => setOpenIndex(isOpen ? ALL_CLOSED : index)}
            >
              <ToggleIcon isOpen={isOpen} />
              {item.title}
            </Trigger>
            <Panel id={panelId} role="region" $isOpen={isOpen}>
              {item.content}
            </Panel>
          </Item>
        );
      })}
    </List>
  );
}
