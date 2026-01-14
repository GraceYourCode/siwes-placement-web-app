"use client";

import { useState } from "react";
import NewEntryDialogue from "../students/logbook/new-entry-dialogue";

interface HeaderProps {
  header: string;
  description: string;
  addDialogue?: boolean;
}

export default function Header(props: HeaderProps) {
  const { description, header, addDialogue } = props;
  const [isNewEntryOpen, setIsNewEntryOpen] = useState(false);

  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <div>
        <h1 className="text-heading-1">{header}</h1>
        <p className="text-muted-foreground">{description}</p>
      </div>
      {addDialogue && (
        <NewEntryDialogue
          isNewEntryOpen={isNewEntryOpen}
          setIsNewEntryOpen={setIsNewEntryOpen}
        />
      )}
    </div>
  );
}
