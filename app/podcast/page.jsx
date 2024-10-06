import Navbar from "@/components/Navbar";
import React from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

const page = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <ResizablePanelGroup
        className="min-h-[calc(100vh-3.5rem)]"
        direction="horizontal"
      >
        <ResizablePanel defaultSize={75}>
          <ResizablePanelGroup direction="vertical">
            <ResizablePanel defaultSize={30}>
              <ResizablePanelGroup direction="horizontal">
                <ResizablePanel defaultSize={50}>
                  PODCAST DETAILS
                </ResizablePanel>
                <ResizableHandle />
                <ResizablePanel defaultSize={50}>CONTROLS</ResizablePanel>
              </ResizablePanelGroup>
            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel defaultSize={70}>LIVE CHAT</ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={25}>USERS LIST</ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default page;
