"use client";

import React, { useState } from "react";
import Intro from "@/components/intro";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8">
      <Intro />
    </main>
  );
}
