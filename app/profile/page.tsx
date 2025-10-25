import React from "react";

export interface ProfileProps {
  children?: React.ReactNode;
}

export default function Profile({ children }: ProfileProps) {
  return <div>Profile</div>;
}
