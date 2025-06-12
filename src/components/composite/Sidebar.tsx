"use client";

import { Label } from "@/components/ui/label";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { Switch } from "@/components/ui/switch";
import { markModeAtom } from "@/lib/jotai/atom";
import { useSetAtom } from "jotai";

const CustomSidebar = () => {
  const setMarkMode = useSetAtom(markModeAtom);
  return (
    <Sidebar>
      <SidebarHeader>qwerty</SidebarHeader>
      <SidebarContent>
        <SidebarGroup>qw</SidebarGroup>
        <SidebarGroup>er</SidebarGroup>
        <SidebarGroup>ty</SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <div className="flex justify-center gap-4">
          <Switch id="mark" onClick={() => setMarkMode((prev) => !prev)} />
          <Label htmlFor="mark">markNumMode</Label>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};

export default CustomSidebar;
